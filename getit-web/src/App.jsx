import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MESSAGES, ROLES } from './constants';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Home from './pages/Public/Home.jsx';
import About from './pages/Public/About.jsx';
import Recruit from './pages/Public/Recruit.jsx';
import ProfileSetup from './pages/Auth/ProfileSetup/index.jsx';
import Project from './pages/Public/Project.jsx';
import Login from './pages/Auth/Login/index.jsx';
import Lecture from './pages/Member/LectureList/index.jsx';
import LectureDetail from './pages/Member/LectureDetail/index.jsx';
import Invest from './pages/Member/Invest';
import Executives from './pages/Public/Executives.jsx';
import Dashboard from './pages/Member/Dashboard';
import AdminPage from './pages/Admin/index.jsx';
import Apply from './pages/Public/Apply.jsx';
import MyProfile from './pages/Member/MyProfile/index.jsx';
import OAuthCallbackHandler from './components/OAuthCallbackHandler';

const NavigationWrapper = ({ auth }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/profileSetup'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  return shouldShowNavbar ? <Navbar auth={auth} /> : null;
};

function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('redirect') === 'profileSetup' && location.pathname === '/') {
      const isNew = localStorage.getItem('isNewMember') === 'true';
      const hasInfo = localStorage.getItem('hasInfo') === 'true';
      if (isNew && !hasInfo) {
        alert(MESSAGES.PROFILE_SETUP_REQUIRED);
        navigate('/profileSetup', { replace: true });
      }
    }
  }, [location.search, location.pathname, navigate]);
  return null;
}

function App() {
  const auth = useAuth();
  const { userRole, isLoggedIn, isApproved, isAdmin, isMember } = auth;

  return (
    <BrowserRouter>
      <OAuthCallbackHandler />
      <RedirectHandler />
      <NavigationWrapper auth={auth} />
      <Routes>
        <Route path="/" element={<Home isApprovedMember={isApproved} />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/executives" element={<Executives />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route
          path="/apply"
          element={isLoggedIn ? <Apply /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profileSetup"
          element={isLoggedIn ? <ProfileSetup /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/myProfile"
          element={isLoggedIn ? <MyProfile /> : <Navigate to="/login" replace />}
        />
        {/* OAuth 콜백으로 /token 도착 시 홈으로 (토큰 처리 후 replace가 안 된 경우 대비) */}
        <Route path="/token" element={<Navigate to="/" replace />} />

        {isApproved && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lecture" element={<Lecture />} />
            <Route path="/lecture/:id" element={<LectureDetail userRole={userRole} />} />
            <Route path="/invest" element={<Invest />} />
          </>
        )}

        {isAdmin ? (
          <Route path="/admin" element={<AdminPage />} />
        ) : (
          <Route path="/admin" element={<Navigate to="/" replace />} />
        )}

        {/* 미승인 사용자의 멤버 전용 경로·알 수 없는 경로 → 홈 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;