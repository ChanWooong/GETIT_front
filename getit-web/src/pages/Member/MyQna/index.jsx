import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
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

export default function MyQna() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);

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

  const trackLabel = (type) => (type === LECTURE_TRACK.STARTUP ? MY_QNA_PAGE.TRACK_STARTUP : MY_QNA_PAGE.TRACK_SW);

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
        <div className="max-w-3xl mx-auto space-y-3">
          {rows.map((row) => (
            <button
              key={row.rowKey}
              type="button"
              onClick={() => navigate(`/lecture/${row.lectureId}#qna`)}
              className="w-full text-left bg-[#110b29] border border-white/10 rounded-2xl p-4 hover:bg-white/5 transition-colors"
            >
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
              <p className="mt-2 text-xs text-cyan-400/90">{MY_QNA_PAGE.OPEN_IN_LECTURE}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
