import React, { useState, useEffect, useMemo } from 'react';
import api from '../../../api/axios';
import { parseMembersListResponse } from '../../../api/responseParsers';
import { useAppStore } from '../../../hooks/appStore';
import { ADMIN_MEMBER_MESSAGES } from '../../../constants';
import LoadingState from '../../../components/admin/LoadingState';
import ErrorState from '../../../components/admin/ErrorState';
import SearchInput from '../../../components/admin/SearchInput';
import { CheckCircle } from 'lucide-react';

const MemberManagement = () => {
  const { generationText } = useAppStore();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members;
    const q = searchQuery.trim().toLowerCase();
    return members.filter((m) => (m.name || '').toLowerCase().includes(q));
  }, [members, searchQuery]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/admin/members');
        setMembers(parseMembersListResponse(response));
      } catch (err) {
        console.error('데이터 로드 실패:', err);
        setError(ADMIN_MEMBER_MESSAGES.LIST_ERROR);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return <LoadingState message={ADMIN_MEMBER_MESSAGES.LOADING} />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="animate-in fade-in duration-500 text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h3 className="text-xl font-bold">{generationText} 부원 학습 현황</h3>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <span className="text-sm text-gray-500 font-mono">Total: {filteredMembers.length} Members</span>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={ADMIN_MEMBER_MESSAGES.SEARCH_PLACEHOLDER}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4">Name</th>
              <th className="p-4">Video Progress</th>
              <th className="p-4">Homework</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold">{member.name}</td>
                <td className="p-4 text-cyan-400 font-bold text-lg">
                  {member.lectureCount} <span className="text-gray-600 text-sm font-normal">/ {member.totalLectures} 강</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${member.hwProgress === 100 ? 'bg-green-500' : 'bg-cyan-500'}`} 
                        style={{ width: `${member.hwProgress}%` }} 
                      />
                    </div>
                    <span className="text-xs w-8 text-right font-mono">{member.hwProgress}%</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  {member.hwProgress === 100 && member.lectureCount === member.totalLectures ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-black bg-green-400 px-2 py-0.5 rounded-full">
                      <CheckCircle size={10} /> COMPLETED
                    </span>
                  ) : (
                    <span className="text-xs text-gray-600 tracking-tighter uppercase font-medium">In Progress</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberManagement;