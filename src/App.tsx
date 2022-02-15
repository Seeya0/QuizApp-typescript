import { useState } from "react";
import { fetchQuiz, Difficulty, QuestionState } from "./API";

const QuestionAmount = 5

export type userAnswersType = {
  question: string,
  userAnswer: string,
  correct: boolean,
  correctAnswer: string
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<userAnswersType[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuiz(
      QuestionAmount,
      "medium"
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      //ユーザーの回答
      const userAnswer = e.currentTarget.value;

      //正解かどうかの判定
      const correct = questions[number].correct_answer === userAnswer;

      if (correct) {
        setScore((prev) => prev + 1)
      }

      const answerObject = {
        question: questions[number].question,
        userAnswer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  const moveToQuestion = () => {
    //最後の質問でない場合は次にすすむ
    const nextQuestion = number + 1

    if (nextQuestion === QuestionAmount) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="App">
      <h1>Quiz!!
      </h1>
    </div>
  );
}

export default App;
