import React, { useState } from 'react';
import { Github, ExternalLink, Folder, Code, Smartphone, Cpu } from 'lucide-react';

const Project = () => {
  const [filter, setFilter] = useState("All");

  // 📂 프로젝트 더미 데이터 (나중에 이 내용을 수정하세요)
  const projects = [
    {
      id: 1,
      title: "Campus Mate",
      category: "App",
      desc: "공강 시간표 자동 생성 및 학식 정보 제공 앱. 출시 3개월 만에 다운로드 1,000회 돌파.",
      tech: ["Flutter", "Firebase", "Node.js"],
      links: { github: "#", demo: "#" },
      color: "from-purple-500 to-indigo-500" // 썸네일 대신 배경색
    },
    {
      id: 2,
      title: "Stock AI Predictor",
      category: "AI",
      desc: "과거 10년치 주가 데이터를 학습하여 내일의 등락을 예측하는 딥러닝 모델 서비스.",
      tech: ["Python", "TensorFlow", "FastAPI"],
      links: { github: "#", demo: "#" },
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: 3,
      title: "GET IT Official Web",
      category: "Web",
      desc: "동아리 소개 및 부원 관리, 리크루팅을 위한 공식 반응형 웹사이트.",
      tech: ["React", "Tailwind", "Spring Boot"],
      links: { github: "#", demo: "#" },
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 4,
      title: "Safe Return",
      category: "App",
      desc: "GPS 기반 안심 귀가 서비스. 경로 이탈 시 보호자에게 자동 알림 전송.",
      tech: ["Kotlin", "Spring Boot", "MySQL"],
      links: { github: "#", demo: "#" },
      color: "from-orange-500 to-red-500"
    }
  ];

  // 필터링 로직
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#110b29] text-white pt-24 pb-20 px-6 font-sans">
      
      <div className="max-w-7xl mx-auto">
        
        {/* 1. 헤더 섹션 */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">PROJECTS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            우리가 밤새워 만든 결과물들입니다.<br/>
            작은 아이디어에서 시작해 실제 서비스가 되기까지의 여정을 확인해보세요.
          </p>
        </div>

        {/* 2. 카테고리 필터 버튼 */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {["All", "Web", "App", "AI"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 border border-white/10
                ${filter === item 
                  ? "bg-cyan-500 text-black scale-105 shadow-[0_0_20px_rgba(34,211,238,0.5)]" 
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* 3. 프로젝트 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/20"
            >
              {/* 썸네일 영역 (이미지 대신 그라데이션 박스) */}
              <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Folder size={64} className="text-white/50" />
                </div>
                {/* 카테고리 뱃지 */}
                <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  {project.category === 'Web' && <Code size={12} />}
                  {project.category === 'App' && <Smartphone size={12} />}
                  {project.category === 'AI' && <Cpu size={12} />}
                  {project.category}
                </span>
              </div>

              {/* 내용 영역 */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10">
                  {project.desc}
                </p>

                {/* 기술 스택 태그 */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-medium px-2.5 py-1 rounded bg-white/10 text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>

                {/* 링크 버튼 */}
                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <a href={project.links.github} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                    <Github size={18} /> Source Code
                  </a>
                  <a href={project.links.demo} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-bold">
                    Live Demo <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Project;