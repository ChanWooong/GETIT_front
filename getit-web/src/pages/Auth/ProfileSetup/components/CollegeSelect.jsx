import React from 'react';
import { School } from 'lucide-react';

const CollegeSelect = ({ onChange, value }) => {
  // 백엔드 College Enum과 1:1 매칭
  const collegeList = [
    { id: "HUMANITIES", name: "인문대학" },
    { id: "SOCIAL_SCIENCES", name: "사회과학대학" },
    { id: "NATURAL_SCIENCES", name: "자연과학대학" },
    { id: "ECONOMICS_BUSINESS", name: "경상대학" },
    { id: "ENGINEERING", name: "공과대학" },
    { id: "IT", name: "IT대학" },
    { id: "AGRICULTURE_LIFE_SCIENCES", name: "농업생명과학대학" },
    { id: "ARTS", name: "예술대학" },
    { id: "EDUCATION", name: "사범대학" },
    { id: "ECOLOGY_HOUSEHOLD", name: "생활과학대학" },
    { id: "NURSING", name: "간호대학" },
    { id: "PHARMACY", name: "약학대학" },
    { id: "MEDICINE", name: "의과대학" },
    { id: "DENTISTRY", name: "치과대학" },
    { id: "VETERINARY_MEDICINE", name: "수의과대학" },
    { id: "CONVERGENCE_TECH", name: "첨단기술융합대학" },
    { id: "ECOLOGY_ENVIRONMENT", name: "생태환경대학" },
    { id: "SCIENCE_TECH", name: "과학기술대학" },
    { id: "PUBLIC_ADMIN", name: "행정학부" },
    { id: "GLOBAL_DAEGU", name: "자율전공학부(대구)" },
    { id: "FUTURE_TALENT", name: "자율미래인재학부" }
  ];

  return (
    <div className="space-y-2 text-left">
      <label className="text-sm font-bold text-gray-300 ml-1 flex items-center gap-2">
        <School size={16} /> 단과대학
      </label>
      <div className="relative">
        <select 
          name="college"
          value={value}
          required
          className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500 transition-colors appearance-none text-white cursor-pointer"
          onChange={onChange}
        >
          <option value="">단과대학을 선택해주세요</option>
          {collegeList.map((college) => (
            <option key={college.id} value={college.id}>
              {college.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          ▼
        </div>
      </div>
    </div>
  );
};

export default CollegeSelect;