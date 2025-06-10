// export type QuizQuestion = {
//     id: number;
//     question: string;
//     options: string[];
//     scores: number[];
// };
export type QuizQuestion = {
    id: number;
    question: string;
    inputType: string; // Added inputType property
    options: string[];
    scores: number[];
};
