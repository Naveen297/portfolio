// src/Sections/ExperienceSection/data.js

import React from 'react';
import { Briefcase, Code2, Brain, Eye } from 'lucide-react';
export const experiences = [
  {
    title: "Application Developer",
    company: "Mahindra and Mahindra LTD.",
    duration: "September 2024 - Present",
    location: "Mumbai, India",
    type: "Full-time",
    achievements: [
      "Developed scalable full-stack apps using React.js, Node.js, Python, and REST APIs",
      "Integrated Three.js for interactive 3D data visualizations in the browser",
      "Implemented CI/CD pipelines and automated testing for faster, reliable deployments",
      "Built modular UIs and backend systems, increasing engagement by 30% and data throughput by 40%",
      "Worked cross-functionally to deliver cloud-first features using DevOps best practices"
    ],
    icon: <Briefcase className="w-5 h-5 text-orange-400" />,
    gradient: "from-orange-500/20 to-red-500/20",
    border: "border-orange-400/30"
  },
  {
    title: "Frontend Developer - Intern",
    company: "Mahindra and Mahindra LTD.",
    duration: "July 2023 - July 2024",
    location: "Mumbai, India",
    type: "Internship",
    achievements: [
      "Built responsive UI components with ReactJS, MUI, TailwindCSS, and JavaScript",
      "Created real-time data visualizations, boosting engagement by 30%",
      "Integrated REST APIs and SSE using Python; used Redux for state management",
      "Reduced latency by 25% and improved performance by 30%"
    ],
    icon: <Code2 className="w-5 h-5 text-blue-400" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-400/30"
  },
  {
    title: "Research and Machine Learning Engineer Intern",
    company: "Sunic Technologies",
    duration: "May 2023 - August 2023",
    location: "Noida, India",
    type: "Internship",
    achievements: [
      "Led the development of a high-performance ReactJS Web application, integrating PaddleOCR, resulting in a 50% increase in text recognition accuracy",
      "Designed an intuitive user interface with Figma, enhancing user experience and workflow efficiency",
      "Worked on dataset preparation using Python and enhanced a YOLOv8 object detection model",
      "Improved detection accuracy by 35% and performance by 25% through advanced ML optimization techniques",
      "Collaborated with research teams to implement cutting-edge computer vision solutions"
    ],
    icon: <Brain className="w-5 h-5 text-purple-400" />,
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-400/30"
  },
  {
    title: "Frontend Developer Intern",
    company: "Government of Rajasthan",
    duration: "September 2022 - December 2022",
    location: "Jaipur, India",
    type: "Internship",
    achievements: [
      "Designed and deployed a DAK/Letter management system using ReactJS, Material UI, Bootstrap, and Tailwind CSS, improving inter-departmental communication by 40%",
      "Earned a Letter of Recommendation for expertly integrating AWS S3, which reduced data retrieval times by 50%",
      "Mastered React state management, improving application efficiency and ensuring seamless functionality",
      "Collaborated with government officials to understand requirements and deliver user-friendly solutions"
    ],
    icon: <Eye className="w-5 h-5 text-green-400" />,
    gradient: "from-green-500/20 to-emerald-500/20",
    border: "border-green-400/30"
  }
];

export const technologies = [
  { name: 'React.js', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-cyan-400/30' },
  { name: 'Three.js', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-400/30' },
  { name: 'Python', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-400/30' },
  { name: 'Node.js', color: 'from-green-600/20 to-lime-500/20', border: 'border-lime-400/30' },
  { name: 'GCP', color: 'from-blue-400/20 to-indigo-500/20', border: 'border-blue-400/30' },
  { name: 'YOLOv8', color: 'from-red-500/20 to-orange-500/20', border: 'border-red-400/30' },
  { name: 'PaddleOCR', color: 'from-purple-600/20 to-violet-500/20', border: 'border-purple-400/30' },
  { name: 'Computer Vision', color: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-400/30' }
];
