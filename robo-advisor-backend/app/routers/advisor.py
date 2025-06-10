from fastapi import APIRouter, HTTPException
from app.services.investment_advisor import get_risk_profile
from app.services.markovitz_standard import portfolio_optimization
from pydantic import BaseModel  

router = APIRouter()

class RiskProfileRequest(BaseModel):
    answers: list[int]

@router.post("/risk-profile")
async def calculate_risk_profile(request: RiskProfileRequest):
    if len(request.answers) != 5:
        raise HTTPException(status_code=400, detail="Exactly 5 answers are required.")
    for answer in request.answers:
        if answer < 0 or answer > 3:
            raise HTTPException(status_code=400, detail="Answers must be between 0 and 3.")
    total_score = sum(request.answers)
    profile = get_risk_profile(total_score)
    portfolio_data = portfolio_optimization(profile)
    return {"risk_profile": profile, "portfolio": portfolio_data} 
    

