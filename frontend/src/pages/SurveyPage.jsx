import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";

function SurveyPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (selectedOption) => {
    const newAnswers = [
      ...answers,
      {
        questionId: questions[currentStep].id,
        answer: selectedOption,
      },
    ];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/loading", { state: { answers: newAnswers } });
    }
  };

  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentQuestion = questions[currentStep];

  return (
    <div className="mobile-container">
      <div className="survey-page">
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="question-count">
          {currentStep + 1}/{questions.length}
        </div>

        <div className="question-card">
          <div className="question-text">{currentQuestion.question}</div>
        </div>

        <div className="answer-section">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className="answer-button"
              onClick={() => handleAnswer(option.type)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurveyPage;
