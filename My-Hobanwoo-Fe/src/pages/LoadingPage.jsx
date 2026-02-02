import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function LoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const answers = location.state?.answers || [];
    
    // 임시: 2초 후 더미 결과로 이동 (백엔드 연동 전)
    setTimeout(() => {
      // O 개수로 간단하게 타입 결정
      const oCount = answers.filter(a => a.answer === 'O').length;
      
      let resultType;
      if (oCount >= 8) {
        resultType = {
          type: "내성적인 호반우",
          description: "혼자만의 시간을 즐기는 당신! 조용한 카페에서 책 읽는 게 제일 행복해요.",
          image: "🐮"
        };
      } else if (oCount >= 5) {
        resultType = {
          type: "대학원호반우",
          description: "학문에 진심인 당신! 도서관이 집보다 편해요.",
          image: "📚"
        };
      } else if (oCount >= 3) {
        resultType = {
          type: "과대호반우",
          description: "열정 넘치는 리더형! 과 행사는 당신이 주인공!",
          image: "⭐"
        };
      } else {
        resultType = {
          type: "인싸 호반우",
          description: "사람들과 함께하는 게 최고! 매일이 축제!",
          image: "🎉"
        };
      }
      
      navigate('/result', { state: { result: resultType } });
    }, 2000);

    // 나중에 백엔드 연동 시 이 부분 사용
    /*
    const sendAnswers = async () => {
      try {
        const response = await fetch('API_URL/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers })
        });
        const result = await response.json();
        
        navigate('/result', { state: { result } });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    sendAnswers();
    */
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="text-center">
        <div className="mb-8">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500 mx-auto"></div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          결과 분석 중...
        </h2>
        <p className="text-xl text-gray-600">
          당신의 호반우 타입을 찾고 있어요 🐮
        </p>
      </div>
    </div>
  );
}

export default LoadingPage;