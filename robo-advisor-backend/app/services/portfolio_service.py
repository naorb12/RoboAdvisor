from app.database import SessionLocal
from app.models import Portfolio, User
from datetime import date
import smtplib
from email.mime.text import MIMEText

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

def notify_users_if_needed(portfolios: dict):
    db = SessionLocal()
    try:
        users = db.query(User).all()
        for user in users:
            if user.portfolio_id is not None:
                old_portfolio = db.query(Portfolio).filter(Portfolio.id == user.portfolio_id).first()
                potential_portfolio = db.query(Portfolio).filter(
                    Portfolio.risk_level == old_portfolio.risk_level,
                    Portfolio.relevance == "current"
                ).first()
                if potential_portfolio and potential_portfolio.returns > old_portfolio.returns:
                    try:
                        send_email(user.email, old_portfolio.returns, potential_portfolio.returns)
                    except Exception as e:
                        print("Failed to send email to {user.email}: {e}")
    finally:
        db.close()

def send_email(recipient_email: str, old_returns: str, new_returns: str):
    sender_email = "roboadvisor.notifications@gmail.com"
    sender_password = "uerv vyas gdhm rhjw"

    body = f"Hello! The portfolio we offered is great, but we got a new one for you with higher return value: {new_returns} instead of your previous {old_returns}."
    msg = MIMEText(body)
    msg["Subject"] = "Updated Portfolio Suggestion!"
    msg["From"] = sender_email
    msg["To"] = recipient_email

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, sender_password)
        server.send_message(msg)        

