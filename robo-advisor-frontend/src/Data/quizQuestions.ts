import { QuizQuestion } from "../types/quiz.types";

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: "What is your age?",
        inputType: "multiple-choice",
        options: [
            "Under 30",          // high risk tolerance
            "30-50",
            "50-67",
            "Over 67"            // low risk tolerance
        ],
        scores: [3, 2, 1, 0] // Example scores corresponding to options
    },
    {
        id: 2,
        question: "How would you react if you had a protfolio worth of 1,000,000, it went down to 800,000?",
        inputType: "multiple-choice",
        options: [
            "Buy more (it's an opportunity)",  // high risk
            "Hold and wait",
            "Sell a part to reduce losses",
            "Sell everything"                  // low risk
        ],
        scores: [3, 2, 1, 0] // Example scores corresponding to options
    },
    {
        id: 3,
        question: "What is your primary goal?",
        inputType: "multiple-choice",
        options: [
            "Capital growth (long term)",     // high risk
            "Balanced growth and income",
            "Stable income", //REMOVE!
            "Capital preservation"            // low risk
        ],
        scores: [3, 2, 1, 0] // Example scores corresponding to options
    },
    {
        id: 4,
        question: "How experienced are you with investing?",
        inputType: "multiple-choice",
        options: [
            "Very experienced",               // high risk
            "Somewhat experienced",
            "Basic knowledge",
            "No experience"                   // low risk
        ],
        scores: [3, 2, 1, 0] // Example scores corresponding to options
    },
    {
        id: 5,
        question: "How long do you plan to keep your investments?",
        inputType: "multiple-choice",
        options: [
            "10+ years",                      // high risk
            "5-10 years",
            "2-5 years",
        ],
        scores: [3, 2, 1, 0] // Example scores corresponding to options
    }
];
