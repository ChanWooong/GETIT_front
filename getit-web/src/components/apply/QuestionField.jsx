import React from 'react';

const DEFAULT_MAX_LENGTH = 1000;

const QuestionField = ({ question, value, onChange }) => {
  const type = question.type || 'text';
  const isSingle = type === 'single';
  const isAgreement = type === 'agreement';
  const options = question.options || [];
  const maxLen = question.maxLength ?? DEFAULT_MAX_LENGTH;
  const agreed = value === 'agreed';

  return (
    <div className="space-y-2 sm:space-y-3 md:space-y-4 text-left">
      <label className="block text-sm sm:text-base md:text-lg font-bold text-gray-200 ml-1 leading-relaxed">
        {question.label}
      </label>

      {isSingle ? (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3" role="radiogroup" aria-label={question.label}>
          {options.map((opt) => (
            <label
              key={opt}
              className={`flex items-center gap-1.5 sm:gap-2 md:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl border cursor-pointer transition-all text-sm sm:text-base ${
                value === opt
                  ? 'bg-cyan-500/20 border-cyan-500 text-white'
                  : 'bg-black/40 border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(question.id, opt)}
                className="sr-only"
              />
              <span className="font-medium">{opt}</span>
            </label>
          ))}
        </div>
      ) : isAgreement ? (
        <label className="flex items-start gap-1.5 sm:gap-2 md:gap-3 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 bg-black/40 cursor-pointer hover:border-white/20 transition-all">
          <input
            type="checkbox"
            name={question.id}
            checked={agreed}
            onChange={(e) => onChange(question.id, e.target.checked ? 'agreed' : '')}
            className="mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded border-white/30 bg-black/40 text-cyan-500 focus:ring-cyan-500 shrink-0"
          />
          <span className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">{question.agreeLabel}</span>
        </label>
      ) : (
        <>
          <textarea
            className="w-full bg-black/40 border border-white/10 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-gray-300 text-sm sm:text-base resize-none leading-relaxed"
            placeholder="답변을 입력해주세요..."
            value={value ?? ''}
            maxLength={maxLen}
            onChange={(e) => onChange(question.id, e.target.value)}
          />
          <div className="text-right text-xs text-gray-500 font-mono">
            {(value || '').length} / {maxLen}자
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionField;
