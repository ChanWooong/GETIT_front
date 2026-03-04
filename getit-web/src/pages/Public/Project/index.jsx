import React, { useState } from 'react';
import { PROJECT_CATEGORIES } from '../../../constants';
import projectsData from '../../../resources/Project/projects.json';
import ProjectHeader from '../../../components/ProjectHeader';
import ProjectFilter from '../../../components/ProjectFilter';
import ProjectCard from '../../../components/ProjectCard';

const Project = () => {
  const [filter, setFilter] = useState(PROJECT_CATEGORIES[0]);

  const filteredProjects =
    filter === PROJECT_CATEGORIES[0]
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#110b29] text-white pt-24 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <ProjectHeader />
        <ProjectFilter value={filter} onChange={setFilter} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
