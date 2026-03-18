import React, { useState, useEffect, useMemo } from 'react';
import api from '../../../api/axios';
import { parseMembersListResponse } from '../../../api/responseParsers';
import { useAppStore } from '../../../hooks/appStore';
import { ADMIN_MEMBER_MESSAGES, API, LECTURE_TRACK } from '../../../constants';
import LoadingState from '../../../components/admin/LoadingState';
import ErrorState from '../../../components/admin/ErrorState';
import SearchInput from '../../../components/admin/SearchInput';
import { CheckCircle, MessageCircle, FileText, Trash2, Download } from 'lucide-react';

const SUBTAB = { MEMBERS: 'MEMBERS', QNA: 'QNA', ASSIGNMENTS: 'ASSIGNMENTS' };

/** Q&A 메시지를 질문 단위로 묶음. 백엔드 qnaId 있으면 답변을 해당 질문 밑에 붙임. */
function groupQnaByQuestion(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return [];
  const hasQnaId = messages.some((m) => m.qnaId != null);
  if (hasQnaId) {
    const questions = messages.filter((m) => m.sender === 'USER').sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const order = questions.map((m) => m.qnaId ?? m.id);
    const byQna = {};
    for (const msg of messages) {
      const qid = msg.qnaId ?? (msg.sender === 'USER' ? msg.id : null);
      if (qid == null) continue;
      if (msg.sender === 'USER') {
        byQna[qid] = { question: msg, answers: [] };
      } else {
        if (!byQna[qid]) byQna[qid] = { question: null, answers: [] };
        byQna[qid].answers.push(msg);
      }
    }
    return order.map((qid) => byQna[qid]).filter((g) => g && g.question).map((g) => {
      g.answers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      return g;
    });
  }
  const groups = [];
  for (const msg of messages) {
    if (msg.sender === 'USER') groups.push({ question: msg, answers: [] });
    else if (msg.sender === 'ADMIN' && groups.length > 0) groups[groups.length - 1].answers.push(msg);
  }
  return groups;
}

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
  const [boardRows, setBoardRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null); // { lectureId, memberId }
  const [messages, setMessages] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [answerByQna, setAnswerByQna] = useState({});
  const [answerDeletingId, setAnswerDeletingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(API.PATHS.LECTURES, { params: { size: 100 } })
      .then((res) => {
        const content = res.data?.content ?? [];
        if (content.length === 0) {
          setBoardRows([]);
          setLoading(false);
          return;
        }
        return Promise.all(
          content.map((item) =>
            api.get(API.PATHS.LECTURE_DETAIL(item.lectureId)).then((r) => ({
              lectureId: r.data.lectureId,
              title: r.data.title || '',
            }))
          )
        ).then((lectureList) => {
          const sorted = [...lectureList].sort((a, b) => String(a.title).localeCompare(b.title));
          return Promise.all(
            sorted.map((lec) =>
              api.get(`/api/lecture/${lec.lectureId}/qna/rooms`).then((roomsRes) => {
                const rooms = Array.isArray(roomsRes.data) ? roomsRes.data : [];
                return rooms.map((r) => ({
                  lectureId: lec.lectureId,
                  lectureTitle: lec.title,
                  memberId: r.memberId,
                  memberName: r.memberName ?? `멤버 ${r.memberId}`,
                  lastMessage: r.lastMessage ?? '',
                  lastMessageAt: r.lastMessageAt ?? null,
                  unanswered: !!r.unanswered,
                }));
              })
            )
          ).then((arrays) => {
            const flat = arrays.flat();
            flat.sort((a, b) => {
              const ta = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
              const tb = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
              return tb - ta;
            });
            setBoardRows(flat);
          });
        });
      })
      .catch(() => setBoardRows([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!expanded) {
      setMessages([]);
      return;
    }
    setLoadingChat(true);
    api.get(`/api/lecture/${expanded.lectureId}/qna/rooms/${expanded.memberId}`)
      .then((res) => setMessages(Array.isArray(res.data) ? res.data : []))
      .catch(() => setMessages([]))
      .finally(() => setLoadingChat(false));
  }, [expanded]);

  const submitAnswer = (lectureId, qnaId) => {
    const content = (answerByQna[qnaId] || '').trim();
    if (!content || !lectureId) return;
    api.post(`/api/lecture/${lectureId}/qna/${qnaId}/answer`, { content })
      .then(() => {
        setAnswerByQna((prev) => ({ ...prev, [qnaId]: '' }));
        if (expanded && expanded.lectureId === lectureId && expanded.memberId) {
          api.get(`/api/lecture/${lectureId}/qna/rooms/${expanded.memberId}`)
            .then((res) => setMessages(Array.isArray(res.data) ? res.data : []));
        }
      })
      .catch(() => alert('답변 등록에 실패했습니다.'));
  };

  const deleteAnswer = (lectureId, answerId) => {
    if (!lectureId || !answerId || answerDeletingId) return;
    if (!window.confirm(ADMIN_MEMBER_MESSAGES.QNA_DELETE_ANSWER_CONFIRM)) return;
    setAnswerDeletingId(answerId);
    api
      .delete(`/api/lecture/${lectureId}/qna/answer/${answerId}`)
      .then(() => {
        if (expanded && expanded.lectureId === lectureId && expanded.memberId) {
          return api.get(`/api/lecture/${lectureId}/qna/rooms/${expanded.memberId}`);
        }
        return Promise.resolve({ data: [] });
      })
      .then((res) => setMessages(Array.isArray(res.data) ? res.data : []))
      .catch(() => alert(ADMIN_MEMBER_MESSAGES.QNA_DELETE_ANSWER_ERROR))
      .finally(() => setAnswerDeletingId(null));
  };

  const toggleExpand = (row) => {
    const key = row.lectureId + '-' + row.memberId;
    const next = expanded && expanded.lectureId === row.lectureId && expanded.memberId === row.memberId ? null : { lectureId: row.lectureId, memberId: row.memberId };
    setExpanded(next);
    if (next) setAnswerByQna({});
  };

  const preview = (text, max = 40) => {
    if (!text) return '—';
    const t = String(text).replace(/\s+/g, ' ').trim();
    return t.length <= max ? t : t.slice(0, max) + '…';
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleString('ko-KR', { dateStyle: 'short', timeStyle: 'short' }) : '—');

  if (loading) return <LoadingState message={ADMIN_MEMBER_MESSAGES.QNA_LOADING} />;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-200">{ADMIN_MEMBER_MESSAGES.QNA_BOARD_TITLE}</h3>
      {boardRows.length === 0 ? (
        <p className="text-gray-500 py-8">{ADMIN_MEMBER_MESSAGES.QNA_BOARD_EMPTY}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-3">{ADMIN_MEMBER_MESSAGES.QNA_COLUMN_LECTURE}</th>
                <th className="p-3">{ADMIN_MEMBER_MESSAGES.QNA_COLUMN_MEMBER}</th>
                <th className="p-3">{ADMIN_MEMBER_MESSAGES.QNA_COLUMN_PREVIEW}</th>
                <th className="p-3">{ADMIN_MEMBER_MESSAGES.QNA_COLUMN_DATE}</th>
                <th className="p-3 text-center">{ADMIN_MEMBER_MESSAGES.QNA_COLUMN_STATUS}</th>
                <th className="p-3 w-24" />
              </tr>
            </thead>
            <tbody>
              {boardRows.map((row) => {
                const rowKey = `${row.lectureId}-${row.memberId}`;
                const isExpanded = expanded && expanded.lectureId === row.lectureId && expanded.memberId === row.memberId;
                return (
                  <React.Fragment key={rowKey}>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-3 font-medium text-cyan-300">{row.lectureTitle}</td>
                      <td className="p-3 font-medium text-gray-200">{row.memberName}</td>
                      <td className="p-3 text-gray-400 text-sm max-w-[200px] truncate" title={row.lastMessage}>
                        {preview(row.lastMessage)}
                      </td>
                      <td className="p-3 text-gray-500 text-sm whitespace-nowrap">{formatDate(row.lastMessageAt)}</td>
                      <td className="p-3 text-center">
                        {row.unanswered ? (
                          <span className="text-xs font-bold text-amber-400">{ADMIN_MEMBER_MESSAGES.QNA_UNANSWERED}</span>
                        ) : (
                          <span className="text-xs text-gray-500">{ADMIN_MEMBER_MESSAGES.QNA_ANSWERED}</span>
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => toggleExpand(row)}
                          className="px-3 py-1.5 bg-cyan-600 text-white text-sm font-bold rounded-lg hover:bg-cyan-500"
                        >
                          {ADMIN_MEMBER_MESSAGES.QNA_ACTION_ANSWER}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-white/5">
                        <td colSpan={6} className="p-4">
                          <div className="bg-black/20 border border-white/10 rounded-xl p-4 max-h-[320px] overflow-y-auto space-y-3">
                            {loadingChat ? (
                              <p className="text-gray-500">{ADMIN_MEMBER_MESSAGES.LOADING}</p>
                            ) : (
                              groupQnaByQuestion(messages).map((group) => (
                                <div key={group.question.id} className="space-y-2">
                                  <div>
                                    <p className="text-sm text-gray-200 whitespace-pre-wrap">{group.question.content}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      멤버 · {group.question.createdAt ? new Date(group.question.createdAt).toLocaleString('ko-KR') : ''}
                                    </p>
                                  </div>
                                  <div className="mt-2 flex gap-2">
                                    <input
                                      type="text"
                                      value={answerByQna[group.question.id] ?? ''}
                                      onChange={(e) => setAnswerByQna((prev) => ({ ...prev, [group.question.id]: e.target.value }))}
                                      placeholder={ADMIN_MEMBER_MESSAGES.QNA_ANSWER_PLACEHOLDER}
                                      className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => submitAnswer(row.lectureId, group.question.id)}
                                      disabled={!(answerByQna[group.question.id] || '').trim()}
                                      className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-lg text-sm disabled:opacity-50"
                                    >
                                      {ADMIN_MEMBER_MESSAGES.QNA_SUBMIT_ANSWER}
                                    </button>
                                  </div>
                                  {group.answers.length > 0 && (
                                    <div className="pl-4 space-y-2 border-l-2 border-cyan-500/30">
                                      {group.answers.map((answer) => (
                                        <div key={answer.id} className="flex items-start justify-between gap-2">
                                          <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-200 whitespace-pre-wrap">{answer.content}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                              관리자 · {answer.createdAt ? new Date(answer.createdAt).toLocaleString('ko-KR') : ''}
                                            </p>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => deleteAnswer(row.lectureId, answer.id)}
                                            disabled={answerDeletingId === answer.id}
                                            className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 disabled:opacity-50"
                                            title={ADMIN_MEMBER_MESSAGES.QNA_DELETE_ANSWER}
                                          >
                                            <Trash2 size={16} />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))
                            )}
                            {!loadingChat && messages.length === 0 && <p className="text-gray-500 text-sm">{ADMIN_MEMBER_MESSAGES.QNA_NO_MESSAGES}</p>}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AssignmentsListView() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingFileId, setDownloadingFileId] = useState(null);

  useEffect(() => {
    api.get('/api/admin/assignments/all', { params: { size: 100 } })
      .then((res) => {
        const content = res.data?.content ?? (Array.isArray(res.data) ? res.data : []);
        setAssignments(content);
      })
      .catch(() => setAssignments([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDownloadFile = (fileId, fileName) => {
    if (downloadingFileId != null) return;
    setDownloadingFileId(fileId);
    api
      .get(`/api/admin/assignments/files/${fileId}/download`, { responseType: 'blob' })
      .then((res) => {
        const blob = res.data;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'download';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(() => alert(ADMIN_MEMBER_MESSAGES.ASSIGNMENTS_DOWNLOAD_ERROR))
      .finally(() => setDownloadingFileId(null));
  };

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
                {Array.isArray(a.files) && a.files.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {a.files.map((f) => (
                      <button
                        key={f.fileId}
                        type="button"
                        onClick={() => handleDownloadFile(f.fileId, f.fileName)}
                        disabled={downloadingFileId === f.fileId}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-600/20 text-cyan-400 text-xs font-medium hover:bg-cyan-600/30 disabled:opacity-50"
                        title={f.fileName}
                      >
                        <Download size={14} />
                        {ADMIN_MEMBER_MESSAGES.ASSIGNMENTS_DOWNLOAD}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-500">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberManagement;
