import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ChevronDown } from 'lucide-react';
import api from '../../../api/axios';
import { API, LECTURE_TRACK, MY_QNA_PAGE } from '../../../constants';
import { groupQnaByQuestion } from '../../../utils/qnaGroup';

function threadLastAtMs(group) {
  const times = [group.question?.createdAt, ...group.answers.map((a) => a.createdAt)].filter(Boolean);
  if (times.length === 0) return 0;
  return Math.max(...times.map((t) => new Date(t).getTime()));
}

function previewLine(text, fallback) {
  if (!text || typeof text !== 'string') return fallback;
  const t = text.replace(/\s+/g, ' ').trim();
  if (!t) return fallback;
  const max = 160;
  return t.length <= max ? t : `${t.slice(0, max)}…`;
}

const FILTER = { ALL: 'ALL', UNANSWERED: 'UNANSWERED', ANSWERED: 'ANSWERED' };

export default function MyQna() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState(FILTER.ALL);
  const [expandedKey, setExpandedKey] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .get(API.PATHS.LECTURES, { params: { size: 100 } })
      .then((res) => {
        const content = res.data?.content ?? [];
        if (cancelled || content.length === 0) {
          setRows([]);
          return null;
        }
        return Promise.all(
          content.map((item) =>
            api.get(API.PATHS.LECTURE_DETAIL(item.lectureId)).then((r) => ({
              lectureId: r.data.lectureId,
              title: r.data.title || '',
              type: r.data.type,
            }))
          )
        ).then((lectures) => {
          if (cancelled) return null;
          return Promise.all(
            lectures.map((lec) =>
              api
                .get(API.PATHS.LECTURE_QNA_ME(lec.lectureId))
                .then((r) => ({ ...lec, messages: Array.isArray(r.data) ? r.data : [] }))
                .catch(() => ({ ...lec, messages: [] }))
            )
          );
        });
      })
      .then((withMessages) => {
        if (cancelled) return;
        if (!withMessages) {
          setRows([]);
          return;
        }
        const out = [];
        for (const lec of withMessages) {
          if (!lec.messages.length) continue;
          const groups = groupQnaByQuestion(lec.messages);
          for (const g of groups) {
            const qnaKey = g.question.qnaId ?? g.question.id;
            out.push({
              rowKey: `${lec.lectureId}-${qnaKey}`,
              lectureId: lec.lectureId,
              lectureTitle: lec.title,
              trackType: lec.type,
              preview: previewLine(g.question.content, MY_QNA_PAGE.PREVIEW_FALLBACK),
              lastAt: threadLastAtMs(g),
              unanswered: g.answers.length === 0,
              thread: { question: g.question, answers: g.answers },
            });
          }
        }
        out.sort((a, b) => b.lastAt - a.lastAt);
        setRows(out);
      })
      .catch(() => {
        if (!cancelled) setError(MY_QNA_PAGE.LOAD_ERROR);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredRows = useMemo(() => {
    if (filter === FILTER.ALL) return rows;
    if (filter === FILTER.UNANSWERED) return rows.filter((r) => r.unanswered);
    return rows.filter((r) => !r.unanswered);
  }, [rows, filter]);

  const trackLabel = (type) => (type === LECTURE_TRACK.STARTUP ? MY_QNA_PAGE.TRACK_STARTUP : MY_QNA_PAGE.TRACK_SW);

  const toggleExpand = (rowKey) => {
    setExpandedKey((prev) => (prev === rowKey ? null : rowKey));
  };

  const filterOptions = [
    { id: FILTER.ALL, label: MY_QNA_PAGE.FILTER_ALL },
    { id: FILTER.UNANSWERED, label: MY_QNA_PAGE.FILTER_UNANSWERED },
    { id: FILTER.ANSWERED, label: MY_QNA_PAGE.FILTER_ANSWERED },
  ];

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0a061e] text-white pt-24 pb-20 px-6 font-sans flex items-center justify-center">
        <p className="text-gray-400">{MY_QNA_PAGE.LOADING}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#0a061e] text-white pt-24 pb-20 px-6 font-sans flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0a061e] text-white pt-24 pb-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto mb-6 flex items-center gap-4">
        <button type="button" onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <MessageCircle size={22} className="text-green-400" />
            {MY_QNA_PAGE.TITLE}
          </h2>
          <p className="text-sm text-gray-400">{MY_QNA_PAGE.SUBTITLE}</p>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="max-w-3xl mx-auto bg-[#110b29] border border-white/10 p-6 rounded-2xl">
          <p className="text-gray-500">{MY_QNA_PAGE.EMPTY}</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setFilter(opt.id);
                  setExpandedKey(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-sm font-bold border transition-colors ${
                  filter === opt.id
                    ? 'bg-cyan-600/20 border-cyan-500/40 text-cyan-300'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {filteredRows.length === 0 ? (
            <div className="bg-[#110b29] border border-white/10 p-6 rounded-2xl">
              <p className="text-gray-500">{MY_QNA_PAGE.FILTER_EMPTY}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRows.map((row) => {
                const isOpen = expandedKey === row.rowKey;
                const { thread } = row;
                return (
                  <div
                    key={row.rowKey}
                    className="bg-[#110b29] border border-white/10 rounded-2xl p-4"
                  >
                    <div className="flex gap-2 items-start">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="text-sm font-bold text-cyan-300 truncate">{row.lectureTitle || '-'}</span>
                          <span className="text-xs text-gray-500 shrink-0">{trackLabel(row.trackType)}</span>
                        </div>
                        <p className="text-sm text-gray-200 line-clamp-3 whitespace-pre-wrap">{row.preview}</p>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="text-gray-500">
                            {MY_QNA_PAGE.LAST_ACTIVITY}
                            {': '}
                            {row.lastAt ? new Date(row.lastAt).toLocaleString() : '-'}
                          </span>
                          <span className={row.unanswered ? 'text-amber-400 font-bold' : 'text-gray-500'}>
                            {row.unanswered ? MY_QNA_PAGE.UNANSWERED : MY_QNA_PAGE.ANSWERED}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleExpand(row.rowKey)}
                        className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
                        aria-expanded={isOpen}
                        aria-label={isOpen ? MY_QNA_PAGE.THREAD_TOGGLE_COLLAPSE : MY_QNA_PAGE.THREAD_TOGGLE_EXPAND}
                      >
                        <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {isOpen && thread && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-3 max-h-72 overflow-y-auto">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-200 whitespace-pre-wrap">{thread.question.content}</p>
                          <p className="text-xs text-gray-500">
                            {MY_QNA_PAGE.ROLE_YOU}
                            {' · '}
                            {thread.question.createdAt ? new Date(thread.question.createdAt).toLocaleString('ko-KR') : ''}
                          </p>
                        </div>
                        {thread.answers.length > 0 ? (
                          <div className="pl-4 space-y-2 border-l-2 border-cyan-500/30">
                            {thread.answers.map((answer) => (
                              <div key={answer.id}>
                                <p className="text-sm text-gray-200 whitespace-pre-wrap">{answer.content}</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {MY_QNA_PAGE.ROLE_ADMIN}
                                  {' · '}
                                  {answer.createdAt ? new Date(answer.createdAt).toLocaleString('ko-KR') : ''}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500">{MY_QNA_PAGE.UNANSWERED}</p>
                        )}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => navigate(`/lecture/${row.lectureId}#qna`)}
                      className="mt-3 text-xs text-cyan-400/90 hover:text-cyan-300 hover:underline"
                    >
                      {MY_QNA_PAGE.OPEN_IN_LECTURE}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
