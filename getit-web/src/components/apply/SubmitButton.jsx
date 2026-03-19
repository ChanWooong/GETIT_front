import React from 'react';
import { Send, Save } from 'lucide-react';

const SubmitButton = ({ isLoading, onSaveDraft }) => (
  <div className="space-y-3 sm:space-y-4 md:space-y-6 pt-5 sm:pt-6 md:pt-8">
    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4">
      <button
        type="button"
        onClick={onSaveDraft}
        disabled={isLoading}
        className="w-full md:w-1/3 py-3.5 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all font-bold text-xs sm:text-sm md:text-base flex items-center justify-center gap-1.5 sm:gap-2 disabled:opacity-50"
      >
        <Save size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" /> 임시 저장
      </button>

      <button
        type="submit"
        disabled={isLoading}
        className={`flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black py-3.5 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm md:text-base transition-all transform hover:scale-[1.01] flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 shadow-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? '제출 중...' : '지원서 제출하기'} <Send size={16} className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
      </button>
    </div>
  </div>
);

export default SubmitButton;
