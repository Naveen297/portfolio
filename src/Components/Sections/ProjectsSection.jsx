import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Zap, X, Bot, Shield, FileText, Users, Cloud, Award, 
  TrendingUp, Lock, Cpu, Brain, Database, Globe, 
  CheckCircle, Star, Sparkles, Calendar, Building, Palette, Download, Moon, Type, Save
} from 'lucide-react';

// Import projects from your existing data file
import { projects as existingProjects } from '../../Data/portfolioData';

// Your personal side projects
const personalProjects = [
  {
    id: 'gradientforge-tool',
    title: 'GradientForge',
    tagline: 'Advanced CSS Gradient Generator & Design Tool',
    subtitle: 'Live at gradientforge.netlify.app',
    gradient: 'from-purple-500 via-pink-600 to-red-700',
    icon: Palette,
    userCount: 'Live Tool',
    impact: 'Creative',
    duration: '2 weeks',
    complexity: 'Advanced UI',
    liveUrl: 'https://gradientforge.netlify.app/',
    tech: ['React.js', 'Tailwind CSS', 'JavaScript', 'CSS3', 'HTML Canvas', 'Responsive Design', 'PWA'],
    keyMetrics: [
      { label: 'Features', value: '15+', icon: Star },
      { label: 'Export Formats', value: '3', icon: Download },
      { label: 'Presets', value: '6+', icon: Palette },
      { label: 'Theme Modes', value: '2', icon: Moon }
    ],
    achievements: [
      'Built comprehensive gradient design tool with real-time preview and editing',
      'Implemented advanced color stop management with precise position controls',
      'Created intelligent preset system with beautiful gradient combinations',
      'Designed responsive interface supporting both linear and radial gradients',
      'Built export functionality for PNG images using HTML5 Canvas API',
      'Implemented dark/light theme switching with smooth transitions',
      'Added save/load functionality with local storage persistence',
      'Crafted pixel-perfect UI with modern glassmorphism design elements'
    ],
    tags: ['Design Tools', 'CSS Generator', 'Creative', 'Frontend'],
    features: [
      'Real-time gradient preview',
      'Advanced color picker',
      'Export as CSS/PNG',
      'Preset gradient library',
      'Dark/Light theme',
      'Save/Load gradients'
    ]
  },
  {
    id: 'markdown-pro-editor',
    title: 'Markdown Pro Editor',
    tagline: 'Professional Markdown Editor with Live Preview',
    subtitle: 'Live at markdownproeditor.netlify.app',
    gradient: 'from-blue-500 via-cyan-600 to-teal-700',
    icon: FileText,
    userCount: 'Live Tool',
    impact: 'Productivity',
    duration: '3 weeks',
    complexity: 'Full-Featured',
    liveUrl: 'https://markdownproeditor.netlify.app/',
    tech: ['React.js', 'Tailwind CSS', 'JavaScript', 'Markdown Parser', 'File System API', 'Local Storage'],
    keyMetrics: [
      { label: 'Word Count', value: 'Live', icon: Type },
      { label: 'Export Formats', value: '2', icon: Download },
      { label: 'Templates', value: '4+', icon: FileText },
      { label: 'Auto-Save', value: 'Yes', icon: Save }
    ],
    achievements: [
      'Developed full-featured markdown editor with real-time HTML preview',
      'Built custom markdown-to-HTML parser with syntax highlighting support',
      'Implemented three viewing modes: Editor, Split-view, and Preview-only',
      'Created comprehensive export system (HTML, Markdown) with styled output',
      'Added intelligent auto-save functionality with localStorage persistence',
      'Built quick-insert templates for tables, code blocks, lists, and quotes',
      'Designed responsive interface with statistics tracking (word/character count)',
      'Integrated file upload/download capabilities with drag-and-drop support'
    ],
    tags: ['Productivity', 'Text Editor', 'Markdown', 'Development Tools'],
    features: [
      'Live markdown preview',
      'Split-screen editing',
      'Export HTML/Markdown',
      'Auto-save functionality',
      'Word count statistics',
      'Template insertion'
    ]
  }
];

