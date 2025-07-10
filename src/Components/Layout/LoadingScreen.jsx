// ============= 5. Components/LoadingScreen.jsx =============
import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="overflow-hidden fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex absolute inset-0 justify-center items-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 animate-spin border-t-cyan-500 border-r-purple-500 border-b-pink-500 border-l-blue-500"></div>
          <div className="flex absolute inset-0 justify-center items-center">
            <Sparkles className="w-5 h-5 text-cyan-500 animate-pulse" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-20 left-1/2 text-center transform -translate-x-1/2">
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse">
          Naveen Malhotra
        </div>
        <div className="mt-2 text-sm text-gray-400">
          Loading Portfolio...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;