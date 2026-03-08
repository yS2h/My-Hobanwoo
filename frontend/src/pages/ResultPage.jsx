import { useLocation, useNavigate } from 'react-router-dom';
import { shareNative, copyToClipboard, saveAsImage } from '../utils/share';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  // 백엔드에서 결과를 받지 못한 경우 메인으로 이동
  if (!result) {
    navigate('/');
    return null;
  }

  const handleRestart = () => {
    navigate('/');
  };

  const handleShare = async () => {
    const shareUrl = window.location.origin;
    const shareTitle = '호반우 테스트';
    const shareText = `나는 ${result.resultType}! 너는 어떤 호반우?`;

    const success = await shareNative(shareTitle, shareText, shareUrl);
    
    if (success) {
      alert('공유 완료!');
    } else {
      const copied = await copyToClipboard(shareUrl);
      if (copied) {
        alert('링크가 복사되었습니다!');
      } else {
        alert('공유에 실패했습니다.');
      }
    }
  };

  const handleSaveImage = async () => {
    const success = await saveAsImage('result-card', `${result.resultType}.png`);
    
    if (success) {
      alert('이미지가 저장되었습니다!');
    } else {
      alert('이미지 저장에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div id="result-card" className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full text-center">
        <div className="text-8xl mb-6">
          {result.image}
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          당신은...
        </h1>
        
        <h2 className="text-5xl font-bold text-purple-600 mb-8">
          {result.resultType}
        </h2>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
          {result.description}
        </p>

        {/* details가 있으면 표시 */}
        {result.details && result.details.length > 0 && (
          <div className="text-left bg-purple-50 rounded-2xl p-6 mb-8">
            <ul className="space-y-2">
              {result.details.map((detail, index) => (
                <li key={index} className="text-gray-700">
                  • {detail}
                </li>
              ))}
            </ul>
          </div>
        )}

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