// Your impressive Mahindra chatbot projects
const mahindraProjects = [
  {
    id: 'brd-generator-chatbot',
    title: 'BRD Generator AI Chatbot',
    tagline: 'Enterprise Business Requirements Document Generation Platform',
    subtitle: 'Mahindra Internal Project',
    gradient: 'from-blue-500 via-purple-600 to-indigo-700',
    icon: FileText,
    userCount: '50K+',
    impact: 'High',
    duration: '6 months',
    complexity: 'Enterprise',
    tech: ['React.js', 'Vite', 'Node.js', 'OpenAI GPT', 'GCP', 'SSO Auth', 'MongoDB', 'WebSocket', 'Multer'],
    keyMetrics: [
      { label: 'Monthly Users', value: '50K+', icon: Users },
      { label: 'Document Types', value: '4+', icon: FileText },
      { label: 'Processing Speed', value: '95%', icon: TrendingUp },
      { label: 'Security Level', value: 'Enterprise', icon: Lock }
    ],
    achievements: [
      'Architected enterprise-grade full-stack solution for automated BRD generation',
      'Implemented sophisticated multi-modal document processing (video, audio, PDF, DOC)',
      'Built advanced conversational AI interface powered by ChatGPT integration',
      'Designed bulletproof authentication system with SSO and session management',
      'Developed real-time chat history with seamless conversation switching',
      'Created dynamic document enhancement allowing mid-process uploads',
      'Deployed on Google Cloud Platform with enterprise-level scalability',
      'Engineered pixel-perfect UI/UX with React.js + Vite for optimal performance'
    ],
    tags: ['AI/ML', 'Enterprise', 'Document Processing', 'Conversational AI']
  },
  {
    id: 'dual-plant-chatbot',
    title: 'CME & Design Dual Bot System',
    tagline: 'Multi-Plant Production Intelligence Platform',
    subtitle: 'Mahindra Nasik & Chakan Plants',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    icon: Bot,
    userCount: '100K+',
    impact: 'Critical',
    duration: '8 months',
    complexity: 'Multi-Tenant',
    tech: ['React.js', 'Vite', 'Node.js', 'AI/ML', 'GCP', 'SSO Auth', 'Redis', 'Socket.io', 'MongoDB'],
    keyMetrics: [
      { label: 'Monthly Users', value: '100K+', icon: Users },
      { label: 'Plants Served', value: '2', icon: Building },
      { label: 'Uptime', value: '99.9%', icon: TrendingUp },
      { label: 'Response Time', value: '<2s', icon: Zap }
    ],
    achievements: [
      'Developed unified dual-bot ecosystem for Mahindra manufacturing plants',
      'Created intelligent document processing for production manuals and robotics data',
      'Built premium chat interface with advanced media handling capabilities',
      'Implemented seamless inter-plant bot switching with context preservation',
      'Designed secure multi-tenant architecture with enterprise SSO',
      'Engineered rich media experience with code visualization and image galleries',
      'Deployed mission-critical infrastructure handling 100K+ monthly users',
      'Crafted production-ready UI/UX ensuring zero-downtime operations'
    ],
    tags: ['Manufacturing', 'Multi-Tenant', 'Production AI', 'Enterprise Scale']
  },
  {
    id: 'vulnerability-assessment-bot',
    title: 'Vulnerability Assessment AI Bot',
    tagline: 'Intelligent Security Analysis & Code Review Platform',
    subtitle: 'Mahindra Security Initiative',
    gradient: 'from-red-500 via-orange-600 to-yellow-700',
    icon: Shield,
    userCount: 'Enterprise',
    impact: 'Mission Critical',
    duration: '5 months',
    complexity: 'Security',
    tech: ['React.js', 'Vite', 'Node.js', 'Vector DB', 'Embeddings', 'AI/ML', 'GCP', 'PostgreSQL', 'Docker'],
    keyMetrics: [
      { label: 'Security Level', value: 'L1', icon: Shield },
      { label: 'Threat Detection', value: 'Real-time', icon: Brain },
      { label: 'Code Analysis', value: 'Deep', icon: Cpu },
      { label: 'Accuracy', value: '98%', icon: CheckCircle }
    ],
    achievements: [
      'Built comprehensive vulnerability assessment system for enterprise security',
      'Implemented cutting-edge vector database for pre-processed security embeddings',
      'Created intelligent threat analysis for architecture and codebase vulnerabilities',
      'Developed real-time security recommendation engine with ML algorithms',
      'Designed scalable embedding pipeline for continuous security monitoring',
      'Engineered fortress-level deployment ensuring maximum data protection',
      'Built executive dashboard for vulnerability tracking and remediation',
      'Crafted security-first UI/UX optimized for cybersecurity workflows'
    ],
    tags: ['Cybersecurity', 'ML/AI', 'Vector DB', 'Threat Analysis']
  }
];

// Function to add enhanced data to existing projects
const enhanceExistingProjects = (projects) => {
  return projects.map(project => ({
    ...project,
    icon: project.icon || Zap,
    userCount: project.userCount || 'Production',
    impact: project.impact || 'High',
    duration: project.duration || '3-6 months',
    complexity: project.complexity || 'Advanced',
    tags: project.tags || ['Web Development', 'Full Stack'],
    keyMetrics: project.keyMetrics || [
      { label: 'Status', value: 'Live', icon: CheckCircle },
      { label: 'Performance', value: 'Optimized', icon: TrendingUp }
    ]
  }));
};

