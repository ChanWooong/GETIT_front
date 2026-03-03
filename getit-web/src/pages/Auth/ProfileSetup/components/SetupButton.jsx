import React from 'react';

const SetupButton = ({ isLoading }) => (
  <button 
    type="submit" 
    disabled={isLoading}
    className={`w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {isLoading ? "처리 중..." : "정보 등록 완료"}
  </button>
);

export default SetupButton;