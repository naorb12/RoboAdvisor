import './QuestionCard.css'
import { QuizQuestion } from '../../types/quiz.types';

type Props = {
    question: QuizQuestion;
    answer: string | number | null;
    onAnswer: (value: string | number) => void;
};

export const QuestionCard = ({ question, answer, onAnswer }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onAnswer(e.target.value);
    };

    return (
        <div className="question-card">
            <h2>{question.question}</h2>

            {question.inputType === 'slider' && (
                <>
                    <input
                        type="range"
                        min={question.min}
                        max={question.max}
                        step={question.step}
                        value={answer ?? question.min}
                        onChange={(e) => onAnswer(Number(e.target.value))}
                    />
                    <div>Selected Age: {answer ?? question.min}</div>
                </>
            )}

            {question.inputType === 'multiple-choice' && question.options?.map((option, index) => (
                <label key={index} className="option">
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answer === option}
                        onChange={handleChange}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
};
