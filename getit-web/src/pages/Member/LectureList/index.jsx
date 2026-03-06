import React, { useState, useEffect } from 'react';
import { PlayCircle, Lock, Clock, CheckCircle, Code, Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MESSAGES, LECTURE_STATUS, LECTURE_TRACK, API } from '../../../constants';

/**
 * 백엔드 강의 한 건 타입 (예상)
 * { id, week, title, time, status, videoUrl? }
 * - status: LECTURE_STATUS.DONE | PROGRESS | LOCKED
 * - videoUrl: 유튜브 URL 또는 videoId (LectureDetail에서 사용)
 */
const Lecture = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(LECTURE_TRACK.SW);
  const [swLectures, setSwLectures] = useState([]);
  const [startupLectures, setStartupLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${API.BASE_URL}${API.PATHS.LECTURES}`;
    setLoading(true);
    setError(null);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText || '강의 목록을 불러오지 못했습니다.');
        return res.json();
      })
      .then((data) => {
        setSwLectures(Array.isArray(data?.swTrack) ? data.swTrack : []);
        setStartupLectures(Array.isArray(data?.startupTrack) ? data.startupTrack : []);
      })
      .catch((err) => {
        setError(err.message || '강의 목록을 불러오지 못했습니다.');
        setSwLectures([]);
        setStartupLectures([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const currentLectures = activeTab === LECTURE_TRACK.SW ? swLectures : startupLectures;

  const handleMoveToDetail = (id, status) => {
    if (status !== LECTURE_STATUS.LOCKED) {
      navigate(`/lecture/${id}`);
    } else {
      alert(MESSAGES.LECTURE_LOCKED);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6 font-sans flex items-center justify-center">
        <p className="text-gray-400">강의 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6 font-sans flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error}</p>
        <p className="text-gray-500 text-sm">잠시 후 다시 시도해 주세요.</p>
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
              해당 트랙에 등록된 강의가 없습니다.
            </div>
          ) : (
            currentLectures.map((lec) => (
              <div
                key={lec.id}
                onClick={() => handleMoveToDetail(lec.id, lec.status)}
                className={`relative flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 group
                  ${lec.status === LECTURE_STATUS.LOCKED
                    ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50 cursor-pointer'
                  }`}
              >
                <div className="flex items-center gap-6">
                  <div>
                    {lec.status === LECTURE_STATUS.DONE ? (
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                        <CheckCircle size={24} />
                      </div>
                    ) : lec.status === LECTURE_STATUS.LOCKED ? (
                      <div className="w-12 h-12 bg-gray-700/30 rounded-full flex items-center justify-center text-gray-500">
                        <Lock size={24} />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          activeTab === LECTURE_TRACK.SW ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'
                        }`}
                      >
                        <PlayCircle size={24} />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          lec.status === LECTURE_STATUS.DONE
                            ? 'bg-green-900/30 text-green-400'
                            : lec.status === LECTURE_STATUS.LOCKED
                              ? 'bg-gray-700 text-gray-400'
                              : activeTab === LECTURE_TRACK.SW
                                ? 'bg-cyan-900/30 text-cyan-400'
                                : 'bg-purple-900/30 text-purple-400'
                        }`}
                      >
                        {lec.week}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} /> {lec.time}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold group-hover:text-white transition-colors">
                      {lec.title}
                    </h3>
                  </div>
                </div>
                {lec.status !== LECTURE_STATUS.LOCKED && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveToDetail(lec.id, lec.status);
                    }}
                    className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                      activeTab === LECTURE_TRACK.SW
                        ? 'bg-cyan-500 text-[#110b29] hover:bg-cyan-400'
                        : 'bg-purple-500 text-white hover:bg-purple-400'
                    }`}
                  >
                    강좌 보기 <ArrowRight size={16} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Lecture;
