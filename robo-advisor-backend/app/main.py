from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import advisor, user
from app.database import Base, engine
from app.models import Portfolio, User
from app.core.markovitz_standard import build_and_store_all_portfolios
from app.services.portfolio_service import save_portfolios_to_db, notify_users_if_needed
import threading

# יצירת טבלאות מהמודלים
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(advisor.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Robo Advisor API!"}

@app.on_event("startup")
def generate_portfolios_async():
    threading.Thread(target=generate_portfolios).start()

def generate_portfolios():
    portfolios = build_and_store_all_portfolios()
    save_portfolios_to_db(portfolios)
    notify_users_if_needed(portfolios)