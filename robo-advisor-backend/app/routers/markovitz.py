from fastapi import APIRouter
from app.services.markovitz_standard import portfolio_optimization
import pandas as pd

router = APIRouter()

class PortfolioRequest(BaseModel):
    risk_profile: str

@router.get("/portfolio")
async def get_portfolio(request: PortfolioRequest):
    # Call the portfolio_optimization function directly
    portfolio_data = portfolio_optimization(request.risk_profile)
    return portfolio_data  # Return the portfolio optimization results

@router.get("/efficient_frontier")
async def get_efficient_frontier():
    # This endpoint can be used to return the efficient frontier data
    # You can implement additional logic here if needed
    return {"message": "Efficient frontier data will be implemented here."}