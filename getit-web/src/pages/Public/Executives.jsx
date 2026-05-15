import { Sparkles } from 'lucide-react';
import { useAppStore } from '../../hooks/appStore';
import memberList from '../../resources/Executives/executive.json';
import MemberCard from '../../components/MemberCard';
import Footer from '../../components/ContactFooter';

const Executives = () => {
  const { generationText } = useAppStore();
  const members = memberList?.list || [];

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-20 pb-10 px-4 sm:pt-24 sm:pb-12 sm:px-5 md:pt-28 md:pb-16 md:px-6 lg:pt-32 lg:pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 mb-3 sm:mb-4 md:mb-6">
            <Sparkles size={12} className="text-cyan-400 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-cyan-400">
              WHO WE ARE
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter mb-3 sm:mb-4 md:mb-6">
            MEET THE <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              TEAM LEADERS
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            GET IT {generationText}을 이끌어갈 운영진을 소개합니다.
            <br />
            열정 가득한 여러분을 기다리고 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {members?.map((member, idx) => (
            <MemberCard member={member} idx={idx} key={idx} />
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Executives;
