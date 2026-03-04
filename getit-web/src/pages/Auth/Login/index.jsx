import React from 'react';
import { useAppStore } from '../../../store/appStore';
import { MessageCircle } from 'lucide-react';

const Login = () => {
  const { generationText } = useAppStore();

  // 백엔드 OAuth2 엔드포인트 URL (환경 변수로 관리하는 것이 좋습니다)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  const GOOGLE_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/google`;
  const KAKAO_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/kakao`;
  const handleSocialLogin = (url) => {
    // OAuth2 흐름은 보통 window.location.href를 통해 백엔드 인증 페이지로 이동합니다.
    window.location.href = url;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#110b29] text-white px-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl shadow-2xl animate-fade-in-up">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black italic mb-3 tracking-tighter">GET IT</h2>
          <p className="text-gray-400 text-sm font-medium">{generationText} 멤버십 서비스에 로그인하세요</p>
        </div>

        <div className="space-y-4">
          {/* 구글 로그인 버튼 */}
          <button 
            onClick={() => handleSocialLogin(GOOGLE_AUTH_URL)}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-4 rounded-2xl transition-all transform hover:scale-[1.02] shadow-lg"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="w-5 h-5"
            />
            Google로 시작하기
          </button>

          {/* 카카오 로그인 버튼 */}
          <button 
            onClick={() => handleSocialLogin(KAKAO_AUTH_URL)}
            className="w-full flex items-center justify-center gap-3 bg-[#FEE500] text-[#3c1e1e] font-bold py-4 rounded-2xl transition-all transform hover:scale-[1.02] shadow-lg"
          >
            <MessageCircle size={22} fill="#3c1e1e" stroke="none" />
            Kakao로 시작하기
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            로그인 시 서비스 <span className="text-gray-400 underline cursor-pointer">이용약관</span> 및 
            <br />
            <span className="text-gray-400 underline cursor-pointer">개인정보 처리방침</span>에 동의하게 됩니다.
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>문제가 발생했나요? <span className="text-cyan-400 underline cursor-pointer font-bold">운영진에게 문의</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;