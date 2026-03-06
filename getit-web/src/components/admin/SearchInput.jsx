import React from 'react';
import { Search } from 'lucide-react';

/**
 * Admin 공통 검색 입력 (아이콘 + input)
 */
const SearchInput = ({
  value,
  onChange,
  placeholder = '검색...',
  className = 'w-full md:w-64',
  inputClassName = 'w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all',
}) => (
  <div className={`relative ${className}`}>
    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClassName}
    />
  </div>
);

export default SearchInput;
