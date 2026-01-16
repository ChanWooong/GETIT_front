import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, PlayCircle, TrendingUp, LayoutDashboard, Settings } from 'lucide-react';

const Navbar = ({ userRole, setUserRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = userRole !== 'GUEST';

  const handleLogout = () => {
    setUserRole('GUEST');
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#110b29]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" onClick={closeMenu} className="text-2xl md:text-3xl font-black italic text-white z-50 hover:opacity-80">
          GET IT<span className="text-cyan-400 not-italic">.</span>
        </Link>

        {/* 🖥️ PC 메뉴 */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-gray-300">
          <Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link>

          {isLoggedIn ? (
            <>
              {/* 1. Dashboard: 관리자가 아닐 때만 보임 */}
              {userRole !== 'ADMIN' && (
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
              )}
              
              <Link to="/lecture" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <PlayCircle size={18} /> Lecture
              </Link>
              
              <Link to="/invest" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <TrendingUp size={18} /> Invest
              </Link>
              
              <div className="h-4 w-px bg-gray-700 mx-2"></div>

              {/* 2. Admin Page: 가장 우측 (로그아웃 바로 앞)으로 이동 */}
              {userRole === 'ADMIN' && (
                <Link 
                  to="/admin" 
                  className="text-red-400 font-bold hover:text-red-300 flex items-center gap-1 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20"
                >
                  <Settings size={16} /> Admin Page
                </Link>
              )}
              
              <button onClick={handleLogout} className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
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

        <button className="md:hidden text-white z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📱 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#110b29] z-40 flex flex-col justify-center items-center space-y-8 text-xl font-bold md:hidden text-white animate-fade-in">
          <Link to="/about" onClick={closeMenu}>About</Link>
          
          {isLoggedIn ? (
            <>
              {userRole !== 'ADMIN' && (
                 <Link to="/dashboard" onClick={closeMenu} className="text-cyan-400">Dashboard</Link>
              )}
              <Link to="/lecture" onClick={closeMenu} className="text-cyan-400">Lecture</Link>
              <Link to="/invest" onClick={closeMenu} className="text-cyan-400">Invest</Link>
              
              {userRole === 'ADMIN' && (
                <Link to="/admin" onClick={closeMenu} className="text-red-400 flex items-center gap-2 border border-red-500/50 px-4 py-2 rounded-xl bg-red-900/20">
                  <Settings size={20} /> Admin Page
                </Link>
              )}

              <button onClick={handleLogout} className="text-gray-400 mt-4 flex items-center gap-2">
                <LogOut size={20} /> Logout
              </button>
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