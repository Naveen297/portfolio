import React, { useState } from 'react';
import { Code, Database, Brain, Cloud, BarChart3, Grid3X3 } from 'lucide-react';

// --- Icon Mapping ---
const iconMap = {
  Code,
  Database,
  Brain,
  Cloud
};

// --- Radar Chart Component (Corrected for Clipping Issues) ---
const RadarChart = ({ data }) => {
  const categories = Object.entries(data);

  // 1. Define a larger canvas and center point to prevent clipping
  const boxSize = 500;
  const centerX = boxSize / 2;
  const centerY = boxSize / 2;
  const radius = 150;
  const levels = 5;

  // Calculate points for the data polygon
  const getPoint = (index, value) => {
    const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
    const r = (value / 10) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle)
    };
  };

  // Get label position, pushed further out for safety
  const getLabelPoint = (index) => {
    const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
    // 2. Increased distance for labels to give them more space
    const r = radius + 65;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle)
    };
  };

  // Create concentric grid circles
  const gridCircles = Array.from({ length: levels }, (_, i) => (
    <circle
      key={`grid-circle-${i}`}
      cx={centerX}
      cy={centerY}
      r={(radius / levels) * (i + 1)}
      fill="none"
      stroke="rgba(99, 102, 241, 0.2)"
      strokeWidth="1"
    />
  ));

  // Create grid lines from center to each category
  const gridLines = categories.map((_, index) => {
    const point = getPoint(index, 10);
    return (
      <line
        key={`grid-line-${index}`}
        x1={centerX}
        y1={centerY}
        x2={point.x}
        y2={point.y}
        stroke="rgba(99, 102, 241, 0.2)"
        strokeWidth="1"
      />
    );
  });

  const skillValues = {
    frontend: 8.5,
    backend: 8.0,
    'ai-ml': 7.5,
    cloud: 7.0
  };

  const dataPoints = categories.map(([key], index) => getPoint(index, skillValues[key] || 0));
  const pathData = `M ${dataPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`;

  return (
    <div className="relative">
      {/* 3. Use the new boxSize for the SVG dimensions */}
      <svg
        width={boxSize}
        height={boxSize}
        className="mx-auto filter drop-shadow-lg"
        viewBox={`0 0 ${boxSize} ${boxSize}`}
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>
          <linearGradient id="dataFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.4)" />
            <stop offset="25%" stopColor="rgba(59, 130, 246, 0.4)" />
            <stop offset="50%" stopColor="rgba(147, 51, 234, 0.4)" />
            <stop offset="75%" stopColor="rgba(236, 72, 153, 0.4)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.4)" />
          </linearGradient>
          <linearGradient id="frontendGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#2563eb" /></linearGradient>
          <linearGradient id="backendGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#0d9488" /></linearGradient>
          <linearGradient id="ai-mlGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" /></linearGradient>
          <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316" /><stop offset="100%" stopColor="#eab308" /></linearGradient>
        </defs>

        {/* Chart Elements */}
        <circle cx={centerX} cy={centerY} r={radius} fill="url(#radarGlow)" />
        {gridCircles}
        {gridLines}
        <path
          d={pathData}
          fill="url(#dataFill)"
          stroke="rgba(34, 211, 238, 0.8)"
          strokeWidth="2"
          className="animate-pulse"
        />
        {dataPoints.map((point, index) => (
          <g key={`data-point-${index}`}>
            <circle cx={point.x} cy={point.y} r="6" fill="rgba(34, 211, 238, 1)" stroke="white" strokeWidth="2" />
            <circle cx={point.x} cy={point.y} r="6" fill="rgba(34, 211, 238, 0.3)" className="animate-ping" />
          </g>
        ))}

        {/* Category Labels and Icons */}
        {categories.map(([key, category], index) => {
          const labelPoint = getLabelPoint(index);
          const IconComponent = iconMap[category.icon];
          return (
            <g key={`label-${key}`} textAnchor="middle">
              <foreignObject x={labelPoint.x - 22} y={labelPoint.y - 50} width="44" height="44">
                <div className="flex justify-center items-center w-full h-full">
                  <div
                    className="flex justify-center items-center w-11 h-11 rounded-full"
                    style={{ background: `url(#${key}Gradient)` }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </foreignObject>
              <text x={labelPoint.x} y={labelPoint.y + 15} className={`text-sm font-semibold fill-current ${category.color}`}>
                {category.title}
              </text>
              <text x={labelPoint.x} y={labelPoint.y + 35} className="text-xs text-gray-400 fill-current">
                {skillValues[key] || 7}/10
              </text>
            </g>
          );
        })}
      </svg>

      {/* Skill Breakdown Section */}
      <div className="grid grid-cols-2 gap-4 mx-auto mt-8 max-w-md">
        {categories.map(([key, category]) => {
          const getBorderClass = (k) => ({'frontend': 'border-cyan-500/30','backend': 'border-green-500/30','ai-ml': 'border-purple-500/30','cloud': 'border-orange-500/30'}[k] || 'border-gray-500/30');
          const getBackgroundClass = (k) => ({'frontend': 'bg-gradient-to-r from-cyan-500/10 to-blue-600/10','backend': 'bg-gradient-to-r from-green-500/10 to-teal-600/10','ai-ml': 'bg-gradient-to-r from-purple-500/10 to-pink-600/10','cloud': 'bg-gradient-to-r from-orange-500/10 to-yellow-600/10'}[k] || 'bg-gray-500/10');
          const getDotClass = (k) => ({'frontend': 'bg-gradient-to-r from-cyan-500 to-blue-600','backend': 'bg-gradient-to-r from-green-500 to-teal-600','ai-ml': 'bg-gradient-to-r from-purple-500 to-pink-600','cloud': 'bg-gradient-to-r from-orange-500 to-yellow-600'}[k] || 'bg-gray-500');
          return (
            <div key={key} className={`p-3 rounded-lg border ${getBorderClass(key)} ${getBackgroundClass(key)}`}>
              <div className="flex gap-2 items-center mb-1">
                <div className={`w-3 h-3 rounded-full ${getDotClass(key)}`}></div>
                <span className="text-sm font-medium text-white">{category.title}</span>
              </div>
              <div className="text-xs text-gray-400">{category.technologies.length} technologies</div>
              <div className={`text-lg font-bold ${category.color}`}>{skillValues[key] || 7}/10</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// --- View Toggle Component ---
const ViewToggle = ({ isRadar, onToggle }) => {
  return (
    <div className="flex justify-center items-center mb-8">
      <div className="relative p-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full border shadow-2xl border-gray-600/50">
        <div
          className={`absolute top-1 w-24 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg transition-all duration-500 ease-out ${isRadar ? 'left-1' : 'left-[100px]'}`}
          style={{ boxShadow: '0 4px 20px rgba(34, 211, 238, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' }}
        />
        <div className="flex relative">
          <button
            onClick={() => onToggle(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 z-10 ${isRadar ? 'font-semibold text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <BarChart3 className={`w-4 h-4 transition-all duration-300 ${isRadar ? 'scale-110' : ''}`} />
            <span className="text-sm">Radar</span>
          </button>
          <button
            onClick={() => onToggle(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 z-10 ${!isRadar ? 'font-semibold text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Grid3X3 className={`w-4 h-4 transition-all duration-300 ${!isRadar ? 'scale-110' : ''}`} />
            <span className="text-sm">Grid</span>
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r rounded-full blur-xl animate-pulse from-cyan-500/20 to-blue-600/20 -z-10"></div>
      </div>
    </div>
  );
};


// --- Grid View Component ---
const GridView = ({ data, gridInView }) => {
  return (
    <div className={`grid gap-8 mx-auto max-w-6xl lg:grid-cols-4 md:grid-cols-2 transition-all duration-700 ease-out ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                      style={{ animationDelay: `${index * 0.1}s` }}
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
  );
};


// --- Main Exported Component ---
const TechStackGrid = ({ titleRef, gridRef, titleInView, gridInView, data }) => {
  const [isRadarView, setIsRadarView] = useState(false);

  return (
    <div className="mb-16 text-center font-geormama">
      <h3
        ref={titleRef}
        className={`mb-8 text-4xl md:text-4xl font-bold text-white transition-all duration-700 ease-out ${titleInView ? 'opacity-100' : 'opacity-0'}`}
      >
        Current Tech Battlefield
      </h3>
      {/* <ViewToggle
        isRadar={isRadarView}
        onToggle={setIsRadarView}
      /> */}
      <div
        ref={gridRef}
        className={`transition-all duration-700 ease-out ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {isRadarView ? (
          <div className="relative">
            <div className="opacity-100 transition-all duration-700 ease-out transform scale-100">
              <RadarChart data={data} />
            </div>
          </div>
        ) : (
          <div className="opacity-100 transition-all duration-700 ease-out transform scale-100">
            <GridView data={data} gridInView={gridInView} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStackGrid;