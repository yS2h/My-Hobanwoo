import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "../utils/api";

function LoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [imgStep, setImgStep] = useState(1);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setImgStep((prev) => (prev === 1 ? 2 : 1));
    }, 300);

    const answers = location.state?.answers || [];

    // 백엔드에 답변 전송 및 결과 받기
    const submitAnswers = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.SUBMIT, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify( answers )
        });
        console.log(answers)
        
        if (!response.ok) {
          throw new Error('결과를 불러오는데 실패했습니다.');
        }
        
        const result = await response.json();
        
        // 결과 페이지로 이동
        navigate('/result', { state: { result } });
      } catch (error) {
        console.error('Error submitting answers:', error);
        alert('결과를 불러오는데 실패했습니다. 다시 시도해주세요.');
        navigate('/');
      }
    };
    
    submitAnswers();

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      clearInterval(imageTimer);
    };
  }, [location.state, navigate]);

  return (
    <div className="mobile-container">
      <div className="loading-container">
        <div className="loading-image-wrapper">
          <img
            src={
              imgStep === 1 ? "/images/hobanwoo.png" : "/images/hobanwoo2.png"
            }
            alt="로딩 캐릭터"
            className={`loading-character ${imgStep === 1 ? "step-down" : "step-up"}`}
          />
        </div>

        <h2 className="loading-title">결과 분석 중...</h2>
        <p className="loading-sub">당신의 호반우 타입을 찾고 있어요!</p>
      </div>
    </div>
  );
}

export default LoadingPage;