import React from 'react';

const InfoInput = ({ label, icon: Icon, name, type = "text", placeholder, pattern, maxLength, value, onChange, readOnly }) => (
  <div className="space-y-2 text-left">
    <label className="text-sm font-bold text-gray-300 ml-1 flex items-center gap-2">
      <Icon size={16} /> {label}
    </label>
    <input
      name={name}
      type={type}
      required={!readOnly}
      maxLength={maxLength}
      pattern={pattern}
      placeholder={placeholder}
      value={value ?? ''}
      readOnly={readOnly}
      className={`w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white ${readOnly ? 'cursor-default focus:outline-none' : 'focus:outline-none focus:border-cyan-500 transition-colors'}`}
      onChange={onChange}
    />
  </div>
);

export default InfoInput;