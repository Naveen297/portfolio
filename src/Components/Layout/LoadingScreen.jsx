import React, { useEffect, useRef } from 'react';
import { Sparkles, Code, Palette, Cpu } from 'lucide-react';
import { animate, createScope, createSpring, stagger } from 'animejs';

const LoadingScreen = () => {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      
      // Main container fade in
      animate('.loading-container', {
        opacity: [0, 1],
        duration: 1000,
        ease: 'out(2)'
      });

      // Floating orbs animation
      animate('.floating-orb', {
        translateY: [
          { to: -20, duration: 2000 },
          { to: 20, duration: 2000 }
        ],
        translateX: [
          { to: -15, duration: 1500 },
          { to: 15, duration: 1500 }
        ],
        scale: [
          { to: 1.1, duration: 1000 },
          { to: 0.9, duration: 1000 }
        ],
        opacity: [
          { to: 0.8, duration: 1500 },
          { to: 0.3, duration: 1500 }
        ],
        loop: true,
        alternate: true,
        ease: 'inOut(2)',
        delay: stagger(200)
      });

      // Name animation with stagger effect
      animate('.name-letter', {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.8, 1],
        duration: 800,
        delay: stagger(100, { from: 'first', start: 500 }),
        ease: createSpring({ stiffness: 300, damping: 25 })
      });

      // Rotating spinner with multiple layers
      animate('.spinner-outer', {
        rotate: 360,
        duration: 3000,
        loop: true,
        ease: 'linear'
      });

      animate('.spinner-inner', {
        rotate: -360,
        duration: 2000,
        loop: true,
        ease: 'linear'
      });

      // Pulsing center icon
      animate('.center-icon', {
        scale: [1, 1.3, 1],
        opacity: [0.7, 1, 0.7],
        duration: 2000,
        loop: true,
        ease: 'inOut(2)'
      });

      // Floating particles
      animate('.particle', {
        translateY: [
          { to: -100, duration: 3000 },
          { to: 100, duration: 3000 }
        ],
        translateX: [
          { to: -50, duration: 2000 },
          { to: 50, duration: 2000 }
        ],
        opacity: [
          { to: 0, duration: 1000 },
          { to: 1, duration: 1000 },
          { to: 0, duration: 1000 }
        ],
        scale: [
          { to: 0, duration: 1000 },
          { to: 1, duration: 1000 },
          { to: 0, duration: 1000 }
        ],
        loop: true,
        delay: stagger(500),
        ease: 'inOut(2)'
      });

      // Icon orbit animation
      animate('.orbit-icon', {
        rotate: 360,
        duration: 8000,
        loop: true,
        ease: 'linear'
      });

      // Loading text animation
      animate('.loading-text', {
        opacity: [0.5, 1, 0.5],
        duration: 1500,
        loop: true,
        ease: 'inOut(2)',
        delay: 1000
      });

      // Progress bar animation
      animate('.progress-bar', {
        scaleX: [0, 1],
        duration: 4000,
        loop: true,
        ease: 'inOut(3)',
        delay: 500,
        transformOrigin: 'left center'
      });

      // Corner decorations entrance
      animate('.corner-decoration', {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        delay: stagger(150, { from: 'first', start: 1200 }),
        ease: createSpring({ stiffness: 400, damping: 30 })
      });

      // Sparkle effects
      animate('.sparkle-effect', {
        scale: [0, 1, 0],
        rotate: [0, 180, 360],
        opacity: [0, 1, 0],
        duration: 2000,
        loop: true,
        delay: stagger(300),
        ease: 'inOut(3)'
      });

    });

    // Cleanup function
    return () => scope.current?.revert();
  }, []);

  return (
    <div ref={root}>
      <div 
        className="overflow-hidden fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 loading-container"
        style={{ opacity: 0 }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Sparkle effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute sparkle-effect"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
            >
              <Sparkles className="w-3 h-3 text-cyan-300" />
            </div>
          ))}
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r rounded-full blur-xl floating-orb from-cyan-500/20 to-purple-500/20" />
          <div className="absolute right-32 bottom-32 w-24 h-24 bg-gradient-to-r rounded-full blur-xl floating-orb from-pink-500/20 to-blue-500/20" />
          <div className="absolute left-10 top-1/2 w-16 h-16 bg-gradient-to-r rounded-full blur-xl floating-orb from-purple-500/20 to-cyan-500/20" />
          <div className="absolute bottom-20 left-1/2 w-20 h-20 bg-gradient-to-r rounded-full blur-xl floating-orb from-blue-500/20 to-pink-500/20" />
        </div>

        {/* Main loading spinner */}
        <div className="flex absolute inset-0 justify-center items-center">
          <div className="relative">
            {/* Outer spinning ring */}
            <div className="w-32 h-32 rounded-full border-4 border-transparent opacity-80 spinner-outer border-t-cyan-500 border-r-purple-500 border-b-pink-500 border-l-blue-500"></div>
            
            {/* Inner counter-rotating ring */}
            <div className="absolute inset-2 w-28 h-28 rounded-full border-2 border-transparent opacity-60 spinner-inner border-t-purple-400 border-r-cyan-400 border-b-blue-400 border-l-pink-400"></div>
            
            {/* Center icon */}
            <div className="flex absolute inset-0 justify-center items-center center-icon">
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>

            {/* Orbiting icons */}
            <div className="flex absolute inset-0 justify-center items-center orbit-icon">
              <div className="relative w-40 h-40">
                <Code className="absolute top-0 left-1/2 w-5 h-5 text-purple-400 transform -translate-x-1/2" />
                <Palette className="absolute right-0 top-1/2 w-5 h-5 text-cyan-400 transform -translate-y-1/2" />
                <Cpu className="absolute bottom-0 left-1/2 w-5 h-5 text-pink-400 transform -translate-x-1/2" />
                <Sparkles className="absolute left-0 top-1/2 w-5 h-5 text-blue-400 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Name with letter-by-letter animation */}
        <div className="absolute bottom-32 left-1/2 text-center transform -translate-x-1/2">
          <div className="mb-4 text-4xl font-bold">
            {['N', 'a', 'v', 'e', 'e', 'n', ' ', 'M', 'a', 'l', 'h', 'o', 't', 'r', 'a'].map((letter, index) => (
              <span
                key={index}
                className={`name-letter inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 ${
                  letter === ' ' ? 'w-2' : ''
                }`}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
          
          <div className="mb-4 text-lg text-gray-300 loading-text">
            Crafting Digital Experiences...
          </div>

          {/* Progress bar */}
          <div className="overflow-hidden mx-auto w-64 h-1 bg-gray-700 rounded-full">
            <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full origin-left progress-bar"></div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-16 h-16 rounded-tl-lg border-t-2 border-l-2 corner-decoration border-cyan-500/30"></div>
        <div className="absolute top-4 right-4 w-16 h-16 rounded-tr-lg border-t-2 border-r-2 corner-decoration border-purple-500/30"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 rounded-bl-lg border-b-2 border-l-2 corner-decoration border-pink-500/30"></div>
        <div className="absolute right-4 bottom-4 w-16 h-16 rounded-br-lg border-r-2 border-b-2 corner-decoration border-blue-500/30"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;