import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';

function SurveyPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { questionId: questions[currentQuestion].id, answer }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 모든 질문 완료 - 결과 페이지로 이동
      navigate('/loading', { state: { answers: newAnswers } });
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      {/* 진행률 바 */}
      <div className="w-full max-w-2xl mb-8">
        <div className="bg-gray-200 rounded-full h-4">
          <div
            className="bg-purple-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center mt-2 text-gray-600">
          {currentQuestion + 1} / {questions.length}
        </p>
      </div>

      {/* 질문 카드 */}
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          {questions[currentQuestion].question}
        </h2>

        {/* O/X 버튼 */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleAnswer('O')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-12 rounded-2xl text-2xl transition-all transform hover:scale-105"
          >
            O
          </button>
          <button
            onClick={() => handleAnswer('X')}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-12 rounded-2xl text-2xl transition-all transform hover:scale-105"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default SurveyPage;
