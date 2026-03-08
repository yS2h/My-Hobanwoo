import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../utils/api";

function MainPage() {
  const navigate = useNavigate();
  const [totalParticipants, setTotalParticipants] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.STATS);
        if (response.ok) {
          const data = await response.json();
          console.log(data.totalParticipants)
          setTotalParticipants(data.totalParticipants || 0);
        }
      } catch (error) {
        console.error('참여자 수 조회 실패:', error);
        // 에러 발생 시 0으로 유지
      }
    };

    fetchStats();
  }, []);

  const handleStart = () => {
    navigate("/survey");
  };

  return (
    <div className="mobile-container">
      <div className="main-page">
        <img
          src="/images/title.png"
          alt="나만의 호반우"
          className="title-img"
        />

        <div className="button-section">
          <img
            src="/images/hobanwoo.png"
            alt="호반우 캐릭터"
            className="character-img"
          />

          <button className="start-button" onClick={handleStart}>
            <span className="button-text-main">시작하기</span>
            <span className="button-text-sub">
              지금까지 {totalParticipants.toLocaleString()}명이 확인했어요
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
