import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function LoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [imgStep, setImgStep] = useState(1);
  useEffect(() => {
    const imageTimer = setInterval(() => {
      setImgStep((prev) => (prev === 1 ? 2 : 1));
    }, 300);
    const answers = location.state?.answers || [];

    const resultTimer = setTimeout(() => {
      const oCount = answers.filter((a) => a.answer === "O").length;

      let resultType;
      if (oCount >= 8) {
        resultType = {
          type: "내성적인 호반우",
          description:
            "혼자만의 시간을 즐기는 당신! 조용한 카페에서 책 읽는 게 제일 행복해요.",
          image: "🐮",
        };
      } else if (oCount >= 5) {
        resultType = {
          type: "대학원호반우",
          description: "학문에 진심인 당신! 도서관이 집보다 편해요.",
          image: "📚",
        };
      } else if (oCount >= 3) {
        resultType = {
          type: "과대호반우",
          description: "열정 넘치는 리더형! 과 행사는 당신이 주인공!",
          image: "⭐",
        };
      } else {
        resultType = {
          type: "인싸 호반우",
          description: "사람들과 함께하는 게 최고! 매일이 축제!",
          image: "🎉",
        };
      }

      navigate("/result", { state: { result: resultType } });
    }, 3000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      clearInterval(imageTimer);
      clearTimeout(resultTimer);
    };
  }, [location.state, navigate]);

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
