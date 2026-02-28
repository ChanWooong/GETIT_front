import React from 'react';
import { BookOpen, Rocket, MonitorPlay, BrainCircuit, Calendar, CheckCircle } from 'lucide-react';

const About = () => {
  // 📅 세미나 일정 데이터 (나중에 여기 내용만 바꾸면 리스트가 바뀝니다)
  const seminarSchedule = [
    { date: "3월 2주차", topic: "GETIT Chat", type: "Offline" },
    { date: "4월 2주차", topic: "웹 지식 세미나(가제)", type: "Offline" },
    { date: "4월 4주차", topic: "협업 툴 관련 세미나(가제)", type: "Offline" },
    { date: "5월 2주차", topic: "창업 관련 세미나(가제)", type: "Offline" },
    { date: "5월 4주차", topic: "1학기 마무리: 미니 해커톤", type: "Event" },
    { date: "6월 1주차", topic: "해커톤 발표", type: "Offline" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white overflow-hidden pt-32 pb-20 font-sans">
      
      {/* 배경 장식 */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[#110b29]"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="text-center mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-cyan-500/30 blur-[80px] rounded-full pointer-events-none"></div>
        {/* 1. 타이틀 섹션 (수정됨) */}
        <div className="text-center mb-24 animate-fade-in-up">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm border border-cyan-400/30 px-3 py-1 rounded-full">
            GET IT 9기
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-8 mb-8 leading-tight relative z-10">
          <span className="block text-gray-300 text-2xl md:text-4xl font-bold mb-2 tracking-tight opacity-80">
            우리는 코드를 통해
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
            세상의 문제를 해결합니다.
          </span>
          </h2>
          <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
              "기존의 GET IT, 완전히 새로운 패러다임으로 바뀝니다."
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              단순히 코드를 따라 치는 것은 멈추세요. <br className="hidden md:block" />
              우리는 <b className="text-white">AI 바이브 코딩(Vibe Coding)</b>을 중심으로 아이디어를 현실로 만듭니다.<br /><br />
              코딩 베이스가 없는 신입생도, 개발이 낯선 타과생도 괜찮습니다.<br />
              웹 구동 원리를 이해하고 AI를 이용하는 <b>'Maker'</b>로 성장시켜 드립니다.
            </p>
          </div>
        </div>

        {/* 2. 1년 운영 체제 소개 (New System) */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-2">
            <Rocket className="text-cyan-400" />
            Curriculum
          </h3>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto ">
            GET IT 9기는 1년동안 두 학기로 나누어 운영됩니다. <br />
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1학기 카드 */}
            <div className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                Semester 1
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                <BookOpen size={28} />
              </div>
              <h4 className="text-2xl font-bold mb-2">Education & Mini Hackathon</h4>
              <p className="text-blue-200/80 mb-6 font-medium">"기초를 다지고 아이디어를 구현해봅니다"</p>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-blue-400 mt-0.5 shrink-0" />
                  <span><b>2주 1회 세미나</b>를 통한 단계별 교육 진행</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-blue-400 mt-0.5 shrink-0" />
                  <span>온라인 영상 강의 제공 (반복 학습 가능)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-blue-400 mt-0.5 shrink-0" />
                  <span><b>간단한 해커톤</b>으로 간단한 프로젝트 완주 경험</span>
                </li>
              </ul>
            </div>

            {/* 2학기 카드 */}
            <div className="bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
               <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                Semester 2
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                <MonitorPlay size={28} />
              </div>
              <h4 className="text-2xl font-bold mb-2">Real Project & Deploy</h4>
              <p className="text-purple-200/80 mb-6 font-medium">"실제 사용자가 쓰는 서비스를 만듭니다"</p>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-purple-400 mt-0.5 shrink-0" />
                  <span>팀 빌딩 후 <b>본격적인 장기 프로젝트</b> 돌입</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-purple-400 mt-0.5 shrink-0" />
                  <span>실제 서버 배포(Deploy) 및 운영 경험</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-purple-400 mt-0.5 shrink-0" />
                  <span>최종 해커톤 대회를 통한 프로젝트 완주</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. AI Vibe Coding 소개 */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-24 flex flex-col md:flex-row items-center gap-12">
           <div className="w-full md:w-1/2">
              <div className="relative aspect-square md:aspect-video bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl">
                 {/* AI 뇌 구조 아이콘 느낌 */}
                 <BrainCircuit size={90} className="text-cyan-500 animate-pulse" />
                 <div className="absolute inset-0 bg-cyan-500/10 blur-3xl"></div>
              </div>
           </div>
           <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold">
                <span className="text-cyan-400">AI Vibe Coding</span>으로<br />
                장벽을 허뭅니다.
              </h3>
              <p className="text-gray-300 leading-relaxed ">
                아이디어는 있는데 코딩이 어려우신가요? <br />
                프로젝트를 어떻게 시작해야 할지 막막하신가요? <br />
                <b>GET IT에선</b> 누구나 쉽게 아이디어를 실현할 수 있습니다. <br /> 
              </p>
              <div className="space-y-4">
                 <div className="bg-black/30 p-4 rounded-xl border-l-4 border-cyan-500">
                    <h5 className="font-bold text-white mb-1">Target Audience</h5>
                    <p className="text-sm text-gray-400">코딩 경험이 적은 신입생, 타과생 환영</p>
                 </div>
                 <div className="bg-black/30 p-4 rounded-xl border-l-4 border-blue-500">
                    <h5 className="font-bold text-white mb-1">Core Value</h5>
                    <p className="text-sm text-gray-400">웹 구동 원리 이해 + AI 툴 활용 능력</p>
                 </div>
              </div>
           </div>
        </div>

        {/* 4. 세미나 일정 리스트 (사용자 입력 가능 구조) */}
        <div className="max-w-4xl mx-auto">
           <h3 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
             <Calendar className="text-cyan-400" />
             Seminar Schedule
           </h3>
           <p className="text-center text-gray-400 mb-10">
             1학기 교육 세미나는 약 2주 간격으로 진행됩니다.<br/>
             * 일정은 상황에 따라 변경될 수 있습니다.
           </p>

           <div className="space-y-4">
             {seminarSchedule.map((item, index) => (
               <div key={index} className="flex flex-col md:flex-row items-start md:items-center bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="min-w-[100px] font-bold text-cyan-400 mb-2 md:mb-0">
                    {item.date}
                  </div>
                  <div className="flex-1 font-medium text-white mb-2 md:mb-0">
                    {item.topic}
                  </div>
                  <div>
                    <span className={`text-xs px-3 py-1 rounded-full border ${
                      item.type === 'Offline' ? 'border-blue-500 text-blue-400' :
                      item.type === 'Online' ? 'border-green-500 text-green-400' :
                      'border-purple-500 text-purple-400 font-bold'
                    }`}>
                      {item.type}
                    </span>
                  </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default About;