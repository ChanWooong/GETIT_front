import React from 'react';
import { PROJECT_PAGE } from '../constants';

const ProjectHeader = () => (
  <div className="text-center mb-16 space-y-4">
    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter">
      {PROJECT_PAGE.TITLE_MAIN}{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        {PROJECT_PAGE.TITLE_HIGHLIGHT}
      </span>
    </h2>
    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
      {PROJECT_PAGE.SUBTITLE}
      <br />
      {PROJECT_PAGE.DESCRIPTION}
    </p>
  </div>
);

export default ProjectHeader;
