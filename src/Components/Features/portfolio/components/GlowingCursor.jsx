import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const GlowingCursor = () => {
  // State to hold the mouse position
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  // Spring animation for smooth movement
  const springConfig = { damping: 25, stiffness: 300, restDelta: 0.001 };
  const cursorX = useSpring(mousePosition.x, springConfig);
  const cursorY = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    // Function to update mouse position
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* The main motion div that follows the cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          // Centering the dot on the cursor
          x: '-50%',
          y: '-50%',
        }}
        // Initial animation state
        initial={{ scale: 0, opacity: 0 }}
        // Animate to the final state
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* The glowing effect (outer, blurred div) */}
        <div 
          className="absolute w-12 h-12 bg-cyan-300 rounded-full"
          style={{
            filter: 'blur(20px)', // This creates the glow!
          }}
        />

        {/* The core dot (inner, solid div) */}
        <div 
          className="relative top-5 left-5 w-2 h-2 bg-cyan-100 rounded-full"
        />
      </motion.div>

      {/* Global styles to hide the default system cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default GlowingCursor;