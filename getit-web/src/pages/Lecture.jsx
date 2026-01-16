import React, { useState } from 'react';
import { PlayCircle, Lock, Clock, CheckCircle, Code, Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Lecture = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("SW");

  // SW 강좌 데이터
  const swLectures = [
    { id: 101, week: "1주차", title: "웹 동작 원리와 HTTP 통신", time: "54:20", status: "Done" },
    { id: 102, week: "2주차", title: "React 기초: 컴포넌트와 Props", time: "1:12:05", status: "Progress" },
    { id: 103, week: "3주차", title: "Hooks 완벽 정복 (useState)", time: "1:05:30", status: "Locked" },
  ];

  // 창업 강좌 데이터
  const startupLectures = [
    { id: 201, week: "1주차", title: "스타트업 아이디에이션", time: "45:10", status: "Done" },
    { id: 202, week: "2주차", title: "비즈니스 모델 캔버스(BMC)", time: "58:00", status: "Progress" },
    { id: 203, week: "3주차", title: "MVP 기획 및 가설 검증", time: "1:20:15", status: "Locked" },
  ];

  const currentLectures = activeTab === "SW" ? swLectures : startupLectures;

  // 🔥 이동 함수 (잠겨있지 않을 때만 이동)
  const handleMoveToDetail = (id, status) => {
    if (status !== 'Locked') {
      navigate(`/lecture/${id}`);
    } else {
      alert("아직 오픈되지 않은 강의입니다.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-12 text-center">
          <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase mb-2 block">Online Course</span>
          <h2 className="text-3xl md:text-5xl font-black italic">
            GET IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">ACADEMY</span>
          </h2>
        </div>

        {/* 탭 버튼 */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("SW")}
            className={`flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 rounded-full font-bold transition-all ${
              activeTab === "SW"
                ? "bg-cyan-500 text-[#110b29] scale-105 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            <Code size={20} /> SW Track
          </button>
          <button
            onClick={() => setActiveTab("STARTUP")}
            className={`flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 rounded-full font-bold transition-all ${
              activeTab === "STARTUP"
                ? "bg-purple-500 text-white scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            <Briefcase size={20} /> Startup Track
          </button>
        </div>

        {/* 강좌 리스트 */}
        <div className="space-y-4">
          {currentLectures.map((lec) => (
            <div 
              key={lec.id} 
              // 카드 전체를 클릭해도 이동
              onClick={() => handleMoveToDetail(lec.id, lec.status)}
              className={`relative flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 group
                ${lec.status === 'Locked' 
                  ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50 cursor-pointer'
                }`}
            >
              <div className="flex items-center gap-6">
                {/* 아이콘 */}
                <div>
                  {lec.status === 'Done' ? (
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                      <CheckCircle size={24} />
                    </div>
                  ) : lec.status === 'Locked' ? (
                     <div className="w-12 h-12 bg-gray-700/30 rounded-full flex items-center justify-center text-gray-500">
                      <Lock size={24} />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      activeTab === 'SW' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      <PlayCircle size={24} />
                    </div>
                  )}
                </div>

                {/* 텍스트 정보 */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      lec.status === 'Done' ? 'bg-green-900/30 text-green-400' :
                      lec.status === 'Locked' ? 'bg-gray-700 text-gray-400' : 
                      activeTab === 'SW' ? 'bg-cyan-900/30 text-cyan-400' : 'bg-purple-900/30 text-purple-400'
                    }`}>
                      {lec.week}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} /> {lec.time}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold group-hover:text-white transition-colors">
                    {lec.title}
                  </h3>
                </div>
              </div>

              {/* 🔥 우측 강좌보기 버튼 (복구됨!) */}
              {lec.status !== 'Locked' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 클릭 방지 (중복 실행 방지)
                    handleMoveToDetail(lec.id, lec.status);
                  }}
                  className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                    activeTab === 'SW' 
                      ? 'bg-cyan-500 text-[#110b29] hover:bg-cyan-400' 
                      : 'bg-purple-500 text-white hover:bg-purple-400'
                  }`}
                >
                  강좌 보기 <ArrowRight size={16} />
                </button>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Lecture;