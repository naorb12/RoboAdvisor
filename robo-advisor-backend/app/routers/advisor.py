from fastapi import APIRouter, HTTPException
from app.services.investment_advisor import get_risk_profile, associate_portfolio_to_user
from app.core.markovitz_standard import portfolio_optimization
from pydantic import BaseModel  
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Portfolio


router = APIRouter()

class RiskProfileRequest(BaseModel):
    answers: list[int]
    user_id: int

@router.post("/risk-profile")
async def calculate_risk_profile_and_return_portfolio(request: RiskProfileRequest, db: Session = Depends(get_db)):

    if len(request.answers) != 5:
        raise HTTPException(status_code=400, detail="Exactly 5 answers are required.")
    for answer in request.answers:
        if answer < 0 or answer > 3:
            raise HTTPException(status_code=400, detail="Answers must be between 0 and 3.")

    total_score = sum(request.answers)
    profile = get_risk_profile(total_score)
    risk_level = profile.lower()
    portfolio = db.query(Portfolio).filter(Portfolio.risk_level == risk_level, Portfolio.relevance == "current").first()
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found in database.")
    portfolio_data = {
        "Returns": portfolio.returns,
        "Volatility": portfolio.volatility,
        "Sharpe Ratio": portfolio.sharpe,
        **{f"{symbol} Weight": weight for symbol, weight in portfolio.weights.items()}
    }

    key_by_risk = {
        "conservative": "safest_portfolio",
        "moderate": "max_sharpe_portfolio",
        "aggressive": "max_returns_portfolio"
    }

    # associate in DB
    associate_portfolio_to_user(request.user_id, risk_level, portfolio.id)

    return {
        "risk_profile": profile,
        "portfolio": {
            key_by_risk[risk_level]: [portfolio_data]
        }
    }
