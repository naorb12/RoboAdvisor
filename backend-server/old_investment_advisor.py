def ask_question(question, options):
    print(f"\n{question}")
    for idx, option in enumerate(options, start=1):
        print(f"{idx}. {option}")
    while True:
        try:
            choice = int(input("Enter the number of your choice: "))
            if 1 <= choice <= len(options):
                return choice
            else:
                print("Invalid selection. Try again.")
        except ValueError:
            print("Please enter a valid number.")

def get_risk_profile(score):
    if score < 4:
        return "Conservative"
    elif score < 12:
        return "Moderate"
    else:
        return "Aggressive"

def main():
    print("Welcome to the Investment Risk Profiler!")

    questions = [
        {
            "question": "What is your age?",
            "options": [
                "Under 30",          # high risk tolerance
                "30-50",
                "50-67",
                "Over 67"            # low risk tolerance
            ],
            "scores": [3, 2, 1, 0]
        },
        {
            "question": "How would you react if you had a protfolio worth of 1,000,000, it went down to 800,000?",
            "options": [
                "Buy more (it's an opportunity)",  # high risk
                "Hold and wait",
                "Sell a part to reduce losses",
                "Sell everything"                  # low risk
            ],
            "scores": [3, 2, 1, 0]
        },
        {
            "question": "What is your primary goal?",
            "options": [
                "Capital growth (long term)",     # high risk
                "Balanced growth and income",
               "Stable income", #REMOVE!
                "Capital preservation"            # low risk
            ],
            "scores": [3, 2, 1, 0]
        },
        {
            "question": "How experienced are you with investing?",
            "options": [
                "Very experienced",               # high risk
                "Somewhat experienced",
                "Basic knowledge",
                "No experience"                   # low risk
            ],
            "scores": [3, 2, 1, 0]
        },
        {
            "question": "How long do you plan to keep your investments?",
            "options": [
                "10+ years",                      # high risk
                "5-10 years",
                "2-5 years",
                "Less than 2 years"              # low risk
            ],
            "scores": [3, 2, 1, 0]
        }
    ]

    total_score = 0

    for q in questions:
        choice = ask_question(q["question"], q["options"])
        total_score += q["scores"][choice - 1]

    profile = get_risk_profile(total_score)

    print(f"\nBased on your answers, your risk profile is: {profile}")

if __name__ == "__main__":
    main()
