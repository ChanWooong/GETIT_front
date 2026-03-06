import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Hash, BookOpen, Phone } from 'lucide-react';
import { MESSAGES } from '../../../constants';

import ProfileHeader from './components/ProfileHeader';
import InfoInput from './components/InfoInput';
import CollegeSelect from './components/CollegeSelect';
import SetupButton from './components/SetupButton';
import Agreement from './components/Agreement.jsx'; // 💡 추가: 약관 동의 컴포넌트

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // 💡 추가: 약관 동의 팝업 노출 여부 상태 (기본값 true)
  const [showAgreement, setShowAgreement] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    college: '',
    department: '',
    cellNum: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      if(!token){
        alert(MESSAGES.LOGIN_REQUIRED);
        navigate('/login', { replace: true });
        return;
      };
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${baseUrl}/api/member/info`, formData, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
      const successMsg = response.data?.message ?? MESSAGES.PROFILE_SUCCESS;
      alert(successMsg);
      navigate('/'); 
    } catch (error) {
      console.error("등록 에러:", error.response?.data);
      const errorMsg = error.response?.data?.message || MESSAGES.PROFILE_FORM_ERROR;
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#110b29] text-white py-12 px-6 overflow-hidden">
      
      {/* 💡 [레이어 1] 정보 입력 폼 본체 */}
      {/* showAgreement가 true일 때 블러(blur-md) 및 투명도(opacity-50) 조절 */}
      <div className={`w-full max-w-lg bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl transition-all duration-500 
        ${showAgreement ? 'blur-md scale-95 opacity-50 pointer-events-none' : 'blur-none scale-100 opacity-100'}`}>
        <ProfileHeader />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <InfoInput label="이름" icon={User} name="name" placeholder="성함을 입력하세요" onChange={handleChange} />
          <InfoInput label="학번" icon={Hash} name="studentId" placeholder="숫자 10자리" maxLength="10" pattern="[0-9]{10}" onChange={handleChange} />
          <CollegeSelect value={formData.college} onChange={handleChange} />
          <InfoInput label="학부(과) - 세부 전공" icon={BookOpen} name="department" placeholder="정확한 명칭으로 적어주세요." onChange={handleChange} />
          <InfoInput label="전화번호" icon={Phone} name="cellNum" placeholder="010-1234-5678" pattern="010-[0-9]{3,4}-[0-9]{4}" onChange={handleChange} />
          <SetupButton isLoading={isLoading} />
        </form>
      </div>

      {/* 💡 [레이어 2] 약관 동의 팝업 모달 */}
      {showAgreement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in duration-300 w-full max-w-md">
            {/* onNext 실행 시 showAgreement를 false로 바꿔서 폼이 보이게 함 */}
            <Agreement onNext={() => setShowAgreement(false)} />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ProfileSetup;