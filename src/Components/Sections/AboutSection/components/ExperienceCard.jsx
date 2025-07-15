import React, { forwardRef } from 'react';
import { Briefcase } from 'lucide-react';
import MMLogo from '../../../../assets/mm.png';

const ExperienceCard = forwardRef(({ data, inView }, ref) => {
  const { company } = data;
  
  return (
    <div
      ref={ref}
      className={`relative group transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl transition-all duration-500 from-orange-500/20 to-red-500/20 group-hover:blur-2xl"></div>
      
      <div className="relative p-6 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl transition-all duration-500 hover:[transform:perspective(1000px)_rotateX(5deg)_rotateY(-5deg)_translateZ(30px)] [transform-style:preserve-3d] hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/25">
        
        {/* FIXED: Responsive Company Logo - absolute on desktop, relative on mobile */}
        <div className="absolute top-4 right-4 hidden sm:block [transform:translateZ(25px)]">
          <div className="w-28 h-12 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-gray-500/30 hover:[transform:translateZ(10px)_scale(1.1)] transition-all duration-300 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/25">
            <img 
              src={MMLogo} 
              alt="Mahindra Logo" 
              className="object-contain w-full h-full filter brightness-110" 
            />
          </div>
        </div>
        
        <div className="flex gap-4 items-start [transform:translateZ(20px)]">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg hover:[transform:translateZ(10px)_rotateY(-10deg)] transition-all duration-300">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          
          <div className="flex-1">
            {/* ADDED: Mobile logo placement - shows below the main content on mobile */}
            <div className="block mb-3 sm:hidden">
              <div className="p-1 w-20 h-8 rounded-lg border backdrop-blur-sm transition-all duration-300 bg-white/10 border-gray-500/30 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/25">
                <img 
                  src={MMLogo} 
                  alt="Mahindra Logo" 
                  className="object-contain w-full h-full filter brightness-110" 
                />
              </div>
            </div>
            
            <div className="mb-3">
              <h3 className="mb-1 text-xl font-bold text-orange-400 transition-colors duration-300 hover:text-orange-300">
                Current Role
              </h3>
              <p className="font-semibold text-white">{company.role}</p>
              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                {company.name}
              </p>
              <p className="text-sm text-gray-400">
                {company.location} • September 2024 - Present
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs text-orange-300 rounded-full border bg-orange-500/20 border-orange-500/30">
                  {company.type}
                </span>
                <span className="px-2 py-1 text-xs text-red-300 rounded-full border bg-red-500/20 border-red-500/30">
                  {company.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ExperienceCard.displayName = 'ExperienceCard';

export default ExperienceCard;