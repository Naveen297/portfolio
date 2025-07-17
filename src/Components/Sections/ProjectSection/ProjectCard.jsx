// src/components/ProjectSection/ProjectCard.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Sparkles, Calendar } from 'lucide-react';
import { impactColors } from './constants';

// REMOVED onHoverStart, onHoverEnd, hoveredProject props
const ProjectCard = ({ project, index, onClick }) => {
  const IconComponent = project.icon;

  return (
    <motion.div
      // The key is now on the component itself, not inside
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className="relative p-6 transition-all duration-300 border cursor-pointer rounded-3xl backdrop-blur-sm border-gray-700/50 group bg-gray-800/30 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20"
    >
      <div className={`absolute top-0 left-0 h-2 w-full bg-gradient-to-r ${project.gradient} rounded-t-3xl`}></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.gradient} shadow-xl group-hover:scale-105 transition-transform duration-200`}>
          <IconComponent className="text-white w-7 h-7" />
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold ${impactColors[project.impact] || 'text-blue-400'}`}>
              {project.impact}
            </span>
            <Sparkles className="w-3 h-3 text-yellow-400" />
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{project.duration}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
          {project.title}
        </h3>
        <p className="mb-1 text-sm text-gray-400">{project.tagline}</p>
        <p className="text-xs font-medium text-purple-300">{project.subtitle}</p>
        {project.liveUrl && (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Globe className="w-3 h-3" />
            <span>Live Demo</span>
          </a>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {project.keyMetrics?.slice(0, 2).map((metric) => (
          <div key={metric.label} className="p-3 border rounded-xl bg-gray-700/30 border-gray-600/30">
            <div className="flex items-center gap-2">
              <metric.icon className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-gray-400">{metric.label}</span>
            </div>
            <div className="mt-1 text-sm font-bold text-white">{metric.value}</div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech?.slice(0, 3).map((tech) => (
          <span key={tech} className="px-3 py-1 text-xs font-semibold border rounded-full text-cyan-200 border-gray-600/50 bg-gray-700/50">
            {tech}
          </span>
        ))}
        {project.tech?.length > 3 && (
          <span className="px-3 py-1 text-xs font-semibold text-purple-200 border rounded-full border-purple-600/50 bg-purple-700/50">
            +{project.tech.length - 3}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {project.tags?.slice(0, 2).map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs text-yellow-300 border rounded-md bg-yellow-900/30 border-yellow-700/30">
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-1 bg-gradient-to-r rounded-3xl blur from-cyan-500/10 to-purple-500/10 group-hover:opacity-100"></div>
    </motion.div>
  );
};

export default ProjectCard;