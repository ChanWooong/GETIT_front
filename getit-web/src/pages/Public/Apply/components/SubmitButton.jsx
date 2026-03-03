import React from 'react';
import { Send } from 'lucide-react';

const SubmitButton = ({ isLoading }) => (
  <div className="pt-8">
    <button 
      type="submit" 
      disabled={isLoading}
      className={`w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black py-5 rounded-2xl transition-all transform hover:scale-[1.01] flex items-center justify-center gap-3 shadow-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? "제출 중..." : "지원서 제출하기"} <Send size={20} />
    </button>
  </div>
);

export default SubmitButton;