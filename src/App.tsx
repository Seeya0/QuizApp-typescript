import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  return (
    <div className="App">
      <h1>Quiz!!
      </h1>
    </div>
  );
}

export default App;
