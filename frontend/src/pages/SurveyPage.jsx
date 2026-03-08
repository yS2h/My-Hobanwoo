import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../utils/api";

function SurveyPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 페이지 로드 시 질문 받아오기
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.SURVEY);
        if (!response.ok) {
          throw new Error('질문을 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        
        // API 응답 형식을 프론트 형식으로 변환 + \\n을 \n으로 치환
        const formattedQuestions = data.map(q => ({
          id: q.id,
          question: q.question.replace(/\\n/g, '\n'),
          options: [
            { text: q.optionA.replace(/\\n/g, '\n'), type: "A" },
            { text: q.optionB.replace(/\\n/g, '\n'), type: "B" }
          ]
        }));
        
        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

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

  // 로딩 중
  if (loading) {
    return (
      <div className="mobile-container">
        <div className="survey-page">
          <div className="question-card">
            <div className="question-text">질문을 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="mobile-container">
        <div className="survey-page">
          <div className="question-card">
            <div className="question-text">오류: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  // 질문이 없는 경우
  if (questions.length === 0) {
    return (
      <div className="mobile-container">
        <div className="survey-page">
          <div className="question-card">
            <div className="question-text">질문이 없습니다.</div>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="question-text" style={{ whiteSpace: 'pre-line' }}>
            {currentQuestion.question}
          </div>
        </div>

        <div className="answer-section">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className="answer-button"
              onClick={() => handleAnswer(option.type)}
              style={{ whiteSpace: 'pre-line' }}
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