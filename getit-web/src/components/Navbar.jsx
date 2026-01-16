import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent px-6 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 로고: 클릭하면 홈으로 */}
        <Link to="/" className="text-3xl font-black tracking-tighter italic z-50 text-white">
          GET IT<span className="text-cyan-400 not-italic text-4xl">.</span>
        </Link>

        {/* PC 메뉴 */}
        <div className="hidden md:flex space-x-12 text-lg font-medium text-gray-300">
          <Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link>
          <Link to="/project" className="hover:text-cyan-400 transition-colors">Project</Link>
          <Link to="/recruit" className="hover:text-cyan-400 transition-colors">Recruit</Link>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button 
          className="md:hidden text-white z-50" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* 모바일 메뉴 (전체화면) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#110b29] z-40 flex flex-col justify-center items-center space-y-8 text-2xl font-bold md:hidden text-white">
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/project" onClick={() => setIsMenuOpen(false)}>Project</Link>
          <Link to="/invest" onClick={() => setIsMenuOpen(false)}>Invest</Link>
          <Link to="/recruit" onClick={() => setIsMenuOpen(false)} className="text-cyan-400">Recruit</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;