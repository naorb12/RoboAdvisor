import { QuizQuestion } from "../types/quiz.types";

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: "What is your age?",
        inputType: "slider",
        min: 18,
        max: 100,
        step: 1
    },
    {
        id: 2,
        question: "How long do you plan to keep your money invested?",
        inputType: "multiple-choice",
        options: [
            "Less than 3 years",
            "3–5 years",
            "5–10 years",
            "More than 10 years"
        ]
    },
    {
        id: 3,
        question: "How would you react if your portfolio lost 20% of its value in a month?",
        inputType: "multiple-choice",
        options: [
            "I would sell everything immediately",
            "I would be concerned but wait it out",
            "I would see it as an opportunity to invest more"
        ]
    },
    {
        id: 4,
        question: "What is your annual income?",
        inputType: "multiple-choice",
        options: [
            "Less than $50,000",
            "$50,000–$100,000",
            "$100,000–$200,000",
            "More than $200,000"
        ]
    },
    {
        id: 5,
        question: "How would you rate your investment experience?",
        inputType: "multiple-choice",
        options: [
            "Beginner - new to investing",
            "Intermediate - some experience",
            "Advanced - very experienced"
        ]
    }
];
