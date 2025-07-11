// import React, { useLayoutEffect, useRef, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { motion } from 'framer-motion';
// import { CheckCircle, Zap, Briefcase, Calendar, MapPin, Brain, Eye, Code2 } from 'lucide-react';
// import * as THREE from 'three';

// gsap.registerPlugin(ScrollTrigger);

// // Your existing 3D components remain the same...
// function FloatingCodeBlock({ position, color, rotationSpeed = 1 }) {
//   const meshRef = useRef();
  
//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     if (meshRef.current) {
//       meshRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0]) * 0.4;
//       meshRef.current.rotation.x = time * rotationSpeed * 0.3;
//       meshRef.current.rotation.y = time * rotationSpeed * 0.5;
//       meshRef.current.rotation.z = Math.sin(time * 0.8) * 0.2;
      
//       const scale = 1 + Math.sin(time * 2) * 0.15;
//       meshRef.current.scale.setScalar(scale);
//     }
//   });

//   return (
//     <mesh ref={meshRef} position={position}>
//       <boxGeometry args={[0.4, 0.4, 0.4]} />
//       <meshStandardMaterial 
//         color={color} 
//         emissive={color} 
//         emissiveIntensity={0.2}
//         transparent 
//         opacity={0.7}
//         roughness={0.3}
//         metalness={0.7}
//       />
//     </mesh>
//   );
// }

// function ExperienceTimeline() {
//   const groupRef = useRef();
  
//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     if (groupRef.current) {
//       groupRef.current.rotation.y = time * 0.1;
//       groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
//     }
//   });

//   const timelinePoints = useMemo(() => {
//     const points = [];
//     for (let i = 0; i < 8; i++) { // Increased for more experiences
//       const y = (i - 3.5) * 1.5;
//       points.push(new THREE.Vector3(0, y, 0));
//     }
//     return points;
//   }, []);

//   return (
//     <group ref={groupRef}>
//       <mesh position={[0, 0, 0]}>
//         <cylinderGeometry args={[0.02, 0.02, 10, 8]} />
//         <meshStandardMaterial 
//           color="#22d3ee" 
//           emissive="#22d3ee" 
//           emissiveIntensity={0.3}
//         />
//       </mesh>
      
//       {timelinePoints.map((point, index) => (
//         <mesh key={index} position={[point.x, point.y, point.z]}>
//           <sphereGeometry args={[0.1, 16, 16]} />
//           <meshStandardMaterial 
//             color={index % 2 === 0 ? "#a855f7" : "#ec4899"} 
//             emissive={index % 2 === 0 ? "#a855f7" : "#ec4899"}
//             emissiveIntensity={0.4}
//           />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// function SkillParticles() {
//   const particlesRef = useRef();
//   const count = 100;
  
//   const positions = useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       positions[i * 3] = (Math.random() - 0.5) * 12;
//       positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
//       positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
//     }
//     return positions;
//   }, []);

//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     if (particlesRef.current) {
//       particlesRef.current.rotation.y = time * 0.05;
      
//       const positions = particlesRef.current.geometry.attributes.position.array;
//       for (let i = 0; i < count; i++) {
//         const i3 = i * 3;
//         positions[i3 + 1] += Math.sin(time + i) * 0.001;
//       }
//       particlesRef.current.geometry.attributes.position.needsUpdate = true;
//     }
//   });

//   return (
//     <points ref={particlesRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={count}
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial 
//         color="#22d3ee" 
//         size={0.03} 
//         transparent 
//         opacity={0.6}
//         sizeAttenuation 
//       />
//     </points>
//   );
// }

// function TechOrbs() {
//   const groupRef = useRef();
  
//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     if (groupRef.current) {
//       groupRef.current.rotation.x = time * 0.2;
//       groupRef.current.rotation.y = time * 0.3;
//     }
//   });

//   const orbPositions = [
//     { pos: [2, 1, 0], color: "#61dafb" }, // React
//     { pos: [-2, -1, 1], color: "#a855f7" }, // Three.js
//     { pos: [0, 2, -1], color: "#10b981" }, // Node.js
//     { pos: [1, -2, 0], color: "#f59e0b" }, // JavaScript
//     { pos: [-1, 1, 1], color: "#3b82f6" }, // Python
//     { pos: [2, -1, -1], color: "#ef4444" }, // ML/AI
//   ];

