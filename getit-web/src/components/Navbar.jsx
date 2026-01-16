import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 🔥 LayoutDashboard 아이콘이 꼭 import 되어 있어야 합니다!
import { Menu, X, LogOut, PlayCircle, TrendingUp, LayoutDashboard } from 'lucide-react';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#110b29]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* 로고 */}
        <Link to="/" onClick={closeMenu} className="text-2xl md:text-3xl font-black italic text-white z-50 hover:opacity-80">
          GET IT<span className="text-cyan-400 not-italic">.</span>
        </Link>

        {/* 🖥️ PC 메뉴 */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-gray-300">
          
          <Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link>

          {/* 🔥 로그인 여부에 따른 메뉴 변화 */}
          {isLoggedIn ? (
            /* 🔓 멤버 (로그인 O) */
            <>
              
              <Link to="/lecture" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <PlayCircle size={18} /> Lecture
              </Link>
              
              <Link to="/invest" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <TrendingUp size={18} /> Invest
              </Link>
              
              <div className="h-4 w-px bg-gray-700 mx-2"></div>

              {/* ✅ 대시보드 메뉴 추가 */}
              <Link to="/dashboard" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              
              <button onClick={handleLogout} className="text-red-400 hover:text-red-300 flex items-center gap-1">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            /* 👤 게스트 (로그인 X) */
            <>
              <Link to="/project" className="hover:text-cyan-400 transition-colors">Project</Link>
              <Link to="/recruit" className="hover:text-cyan-400 transition-colors">Recruit</Link>
              <Link 
                to="/login" 
                className="bg-cyan-500 text-[#110b29] px-5 py-2 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* 📱 모바일 햄버거 버튼 */}
        <button className="md:hidden text-white z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📱 모바일 전체화면 메뉴 */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#110b29] z-40 flex flex-col justify-center items-center space-y-8 text-xl font-bold md:hidden text-white animate-fade-in">
          <Link to="/about" onClick={closeMenu}>About</Link>
          
          {isLoggedIn ? (
            <>
              {/* ✅ 모바일에도 대시보드 추가 */}
              <Link to="/dashboard" onClick={closeMenu} className="text-cyan-400 flex items-center gap-2">
                <LayoutDashboard size={20} /> Dashboard
              </Link>
              <Link to="/lecture" onClick={closeMenu} className="text-cyan-400">Lecture</Link>
              <Link to="/invest" onClick={closeMenu} className="text-cyan-400">Invest</Link>
              <button onClick={handleLogout} className="text-red-400 mt-4">Logout</button>
            </>
          ) : (
            <>
              <Link to="/project" onClick={closeMenu}>Project</Link>
              <Link to="/recruit" onClick={closeMenu}>Recruit</Link>
              <Link to="/login" onClick={closeMenu} className="text-cyan-400 text-2xl mt-4">Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;