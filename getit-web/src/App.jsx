import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 컴포넌트들 (파일이 실제로 존재하는지 꼭 확인하세요!)
import Navbar from './components/Navbar';
import Home from './pages/Open/Home';
import About from './pages/Open/About';
import Project from './pages/Open/Project';
import Recruit from './pages/Open/Recruit';
import Login from './pages/Auth/Login';
import Lecture from './pages/Member/Lecture';
import LectureDetail from './pages/Member/LectureDetail';
import Invest from './pages/Invest';
import Executives from './pages/Open/Excutives';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/Admin/AdminPage'; // 🔥 이 파일이 src/pages/AdminPage.jsx 에 있어야 합니다!

function App() {
  // role: 'GUEST' | 'MEMBER' | 'ADMIN'
  const [userRole, setUserRole] = useState('GUEST'); 

  // 로그인 여부 계산 (GUEST가 아니면 로그인 한 것)
  const isLoggedIn = userRole !== 'GUEST';

  return (
    <BrowserRouter>
      {/* Navbar에 역할 정보 전달 */}
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      
      <Routes>
        {/* Home에 로그인 여부 전달 */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/excutive" element={<Executives />} />
        <Route path="/recruit" element={<Recruit />} />
        
        {/* Login에 역할 설정 함수 전달 */}
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        
        {/* 🔐 멤버 & 관리자 공통 접근 */}
        {isLoggedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lecture" element={<Lecture />} />
            <Route path="/lecture/:id" element={<LectureDetail userRole={userRole} />} />
            <Route path="/invest" element={<Invest />} />
          </>
        )}

        {/* 👑 관리자 전용 페이지 */}
        {userRole === 'ADMIN' ? (
          <Route path="/admin" element={<AdminPage />} />
        ) : (
          <Route path="/admin" element={<Navigate to="/" replace />} />
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;