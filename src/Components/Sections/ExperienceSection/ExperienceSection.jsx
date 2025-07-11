// src/Sections/ExperienceSection/index.jsx

import React, { useLayoutEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Import the refactored components and data
import { experiences, technologies } from './data';
import Experience3DScene from './Experience3DScene';
import ExperienceCard from './ExperienceCard';
import TechShowcase from './TechShowcase';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

      const cards = gsap.utils.toArray('.experience-card');
      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 50, x: card.classList.contains('timeline-left') ? -30 : 30 });
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

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-georama">
      
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
          <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b -translate-x-1/2 from-cyan-500/30 via-purple-500/30 to-gray-800/30">
            <div ref={timelineRef} className="w-full h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 transform origin-top scale-y-0"></div>
          </div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.title} exp={exp} index={index} />
            ))}
          </div>
        </div>

        <TechShowcase technologies={technologies} />
      </div>
    </section>
  );
};

export default ExperienceSection;