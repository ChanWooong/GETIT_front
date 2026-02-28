import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Lock, IdCard, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();

  // 여러 입력값을 하나의 객체 상태로 관리
  const [formData, setFormData] = useState({
    studentId: '',
    password: '',
    name: '',
    major: ''
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value // name 속성(예: studentId)에 따라 값 업데이트
    });
  };

  // 회원가입 요청 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. 간단한 유효성 검사
    if (!formData.studentId || !formData.password || !formData.name || !formData.major) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      // 2. 서버로 회원가입 요청 전송 (확실한 테스트를 위해 풀 주소 사용)
      // Proxy 설정이 완벽하다면 'http://localhost:8080' 생략 가능
      const response = await axios.post('http://localhost:8080/api/auth/signup', formData);
      
      console.log("회원가입 성공:", response.data);
      alert(response.data || "회원가입이 성공적으로 완료되었습니다!");
      
      // 3. 성공 시 로그인 페이지로 이동
      navigate('/login');

    } catch (error) {
      console.error("회원가입 에러:", error);
      // 백엔드에서 보낸 에러 메시지가 있으면 표시, 없으면 기본 메시지 표시
      const errorMsg = error.response?.data || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.";
      alert(errorMsg);
    }
  };

  // 공통 input 스타일 클래스
  const inputClassName = "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 transition-colors text-white";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#110b29] text-white px-6 py-12">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl animate-fade-in-up">
        
        {/* 헤더 섹션 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
             <Sparkles size={14} className="text-cyan-400" />
             <span className="text-xs font-bold tracking-wider text-cyan-400">NEW MEMBER</span>
          </div>
          <h2 className="text-3xl font-black italic mb-2">SIGN UP</h2>
          <p className="text-gray-400 text-sm">GET IT 9기와 함께 성장하세요!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 1. 이름 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 ml-1">이름 (Name)</label>
            <div className="relative">
              <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                name="name"
                placeholder="홍길동" 
                className={inputClassName}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 2. 학번 입력 (ID 역할) */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 ml-1">학번 (Student ID)</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                name="studentId"
                placeholder="예: 20231234" 
                className={inputClassName}
                value={formData.studentId}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 3. 학과 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 ml-1">학과 (Major)</label>
            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                name="major"
                placeholder="예: 컴퓨터공학과" 
                className={inputClassName}
                value={formData.major}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 4. 비밀번호 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 ml-1">비밀번호 (Password)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="password" 
                name="password"
                placeholder="비밀번호를 입력하세요" 
                className={inputClassName}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg mt-6"
          >
            가입 완료하기 <ArrowRight size={20} />
          </button>

        </form>

        {/* 로그인 페이지 연결 링크 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>이미 계정이 있으신가요? <Link to="/login" className="text-cyan-400 underline cursor-pointer hover:text-cyan-300">로그인하기</Link></p>
        </div>

      </div>
    </div>
  );
};

export default Signup;