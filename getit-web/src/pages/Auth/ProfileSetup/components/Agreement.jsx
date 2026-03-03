import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Agreement = ({ onNext }) => {
  return (
    <div className="bg-[#1a1a2e] rounded-[2.5rem] border border-white/10 p-8 shadow-2xl relative w-full max-w-md mx-auto">
      {/* 헤더 섹션 */}
      <div className="text-center mb-6">
        <div className="inline-flex p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 mb-4">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white">서비스 이용 동의</h2>
      </div>

      {/* 줄글 형태의 약관 내용 (1~200자 내외) */}
      <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5">
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap text-center">
          본 서비스는 원활한 회원 관리 및 맞춤형 서비스 제공을 위해 학번, 성명, 학과 및 연락처를 수집합니다. 
          <br />
          <br /> 
          수집된 개인정보는 서비스 목적 외의 용도로 활용되지 않으며, 오롯이 서류 심사 및 회원 관리에만 사용됩니다.
          <br />
          지원이 탈락될 경우 즉시 파기하며, 합격 후에도 회원 탈퇴시 즉시 파기됩니다.
          <br />
          <br />
          아래 버튼을 누르면 위 사항에 대해 충분히 숙지하고 동의한 것으로 간주하여 가입 절차를 진행합니다.
        </p>
      </div>

      {/* 동의 버튼 (별도의 체크 없이 즉시 활성 상태) */}
      <button
        onClick={onNext}
        className="w-full py-4 bg-cyan-500 text-[#110b29] rounded-2xl font-bold text-lg 
                   hover:scale-[1.02] transition-all duration-300 
                   shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]"
      >
        동의하고 시작하기
      </button>

      <p className="text-center text-gray-500 text-xs mt-4">
        동의하지 않으실 경우 서비스 이용이 제한될 수 있습니다.
      </p>
    </div>
  );
};

export default Agreement;