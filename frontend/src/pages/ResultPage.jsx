import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const dummyData = 8;

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
  const imgUrl = API_BASE_URL + serverResult.image;

  // 여기 나중에 받아오는 거로 수정
  const myPercent = parseFloat(dummyData) || 0;
  const chartData = [
    { name: "나의 결과", value: myPercent },
    { name: "나머지", value: 100 - myPercent },
  ];
  const SHADOW_COLOR = "rgba(0, 0, 0, 0.2)";

  return (
    <div className="mobile-container">
      <div className="result-page-final">
        <div className="result-image-section">
          <img
            src={imgUrl || "/images/results/default.png"}
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
          <h3
            style={{
              marginTop: 0,
              marginBottom: "15px",
              color: "#333",
              fontSize: "18px",
            }}
          >
            호반우 분포도
          </h3>

          {/* 💡 [차트 렌더링 영역] */}
          <div style={{ width: "100%", height: "200px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#d75555" : "#ececec"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="stats-summary-text">
            설문자 전체 중 <strong>{dummyData}%</strong> 입니다.
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
