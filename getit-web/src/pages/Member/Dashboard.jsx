import React from 'react';
import { Play, Bell, Users, Clock } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. 상단 환영 메시지 */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-6 border-b border-white/10 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Dashboard</h2>
            <p className="text-gray-400">8기 활동 멤버 <span className="text-cyan-400 font-bold">홍길동</span>님, 환영합니다!</p>
          </div>
          <div className="text-left md:text-right bg-white/5 p-4 rounded-xl md:bg-transparent md:p-0">
            <p className="text-xs text-gray-500 mb-1">NEXT SESSION</p>
            <p className="text-xl font-bold text-cyan-400 flex items-center gap-2">
              <Clock size={20} /> 3월 14일 (목) 19:00
            </p>
          </div>
        </div>

        {/* 2. 메인 컨텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 왼쪽: 최신 강의 목록 */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Play className="text-cyan-400" /> Recent Lectures
            </h3>
            
            {/* 강의 카드 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all group cursor-pointer">
              <div className="aspect-video bg-black/40 relative flex items-center justify-center">
                 <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <Play size={32} fill="currentColor" />
                 </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between mb-2">
                   <span className="text-cyan-400 text-xs font-bold px-2 py-1 bg-cyan-900/30 rounded">WEB BASIC</span>
                </div>
                <h4 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">1주차: 웹 서비스의 동작 원리</h4>
                <p className="text-gray-400 text-sm">프론트엔드와 백엔드가 어떻게 통신하는지 알아봅니다.</p>
              </div>
            </div>
          </div>

          {/* 오른쪽: 공지사항 & 팀 */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Bell className="text-yellow-400" /> Notice
              </h3>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="border-b border-white/5 pb-2">📢 이번 주 세미나 장소 변경 안내</li>
                <li>📅 3월 회비 납부 안내</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="text-cyan-400" /> My Team
              </h3>
              <p className="text-lg font-bold">Team. 코딩노예들</p>
              <p className="text-sm text-gray-400 mt-2">주제: 교내 셔틀버스 위치 추적 앱</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
