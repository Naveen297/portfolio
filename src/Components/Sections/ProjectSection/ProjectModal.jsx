// src/components/ProjectSection/ProjectModal.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Cpu, Brain, Zap, Star, CheckCircle, Database, Lock } from 'lucide-react';
import { impactColors } from './constants';

// --- ANIMATION VARIANTS FOR PERFORMANCE ---
const modalVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2, when: "beforeChildren" } // Ensure container fades in first
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, when: "afterChildren" } // Ensure container fades out last
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.05 // Stagger animation of child elements
    }
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    transition: { duration: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};
// --- END OF VARIANTS ---


const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-container"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 font-geormama"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80"></div>
        
        {/* Modal Content */}
        <motion.div 
          key="modal-content"
          variants={contentVariants}
          onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking content
          className="relative w-full max-w-5xl max-h-[95vh] overflow-hidden border shadow-2xl rounded-3xl shadow-purple-500/20 border-gray-700/50 bg-gray-900/95"
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
          {/* Top gradient bar */}
          <div className={`h-3 w-full bg-gradient-to-r ${project.gradient}`}></div>
          
          <motion.button
            onClick={onClose}
            className="absolute z-10 p-2 text-gray-400 transition-colors top-4 right-4 rounded-xl bg-gray-800/80 hover:text-white hover:bg-gray-700/80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
          
          {/* Scrollable content with orchestrated animations */}
          <motion.div variants={contentVariants} className="p-8 overflow-y-auto max-h-[calc(95vh-0.75rem)]">
            
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex items-start gap-6 mb-8">
              <div className={`p-6 rounded-2xl bg-gradient-to-br ${project.gradient} shadow-lg`}>
                <project.icon className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-4xl font-bold text-white">{project.title}</h2>
                  <span className={`px-3 py-1 text-xs font-bold ${impactColors[project.impact]} bg-gray-800/50 rounded-full border border-current/30`}>
                    {project.impact}
                  </span>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold text-blue-300 transition-colors border rounded-full bg-blue-900/50 border-blue-500/30 hover:bg-blue-800/50">
                      <Globe className="w-3 h-3" /> Live Demo
                    </a>
                  )}
                </div>
                <p className="mb-2 text-xl text-gray-300">{project.tagline}</p>
                <p className="mb-4 text-sm font-medium text-purple-300">{project.subtitle}</p>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {project.keyMetrics?.map((metric) => (
                    <motion.div variants={itemVariants} key={metric.label} className="p-4 border rounded-xl bg-gray-800/50 border-gray-600/30">
                      <div className="flex items-center gap-2 mb-2">
                        <metric.icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-xs text-gray-400">{metric.label}</span>
                      </div>
                      <div className="text-lg font-bold text-white">{metric.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Technology Stack */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-cyan-400"><Cpu className="w-5 h-5" />Technology Stack</h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {project.tech?.map((tech) => (
                  <motion.div variants={itemVariants} key={tech} className="px-4 py-3 text-sm font-semibold text-center text-purple-200 border rounded-xl border-purple-700/50 bg-purple-900/30">{tech}</motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key Achievements */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-cyan-400"><Brain className="w-5 h-5" />Key Achievements</h3>
              <div className="grid gap-4">
                {project.achievements?.map((achievement, i) => (
                  <motion.div variants={itemVariants} key={i} className="flex items-start gap-4 p-4 text-gray-300 border rounded-xl border-gray-700/50 bg-gray-800/30">
                    <div className="flex-shrink-0 p-2 border rounded-lg bg-yellow-900/30 border-yellow-700/30"><Zap className="w-4 h-4 text-yellow-400" /></div>
                    <span className="text-sm leading-relaxed">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key Features */}
            {project.features && (
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-cyan-400"><Star className="w-5 h-5" />Key Features</h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {project.features.map((feature, i) => (
                    <motion.div variants={itemVariants} key={i} className="flex items-center gap-3 p-3 border rounded-xl bg-gray-800/30 border-gray-700/50">
                      <div className="flex-shrink-0 p-2 border rounded-lg bg-green-900/30 border-green-700/30"><CheckCircle className="w-4 h-4 text-green-400" /></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Project Categories & Confidentiality Notice */}
            <motion.div variants={itemVariants}>
              {/* Categories, etc. */}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;