import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';   // 방금 만든 Home
import About from './components/About'; // 아까 만든 About

function App() {
  return (
    <BrowserRouter>
      {/* 1. Navbar는 어떤 페이지든 항상 위에 떠 있어야 함 */}
      <Navbar />

      {/* 2. 주소에 따라 내용물이 갈아 끼워지는 영역 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* 나중에 추가할 페이지들... */}
        {/* <Route path="/project" element={<Project />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;