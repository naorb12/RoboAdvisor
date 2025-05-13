import { useState } from 'react';
import './QuizPage.css';
import { quizQuestions } from '../../Data/quizQuestions';
import { QuestionCard } from '../../Components/QuestionCard/QuestionCard';
import { useNavigate } from 'react-router-dom';

export const QuizPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndexes, setSelectedIndexes] = useState<(number | null)[]>(
        Array(quizQuestions.length).fill(null)
    );
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
            const response = await fetch("http://localhost:8000/risk-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ answers: scores })
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
