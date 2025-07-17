import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const SectionHeader = forwardRef(({ inView }, ref) => {
  return (
    <div ref={ref} className="mb-20 text-center">
      <motion.h2 
        className={`text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-4 font-geormama relative transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{
          // Enhanced text shadow for better visibility
          textShadow: `
            0 0 20px rgba(34, 211, 238, 0.8),
            0 0 40px rgba(147, 51, 234, 0.6),
            0 0 60px rgba(168, 85, 247, 0.4)
          `,
          // Fallback gradient with higher contrast
          background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 25%, #8b5cf6 50%, #a855f7 75%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          // Enhanced stroke for definition
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
        }}
        whileHover={{ 
          scale: 1.05,
          textShadow: `
            0 0 30px rgba(34, 211, 238, 1),
            0 0 50px rgba(147, 51, 234, 0.8),
            0 0 70px rgba(168, 85, 247, 0.6)
          `
        }}
        transition={{ duration: 0.3 }}
      >

        
        {/* Additional glow layer for extra visibility */}
        <motion.span
          className="mb-16 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.span>
      </motion.h2>
      
      {/* Enhanced underline with better visibility */}
      <motion.div 
        className="relative w-32 h-1 mx-auto overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Animated shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Additional glow for the line */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 blur-sm opacity-60" />
      </motion.div>
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;