// Combine projects - PERSONAL PROJECTS FIRST!
const projects = [
  ...personalProjects,
  ...mahindraProjects,
  ...enhanceExistingProjects(existingProjects)
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  const impactColors = {
    'High': 'text-blue-400',
    'Critical': 'text-orange-400',
    'Mission Critical': 'text-red-400',
    'Creative': 'text-purple-400',
    'Productivity': 'text-green-400'
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="overflow-hidden relative py-32 bg-gray-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        {/* Enhanced Header */}
        <div className="mb-24 text-center">
          <motion.div
            className="inline-flex gap-2 items-center px-4 py-2 mb-6 bg-gradient-to-r rounded-full border from-purple-900/50 to-blue-900/50 border-purple-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Building className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-200">Featured Projects</span>
            <Star className="w-4 h-4 text-yellow-400" />
          </motion.div>

          <motion.h2 
            className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 md:text-7xl [text-shadow:0_0_30px_rgba(168,85,247,0.6)] font-georama"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: sectionInView ? 1 : 0.8, opacity: sectionInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Enterprise AI Solutions
          </motion.h2>
          
          <motion.p 
            className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-300 font-georamalight"
            initial={{ opacity: 0 }}
            animate={{ opacity: sectionInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Revolutionary AI-powered enterprise solutions developed during my tenure at Mahindra Group, 
            plus innovative personal projects showcasing modern web development expertise. 
            These production-grade systems serve <span className="font-semibold text-cyan-400">150K+ users</span> across 
            multiple manufacturing plants with enterprise-level security and scalability.
          </motion.p>

          {/* Stats Bar */}
          <motion.div 
            className="flex flex-wrap gap-8 justify-center items-center mt-8"
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
              <div className="text-2xl font-bold text-purple-400">{projects.length}</div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced Project Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 font-georamalight">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            const isHovered = hoveredProject === project.id;
            
            return (
              <motion.div
                key={project.id}
                layoutId={project.id}
                onClick={() => setSelectedProject(project)}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative p-6 rounded-3xl border backdrop-blur-sm transition-all duration-500 cursor-pointer border-gray-700/50 group bg-gray-800/30 hover:border-cyan-500/50 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                {/* Gradient Border */}
                <div className={`absolute top-0 left-0 h-2 w-full bg-gradient-to-r ${project.gradient} rounded-t-3xl`}></div>
                
                {/* Project Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.gradient} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex gap-2 items-center mb-1">
                      <span className={`text-xs font-bold ${impactColors[project.impact] || 'text-blue-400'}`}>
                        {project.impact}
                      </span>
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                    </div>
                    <div className="flex gap-1 items-center text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{project.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="mb-4">
                  <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                    {project.title}
                  </h3>
                  <p className="mb-1 text-sm text-gray-400">{project.tagline}</p>
                  <p className="text-xs font-medium text-purple-300">{project.subtitle}</p>
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex gap-1 items-center mt-1 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Globe className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {project.keyMetrics?.slice(0, 2).map((metric, i) => (
                    <div key={i} className="p-3 rounded-xl border bg-gray-700/30 border-gray-600/30">
                      <div className="flex gap-2 items-center">
                        <metric.icon className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-gray-400">{metric.label}</span>
                      </div>
                      <div className="mt-1 text-sm font-bold text-white">{metric.value}</div>
                    </div>
                  ))}
                </div>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech?.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-semibold text-cyan-200 rounded-full border border-gray-600/50 bg-gray-700/50">
                      {tech}
                    </span>
                  ))}
                  {project.tech?.length > 3 && (
                    <span className="px-3 py-1 text-xs font-semibold text-purple-200 rounded-full border border-purple-600/50 bg-purple-700/50">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Project Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags?.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs text-yellow-300 rounded-md border bg-yellow-900/30 border-yellow-700/30">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover Effects */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br rounded-3xl opacity-0 transition-opacity duration-500 from-cyan-500/5 to-purple-500/5 group-hover:opacity-100"
                  animate={isHovered ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Pulse Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r rounded-3xl opacity-0 blur transition-opacity duration-500 from-cyan-500/20 to-purple-500/20 group-hover:opacity-100"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Personal Credit */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex gap-4 items-center px-8 py-4 bg-gradient-to-r rounded-2xl border backdrop-blur-sm from-purple-900/50 to-blue-900/50 border-purple-500/30">
            <Award className="w-6 h-6 text-purple-400" />
            <div className="text-left">
              <div className="text-sm font-bold text-white">Complete Development Ownership</div>
              <div className="text-xs text-purple-200">Full-Stack Architecture • UI/UX Design • Cloud Deployment</div>
            </div>
            <Cloud className="w-6 h-6 text-cyan-400" />
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            layoutId={selectedProject.id}
            className="flex fixed inset-0 z-50 justify-center items-center p-4 font-georamalight"
          >
            <motion.div 
              initial={{ opacity: 0.8, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-full max-w-5xl max-h-[95vh] p-8 overflow-y-auto border shadow-2xl rounded-3xl shadow-purple-500/30 border-gray-700/50 bg-gray-900/95 backdrop-blur-3xl"
            >
              <div className={`absolute top-0 left-0 h-3 w-full bg-gradient-to-r ${selectedProject.gradient} rounded-t-3xl`}></div>
              
              <motion.button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-3 text-gray-400 rounded-2xl backdrop-blur-sm transition-colors bg-gray-800/80 hover:text-white"
                whileHover={{ scale: 1.1, rotate: 90 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
              
              {/* Enhanced Project Header */}
              <div className="flex gap-6 items-start mb-8">
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${selectedProject.gradient} shadow-2xl`}>
                  <selectedProject.icon className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex gap-3 items-center mb-2">
                    <h2 className="text-4xl font-bold text-white">{selectedProject.title}</h2>
                    <span className={`px-3 py-1 text-xs font-bold ${impactColors[selectedProject.impact]} bg-gray-800/50 rounded-full border border-current/30`}>
                      {selectedProject.impact}
                    </span>
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex gap-2 items-center px-3 py-1 text-xs font-bold text-blue-300 rounded-full border transition-colors bg-blue-900/50 border-blue-500/30 hover:bg-blue-800/50"
                      >
                        <Globe className="w-3 h-3" />
                        Live Demo
                      </a>
                    )}
                  </div>
                  <p className="mb-2 text-xl text-gray-300">{selectedProject.tagline}</p>
                  <p className="mb-4 text-sm font-medium text-purple-300">{selectedProject.subtitle}</p>
                  
                  {/* Enhanced Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {selectedProject.keyMetrics?.map((metric, i) => (
                      <div key={i} className="p-4 rounded-xl border bg-gray-800/50 border-gray-600/30">
                        <div className="flex gap-2 items-center mb-2">
                          <metric.icon className="w-5 h-5 text-cyan-400" />
                          <span className="text-xs text-gray-400">{metric.label}</span>
                        </div>
                        <div className="text-lg font-bold text-white">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Enhanced Tech Stack */}
              <div className="mb-8">
                <h3 className="flex gap-2 items-center mb-4 text-xl font-semibold text-cyan-400">
                  <Cpu className="w-5 h-5" />
                  Technology Stack
                </h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {selectedProject.tech?.map((tech) => (
                    <div key={tech} className="px-4 py-3 text-sm font-semibold text-center text-purple-200 rounded-xl border border-purple-700/50 bg-purple-900/30">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Achievements */}
              <div className="mb-8">
                <h3 className="flex gap-2 items-center mb-4 text-xl font-semibold text-cyan-400">
                  <Brain className="w-5 h-5" />
                  Key Achievements & Technical Excellence
                </h3>
                <div className="grid gap-4">
                  {selectedProject.achievements?.map((achievement, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      className="flex gap-4 items-start p-4 text-gray-300 rounded-xl border border-gray-700/50 bg-gray-800/30"
                    >
                      <div className="p-2 rounded-lg border bg-yellow-900/30 border-yellow-700/30">
                        <Zap className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="text-sm leading-relaxed">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Project Features (for personal projects) */}
              {selectedProject.features && (
                <div className="mb-8">
                  <h3 className="flex gap-2 items-center mb-4 text-xl font-semibold text-cyan-400">
                    <Star className="w-5 h-5" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {selectedProject.features.map((feature, i) => (
                      <div key={i} className="flex gap-3 items-center p-3 rounded-xl border bg-gray-800/30 border-gray-700/50">
                        <div className="p-2 rounded-lg border bg-green-900/30 border-green-700/30">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Tags */}
              <div className="mb-6">
                <h3 className="flex gap-2 items-center mb-3 text-lg font-semibold text-cyan-400">
                  <Database className="w-4 h-4" />
                  Project Categories
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tags?.map((tag) => (
                    <span key={tag} className="px-4 py-2 text-sm font-medium text-yellow-300 rounded-xl border bg-yellow-900/30 border-yellow-700/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Confidentiality Notice - only for Mahindra projects */}
              {selectedProject.subtitle?.includes('Mahindra') && (
                <div className="p-4 mt-8 rounded-xl border bg-orange-900/20 border-orange-700/30">
                  <div className="flex gap-3 items-center">
                    <Lock className="w-5 h-5 text-orange-400" />
                    <span className="text-sm font-medium text-orange-300">
                      Proprietary Mahindra Group Project - Technical details limited due to confidentiality
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 z-[-1] bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </motion.section>
  );
};

export default ProjectsSection;