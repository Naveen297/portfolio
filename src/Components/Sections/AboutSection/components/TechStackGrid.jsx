import React from 'react';
import { Code, Database, Brain, Cloud } from 'lucide-react';

const iconMap = {
  Code,
  Database,
  Brain,
  Cloud
};

const TechStackGrid = ({ titleRef, gridRef, titleInView, gridInView, data }) => {
  return (
    <div className="mb-16 text-center font-geormama">
      <h3
        ref={titleRef}
        className={`mb-8 text-4xl md:text-4xl font-bold text-white transition-all duration-700 ease-out ${titleInView ? 'opacity-100' : 'opacity-0'}`}
      >
        Current Tech Battlefield
      </h3>
      
      <div
        ref={gridRef}
        className={`grid gap-8 mx-auto max-w-6xl lg:grid-cols-4 md:grid-cols-2 transition-all duration-700 ease-out ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {Object.entries(data).map(([key, category]) => {
          const IconComponent = iconMap[category.icon] || Code;
          
          return (
            <div key={key} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl transition-all duration-500 ${category.gradient.replace('to-', 'to-').replace('from-', 'from-')}/20 group-hover:blur-2xl`}></div>
              
              <div className="relative p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl transition-all duration-500 hover:[transform:perspective(1000px)_rotateY(-10deg)_translateZ(40px)] [transform-style:preserve-3d] hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/25">
                <div className="[transform:translateZ(30px)]">
                  <div className={`p-4 bg-gradient-to-br ${category.gradient} rounded-2xl mb-6 inline-block shadow-xl hover:[transform:translateZ(20px)_rotateX(10deg)] transition-all duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <h4 className={`mb-4 text-xl font-bold ${category.color} transition-colors duration-300 hover:text-cyan-300`}>
                    {category.title}
                  </h4>
                  
                  <div className="space-y-3">
                    {category.technologies.map((tech, index) => (
                      <div 
                        key={tech} 
                        className={`p-2 text-gray-300 rounded-lg transition-all duration-300 cursor-pointer bg-gray-700/50 hover:bg-cyan-500/20 hover:text-cyan-300 hover:[transform:translateZ(5px)]`}
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStackGrid;
        