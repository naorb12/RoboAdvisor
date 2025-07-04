from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import markovitz, advisor
from app.database import Base, engine
from app.services.markovitz_standard import build_and_store_all_portfolios

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

app.include_router(markovitz.router)
app.include_router(advisor.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Robo Advisor API!"}

@app.on_event("startup")
def generate_portfolios():
    build_and_store_all_portfolios()