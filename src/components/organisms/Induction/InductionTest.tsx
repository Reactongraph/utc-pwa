"use client";

import { InductionTestStart, QuestionnaireApp } from "@/components";
import React, { useState } from "react";

export default function InductionTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  return (
    <div className="flex flex-col h-full">
      {currentQuestion === 0 && (
        <InductionTestStart setCurrentQuestion={setCurrentQuestion} />
      )}
      {currentQuestion > 0 && (
        <QuestionnaireApp
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      )}
    </div>
  );
}
