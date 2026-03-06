import React, { useState, useEffect } from 'react';
import { Settings, Calendar, ArrowLeft } from 'lucide-react';
import api from '../../../api/axios';
import { kstToServerFormat, serverStoredToKstDateTimeLocal } from '../../../utils/dateUtils';

const SettingsManagement = ({ onBack }) => {
  const [filter, setFilter] = useState('RECRUIT');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get('/api/recruitment/status');
        const data = response.data;
        setIsOpen(data.isOpen ?? false);
        if (data.startAt) setStartAt(serverStoredToKstDateTimeLocal(data.startAt));
        if (data.endAt) setEndAt(serverStoredToKstDateTimeLocal(data.endAt));
      } catch (err) {
        console.error('모집 상태 조회 실패', err);
      }
    };
    fetchStatus();
  }, []);

  const handleSave = async () => {
    if (!startAt || !endAt) return alert('시작/종료 시간을 모두 입력해주세요.');
    const startKst = kstToServerFormat(startAt);
    const endKst = kstToServerFormat(endAt);
    if (!startKst || !endKst) return alert('시작/종료 시간 형식을 확인해주세요.');
    if (startKst >= endKst) return alert('종료 시간이 시작 시간보다 늦어야 합니다.');

    try {
      setLoading(true);
      await api.patch('/api/recruitment/status', {
        startAt: startKst,
        endAt: endKst,
      });
      alert('모집 기간이 설정되었습니다.');
      const response = await api.get('/api/recruitment/status');
      setIsOpen(response.data.isOpen);
    } catch (err) {
      alert('설정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const filters = [{ id: 'RECRUIT', label: '모집 설정' }];

  return (
    <div className="animate-in fade-in duration-500 text-left">
      {/* ✅ 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white text-sm font-bold transition-colors"
      >
        <ArrowLeft size={16} /> 돌아가기
      </button>

      <h3 className="text-xl font-bold flex items-center gap-2 text-white mb-8">
        <Settings className="text-cyan-400" /> 설정
      </h3>

      <div className="flex gap-3 mb-8">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${
              filter === f.id ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filter === 'RECRUIT' && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-cyan-400" size={20} />
            <h4 className="text-white font-bold text-lg">모집 기간 설정</h4>
            <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${
              isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {isOpen ? '모집 중' : '모집 마감'}
            </span>
          </div>

          <p className="text-gray-500 text-sm mb-4">
            모집 기간은 <strong className="text-gray-400">한국 시간(KST)</strong> 기준입니다. 서버에서 KST에서 10시간을 뺀 값으로 저장합니다.
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">모집 시작 (KST)</label>
              <input
                type="datetime-local"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">모집 종료 (KST)</label>
              <input
                type="datetime-local"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-all disabled:opacity-50"
            >
              {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsManagement;