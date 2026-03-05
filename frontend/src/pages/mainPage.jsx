import { useNavigate } from "react-router-dom";
function MainPage() {
  const navigate = useNavigate();

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
            <span className="button-text-sub">지금까지 ~학우가 확인했어요</span>
            {/* 여기 ~ 숫자 나중에 db에서 받아오깅 */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
