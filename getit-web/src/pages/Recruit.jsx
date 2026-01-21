import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Send, 
  Lightbulb, // 아이디어 아이콘 추가
  Rocket,    // 창업 아이콘 추가
  Flag       // 완주 아이콘 추가
} from 'lucide-react';

const Recruit = () => {
  // 🔥 모집 기간이면 true, 아니면 false로 설정하세요!
  const isRecruiting = true; 

  // ✅ 변경된 부분: 모집 분야 -> 인재상 데이터
  const targetAudience = [
    {
      icon: <Lightbulb size={40} className="text-yellow-400" />,
      text: "아이디어를 SW 서비스로\n구체화하고 싶은 학생",
      sub: "아이디어는 있는데 어떻게 시작할지 모르겠다면 함께해요."
    },
    {
      icon: <Rocket size={40} className="text-red-400" />,
      text: "창업과 스타트업 생태계에\n관심이 있는 학생",
      sub: "개발 뿐 아니라 기획, 마케팅 등 다양한 경험을 쌓습니다."
    },
    {
      icon: <Flag size={40} className="text-green-400" />,
      text: "프로젝트를 처음부터 끝까지\n 경험하고픈 학생",
      sub: "기획부터 배포, 운영까지의 전체 사이클을 경험합니다."
    }
  ];

  // 모집 일정 데이터
  const schedule = [
    { step: "01", title: "서류 접수", date: "3.12 ~ 3.14" },
    { step: "02", title: "서류 발표", date: "3.15" },
    { step: "03", title: "면접 심사", date: "3.16 ~ 3.18" },
    { step: "04", title: "최종 합격", date: "3.19" }
  ];

  // FAQ 데이터
  const faqs = [
    { q: "코딩을 한 번도 안 해본 비전공자도 지원 가능한가요?", a: "네, 가능합니다! GET IT은 실력보다 열정을 중요하게 생각합니다. 신입 기수 교육 커리큘럼이 준비되어 있으니 걱정 마세요." },
    { q: "정기 모임은 언제인가요?", a: "2주에 한번 목요일 저녁 7시에 정기 세미나이 있으며, 시험 기간 2주는 휴식기를 갖습니다." },
    { q: "회비가 있나요?", a: "네, 동아리 운영 및 서버 비용 등을 위해 학기당 2만원의 회비가 있습니다." },
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
        <div className="text-center mb-20 animate-fade-in-up">
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

          {/* 지원하기 버튼 */}
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

        {/* 2. ✅ 변경된 섹션: 이런 분들을 찾습니다 (Who We Want) */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold mb-10 text-center text-white">
            이런 분들을 <span className="text-cyan-400">찾고 있어요!</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetAudience.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-cyan-500/30 transition-all group">
                {/* 아이콘 원형 배경 */}
                <div className="w-20 h-20 rounded-full bg-black/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                {/* 텍스트 */}
                <h3 className="text-xl font-bold mb-3 text-white whitespace-pre-line leading-snug">
                  {item.text}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
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
                    <br />
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