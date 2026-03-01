import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, UserPlus } from 'lucide-react';
import axios from 'axios'; // 1. Axios 임포트

const Login = ({ setUserRole }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => { // 2. 비동기 함수(async)로 변경
    e.preventDefault();

    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 3. 스프링 서버로 로그인 요청 (POST)
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        studentId: id,   // 백엔드 DTO의 필드명과 일치시켜야 함
        password: password
      });

      // 4. 성공 시 처리 (백엔드에서 TokenResponse를 준다고 가정)
      const { accessToken, role } = response.data;

      // 4-1. 토큰 저장 (매우 중요! 나중에 API 호출할 때 씀)
      localStorage.setItem('accessToken', accessToken);

      // 4-2. 상태 업데이트
      setUserRole(role); // "ADMIN" or "MEMBER"

      // 4-3. 역할에 따른 페이지 이동
      alert("로그인에 성공했습니다.");
      if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      // 5. 실패 시 처리
      console.error("로그인 에러:", error);
      // 백엔드에서 에러 메시지를 보냈다면 그걸 보여줌
      const errorMsg = error.response?.data || "아이디 또는 비밀번호를 확인해주세요.";
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#110b29] text-white px-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl animate-fade-in-up">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black italic mb-2">LOGIN</h2>
          <p className="text-gray-400 text-sm">GET IT 9기 멤버십 서비스</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* 아이디 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 ml-1">Student ID</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="학번을 입력하세요" 
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

           {/* 버튼 영역 */}
          <div className="pt-2 space-y-3">
            {/* 1. 로그인 버튼 (메인) */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
            >
              로그인 하기 <ArrowRight size={20} />
            </button>

            {/* 2. 회원가입 버튼 (추가됨) */}
            <button 
              type="button" // form submit 방지
              onClick={() => navigate('/signup')} // 회원가입 페이지로 이동
              className="w-full bg-transparent border border-white/20 text-gray-300 hover:bg-white/5 hover:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              아직 계정이 없으신가요? 회원가입
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>아직 계정이 없으신가요? <span className="text-cyan-400 underline cursor-pointer">운영진에게 문의하기</span></p>
        </div>

      </div>
    </div>
  );
};

export default Login;