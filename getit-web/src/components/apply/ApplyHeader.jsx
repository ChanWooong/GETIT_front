import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

const ApplyHeader = () => {
  const { generationText } = useAppStore();
  return (
    <div className="mb-12 border-b border-white/10 pb-6 text-left">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
          <ClipboardCheck className="text-cyan-400" size={24} />
        </div>
        <h2 className="text-3xl font-black italic tracking-tight uppercase">Application</h2>
      </div>
      <p className="text-gray-400">GET IT {generationText} 크루 합류를 위한 열정을 보여주세요.</p>
    </div>
  );
};

export default ApplyHeader;