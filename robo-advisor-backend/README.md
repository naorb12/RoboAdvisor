# Robo Advisor Backend

## Overview
The Robo Advisor Backend is a FastAPI application designed to provide investment advice and portfolio optimization services. It includes endpoints for assessing user risk profiles and generating efficient portfolios based on the Markovitz model.

## Project Structure
```
robo-advisor-backend
├── app
│   ├── main.py                # Entry point for the FastAPI application
│   ├── routers
│   │   ├── markovitz.py       # API endpoints for portfolio optimization
│   │   └── advisor.py         # API endpoints for investment advice
│   ├── services
│   │   ├── markovitz_standard.py # Logic for Markovitz portfolio optimization
│   │   └── investment_advisor.py  # Logic for assessing investment risk profiles
│   └── models
│       └── __init__.py       # Package initialization for models
├── requirements.txt           # Project dependencies
└── README.md                  # Project documentation
```

## Setup Instructions
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd robo-advisor-backend
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. **Install the required dependencies:**
   ```
   pip install -r requirements.txt
   ```

## Usage
1. **Run the FastAPI application:**
   ```
   uvicorn app.main:app --reload
   ```

2. **Access the API documentation:**
   Open your browser and navigate to `http://127.0.0.1:8000/docs` to view the interactive API documentation.

## Features
- **Investment Risk Profiling:** Users can answer a series of questions to determine their risk profile.
- **Portfolio Optimization:** Users can generate optimized portfolios based on the Markovitz model, including expected returns and volatility.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.