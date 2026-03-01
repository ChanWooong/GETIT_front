import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Open/Home';
import About from './pages/Open/About';
import Project from './pages/Open/Project';
import Recruit from './pages/Open/Recruit';
import Signup from './pages/Auth/Singup';
import Login from './pages/Auth/Login';
import Lecture from './pages/Member/LectureList.jsx';
import LectureDetail from './pages/Member/LectureDetail/index.jsx';
import Invest from './pages/Invest';
import Executives from './pages/Open/Excutives';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/Admin/AdminPage/index.jsx';

function App() {
  const [userRole, setUserRole] = useState('GUEST'); 

  const isLoggedIn = userRole !== 'GUEST';

  return (
    <BrowserRouter>
    
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/excutive" element={<Executives />} />
        <Route path="/recruit" element={<Recruit />} />
        
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/signup" element={<Signup />} />

        {isLoggedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lecture" element={<Lecture />} />
            <Route path="/lecture/:id" element={<LectureDetail userRole={userRole} />} />
            <Route path="/invest" element={<Invest />} />
          </>
        )}

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