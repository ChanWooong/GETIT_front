import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, MessageCircle, Download, Check, X, Upload } from 'lucide-react';
import api from '../../../api/axios';
import { API, ADMIN_MEMBER_MESSAGES, LECTURE_TRACK, MESSAGES, LECTURE_PAGE_MESSAGES } from '../../../constants';
import { mergeAssignmentFiles } from '../../../utils/mergeAssignmentFiles';

export default function MyAssignments() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [downloadingFileId, setDownloadingFileId] = useState(null);
  const [editingAssignmentId, setEditingAssignmentId] = useState(null);
  const [draftGithubUrl, setDraftGithubUrl] = useState('');
  const [draftRemovedFileIds, setDraftRemovedFileIds] = useState([]);
  const [draftNewFiles, setDraftNewFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [lectureTitleById, setLectureTitleById] = useState({});
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [draftFileDragActive, setDraftFileDragActive] = useState(false);
  const draftFileInputRef = useRef(null);
  const skipDraftFileClickAfterDropRef = useRef(false);

  const loadAssignments = () => {
    setLoading(true);
    api.get('/api/assignments/me')
      .then((res) => {
        const list = res.data?.data ?? res.data;
        setItems(Array.isArray(list) ? list : []);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  useEffect(() => {
    const lectureIds = [...new Set(items.map((item) => item.lectureId).filter(Boolean))];
    if (lectureIds.length === 0) {
      setLectureTitleById({});
      return;
    }
    Promise.all(
      lectureIds.map((lectureId) =>
        api.get(API.PATHS.LECTURE_DETAIL(lectureId))
          .then((res) => [lectureId, res.data?.title || ''])
          .catch(() => [lectureId, ''])
      )
    ).then((pairs) => {
      const nextMap = {};
      pairs.forEach(([lectureId, title]) => {
        nextMap[lectureId] = title;
      });
      setLectureTitleById(nextMap);
    });
  }, [items]);

  const downloadFile = async (fileId, fileName) => {
    if (downloadingFileId != null) return;
    setDownloadingFileId(fileId);
    try {
      const res = await api.get(API.PATHS.ASSIGNMENT_FILE_DOWNLOAD(fileId), { responseType: 'blob' });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'download';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert(LECTURE_PAGE_MESSAGES.MATERIAL_DOWNLOAD_ERROR);
    } finally {
      setDownloadingFileId(null);
    }
  };

  const startEdit = (assignment) => {
    setEditingAssignmentId(assignment.assignmentId);
    setDraftGithubUrl(assignment.githubUrl ?? '');
    setDraftRemovedFileIds([]);
    setDraftNewFiles([]);
  };

  const cancelEdit = () => {
    setEditingAssignmentId(null);
    setDraftGithubUrl('');
    setDraftRemovedFileIds([]);
    setDraftNewFiles([]);
  };

  const toggleRemoveFile = (fileId) => {
    setDraftRemovedFileIds((prev) => (
      prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]
    ));
  };

  const appendDraftNewFiles = (incoming) => {
    if (!incoming.length) return;
    setDraftNewFiles((prev) => mergeAssignmentFiles(prev, incoming));
  };

  const handleDraftFilesChange = (e) => {
    appendDraftNewFiles(Array.from(e.target.files || []));
    e.target.value = '';
  };

  const handleDraftDropZoneClick = () => {
    if (skipDraftFileClickAfterDropRef.current) return;
    draftFileInputRef.current?.click();
  };

  const handleDraftDropZoneDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDraftDropZoneDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraftFileDragActive(true);
  };

  const handleDraftDropZoneDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDraftFileDragActive(false);
    }
  };

  const handleDraftDropZoneDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraftFileDragActive(false);
    skipDraftFileClickAfterDropRef.current = true;
    window.setTimeout(() => {
      skipDraftFileClickAfterDropRef.current = false;
    }, 400);
    appendDraftNewFiles(Array.from(e.dataTransfer?.files || []));
  };

  const saveEdit = async (assignment) => {
    if (saving) return;
    const githubUrl = (draftGithubUrl || '').trim() || null;
    const hasGithub = !!githubUrl;
    const existingFilesCount = Array.isArray(assignment.files) ? assignment.files.length : 0;
    const removedCount = draftRemovedFileIds.length;
    const remainingCount = Math.max(0, existingFilesCount - removedCount);
    const finalFileCount = remainingCount + draftNewFiles.length;
    if (finalFileCount < 1 && !hasGithub) {
      alert(LECTURE_PAGE_MESSAGES.ASSIGNMENT_EMPTY_ERROR);
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      draftNewFiles.forEach((f) => formData.append('files', f));
      const request = { githubUrl, deletedFiles: draftRemovedFileIds };
      formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }), 'request.json');
      await api.patch(`/api/assignments/${assignment.assignmentId}`, formData);
      alert(LECTURE_PAGE_MESSAGES.ASSIGNMENT_SAVE_SUCCESS);
      cancelEdit();
      loadAssignments();
    } catch {
      alert(LECTURE_PAGE_MESSAGES.ASSIGNMENT_SAVE_ERROR);
    } finally {
      setSaving(false);
    }
  };

  const grouped = useMemo(() => {
    const byTrack = { SW: {}, STARTUP: {} };
    for (const a of items) {
      const track = a.type === LECTURE_TRACK.STARTUP ? 'STARTUP' : 'SW';
      const week = Number(a.week) || 0;
      if (!byTrack[track][week]) byTrack[track][week] = [];
      byTrack[track][week].push(a);
    }
    return byTrack;
  }, [items]);

  const selectedAssignment = useMemo(
    () => items.find((item) => item.assignmentId === selectedAssignmentId) ?? null,
    [items, selectedAssignmentId]
  );

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0a061e] text-white pt-24 pb-20 px-6 font-sans flex items-center justify-center">
        <p className="text-gray-400">{MESSAGES.ASSIGNMENTS_LOADING ?? '과제 목록 로딩 중...'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0a061e] text-white pt-24 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto mb-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">내 과제</h2>
          <p className="text-sm text-gray-400">제출 내역과 관리자 코멘트를 확인할 수 있습니다.</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="max-w-5xl mx-auto bg-[#110b29] border border-white/10 p-6 rounded-2xl">
          <p className="text-gray-500">{MESSAGES.ASSIGNMENTS_EMPTY ?? '제출된 과제가 없습니다.'}</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {(['SW', 'STARTUP']).map((track) => {
            const weeks = Object.keys(grouped[track] || {}).map(Number).sort((a, b) => a - b);
            if (weeks.length === 0) return null;
            return (
              <div key={track} className="bg-[#110b29] border border-white/10 p-6 rounded-2xl">
                <h3 className="font-bold mb-4 text-gray-200">
                  {track === 'SW' ? 'SW' : '창업'} 트랙
                </h3>
                <div className="space-y-3">
                  {weeks.map((week) => (
                    <div key={week} className="border border-white/10 rounded-xl overflow-hidden">
                      <div className="px-4 py-2 bg-white/5 text-sm font-bold text-gray-200">
                        {week}주차 | {lectureTitleById[grouped[track][week]?.[0]?.lectureId] || '-'}
                      </div>
                      <div className="p-4 space-y-3">
                        {(grouped[track][week] || []).map((a) => {
                          const hasFeedback = Array.isArray(a.feedbacks) && a.feedbacks.length > 0;
                          return (
                          <div key={a.assignmentId} className="bg-black/20 border border-white/10 rounded-xl p-4">
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span
                                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                                      hasFeedback
                                        ? 'border-purple-400/40 bg-purple-500/15 text-purple-200'
                                        : 'border-white/10 bg-white/5 text-gray-500'
                                    }`}
                                  >
                                    <MessageCircle size={12} className="shrink-0" aria-hidden />
                                    {hasFeedback
                                      ? LECTURE_PAGE_MESSAGES.ASSIGNMENT_LIST_FEEDBACK_HAS
                                      : LECTURE_PAGE_MESSAGES.ASSIGNMENT_LIST_FEEDBACK_NONE}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-300">
                                  제출일: {a.createdAt ? new Date(a.createdAt).toLocaleString() : '-'}
                                </p>
                                {a.githubUrl && (
                                  <p className="text-cyan-300 text-sm break-all">
                                    {ADMIN_MEMBER_MESSAGES.GITHUB_LINK_LABEL}: {a.githubUrl}
                                  </p>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedAssignmentId(a.assignmentId);
                                  cancelEdit();
                                }}
                                className="px-3 py-1.5 rounded-lg bg-white/10 text-gray-200 text-xs font-bold hover:bg-white/20"
                              >
                                {ADMIN_MEMBER_MESSAGES.DETAIL_VIEW}
                              </button>
                            </div>
                          </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedAssignment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => {
            setSelectedAssignmentId(null);
            cancelEdit();
          }}
        >
          <div
            className="w-full max-w-3xl bg-[#161229] border border-white/10 rounded-2xl p-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">
                {selectedAssignment.week}주차 | {lectureTitleById[selectedAssignment.lectureId] || '-'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setSelectedAssignmentId(null);
                  cancelEdit();
                }}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-sm text-gray-300">
                  제출일: {selectedAssignment.createdAt ? new Date(selectedAssignment.createdAt).toLocaleString() : '-'}
                </p>
                <p className="text-sm text-cyan-300 break-all mt-1">
                  {ADMIN_MEMBER_MESSAGES.GITHUB_LINK_LABEL}: {selectedAssignment.githubUrl || '-'}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-2 flex items-center gap-1"><FileText size={14} /> 제출 파일</p>
                {Array.isArray(selectedAssignment.files) && selectedAssignment.files.length > 0 ? (
                  <div className="space-y-1">
                    {selectedAssignment.files.map((f) => (
                      <div key={f.fileId} className="flex items-center justify-between gap-2">
                        <p className="text-sm text-gray-200">{f.fileName}</p>
                        <button
                          type="button"
                          onClick={() => downloadFile(f.fileId, f.fileName)}
                          disabled={downloadingFileId === f.fileId}
                          className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:underline disabled:opacity-50"
                        >
                          <Download size={12} />
                          {MESSAGES.ASSIGNMENTS_DOWNLOAD ?? LECTURE_PAGE_MESSAGES.MATERIAL_DOWNLOAD}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">-</p>
                )}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-2 flex items-center gap-1"><MessageCircle size={14} /> {LECTURE_PAGE_MESSAGES.ASSIGNMENT_FEEDBACK_TITLE}</p>
                {Array.isArray(selectedAssignment.feedbacks) && selectedAssignment.feedbacks.length > 0 ? (
                  <div className="space-y-2">
                    {selectedAssignment.feedbacks.map((fb) => (
                      <div key={fb.feedbackId} className="bg-black/20 border border-white/10 rounded-lg p-2">
                        <p className="text-sm text-gray-200 whitespace-pre-wrap">{fb.content}</p>
                        <p className="text-[10px] text-gray-500 mt-1">
                          {fb.createdAt ? new Date(fb.createdAt).toLocaleString() : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">{LECTURE_PAGE_MESSAGES.ASSIGNMENT_FEEDBACK_EMPTY}</p>
                )}
              </div>

              {editingAssignmentId !== selectedAssignment.assignmentId ? (
                <button
                  type="button"
                  onClick={() => startEdit(selectedAssignment)}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 text-xs font-bold hover:bg-purple-600/30"
                >
                  {LECTURE_PAGE_MESSAGES.ASSIGNMENT_UPDATE}
                </button>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">{LECTURE_PAGE_MESSAGES.ASSIGNMENT_GITHUB_LABEL}</label>
                    <input
                      type="url"
                      value={draftGithubUrl}
                      onChange={(e) => setDraftGithubUrl(e.target.value)}
                      placeholder={LECTURE_PAGE_MESSAGES.ASSIGNMENT_GITHUB_PLACEHOLDER}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="my-assignments-draft-file-input" className="block text-xs text-gray-400 mb-1">
                      {LECTURE_PAGE_MESSAGES.ASSIGNMENT_NEW_FILES_LABEL}
                    </label>
                    <input
                      id="my-assignments-draft-file-input"
                      ref={draftFileInputRef}
                      type="file"
                      multiple
                      onChange={handleDraftFilesChange}
                      className="sr-only"
                      tabIndex={-1}
                    />
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={LECTURE_PAGE_MESSAGES.ASSIGNMENT_FILE_DROP_ZONE_ARIA}
                      onClick={handleDraftDropZoneClick}
                      onKeyDown={(ev) => {
                        if (ev.key === 'Enter' || ev.key === ' ') {
                          ev.preventDefault();
                          handleDraftDropZoneClick();
                        }
                      }}
                      onDragOver={handleDraftDropZoneDragOver}
                      onDragEnter={handleDraftDropZoneDragEnter}
                      onDragLeave={handleDraftDropZoneDragLeave}
                      onDrop={handleDraftDropZoneDrop}
                      className={`mt-1 border-2 border-dashed rounded-xl p-4 text-center transition-colors min-h-[88px] flex items-center justify-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 ${
                        draftFileDragActive
                          ? 'border-cyan-400/70 bg-cyan-500/15'
                          : 'border-white/10 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1.5 text-gray-400 pointer-events-none">
                        <Upload size={20} />
                        <span className="text-xs">
                          {draftNewFiles.length === 0
                            ? LECTURE_PAGE_MESSAGES.ASSIGNMENT_DROP_OR_CLICK
                            : LECTURE_PAGE_MESSAGES.ASSIGNMENT_ADD_MORE_FILES_PROMPT}
                        </span>
                      </div>
                    </div>
                    {draftNewFiles.length > 0 && (
                      <ul className="mt-2 max-h-28 overflow-y-auto space-y-1 border border-white/10 rounded-lg p-2 bg-black/20">
                        {draftNewFiles.map((f, idx) => (
                          <li
                            key={`${f.name}-${f.size}-${f.lastModified}-${idx}`}
                            className="flex items-center justify-between gap-2 text-xs text-cyan-400"
                          >
                            <span className="truncate flex-1 text-left">{f.name}</span>
                            <button
                              type="button"
                              onClick={() => setDraftNewFiles((prev) => prev.filter((_, i) => i !== idx))}
                              className="shrink-0 p-0.5 text-gray-500 hover:text-white rounded"
                              aria-label={`${f.name} ${LECTURE_PAGE_MESSAGES.ASSIGNMENT_REMOVE_SELECTED_FILE}`}
                            >
                              <X size={12} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {draftNewFiles.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setDraftNewFiles([])}
                        className="mt-1 text-[11px] text-gray-500 hover:text-white"
                      >
                        {LECTURE_PAGE_MESSAGES.ASSIGNMENT_CLEAR_SELECTED_FILES}
                      </button>
                    )}
                    <p className="text-[10px] text-gray-500 mt-1 leading-snug">
                      {LECTURE_PAGE_MESSAGES.ASSIGNMENT_FILES_CUMULATIVE_HINT}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">{LECTURE_PAGE_MESSAGES.ASSIGNMENT_KEPT_FILES_LABEL}</p>
                    {Array.isArray(selectedAssignment.files) && selectedAssignment.files.length > 0 ? (
                      <div className="space-y-1">
                        {selectedAssignment.files.map((f) => {
                          const removed = draftRemovedFileIds.includes(f.fileId);
                          return (
                            <div key={f.fileId} className="flex items-center justify-between gap-2">
                              <span className={`text-xs ${removed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{f.fileName}</span>
                              <button
                                type="button"
                                onClick={() => toggleRemoveFile(f.fileId)}
                                className={`text-[11px] ${removed ? 'text-cyan-400' : 'text-red-300'} hover:underline`}
                              >
                                {removed ? LECTURE_PAGE_MESSAGES.ASSIGNMENT_UNDO_REMOVE : LECTURE_PAGE_MESSAGES.ASSIGNMENT_REMOVE_FILE}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">-</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => saveEdit(selectedAssignment)}
                      disabled={saving}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600/20 text-cyan-300 text-xs font-bold hover:bg-cyan-600/30 disabled:opacity-50"
                    >
                      {saving ? LECTURE_PAGE_MESSAGES.ASSIGNMENT_SAVING : <span className="inline-flex items-center gap-1"><Check size={12} />{LECTURE_PAGE_MESSAGES.ASSIGNMENT_UPDATE}</span>}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      disabled={saving}
                      className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 text-xs hover:bg-white/10 disabled:opacity-50 inline-flex items-center gap-1"
                    >
                      <X size={12} /> {LECTURE_PAGE_MESSAGES.ASSIGNMENT_CANCEL}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

