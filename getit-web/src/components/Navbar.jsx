import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, PlayCircle, TrendingUp, Settings } from 'lucide-react';
import { ROLES } from '../constants';

const Navbar = ({ auth }) => {
  const { userRole, setUserRole, isLoggedIn, isApproved,isAdmin,isMember } = auth ?? {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUserRole(ROLES.GUEST);
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-[#110b29]/80 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 py-3 sm:py-4 transition-all pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" onClick={closeMenu} className="text-2xl md:text-3xl font-black italic text-white z-50 hover:opacity-80">
          GET IT<span className="text-cyan-400 not-italic">.</span>
        </Link>

        {/* --- 데스크톱 메뉴 --- */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-gray-300">
          <Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link>
          <Link to="/executives" className="hover:text-cyan-400 transition-colors">Executives</Link>
          <Link to="/recruit" className="hover:text-cyan-400 transition-colors">Recruit</Link>

          {isLoggedIn ? (
            <>
              {/* 💡 [핵심] 승인된 멤버에게만 보이는 메뉴 */}
              {isMember && (
                <>
                  <div className="h-4 w-px bg-gray-700 mx-2"></div>
                  <Link to="/lecture" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                    <PlayCircle size={18} /> Lecture
                  </Link>
                  <Link to="/invest" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                    <TrendingUp size={18} /> Invest
                  </Link>
                </>
              )}

              {/* 관리자 전용 메뉴 */}
              {userRole === ROLES.ADMIN && (
                <Link 
                  to="/admin" 
                  className="hover:text-cyan-400 transition-colors"
                >
                 Admin
                </Link>
              )}
              
              <button onClick={handleLogout} className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors pl-4">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-cyan-500 text-[#110b29] px-5 py-2 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              Login
            </Link>
          )}
        </div>

        <button type="button" aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'} className="md:hidden text-white z-50 min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- 모바일 메뉴: 메뉴 버튼 클릭 시 화면 전체에 모든 메뉴 표시, 닫기는 X 하나만 --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden bg-[#110b29] flex flex-col h-[100dvh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] animate-fade-in">
          <div className="flex-shrink-0 flex justify-end items-center px-4 py-3 border-b border-white/5">
            <button type="button" aria-label="메뉴 닫기" className="text-white min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-80" onClick={closeMenu}>
              <X size={28} />
            </button>
          </div>
          <nav className="flex-1 min-h-0 flex flex-col justify-evenly px-4 py-4">
            <Link to="/about" onClick={closeMenu} className="py-3 px-4 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-colors text-base font-medium text-center">About</Link>
            <Link to="/executives" onClick={closeMenu} className="py-3 px-4 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-colors text-base font-medium text-center">Executives</Link>
            <Link to="/recruit" onClick={closeMenu} className="py-3 px-4 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-colors text-base font-medium text-center">Recruit</Link>

            {isLoggedIn ? (
              <>
                {isMember && (
                  <>
                    <Link to="/lecture" onClick={closeMenu} className="py-3 px-4 rounded-xl text-cyan-400 hover:bg-cyan-500/10 transition-colors text-base font-medium flex items-center justify-center gap-2">
                      <PlayCircle size={18} /> Lecture
                    </Link>
                    <Link to="/invest" onClick={closeMenu} className="py-3 px-4 rounded-xl text-cyan-400 hover:bg-cyan-500/10 transition-colors text-base font-medium flex items-center justify-center gap-2">
                      <TrendingUp size={18} /> Invest
                    </Link>
                  </>
                )}
                {userRole === ROLES.ADMIN && (
                  <Link to="/admin" onClick={closeMenu} className="py-3 px-4 rounded-xl text-red-400 border border-red-500/50 bg-red-900/20 hover:bg-red-900/30 transition-colors text-base font-medium flex items-center justify-center gap-2">
                    <Settings size={18} /> Admin
                  </Link>
                )}
                <button type="button" onClick={handleLogout} className="py-3 px-4 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-base font-medium flex items-center justify-center gap-2">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu} className="py-3 px-6 rounded-full bg-cyan-500 text-[#110b29] font-bold hover:bg-cyan-400 transition-colors text-base text-center">
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;