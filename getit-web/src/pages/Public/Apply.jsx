import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAppStore } from '../../hooks/appStore';
import { MESSAGES, APPLY_ANNOUNCE_DATE } from '../../constants';
import { answersToPayload, payloadToAnswers } from '../../utils/applyForm';
import ApplyHeader from '../../components/apply/ApplyHeader';
import QuestionField from '../../components/apply/QuestionField';
import SubmitButton from '../../components/apply/SubmitButton';
import questionData from '../../resources/Apply/question.json';

const Apply = () => {
  const navigate = useNavigate();
  const { generationText } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const initialAnswers = useMemo(
    () => Object.fromEntries(questionData.map((q) => [q.id, ''])),
    []
  );
  const [answers, setAnswers] = useState(initialAnswers);

  const questions = questionData.map((q) =>
    q.id === 'q1'
      ? { ...q, label: q.label.replace('GET IT', `GET IT ${generationText}`) }
      : q
  );

useEffect(() => {
  const checkAndLoad = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    try {
      const recruitResponse = await api.get('/api/recruitment/status');
      if (!recruitResponse.data.isOpen) {
        alert('현재 모집 기간이 아닙니다.');
        navigate('/', { replace: true });
        return;
      }
      const meResponse = await api.get('/api/applies/me');
      if (meResponse.data.submitted) {
        alert("이미 지원서를 제출하셨습니다.");
        navigate('/', { replace: true });
        return;
      }

      const draftResponse = await api.get('/api/applies/draft');
      if (draftResponse.data.success && draftResponse.data.data) {
        setAnswers(payloadToAnswers(draftResponse.data.data));
        alert(MESSAGES.APPLY_DRAFT_LOADED);
      }
    } catch (err) {
      console.log('임시저장 불러오기 실패', err);
    }
  };
  checkAndLoad();
}, []);

  const handleSaveDraft = async () => {
    if (!localStorage.getItem('accessToken')) {
      alert(MESSAGES.APPLY_LOGIN_REQUIRED);
      return;
    }
    try {
      setIsLoading(true);
      await api.put('/api/applies/draft', answersToPayload(answers));
      alert(MESSAGES.APPLY_DRAFT_SAVED);
    } catch (err) {
      alert(MESSAGES.APPLY_DRAFT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isIncomplete = Object.entries(answers).some(([id, val]) => {
      const s = (val ?? '').toString().trim();
      return id === 'q8' ? s !== 'agreed' : s === '';
    });
    if (isIncomplete) {
      return alert(MESSAGES.APPLY_ALL_REQUIRED);
    }
    if (!window.confirm(MESSAGES.APPLY_SUBMIT_CONFIRM)) return;

    setIsLoading(true);
    try {
      await api.post('/api/applies', answersToPayload(answers));
      alert(`${MESSAGES.APPLY_SUCCESS.split('\n')[0]} ${APPLY_ANNOUNCE_DATE} 발표를 기다려주세요.`);
      navigate('/', { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || MESSAGES.APPLY_SUBMIT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange = (id, value) => setAnswers(prev => ({ ...prev, [id]: value }));

  return (
    <div className="min-h-screen w-full bg-[#110b29] py-20 px-6 text-white">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
        <ApplyHeader />
        <form onSubmit={handleSubmit} className="space-y-12">
          {questions.map((q) => (
            <QuestionField key={q.id} question={q} value={answers[q.id]} onChange={handleValueChange} />
          ))}
          <SubmitButton isLoading={isLoading} onSaveDraft={handleSaveDraft} />
        </form>
      </div>
    </div>
  );
};

export default Apply;
