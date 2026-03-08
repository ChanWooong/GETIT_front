import React, { useState, useEffect } from 'react';
import { User, Hash, BookOpen, Phone } from 'lucide-react';
import api from '../../../api/axios';
import { MESSAGES } from '../../../constants';
import { useAuth } from '../../../hooks/useAuth';
import InfoInput from '../../Auth/ProfileSetup/components/InfoInput';
import CollegeSelect from '../../Auth/ProfileSetup/components/CollegeSelect';

const initialFormState = {
  name: '',
  studentId: '',
  college: '',
  department: '',
  cellNum: '',
};

const MyProfile = () => {
  const { setUserName } = useAuth();
  const [loadLoading, setLoadLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [initialFormData, setInitialFormData] = useState(initialFormState);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await api.get('/api/member/me');
        const data = response.data ?? {};
        const loaded = {
          name: data.name ?? '',
          studentId: data.studentId ?? '',
          college: data.college ?? '',
          department: data.department ?? '',
          cellNum: data.cellNum ?? '',
        };
        setFormData(loaded);
        setInitialFormData(loaded);
      } catch (err) {
        console.error('회원 정보 조회 실패', err);
      } finally {
        setLoadLoading(false);
      }
    };
    fetchMyInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmModalOpen(true);
  };

  const handleConfirmCancel = () => {
    setConfirmModalOpen(false);
  };

  const handleConfirmOk = async () => {
    setSaveLoading(true);
    try {
      await api.patch('/api/member/info', formData);
      setUserName(formData.name?.trim() || null);
      setInitialFormData(formData);
      setIsEditing(false);
      setConfirmModalOpen(false);
      setSuccessModalOpen(true);
    } catch (err) {
      console.error('회원 정보 저장 실패', err);
      alert(err.response?.data?.message || MESSAGES.MY_PROFILE_SAVE_ERROR);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
  };

  const handleCancelEdit = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  if (loadLoading) {
    return (
      <div className="min-h-screen w-full bg-[#110b29] text-white flex items-center justify-center pt-32 pb-20">
        <p className="text-gray-400">회원 정보를 불러오는 중...</p>
      </div>
    );
  }

  const readOnly = !isEditing;

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">회원 정보</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InfoInput
            label="이름"
            icon={User}
            name="name"
            placeholder="성함을 입력하세요"
            value={formData.name}
            onChange={handleChange}
            readOnly={readOnly}
          />
          <InfoInput
            label="학번"
            icon={Hash}
            name="studentId"
            placeholder="숫자 10자리"
            maxLength="10"
            pattern="[0-9]{10}"
            value={formData.studentId}
            onChange={handleChange}
            readOnly={readOnly}
          />
          <CollegeSelect value={formData.college} onChange={handleChange} readOnly={readOnly} />
          <InfoInput
            label="학부(과) - 세부 전공"
            icon={BookOpen}
            name="department"
            placeholder="정확한 명칭으로 적어주세요."
            value={formData.department}
            onChange={handleChange}
            readOnly={readOnly}
          />
          <InfoInput
            label="전화번호"
            icon={Phone}
            name="cellNum"
            placeholder="010-1234-5678"
            pattern="010-[0-9]{3,4}-[0-9]{4}"
            value={formData.cellNum}
            onChange={handleChange}
            readOnly={readOnly}
          />
          {readOnly ? (
            <button
              type="button"
              onClick={handleStartEdit}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-all"
            >
              수정하기
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-gray-300 font-bold rounded-2xl transition-all"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="flex-1 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-all disabled:opacity-50"
              >
                {saveLoading ? '저장 중...' : '저장하기'}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* 저장 전 확인 모달: 해당 정보가 맞나요? */}
      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1335] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-xl animate-in fade-in zoom-in duration-200">
            <p className="text-white text-center text-lg font-medium mb-6">
              {MESSAGES.MY_PROFILE_CONFIRM}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 py-3 rounded-xl font-bold bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirmOk}
                disabled={saveLoading}
                className="flex-1 py-3 rounded-xl font-bold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors disabled:opacity-50"
              >
                {saveLoading ? '저장 중...' : '확인'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 저장 완료 모달 */}
      {successModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1335] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-xl animate-in fade-in zoom-in duration-200">
            <p className="text-white text-center text-lg font-medium mb-6">
              {MESSAGES.MY_PROFILE_SAVED}
            </p>
            <button
              type="button"
              onClick={handleSuccessClose}
              className="w-full py-3 rounded-xl font-bold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
