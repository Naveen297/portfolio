import React, { forwardRef } from 'react';
import { GraduationCap } from 'lucide-react';

const EducationCard = forwardRef(({ data, inView }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative group transition-all duration-700 ease-out delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl transition-all duration-500 from-green-500/20 to-blue-500/20 group-hover:blur-2xl"></div>
      
      <div className="relative p-6 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl transition-all duration-500 hover:[transform:perspective(1000px)_rotateX(-5deg)_rotateY(5deg)_translateZ(30px)] [transform-style:preserve-3d] hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/25">
        
        <div className="flex gap-4 items-start [transform:translateZ(20px)]">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg hover:[transform:translateZ(10px)_rotateY(10deg)] transition-all duration-300">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="mb-1 text-xl font-bold text-green-400 transition-colors duration-300 hover:text-green-300">
                  Education
                </h3>
                <p className="font-semibold text-white">{data.institution}</p>
                <p className="text-sm text-gray-400">{data.duration}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 transition-transform duration-300 hover:scale-110">
                  {data.cgpa}
                </div>
                <div className="text-xs text-gray-400">CGPA</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-300">{data.degree}</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 text-xs text-green-300 rounded-full border bg-green-500/20 border-green-500/30">
                  Bachelor's
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

EducationCard.displayName = 'EducationCard';

export default EducationCard;