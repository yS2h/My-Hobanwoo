import { useLocation, useNavigate } from 'react-router-dom';
import { shareNative, copyToClipboard, saveAsImage } from '../utils/share';

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

  const handleShare = async () => {
    const shareUrl = window.location.origin; // 배포 후에는 실제 URL
    const shareTitle = '호반우 테스트';
    const shareText = `나는 ${resultData.type}! 너는 어떤 호반우?`;

    const success = await shareNative(shareTitle, shareText, shareUrl);
    
    if (success) {
      alert('공유 완료!');
    } else {
      // 공유 실패 시 URL 복사
      const copied = await copyToClipboard(shareUrl);
      if (copied) {
        alert('링크가 복사되었습니다!');
      } else {
        alert('공유에 실패했습니다.');
      }
    }
  };

  const handleSaveImage = async () => {
    const success = await saveAsImage('result-card', `${resultData.type}.png`);
    
    if (success) {
      alert('이미지가 저장되었습니다!');
    } else {
      alert('이미지 저장에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      {/* 이미지 저장용 ID 추가 */}
      <div id="result-card" className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full text-center">
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

        <div className="flex flex-col gap-3">
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
            >
              다시 하기
            </button>
            <button
              onClick={handleShare}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
            >
              결과 공유하기
            </button>
          </div>
          
          <button
            onClick={handleSaveImage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 mx-auto"
          >
            이미지로 저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;