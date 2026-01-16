import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';

// 🔥 중요: 여기서 { setUserRole }을 받아야 합니다! (기존 setIsLoggedIn 삭제)
const Login = ({ setUserRole }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지 (필수)

    // 간단한 로그인 로직
    if (id && password) {
      if (id === 'admin') {
        // 👑 1. 관리자(운영진) 로그인
        setUserRole('ADMIN'); // App.jsx의 상태 변경
        alert("운영진 모드로 접속합니다.");
        navigate('/admin');   // 관리자 페이지로 이동
      } else {
        // 👤 2. 일반 부원 로그인
        setUserRole('MEMBER'); // App.jsx의 상태 변경
        // alert(`${id}님 환영합니다!`);
        navigate('/dashboard'); // 대시보드로 이동
      }
    } else {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#110b29] text-white px-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl animate-fade-in-up">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black italic mb-2">LOGIN</h2>
          <p className="text-gray-400 text-sm">GET IT 8기 멤버십 서비스</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* 아이디 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 ml-1">Student ID</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="학번을 입력하세요 (admin 입력 시 관리자)" 
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 transition-colors"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="password" 
                placeholder="비밀번호를 입력하세요" 
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg mt-4"
          >
            로그인 하기 <ArrowRight size={20} />
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>아직 계정이 없으신가요? <span className="text-cyan-400 underline cursor-pointer">운영진에게 문의하기</span></p>
        </div>

      </div>
    </div>
  );
};

export default Login;