"use client";

import { useState } from "react";
import { questionnaire } from "@/constants/questionnaire";

export default function QuestionnaireApp({
  currentQuestion,
  setCurrentQuestion,
}: {
  currentQuestion: number;
  setCurrentQuestion: (question: number) => void;
}) {
  const [answers, setAnswers] = useState<Array<boolean | null>>(
    Array(questionnaire.length).fill(null)
  );
  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleContinue = () => {
    if (currentQuestion < questionnaire.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Question Content */}
      <div className="flex-1 p-6 flex flex-col">
        <h2 className="text-3xl font-medium text-center mb-8 text-amber-500">
          {questionnaire[currentQuestion - 1].question}
        </h2>

        <div className="mt-8 space-y-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="answer"
              className="h-6 w-6 border-2 border-gray-300 rounded-full"
              checked={answers[currentQuestion] === true}
              onChange={() => handleAnswer(true)}
            />
            <span className="ml-4 text-xl">True</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="answer"
              className="h-6 w-6 border-2 border-gray-300 rounded-full"
              checked={answers[currentQuestion] === false}
              onChange={() => handleAnswer(false)}
            />
            <span className="ml-4 text-xl">False</span>
          </label>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 flex justify-between items-center">
        <div className="text-xl">
          Question {currentQuestion} of {questionnaire.length}
        </div>
        <button
          className="bg-yellow-400 text-black px-6 py-3 rounded-md text-xl"
          onClick={handleContinue}
        >
          Continue »
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200">
        <div
          className="h-full bg-gray-500"
          style={{
            width: `${((currentQuestion + 1) / questionnaire.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
