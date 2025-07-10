export const SECTION_CONSTANTS = {
    ANIMATION_DELAYS: {
      TITLE: 0.1,
      PROFILE: 0.2,
      EXPERIENCE: 0.3,
      TECH_STACK: 0.4,
      DESCRIPTION: 0.6
    },
    TECH_CATEGORIES: {
      FRONTEND: 'frontend',
      BACKEND: 'backend',
      AI_ML: 'ai-ml',
      CLOUD: 'cloud'
    }
  };
  
  export const COMPANY_INFO = {
    CURRENT: {
      name: 'Mahindra and Mahindra LTD.',
      role: 'Application Developer',
      location: 'Mumbai',
      startDate: '2024-09-01',
      type: 'Full-time'
    },
    EDUCATION: {
      institution: 'Manipal University Jaipur',
      degree: 'B.Tech in Computer & Communication Engineering',
      duration: 'Aug 2020 – July 2024',
      cgpa: '9.53'
    }
  };
  
  export const PROFILE_STATS = {
    LIVE_SYSTEMS: '5+',
    PROJECTS: '12+'
  };
  
  export const CORE_SKILLS = [
    'React.js', 'Next.js', 'Python', 'Three.js', 
    'TensorFlow', 'Node.js', 'Flask'
  ];
  
  export const TECH_STACK_DATA = {
    frontend: {
      title: 'Frontend',
      icon: 'Code',
      gradient: 'from-cyan-500 to-blue-600',
      color: 'text-cyan-400',
      technologies: [
        'React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 
        'Three.js', 'Framer Motion', 'Zustand', 'React Query'
      ]
    },
    backend: {
      title: 'Backend',
      icon: 'Database',
      gradient: 'from-green-500 to-teal-600',
      color: 'text-green-400',
      technologies: [
        'Node.js', 'Python', 'Express.js', 'FastAPI', 
        'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL'
      ]
    },
    'ai-ml': {
      title: 'AI/ML',
      icon: 'Brain',
      gradient: 'from-purple-500 to-pink-600',
      color: 'text-purple-400',
      technologies: [
        'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 
        'NumPy', 'OpenCV', 'Hugging Face', 'Langchain'
      ]
    },
    cloud: {
      title: 'Cloud & DevOps',
      icon: 'Cloud',
      gradient: 'from-orange-500 to-yellow-600',
      color: 'text-orange-400',
      technologies: [
        'AWS', 'GCP', 'Azure', 'Docker', 
        'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins'
      ]
    }
  };
  
  export const PERSONAL_DESCRIPTION = `Passionate full-stack developer with expertise in building scalable web applications, immersive 3D experiences, and intelligent AI/ML solutions. Specialized in React.js ecosystem, Three.js, TensorFlow, and modern cloud-native architectures.`;
  
  export const PERSONAL_TRAITS = [
    { label: '🚀 Innovation Focused', gradient: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30', text: 'text-cyan-300' },
    { label: '🎯 Problem Solver', gradient: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-300' },
    { label: '💡 Creative Thinker', gradient: 'from-green-500/20 to-teal-500/20', border: 'border-green-500/30', text: 'text-green-300' },
    { label: '🤖 AI Enthusiast', gradient: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30', text: 'text-orange-300' }
  ];