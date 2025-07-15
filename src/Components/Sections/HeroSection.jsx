import React, { useEffect, useRef } from 'react';
import { Download, Github, Linkedin, Mail, ChevronDown, Code, Phone } from 'lucide-react';

const HeroSection = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    const loadScripts = () => {
      return new Promise((resolve, reject) => {
        if (window.VANTA && window.VANTA.RINGS) {
          return resolve();
        }
        
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        document.head.appendChild(threeScript);

        threeScript.onload = () => {
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.rings.min.js';
          document.head.appendChild(vantaScript);
          vantaScript.onload = resolve;
          vantaScript.onerror = reject;
        };
        threeScript.onerror = reject;
      });
    };

    loadScripts().then(() => {
      if (vantaRef.current && !vantaEffect.current) {
        vantaEffect.current = window.VANTA.RINGS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x00ffff,
          backgroundColor: 0x0f0f23,
        });
      }
    }).catch(error => console.error("Failed to load Vanta scripts:", error));

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  // --- NEW: Function to handle downloading the resume from Google Drive ---
  const handleDownload = () => {
    // This URL is structured to trigger a direct download from Google Drive
    const driveUrl = 'https://drive.google.com/uc?export=download&id=1ttUnYl-Sw0rX8cVO_FB66ygPuUdghe6m';
    window.open(driveUrl, '_blank');
  };

  return (
    <section className="flex relative justify-center items-center pt-20 min-h-screen">
      <div 
        ref={vantaRef}
        className="absolute inset-0 z-0"
        style={{ minHeight: '100vh', minWidth: '100vw' }}
      />
      
      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid gap-12 items-center lg:grid-cols-2">
          <div className="text-center lg:text-left animate-fade-in-up">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-lg md:text-5xl lg:text-6xl font-geormama">
              Naveen Malhotra
            </h1>
            
            <div className="flex flex-wrap gap-2 justify-center mb-6 lg:justify-start font-geormama">
              <span className="px-4 py-2 text-sm font-semibold text-cyan-200 rounded-full border shadow-lg backdrop-blur-md bg-cyan-500/30 border-cyan-400/50">
                Full Stack Developer
              </span>
              <span className="px-4 py-2 text-sm font-semibold text-purple-200 rounded-full border shadow-lg backdrop-blur-md bg-purple-500/30 border-purple-400/50">
                3D Web Developer
              </span>
            </div>
            
            <p className="mb-8 text-lg text-gray-100 drop-shadow-md md:text-xl font-geormama">
              Building immersive web experiences with cutting-edge technologies. 
            </p>
            
            <div className="flex flex-col gap-4 items-center sm:flex-row lg:justify-start font-geormama">
              <button
                // --- UPDATED: onClick now uses the new download handler ---
                onClick={handleDownload}
                className="flex gap-2 items-center px-8 py-4 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 border-cyan-400/30"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </button>
              
              <div className="flex space-x-4">
                <a
                  href="https://github.com/Naveen297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full border backdrop-blur-md transition-all duration-300 border-gray-500/50 bg-gray-800/60 hover:border-cyan-400 hover:scale-125 hover:shadow-xl hover:shadow-cyan-500/25"
                >
                  <Github className="w-6 h-6 text-gray-200" />
                </a>
                <a
                  href="https://linkedin.com/in/naveenmalhotra148"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full border backdrop-blur-md transition-all duration-300 border-gray-500/50 bg-gray-800/60 hover:border-blue-400 hover:scale-125 hover:shadow-xl hover:shadow-blue-500/25"
                >
                  <Linkedin className="w-6 h-6 text-gray-200" />
                </a>
                <a
                  href="mailto:naveenmalhotra148@gmail.com"
                  className="p-4 rounded-full border backdrop-blur-md transition-all duration-300 border-gray-500/50 bg-gray-800/60 hover:border-purple-400 hover:scale-125 hover:shadow-xl hover:shadow-purple-500/25"
                >
                  <Mail className="w-6 h-6 text-gray-200" />
                </a>
                <a
                  href="tel:6386048691"
                  className="p-4 rounded-full border backdrop-blur-md transition-all duration-300 border-gray-500/50 bg-gray-800/60 hover:border-green-400 hover:scale-125 hover:shadow-xl hover:shadow-green-500/25"
                >
                  <Phone className="w-6 h-6 text-gray-200" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center lg:justify-end">
            <div className="relative">
              <div className="w-72 h-72 rounded-full border backdrop-blur-sm animate-pulse border-cyan-400/30"></div>
              <div className="absolute top-8 left-8 w-56 h-56 rounded-full border animate-spin border-purple-400/20" style={{animationDuration: '25s'}}></div>
              <div className="absolute top-16 left-16 w-40 h-40 rounded-full border animate-spin border-pink-400/20" style={{animationDuration: '20s', animationDirection: 'reverse'}}></div>
              
              <div className="absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2">
                <div className="p-6 bg-gradient-to-br rounded-full border backdrop-blur-md from-cyan-500/20 to-purple-500/20 border-white/20">
                  <Code className="mx-auto mb-2 w-12 h-12 text-cyan-300" />
                  <p className="text-sm font-semibold text-white font-geormama">Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FIXED: Enhanced centering for ChevronDown with better mobile support */}
      <div className="flex absolute right-0 left-0 bottom-10 z-10 justify-center animate-bounce">
        <div className="p-2 rounded-full border backdrop-blur-md bg-cyan-500/20 border-cyan-400/30">
          <ChevronDown className="w-6 h-6 text-cyan-300" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;