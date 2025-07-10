import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import NMImg from '../../../../assets/NM.jpg';

const ProfileCard = forwardRef(({ data, inView }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative group transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r rounded-3xl blur-xl transition-all duration-500 animate-pulse from-cyan-500/20 to-purple-500/20 group-hover:blur-2xl"></div>
      
      <div className="relative p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-3xl transition-all duration-500 hover:[transform:perspective(1000px)_rotateX(5deg)_rotateY(-5deg)_translateZ(50px)] [transform-style:preserve-3d] hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/25">
        
        {/* Profile Image Section */}
        <div className="text-center mb-8 [transform:translateZ(30px)]">
          <div className="inline-block relative">
            <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-110 [transform:translateZ(20px)] overflow-hidden">
              <img 
                src={NMImg} 
                alt={data.name} 
                className="object-cover w-full h-full rounded-full" 
              />
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-3 h-3 bg-cyan-400 rounded-full opacity-70 animate-float-slow"></div>
            <div className="absolute -bottom-2 -right-6 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-float-reverse"></div>
            <div className="absolute top-8 -right-8 w-4 h-4 bg-pink-400 rounded-full opacity-50 animate-float-slow"></div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-6 [transform:translateZ(20px)]">
          <div className="text-center">
            <h3 className="mb-2 text-2xl font-bold text-white transition-colors duration-300 hover:text-cyan-400">
              {data.name}
            </h3>
            <p className="mb-4 font-semibold text-cyan-400">{data.role}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 hover:[transform:translateZ(10px)] transition-all duration-300 hover:border-cyan-400/50">
              <div className="mb-1 text-2xl font-bold text-cyan-400">{data.stats.LIVE_SYSTEMS}</div>
              <div className="text-sm text-gray-300">Live Systems</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 hover:[transform:translateZ(10px)] transition-all duration-300 hover:border-purple-400/50">
              <div className="mb-1 text-2xl font-bold text-purple-400">{data.stats.PROJECTS}</div>
              <div className="text-sm text-gray-300">Projects</div>
            </div>
          </div>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {data.skills.map((skill, index) => (
              <span 
                key={skill}
                className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 rounded-full border border-gray-500/50 hover:border-cyan-400/50 hover:[transform:translateZ(5px)_scale(1.1)] transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;