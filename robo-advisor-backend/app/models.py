from sqlalchemy import Column, Integer, String, Float, JSON
from app.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from sqlalchemy import Date
from datetime import date


class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    risk_level = Column(String, index=True)  # "conservative", "moderate", "aggressive"
    returns = Column(Float)
    volatility = Column(Float)
    sharpe = Column(Float)
    weights = Column(JSON)  # נשמור את המפת משקלים { "SPY": 0.3, ... }
    date = Column(Date, default=date.today)
    relevance = Column(String)
    user = relationship("User", back_populates="portfolio")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)  # 🆕 מזהה ייחודי
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    risk_profile = Column(String)  # "conservative", "moderate", "aggressive"
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)  # ✅ קשר נכון

    portfolio = relationship("Portfolio", uselist=False, back_populates="user")  # אופציונלי – מאפשר גישה ישירה לתיק