from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.investment_advisor import ask_question, get_risk_profile

router = APIRouter()

class RiskProfileRequest(BaseModel):
    answers: list[int]

@router.post("/risk-profile")
async def calculate_risk_profile(request: RiskProfileRequest):
    if len(request.answers) != 5:
        raise HTTPException(status_code=400, detail="Exactly 5 answers are required.")
    
    total_score = sum(request.answers)
    profile = get_risk_profile(total_score)
    
    return {"risk_profile": profile}