//   return (
//     <group ref={groupRef}>
//       {orbPositions.map((orb, index) => (
//         <mesh key={index} position={orb.pos}>
//           <icosahedronGeometry args={[0.15, 1]} />
//           <meshStandardMaterial 
//             color={orb.color} 
//             emissive={orb.color} 
//             emissiveIntensity={0.3}
//             transparent 
//             opacity={0.8}
//           />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// function Experience3DScene() {
//   return (
//     <>
//       <ambientLight intensity={0.3} />
//       <pointLight position={[5, 5, 5]} intensity={50} color="#22d3ee" />
//       <pointLight position={[-5, -5, 5]} intensity={30} color="#a855f7" />
//       <pointLight position={[0, 5, -5]} intensity={25} color="#ec4899" />
      
//       <SkillParticles />
//       <ExperienceTimeline />
//       <TechOrbs />
      
//       <FloatingCodeBlock position={[-4, 2, 1]} color="#61dafb" rotationSpeed={0.8} />
//       <FloatingCodeBlock position={[4, -1, -1]} color="#a855f7" rotationSpeed={1.2} />
//       <FloatingCodeBlock position={[-3, -2, 2]} color="#10b981" rotationSpeed={0.9} />
//       <FloatingCodeBlock position={[3, 1, 0]} color="#f59e0b" rotationSpeed={1.1} />
//       <FloatingCodeBlock position={[0, 3, -2]} color="#ec4899" rotationSpeed={0.7} />
//       <FloatingCodeBlock position={[-1, -3, 1]} color="#22d3ee" rotationSpeed={1.3} />
//     </>
//   );
// }

// const ExperienceSection = () => {
//   const sectionRef = useRef(null);
//   const timelineRef = useRef(null);

