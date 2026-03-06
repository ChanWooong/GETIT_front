import React, { useState, useEffect, useMemo } from 'react';
import api from '../../../api/axios';
import { ADMIN_AUTH_MESSAGES } from '../../../constants';
import { UserCheck, Search, Loader2 } from 'lucide-react';

/**
 * Admin 권한 설정: 승인 대기 가입자 목록 및 멤버 승인
 * - GET /api/admin/members/pending: 승인 대기 사용자 목록 (id, name, studentId, department, createdAt)
 * - PATCH /api/admin/members/{id}/approve: 멤버 승인
 */
const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  } catch {
    return dateStr;
  }
};

const AuthManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [approvingId, setApprovingId] = useState(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/admin/members/pending');
      const body = response?.data ?? response;
      const list =
        (body?.success && Array.isArray(body?.data) && body.data) ||
        (Array.isArray(body?.data) && body.data) ||
        (Array.isArray(body?.data?.content) && body.data.content) ||
        (Array.isArray(body) && body) ||
        [];
      setUsers(list);
    } catch (err) {
      console.error('승인 대기 목록 로드 실패:', err);
      setError(ADMIN_AUTH_MESSAGES.LIST_ERROR);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.trim().toLowerCase();
    return users.filter(
      (u) =>
        (u.name || '').toLowerCase().includes(q) ||
        (u.studentId || '').toString().toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  const handleApprove = async (user) => {
    if (!window.confirm(ADMIN_AUTH_MESSAGES.APPROVE_CONFIRM)) return;
    try {
      setApprovingId(user.id);
      await api.patch(`/api/admin/members/${user.id}/approve`);
      await fetchMembers();
      alert(ADMIN_AUTH_MESSAGES.APPROVE_SUCCESS);
    } catch (err) {
      console.error('멤버 승인 실패:', err);
      alert(err.response?.data?.message || ADMIN_AUTH_MESSAGES.APPROVE_ERROR);
    } finally {
      setApprovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-white text-center flex items-center justify-center gap-2">
        <Loader2 size={20} className="animate-spin" />
        {ADMIN_AUTH_MESSAGES.LOADING}
      </div>
    );
  }
  if (error) {
    return <div className="p-10 text-red-400 text-center">{error}</div>;
  }

  return (
    <div className="animate-in fade-in duration-500 text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <UserCheck className="text-cyan-400" /> 승인 대기
          <span className="text-sm font-mono text-gray-500 ml-2">({filteredUsers.length}명)</span>
        </h3>
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={ADMIN_AUTH_MESSAGES.SEARCH_PLACEHOLDER}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-left border-collapse min-w-[520px]">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-widest bg-white/5">
              <th className="p-5 font-bold">이름</th>
              <th className="p-5 font-bold">학번</th>
              <th className="p-5 font-bold">학과</th>
              <th className="p-5 font-bold">가입일</th>
              <th className="p-5 font-bold text-center">동작</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user?.id ?? index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-5 font-bold text-white">{user.name ?? '-'}</td>
                <td className="p-5 text-sm text-gray-400 font-mono">{user.studentId ?? '-'}</td>
                <td className="p-5 text-sm text-gray-400">{user.department ?? '-'}</td>
                <td className="p-5 text-sm text-gray-400">{formatDate(user.createdAt)}</td>
                <td className="p-5 text-center">
                  <button
                    type="button"
                    onClick={() => handleApprove(user)}
                    disabled={approvingId === user.id}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {approvingId === user.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <UserCheck size={14} />
                    )}
                    {ADMIN_AUTH_MESSAGES.BUTTON_APPROVE}
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="p-20 text-center text-gray-500 italic">
                  {ADMIN_AUTH_MESSAGES.NO_USERS}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthManagement;
