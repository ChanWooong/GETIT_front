import React from 'react';

const InfoInput = ({ label, icon: Icon, name, type = "text", placeholder, pattern, maxLength, value, onChange }) => (
  <div className="space-y-2 text-left">
    <label className="text-sm font-bold text-gray-300 ml-1 flex items-center gap-2">
      <Icon size={16} /> {label}
    </label>
    <input
      name={name}
      type={type}
      required
      maxLength={maxLength}
      pattern={pattern}
      placeholder={placeholder}
      value={value ?? ''}
      className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500 transition-colors text-white"
      onChange={onChange}
    />
  </div>
);

export default InfoInput;