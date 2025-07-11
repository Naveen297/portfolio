// src/Sections/ExperienceSection/CSSBackgroundEffects.jsx

import React from 'react';

const CSSBackgroundEffects = () => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-cyan-500/10 animate-spin-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-lg border border-purple-500/10 animate-bounce-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border animate-pulse rotate-45 border-pink-500/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 to-transparent rounded-full blur-3xl animate-pulse bg-gradient-radial from-cyan-500/5"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 to-transparent rounded-full blur-3xl animate-pulse bg-gradient-radial from-purple-500/5"></div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </>
  );
};

export default CSSBackgroundEffects;