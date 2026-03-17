import React, { useState, useEffect } from 'react';
import { PlayCircle, Code, Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import { API, LECTURE_TRACK, LECTURE_PAGE_MESSAGES, MESSAGES } from '../../../constants';

/**
 * 강의 목록: GET /api/lectures 후 상세 조회로 type/week 확보, 트랙별·주차순 정렬 (status 미사용)
 */
const Lecture = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(LECTURE_TRACK.SW);
  const [swTrack, setSwTrack] = useState([]);
  const [startupTrack, setStartupTrack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .get(API.PATHS.LECTURES, { params: { size: 100 } })
      .then((res) => {
        const content = res.data?.content ?? [];
        if (cancelled || content.length === 0) {
          setSwTrack([]);
          setStartupTrack([]);
          setLoading(false);
          return;
        }
        Promise.all(
          content.map((item) =>
            api.get(API.PATHS.LECTURE_DETAIL(item.lectureId)).then((r) => ({
              ...r.data,
              id: r.data.lectureId,
            }))
          )
        )
          .then((details) => {
            if (cancelled) return;
            const sw = details.filter((d) => d.type === LECTURE_TRACK.SW).sort((a, b) => (a.week ?? 0) - (b.week ?? 0));
            const startup = details
              .filter((d) => d.type === LECTURE_TRACK.STARTUP)
              .sort((a, b) => (a.week ?? 0) - (b.week ?? 0));
            setSwTrack(sw);
            setStartupTrack(startup);
          })
          .catch(() => {
            if (!cancelled) setError(MESSAGES.LECTURE_LIST_ERROR);
          })
          .finally(() => {
            if (!cancelled) setLoading(false);
          });
      })
      .catch(() => {
        if (!cancelled) {
          setError(MESSAGES.LECTURE_LIST_ERROR);
          setSwTrack([]);
          setStartupTrack([]);
        }
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const currentLectures = activeTab === LECTURE_TRACK.SW ? swTrack : startupTrack;

  const handleMoveToDetail = (lectureId) => {
    navigate(`/lecture/${lectureId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6 font-sans flex items-center justify-center">
        <p className="text-gray-400">{MESSAGES.LECTURE_LIST_LOADING}</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6 font-sans flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error}</p>
        <p className="text-gray-500 text-sm">{MESSAGES.LECTURE_LIST_RETRY}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase mb-2 block">Online Course</span>
          <h2 className="text-3xl md:text-5xl font-black italic">
            GET IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">ACADEMY</span>
          </h2>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab(LECTURE_TRACK.SW)}
            className={`flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 rounded-full font-bold transition-all ${
              activeTab === LECTURE_TRACK.SW
                ? 'bg-cyan-500 text-[#110b29] scale-105 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Code size={20} /> SW Track
          </button>
          <button
            onClick={() => setActiveTab(LECTURE_TRACK.STARTUP)}
            className={`flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 rounded-full font-bold transition-all ${
              activeTab === LECTURE_TRACK.STARTUP
                ? 'bg-purple-500 text-white scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Briefcase size={20} /> Startup Track
          </button>
        </div>

        <div className="space-y-4">
          {currentLectures.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              {LECTURE_PAGE_MESSAGES.NO_LECTURES_IN_TRACK}
            </div>
          ) : (
            currentLectures.map((lec) => (
              <div
                key={lec.id}
                onClick={() => handleMoveToDetail(lec.id)}
                className="relative flex items-center justify-between p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      activeTab === LECTURE_TRACK.SW ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'
                    }`}
                  >
                    <PlayCircle size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          activeTab === LECTURE_TRACK.SW ? 'bg-cyan-900/30 text-cyan-400' : 'bg-purple-900/30 text-purple-400'
                        }`}
                      >
                        {lec.week}주차
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold group-hover:text-white transition-colors">
                      {lec.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveToDetail(lec.id);
                  }}
                  className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                    activeTab === LECTURE_TRACK.SW
                      ? 'bg-cyan-500 text-[#110b29] hover:bg-cyan-400'
                      : 'bg-purple-500 text-white hover:bg-purple-400'
                  }`}
                >
                  강좌 보기 <ArrowRight size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Lecture;
