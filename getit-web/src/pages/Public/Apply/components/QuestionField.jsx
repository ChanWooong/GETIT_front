import React from 'react';

const QuestionField = ({ question, value, onChange }) => (
  <div className="space-y-4 text-left">
    <label className="block text-lg font-bold text-gray-200 ml-1 leading-relaxed">
      {question.label}
    </label>
    <textarea 
      className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 min-h-[180px] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-gray-300 resize-none leading-relaxed"
      placeholder="답변을 입력해주세요..."
      value={value}
      maxLength={1000}
      onChange={(e) => onChange(question.id, e.target.value)}
    />
    <div className="text-right text-xs text-gray-500 font-mono">
      {(value || '').length} / 1000자
    </div>
  </div>
);

export default QuestionField;