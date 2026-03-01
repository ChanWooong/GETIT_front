import React from 'react';
import { Sparkles, Github, Instagram, Mail, ExternalLink } from 'lucide-react';

const Executives = () => {
  // 👥 운영진 데이터 (여기에 실제 정보를 입력하세요)
  const members = [
    {
      role: "회장 (President)",
      name: "박재민",
      major: "컴퓨터학부 글솝 22",
      desc: "모두가 즐겁게 개발할 수 있는 동아리를 만들어가겠습니다.",
      image: "/api/placeholder/150/150", // 실제 이미지 경로로 변경 (예: ./images/member1.jpg)
      links: {
        github: "https://github.com",
        email: "mailto:president@example.com"
      }
    },
    {
      role: "부회장 (Vice President)",
      name: "오찬웅",
      major: "컴퓨터학부 글솝 22",
      desc: "체계적인 커리큘럼과 즐거운 네트워킹을 담당합니다.",
      image: "/api/placeholder/150/150",
      links: {
        github: "https://github.com/ChanWooong",
        email: "mailto:oco466kr@knu.ac.kr"
      }
    },
    {
      role: "Tech Lead",
      name: "박코드",
      major: "컴퓨터학부 글솝 22",
      desc: "기술적인 문제 해결과 서버 인프라를 구축합니다.",
      image: "/api/placeholder/150/150",
      links: {
        github: "https://github.com",
        email: "mailto:vp@example.com"
      }
    },
    {
      role: "Design Lead",
      name: "최픽셀",
      major: "시각디자인과 22",
      desc: "GET IT의 모든 비주얼과 UI/UX 디자인을 총괄합니다.",
      image: "/api/placeholder/150/150",
      links: {
        instagram: "https://instagram.com",
        email: "mailto:design@example.com"
      }
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6">
      
      <div className="max-w-5xl mx-auto">
        
        {/* 1. 헤더 섹션 (Recruit 페이지와 통일감 유지) */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-sm font-bold tracking-wider text-cyan-400">
              WHO WE ARE
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-6">
            MEET THE <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              TEAM LEADERS
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            GET IT 9기를 이끌어갈 운영진을 소개합니다.<br />
            열정 있는 여러분을 기다리고 있습니다.
          </p>
        </div>

        {/* 2. 운영진 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((member, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                
                {/* 프로필 이미지 영역 */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-400 transition-colors">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* 장식용 작은 원 */}
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#110b29] rounded-full flex items-center justify-center border border-white/10">
                    <span className="text-lg">👋</span>
                  </div>
                </div>

                {/* 정보 영역 */}
                <div className="text-center sm:text-left flex-1">
                  <div className="mb-1">
                    <span className="text-cyan-400 text-sm font-bold tracking-wide uppercase">
                      {member.role}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {member.major}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    "{member.desc}"
                  </p>

                  {/* 소셜 링크 아이콘 */}
                  <div className="flex justify-center sm:justify-start gap-3">
                    {member.links.github && (
                      <a href={member.links.github} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-white text-gray-400 transition-all">
                        <Github size={18} />
                      </a>
                    )}
                    {member.links.instagram && (
                      <a href={member.links.instagram} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-pink-400 text-gray-400 transition-all">
                        <Instagram size={18} />
                      </a>
                    )}
                    {member.links.email && (
                      <a href={member.links.email} className="p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-cyan-400 text-gray-400 transition-all">
                        <Mail size={18} />
                      </a>
                    )}
                    {member.links.blog && (
                      <a href={member.links.blog} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-green-400 text-gray-400 transition-all">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. 하단 컨택트 섹션 */}
        <div className="mt-24 text-center border-t border-white/10 pt-16">
          <p className="text-gray-400 mb-6">운영진에게 궁금한 점이 있으신가요?</p>
          <a 
            href="mailto:contact@getit.com" 
            className="inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors border-b border-cyan-400/30 pb-1 hover:border-cyan-400"
          >
            <Mail size={18} />
            공식 이메일로 문의하기
          </a>
        </div>

      </div>
    </div>
  );
};

export default Executives;