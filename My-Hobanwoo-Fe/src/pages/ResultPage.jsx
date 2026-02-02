import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  // 백엔드에서 결과를 받기 전 임시 데이터
  const resultData = result || {
    type: "내성적인 호반우",
    description: "혼자만의 시간을 즐기는 당신! 조용한 카페에서 책 읽는 게 제일 행복해요.",
    image: "🐮"
  };

  const handleRestart = () => {
    navigate('/');
  };

  const handleShare = () => {
    // 공유 기능 (나중에 구현)
    alert('공유 기능은 준비 중입니다!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full text-center">
        <div className="text-8xl mb-6">
          {resultData.image}
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          당신은...
        </h1>
        
        <h2 className="text-5xl font-bold text-purple-600 mb-8">
          {resultData.type}
        </h2>
        
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          {resultData.description}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRestart}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
          >
            다시 하기
          </button>
          <button
            onClick={handleShare}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
          >
            결과 공유하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;