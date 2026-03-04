import React from 'react';
import { PROJECT_CATEGORIES } from '../..constants';

const ProjectFilter = ({ value, onChange }) => (
  <div className="flex justify-center gap-4 mb-12 flex-wrap">
    {PROJECT_CATEGORIES.map((item) => (
      <button
        key={item}
        type="button"
        onClick={() => onChange(item)}
        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 border border-white/10
          ${value === item
            ? 'bg-cyan-500 text-black scale-105 shadow-[0_0_20px_rgba(34,211,238,0.5)]'
            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
      >
        {item}
      </button>
    ))}
  </div>
);

export default ProjectFilter;
