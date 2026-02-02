import { useState, useEffect } from 'react';
import { isMobile } from '../utils/deviceCheck';

function MobileWarning() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // 약간의 딜레이를 주어 cascading render 방지
    const timer = setTimeout(() => {
      if (!isMobile()) {
        setShowWarning(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="text-6xl mb-4">📱</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          모바일 전용 서비스입니다
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          이 서비스는 모바일 환경에 최적화되어 있습니다.<br />
          PC로의 접속을 자제 부탁드립니다.
        </p>
        <button
          onClick={() => setShowWarning(false)}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default MobileWarning;