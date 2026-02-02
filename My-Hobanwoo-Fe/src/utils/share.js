// URL 복사 기능
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('복사 실패:', err);
    return false;
  }
};

// 네이티브 공유 기능 (모바일)
export const shareNative = async (title, text, url) => {
  // Web Share API 지원 확인 (주로 모바일)
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url
      });
      return true;
    } catch (err) {
      // 사용자가 취소한 경우는 에러로 처리하지 않음
      if (err.name !== 'AbortError') {
        console.error('공유 실패:', err);
      }
      return false;
    }
  } else {
    // Web Share API 미지원시 URL 복사로 fallback
    return await copyToClipboard(url);
  }
};

// 결과 이미지로 저장 (html2canvas 사용)
export const saveAsImage = async (elementId, filename = 'hobanwoo-result.png') => {
  try {
    const html2canvas = (await import('html2canvas')).default;
    const element = document.getElementById(elementId);
    
    if (!element) {
      throw new Error('요소를 찾을 수 없습니다');
    }

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2 // 고화질
    });

    // 이미지 다운로드
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    return true;
  } catch (err) {
    console.error('이미지 저장 실패:', err);
    return false;
  }
};