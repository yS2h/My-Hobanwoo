// API 기본 URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://my-hobanwoo.onrender.com';

// API 엔드포인트
export const API_ENDPOINTS = {
  SURVEY: `${API_BASE_URL}/survey`,
  LOADING: `${API_BASE_URL}/loading`,
  SUBMIT: `${API_BASE_URL}/submit`
};