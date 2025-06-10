import { QuizQuestion } from "../types/quiz.types";

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: "What is your age?",
        options: [
            "Under 30",
            "30–50",
            "50–67",
            "Over 67"
        ],
        scores: [3, 2, 1, 0]
    },
    {
        id: 2,
        question: "How would you react if your portfolio dropped from $1,000,000 to $800,000?",
        options: [
            "Buy more (it's an opportunity)",
            "Hold and wait",
            "Sell a part to reduce losses",
            "Sell everything"
        ],
        scores: [3, 2, 1, 0]
    },
    {
        id: 3,
        question: "What is your primary goal?",
        options: [
            "Capital growth (long term)",
            "Balanced growth and income",
            "Stable income",
            "Capital preservation"
        ],
        scores: [3, 2, 1, 0]
    },
    {
        id: 4,
        question: "How experienced are you with investing?",
        options: [
            "Very experienced",
            "Somewhat experienced",
            "Basic knowledge",
            "No experience"
        ],
        scores: [3, 2, 1, 0]
    },
    {
        id: 5,
        question: "How long do you plan to keep your investments?",
        options: [
            "10+ years",
            "5–10 years",
            "2–5 years",
            "Less than 2 years"
        ],
        scores: [3, 2, 1, 0]
    }
];
