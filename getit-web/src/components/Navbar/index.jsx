import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';

const Navbar = ({ auth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const logout = auth?.logout;

  const handleLogout = () => {
    logout?.();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-[#110b29]/80 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 py-3 sm:py-4 transition-all pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl md:text-3xl font-black italic text-white z-50 hover:opacity-80"
        >
          GET IT<span className="text-cyan-400 not-italic">.</span>
        </Link>

        <NavDesktop auth={auth} onLogout={handleLogout} />

        <button
          type="button"
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          className="md:hidden text-white z-50 min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden bg-[#110b29]/95 backdrop-blur-md flex flex-col h-[100dvh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] animate-fade-in">
          <div className="flex-shrink-0 flex justify-end items-center px-4 py-3 border-b border-white/5">
            <button
              type="button"
              aria-label="메뉴 닫기"
              className="text-white min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-80"
              onClick={closeMenu}
            >
              <X size={28} />
            </button>
          </div>
          {/* D: 메뉴는 내용 높이만 사용, 나머지 영역은 dim */}
          <div className="flex-shrink-0 min-h-0 overflow-y-auto">
            <NavMobile auth={auth} onLogout={handleLogout} onClose={closeMenu} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
