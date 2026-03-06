import { Sparkles ,Instagram, Mail} from "lucide-react";
import { useAppStore } from '../../../store/appStore';
import memberList from "../../../resources/Executive/executive.json";
import MemberCard from "../../../components/MemberCard";
import Footer from "../../../components/ContactFooter";
const Executives = () => {
  const { generationText } = useAppStore();
  // 👥 운영진 데이터 (여기에 실제 정보를 입력하세요)
  const members = memberList?.list || [];
  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* 1. 헤더 섹션 */}
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
            GET IT {generationText}을 이끌어갈 운영진을 소개합니다.
            <br />
            열정 가득한 여러분을 기다리고 있습니다.
          </p>
        </div>

        {/* 2. 운영진 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members?.map((member, idx) => (
            <MemberCard member={member} idx={idx} key={idx} />
          ))}
        </div>

        {/* 3. 푸터 섹션 */}
        <Footer />
      </div>
    </div>
  );
};

export default Executives;
