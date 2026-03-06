import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Admin 공통 로딩 UI
 */
const LoadingState = ({ message = '데이터 로딩 중...' }) => (
  <div className="p-10 text-white text-center flex items-center justify-center gap-2">
    <Loader2 size={20} className="animate-spin" />
    {message}
  </div>
);

export default LoadingState;
