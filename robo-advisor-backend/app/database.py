from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

# טען את משתני הסביבה
load_dotenv()

# שלוף את כתובת הדאטאבייס מתוך .env
DATABASE_URL = os.getenv("DATABASE_URL")

# יצירת engine
engine = create_engine(DATABASE_URL)

# יצירת session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# בסיס למודלים
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()