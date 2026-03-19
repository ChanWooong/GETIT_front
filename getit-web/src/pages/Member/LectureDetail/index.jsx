import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, PlayCircle, AlertTriangle, FileText,
  Upload, Check, X, Download, MessageCircle, Send, Trash2,
} from 'lucide-react';
import api from '../../../api/axios';
import { useAuth } from '../../../hooks/useAuth';
import PdfViewer from '../../../components/PdfViewer';
import { API, MESSAGES, LECTURE_PAGE_MESSAGES } from '../../../constants';

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

/** 유튜브 URL에서 videoId 추출 */
function getYoutubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;
  const u = url.trim();
  const watchMatch = u.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = u.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const embedMatch = u.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  return null;
}

const LectureDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isMember } = useAuth();
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('IDLE');
  const [qnaInput, setQnaInput] = useState('');
  const [qnaMessages, setQnaMessages] = useState([]);
  const [qnaSubmitting, setQnaSubmitting] = useState(false);
  const [qnaDeletingId, setQnaDeletingId] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    api
      .get(API.PATHS.LECTURE_DETAIL(id))
      .then((res) => setLecture({ ...res.data, id: res.data.lectureId }))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  // Q&A 조회/등록은 MEMBER 전용 API이므로 관리자일 때는 호출하지 않음 (403 방지)
  useEffect(() => {
    if (!lecture?.id || !isMember) return;
    api.get(`/api/lecture/${lecture.id}/qna/me`)
      .then((res) => setQnaMessages(Array.isArray(res.data) ? res.data : []))
      .catch(() => setQnaMessages([]));
  }, [lecture?.id, isMember]);

  const videoId = lecture?.videoUrl ? getYoutubeVideoId(lecture.videoUrl) : null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('IDLE');
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !lecture) return;
    setUploadStatus('UPLOADING');
    const formData = new FormData();
    formData.append('files', selectedFile);
    const githubUrlTrimmed = (githubUrl || '').trim() || null;
    const requestBlob = new Blob(
      [JSON.stringify({
        lectureId: lecture.id,
        comment: '',
        githubUrl: githubUrlTrimmed,
      })],
      { type: 'application/json' }
    );
    formData.append('request', requestBlob, 'request.json');
    api
      .post('/api/assignments', formData)
      .then(() => setUploadStatus('SUCCESS'))
      .catch(() => {
        setUploadStatus('IDLE');
        alert('과제 제출에 실패했습니다.');
      });
  };

  const handleSendQuestion = () => {
    if (!isMember) return;
    const text = (qnaInput || '').trim();
    if (!text || !lecture?.id || qnaSubmitting) return;
    setQnaSubmitting(true);
    api
      .post(`/api/lecture/${lecture.id}/qna`, { content: text })
      .then(() => {
        setQnaInput('');
        return api.get(`/api/lecture/${lecture.id}/qna/me`);
      })
      .then((res) => setQnaMessages(Array.isArray(res.data) ? res.data : []))
      .catch(() => alert('질문 등록에 실패했습니다.'))
      .finally(() => setQnaSubmitting(false));
  };

  const handleDeleteQuestion = (qnaId) => {
    if (!isMember || !lecture?.id || qnaDeletingId) return;
    if (!window.confirm(LECTURE_PAGE_MESSAGES.QNA_DELETE_CONFIRM)) return;
    setQnaDeletingId(qnaId);
    api
      .delete(`/api/lecture/${lecture.id}/qna/${qnaId}`)
      .then(() => api.get(`/api/lecture/${lecture.id}/qna/me`))
      .then((res) => setQnaMessages(Array.isArray(res.data) ? res.data : []))
      .catch(() => alert(LECTURE_PAGE_MESSAGES.QNA_DELETE_ERROR))
      .finally(() => setQnaDeletingId(null));
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0a061e] text-white pt-24 pb-20 px-6 font-sans flex items-center justify-center">
        <p className="text-gray-400">{MESSAGES.LECTURE_LIST_LOADING}</p>
      </div>
    );
  }
  if (error || !lecture) {
    return (
      <div className="min-h-screen w-full bg-[#0a061e] text-white pt-24 pb-20 px-6 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10">
            <ArrowLeft size={24} />
          </button>
          <p className="text-gray-400">{LECTURE_PAGE_MESSAGES.LECTURE_NOT_FOUND}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0a061e] text-white pt-24 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto mb-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <span className="text-cyan-400 text-xs font-bold tracking-wider">{lecture.week}주차</span>
          <h2 className="text-xl md:text-2xl font-bold">{lecture.title}</h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[360px]">
            {!videoId && lecture.resourceUrl ? (
              <div className="absolute inset-0 overflow-auto">
                <PdfViewer
                  file={lecture.resourceUrl}
                  className="w-full min-h-full"
                  downloadLabel={LECTURE_PAGE_MESSAGES.MATERIAL_VIEW_LINK}
                />
              </div>
            ) : videoId ? (
              <>
                <iframe
                  title="강의 영상"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => setVideoLoadError(true)}
                />
                {videoLoadError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 p-6 text-center">
                    <AlertTriangle size={48} className="text-red-400 mb-4" />
                    <p className="text-white font-bold text-lg">{MESSAGES.LECTURE_VIDEO_LOAD_ERROR}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <AlertTriangle size={48} className="text-gray-500 mb-4" />
                <p className="text-gray-400">{MESSAGES.LECTURE_VIDEO_LOAD_ERROR}</p>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{lecture.title}</h1>
            {lecture.description && (
              <div className="bg-[#161229] p-6 rounded-xl border border-white/5">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <PlayCircle size={18} className="text-cyan-400" /> 학습 가이드
                </h3>
                <p className="text-gray-400 text-sm whitespace-pre-wrap">{lecture.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#110b29] border border-white/10 p-6 rounded-2xl">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-200">
              <Download size={18} className="text-cyan-400" /> 강의 자료
            </h3>
            {lecture.resourceUrl ? (
              <a
                href={lecture.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <Download size={16} />
                {LECTURE_PAGE_MESSAGES.MATERIAL_VIEW_LINK}
              </a>
            ) : (
              <p className="text-gray-500 text-sm">{LECTURE_PAGE_MESSAGES.MATERIAL_PREPARING}</p>
            )}
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#110b29] border border-cyan-500/30 p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
            <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-200">
              <FileText size={18} className="text-purple-400" /> 과제 제출
            </h3>
            <div className="space-y-4">
              <div className="relative border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:bg-white/5 transition-colors group">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {!selectedFile ? (
                  <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-gray-200">
                    <Upload size={24} />
                    <span className="text-sm">파일을 드래그하거나 클릭</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-cyan-400 z-20 relative">
                    <FileText size={20} />
                    <span className="text-sm truncate max-w-[150px]">{selectedFile.name}</span>
                    <button type="button" onClick={(e) => { e.preventDefault(); setSelectedFile(null); }} className="text-gray-500 hover:text-white">
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  {LECTURE_PAGE_MESSAGES.ASSIGNMENT_GITHUB_LABEL}
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder={LECTURE_PAGE_MESSAGES.ASSIGNMENT_GITHUB_PLACEHOLDER}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <button
                type="button"
                onClick={handleUpload}
                disabled={!selectedFile || uploadStatus === 'SUCCESS'}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                  ${uploadStatus === 'SUCCESS' ? 'bg-green-600 text-white' : !selectedFile ? 'bg-gray-700 text-gray-400' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}
              >
                {uploadStatus === 'UPLOADING' && '업로드 중...'}
                {uploadStatus === 'SUCCESS' && <><Check size={18} /> 제출 완료</>}
                {uploadStatus === 'IDLE' && '과제 제출하기'}
              </button>
            </div>
          </div>



          <div className="bg-[#110b29] border border-white/10 p-6 rounded-2xl h-[320px] flex flex-col">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-200">
              <MessageCircle size={18} className="text-green-400" /> Q&A
            </h3>
            <div className="flex-1 overflow-y-auto bg-black/20 rounded-xl mb-3 p-3 space-y-3 min-h-0">
              {!isMember ? (
                <p className="text-gray-500 text-sm">Q&A는 멤버만 이용할 수 있습니다. 관리자는 부원 학습 관리 &gt; Q&A 확인에서 답변을 등록할 수 있습니다.</p>
              ) : qnaMessages.length === 0 ? (
                <p className="text-gray-500 text-sm">{LECTURE_PAGE_MESSAGES.QNA_NO_MESSAGES}</p>
              ) : (
                groupQnaByQuestion(qnaMessages).map((group) => (
                  <div key={group.question.id} className="space-y-2">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-200 whitespace-pre-wrap">{group.question.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            나 · {group.question.createdAt ? new Date(group.question.createdAt).toLocaleString() : ''}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteQuestion(group.question.id)}
                          disabled={qnaDeletingId === group.question.id}
                          className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 disabled:opacity-50"
                          title={LECTURE_PAGE_MESSAGES.QNA_DELETE}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    {group.answers.length > 0 && (
                      <div className="pl-4 space-y-1 border-l-2 border-cyan-500/30">
                        {group.answers.map((answer) => (
                          <div key={answer.id}>
                            <p className="text-sm text-gray-200 whitespace-pre-wrap">{answer.content}</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              관리자 · {answer.createdAt ? new Date(answer.createdAt).toLocaleString() : ''}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            {isMember && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={qnaInput}
                  onChange={(e) => setQnaInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') return;
                    e.preventDefault();
                    e.stopPropagation();
                    handleSendQuestion();
                  }}
                  placeholder={LECTURE_PAGE_MESSAGES.QNA_PLACEHOLDER}
                  className="flex-1 bg-black/30 border border-white/10 rounded-lg pl-3 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={handleSendQuestion}
                  disabled={!qnaInput?.trim() || qnaSubmitting}
                  className="p-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={LECTURE_PAGE_MESSAGES.QNA_SEND}
                >
                  <Send size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureDetail;
