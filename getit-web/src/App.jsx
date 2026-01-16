// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Invest from './pages/Invest';
import Recruit from './pages/Recruit'; // 🔥 import 추가

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/recruit" element={<Recruit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;