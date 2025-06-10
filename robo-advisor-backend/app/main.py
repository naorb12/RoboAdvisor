from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import markovitz, advisor

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