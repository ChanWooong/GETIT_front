import React from 'react';
import { Send, Save } from 'lucide-react'; // Save 아이콘 추가하면 더 예뻐요!

const SubmitButton = ({ isLoading, onSaveDraft }) => (
  <div className="space-y-6 pt-8"> {/* 부모 div로 감싸기 */}
    <div className="flex flex-col md:flex-row gap-4">
      {/* 임시 저장 버튼 */}
      <button 
        type="button" 
        onClick={onSaveDraft}
        disabled={isLoading}
        className="w-full md:w-1/3 py-5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all font-bold flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Save size={18} /> 임시 저장
      </button>

      <button 
        type="submit" 
        disabled={isLoading}
        className={`flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black py-5 rounded-2xl transition-all transform hover:scale-[1.01] flex items-center justify-center gap-3 shadow-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? "제출 중..." : "지원서 제출하기"} <Send size={20} />
      </button>
    </div>
  </div>
);

export default SubmitButton;