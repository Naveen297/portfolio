import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Building, Calendar, TrendingUp, Users, Award, Code2, 
  Rocket, Shield, Globe, Zap, Brain, Cpu, Database,
  CheckCircle, Star, Target, Trophy, Layers, GitBranch,
  Monitor, Server, Cloud
} from 'lucide-react';

const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState('impact');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Categories for filtering the tech stack
  const techCategories = [
    { id: 'all', label: 'All Tech', icon: Star },
    { id: 'frontend', label: 'Frontend', icon: Monitor },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'cloud', label: 'Cloud', icon: Cloud },
    { id: 'ai', label: 'AI & ML', icon: Brain }
  ];

  // Comprehensive tech stack data
  const techStack = {
    frontend: [
      { 
        name: 'React.js', 
        icon: '⚛️', 
        proficiency: 95, 
        gradient: 'from-blue-400 to-cyan-500',
        description: 'Expert-level React development with Hooks, Context, and advanced patterns.',
        projects: '8+ Enterprise Projects'
      },
      { 
        name: 'Three.js', 
        icon: '🎮', 
        proficiency: 90, 
        gradient: 'from-purple-400 to-pink-500',
        description: '3D data visualization and interactive manufacturing insights.',
        projects: 'Manufacturing Dashboards'
      },
      { 
        name: 'Next.js', 
        icon: '▲', 
        proficiency: 85, 
        gradient: 'from-gray-400 to-gray-600',
        description: 'SSR, SSG, and full-stack Next.js applications.',
        projects: 'Enterprise Portals'
      },
      { 
        name: 'TailwindCSS', 
        icon: '🎨', 
        proficiency: 95, 
        gradient: 'from-teal-400 to-blue-500',
        description: 'Utility-first CSS framework mastery with custom design systems.',
        projects: 'All UI Projects'
      },
      { 
        name: 'Vite', 
        icon: '⚡', 
        proficiency: 90, 
        gradient: 'from-yellow-400 to-orange-500',
        description: 'Lightning-fast build tool for modern web development.',
        projects: 'Performance Optimization'
      }
    ],
    backend: [
      { 
        name: 'Node.js', 
        icon: '�', 
        proficiency: 88, 
        gradient: 'from-green-400 to-emerald-500',
        description: 'Scalable server-side JavaScript with Express and microservices.',
        projects: 'REST API Development'
      },
      { 
        name: 'Python', 
        icon: '🐍', 
        proficiency: 85, 
        gradient: 'from-blue-400 to-yellow-500',
        description: 'Flask frameworks and AI/ML integration.',
        projects: 'AI Chatbot Systems'
      },
      { 
        name: 'Flask', 
        icon: '🌶️', 
        proficiency: 82, 
        gradient: 'from-red-400 to-pink-500',
        description: 'Lightweight Python web framework for microservices.',
        projects: 'API Backend Services'
      },
      { 
        name: 'WebSocket', 
        icon: '🔄', 
        proficiency: 88, 
        gradient: 'from-purple-400 to-indigo-500',
        description: 'Real-time communication and live data streaming.',
        projects: 'Real-time Dashboards'
      },
      { 
        name: 'REST APIs', 
        icon: '🔗', 
        proficiency: 92, 
        gradient: 'from-cyan-400 to-blue-500',
        description: 'RESTful API design, development, and integration.',
        projects: 'Enterprise Integration'
      }
    ],
    database: [
      { 
        name: 'MongoDB', 
        icon: '🍃', 
        proficiency: 85, 
        gradient: 'from-green-400 to-green-600',
        description: 'NoSQL database design and optimization.',
        projects: 'Document Storage'
      },
      { 
        name: 'PostgreSQL', 
        icon: '🐘', 
        proficiency: 80, 
        gradient: 'from-blue-400 to-blue-600',
        description: 'Relational database management and complex queries.',
        projects: 'Enterprise Data'
      },
      { 
        name: 'Redis', 
        icon: '🔴', 
        proficiency: 75, 
        gradient: 'from-red-400 to-red-600',
        description: 'In-memory caching and session management.',
        projects: 'Performance Caching'
      },
      { 
        name: 'Vector DB', 
        icon: '🧠', 
        proficiency: 78, 
        gradient: 'from-purple-400 to-purple-600',
        description: 'AI embeddings and similarity search systems.',
        projects: 'AI Applications'
      }
    ],
    cloud: [
      { 
        name: 'Google Cloud', 
        icon: '☁️', 
        proficiency: 88, 
        gradient: 'from-blue-400 to-red-500',
        description: 'GCP deployment, scaling, and enterprise cloud solutions.',
        projects: '150K+ User Systems'
      },
      { 
        name: 'Docker', 
        icon: '🐳', 
        proficiency: 82, 
        gradient: 'from-blue-400 to-blue-600',
        description: 'Containerization and microservices deployment.',
        projects: 'Scalable Architecture'
      },
      { 
        name: 'Jenkins', 
        icon: '🔧', 
        proficiency: 80, 
        gradient: 'from-gray-400 to-blue-500',
        description: 'CI/CD pipeline automation and deployment optimization.',
        projects: 'DevOps Automation'
      },
      { 
        name: 'GitHub Actions', 
        icon: '🚀', 
        proficiency: 85, 
        gradient: 'from-gray-400 to-purple-500',
        description: 'Automated testing, building, and deployment workflows.',
        projects: 'Continuous Integration'
      }
    ],
    ai: [
      { 
        name: 'OpenAI GPT', 
        icon: '🤖', 
        proficiency: 90, 
        gradient: 'from-green-400 to-blue-500',
        description: 'ChatGPT integration and conversational AI systems.',
        projects: 'AI Chatbots (150K+ users)'
      },
      { 
        name: 'AI/ML Integration', 
        icon: '🧠', 
        proficiency: 85, 
        gradient: 'from-purple-400 to-pink-500',
        description: 'Machine learning model integration and AI workflows.',
        projects: 'Intelligent Systems'
      },
      { 
        name: 'Embeddings', 
        icon: '📊', 
        proficiency: 82, 
        gradient: 'from-orange-400 to-red-500',
        description: 'Vector embeddings and semantic search implementation.',
        projects: 'Security Analysis'
      }
    ]
  };

  // Helper function to get all technologies flattened into one array
  const getAllTechs = () => {
    return Object.values(techStack).flat();
  };

  // Helper function to get technologies based on the active filter
  const getFilteredTechs = () => {
    if (activeCategory === 'all') return getAllTechs();
    return techStack[activeCategory] || [];
  };

  // Data for the other tabs
  const experienceData = {
    impact: [
      {
        metric: "150K+",
        label: "Active Users",
        description: "Across all developed applications",
        icon: Users,
        color: "text-cyan-400"
      },
      {
        metric: "30%",
        label: "Engagement Increase",
        description: "Through UI/UX improvements",
        icon: TrendingUp,
        color: "text-green-400"
      },
      {
        metric: "40%",
        label: "Data Throughput",
        description: "Performance optimization",
        icon: Database,
        color: "text-purple-400"
      },
      {
        metric: "25%",
        label: "Latency Reduction",
        description: "System optimization",
        icon: Zap,
        color: "text-yellow-400"
      },
      {
        metric: "60%",
        label: "Deployment Speed",
        description: "CI/CD pipeline improvements",
        icon: Rocket,
        color: "text-pink-400"
      },
      {
        metric: "99.9%",
        label: "System Uptime",
        description: "Production reliability",
        icon: Shield,
        color: "text-blue-400"
      }
    ],
    expertise: [
      {
        category: "Frontend Architecture",
        skills: ["React.js Ecosystem", "Three.js 3D Visualizations", "Micro-frontends", "Performance Optimization"],
        level: "Expert",
        icon: Layers,
        gradient: "from-cyan-500 to-blue-600"
      },
      {
        category: "Full-Stack Development",
        skills: ["Node.js", "Python/Flask", "REST APIs", "WebSocket/SSE"],
        level: "Advanced",
        icon: Code2,
        gradient: "from-purple-500 to-pink-600"
      },
      {
        category: "Cloud Tech.",
        skills: ["Google Cloud Platform", "CI/CD Pipelines", "Docker", "Jenkins"],
        level: "Advanced",
        icon: Globe,
        gradient: "from-green-500 to-emerald-600"
      },
      {
        category: "Enterprise Solutions",
        skills: ["AI/ML Integration", "Security Implementation", "Scalable Architecture", "Real-time Systems"],
        level: "Expert",
        icon: Brain,
        gradient: "from-orange-500 to-red-600"
      }
    ],
    achievements: [
      {
        title: "Enterprise AI Integration",
        description: "Successfully integrated ChatGPT and custom AI models into production systems.",
        impact: "Serving 150K+ users",
        icon: Brain,
        badge: "Innovation"
      },
      {
        title: "Multi-Plant Deployment",
        description: "Led deployment of applications across Mahindra's Nasik and Chakan manufacturing plants.",
        impact: "100K+ monthly users",
        icon: Building,
        badge: "Scale"
      },
      {
        title: "Security Implementation",
        description: "Architected enterprise-grade security with SSO and session management.",
        impact: "Zero security incidents",
        icon: Shield,
        badge: "Security"
      },
      {
        title: "Performance Excellence",
        description: "Achieved 99.9% uptime across all production applications.",
        impact: "Mission-critical reliability",
        icon: Target,
        badge: "Performance"
      }
    ]
  };

  // Tab configuration
  const tabs = [
    { id: 'impact', label: 'Business Impact', icon: TrendingUp },
    { id: 'timeline', label: 'Tech Mastery', icon: Code2 },
    { id: 'expertise', label: 'Technical Leadership', icon: Cpu },
    { id: 'achievements', label: 'Key Achievements', icon: Trophy }
  ];

  return (
    <section ref={ref} className="overflow-hidden relative py-32 text-white bg-gray-900 font-geormama">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-20 w-96 h-96 rounded-full blur-3xl bg-purple-500/30"></div>
        <div className="absolute right-10 bottom-20 w-96 h-96 rounded-full blur-3xl bg-cyan-500/30"></div>
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex gap-2 items-center px-4 py-2 mb-6 bg-gradient-to-r rounded-full border from-purple-900/50 to-blue-900/50 border-purple-500/30">
            <Award className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-200">Senior Developer Profile</span>
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
          
          <h2 className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 md:text-6xl [text-shadow:0_0_30px_rgba(168,85,247,0.6)]">
            Professional Excellence
          </h2>
          
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            Demonstrating senior-level expertise through enterprise application development, 
            technical leadership, and measurable business impact at Mahindra Group.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 justify-center p-2 rounded-2xl border backdrop-blur-sm bg-gray-800/50 border-gray-700/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[500px]"
        >
          {/* Business Impact Tab */}
          {activeTab === 'impact' && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {experienceData.impact.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 bg-gray-800/50 border-gray-700/50 hover:border-cyan-500/50 group"
                >
                  <div className="flex gap-4 items-center mb-4">
                    <div className="p-3 rounded-xl transition-transform duration-300 bg-gray-700/50 group-hover:scale-110">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <div className={`text-3xl font-bold ${item.color}`}>{item.metric}</div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tech Mastery Tab (FIXED) */}
          {activeTab === 'timeline' && (
            <div>
              {/* Tech Category Filters */}
              <motion.div 
                className="flex flex-wrap gap-2 justify-center mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {techCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-all duration-300 border ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-500'
                        : 'bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-gray-700/80 hover:border-gray-500'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </button>
                ))}
              </motion.div>

              {/* Tech Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {getFilteredTechs().map((tech, index) => (
                  <motion.div
                    key={`${activeCategory}-${tech.name}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex flex-col p-6 rounded-2xl border backdrop-blur-sm bg-gray-800/50 border-gray-700/50 group"
                  >
                    <div className="flex gap-4 items-center mb-4">
                      <span className="text-4xl">{tech.icon}</span>
                      <h3 className="text-xl font-bold text-white">{tech.name}</h3>
                    </div>
                    <p className="flex-grow mb-4 text-sm text-gray-300">{tech.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1 text-xs text-gray-400">
                        <span>Proficiency</span>
                        <span>{tech.proficiency}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full">
                        <motion.div 
                          className={`h-2 rounded-full bg-gradient-to-r ${tech.gradient}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${tech.proficiency}%`}}
                          transition={{ duration: 0.8, delay: 0.2 + index * 0.05, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                     <div className="pt-4 mt-auto text-xs text-center text-gray-400 border-t border-gray-700">
                      <span className="font-semibold text-cyan-400">Key Projects:</span> {tech.projects}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Leadership Tab */}
          {activeTab === 'expertise' && (
            <div className="grid gap-6 md:grid-cols-2">
              {experienceData.expertise.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 bg-gray-800/50 border-gray-700/50 hover:border-purple-500/50 group"
                >
                  <div className="flex gap-4 items-center mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${area.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <area.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white transition-colors group-hover:text-purple-400">
                        {area.category}
                      </h3>
                      <span className="px-2 py-1 text-xs font-semibold text-purple-300 rounded-md bg-purple-900/50">
                        {area.level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    {area.skills.map((skill, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Key Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="grid gap-6 md:grid-cols-2">
              {experienceData.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 bg-gray-800/50 border-gray-700/50 hover:border-yellow-500/50 group"
                >
                  <div className="flex gap-4 items-start mb-4">
                    <div className="p-3 rounded-xl border transition-transform duration-300 bg-yellow-900/30 border-yellow-700/30 group-hover:scale-110">
                      <achievement.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-2 items-center mb-2">
                        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-yellow-400">
                          {achievement.title}
                        </h3>
                        <span className="px-2 py-1 text-xs font-semibold text-yellow-300 rounded-md bg-yellow-900/50">
                          {achievement.badge}
                        </span>
                      </div>
                      <p className="mb-3 text-sm leading-relaxed text-gray-300">
                        {achievement.description}
                      </p>
                      <div className="flex gap-2 items-center">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">{achievement.impact}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex gap-4 items-center px-8 py-4 bg-gradient-to-r rounded-2xl border backdrop-blur-sm from-purple-900/50 to-blue-900/50 border-purple-500/30">
            <GitBranch className="w-6 h-6 text-purple-400" />
            <div className="text-left">
              <div className="text-lg font-bold text-white">Ready for Senior-Level Challenges</div>
              <div className="text-sm text-purple-200">Proven track record in enterprise application development and technical leadership</div>
            </div>
            <Rocket className="w-6 h-6 text-cyan-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;