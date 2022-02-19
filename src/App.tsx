import { useState } from "react";
import { fetchQuiz, Difficulty, QuestionState } from "./API";
import Question from "./components/Question";

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
      'medium'
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
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-2xl">Let's Quiz!</h3>
      {gameOver || userAnswers.length === QuestionAmount ? (
        <button className="bg-emerald-300 rounded-3xl text-white p-4 hover:opacity-70" onClick={startQuiz}>
          Start
        </button>
      ) : null}
      {!gameOver ? <h3 className="text-2xl">Score: {score}</h3> : null}
      {loading ? <h3 className="text-2xl">クイズを考えていますので、少し待ってね〜</h3> : null}

      {!loading && !gameOver && (
        <Question
          questionNum={number + 1}
          QuestionAmount={QuestionAmount}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          checkAnswer={checkAnswer}
        />
      )}

      {!gameOver && !loading && userAnswers.length === number + 1 && number !== QuestionAmount - 1 ? (
        <button className="bg-emerald-300 rounded-3xl text-white p-4 hover:opacity-70" onClick={moveToQuestion}>
          次の問題
        </button>
      ) : null}

    </div>
  );
}

export default App;
