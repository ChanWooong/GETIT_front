import React from 'react';
import { X } from 'lucide-react';
import questions from '../../../resources/Apply/question.json';
import { ADMIN_APPLY_MESSAGES } from '../../../constants';

const ApplicantModal = ({ applicant, onClose }) => {
  if (!applicant) return null;

  const questionItems = questions.map((q) => {
    const key = `answer${q.id.slice(1)}`;
    const raw = applicant[key] ?? applicant.answers?.[q.index] ?? '';
    const answer = q.type === 'agreement' ? (raw === 'agreed' ? '동의함' : raw || '미동의') : raw;
    return { label: q.label, answer };
  });

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="applicant-modal-title"
    >
      <div className="bg-[#1a1a2e] w-full max-w-2xl rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl relative animate-in zoom-in duration-300 max-h-[90vh] flex flex-col text-left">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
          aria-label={ADMIN_APPLY_MESSAGES.MODAL_CLOSE}
        >
          <X size={32} />
        </button>
        <div className="mb-10" id="applicant-modal-title">
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">{ADMIN_APPLY_MESSAGES.REVIEW_TITLE}</span>
          <h3 className="text-4xl font-black mt-2 italic">
            {applicant.name || ADMIN_APPLY_MESSAGES.NO_NAME}<span className="text-cyan-400">.</span>
          </h3>
          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500 block mb-0.5">학번</span>
              <span className="text-white font-medium">{applicant.studentId ?? ADMIN_APPLY_MESSAGES.NO_STUDENT_ID}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">전화번호</span>
              <span className="text-white font-medium">{applicant.cellNum ?? applicant.phone ?? ADMIN_APPLY_MESSAGES.NO_PHONE}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">단과대</span>
              <span className="text-white font-medium">{applicant.college ?? '-'}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">학과</span>
              <span className="text-white font-medium">{applicant.department ?? ADMIN_APPLY_MESSAGES.NO_DEPARTMENT}</span>
            </div>
            {applicant.email && (
              <div className="sm:col-span-2">
                <span className="text-gray-500 block mb-0.5">이메일</span>
                <span className="text-white font-medium">{applicant.email}</span>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
          {questionItems.map((item, idx) => (
            <div key={idx} className="bg-white/5 p-6 rounded-3xl border border-white/5">
              <h4 className="text-cyan-400 font-black text-sm mb-4 uppercase">{item.label}</h4>
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">{item.answer || ADMIN_APPLY_MESSAGES.NO_ANSWER}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-4 pt-4 border-t border-white/5">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/10 text-white font-bold rounded-2xl">
            {ADMIN_APPLY_MESSAGES.MODAL_CLOSE}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantModal;