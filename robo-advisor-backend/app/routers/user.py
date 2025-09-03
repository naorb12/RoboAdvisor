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

class RegisterRequest(BaseModel):
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    print("GOT REGISTER REQUEST:", request)
    user = db.query(User).filter(
        User.email == request.email
    ).first()

    if user: 
        raise HTTPException(status_code=401, detail="User already exists.")
    
    else:
        try:
            hashed_password = pwd_context.hash(request.password)
            user = User(
                email=request.email,
                hashed_password=hashed_password,
                risk_profile="moderate"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            return {"message": "Registration successful", "user_id": user.id, "email" : user.email}

        except Exception as e:
            db.rollback()
            print("Error creating user:", e)
            raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    print("GOT LOGIN REQUEST:", request)
    user = db.query(User).filter(
        User.email == request.email
    ).first()

    if user:
        # קיים — בדוק סיסמה
        if not pwd_context.verify(request.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Password does not match for existing user")
        return {"message": "Login successful", "user_id": user.id, "email" : user.email}
    else:
        raise HTTPException(status_code=401, detail="Email does not exist, please register first.")
   

