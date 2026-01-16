import React, { useState } from 'react';
import { Calendar, CheckCircle, ChevronDown, ChevronUp, UserPlus, Sparkles, Send } from 'lucide-react';

const Recruit = () => {
  // 🔥 모집 기간이면 true, 아니면 false로 설정하세요!
  const isRecruiting = true; 

  // 모집 분야 데이터
  const positions = [
    {
      title: "Backend Dev",
      desc: "Spring Boot, Node.js 등을 이용해 안정적인 API와 서버 구조를 설계합니다.",
      skills: ["Java/Spring", "MySQL", "AWS"]
    },
    {
      title: "Frontend Dev",
      desc: "React, Vue 등을 활용하여 사용자와 직접 소통하는 매력적인 인터페이스를 구현합니다.",
      skills: ["React", "TypeScript", "Tailwind"]
    },
    {
      title: "PM / Planner",
      desc: "시장의 문제를 발견하고, 이를 해결할 비즈니스 모델과 서비스 기획안을 도출합니다.",
      skills: ["Figma", "Communication", "Data Analysis"]
    }
  ];

  // 모집 일정 데이터
  const schedule = [
    { step: "01", title: "서류 접수", date: "3.2 ~ 3.15" },
    { step: "02", title: "서류 발표", date: "3.18" },
    { step: "03", title: "직무 면접", date: "3.20 ~ 3.22" },
    { step: "04", title: "최종 합격", date: "3.25" }
  ];

  // FAQ 데이터
  const faqs = [
    { q: "코딩을 한 번도 안 해본 비전공자도 지원 가능한가요?", a: "네, 가능합니다! GET IT은 실력보다 열정을 중요하게 생각합니다. 신입 기수 교육 커리큘럼이 준비되어 있으니 걱정 마세요." },
    { q: "정기 모임은 언제인가요?", a: "매주 목요일 저녁 7시에 정기 세션이 있으며, 시험 기간 2주는 휴식기를 갖습니다." },
    { q: "회비가 있나요?", a: "네, 동아리 운영 및 서버 비용 등을 위해 학기당 3만원의 회비가 있습니다." },
    { q: "재학생만 지원 가능한가요?", a: "기본적으로 재학생 및 휴학생을 대상으로 하지만, 졸업 유예생의 경우 면접 시 논의 가능합니다." }
  ];

  // FAQ 아코디언 상태 관리
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6">
      
      <div className="max-w-4xl mx-auto">
        
        {/* 1. 헤더 섹션 */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-sm font-bold tracking-wider text-cyan-400">
              RECRUITING 9TH MEMBERS
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6">
            JOIN THE <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              NEXT INNOVATION
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
            당신의 아이디어가 세상에 닿을 때까지.<br />
            GET IT과 함께 성장할 9기 멤버를 찾습니다.
          </p>

          {/* 지원하기 버튼 (상태에 따라 다르게 보임) */}
          {isRecruiting ? (
            <a 
              href="https://google.com" // 실제 구글폼 주소 넣기
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-cyan-500 text-[#110b29] px-8 py-4 rounded-full font-bold text-lg hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              9기 지원하러 가기 <Send size={20} />
            </a>
          ) : (
            <button disabled className="bg-gray-700 text-gray-400 px-8 py-4 rounded-full font-bold text-lg cursor-not-allowed">
              지금은 모집 기간이 아닙니다
            </button>
          )}
        </div>

        {/* 2. 모집 분야 (Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {positions.map((pos, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-white">{pos.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed h-16">{pos.desc}</p>
              <div className="flex flex-wrap gap-2">
                {pos.skills.map((skill, i) => (
                  <span key={i} className="text-xs bg-black/30 px-3 py-1 rounded-full text-cyan-400 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 3. 모집 일정 (Steps) */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
            <Calendar className="text-cyan-400" /> Recruitment Process
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {schedule.map((sch, idx) => (
              <div key={idx} className="relative bg-white/5 border border-white/10 p-6 rounded-xl text-center group hover:border-cyan-500/50 transition-colors">
                <span className="absolute top-4 left-4 text-5xl font-black text-white/5 group-hover:text-cyan-500/10 transition-colors">
                  {sch.step}
                </span>
                <div className="relative z-10 mt-4">
                  <h4 className="text-lg font-bold mb-2">{sch.title}</h4>
                  <p className="text-cyan-400 font-mono text-sm">{sch.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. FAQ (Accordion) */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-center">FAQ</h3>
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-lg pr-8">Q. {item.q}</span>
                  {openFaqIndex === index ? <ChevronUp className="text-cyan-400 shrink-0" /> : <ChevronDown className="text-gray-500 shrink-0" />}
                </button>
                
                {/* 열렸을 때만 보이는 답변 영역 */}
                {openFaqIndex === index && (
                  <div className="p-6 pt-0 text-gray-400 border-t border-white/5 bg-black/20 leading-relaxed">
                    A. {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Recruit;