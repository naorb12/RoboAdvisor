import { useState } from 'react';
import './QuizPage.css';
import { quizQuestions } from '../../Data/quizQuestions';
import { QuestionCard } from '../../Components/QuestionCard/QuestionCard';
import { ProposalPage } from '../ProposalPage/ProposalPage';
import { useNavigate } from 'react-router-dom';

export const QuizPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<(string | number | null)[]>(
        Array(quizQuestions.length).fill(null)
    );
    const [showProposal, setShowProposal] = useState(false);

    const currentQuestion = quizQuestions[currentIndex];
    const navigate = useNavigate();

    const handleAnswer = (value: string | number) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = value;
        setAnswers(newAnswers);
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

    const handleGenerate = () => {
        navigate('/proposal');
    };

    if (showProposal) {
        return (
            <div className="quiz-page">
                {<ProposalPage />}

            </div>
        );
    }

    return (
        <div className="quiz-page">
            <QuestionCard
                question={currentQuestion}
                answer={answers[currentIndex]}
                onAnswer={handleAnswer}
            />

            <div className="nav-buttons">
                {currentIndex > 0 && (
                    <button onClick={handlePrevious}>Previous</button>
                )}

                {currentIndex < quizQuestions.length - 1 ? (
                    <button
                        onClick={handleNext}
                        disabled={answers[currentIndex] === null}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleGenerate}
                        disabled={answers[currentIndex] === null}
                    >
                        Generate Proposal
                    </button>
                )}
            </div>
        </div>
    );
};
