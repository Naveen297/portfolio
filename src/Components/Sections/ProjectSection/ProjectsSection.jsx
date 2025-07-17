// src/components/ProjectSection/ProjectsSection.jsx

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Cloud } from 'lucide-react';

// Import child components
import ProjectHeader from './ProjectHeader';
import ProjectCard from './ProjectCard';
// LAZY LOAD the modal component
const ProjectModal = React.lazy(() => import('./ProjectModal'));

// Import data and styles
import { projects } from './projectData';
import './styles.css';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // REMOVED hoveredProject state for better performance

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Effect to lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  return (
    <motion.section 
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative py-32 overflow-hidden bg-gray-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 bg-purple-500 rounded-full -left-4 w-72 h-72 opacity-20 mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 rounded-full -right-4 w-72 h-72 bg-cyan-500 opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bg-pink-500 rounded-full -bottom-8 left-20 w-72 h-72 opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <ProjectHeader sectionInView={sectionInView} projectCount={projects.length} />
        
        {/* Project Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 font-geormama">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
              // REMOVED onHover props to prevent unnecessary re-renders
            />
          ))}
        </div>

        {/* Enhanced Personal Credit */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 border bg-gradient-to-r rounded-2xl backdrop-blur-sm from-purple-900/50 to-blue-900/50 border-purple-500/30">
            <Award className="w-6 h-6 text-purple-400" />
            <div className="text-left">
              <div className="text-sm font-bold text-white">Complete Development Ownership</div>
              <div className="text-xs text-purple-200">Full-Stack Architecture • UI/UX Design • Cloud Deployment</div>
            </div>
            <Cloud className="w-6 h-6 text-cyan-400" />
          </div>
        </motion.div>
      </div>

      {/* Wrap lazy-loaded modal in Suspense */}
      <Suspense fallback={null}>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </Suspense>
    </motion.section>
  );
};

export default ProjectsSection;