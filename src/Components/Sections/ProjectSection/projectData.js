// src/components/ProjectSection/projectData.js

import { 
  Zap, Bot, Shield, FileText, Users, Cloud, Award, 
  TrendingUp, Lock, Cpu, Brain, Database, Globe, 
  CheckCircle, Star, Sparkles, Calendar, Building, Palette, 
  Download, Moon, Type, Save 
} from 'lucide-react';

// Import projects from your existing data file
// Note: The path might need adjustment based on your project structure.
import { projects as existingProjects } from '../../../Data/portfolioData';

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
      'Real-time gradient preview', 'Advanced color picker', 'Export as CSS/PNG', 
      'Preset gradient library', 'Dark/Light theme', 'Save/Load gradients'
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
      'Live markdown preview', 'Split-screen editing', 'Export HTML/Markdown', 
      'Auto-save functionality', 'Word count statistics', 'Template insertion'
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

// Combine and export all projects
export const projects = [
  ...personalProjects,
  ...mahindraProjects,
  ...enhanceExistingProjects(existingProjects)
];