import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Recruit from './pages/Recruit';
import Login from './pages/Login';
import Lecture from './pages/Lecture';
import Invest from './pages/Invest';
import Dashboard from './pages/Dashboard'; // 🔥 1. import 다시 추가!

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
        
        {/* 🔐 멤버 전용 (로그인 시 접근 가능) */}
        {isLoggedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard />} /> {/* 🔥 2. 라우트 복구 완료! */}
            <Route path="/lecture" element={<Lecture />} />
            <Route path="/invest" element={<Invest />} />
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;