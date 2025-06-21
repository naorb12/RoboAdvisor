import React from 'react';
import { useState } from 'react';
import './QuizPage.css';
import { quizQuestions } from '../../Data/quizQuestions';
import { QuestionCard } from '../../Components/QuestionCard/QuestionCard';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../Components/Structure/Header';

export const QuizPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndexes, setSelectedIndexes] = useState<(number | null)[]>(
        Array(quizQuestions.length).fill(null)
    );
    const [resetKey, setResetKey] = useState(0); 
    const navigate = useNavigate();

    const currentQuestion = quizQuestions[currentIndex];

    const handleAnswer = (selectedIndex: number) => {
        const updatedAnswers = [...selectedIndexes];
        updatedAnswers[currentIndex] = selectedIndex;
        setSelectedIndexes(updatedAnswers);
    };

    const handleNext = () => {
        if (currentIndex < quizQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleGenerate = async () => {
        if (selectedIndexes.includes(null)) {
            alert("Please answer all questions before submitting.");
            return;
        }

        const scores = selectedIndexes.map((selectedIndex, i) =>
            quizQuestions[i].scores[selectedIndex as number]
        );

        try {
            const rawUserId = localStorage.getItem("userId");
            console.log("Raw user ID:", rawUserId);  // 👈 זה חשוב
            const userId = parseInt(rawUserId!);
            console.log("Parsed user ID:", userId);

            const payload = {
            answers: scores,
            user_id: userId
            };
            console.log("Payload:", payload);

            const response = await fetch("http://127.0.0.1:8000/risk-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ answers: scores , user_id: parseInt(localStorage.getItem("userId")!) })
                
            });

            if (!response.ok) {
                throw new Error("Failed to fetch risk profile");
            }

            const data = await response.json();
            navigate("/proposal", { state: { proposal: data } });

        } catch (error) {
            console.error("Error sending answers:", error);
            alert("Something went wrong while generating the proposal.");
        }
    };

    return (

        <div className="quiz-page">
            <Header />
            <QuestionCard
                question={currentQuestion}
                answer={selectedIndexes[currentIndex]}
                onAnswer={handleAnswer}
            />

            <div className="nav-buttons">
                {currentIndex > 0 && (
                    <button onClick={handlePrevious}>Previous</button>
                )}

                {currentIndex < quizQuestions.length - 1 ? (
                    <button
                        onClick={handleNext}
                        disabled={selectedIndexes[currentIndex] === null}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleGenerate}
                        disabled={selectedIndexes[currentIndex] === null}
                    >
                        Generate Proposal
                    </button>
                )}
            </div>
        </div>
    );
};