//   // Updated experiences array with your internship
//   const experiences = [
//     {
//       title: "Application Developer",
//       company: "Mahindra and Mahindra LTD.",
//       duration: "September 2024 - Present",
//       location: "Mumbai, India",
//       type: "Full-time",
//       achievements: [
//         "Developed scalable full-stack apps using React.js, Node.js, Python, and REST APIs",
//         "Integrated Three.js for interactive 3D data visualizations in the browser",
//         "Implemented CI/CD pipelines and automated testing for faster, reliable deployments",
//         "Built modular UIs and backend systems, increasing engagement by 30% and data throughput by 40%",
//         "Worked cross-functionally to deliver cloud-first features using DevOps best practices"
//       ],
//       icon: <Briefcase className="w-5 h-5 text-orange-400" />,
//       gradient: "from-orange-500/20 to-red-500/20",
//       border: "border-orange-400/30"
//     },
//     {
//       title: "Frontend Developer - Intern",
//       company: "Mahindra and Mahindra LTD.",
//       duration: "July 2023 - July 2024",
//       location: "Mumbai, India",
//       type: "Internship",
//       achievements: [
//         "Built responsive UI components with ReactJS, MUI, TailwindCSS, and JavaScript",
//         "Created real-time data visualizations, boosting engagement by 30%",
//         "Integrated REST APIs and SSE using Python; used Redux for state management",
//         "Reduced latency by 25% and improved performance by 30%"
//       ],
//       icon: <Code2 className="w-5 h-5 text-blue-400" />,
//       gradient: "from-blue-500/20 to-cyan-500/20",
//       border: "border-blue-400/30"
//     },
//     {
//       title: "Research and Machine Learning Engineer Intern",
//       company: "Sunic Technologies",
//       duration: "May 2023 - August 2023",
//       location: "Noida, India",
//       type: "Internship",
//       achievements: [
//         "Led the development of a high-performance ReactJS Web application, integrating PaddleOCR, resulting in a 50% increase in text recognition accuracy",
//         "Designed an intuitive user interface with Figma, enhancing user experience and workflow efficiency",
//         "Worked on dataset preparation using Python and enhanced a YOLOv8 object detection model",
//         "Improved detection accuracy by 35% and performance by 25% through advanced ML optimization techniques",
//         "Collaborated with research teams to implement cutting-edge computer vision solutions"
//       ],
//       icon: <Brain className="w-5 h-5 text-purple-400" />,
//       gradient: "from-purple-500/20 to-pink-500/20",
//       border: "border-purple-400/30"
//     },
//     {
//       title: "Frontend Developer Intern",
//       company: "Government of Rajasthan",
//       duration: "September 2022 - December 2022",
//       location: "Jaipur, India",
//       type: "Internship",
//       achievements: [
//         "Designed and deployed a DAK/Letter management system using ReactJS, Material UI, Bootstrap, and Tailwind CSS, improving inter-departmental communication by 40%",
//         "Earned a Letter of Recommendation for expertly integrating AWS S3, which reduced data retrieval times by 50%",
//         "Mastered React state management, improving application efficiency and ensuring seamless functionality",
//         "Collaborated with government officials to understand requirements and deliver user-friendly solutions"
//       ],
//       icon: <Eye className="w-5 h-5 text-green-400" />,
//       gradient: "from-green-500/20 to-emerald-500/20",
//       border: "border-green-400/30"
//     }
//   ];

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.to(timelineRef.current, {
//         scaleY: 1,
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: 'top center',
//           end: 'bottom bottom',
//           scrub: 1,
//         }
//       });

//       const cards = gsap.utils.toArray('.experience-card');
//       cards.forEach(card => {
//         gsap.from(card, {
//           opacity: 0,
//           x: card.classList.contains('timeline-left') ? -100 : 100,
//           duration: 0.8,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: card,
//             start: 'top 80%',
//             toggleActions: 'play none none none',
//           }
//         });
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className="overflow-hidden relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-georama">
      
//       {/* Three.js Background */}
//       <div className="absolute inset-0 opacity-40">
//         <Canvas 
//           camera={{ position: [0, 0, 10], fov: 50 }}
//           style={{ background: 'transparent' }}
//         >
//           <Experience3DScene />
//         </Canvas>
//       </div>

//       {/* Gradient Overlays */}
//       <div className="absolute inset-0 bg-gradient-to-br via-transparent from-gray-900/60 to-gray-900/60"></div>
//       <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r to-transparent from-cyan-500/5"></div>
//       <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l to-transparent from-purple-500/5"></div>
      
//       <div className="container relative z-10 px-6 mx-auto">
        
//         <motion.h2 
//           className="mb-20 text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 md:text-6xl [text-shadow:0_0_20px_rgba(168,85,247,0.4)]"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           My Professional Journey
//         </motion.h2>

//         <div className="relative">
//           {/* The Central Timeline Bar */}
//           <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b -translate-x-1/2 from-cyan-500/30 via-purple-500/30 to-gray-800/30">
//             <div ref={timelineRef} className="w-full h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 transform origin-top scale-y-0"></div>
//           </div>
          
//           <div className="space-y-16">
//             {experiences.map((exp, index) => (
//               <motion.div 
//                 key={index}
//                 className={`experience-card relative flex items-start gap-8 ${index % 2 === 0 ? 'timeline-left flex-row-reverse' : 'timeline-right'}`}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//               >
//                 {/* Enhanced Content Card */}
//                 <div className="w-full md:w-5/12">
//                   <motion.div 
//                     className="relative p-8 bg-gradient-to-br rounded-2xl border backdrop-blur-xl transition-all duration-500 border-gray-700/50 group from-gray-800/80 to-gray-900/80 hover:border-cyan-500/70 hover:shadow-2xl hover:shadow-cyan-500/20"
//                     whileHover={{ 
//                       y: -10,
//                       scale: 1.02,
//                       rotateY: index % 2 === 0 ? 2 : -2
//                     }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     {/* Glowing corner effect */}
//                     <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br rounded-full opacity-0 blur-xl transition-opacity duration-500 from-cyan-500/50 to-purple-500/50 group-hover:opacity-100"></div>
                    
//                     {/* Header Section */}
//                     <div className="mb-6">
//                       <div className="flex gap-3 items-center mb-3">
//                         <div className={`p-2 bg-gradient-to-br ${exp.gradient} rounded-lg border ${exp.border}`}>
//                           {exp.icon}
//                         </div>
//                         <div className="flex gap-2 items-center text-sm font-semibold text-cyan-400">
//                           <Calendar className="w-4 h-4" />
//                           {exp.duration}
//                         </div>
//                         <span className={`px-2 py-1 text-xs rounded-full ${exp.type === 'Full-time' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}>
//                           {exp.type}
//                         </span>
//                       </div>
                      
//                       <h3 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-cyan-300">
//                         {exp.title}
//                       </h3>
                      
//                       <div className="flex gap-2 items-center mb-2">
//                         <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
//                           {exp.company}
//                         </p>
//                       </div>
                      
//                       <div className="flex gap-2 items-center text-gray-400">
//                         <MapPin className="w-4 h-4" />
//                         <span className="text-sm">{exp.location}</span>
//                       </div>
//                     </div>
                    
//                     {/* Achievements */}
//                     <div className="space-y-4">
//                       <h4 className="flex gap-2 items-center text-lg font-semibold text-purple-400">
//                         <Zap className="w-5 h-5" />
//                         Key Achievements
//                       </h4>
//                       <ul className="space-y-3">
//                         {exp.achievements.map((achievement, i) => (
//                           <motion.li 
//                             key={i} 
//                             className="flex gap-3 items-start text-gray-300"
//                             initial={{ opacity: 0, x: -20 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ delay: 0.1 * i }}
//                           >
//                             <CheckCircle className="flex-shrink-0 mt-1 w-5 h-5 text-green-400" />
//                             <span className="leading-relaxed">{achievement}</span>
//                           </motion.li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Tech Stack for current role */}
//                     {index === 0 && (
//                       <div className="pt-6 mt-6 border-t border-gray-600/30">
//                         <h4 className="mb-3 text-sm font-semibold tracking-wide text-gray-400 uppercase">
//                           Current Tech Stack
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                           {['React.js', 'Three.js', 'Python', 'Node.js', 'GCP'].map((tech, i) => (
//                             <motion.span
//                               key={tech}
//                               className="px-3 py-1 text-xs font-semibold text-cyan-300 bg-gradient-to-r rounded-full border from-cyan-500/20 to-purple-500/20 border-cyan-400/30"
//                               whileHover={{ scale: 1.1, y: -2 }}
//                               initial={{ opacity: 0, scale: 0.8 }}
//                               whileInView={{ opacity: 1, scale: 1 }}
//                               transition={{ delay: 0.05 * i }}
//                             >
//                               {tech}
//                             </motion.span>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* ML/AI Tech Stack for Sunic Technologies */}
//                     {index === 2 && (
//                       <div className="pt-6 mt-6 border-t border-gray-600/30">
//                         <h4 className="mb-3 text-sm font-semibold tracking-wide text-gray-400 uppercase">
//                           AI/ML Technologies Used
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                           {['PaddleOCR', 'YOLOv8', 'Python', 'Computer Vision', 'Figma'].map((tech, i) => (
//                             <motion.span
//                               key={tech}
//                               className="px-3 py-1 text-xs font-semibold text-purple-300 bg-gradient-to-r rounded-full border from-purple-500/20 to-pink-500/20 border-purple-400/30"
//                               whileHover={{ scale: 1.1, y: -2 }}
//                               initial={{ opacity: 0, scale: 0.8 }}
//                               whileInView={{ opacity: 1, scale: 1 }}
//                               transition={{ delay: 0.05 * i }}
//                             >
//                               {tech}
//                             </motion.span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </motion.div>
//                 </div>

//                 {/* Enhanced Timeline Node */}
//                 <motion.div 
//                   className="flex absolute top-8 left-1/2 justify-center items-center w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-2 border-cyan-400 shadow-lg -translate-x-1/2 shadow-cyan-500/50"
//                   whileHover={{ scale: 1.2, rotate: 180 }}
//                   transition={{ type: "spring", stiffness: 400 }}
//                 >
//                   <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
//                 </motion.div>
                
//                 <div className="hidden w-5/12 md:block"></div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom Tech Showcase */}
//         <motion.div 
//           className="mt-20 text-center"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//         >
//           <h3 className="mb-8 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
//             Technologies Across My Journey
//           </h3>
//           <div className="flex flex-wrap gap-4 justify-center">
//             {[
//               { name: 'React.js', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-cyan-400/30' },
//               { name: 'Three.js', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-400/30' },
//               { name: 'Python', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-400/30' },
//               { name: 'Node.js', color: 'from-green-600/20 to-lime-500/20', border: 'border-lime-400/30' },
//               { name: 'GCP', color: 'from-blue-400/20 to-indigo-500/20', border: 'border-blue-400/30' },
//               { name: 'YOLOv8', color: 'from-red-500/20 to-orange-500/20', border: 'border-red-400/30' },
//               { name: 'PaddleOCR', color: 'from-purple-600/20 to-violet-500/20', border: 'border-purple-400/30' },
//               { name: 'Computer Vision', color: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-400/30' }
//             ].map((tech, index) => (
//               <motion.div
//                 key={tech.name}
//                 className={`px-4 py-2 bg-gradient-to-r ${tech.color} rounded-lg border ${tech.border} backdrop-blur-sm`}
//                 whileHover={{ scale: 1.1, y: -5 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <span className="text-sm font-semibold text-white">{tech.name}</span>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom Glow Effect */}
//       <div className="absolute bottom-0 left-1/2 w-96 h-32 bg-gradient-to-t to-transparent blur-3xl transform -translate-x-1/2 from-purple-500/10"></div>
//     </section>
//   );
// };

// export default ExperienceSection;

import React, { useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Briefcase, Calendar, MapPin, Brain, Eye, Code2 } from 'lucide-react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Optimized 3D components with reduced complexity
function FloatingCodeBlock({ position, color, rotationSpeed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0]) * 0.3;
      meshRef.current.rotation.y = time * rotationSpeed * 0.4;
      
      const scale = 1 + Math.sin(time * 1.5) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.15}
        transparent 
        opacity={0.6}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  );
}

function ExperienceTimeline() {
  const groupRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.15;
    }
  });

  const timelinePoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const y = (i - 2.5) * 1.2;
      points.push(new THREE.Vector3(0, y, 0));
    }
    return points;
  }, []);

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 8, 6]} />
        <meshStandardMaterial 
          color="#22d3ee" 
          emissive="#22d3ee" 
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {timelinePoints.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial 
            color={index % 2 === 0 ? "#a855f7" : "#ec4899"} 
            emissive={index % 2 === 0 ? "#a855f7" : "#ec4899"}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function SkillParticles() {
  const particlesRef = useRef();
  const count = 60; // Reduced particle count
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.03;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#22d3ee" 
        size={0.025} 
        transparent 
        opacity={0.5}
        sizeAttenuation 
      />
    </points>
  );
}

