from fastapi import APIRouter, HTTPException


def get_risk_profile(score):
    if score < 4:
        return "Conservative"
    elif score < 12:
        return "Moderate"
    elif score < 16:
        return "Aggressive"
    else:
        raise HTTPException(status_code=400, detail="Invalid score for risk profile.")

# @router.post("/risk-profile", response_model=RiskProfileResponse)
# def calculate_risk_profile(request: RiskProfileRequest):
#     if len(request.answers) != 5:
#         raise HTTPException(status_code=400, detail="Exactly 5 answers are required.")
    
#     total_score = sum(request.answers)
#     profile = get_risk_profile(total_score)
    
#     return RiskProfileResponse(risk_profile=profile)