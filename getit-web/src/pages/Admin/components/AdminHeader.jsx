import React from 'react';
import { Settings } from 'lucide-react';

const AdminHeader = () => (
  <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
    <div>
      <span className="text-red-400 font-bold tracking-widest text-sm uppercase mb-1 block">Admin Console</span>
      <h2 className="text-3xl md:text-4xl font-black italic">GET IT ADMIN<span className="text-cyan-400 not-italic">.</span></h2>
    </div>
    <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 border border-white/5">
      <Settings size={16} /> 설정
    </button>
  </div>
);

export default AdminHeader;