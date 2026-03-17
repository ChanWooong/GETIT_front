import React, { useState, useEffect, useMemo } from 'react';
import api from '../../../api/axios';
import { parseMembersListResponse } from '../../../api/responseParsers';
import { useAppStore } from '../../../hooks/appStore';
import { ADMIN_MEMBER_MESSAGES, API, LECTURE_TRACK } from '../../../constants';
import LoadingState from '../../../components/admin/LoadingState';
import ErrorState from '../../../components/admin/ErrorState';
import SearchInput from '../../../components/admin/SearchInput';
import { CheckCircle, MessageCircle, FileText } from 'lucide-react';

const SUBTAB = { MEMBERS: 'MEMBERS', QNA: 'QNA', ASSIGNMENTS: 'ASSIGNMENTS' };

const MemberManagement = () => {
  const { generationText } = useAppStore();
  const [subTab, setSubTab] = useState(SUBTAB.MEMBERS);

  return (
    <div className="animate-in fade-in duration-500 text-left">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xl font-bold mr-4">{generationText} 부원 학습 현황</span>
        <button
          type="button"
          onClick={() => setSubTab(SUBTAB.MEMBERS)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            subTab === SUBTAB.MEMBERS ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <CheckCircle size={18} /> {ADMIN_MEMBER_MESSAGES.SUBTAB_MEMBERS}
        </button>
        <button
          type="button"
          onClick={() => setSubTab(SUBTAB.QNA)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            subTab === SUBTAB.QNA ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <MessageCircle size={18} /> {ADMIN_MEMBER_MESSAGES.SUBTAB_QNA}
        </button>
        <button
          type="button"
          onClick={() => setSubTab(SUBTAB.ASSIGNMENTS)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            subTab === SUBTAB.ASSIGNMENTS ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <FileText size={18} /> {ADMIN_MEMBER_MESSAGES.SUBTAB_ASSIGNMENTS}
        </button>
      </div>

      {subTab === SUBTAB.MEMBERS && <MembersListView />}
      {subTab === SUBTAB.QNA && <QnaManagementView />}
      {subTab === SUBTAB.ASSIGNMENTS && <AssignmentsListView />}
    </div>
  );
};

function MembersListView() {
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
    api.get('/api/admin/members')
      .then((res) => setMembers(parseMembersListResponse(res)))
      .catch(() => setError(ADMIN_MEMBER_MESSAGES.LIST_ERROR))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState message={ADMIN_MEMBER_MESSAGES.LOADING} />;
  if (error) return <ErrorState message={error} />;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <span className="text-sm text-gray-500 font-mono">Total: {filteredMembers.length} Members</span>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={ADMIN_MEMBER_MESSAGES.SEARCH_PLACEHOLDER}
        />
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
                  {member.lectureCount ?? 0} <span className="text-gray-600 text-sm font-normal">/ {member.totalLectures ?? 0} 강</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${(member.hwProgress ?? 0) === 100 ? 'bg-green-500' : 'bg-cyan-500'}`}
                        style={{ width: `${member.hwProgress ?? 0}%` }}
                      />
                    </div>
                    <span className="text-xs w-8 text-right font-mono">{member.hwProgress ?? 0}%</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  {(member.hwProgress ?? 0) === 100 && (member.lectureCount ?? 0) === (member.totalLectures ?? 0) ? (
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
    </>
  );
}

function QnaManagementView() {
  const [lectures, setLectures] = useState([]);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [answerByQna, setAnswerByQna] = useState({});
  const [loadingLectures, setLoadingLectures] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    api.get(API.PATHS.LECTURES, { params: { size: 100 } })
      .then((res) => {
        const content = res.data?.content ?? [];
        if (content.length === 0) {
          setLectures([]);
          setLoadingLectures(false);
          return;
        }
        Promise.all(
          content.map((item) =>
            api.get(API.PATHS.LECTURE_DETAIL(item.lectureId)).then((r) => ({
              lectureId: r.data.lectureId,
              title: r.data.title,
              id: r.data.lectureId,
            }))
          )
        ).then((list) => {
          const sorted = [...list].sort((a, b) => String(a.title).localeCompare(b.title));
          setLectures(sorted);
        });
      })
      .catch(() => setLectures([]))
      .finally(() => setLoadingLectures(false));
  }, []);

  useEffect(() => {
    if (!selectedLectureId) {
      setRooms([]);
      setSelectedMemberId(null);
      setMessages([]);
      return;
    }
    setLoadingRooms(true);
    api.get(`/api/lecture/${selectedLectureId}/qna/rooms`)
      .then((res) => setRooms(Array.isArray(res.data) ? res.data : []))
      .catch(() => setRooms([]))
      .finally(() => setLoadingRooms(false));
    setSelectedMemberId(null);
    setMessages([]);
  }, [selectedLectureId]);

  useEffect(() => {
    if (!selectedLectureId || !selectedMemberId) {
      setMessages([]);
      return;
    }
    setLoadingChat(true);
    api.get(`/api/lecture/${selectedLectureId}/qna/rooms/${selectedMemberId}`)
      .then((res) => setMessages(Array.isArray(res.data) ? res.data : []))
      .catch(() => setMessages([]))
      .finally(() => setLoadingChat(false));
  }, [selectedLectureId, selectedMemberId]);

  const submitAnswer = (qnaId) => {
    const content = (answerByQna[qnaId] || '').trim();
    if (!content || !selectedLectureId) return;
    api.post(`/api/lecture/${selectedLectureId}/qna/${qnaId}/answer`, { content })
      .then(() => {
        setAnswerByQna((prev) => ({ ...prev, [qnaId]: '' }));
        if (selectedMemberId) {
          api.get(`/api/lecture/${selectedLectureId}/qna/rooms/${selectedMemberId}`)
            .then((res) => setMessages(Array.isArray(res.data) ? res.data : []));
        }
      })
      .catch(() => alert('답변 등록에 실패했습니다.'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">{ADMIN_MEMBER_MESSAGES.QNA_SELECT_LECTURE}</label>
        <select
          value={selectedLectureId ?? ''}
          onChange={(e) => setSelectedLectureId(e.target.value ? Number(e.target.value) : null)}
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">-- 선택 --</option>
          {lectures.map((l) => (
            <option key={l.lectureId ?? l.id} value={l.lectureId ?? l.id}>
              {l.title}
            </option>
          ))}
        </select>
      </div>

      {loadingLectures && <p className="text-gray-500">{ADMIN_MEMBER_MESSAGES.LOADING}</p>}
      {!loadingLectures && lectures.length === 0 && <p className="text-gray-500">{ADMIN_MEMBER_MESSAGES.QNA_NO_LECTURES}</p>}

      {selectedLectureId && (
        <>
          {loadingRooms ? (
            <p className="text-gray-500">{ADMIN_MEMBER_MESSAGES.LOADING}</p>
          ) : rooms.length === 0 ? (
            <p className="text-gray-500">{ADMIN_MEMBER_MESSAGES.QNA_NO_ROOMS}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2 text-gray-300">{ADMIN_MEMBER_MESSAGES.QNA_ROOMS}</h4>
                <ul className="space-y-2">
                  {rooms.map((r) => (
                    <li key={r.memberId}>
                      <button
                        type="button"
                        onClick={() => setSelectedMemberId(r.memberId)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                          selectedMemberId === r.memberId
                            ? 'bg-cyan-600/30 border-cyan-500 text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="font-medium">{r.memberName ?? `멤버 ${r.memberId}`}</span>
                        {r.unanswered && <span className="ml-2 text-xs text-amber-400">미답변</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-300">채팅 내용</h4>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 min-h-[200px] max-h-[400px] overflow-y-auto space-y-3">
                  {loadingChat ? (
                    <p className="text-gray-500">{ADMIN_MEMBER_MESSAGES.LOADING}</p>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className={msg.sender === 'ADMIN' ? 'pl-4 border-l-2 border-cyan-500/30' : ''}>
                        <p className="text-sm text-gray-200 whitespace-pre-wrap">{msg.content}</p>
                        <p className="text-xs text-gray-500">
                          {msg.sender === 'USER' ? '멤버' : '관리자'} · {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
                        </p>
                        {msg.sender === 'USER' && (
                          <div className="mt-2 flex gap-2">
                            <input
                              type="text"
                              value={answerByQna[msg.id] ?? ''}
                              onChange={(e) => setAnswerByQna((prev) => ({ ...prev, [msg.id]: e.target.value }))}
                              placeholder={ADMIN_MEMBER_MESSAGES.QNA_ANSWER_PLACEHOLDER}
                              className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                            />
                            <button
                              type="button"
                              onClick={() => submitAnswer(msg.id)}
                              disabled={!(answerByQna[msg.id] || '').trim()}
                              className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-lg text-sm disabled:opacity-50"
                            >
                              {ADMIN_MEMBER_MESSAGES.QNA_SUBMIT_ANSWER}
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AssignmentsListView() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/admin/assignments/all', { params: { size: 100 } })
      .then((res) => {
        const content = res.data?.content ?? (Array.isArray(res.data) ? res.data : []);
        setAssignments(content);
      })
      .catch(() => setAssignments([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500 py-8">{ADMIN_MEMBER_MESSAGES.ASSIGNMENTS_LOADING}</p>;
  if (assignments.length === 0) return <p className="text-gray-500 py-8">{ADMIN_MEMBER_MESSAGES.ASSIGNMENTS_EMPTY}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
            <th className="p-4">주차</th>
            <th className="p-4">트랙</th>
            <th className="p-4">과제</th>
            <th className="p-4">제출일</th>
            <th className="p-4">파일</th>
            <th className="p-4">다운로드</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.assignmentId} className="border-b border-white/5 hover:bg-white/5">
              <td className="p-4">{a.week}</td>
              <td className="p-4">{a.trackType === LECTURE_TRACK.SW ? 'SW' : 'Startup'}</td>
              <td className="p-4 font-medium">{a.taskTitle ?? '-'}</td>
              <td className="p-4 text-sm text-gray-400">
                {a.submittedAt ? new Date(a.submittedAt).toLocaleString() : '-'}
              </td>
              <td className="p-4">
                {Array.isArray(a.files) && a.files.length > 0
                  ? a.files.map((f) => <span key={f.fileId} className="block text-sm">{f.fileName}</span>)
                  : '-'}
              </td>
              <td className="p-4">
                <span className="text-xs text-gray-500">{ADMIN_MEMBER_MESSAGES.ASSIGNMENTS_DOWNLOAD_PREPARING}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberManagement;
