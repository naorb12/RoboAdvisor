from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class LoginRequest(BaseModel):
    username: str
    email: str
    password: str

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.username == request.username,
        User.email == request.email
    ).first()

    if not user:
        # ✅ משתמש לא קיים — צור חדש
        hashed_password = pwd_context.hash(request.password)
        user = User(
            username=request.username,
            email=request.email,
            hashed_password=hashed_password,
            risk_profile="moderate"  # ברירת מחדל התחלתית
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return {"message": "User created and logged in", "user_id": user.id}
    
    # ✅ משתמש קיים — בדוק סיסמה
    if not pwd_context.verify(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Password does not match for existing user")
    
    return {"message": "Login successful", "user_id": user.id}
