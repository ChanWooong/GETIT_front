import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAppStore } from '../../../store/appStore';
import { MESSAGES } from '../../../constants';
import applyQuestionsData from '../../../resources/Apply/ApplyQuestions.json';
import ApplyHeader from './components/ApplyHeader';
import QuestionField from './components/QuestionField';
import SubmitButton from './components/SubmitButton';
import questionData from '../../../resources/Apply/question.json';

const applyQuestions = applyQuestionsData;

const Apply = () => {
  const { generationText } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const initialAnswers = useMemo(
    () => Object.fromEntries(applyQuestions.map((q) => [q.id, ''])),
    []
  );
  const [answers, setAnswers] = useState(initialAnswers);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // q1만 generationText 삽입 (예: "1. GET IT 16기에 지원하게 된...")
  const questions = questionData.map((q) =>
    q.id === 'q1'
      ? { ...q, label: q.label.replace('GET IT', `GET IT ${generationText}`) }
      : q
  );

  useEffect(() => {
    const loadDraft = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      try {
        const response = await axios.get(`${API_BASE_URL}/api/applies/draft`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success && response.data.data) {
          const d = response.data.data;
          setAnswers({ q1: d.answer1, q2: d.answer2, q3: d.answer3, q4: d.answer4, q5: d.answer5 });
          alert("작성 중이던 임시 저장 데이터를 불러왔습니다.");
        }
      } catch (err) {
        console.log("임시 저장 데이터가 없거나 불러오기 실패", err);
      }
    };
    loadDraft();
  }, []);

  const handleSaveDraft = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert(MESSAGES.APPLY_LOGIN_REQUIRED);
      return;
    }
    try {
      setIsLoading(true);
      await axios.put(`${API_BASE_URL}/api/applies/draft`, {
        answer1: answers.q1, answer2: answers.q2, answer3: answers.q3,
        answer4: answers.q4, answer5: answers.q5, agree: true
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert("임시 저장이 완료되었습니다.");
    } catch (err) {
      alert("임시 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (Object.values(answers).some(val => val.trim() === "")) return alert("모든 문항을 작성해주세요!");
    if (!window.confirm("제출 후에는 수정이 불가능합니다. 제출하시겠습니까?")) return;

    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/applies`, {
        answer1: answers.q1, answer2: answers.q2, answer3: answers.q3,
        answer4: answers.q4, answer5: answers.q5, agree: true
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert("제출이 완료되었습니다! 3월 15일 발표를 기다려주세요.");
      window.location.href = '/';
    } catch (err) {
      alert(err.response?.data?.message || "제출 중 오류가 발생했습니다.");
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