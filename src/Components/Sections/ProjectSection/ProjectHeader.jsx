// src/components/ProjectSection/ProjectHeader.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Building, Star } from 'lucide-react';

const ProjectHeader = ({ sectionInView, projectCount }) => {
  return (
    <div className="mb-24 text-center">
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Building className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-medium text-purple-200">Featured Projects</span>
        <Star className="w-4 h-4 text-yellow-400" />
      </motion.div>

      <motion.h2 
        className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 md:text-7xl [text-shadow:0_0_30px_rgba(168,85,247,0.6)] font-geormama"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: sectionInView ? 1 : 0.8, opacity: sectionInView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Enterprise AI Solutions
      </motion.h2>
      
      <motion.p 
        className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300 font-geormama"
        initial={{ opacity: 0 }}
        animate={{ opacity: sectionInView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Revolutionary AI-powered enterprise solutions developed during my tenure at Mahindra Group, 
        plus innovative personal projects showcasing modern web development expertise. 
        These production-grade systems serve <span className="font-semibold text-cyan-400">150K+ users</span> across 
        multiple manufacturing plants with enterprise-level security and scalability.
      </motion.p>

      <motion.div 
        className="flex flex-wrap items-center justify-center gap-8 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-400">150K+</div>
          <div className="text-sm text-gray-400">Total Users</div>
        </div>
        <div className="w-px h-12 bg-gray-700"></div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">{projectCount}</div>
          <div className="text-sm text-gray-400">Projects</div>
        </div>
        <div className="w-px h-12 bg-gray-700"></div>
        <div className="text-center">
          <div className="text-2xl font-bold text-pink-400">99.9%</div>
          <div className="text-sm text-gray-400">Uptime</div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectHeader;