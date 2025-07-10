import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-10 top-20 w-32 h-32 bg-gradient-to-br rounded-full blur-xl from-cyan-500/20 to-blue-500/20 animate-float-slow"></div>
      <div className="absolute right-20 top-40 w-24 h-24 bg-gradient-to-br rounded-full blur-lg from-purple-500/20 to-pink-500/20 animate-float-reverse"></div>
      <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br rounded-full blur-2xl from-green-500/15 to-teal-500/15 animate-float-slow"></div>
    </div>
  );
};

export default BackgroundEffects;