import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Recruit from './pages/Recruit';
import Login from './pages/Login';
import Lecture from './pages/Lecture';
import LectureDetail from './pages/LectureDetail'; // 🔥 새로 추가
import Invest from './pages/Invest';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<About />} />
        
        {/* 게스트용 */}
        <Route path="/project" element={<Project />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        
        {/* 🔐 멤버 전용 */}
        {isLoggedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lecture" element={<Lecture />} />
            {/* 🔥 상세 페이지 라우트 추가! (:id는 변수입니다) */}
            <Route path="/lecture/:id" element={<LectureDetail />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/lecture/:id" element={<LectureDetail />} />
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;