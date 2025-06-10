import React from 'react';
import { useState } from 'react'
import './QuestionCard.css';
import { QuizQuestion } from '../../types/quiz.types';

type Props = {
    question: QuizQuestion;
    answer: number | null;
    onAnswer: (value: number) => void;
};

export const QuestionCard = ({ question, answer, onAnswer }: Props) => {
    return (
        <div className="question-card">
            <h2>{question.question}</h2>

            {question.options.map((option, index) => (
                <label key={index} className="option">
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={index}
                        checked={answer === index}
                        onChange={() => onAnswer(index)}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
};
