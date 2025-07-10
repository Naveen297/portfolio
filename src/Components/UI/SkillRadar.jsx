// ============= Components/SkillRadar.jsx =============
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SkillRadar = ({ skills }) => {
  return (
    <div className="mt-4 w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
          <defs>
            <linearGradient id="skillRadarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0.5}/>
            </linearGradient>
          </defs>
          <PolarGrid stroke="#4a5568" />
          <PolarAngleAxis dataKey="name" tick={{ fill: '#a0aec0', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              borderColor: '#4a5568',
              borderRadius: '0.5rem',
            }}
            cursor={{ stroke: '#22d3ee', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          <Radar 
            name="Proficiency" 
            dataKey="value" 
            stroke="#22d3ee" 
            fill="url(#skillRadarGradient)" 
            fillOpacity={0.7} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadar;