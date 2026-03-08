import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const serverResult = location.state?.result;

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
  const imgUrl = API_BASE_URL + serverResult.image
  return (
    <div className="mobile-container">
      <div className="result-page-final">
        <div className="result-image-section">
          <img
            src={
              imgUrl || "/images/results/default.png"
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
