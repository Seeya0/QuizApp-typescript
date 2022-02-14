import { shuffleArray } from "./utils";

export const fetchQuiz = async (amount, difficulty) => {
    const endpoint = `https://opentdb.com/api.php?${amount}=10&difficulty=${difficulty}category=12&type=multiple`
    const response = await (await fetch(endpoint)).json();

    return response.results.map((question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}