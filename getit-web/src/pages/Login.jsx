import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Sparkles } from 'lucide-react';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

// src/pages/Login.jsx

// src/pages/Login.jsx 내부 handleLogin 함수

const handleLogin = (e) => {
  e.preventDefault();
  if (id && password) {
    setIsLoggedIn(true);
    // alert(`환영합니다...`);
    
    // 🔥 로그인 성공 시 대시보드로 이동!
    navigate('/dashboard'); 
  } else {
    alert("아이디와 비밀번호를 입력해주세요.");
  }
};

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white flex items-center justify-center px-6 relative overflow-hidden pt-20">
      
      {/* 배경 장식 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* 로그인 박스 */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <Sparkles className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-gray-400 text-sm">GET IT 부원 전용 공간입니다.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium ml-1">ID</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="아이디 입력"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="password" 
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg mt-4 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
            로그인 하기 <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;