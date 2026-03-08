import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const serverResult = location.state?.result;

  const imageMap = {
    출석업고튀우: "/images/results/ISTP.png",
    중앙도서관우: "/images/results/ISTJ.png",
    뒷공부우: "/images/results/ISFP.png",
    전액장학우: "/images/results/ISFJ.png",
    일청담에서살우: "/images/results/INTP.png",
    공강이제일좋우: "/images/results/INTJ.png",
    이불밖은싫우: "/images/results/INFP.png",
    감성브이록우: "/images/results/INFJ.png",
    럭키카우: "/images/results/ESFP.png",
    내말이다맞우: "/images/results/ENTP.png",
    야망있우: "/images/results/ENTJ.png",
    투쁠우: "/images/results/ESFJ.png",
    치타는웃고있우: "/images/results/ESTP.png",
    학생회장우: "/images/results/ESTJ.png",
    오늘만살우: "/images/results/ENFP.png",
    우리는모두친우: "/images/results/ENFJ.png",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!serverResult) {
      navigate("/");
    }
  }, [serverResult, navigate]);

  if (!serverResult) return null;

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => alert("링크가 클립보드에 복사되었습니다!"))
      .catch(() => alert("복사에 실패했습니다."));
  };

  return (
    <div className="mobile-container">
      <div className="result-page-final">
        <div className="result-image-section">
          <img
            src={
              imageMap[serverResult.resultType] || "/images/results/default.png"
            }
            alt="호반우 증명서"
            className="result-main-image"
          />
        </div>

        <p
          style={{
            marginTop: "10px",
            color: "#000000",
            textAlign: "center",
          }}
        >
          ▲ 이미지 꾹 눌러 저장하기 ▲
        </p>

        <div className="result-detail-box">
          <p className="description-text">{serverResult.description}</p>
        </div>

        <div className="result-detail-box statistics-box">
          <div className="stats-circle-placeholder">그래프</div>
          <p className="stats-summary-text">
            설문자 전체 중 <strong>{serverResult.percentage}%</strong> 입니다.
          </p>
        </div>

        <p
          style={{
            marginTop: "40px",
            color: "#888",
            textDecoration: "underline",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => navigate("/")}
        >
          테스트 다시하기
        </p>

        <div className="floating-share-bar">
          <button className="share-action-button" onClick={handleShare}>
            결과 공유하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
