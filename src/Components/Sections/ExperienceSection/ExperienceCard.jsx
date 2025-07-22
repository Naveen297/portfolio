// src/Sections/ExperienceSection/ExperienceCard.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Calendar, MapPin } from 'lucide-react';

const ExperienceCard = React.memo(({ exp, index }) => {
  return (
    <div className={`experience-card relative flex items-start gap-4 md:gap-8 ${index % 2 === 0 ? 'timeline-left md:flex-row-reverse' : 'timeline-right'}`}>
      <div className="w-full md:w-5/12">
        <motion.div 
          className="relative p-4 bg-gradient-to-br rounded-2xl border backdrop-blur-xl transition-all duration-300 md:p-6 border-gray-700/50 group from-gray-800/90 to-gray-900/90 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10"
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="mb-4 md:mb-5">
            <div className="flex flex-wrap gap-2 items-center mb-3 md:gap-3">
              <div className={`p-2 bg-gradient-to-br ${exp.gradient} rounded-lg border ${exp.border}`}>{exp.icon}</div>
              <div className="flex gap-2 items-center text-xs font-semibold text-cyan-400 md:text-sm">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                <span className="break-words">{exp.duration}</span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${exp.type === 'Full-time' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}>
                {exp.type}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-bold leading-tight text-white transition-colors md:text-xl group-hover:text-cyan-300">
              {exp.title}
            </h3>
            <p className="mb-2 text-base font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 md:text-lg">
              {exp.company}
            </p>
            <div className="flex gap-2 items-center text-gray-400">
              <MapPin className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">{exp.location}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="flex gap-2 items-center text-base font-semibold text-purple-400 md:text-lg">
              <Zap className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5" />
              <span>Key Achievements</span>
            </h4>
            <ul className="space-y-3">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="flex gap-3 items-start text-gray-300">
                  <CheckCircle className="flex-shrink-0 mt-1 md:mt-0.5 w-4 h-4 text-green-400 min-w-[16px]" />
                  <span className="flex-1 text-xs leading-relaxed md:text-sm">
                    {achievement}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {index === 0 && (
            <div className="pt-4 mt-4 border-t border-gray-600/30">
              <h4 className="mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase md:text-sm">
                Current Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Three.js', 'Python', 'Node.js', 'GCP'].map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs font-semibold text-cyan-300 bg-gradient-to-r rounded-full border md:px-3 from-cyan-500/20 to-purple-500/20 border-cyan-400/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          {index === 2 && (
            <div className="pt-4 mt-4 border-t border-gray-600/30">
              <h4 className="mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase md:text-sm">
                AI/ML Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {['PaddleOCR', 'YOLOv8', 'Python', 'Computer Vision', 'Figma'].map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs font-semibold text-purple-300 bg-gradient-to-r rounded-full border md:px-3 from-purple-500/20 to-pink-500/20 border-purple-400/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="hidden absolute top-6 left-1/2 justify-center items-center w-6 h-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-2 border-cyan-400 shadow-lg -translate-x-1/2 md:flex shadow-cyan-500/30">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="hidden w-5/12 md:block"></div>
    </div>
  );
});

export default ExperienceCard;