function TechOrbs() {
  const groupRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
    }
  });

  const orbPositions = [
    { pos: [1.8, 0.8, 0], color: "#61dafb" },
    { pos: [-1.8, -0.8, 0.8], color: "#a855f7" },
    { pos: [0, 1.8, -0.8], color: "#10b981" },
    { pos: [0.8, -1.8, 0], color: "#f59e0b" },
  ];

  return (
    <group ref={groupRef}>
      {orbPositions.map((orb, index) => (
        <mesh key={index} position={orb.pos}>
          <icosahedronGeometry args={[0.12, 1]} />
          <meshStandardMaterial 
            color={orb.color} 
            emissive={orb.color} 
            emissiveIntensity={0.25}
            transparent 
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function Experience3DScene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#22d3ee" />
      <pointLight position={[-4, -4, 4]} intensity={25} color="#a855f7" />
      
      <SkillParticles />
      <ExperienceTimeline />
      <TechOrbs />
      
      <FloatingCodeBlock position={[-3, 1.5, 0.8]} color="#61dafb" rotationSpeed={0.7} />
      <FloatingCodeBlock position={[3, -0.8, -0.8]} color="#a855f7" rotationSpeed={1.0} />
      <FloatingCodeBlock position={[-2.5, -1.5, 1.5]} color="#10b981" rotationSpeed={0.8} />
      <FloatingCodeBlock position={[2.5, 0.8, 0]} color="#f59e0b" rotationSpeed={0.9} />
    </>
  );
}

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const experiences = [
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

  // Optimized scroll trigger setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simplified timeline animation
      gsap.to(timelineRef.current, {
        scaleY: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        }
      });

      // Batch card animations for better performance
      const cards = gsap.utils.toArray('.experience-card');
      cards.forEach((card, index) => {
        gsap.set(card, { 
          opacity: 0, 
          y: 50,
          x: card.classList.contains('timeline-left') ? -30 : 30
        });
        
        gsap.to(card, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      });

      // Optimize scroll trigger refresh
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Optimized card component with reduced motion complexity
  const ExperienceCard = useCallback(({ exp, index }) => (
    <motion.div 
      className={`experience-card relative flex items-start gap-8 ${index % 2 === 0 ? 'timeline-left flex-row-reverse' : 'timeline-right'}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full md:w-5/12">
        <motion.div 
          className="relative p-6 bg-gradient-to-br rounded-2xl border backdrop-blur-xl transition-all duration-300 border-gray-700/50 group from-gray-800/90 to-gray-900/90 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10"
          whileHover={{ 
            y: -5,
            scale: 1.01,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Simplified header */}
          <div className="mb-5">
            <div className="flex gap-3 items-center mb-3">
              <div className={`p-2 bg-gradient-to-br ${exp.gradient} rounded-lg border ${exp.border}`}>
                {exp.icon}
              </div>
              <div className="flex gap-2 items-center text-sm font-semibold text-cyan-400">
                <Calendar className="w-4 h-4" />
                {exp.duration}
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${exp.type === 'Full-time' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}>
                {exp.type}
              </span>
            </div>
            
            <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
              {exp.title}
            </h3>
            
            <p className="mb-2 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              {exp.company}
            </p>
            
            <div className="flex gap-2 items-center text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{exp.location}</span>
            </div>
          </div>
          
          {/* Simplified achievements */}
          <div className="space-y-3">
            <h4 className="flex gap-2 items-center text-lg font-semibold text-purple-400">
              <Zap className="w-5 h-5" />
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="flex gap-3 items-start text-gray-300">
                  <CheckCircle className="flex-shrink-0 mt-1 w-4 h-4 text-green-400" />
                  <span className="text-sm leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stacks */}
          {index === 0 && (
            <div className="pt-4 mt-4 border-t border-gray-600/30">
              <h4 className="mb-3 text-sm font-semibold tracking-wide text-gray-400 uppercase">
                Current Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Three.js', 'Python', 'Node.js', 'GCP'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-semibold text-cyan-300 bg-gradient-to-r rounded-full border from-cyan-500/20 to-purple-500/20 border-cyan-400/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {index === 2 && (
            <div className="pt-4 mt-4 border-t border-gray-600/30">
              <h4 className="mb-3 text-sm font-semibold tracking-wide text-gray-400 uppercase">
                AI/ML Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {['PaddleOCR', 'YOLOv8', 'Python', 'Computer Vision', 'Figma'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-semibold text-purple-300 bg-gradient-to-r rounded-full border from-purple-500/20 to-pink-500/20 border-purple-400/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Simplified timeline node */}
      <div className="flex absolute top-6 left-1/2 justify-center items-center w-6 h-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-2 border-cyan-400 shadow-lg -translate-x-1/2 shadow-cyan-500/30">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="hidden w-5/12 md:block"></div>
    </motion.div>
  ), []);

  return (
    <section ref={sectionRef} className="overflow-hidden relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-georama">
      
      {/* Optimized Three.js Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }}
          style={{ background: 'transparent' }}
          performance={{ min: 0.5 }}
          frameloop="demand"
        >
          <Experience3DScene />
        </Canvas>
      </div>

      {/* Simplified gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br via-transparent from-gray-900/70 to-gray-900/70"></div>
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r to-transparent from-cyan-500/5"></div>
      <div className="absolute right-0 bottom-0 w-1/4 h-full bg-gradient-to-l to-transparent from-purple-500/5"></div>
      
      <div className="container relative z-10 px-6 mx-auto">
        
        <motion.h2 
          className="mb-16 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Professional Journey
        </motion.h2>

        <div className="relative">
          {/* The Central Timeline Bar */}
          <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b -translate-x-1/2 from-cyan-500/30 via-purple-500/30 to-gray-800/30">
            <div ref={timelineRef} className="w-full h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 transform origin-top scale-y-0"></div>
          </div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>

        {/* Simplified bottom tech showcase */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-6 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Technologies Across My Journey
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { name: 'React.js', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-cyan-400/30' },
              { name: 'Three.js', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-400/30' },
              { name: 'Python', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-400/30' },
              { name: 'Node.js', color: 'from-green-600/20 to-lime-500/20', border: 'border-lime-400/30' },
              { name: 'GCP', color: 'from-blue-400/20 to-indigo-500/20', border: 'border-blue-400/30' },
              { name: 'YOLOv8', color: 'from-red-500/20 to-orange-500/20', border: 'border-red-400/30' },
              { name: 'PaddleOCR', color: 'from-purple-600/20 to-violet-500/20', border: 'border-purple-400/30' },
              { name: 'Computer Vision', color: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-400/30' }
            ].map((tech) => (
              <div
                key={tech.name}
                className={`px-3 py-2 bg-gradient-to-r ${tech.color} rounded-lg border ${tech.border} backdrop-blur-sm`}
              >
                <span className="text-sm font-semibold text-white">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;