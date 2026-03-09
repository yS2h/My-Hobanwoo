import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL, API_ENDPOINTS } from "../utils/api";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { shareCode } = useParams();

  const [serverResult, setServerResult] = useState(location.state?.result || null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false); // ✅ 한 번만 호출했는지 체크

  useEffect(() => {
    window.scrollTo(0, 0);

    // ✅ 이미 API 호출했으면 스킵
    if (hasFetched.current) {
      return;
    }

    const fetchResult = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.RESULT}/${shareCode}`);
        
        if (!response.ok) {
          throw new Error('결과를 찾을 수 없습니다.');
        }
        
        const data = await response.json();
        setServerResult(data);
        hasFetched.current = true; // ✅ 호출 완료 표시
      } catch (error) {
        console.error('결과 조회 실패:', error);
        alert('결과를 불러올 수 없습니다.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (shareCode) {
      fetchResult();
    } else {
      navigate('/');
    }
  }, [shareCode, navigate]); // ✅ serverResult 제거

  if (loading) {
    return (
      <div className="mobile-container">
        <div className="loading-container">
          <h2 className="loading-title">결과 불러오는 중...</h2>
        </div>
      </div>
    );
  }

  if (!serverResult) return null;

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => alert("링크가 클립보드에 복사되었습니다!"))
      .catch(() => alert("복사에 실패했습니다."));
  };

  const imgUrl = API_BASE_URL + serverResult.image;
  const myPercent = parseFloat(serverResult.percentage) || 0;

  const chartData = [
    { name: "나의 결과", value: myPercent },
    { name: "나머지", value: 100 - myPercent },
  ];

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
              marginBottom: "30px",
              color: "#333",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            호반우 분포도
          </h3>

          <div style={{ position: "relative", width: "100%", height: "220px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ value: 100 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={85}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                >
                  <Cell fill="#E8E8F0" />
                </Pie>

                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={85}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                  cornerRadius={10}
                >
                  <Cell fill="#A31919" />
                  <Cell fill="transparent" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div
              style={{
                position: "absolute",
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "12px", color: "#666", marginBottom: "0px" }}>
                Total
              </div>
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#333" }}>
                {myPercent}%
              </div>
            </div>
          </div>

          <p className="stats-summary-text" style={{ textAlign: "center", marginTop: "20px" }}>
            설문자 전체 중 <strong>{myPercent}%</strong> 입니다.
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