import React, { useState, useEffect } from 'react';
import { LECTURE_TRACK, ADMIN_LECTURE_MESSAGES } from '../../../constants';

/** URL 형식 검증 (비어 있으면 통과, 아니면 http(s) URL) */
function isValidUrl(value) {
  const v = (value || '').trim();
  if (!v) return true;
  try {
    const u = new URL(v);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

/** API 요청용: title, description, week, type, videoUrl, resourceUrl */
const LectureForm = ({ initialData, onSave, onCancel }) => {
  const isEdit = Boolean(initialData?.id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [track, setTrack] = useState(LECTURE_TRACK.SW);
  const [week, setWeek] = useState(1);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title ?? '');
      setDescription(initialData.description ?? '');
      setVideoUrl(initialData.videoUrl ?? '');
      setResourceUrl(initialData.resourceUrl ?? '');
      setTrack(initialData.type ?? initialData.track ?? LECTURE_TRACK.SW);
      setWeek(Number(initialData.week) || 1);
    } else {
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setResourceUrl('');
      setTrack(LECTURE_TRACK.SW);
      setWeek(1);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const vUrl = videoUrl.trim();
    const rUrl = resourceUrl.trim();
    if (vUrl && !isValidUrl(vUrl)) {
      alert(ADMIN_LECTURE_MESSAGES.FORM_URL_INVALID);
      return;
    }
    if (rUrl && !isValidUrl(rUrl)) {
      alert(ADMIN_LECTURE_MESSAGES.FORM_URL_INVALID);
      return;
    }
    const payload = {
      title: title.trim(),
      description: description.trim(),
      week,
      type: track,
      videoUrl: vUrl || null,
      resourceUrl: rUrl || null,
    };
    onSave(isEdit ? initialData.id : null, payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">{ADMIN_LECTURE_MESSAGES.FORM_TITLE}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">{ADMIN_LECTURE_MESSAGES.FORM_DESCRIPTION}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">{ADMIN_LECTURE_MESSAGES.FORM_VIDEO_URL}</label>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">{ADMIN_LECTURE_MESSAGES.FORM_RESOURCE_URL}</label>
        <input
          type="url"
          value={resourceUrl}
          onChange={(e) => setResourceUrl(e.target.value)}
          placeholder={ADMIN_LECTURE_MESSAGES.FORM_RESOURCE_URL_PLACEHOLDER}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">{ADMIN_LECTURE_MESSAGES.FORM_TRACK}</label>
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value={LECTURE_TRACK.SW}>{ADMIN_LECTURE_MESSAGES.TRACK_SW}</option>
            <option value={LECTURE_TRACK.STARTUP}>{ADMIN_LECTURE_MESSAGES.TRACK_STARTUP}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">{ADMIN_LECTURE_MESSAGES.FORM_WEEK}</label>
          <input
            type="number"
            min={1}
            value={week}
            onChange={(e) => setWeek(Number(e.target.value) || 1)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/15">
          {ADMIN_LECTURE_MESSAGES.CANCEL}
        </button>
        <button type="submit" className="flex-1 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500">
          {ADMIN_LECTURE_MESSAGES.SAVE}
        </button>
      </div>
    </form>
  );
};

export default LectureForm;
