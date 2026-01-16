import React from 'react';
import { Navigate } from 'react-router-dom';

// isLoggedIn: 로그인 상태 (true/false)
// children: 보호하고 싶은 페이지 (예: 강의실, 팀 관리)
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // 로그인을 안 했다면 로그인 페이지로 강제 이동!
    // alert("로그인이 필요한 서비스입니다."); // 필요하면 알림 추가
    return <Navigate to="/login" replace />;
  }

  // 로그인을 했다면 원래 가려던 페이지 보여줌
  return children;
};

export default ProtectedRoute;