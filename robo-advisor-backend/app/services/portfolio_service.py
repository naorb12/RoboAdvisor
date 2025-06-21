from app.database import SessionLocal
from app.models import Portfolio
from datetime import date

def save_portfolios_to_db(portfolios: dict):
    db = SessionLocal()
    try:
        db.query(Portfolio).update({Portfolio.relevance: "obsolete"})
        db.commit()

        for risk_level, data in portfolios.items():
            weights = {k: float(v) for k, v in data["Weights"].items()}
            portfolio = Portfolio(
                risk_level=risk_level,
                returns=float(data["Returns"]),
                volatility=float(data["Volatility"]),
                sharpe=float(data["Sharpe"]),
                weights=weights,
                date=date.today(),
                relevance="current"
            )
            db.add(portfolio)

        db.commit()
    finally:
        db.close()
