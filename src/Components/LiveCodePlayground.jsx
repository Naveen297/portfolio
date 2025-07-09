import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Share2, 
  Code, 
  Eye, 
  Zap,
  Palette,
  Sliders,
  Monitor,
  ArrowLeft
} from 'lucide-react';
import * as THREE from 'three';

// Interactive 3D Components
function RotatingCube({ color, speed, scale }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * speed;
      meshRef.current.rotation.y = time * speed * 0.8;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function FloatingSpheres({ count, colors }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, Math.sin(angle * 3) * 2, z]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color={colors[i % colors.length]} />
          </mesh>
        );
      })}
    </group>
  );
}

function WaveGeometry({ amplitude, frequency, speed }) {
  const meshRef = useRef();
  const geometryRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (geometryRef.current) {
      const positions = geometryRef.current.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        positions[i + 1] = Math.sin(x * frequency + time * speed) * amplitude + 
                          Math.sin(z * frequency + time * speed * 0.5) * amplitude * 0.5;
      }
      geometryRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry ref={geometryRef} args={[10, 10, 50, 50]} />
      <meshStandardMaterial color="#3B82F6" wireframe />
    </mesh>
  );
}

function ParticleSystem({ particleCount, spread }) {
  const pointsRef = useRef();
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return pos;
  }, [particleCount, spread]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.x = time * 0.1;
      pointsRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#10B981" size={0.1} />
    </points>
  );
}

// Code Editor Component
const CodeEditor = ({ code, onChange, language = 'javascript' }) => {
  return (
    <div className="relative">
      <div className="flex gap-2 items-center mb-2">
        <Code className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-semibold text-cyan-400">{language}</span>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="p-4 w-full h-64 font-mono text-sm text-green-300 bg-gray-900 rounded-lg border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
        placeholder="// Your Three.js code here..."
        spellCheck={false}
      />
    </div>
  );
};

