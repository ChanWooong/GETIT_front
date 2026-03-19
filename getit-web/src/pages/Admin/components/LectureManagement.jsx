import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, FileText, X } from 'lucide-react';
import api from '../../../api/axios';
import { API, LECTURE_TRACK } from '../../../constants';
import { ADMIN_LECTURE_MESSAGES } from '../../../constants';
import LectureForm from './LectureForm';

const LectureManagement = () => {
  const [allLectures, setAllLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingLecture, setEditingLecture] = useState(null);
  // 과제(Task) 모달
  const [taskModalLectureId, setTaskModalLectureId] = useState(null);
  const [taskModalLectureTitle, setTaskModalLectureTitle] = useState('');
  const [taskData, setTaskData] = useState(null);
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskSaving, setTaskSaving] = useState(false);
  const [taskDeleting, setTaskDeleting] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', deadline: '' });

  const loadList = () => {
    setLoading(true);
    api
      .get(API.PATHS.LECTURES, { params: { size: 100 } })
      .then((res) => {
        const content = res.data?.content ?? [];
        if (content.length === 0) {
          setAllLectures([]);
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
        ).then((details) => {
          const sorted = [...details].sort((a, b) => {
            if (a.type !== b.type) return a.type === LECTURE_TRACK.SW ? -1 : 1;
            return (a.week ?? 0) - (b.week ?? 0);
          });
          setAllLectures(sorted);
        });
      })
      .catch(() => setAllLectures([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => loadList(), []);

  const handleSave = (id, payload) => {
    const body = {
      title: payload.title,
      description: payload.description,
      week: payload.week,
      type: payload.type,
      videoUrl: payload.videoUrl || undefined,
      resourceUrl: payload.resourceUrl || undefined,
    };
    if (id) {
      api.patch(`/api/admin/lecture/${id}`, body).then(() => {
        setShowForm(false);
        setEditingId(null);
        setEditingLecture(null);
        loadList();
        alert(ADMIN_LECTURE_MESSAGES.SAVE_SUCCESS);
      }).catch(() => alert('저장에 실패했습니다.'));
    } else {
      api.post('/api/admin/lecture', body).then(() => {
        setShowForm(false);
        loadList();
        alert(ADMIN_LECTURE_MESSAGES.SAVE_SUCCESS);
      }).catch(() => alert('등록에 실패했습니다.'));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setEditingLecture(null);
  };

  const handleEdit = (lec) => {
    setEditingId(lec.id);
    setEditingLecture(lec);
    setShowForm(true);
  };

  const handleDelete = (lec) => {
    if (!window.confirm(ADMIN_LECTURE_MESSAGES.DELETE_CONFIRM(lec.title))) return;
    api.delete(`/api/admin/lecture/${lec.id}`).then(() => {
      loadList();
      alert(ADMIN_LECTURE_MESSAGES.DELETE_SUCCESS);
    }).catch(() => alert('삭제에 실패했습니다.'));
  };

  const openTaskModal = (lec) => {
    setTaskModalLectureId(lec.id);
    setTaskModalLectureTitle(lec.title || '(제목 없음)');
    setTaskData(null);
    setTaskForm({ title: '', description: '', deadline: '' });
  };

  const closeTaskModal = () => {
    setTaskModalLectureId(null);
    setTaskModalLectureTitle('');
    setTaskData(null);
    setTaskLoading(false);
    setTaskSaving(false);
    setTaskDeleting(false);
  };

  useEffect(() => {
    if (taskModalLectureId == null) return;
    setTaskLoading(true);
    api
      .get(`/api/admin/lecture/${taskModalLectureId}/task`)
      .then((res) => {
        const t = res.data;
        setTaskData(t);
        const deadlineInput = t.deadline ? String(t.deadline).slice(0, 16) : '';
        setTaskForm({
          title: t.title ?? '',
          description: t.description ?? '',
          deadline: deadlineInput,
        });
      })
      .catch((err) => {
        if (err.response?.status === 404) setTaskData(null);
        else alert(ADMIN_LECTURE_MESSAGES.TASK_LOAD_ERROR);
      })
      .finally(() => setTaskLoading(false));
  }, [taskModalLectureId]);

  const handleTaskSave = () => {
    if (!taskModalLectureId || taskSaving) return;
    const title = (taskForm.title ?? '').trim();
    const description = (taskForm.description ?? '').trim();
    if (!title) {
      alert('과제 제목을 입력해주세요.');
      return;
    }
    if (!description) {
      alert('과제 설명을 입력해주세요.');
      return;
    }
    setTaskSaving(true);
    const payload = {
      title,
      description,
      deadline: (taskForm.deadline ?? '').trim() ? `${taskForm.deadline.trim()}:00` : null,
    };
    api
      .patch(`/api/admin/lecture/${taskModalLectureId}/task`, payload)
      .then((res) => {
        setTaskData(res.data);
        setTaskForm({
          title: res.data.title ?? '',
          description: res.data.description ?? '',
          deadline: res.data.deadline ? String(res.data.deadline).slice(0, 16) : '',
        });
        alert(ADMIN_LECTURE_MESSAGES.TASK_SAVE_SUCCESS);
      })
      .catch(() => alert(ADMIN_LECTURE_MESSAGES.TASK_SAVE_ERROR))
      .finally(() => setTaskSaving(false));
  };

  const handleTaskDelete = () => {
    if (!taskModalLectureId || taskDeleting) return;
    if (!window.confirm(ADMIN_LECTURE_MESSAGES.TASK_DELETE_CONFIRM)) return;
    setTaskDeleting(true);
    api
      .delete(`/api/admin/lecture/${taskModalLectureId}/task`)
      .then(() => {
        closeTaskModal();
        loadList();
        alert(ADMIN_LECTURE_MESSAGES.TASK_DELETE_SUCCESS);
      })
      .catch(() => alert(ADMIN_LECTURE_MESSAGES.TASK_DELETE_ERROR))
      .finally(() => setTaskDeleting(false));
  };

  if (showForm) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-6">
          {editingId ? ADMIN_LECTURE_MESSAGES.EDIT : ADMIN_LECTURE_MESSAGES.ADD}
        </h2>
        <LectureForm
          initialData={editingLecture}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{ADMIN_LECTURE_MESSAGES.LIST_TITLE}</h2>
        <button
          type="button"
          onClick={() => {
            setEditingId(null);
            setEditingLecture(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500"
        >
          <Plus size={18} /> {ADMIN_LECTURE_MESSAGES.ADD}
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 py-8">로딩 중...</p>
      ) : allLectures.length === 0 ? (
        <p className="text-gray-500 py-8">{ADMIN_LECTURE_MESSAGES.NO_LECTURES}</p>
      ) : (
        <div className="space-y-3">
          {allLectures.map((lec) => (
            <div
              key={lec.id}
              className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-gray-300">
                  {lec.type === LECTURE_TRACK.SW ? ADMIN_LECTURE_MESSAGES.TRACK_SW : ADMIN_LECTURE_MESSAGES.TRACK_STARTUP}
                </span>
                <span className="text-xs text-gray-500">주차 {lec.week}</span>
                <h3 className="font-bold text-white truncate">{lec.title || '(제목 없음)'}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openTaskModal(lec)}
                  className="p-2 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-white/10"
                  title={ADMIN_LECTURE_MESSAGES.TASK_MANAGE}
                >
                  <FileText size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => handleEdit(lec)}
                  className="p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/10"
                  title={ADMIN_LECTURE_MESSAGES.EDIT}
                >
                  <Pencil size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(lec)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10"
                  title={ADMIN_LECTURE_MESSAGES.DELETE}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {taskModalLectureId != null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={closeTaskModal}>
          <div
            className="bg-[#161229] border border-white/10 rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-bold text-white">
                {ADMIN_LECTURE_MESSAGES.TASK_MANAGE} · {taskModalLectureTitle}
              </h3>
              <button type="button" onClick={closeTaskModal} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {taskLoading ? (
                <p className="text-gray-500 py-6 text-center">{ADMIN_LECTURE_MESSAGES.TASK_LOADING}</p>
              ) : taskData == null ? (
                <p className="text-gray-500 py-6 text-center">{ADMIN_LECTURE_MESSAGES.TASK_NOT_FOUND}</p>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">{ADMIN_LECTURE_MESSAGES.TASK_TITLE}</label>
                    <input
                      type="text"
                      value={taskForm.title}
                      onChange={(e) => setTaskForm((f) => ({ ...f, title: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">{ADMIN_LECTURE_MESSAGES.TASK_DESCRIPTION}</label>
                    <textarea
                      value={taskForm.description}
                      onChange={(e) => setTaskForm((f) => ({ ...f, description: e.target.value }))}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">{ADMIN_LECTURE_MESSAGES.TASK_DEADLINE}</label>
                    <input
                      type="datetime-local"
                      value={taskForm.deadline}
                      onChange={(e) => setTaskForm((f) => ({ ...f, deadline: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleTaskSave}
                      disabled={taskSaving}
                      className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 disabled:opacity-50"
                    >
                      {taskSaving ? '저장 중...' : ADMIN_LECTURE_MESSAGES.SAVE}
                    </button>
                    <button
                      type="button"
                      onClick={handleTaskDelete}
                      disabled={taskDeleting}
                      className="px-4 py-2 rounded-xl bg-red-600/80 text-white font-bold hover:bg-red-500/80 disabled:opacity-50"
                    >
                      {taskDeleting ? '삭제 중...' : ADMIN_LECTURE_MESSAGES.DELETE}
                    </button>
                    <button type="button" onClick={closeTaskModal} className="px-4 py-2 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10">
                      {ADMIN_LECTURE_MESSAGES.CANCEL}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LectureManagement;
