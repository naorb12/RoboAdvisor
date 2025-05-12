import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


selected = ["SPY", "QQQ", "IEI", "LQD", "TA35.TA", "GLD", "BTC-USD", "DBO", "IWM"]
start_year = '2020-12-01'
end_year = '2025-01-07'
Num_porSimulation = 200000

def portfolio_optimization(risk_profile: str):
    frame = yf.download(selected, start=start_year, end=end_year, auto_adjust=False)['Adj Close']
    df = pd.DataFrame(frame).ffill().bfill()

    returns_daily = df.pct_change()
    returns_annual = ((1 + returns_daily.mean()) ** 250) - 1
    std_daily = returns_daily.std()
    std_annual = std_daily * (250 ** 0.5)
    Sharp = (returns_annual - 0.04) / std_annual
    cov_daily = returns_daily.cov()
    cov_annual = cov_daily * 250

    port_returns = []
    port_volatility = []
    sharpe_ratio = []
    stock_weights = []

    num_assets = len(selected)
    np.random.seed(101)

    for _ in range(Num_porSimulation):
        weights = np.random.random(num_assets)
        weights /= np.sum(weights)
        returns = np.dot(weights, returns_annual)
        volatility = np.sqrt(np.dot(weights.T, np.dot(cov_annual, weights)))
        sharpe = returns / volatility

        sharpe_ratio.append(sharpe)
        port_returns.append(returns * 100)
        port_volatility.append(volatility * 100)
        stock_weights.append(weights)

    portfolio = {
        'Returns': port_returns,
        'Volatility': port_volatility,
        'Sharpe Ratio': sharpe_ratio
    }

    for counter, symbol in enumerate(selected):
        portfolio[symbol + ' Weight'] = [Weight[counter] for Weight in stock_weights]

    df = pd.DataFrame(portfolio)

    min_volatility = df['Volatility'].min()
    max_sharpe = df['Sharpe Ratio'].max()
    max_return = df['Returns'].max()
    #max_vol = df['Volatility'].max()

    sharpe_portfolio = df.loc[df['Sharpe Ratio'] == max_sharpe]
    min_variance_port = df.loc[df['Volatility'] == min_volatility]
    max_returns = df.loc[df['Returns'] == max_return]
    #max_vols = df.loc[df['Volatility'] == max_vol]

    if(risk_profile == "Conservative"):
        return {"max_volatility": max_vols.to_dict(orient='records')}
    elif(risk_profile == "Moderate"):
        return {"max_sharpe": sharpe_portfolio.to_dict(orient='records')}
    elif(risk_profile == "Aggressive"):
        return {"max_returns": max_returns.to_dict(orient='records')}
    else:
        raise HTTPException(status_code=400, detail="Invalid risk profile. Choose Conservative, Moderate, or Aggressive.")