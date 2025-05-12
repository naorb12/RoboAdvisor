export type QuizQuestion = {
    id: number;
    question: string;
    inputType: 'multiple-choice' | 'slider';
    options?: string[];
    min?: number;
    max?: number;
    step?: number;
};