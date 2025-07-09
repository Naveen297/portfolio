export const skillsData = [
  { name: 'React.js', level: 95, color: 'from-blue-500 to-cyan-500', icon: '⚛️' },
  { name: 'JavaScript', level: 92, color: 'from-yellow-500 to-orange-500', icon: '🟨' },
  { name: 'Python', level: 88, color: 'from-green-500 to-emerald-500', icon: '🐍' },
  { name: 'Node.js', level: 85, color: 'from-green-600 to-lime-500', icon: '🟢' },
  { name: 'Three.js', level: 80, color: 'from-purple-500 to-pink-500', icon: '🎯' },
  { name: 'TailwindCSS', level: 93, color: 'from-teal-500 to-blue-500', icon: '🎨' },
  { name: 'MongoDB', level: 82, color: 'from-green-600 to-teal-500', icon: '🍃' },
  { name: 'DevOps', level: 78, color: 'from-orange-500 to-red-500', icon: '⚙️' },
  { name: 'REST APIs', level: 90, color: 'from-purple-600 to-blue-600', icon: '🔗' },
  { name: 'WebSockets', level: 85, color: 'from-indigo-500 to-purple-500', icon: '🔌' },
  { name: 'Flask', level: 83, color: 'from-gray-600 to-gray-800', icon: '🧪' },
  { name: 'GCP', level: 75, color: 'from-blue-400 to-green-400', icon: '☁️' }
];
  
  export const projects = [
    {
      id: 'vinplate',
      title: 'VinPlate Verification System',
      tagline: 'An automated OCR system for vehicle identification and data verification.',
      tech: ['ReactJS (Vite)', 'TailwindCSS', 'Flask', 'GCP', 'OCR'],
      gradient: 'from-blue-400 to-cyan-400',
      achievements: [
        'Built a modular web app from Figma designs using ReactJS and TailwindCSS.',
        'Integrated OCR for auto-verification of VINs, reducing manual input errors.',
        'Developed secure Flask-based REST APIs for scalable deployment on GCP.',
        'Enabled real-time VIN plate capture via scanning devices for a complete workflow.'
      ],
      githubUrl: null, // Add your link here or leave null
    },
    {
      id: 'ai-assistant',
      title: 'AI-Powered Engineering Assistant',
      tagline: 'A full-stack, dual-persona AI chatbot for complex engineering standards.',
      tech: ['ReactJS', 'Python', 'Flask', 'Socket.IO', 'Markdown'],
      gradient: 'from-indigo-400 to-blue-400',
      achievements: [
        'Engineered a full-stack, stateful AI chatbot using React, Flask, and Socket.IO.',
        'Architected a dynamic, context-aware frontend with multi-level navigation.',
        'Implemented a robust chat interface to render mixed-media responses.',
        'Integrated REST and WebSocket APIs for user authentication and chat flow.'
      ],
      githubUrl: 'https://github.com/Naveen297', // Example link
    },
    {
      id: 'hatvision',
      title: 'Hatvision Worker Safety Dashboard',
      tagline: 'A real-time safety dashboard to enforce helmet compliance in industrial plants.',
      tech: ['ReactJS', 'TailwindCSS', 'SSE', 'GCP', 'Chart.js'],
      gradient: 'from-yellow-400 to-amber-400',
      achievements: [
        'Developed a real-time dashboard to detect workers not wearing helmets using SSE.',
        'Built dynamic charts and optimized REST APIs with backend pagination.',
        'Implemented automated end-of-day email notifications with incident summaries.',
        'Deployed the complete application to Google Cloud Platform for scalability.'
      ],
      githubUrl: null,
    },
      {
      id: 'decal',
      title: 'Decal Sense',
      tagline: 'Real-time RTSP video streaming and sticker detection application.',
      tech: ['JavaScript', 'HTML', 'TailwindCSS', 'MUI', 'WebSockets'],
      gradient: 'from-green-400 to-teal-400',
      achievements: [
        'Refactored a legacy UI, significantly improving performance and maintainability.',
        'Enabled real-time RTSP video streaming with live detection via WebSockets.',
        'Added dynamic report generation, mapping, and custom triggers for user analytics.',
      ],
      githubUrl: null,
    },
    {
      id: 'sofi',
      title: 'SOFI OCR',
      tagline: 'A responsive UI with real-time updates for large-scale data handling.',
      tech: ['ReactJS (Vite)', 'ChakraUI', 'MUI', 'REST APIs', 'SSE'],
      gradient: 'from-purple-400 to-pink-400',
      achievements: [
        'Led frontend development from Figma designs using Server-Sent Events (SSE).',
        'Handled large datasets for dynamic report generation and charting.',
        'Integrated SSO authentication, session control, and API protection.',
      ],
      githubUrl: null,
    },
    {
      id: 'paintshop',
      title: 'Paintshop Filter Management',
      tagline: 'A comprehensive dashboard to visualize industrial health metrics.',
      tech: ['React.js', 'TailwindCSS', 'Redux', 'WebSockets', 'Chart.js'],
      gradient: 'from-red-400 to-orange-400',
      achievements: [
        'Designed a dashboard for visualizing real-time motor and filter health metrics.',
        'Used Redux for robust state management of continuous WebSocket data.',
        'Implemented dynamic, real-time graphing with Chart.js for stakeholders.',
      ],
      githubUrl: null,
    },
  ];
  
  export const experiences = [
    {
      title: 'Application Developer',
      company: 'Mahindra and Mahindra LTD.',
      duration: 'Sep 2024 – Present',
      location: 'Mumbai',
      achievements: [
        'Developed scalable full-stack applications using React.js, Node.js, Python, and REST APIs',
        'Integrated Three.js for interactive 3D data visualizations increasing user engagement by 30%',
        'Implemented CI/CD pipelines and automated testing for 40% faster deployments',
        'Built modular UIs and backend systems increasing data throughput by 40%',
        'Delivered cloud-first features using DevOps best practices'
      ],
      // NEW: Skills array to power the radar chart for this role
      skills: [
        { name: 'Full-Stack', value: 95 },
        { name: 'Three.js', value: 85 },
        { name: 'DevOps', value: 90 },
        { name: 'System Design', value: 80 },
        { name: 'Python', value: 85 },
      ]
    },
    {
      title: 'Frontend Developer - Intern',
      company: 'Mahindra and Mahindra LTD.',
      duration: 'July 2023 – July 2024',
      location: 'Mumbai',
      achievements: [
        'Built responsive UI components with ReactJS, MUI, TailwindCSS, and JavaScript',
        'Created real-time data visualizations boosting user engagement by 30%',
        'Integrated REST APIs and Server-Sent Events using Python with Redux state management',
        'Optimized performance reducing latency by 25% and improving overall performance by 30%',
        'Collaborated with cross-functional teams to deliver seamless user experiences'
      ],
      // NEW: Skills array to power the radar chart for this role
      skills: [
        { name: 'React.js', value: 90 },
        { name: 'UI/UX', value: 80 },
        { name: 'State Mgmt', value: 85 },
        { name: 'API Integration', value: 90 },
        { name: 'Optimization', value: 75 },
      ]
    }
  ];   