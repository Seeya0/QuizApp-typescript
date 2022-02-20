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
        <div className="flex flex-col justify-center items-center w-9/12">
            <h3 className="text-lg mb-16">Question: {questionNum} / {QuestionAmount}</h3>
            <p dangerouslySetInnerHTML={{ __html: question }} />

            <div className="my-8 text-lg">
                {answers.map(answer => (
                    <div key={answer} className="py-2" >
                        <button disabled={userAnswer ? true : false} value={answer} onClick={checkAnswer} className="bg-[#087E8B] p-4 w-full rounded-lg text-white cursor-pointer hover:text-opacity-75">
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Question
