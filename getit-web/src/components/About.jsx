import React from 'react';
import { Target, Zap, Users, Code, Rocket, Coffee } from 'lucide-react';

const About = () => {
  // 활동 카드 데이터 (나중에 여기서 내용만 바꾸면 됩니다)
  const activities = [
    {
      icon: <Code size={32} />,
      title: "Dev & Study",
      desc: "React, Spring, AI 등 최신 기술 스택을 스터디하고 실제 서비스에 적용합니다.",
      color: "bg-blue-500"
    },
    {
      icon: <Rocket size={32} />,
      title: "Hackathon",
      desc: "무박 2일간의 치열한 몰입. 아이디어를 실제 프로토타입으로 구현하는 해커톤을 개최합니다.",
      color: "bg-purple-500"
    },
    {
      icon: <Users size={32} />,
      title: "Networking",
      desc: "현업 선배와의 멘토링, 타 대학과의 연합 교류를 통해 넓은 인프라를 구축합니다.",
      color: "bg-cyan-500"
    }
  ];

  return (
    <section id="about" className="relative w-full py-20 bg-[#110b29] text-white overflow-hidden">
      
      {/* 배경 은은한 빛 효과 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. 타이틀 섹션 */}
        <div className="text-center mb-20">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm animate-pulse">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">
            우리는 코드를 통해<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              세상의 문제를 해결합니다.
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            GET IT은 단순한 코딩 동아리가 아닙니다.<br className="hidden md:block"/>
            기획자, 디자이너, 개발자가 모여 하나의 스타트업 팀처럼 움직이는
            <span className="text-white font-bold"> '실전형 창업 커뮤니티'</span>입니다.
          </p>
        </div>

        {/* 2. 핵심 가치 카드 (Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {activities.map((item, index) => (
            <div 
              key={index} 
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:-translate-y-2 transition-all duration-300 hover:bg-white/10"
            >
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-white shadow-lg ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-200">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 3. 팀 & 문화 섹션 (좌우 배치) */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* 이미지 영역 (임시 그라데이션 박스) */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden aspect-video group">
                {/* 실제 이미지가 들어갈 자리 */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                   <Zap size={64} className="text-gray-600" />
                   <span className="absolute mt-24 text-gray-500 text-sm">활동 사진이 들어갈 영역</span>
                </div>
                {/* 장식용 테두리 */}
                <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-2xl"></div>
            </div>
          </div>

          {/* 텍스트 영역 */}
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold">
              실패를 두려워하지 않는<br />
              <span className="text-blue-400">도전적인 문화</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400 mt-1"><Target size={20} /></div>
                <div>
                  <h4 className="font-bold text-lg">Goal-Oriented</h4>
                  <p className="text-gray-400 text-sm">막연한 공부가 아닌, 명확한 결과물을 목표로 달립니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-900/30 rounded-lg text-purple-400 mt-1"><Coffee size={20} /></div>
                <div>
                  <h4 className="font-bold text-lg">Free Atmosphere</h4>
                  <p className="text-gray-400 text-sm">밤새 토론하고 즐겁게 개발하는 자유로운 분위기를 지향합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;