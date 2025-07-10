import React, { forwardRef } from 'react';

const PersonalDescription = forwardRef(({ data, inView }, ref) => {
  return (
    <div
      ref={ref}
      className={`mx-auto max-w-4xl text-center transition-all duration-700 ease-out font-georama ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r rounded-3xl blur-2xl transition-all duration-500 from-cyan-500/10 to-purple-500/10 group-hover:blur-3xl"></div>
        
        <div className="relative p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-2xl border border-gray-600/30 rounded-3xl transition-all duration-500 hover:[transform:translateY(-10px)] hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10">
          <p className="mb-6 text-xl leading-relaxed text-gray-200 transition-colors duration-300 hover:text-white">
            Passionate <span className="font-semibold text-cyan-400">full-stack developer</span> with expertise in building{' '}
            <span className="font-semibold text-purple-400">scalable web applications</span>,{' '}
            <span className="font-semibold text-pink-400">immersive 3D experiences</span>, and{' '}
            <span className="font-semibold text-green-400">intelligent AI/ML solutions</span>. Specialized in React.js ecosystem, Three.js, TensorFlow, and modern cloud-native architectures.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {data.traits.map((trait, index) => (
              <span 
                key={index}
                className={`px-4 py-2 bg-gradient-to-r ${trait.gradient} text-${trait.text.split('-')[1]}-300 rounded-full border ${trait.border} hover:[transform:translateY(-2px)] transition-all duration-300`}
              >
                {trait.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

PersonalDescription.displayName = 'PersonalDescription';

export default PersonalDescription;