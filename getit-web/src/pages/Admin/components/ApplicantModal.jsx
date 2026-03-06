import React from 'react';
import { X } from 'lucide-react';
import questions from '../../../resources/Apply/question.json';

const ApplicantModal = ({ applicant, onClose }) => {
  if (!applicant) return null;

  // API는 answer1~answer5 반환. question index(0~4) → answer1~answer5 매핑
  const questionItems = questions.map((q) => ({
    label: q.label,
    answer: applicant[`answer${q.index + 1}`] ?? applicant.answers?.[q.index] ?? ''
  }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#1a1a2e] w-full max-w-2xl rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl relative animate-in zoom-in duration-300 max-h-[90vh] flex flex-col text-left">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">
          <X size={32} />
        </button>
        <div className="mb-10">
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Application Review</span>
          <h3 className="text-4xl font-black mt-2 italic">
            {applicant.name || '이름 없음'}<span className="text-cyan-400">.</span>
          </h3>
          <p className="text-gray-400 text-sm mt-1">{applicant.department || '학과 없음'}</p>
        </div>
        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
          {questionItems.map((item, idx) => (
            <div key={idx} className="bg-white/5 p-6 rounded-3xl border border-white/5">
              <h4 className="text-cyan-400 font-black text-sm mb-4 uppercase">{item.label}</h4>
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">{item.answer || '내용 없음'}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-4 pt-4 border-t border-white/5">
          <button onClick={onClose} className="flex-1 py-4 bg-white/10 text-white font-bold rounded-2xl">닫기</button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantModal;