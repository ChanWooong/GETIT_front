import React, { useState, useEffect, useMemo } from 'react';
import api from '../../../api/axios';
import { useAppStore } from '../../../hooks/appStore';
import { ADMIN_APPLY_MESSAGES } from '../../../constants';
import { Search, Eye, FileText } from 'lucide-react';

const ApplicantManagement = ({ onSelect }) => {
  const { generationText } = useAppStore();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApplicants = useMemo(() => {
    if (!searchQuery.trim()) return applicants;
    const q = searchQuery.trim().toLowerCase();
    return applicants.filter((app) => (app.name || '').toLowerCase().includes(q));
  }, [applicants, searchQuery]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/admin/applies');
        if (response.data.success) {
          setApplicants(response.data.data);
        }
      } catch (err) {
        console.error('데이터 로드 실패:', err);
        setError(ADMIN_APPLY_MESSAGES.LIST_ERROR);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  const handleSelect = async (app) => {
    try {
      const [applyRes, infoRes] = await Promise.all([
        api.get(`/api/admin/applies/${app.id}`),
        api.get(`/api/admin/applies/${app.id}/info`),
      ]);
      const applyData = applyRes.data?.data ?? applyRes.data ?? {};
      const infoData = infoRes.data?.data ?? infoRes.data ?? {};
      onSelect({
        ...applyData,
        name: infoData.name ?? app.name ?? applyData.name,
        studentId: infoData.studentId ?? app.studentId,
        college: infoData.college,
        department: infoData.department ?? app.department ?? applyData.department,
        cellNum: infoData.cellNum ?? app.cellNum,
        email: infoData.email ?? app.email,
      });
    } catch (err) {
      console.error('상세 데이터 로드 실패:', err);
      alert(ADMIN_APPLY_MESSAGES.DETAIL_ERROR);
    }
  };

  if (loading) return <div className="p-10 text-white text-center">{ADMIN_APPLY_MESSAGES.LOADING}</div>;
  if (error) return <div className="p-10 text-red-400 text-center">{error}</div>;

  return (
    <div className="animate-in fade-in duration-500 text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <FileText className="text-cyan-400" /> {generationText} 지원자 명단
          <span className="text-sm font-mono text-gray-500 ml-2">({filteredApplicants.length})</span>
        </h3>
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={ADMIN_APPLY_MESSAGES.SEARCH_PLACEHOLDER}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-widest bg-white/5">
              <th className="p-5 font-bold">ID</th>
              <th className="p-5 font-bold">지원자 성명</th>
              <th className="p-5 font-bold">학번</th>
              <th className="p-5 font-bold">전화번호</th>
              <th className="p-5 font-bold">소속 학과</th>
              <th className="p-5 font-bold text-center">지원서 상세 보기</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((app) => (
              <tr key={app.id} className="border-b border-white/5 hover:bg-white/10 transition-colors group">
                <td className="p-5 font-mono text-sm text-gray-500">
                  {String(app.id).padStart(2, '0')}
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs font-bold">
                      {app.name ? app.name[0] : '?'}
                    </div>
                    <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {app.name || ADMIN_APPLY_MESSAGES.NO_NAME}
                    </span>
                  </div>
                </td>
                <td className="p-5 text-sm text-gray-400 font-mono">
                  {app.studentId ?? app.studentNumber ?? '-'}
                </td>
                <td className="p-5 text-sm text-gray-400">
                  {app.cellNum ?? app.phone ?? app.phoneNumber ?? '-'}
                </td>
                <td className="p-5 text-sm text-gray-400">
                  {app.department || ADMIN_APPLY_MESSAGES.NO_DEPARTMENT}
                </td>
                <td className="p-5 text-center">
                  <button
                    onClick={() => handleSelect(app)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-cyan-500 hover:text-[#110b29] rounded-xl text-xs font-black transition-all"
                  >
                    <Eye size={14} /> {ADMIN_APPLY_MESSAGES.VIEW_BUTTON}
                  </button>
                </td>
              </tr>
            ))}
            {filteredApplicants.length === 0 && (
              <tr>
                <td colSpan="6" className="p-20 text-center text-gray-500 italic">
                  {ADMIN_APPLY_MESSAGES.NO_APPLICANTS}
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