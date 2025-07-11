// src/Sections/ExperienceSection/TechShowcase.jsx

import React from 'react';
import { motion } from 'framer-motion';
const TechShowcase = ({ technologies }) => {
    return (
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="mb-6 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Technologies Across My Journey
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className={`px-3 py-2 bg-gradient-to-r ${tech.color} rounded-lg border ${tech.border} backdrop-blur-sm`}
            >
              <span className="text-sm font-semibold text-white">{tech.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };
// const TechShowcase = ({ technologies }) => {
//   return (
//     <motion.div 
//       className="mt-16 text-center"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//     >
//       <h3 className="mb-6 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
//         Technologies Across My Journey
//       </h3>
//       <div className="flex flex-wrap gap-3 justify-center">
//         {technologies.map((tech) => (
//           <div
//             key={tech.name}
//             className={`px-3 py-2 bg-gradient-to-r ${tech.color} rounded-lg border ${tech.border} backdrop-blur-sm`}
//           >
//             <span className="text-sm font-semibold text-white">{tech.name}</span>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

export default TechShowcase;