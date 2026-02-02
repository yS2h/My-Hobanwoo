import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SurveyPage from './pages/SurveyPage';
import LoadingPage from './pages/LoadingPage';
import ResultPage from './pages/ResultPage';
import MobileWarning from './components/MobileWarning';

function App() {
  return (
    <BrowserRouter>
      <MobileWarning />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;