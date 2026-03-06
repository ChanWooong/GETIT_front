import React from 'react';
import { Github, ExternalLink, Folder, Code, Smartphone, Cpu } from 'lucide-react';
import { PROJECT_PAGE } from '../../constants';

const CATEGORY_ICONS = {
  Web: Code,
  App: Smartphone,
  AI: Cpu,
};

const ProjectCard = ({ project }) => {
  const CategoryIcon = CATEGORY_ICONS[project.category];

  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/20">
      <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <Folder size={64} className="text-white/50" />
        </div>
        <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          {CategoryIcon && <CategoryIcon size={12} />}
          {project.category}
        </span>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span key={t} className="text-xs font-medium px-2.5 py-1 rounded bg-white/10 text-gray-300">
              {t}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <a
            href={project.links.github}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <Github size={18} /> {PROJECT_PAGE.LINK_SOURCE}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
