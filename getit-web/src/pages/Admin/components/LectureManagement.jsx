import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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
    </div>
  );
};

export default LectureManagement;
