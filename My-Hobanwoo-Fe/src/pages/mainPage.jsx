import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/survey');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          🐮 호반우 테스트 🐮
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          나는 어떤 호반우일까?
        </p>
        <p className="text-gray-500 mb-12">
          10개의 질문으로 알아보는 나의 대학생활 유형
        </p>
        
        <button
          onClick={handleStart}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105"
        >
          테스트 시작하기
        </button>
      </div>
    </div>
  );
}

export default MainPage;
