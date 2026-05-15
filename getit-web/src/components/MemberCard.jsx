import React from 'react';
import { Github, Instagram, ExternalLink } from 'lucide-react';

function MemberCard({ member }) {


  // 역할에 따라 카드 색상을 구분
  let borderColor = "border-cyan-400";
  let badgeBg = "bg-cyan-400";
  let badgeText = "GENERAL";
  let groundHoverBorderColor = "group-hover:border-cyan-400";

  if (member.role.includes("SW")) {
    borderColor = "border-green-400";
    badgeBg = "bg-green-400";
    badgeText = "SOFTWARE";
    groundHoverBorderColor = "group-hover:border-green-400";
  } else if (member.role.includes("창업")) {
    borderColor = "border-pink-400";
    badgeBg = "bg-pink-400";
    badgeText = "STARTUP";
    groundHoverBorderColor = "group-hover:border-pink-400";
  }

  return (
    <div
      className={`group relative bg-white/5 border ${borderColor} p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl hover:bg-white/10 hover:${borderColor.replace("border-","border-")}/30 transition-all duration-300 hover:-translate-y-1`}
    >
      {/* 분류 배지 */}
      <div className={`absolute top-0 right-0 px-2 py-0.5 sm:px-2.5 sm:py-0.5 md:px-3 md:py-1 text-[9px] sm:text-[10px] md:text-xs font-bold text-black rounded-bl-md sm:rounded-bl-lg ${badgeBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>{badgeText}</div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {/* 프로필 이미지 영역 */}
        <div className="relative shrink-0">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-[5.5rem] md:h-[5.5rem] lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white/10 ${groundHoverBorderColor} transition-colors`}>
            <img
              src={`/${member.image}`} // 이미지 경로 수정
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 정보 영역 */}
        <div className="text-center sm:text-left flex-1 min-w-0">
          <div className="mb-0.5 sm:mb-1">
            <span className="text-cyan-400 text-[10px] sm:text-xs md:text-sm font-bold tracking-wide uppercase">
              {member.role}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 sm:mb-1">{member.name}</h3>
          <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2 md:mb-4">{member.major}</p>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 md:mb-6">
            "{member.desc}"
          </p>

          {/* 소셜 링크 아이콘 */}
          <div className="flex justify-center sm:justify-start gap-1.5 sm:gap-2 md:gap-3">
            {member.links.github && (
              <a
                href={member.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-1 sm:p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-white text-gray-400 transition-all"
              >
                <Github size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
              </a>
            )}
            {member.links.instagram && (
              <a
                href={member.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-1 sm:p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-pink-400 text-gray-400 transition-all"
              >
                <Instagram size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
              </a>
            )}
            {member.links.blog && (
              <a
                href={member.links.blog}
                target="_blank"
                rel="noreferrer"
                className="p-1 sm:p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-green-400 text-gray-400 transition-all"
              >
                <ExternalLink size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MemberCard;