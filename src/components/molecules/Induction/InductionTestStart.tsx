import React from "react";

export default function InductionTestStart({
  setCurrentQuestion,
}: {
  setCurrentQuestion: (question: number) => void;
}) {
  return (
    <div className="flex-1 p-6">
      <h2 className="text-3xl font-medium text-center mb-8 text-amber-500">
        Induction Test
      </h2>

      <p className="text-center text-lg mb-8">
        Please complete the UTC questionnaire prior to commencing work. You will
        need to read the Team Members Handbook and watch the video to help you
        answer the questions.
      </p>

      <p className="text-center text-lg mb-12">
        You must answer all questions correctly or you will not receive your
        induction card.
      </p>

      <div className="flex justify-center">
        <button
          onClick={() => setCurrentQuestion(1)}
          className="bg-yellow-400 text-black px-8 py-4 text-xl font-medium rounded"
        >
          Start Questionnaire »
        </button>
      </div>
    </div>
  );
}
