import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { useAppStore } from '../../../hooks/appStore';
import { ADMIN_MEMBER_MESSAGES } from '../../../constants';
import { CheckCircle } from 'lucide-react';

const MemberManagement = () => {
  const { generationText } = useAppStore();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/admin/members');
        if (response.data?.success && response.data?.data) {
          setMembers(Array.isArray(response.data.data) ? response.data.data : []);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.error('데이터 로드 실패:', err);
        setError(ADMIN_MEMBER_MESSAGES.LIST_ERROR);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return <div className="p-10 text-white text-center">{ADMIN_MEMBER_MESSAGES.LOADING}</div>;
  if (error) return <div className="p-10 text-red-400 text-center">{error}</div>;

  return (
    <div className="animate-in fade-in duration-500 text-left">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold">{generationText} 부원 학습 현황</h3>
        <span className="text-sm text-gray-500 font-mono text-right">Total: {members.length} Members</span>
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
            {members.map((member) => (
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