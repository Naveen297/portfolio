import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const SectionHeader = forwardRef(({ inView }, ref) => {
  return (
    <div ref={ref} className="mb-20 text-center">
      <motion.h2 
        className={`text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4 transform hover:scale-105 transition-all duration-500 [text-shadow:0_0_30px_rgba(34,211,238,0.5)] font-geormama transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        About Me
      </motion.h2>
      <div className="mx-auto w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;