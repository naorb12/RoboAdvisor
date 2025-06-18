from sqlalchemy import Column, Integer, String, Float, JSON
from app.database import Base

class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    risk_level = Column(String, index=True)  # "conservative", "moderate", "aggressive"
    returns = Column(Float)
    volatility = Column(Float)
    sharpe = Column(Float)
    weights = Column(JSON)  # נשמור את המפת משקלים { "SPY": 0.3, ... }
