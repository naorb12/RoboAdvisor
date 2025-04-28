# markovitz.py

def markovitz_model(risk_level):
    portfolios = {
        1: {  # low risk
            "Government Bonds Israel": 30.0,
            "Cash/Deposits": 70.0
        },
        2: {  # medium risk
            "Stocks Israel": 13.0,
            "Stocks Abroad": 25.2,
            "Government Bonds Israel": 20.0,
            "Corporate Bonds Israel": 24.0,
            "Corporate Bonds Abroad": 12.0,
            "Cash/Deposits": 5.8
        },
        3: { # high risk
            "Stocks Israel": 30.0,
            "Stocks Abroad": 69.5,
            "Cash/Deposits": 0.5
        }
    }

    if risk_level not in portfolios:
        raise ValueError("Invalid risk level. Must be 1 (low), 2 (medium), or 3 (high).")
    
    return portfolios[risk_level]


if __name__ == "__main__":
    try:
        risk_level = int(input("Enter risk level (1 = low, 2 = medium, 3 = high): "))
        result = markovitz_model(risk_level)
        print("Recommended Portfolio Allocation:")
        for asset, percentage in result.items():
            print(f"{asset}: {percentage}%")
    except Exception as e:
        print(f"Error: {e}")
