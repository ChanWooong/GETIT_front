import React, { useState } from 'react';
import { Users, FileText, BarChart2, Settings, Bell, CheckCircle } from 'lucide-react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('MEMBERS');

  // 📂 목업 데이터 수정 (트랙 삭제, 과제 진행률 %, 강의 수 수치화)
  const members = [
    { id: 1, name: "김철수", lectureCount: 8, totalLectures: 10, hwProgress: 85 },
    { id: 2, name: "이영희", lectureCount: 3, totalLectures: 10, hwProgress: 40 },
    { id: 3, name: "박민수", lectureCount: 10, totalLectures: 10, hwProgress: 100 },
    { id: 4, name: "최수진", lectureCount: 1, totalLectures: 10, hwProgress: 10 },
    { id: 5, name: "정재민", lectureCount: 6, totalLectures: 10, hwProgress: 60 },
  ];

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* 헤더 */}
        <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
          <div>
            <span className="text-red-400 font-bold tracking-widest text-sm uppercase mb-1 block">Admin Console</span>
            <h2 className="text-3xl md:text-4xl font-black">운영진 관리자 페이지</h2>
          </div>
          <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
            <Settings size={16} /> 설정
          </button>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('MEMBERS')}
            className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'MEMBERS' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <BarChart2 size={18} /> 부원 학습 관리
          </button>
          <button 
            onClick={() => setActiveTab('NOTICE')}
            className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'NOTICE' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <Bell size={18} /> 공지사항 관리
          </button>
          <button 
            onClick={() => setActiveTab('TEAMS')}
            className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'TEAMS' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <Users size={18} /> 팀 빌딩 설정
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[500px]">
          
          {/* 1. 부원 관리 탭 */}
          {activeTab === 'MEMBERS' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">8기 부원 학습 현황</h3>
                <div className="text-sm text-gray-400">총 32명</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-sm">
                      <th className="p-4 w-[20%]">이름</th>
                      <th className="p-4 w-[30%]">영상 수강 현황</th>
                      <th className="p-4 w-[30%]">과제 진행률</th>
                      <th className="p-4 w-[20%] text-center">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold">{member.name}</td>
                        
                        {/* 영상 수강 현황 (수치로 표현) */}
                        <td className="p-4">
                          <span className="text-lg font-bold text-cyan-400">{member.lectureCount}</span>
                          <span className="text-gray-500 mx-1">/</span>
                          <span className="text-gray-400">{member.totalLectures} 강</span>
                        </td>

                        {/* 과제 진행률 (Bar 그래프로 표현) */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${member.hwProgress === 100 ? 'bg-green-500' : 'bg-purple-500'}`} 
                                style={{ width: `${member.hwProgress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm w-8 text-right">{member.hwProgress}%</span>
                          </div>
                        </td>

                        {/* 상태 (독촉하기 버튼 제거 -> 완료 여부 뱃지로 변경) */}
                        <td className="p-4 text-center">
                          {member.lectureCount === member.totalLectures && member.hwProgress === 100 ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-black bg-green-400 px-2 py-1 rounded-full">
                              <CheckCircle size={12} /> 수료 완료
                            </span>
                          ) : (
                            <span className="text-xs text-gray-500">진행 중</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. 공지사항 탭 */}
          {activeTab === 'NOTICE' && (
            <div className="text-center py-20 text-gray-400">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p>공지사항 작성 및 수정 기능이 들어갈 자리입니다.</p>
              <button className="mt-4 bg-cyan-600 text-white px-6 py-2 rounded-full font-bold hover:bg-cyan-500">
                새 공지 작성하기
              </button>
            </div>
          )}

          {/* 3. 팀 관리 탭 */}
          {activeTab === 'TEAMS' && (
            <div className="text-center py-20 text-gray-400">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p>팀 빌딩 및 조 편성 기능이 들어갈 자리입니다.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPage;