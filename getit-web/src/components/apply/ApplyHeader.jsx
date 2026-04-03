import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { useAppStore } from '../../hooks/appStore';

const ApplyHeader = () => {
  const { generationText } = useAppStore();
  return (
    <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 border-b border-white/10 pb-3 sm:pb-4 md:pb-5 lg:pb-6 text-left">
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-1 sm:mb-1.5 md:mb-2">
        <div className="p-1 sm:p-1.5 md:p-2 bg-cyan-500/20 rounded-md sm:rounded-lg">
          <ClipboardCheck className="text-cyan-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black italic tracking-tight uppercase">Application</h2>
      </div>
      <p className="text-gray-400 text-xs sm:text-sm md:text-base">GET IT {generationText} 크루 합류를 위한 열정을 보여주세요.</p>
    </div>
  );
};

export default ApplyHeader;
