// ============= 3. Components/GlowingLogo.jsx =============
import React from 'react';
import { Sparkles } from 'lucide-react';

const GlowingLogo = () => (
  <span className="flex justify-center items-center mr-4 glowing-logo">
    <Sparkles className="w-8 h-8" />
  </span>
);

export default GlowingLogo;