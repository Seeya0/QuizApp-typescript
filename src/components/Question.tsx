import React from 'react'

const Question = ({ questionNum, QuestionAmount, userAnswer, answers, checkAnswer, question }) => {
    return (
        <div>
            <h3>Question: {questionNum}/{QuestionAmount}</h3>
            <p dangerouslySetInnerHTML={{ __html: question }} />

            <div>
                {answers.map((answer) => (
                    <div key={answer} correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer}>
                        <button disabled={userAnswer ? true : false} value={answer} onClick={checkAnswer}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Question
