from fastapi import HTTPException
from app.database import SessionLocal
from app.models import Portfolio, User


# calculate risk profile
def get_risk_profile(score):
    if score < 4:
        return "Conservative"
    elif score < 12:
        return "Moderate"
    elif score < 16:
        return "Aggressive"
    else:
        raise HTTPException(status_code=400, detail="Invalid score for risk profile.")

# associate portfolio to user in database
def associate_portfolio_to_user(user_id: str, risk_profile: str, portfolio_id: int):
    print("TEST")

    db = SessionLocal()
    try:
        print("AFTER SESSION")
        user = db.query(User).filter(User.id == user_id).first()
        user.risk_profile = risk_profile
        user.portfolio_id = portfolio_id
        username = user.username
        db.commit()
    finally:
        db.close()

    return {"message": f"Assigned portfolio to user {username}"}


# @router.post("/risk-profile", response_model=RiskProfileResponse)
# def calculate_risk_profile(request: RiskProfileRequest):
#     if len(request.answers) != 5:
#         raise HTTPException(status_code=400, detail="Exactly 5 answers are required.")
    
#     total_score = sum(request.answers)
#     profile = get_risk_profile(total_score)
    
#     return RiskProfileResponse(risk_profile=profile)