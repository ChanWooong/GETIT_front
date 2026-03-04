import axios from 'axios';

const api = axios.create({
  // .env에 설정된 주소를 기본값으로 사용
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  withCredentials: true, // 쿠키나 인증 정보를 포함해야 한다면 true
});

export default api;