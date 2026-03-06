import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MESSAGES, ROLES } from './constants';
import { useAuth } from './hooks/useAuth';
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
import AdminPage from './pages/Admin/index.jsx';
import Apply from './pages/Public/Apply/index.jsx';


const NavigationWrapper = ({ auth }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/profileSetup'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  return shouldShowNavbar ? <Navbar auth={auth} /> : null;
};

const params = new URLSearchParams(window.location.search);
const token = params.get('token'); 
const isNew = params.get('isNewMember') === 'true';
const hasInfo = params.get('hasInfo') === 'true';

if(token) { 
  localStorage.setItem('accessToken', token); 
  localStorage.setItem('isNewMember', params.get('isNewMember'));
  localStorage.setItem('hasInfo', params.get('hasInfo'));
  window.history.replaceState({}, document.title, window.location.pathname); // 토큰 저장 후 URL 정리

  if(isNew && !hasInfo) {
    alert(MESSAGES.PROFILE_SETUP_REQUIRED);
    window.location.replace('/profileSetup');
  }
}

function App() {
  const auth = useAuth();
  const { userRole, setUserRole, isLoggedIn, isApproved, isAdmin,isMember } = auth;

  return (
    <BrowserRouter>
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
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/profileSetup" element={<ProfileSetup />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;