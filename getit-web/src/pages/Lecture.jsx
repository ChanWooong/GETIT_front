import React from 'react';
import { PlayCircle, Lock, Clock, CheckCircle } from 'lucide-react';

const Lecture = () => {
  // 강의 데이터 (예시)
  const lectures = [
    { id: 1, week: "1주차", title: "웹 동작 원리와 HTTP 통신", time: "54:20", status: "Done" },
    { id: 2, week: "2주차", title: "React 기초: 컴포넌트와 Props", time: "1:12:05", status: "Progress" },
    { id: 3, week: "3주차", title: "Hooks 완벽 정복 (useState, useEffect)", time: "1:05:30", status: "Locked" },
    { id: 4, week: "4주차", title: "Tailwind CSS로 디자인 시스템 구축", time: "48:10", status: "Locked" },
    { id: 5, week: "5주차", title: "백엔드 API 연동 (Axios)", time: "1:20:00", status: "Locked" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* 헤더 */}
        <div className="mb-12 text-center">
          <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase mb-2 block">Online Course</span>
          <h2 className="text-3xl md:text-5xl font-black italic">
            WEB SERVICE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">MASTER CLASS</span>
          </h2>
          <p className="text-gray-400 mt-4">8기 신입 부원을 위한 필수 교육 과정입니다.</p>
        </div>

        {/* 강의 리스트 */}
        <div className="space-y-4">
          {lectures.map((lec) => (
            <div 
              key={lec.id} 
              className={`relative flex items-center p-6 rounded-2xl border transition-all duration-300 group
                ${lec.status === 'Locked' 
                  ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50 cursor-pointer'
                }`}
            >
              {/* 썸네일/아이콘 영역 */}
              <div className="mr-6">
                {lec.status === 'Done' ? (
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                    <CheckCircle size={24} />
                  </div>
                ) : lec.status === 'Locked' ? (
                   <div className="w-12 h-12 bg-gray-700/30 rounded-full flex items-center justify-center text-gray-500">
                    <Lock size={24} />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 animate-pulse">
                    <PlayCircle size={24} />
                  </div>
                )}
              </div>

              {/* 텍스트 정보 */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    lec.status === 'Done' ? 'bg-green-900/30 text-green-400' :
                    lec.status === 'Locked' ? 'bg-gray-700 text-gray-400' : 'bg-cyan-900/30 text-cyan-400'
                  }`}>
                    {lec.week}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} /> {lec.time}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold group-hover:text-cyan-400 transition-colors">
                  {lec.title}
                </h3>
              </div>

              {/* 우측 재생 버튼 (잠김 상태 아닐 때만) */}
              {lec.status !== 'Locked' && (
                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-cyan-500 text-black px-4 py-2 rounded-full font-bold text-sm">
                    강의 보기
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Lecture;