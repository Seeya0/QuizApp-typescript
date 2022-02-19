import React from 'react'
import { userAnswersType } from '../App'

export type QuestionType = {
    question: string;
    QuestionAmount: number;
    answers: string[];
    userAnswer: userAnswersType | undefined;
    questionNum: number;
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Question: React.VFC<QuestionType> = ({ questionNum, QuestionAmount, userAnswer, answers, checkAnswer, question }) => {
    return (
        <div>
            <h3>Question: {questionNum}/{QuestionAmount}</h3>
            <p dangerouslySetInnerHTML={{ __html: question }} />

            <div>
                {answers.map(answer => (
                    <div key={answer} >
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
