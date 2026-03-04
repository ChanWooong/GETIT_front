import React from 'react';
import { Search, Eye, Calendar, FileText, User } from 'lucide-react';

const ApplicantManagement = ({ applicants, onSelect, formatDate }) => {
  return (
    <div className="animate-in fade-in duration-500 text-left">
      {/* 상단 컨트롤 바 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <FileText className="text-cyan-400" /> 9기 지원자 명단 
          <span className="text-sm font-mono text-gray-500 ml-2">({applicants.length})</span>
        </h3>
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="이름으로 검색..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* 리스트 테이블 */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-widest bg-white/5">
              <th className="p-5 font-bold">ID</th>
              <th className="p-5 font-bold">지원자 성명</th>
              <th className="p-5 font-bold">소속 학과</th>
              <th className="p-5 font-bold">제출 일시</th>
              <th className="p-5 font-bold text-center">액션</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app) => (
              <tr key={app.id} className="border-b border-white/5 hover:bg-white/10 transition-colors group">
                <td className="p-5 font-mono text-sm text-gray-500">
                  {String(app.id).padStart(2, '0')}
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs font-bold">
                      {app.name[0]}
                    </div>
                    <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {app.name}
                    </span>
                  </div>
                </td>
                <td className="p-5 text-sm text-gray-400">
                  {app.department || '정보 없음'}
                </td>
                <td className="p-5 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="opacity-50" />
                    {formatDate(app.submittedAt)}
                  </div>
                </td>
                <td className="p-5 text-center">
                  <button 
                    onClick={() => onSelect(app)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-cyan-500 hover:text-[#110b29] rounded-xl text-xs font-black transition-all"
                  >
                    <Eye size={14} /> 지원서 상세 보기
                  </button>
                </td>
              </tr>
            ))}
            {applicants.length === 0 && (
              <tr>
                <td colSpan="5" className="p-20 text-center text-gray-500 italic">
                  현재 접수된 지원서가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantManagement;