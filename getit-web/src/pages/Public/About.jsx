import {
  BookOpen,
  Rocket,
  MonitorPlay,
  BrainCircuit,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { useAppStore } from '../../hooks/appStore';
import springSchedule from "../../resources/Schedule/springSchedule.json";
import fallSchedule from "../../resources/Schedule/fallSchedule.json";
import Schedule from "../../components/Schedule";
import Footer from "../../components/ContactFooter";

function About() {
  const { generationText } = useAppStore();
  const springScheduleList = springSchedule.Schedule; // 1학기 일정
  const fallScheduleList = fallSchedule.Schedule; // 2학기 2일정
  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white overflow-hidden pt-32 pb-20 font-sans">
      {/* 배경 장식 */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[#110b29]"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="text-center mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-cyan-500/30 blur-[80px] rounded-full pointer-events-none"></div>
        {/* 1. 타이틀 섹션: 화면 크기에 따라 글자 크기 자동 조절 */}
        <div className="text-center mb-24 animate-fade-in-up px-3">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs border border-cyan-400/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
            GET IT {generationText}
          </span>
          <h2 className="mt-4 sm:mt-6 mb-4 sm:mb-6 leading-tight relative z-10">
            <span className="block text-gray-300 font-bold mb-1 sm:mb-1.5 tracking-tight opacity-80 text-[clamp(0.875rem,3.5vw,1.25rem)] sm:text-lg md:text-2xl lg:text-3xl">
              우리는 코드를 통해
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 font-black text-[clamp(1.25rem,6.5vw,3rem)] sm:text-2xl md:text-4xl lg:text-5xl">
              세상의 문제를 해결합니다.
            </span>
          </h2>
          <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 md:p-8 backdrop-blur-sm">
            <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3 sm:mb-4 text-[clamp(0.875rem,3vw,1.25rem)] sm:text-base md:text-xl leading-snug">
              "기존의 GET IT, 완전히 새로운 패러다임으로 바뀝니다."
            </h3>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base">
              단순히 코드를 따라 치는 것은 멈추세요.{" "}
              <br className="hidden md:block" />
              우리는 <b className="text-blue-400">AI 바이브 코딩(Vibe Coding)</b>을
              중심으로 아이디어를 현실로 만듭니다.
              <br />
              <br />
              코딩 베이스가 없는 <b className="text-blue-400">신입생</b>도, 개발이 낯선 <b className="text-blue-400">타과생</b>도 괜찮습니다.
              <br />웹 구동 원리를 이해하고 AI를 이용하는 <b className="text-blue-400">'Maker'</b>로
              성장시켜 드립니다.
            </p>
          </div>
        </div>

        {/* 2. 1년 운영 체제 소개 (New System) */}
        <div className="mb-14 sm:mb-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 sm:mb-6 text-center flex items-center justify-center gap-1.5">
            <Rocket className="text-cyan-400" size={22} />
            Curriculum
          </h3>
          <p className="text-center text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            GET IT {generationText}는 1년동안 두 학기로 나누어 운영됩니다. <br />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* 1학기 카드 */}
            <div className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 p-4 sm:p-5 md:p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 m-2 sm:m-3">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-bl-lg">
                1학기
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-3 sm:mb-4">
                <BookOpen size={20} />
              </div>
              <h4 className="text-base sm:text-lg font-bold mb-1.5">
                기초부터 실전까지, 단계적 성장
              </h4>
              <p className="text-blue-200/80 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
                "기초를 다지고 본인의 아이디어를 한 단계 업그레이드 하는 시기"
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <li className="flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-blue-400 mt-0.5 shrink-0" />
                  <span>온라인 영상 강의 제공 (반복 학습 가능)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-blue-400 mt-0.5 shrink-0" />
                  <span><b>세미나</b>를 통한 온라인 강의에서 배울 수 없는 지식 전달</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-blue-400 mt-0.5 shrink-0" />
                  <span><b>간단한 해커톤</b>으로 간단한 프로젝트 완주 경험</span>
                </li>
              </ul>
            </div>

            {/* 2학기 카드 */}
            <div className="bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 p-4 sm:p-5 md:p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 m-2 sm:m-3">
              <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-bl-lg">
                2학기
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-3 sm:mb-4">
                <MonitorPlay size={20} />
              </div>
              <h4 className="text-base sm:text-lg font-bold mb-1.5">실전 창업 프로세스</h4>
              <p className="text-purple-200/80 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
                "실제 사용자가 쓰는 서비스를 만들어 유저를 유치하는 기간"
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <li className="flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-purple-400 mt-0.5 shrink-0" />
                  <span>팀 빌딩 후 <b>본격적인 장기 프로젝트</b> 돌입</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-purple-400 mt-0.5 shrink-0" />
                  <span>실제 서버 배포(Deploy) 및 서비스 운영</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-purple-400 mt-0.5 shrink-0" />
                  <span>직접 만든 서비스를 사용자에게 마케팅 해보는 경험</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* 4. 세미나 일정 리스트 (사용자 입력 가능 구조) */}
        <div className="mb-12 sm:mb-16">
          <Schedule scheduleList={springScheduleList} semester="1" />
        </div>
        <div>
          <Schedule scheduleList={fallScheduleList} semester="2" />
        </div>
        {/* 5. 푸터 섹션 */}
        <Footer />
      </div>
      
    </div>
  );
}

export default About;
