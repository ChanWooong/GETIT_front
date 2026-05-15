import React from 'react';
import { BarChart2, BookOpen, Bell, Users } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'MEMBERS', label: '부원 학습 관리', icon: BarChart2 },
    { id: 'LECTURE', label: '강의 관리', icon: BookOpen },
    { id: 'APPLICANTS', label: '지원서 관리', icon: Bell },
    { id: 'AUTH', label: '권한 설정', icon: Users },
  ];

  if (activeTab === 'SETTINGS') return null; // ✅ SETTINGS일 때 탭 숨김

  return (
    <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === tab.id ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <tab.icon size={18} /> {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;