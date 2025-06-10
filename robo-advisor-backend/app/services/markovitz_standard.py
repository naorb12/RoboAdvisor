from fastapi import HTTPException
import yfinance as yf
import numpy as np
import pandas as pd
from datetime import date


TICKERS         = ["SPY", "QQQ", "IEI", "LQD", "GLD", "VNQ"]
START_DATE      = "2020-01-01"
END_DATE        = date.today().isoformat() 
NUM_PORTFOLIOS  = 10_000
TRADING_DAYS    = 252
RISK_FREE_RATE  = 0.025

def annualised_return_and_cov(df: pd.DataFrame):
    returns_daily = df.pct_change().dropna(how="any")           
    mu_annual = (1 + returns_daily.mean()) ** TRADING_DAYS - 1
    sigma_annual = returns_daily.cov() * TRADING_DAYS
    return mu_annual, sigma_annual

def run_markowitz(plot: bool = False,
                  tickers: list[str] = TICKERS,
                  start: str = START_DATE,
                  end: str = END_DATE,
                  n: int = NUM_PORTFOLIOS,
                  risk_free: float = RISK_FREE_RATE
                  ) -> tuple[pd.DataFrame, np.ndarray, list[str]]:

    prices = yf.download(tickers, start=start, end=end, auto_adjust=True)["Close"]
    mu, sigma = annualised_return_and_cov(prices)

    num_assets = len(tickers)
    results = np.zeros((n, 3))
    all_weights = np.zeros((n, num_assets))

    for i in range(n):
        w = np.random.random(num_assets)
        w /= w.sum()
        all_weights[i] = w

        ret = np.dot(w, mu)
        vol = np.sqrt(np.dot(w.T, np.dot(sigma, w)))
        sharpe = (ret - risk_free) / vol

        results[i] = [ret, vol, sharpe]

    df = pd.DataFrame(results, columns=["Return", "Volatility", "Sharpe"])
    return df, all_weights, tickers

def portfolio_optimization(risk_profile: str):
    df, all_weights, tickers = run_markowitz()
    df["Return"] = (df["Return"] * 100).round(2)
    df["Volatility"] = (df["Volatility"] * 100).round(2)


    for i, symbol in enumerate(tickers):
        df[symbol + " Weight"] = [w[i] for w in all_weights]



    min_vol_idx = df["Volatility"].idxmin()
    max_sharpe_idx = df["Sharpe"].idxmax()
    max_return_idx = df["Return"].idxmax()

    if risk_profile == "Conservative":
        return {"safest_portfolio": df.loc[[min_vol_idx]].rename(columns={"Return": "Returns"}).to_dict(orient="records")}
    elif risk_profile == "Moderate":
        return {"max_sharpe_portfolio": df.loc[[max_sharpe_idx]].rename(columns={"Return": "Returns"}).to_dict(orient="records")}
    elif risk_profile == "Aggressive":
        return {"max_returns_portfolio": df.loc[[max_return_idx]].rename(columns={"Return": "Returns"}).to_dict(orient="records")}
    else:
        raise HTTPException(status_code=400, detail="Invalid risk profile. Choose Conservative, Moderate, or Aggressive.")
