import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Public/Home/index.jsx';
import About from './pages/Public/About/index.jsx';
import Recruit from './pages/Public/Recruit/index.jsx';
import ProfileSetup from './pages/Auth/ProfileSetup/index.jsx';
import Project from './pages/Public/Project/index.jsx';
import Login from './pages/Auth/Login/index.jsx';
import Lecture from './pages/Member/LectureList/index.jsx';
import LectureDetail from './pages/Member/LectureDetail/index.jsx';
import Invest from './pages/Invest';
import Executives from './pages/Public/Executives/index.jsx';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/Admin/AdminPage/index.jsx';
import Apply from './pages/Public/Apply/index.jsx';


const NavigationWrapper = ({ userRole, setUserRole }) => {
  const location = useLocation();

  const hideNavbarPaths = ['/profileSetup'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return shouldShowNavbar ? <Navbar userRole={userRole} setUserRole={setUserRole} /> : null;
};

const params = new URLSearchParams(window.location.search);
const token = params.get('token'); 
const isNew = params.get('isNewMember') === 'true';
const hasInfo = params.get('hasInfo') === 'true';

if(token) { 
  localStorage.setItem('accessToken', token); 
  localStorage.setItem('isNewMember', params.get('isNewMember'));
  localStorage.setItem('hasInfo', params.get('hasInfo'));

  if(isNew && !hasInfo) {
    alert("서비스 이용을 위해 추가 정보 입력이 필요합니다.");
    window.location.href = '/profileSetup';
  }
}

function App() {
  const [userRole, setUserRole] = useState(() => { 
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.role || 'GUEST';
      } catch {
        return 'GUEST';
      }
    }
    return 'GUEST';
  }); 
  
  const isMember = userRole === 'MEMBER';
  const isAdmin = userRole === 'ADMIN';

  return (
    <BrowserRouter>
      <NavigationWrapper userRole={userRole} setUserRole={setUserRole} />
      
      <Routes>
        <Route path="/" element={<Home isLoggedIn={userRole !== 'GUEST'} />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/executives" element={<Executives />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/profileSetup" element={<ProfileSetup />} />
      

        {isMember && (
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