// Demo Templates
const demoTemplates = {
  cube: {
    name: "Rotating Cube",
    description: "Interactive spinning cube with customizable properties",
    component: RotatingCube,
    controls: {
      color: { type: 'color', default: '#3B82F6', label: 'Color' },
      speed: { type: 'range', default: 1, min: 0, max: 3, step: 0.1, label: 'Speed' },
      scale: { type: 'range', default: 1, min: 0.5, max: 2, step: 0.1, label: 'Scale' }
    },
    code: `function RotatingCube({ color, speed, scale }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * speed;
      meshRef.current.rotation.y = time * speed * 0.8;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}`
  },
  spheres: {
    name: "Floating Spheres",
    description: "Orbiting spheres with customizable count and colors",
    component: FloatingSpheres,
    controls: {
      count: { type: 'range', default: 8, min: 3, max: 15, step: 1, label: 'Count' },
      colors: { type: 'colorArray', default: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'], label: 'Colors' }
    },
    code: `function FloatingSpheres({ count, colors }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, Math.sin(angle * 3) * 2, z]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color={colors[i % colors.length]} />
          </mesh>
        );
      })}
    </group>
  );
}`
  },
  wave: {
    name: "Wave Animation",
    description: "Animated wave geometry with physics simulation",
    component: WaveGeometry,
    controls: {
      amplitude: { type: 'range', default: 1, min: 0.1, max: 3, step: 0.1, label: 'Amplitude' },
      frequency: { type: 'range', default: 0.5, min: 0.1, max: 2, step: 0.1, label: 'Frequency' },
      speed: { type: 'range', default: 2, min: 0.1, max: 5, step: 0.1, label: 'Speed' }
    },
    code: `function WaveGeometry({ amplitude, frequency, speed }) {
  const meshRef = useRef();
  const geometryRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (geometryRef.current) {
      const positions = geometryRef.current.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        positions[i + 1] = Math.sin(x * frequency + time * speed) * amplitude + 
                          Math.sin(z * frequency + time * speed * 0.5) * amplitude * 0.5;
      }
      geometryRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry ref={geometryRef} args={[10, 10, 50, 50]} />
      <meshStandardMaterial color="#3B82F6" wireframe />
    </mesh>
  );
}`
  },
  particles: {
    name: "Particle System",
    description: "Interactive particle cloud with customizable density",
    component: ParticleSystem,
    controls: {
      particleCount: { type: 'range', default: 1000, min: 100, max: 5000, step: 100, label: 'Count' },
      spread: { type: 'range', default: 10, min: 5, max: 20, step: 1, label: 'Spread' }
    },
    code: `function ParticleSystem({ particleCount, spread }) {
  const pointsRef = useRef();
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return pos;
  }, [particleCount, spread]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.x = time * 0.1;
      pointsRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#10B981" size={0.1} />
    </points>
  );
}`
  }
};

const LiveCodePlayground = () => {
  const [selectedDemo, setSelectedDemo] = useState('cube');
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [controls, setControls] = useState({});

  // Initialize controls with default values
  useEffect(() => {
    const demo = demoTemplates[selectedDemo];
    const initialControls = {};
    Object.entries(demo.controls).forEach(([key, config]) => {
      initialControls[key] = config.default;
    });
    setControls(initialControls);
  }, [selectedDemo]);

  const handleControlChange = (key, value) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    const demo = demoTemplates[selectedDemo];
    const resetControls = {};
    Object.entries(demo.controls).forEach(([key, config]) => {
      resetControls[key] = config.default;
    });
    setControls(resetControls);
  };

  const exportCode = () => {
    const demo = demoTemplates[selectedDemo];
    const blob = new Blob([demo.code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${demo.name.replace(/\s+/g, '-').toLowerCase()}.js`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareDemo = () => {
    const shareData = {
      demo: selectedDemo,
      controls: controls
    };
    const encoded = btoa(JSON.stringify(shareData));
    const url = `${window.location.origin}/playground?data=${encoded}`;
    navigator.clipboard.writeText(url);
    // You could show a toast notification here
    alert('Share link copied to clipboard!');
  };

  const currentDemo = demoTemplates[selectedDemo];
  const DemoComponent = currentDemo.component;

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="p-6 border-b backdrop-blur-xl border-gray-700/50 bg-gray-900/95">
        <div className="container mx-auto">
          <div className="flex gap-4 justify-between items-center">
            <div className="flex gap-4 items-center">
              <button
                onClick={() => window.history.back()}
                className="flex gap-2 items-center px-4 py-2 text-gray-300 rounded-lg transition-colors hover:text-cyan-400 hover:bg-gray-800/50"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </button>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Live Code Playground
                </h1>
                <p className="text-gray-400">Interactive Three.js experiments</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex gap-2 items-center px-4 py-2 bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={handleReset}
                className="flex gap-2 items-center px-4 py-2 bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={exportCode}
                className="flex gap-2 items-center px-4 py-2 bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={shareDemo}
                className="flex gap-2 items-center px-4 py-2 bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container p-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Demo Selection */}
          <div className="lg:col-span-1">
            <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold">
              <Zap className="w-5 h-5 text-yellow-400" />
              Demos
            </h3>
            <div className="space-y-2">
              {Object.entries(demoTemplates).map(([key, demo]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDemo(key)}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                    selectedDemo === key
                      ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                      : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-gray-500/50'
                  }`}
                >
                  <div className="font-semibold">{demo.name}</div>
                  <div className="text-sm opacity-70">{demo.description}</div>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="mt-6">
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold">
                <Sliders className="w-5 h-5 text-purple-400" />
                Controls
              </h3>
              <div className="space-y-4">
                {Object.entries(currentDemo.controls).map(([key, config]) => (
                  <div key={key}>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      {config.label}
                    </label>
                    {config.type === 'range' && (
                      <div className="space-y-2">
                        <input
                          type="range"
                          min={config.min}
                          max={config.max}
                          step={config.step}
                          value={controls[key] || config.default}
                          onChange={(e) => handleControlChange(key, parseFloat(e.target.value))}
                          className="w-full"
                        />
                        <div className="text-xs text-gray-400">
                          {controls[key] || config.default}
                        </div>
                      </div>
                    )}
                    {config.type === 'color' && (
                      <input
                        type="color"
                        value={controls[key] || config.default}
                        onChange={(e) => handleControlChange(key, e.target.value)}
                        className="w-full h-10 rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* 3D Preview */}
              <div className="aspect-square">
                <div className="flex gap-2 justify-between items-center mb-4">
                  <h3 className="flex gap-2 items-center text-lg font-semibold">
                    <Monitor className="w-5 h-5 text-green-400" />
                    Preview
                  </h3>
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="flex gap-2 items-center px-3 py-1 text-sm bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
                  >
                    {showCode ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                    {showCode ? 'View' : 'Code'}
                  </button>
                </div>
                
                <div className="overflow-hidden w-full h-full bg-black rounded-lg border border-gray-600">
                  <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={100} />
                    <pointLight position={[-10, -10, -10]} intensity={50} />
                    
                    <Suspense fallback={null}>
                      {isPlaying && <DemoComponent {...controls} />}
                    </Suspense>
                  </Canvas>
                </div>
              </div>

              {/* Code Editor */}
              <div className="aspect-square">
                <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold">
                  <Code className="w-5 h-5 text-cyan-400" />
                  Source Code
                </h3>
                
                <AnimatePresence mode="wait">
                  {showCode ? (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="h-full"
                    >
                      <div className="overflow-auto p-4 w-full h-full font-mono text-sm text-green-300 bg-gray-900 rounded-lg border border-gray-600">
                        <pre className="whitespace-pre-wrap">{currentDemo.code}</pre>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6 h-full bg-gradient-to-br rounded-lg border border-gray-600 from-gray-800/50 to-gray-900/50"
                    >
                      <h4 className="mb-4 text-xl font-bold text-white">{currentDemo.name}</h4>
                      <p className="mb-6 text-gray-300">{currentDemo.description}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="mb-2 font-semibold text-cyan-400">Features:</h5>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>• Real-time parameter adjustment</li>
                            <li>• Interactive 3D manipulation</li>
                            <li>• Customizable properties</li>
                            <li>• Exportable code</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="mb-2 font-semibold text-purple-400">Tech Stack:</h5>
                          <div className="flex flex-wrap gap-2">
                            {['React', 'Three.js', 'WebGL', 'JavaScript'].map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs font-semibold text-purple-300 rounded-full border bg-purple-500/20 border-purple-400/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCodePlayground;