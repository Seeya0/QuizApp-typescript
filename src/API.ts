import { shuffleArray } from "./utils";

const DIFFICULTY = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
} as const;

export type Difficulty = typeof DIFFICULTY[keyof typeof DIFFICULTY]

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type QuestionState = Question & { answers: string[] }

export const fetchQuiz = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
    const endpoint = `https://opentdb.com/api.php?${amount}=10&difficulty=${difficulty}category=12&type=multiple`
    const response = await (await fetch(endpoint)).json();

    return response.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}