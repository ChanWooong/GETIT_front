import React, { useState } from 'react';
import ApplyHeader from './components/ApplyHeader';
import QuestionField from './components/QuestionField';
import SubmitButton from './components/SubmitButton';

const Apply = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '' });

  const questions = [
    { id: 'q1', label: '1. GET IT 9기에 지원하게 된 동기는 무엇인가요?' },
    { id: 'q2', label: '2. 본인이 경험한 프로젝트 중 가장 기억에 남는 기술적 도전은?' },
    { id: 'q3', label: '3. 협업 과정에서 갈등이 생겼을 때 본인만의 해결 방법이 있나요?' },
    { id: 'q4', label: '4. 이번 기수 동안 본인이 반드시 이루고 싶은 목표가 있다면?' },
    { id: 'q5', label: '5. 마지막으로 운영진에게 하고 싶은 말이 있다면 자유롭게 적어주세요.' }
  ];

  const handleValueChange = (id, value) => setAnswers(prev => ({ ...prev, [id]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(answers).some(val => val.trim() === "")) return alert("모든 문항을 작성해주세요!");
    
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); alert("제출이 완료되었습니다.\n저희 GETIT에 지원해주셔서 진심으로 감사드리며,\n3월 15일에 있을 서류 발표를 기다려주세요!"); 
          window.location.href = '/';
    }, 1000);

  }
  return (
    <div className="min-h-screen w-full bg-[#110b29] py-20 px-6 text-white">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
        <ApplyHeader />
        <form onSubmit={handleSubmit} className="space-y-12">
          {questions.map((q) => (
            <QuestionField key={q.id} question={q} value={answers[q.id]} onChange={handleValueChange} />
          ))}
          <SubmitButton isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default Apply;