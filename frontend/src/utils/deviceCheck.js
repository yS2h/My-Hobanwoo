// 모바일 기기 체크
export const isMobile = () => {
  // User Agent 체크
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // 모바일 기기 패턴
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  
  // 화면 크기도 함께 체크 (768px 이하를 모바일로 간주)
  const isMobileScreen = window.innerWidth <= 768;
  
  return mobileRegex.test(userAgent) || isMobileScreen;
};