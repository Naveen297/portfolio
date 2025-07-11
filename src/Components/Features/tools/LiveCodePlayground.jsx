import React, { useState, useRef, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
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
  ArrowLeft,
  Settings,
  Maximize,
  Camera,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCw,
  Move3D,
  Lightbulb,
  Layers,
  Save,
  FolderOpen,
  Trash2,
  Copy,
  Edit,
  X,
  Info,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Grid3X3,
  Orbit,
  Cpu,
  Activity
} from 'lucide-react';
import * as THREE from 'three';

// Enhanced 3D Components with new features
function RotatingCube({ color, speed, scale, wireframe, emissive, roughness }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * speed;
      meshRef.current.rotation.y = time * speed * 0.8;
      meshRef.current.scale.setScalar(scale + (hovered ? 0.1 : 0));
    }
  });

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe}
        emissive={emissive}
        roughness={roughness}
        metalness={0.5}
      />
    </mesh>
  );
}

function FloatingSpheres({ count, colors, speed, radius, amplitude }) {
  const groupRef = useRef();
  const sphereRefs = useRef([]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * speed;
    }
    
    sphereRefs.current.forEach((sphere, i) => {
      if (sphere) {
        sphere.position.y = Math.sin(time * 2 + i) * amplitude;
        sphere.rotation.x = time * (1 + i * 0.1);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh 
            key={i} 
            ref={(el) => sphereRefs.current[i] = el}
            position={[x, 0, z]}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial 
              color={colors[i % colors.length]}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function WaveGeometry({ amplitude, frequency, speed, wireframe, color }) {
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
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry ref={geometryRef} args={[10, 10, 100, 100]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ParticleSystem({ particleCount, spread, speed, size, color }) {
  const pointsRef = useRef();
  const velocitiesRef = useRef();
  
  const { positions, velocities } = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    velocitiesRef.current = vel;
    return { positions: pos, velocities: vel };
  }, [particleCount, spread]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.x = time * speed * 0.1;
      pointsRef.current.rotation.y = time * speed * 0.15;
      
      const positions = pointsRef.current.geometry.attributes.position.array;
      const velocities = velocitiesRef.current;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        
        if (Math.abs(positions[i * 3]) > spread / 2) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > spread / 2) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > spread / 2) velocities[i * 3 + 2] *= -1;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
      <pointsMaterial color={color} size={size} transparent opacity={0.8} />
    </points>
  );
}

// New advanced 3D components
function DNA({ helixRadius, height, segments, speed, color1, color2 }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * speed;
    }
  });

  const spheres = [];
  for (let i = 0; i < segments; i++) {
    const t = i / segments;
    const angle1 = t * Math.PI * 8;
    const angle2 = angle1 + Math.PI;
    const y = (t - 0.5) * height;
    
    spheres.push(
      <mesh key={`sphere1-${i}`} position={[
        Math.cos(angle1) * helixRadius,
        y,
        Math.sin(angle1) * helixRadius
      ]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={color1} />
      </mesh>
    );
    
    spheres.push(
      <mesh key={`sphere2-${i}`} position={[
        Math.cos(angle2) * helixRadius,
        y,
        Math.sin(angle2) * helixRadius
      ]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={color2} />
      </mesh>
    );
  }

  return <group ref={groupRef}>{spheres}</group>;
}

function Torus({ majorRadius, minorRadius, segments, color, speed }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * speed;
      meshRef.current.rotation.y = time * speed * 0.7;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[majorRadius, minorRadius, 16, segments]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
    </mesh>
  );
}

function Fractal({ iterations, scale, color }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
    }
  });

  const createFractal = (depth, size, position) => {
    if (depth === 0) return null;
    
    const newSize = size * scale;
    const offset = size * 0.5;
    
    return (
      <group key={depth} position={position}>
        <mesh>
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial color={color} wireframe />
        </mesh>
        {depth > 1 && [
          [offset, offset, offset],
          [-offset, offset, offset],
          [offset, -offset, offset],
          [-offset, -offset, offset],
          [offset, offset, -offset],
          [-offset, offset, -offset],
          [offset, -offset, -offset],
          [-offset, -offset, -offset],
        ].map((pos, i) => 
          createFractal(depth - 1, newSize, pos)
        )}
      </group>
    );
  };

  return (
    <group ref={groupRef}>
      {createFractal(iterations, 2, [0, 0, 0])}
    </group>
  );
}

// Enhanced performance monitor
const PerformanceMonitor = () => {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());

  useFrame(() => {
    frameCount.current++;
    const now = Date.now();
    
    if (now - lastTime.current >= 1000) {
      setFps(frameCount.current);
      frameCount.current = 0;
      lastTime.current = now;
      
      if (performance.memory) {
        setMemory(Math.round(performance.memory.usedJSHeapSize / 1024 / 1024));
      }
    }
  });

  return (
    <div className="absolute top-4 right-4 p-3 rounded-lg border border-gray-600 backdrop-blur-sm bg-black/80">
      <div className="flex gap-2 items-center text-sm text-green-400">
        <Activity className="w-4 h-4" />
        <span>FPS: {fps}</span>
      </div>
      {memory > 0 && (
        <div className="flex gap-2 items-center text-sm text-blue-400">
          <Cpu className="w-4 h-4" />
          <span>Memory: {memory}MB</span>
        </div>
      )}
    </div>
  );
};

// Enhanced camera controls
function CameraControls({ autoRotate, rotationSpeed }) {
  const { camera } = useThree();
  
  useFrame((state) => {
    if (autoRotate) {
      const time = state.clock.getElapsedTime();
      camera.position.x = Math.cos(time * rotationSpeed) * 10;
      camera.position.z = Math.sin(time * rotationSpeed) * 10;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

// Enhanced demo templates with new components
const demoTemplates = {
  cube: {
    name: "Enhanced Cube",
    description: "Interactive cube with material properties and hover effects",
    category: "Basic",
    component: RotatingCube,
    controls: {
      color: { type: 'color', default: '#3B82F6', label: 'Color' },
      speed: { type: 'range', default: 1, min: 0, max: 3, step: 0.1, label: 'Speed' },
      scale: { type: 'range', default: 1, min: 0.5, max: 2, step: 0.1, label: 'Scale' },
      wireframe: { type: 'boolean', default: false, label: 'Wireframe' },
      emissive: { type: 'color', default: '#000000', label: 'Emissive' },
      roughness: { type: 'range', default: 0.5, min: 0, max: 1, step: 0.1, label: 'Roughness' }
    }
  },
  spheres: {
    name: "Orbital Spheres",
    description: "Enhanced floating spheres with physics and shadows",
    category: "Basic",
    component: FloatingSpheres,
    controls: {
      count: { type: 'range', default: 8, min: 3, max: 15, step: 1, label: 'Count' },
      colors: { type: 'colorArray', default: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'], label: 'Colors' },
      speed: { type: 'range', default: 0.1, min: 0, max: 1, step: 0.01, label: 'Speed' },
      radius: { type: 'range', default: 4, min: 2, max: 8, step: 0.5, label: 'Radius' },
      amplitude: { type: 'range', default: 2, min: 0, max: 5, step: 0.1, label: 'Amplitude' }
    }
  },
  wave: {
    name: "Dynamic Wave",
    description: "Enhanced wave with high resolution and material options",
    category: "Physics",
    component: WaveGeometry,
    controls: {
      amplitude: { type: 'range', default: 1, min: 0.1, max: 3, step: 0.1, label: 'Amplitude' },
      frequency: { type: 'range', default: 0.5, min: 0.1, max: 2, step: 0.1, label: 'Frequency' },
      speed: { type: 'range', default: 2, min: 0.1, max: 5, step: 0.1, label: 'Speed' },
      wireframe: { type: 'boolean', default: true, label: 'Wireframe' },
      color: { type: 'color', default: '#3B82F6', label: 'Color' }
    }
  },
  particles: {
    name: "Smart Particles",
    description: "Enhanced particle system with physics simulation",
    category: "Physics",
    component: ParticleSystem,
    controls: {
      particleCount: { type: 'range', default: 1000, min: 100, max: 5000, step: 100, label: 'Count' },
      spread: { type: 'range', default: 10, min: 5, max: 20, step: 1, label: 'Spread' },
      speed: { type: 'range', default: 1, min: 0.1, max: 3, step: 0.1, label: 'Speed' },
      size: { type: 'range', default: 0.1, min: 0.05, max: 0.5, step: 0.05, label: 'Size' },
      color: { type: 'color', default: '#10B981', label: 'Color' }
    }
  },
  dna: {
    name: "DNA Helix",
    description: "Beautiful double helix structure with customizable parameters",
    category: "Advanced",
    component: DNA,
    controls: {
      helixRadius: { type: 'range', default: 1, min: 0.5, max: 3, step: 0.1, label: 'Radius' },
      height: { type: 'range', default: 6, min: 3, max: 12, step: 0.5, label: 'Height' },
      segments: { type: 'range', default: 50, min: 20, max: 100, step: 5, label: 'Segments' },
      speed: { type: 'range', default: 0.5, min: 0, max: 2, step: 0.1, label: 'Speed' },
      color1: { type: 'color', default: '#3B82F6', label: 'Color 1' },
      color2: { type: 'color', default: '#EF4444', label: 'Color 2' }
    }
  },
  torus: {
    name: "Torus Ring",
    description: "Metallic torus with high-quality materials",
    category: "Advanced",
    component: Torus,
    controls: {
      majorRadius: { type: 'range', default: 2, min: 1, max: 4, step: 0.1, label: 'Major Radius' },
      minorRadius: { type: 'range', default: 0.5, min: 0.1, max: 1.5, step: 0.1, label: 'Minor Radius' },
      segments: { type: 'range', default: 100, min: 16, max: 200, step: 4, label: 'Segments' },
      color: { type: 'color', default: '#F59E0B', label: 'Color' },
      speed: { type: 'range', default: 0.5, min: 0, max: 2, step: 0.1, label: 'Speed' }
    }
  },
  fractal: {
    name: "3D Fractal",
    description: "Recursive 3D fractal with adjustable complexity",
    category: "Advanced",
    component: Fractal,
    controls: {
      iterations: { type: 'range', default: 3, min: 1, max: 4, step: 1, label: 'Iterations' },
      scale: { type: 'range', default: 0.5, min: 0.3, max: 0.8, step: 0.05, label: 'Scale' },
      color: { type: 'color', default: '#8B5CF6', label: 'Color' }
    }
  }
};

// Enhanced UI components
const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed right-4 bottom-4 z-50 p-4 text-white rounded-lg shadow-lg ${bgColor}`}
    >
      <div className="flex gap-2 items-center">
        <span>{message}</span>
        <button onClick={onClose} className="text-white/70 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const SavedPresets = ({ onLoad, onSave, currentPreset }) => {
  const [presets, setPresets] = useState([]);
  const [showPresets, setShowPresets] = useState(false);
  const [presetName, setPresetName] = useState('');

  const savePreset = () => {
    if (presetName.trim()) {
      const newPreset = {
        id: Date.now(),
        name: presetName,
        data: currentPreset
      };
      setPresets([...presets, newPreset]);
      setPresetName('');
      setShowPresets(false);
    }
  };

  const loadPreset = (preset) => {
    onLoad(preset.data);
    setShowPresets(false);
  };

  const deletePreset = (id) => {
    setPresets(presets.filter(p => p.id !== id));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPresets(!showPresets)}
        className="flex gap-2 items-center px-4 py-2 bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
      >
        <FolderOpen className="w-4 h-4" />
        Presets
      </button>

      {showPresets && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 bg-gray-900 rounded-lg border border-gray-600 shadow-xl">
          <div className="p-4 border-b border-gray-700">
            <h3 className="mb-2 font-semibold text-white">Save Current Preset</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Preset name..."
                className="flex-1 px-3 py-2 text-white bg-gray-800 rounded border border-gray-600"
              />
              <button
                onClick={savePreset}
                className="px-3 py-2 bg-blue-600 rounded transition-colors hover:bg-blue-700"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <h3 className="mb-2 font-semibold text-white">Saved Presets</h3>
            {presets.length === 0 ? (
              <p className="text-sm text-gray-400">No saved presets</p>
            ) : (
              <div className="space-y-2">
                {presets.map((preset) => (
                  <div key={preset.id} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                    <span className="text-white">{preset.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadPreset(preset)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FolderOpen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletePreset(preset.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Main component
const LiveCodePlayground = () => {
  const [selectedDemo, setSelectedDemo] = useState('cube');
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [controls, setControls] = useState({});
  const [cameraControls, setCameraControls] = useState({
    autoRotate: false,
    rotationSpeed: 0.1
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [toast, setToast] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    Basic: true,
    Physics: true,
    Advanced: true
  });

  // Initialize controls with default values
  useEffect(() => {
    const demo = demoTemplates[selectedDemo];
    const initialControls = {};
    Object.entries(demo.controls).forEach(([key, config]) => {
      initialControls[key] = config.default;
    });
    setControls(initialControls);
  }, [selectedDemo]);

  const handleControlChange = useCallback((key, value) => {
    setControls(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    const demo = demoTemplates[selectedDemo];
    const resetControls = {};
    Object.entries(demo.controls).forEach(([key, config]) => {
      resetControls[key] = config.default;
    });
    setControls(resetControls);
    setToast({ message: 'Controls reset to default', type: 'success' });
  }, [selectedDemo]);

  const exportCode = useCallback(() => {
    const demo = demoTemplates[selectedDemo];
    const configCode = `// Current configuration:\n${JSON.stringify(controls, null, 2)}\n\n${demo.code || '// Code not available'}`;
    const blob = new Blob([configCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${demo.name.replace(/\s+/g, '-').toLowerCase()}.js`;
    a.click();
    URL.revokeObjectURL(url);
    setToast({ message: 'Code exported successfully!', type: 'success' });
  }, [selectedDemo, controls]);

  const shareDemo = useCallback(() => {
    const shareData = {
      demo: selectedDemo,
      controls: controls,
      camera: cameraControls
    };
    const encoded = btoa(JSON.stringify(shareData));
    const url = `${window.location.origin}/playground?data=${encoded}`;
    navigator.clipboard.writeText(url);
    setToast({ message: 'Share link copied to clipboard!', type: 'success' });
  }, [selectedDemo, controls, cameraControls]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  }, []);

  const toggleCategory = useCallback((category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  }, []);

  const renderControl = useCallback((key, config) => {
    const value = controls[key] || config.default;

    switch (config.type) {
      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={value}
              onChange={(e) => handleControlChange(key, parseFloat(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{config.min}</span>
              <span className="font-semibold text-cyan-400">{value}</span>
              <span>{config.max}</span>
            </div>
          </div>
        );
      case 'color':
        return (
          <div className="relative">
            <input
              type="color"
              value={value}
              onChange={(e) => handleControlChange(key, e.target.value)}
              className="w-full h-10 bg-gray-800 rounded-lg border border-gray-600"
            />
            <div className="mt-1 text-xs text-gray-400">{value}</div>
          </div>
        );
      case 'boolean':
        return (
          <button
            onClick={() => handleControlChange(key, !value)}
            className={`w-full px-3 py-2 rounded-lg border transition-colors ${
              value 
                ? 'text-cyan-300 bg-cyan-500/20 border-cyan-400/50'
                : 'text-gray-400 bg-gray-800 border-gray-600'
            }`}
          >
            {value ? 'ON' : 'OFF'}
          </button>
        );
      case 'colorArray':
        return (
          <div className="space-y-2">
            {value.map((color, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...value];
                    newColors[i] = e.target.value;
                    handleControlChange(key, newColors);
                  }}
                  className="w-8 h-8 rounded border border-gray-600"
                />
                <span className="text-xs text-gray-400">Color {i + 1}</span>
                <button
                  onClick={() => {
                    const newColors = value.filter((_, index) => index !== i);
                    handleControlChange(key, newColors);
                  }}
                  className="ml-auto text-red-400 hover:text-red-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newColors = [...value, '#ffffff'];
                handleControlChange(key, newColors);
              }}
              className="px-2 py-1 w-full text-xs bg-gray-800 rounded border border-gray-600 transition-colors hover:bg-gray-700"
            >
              Add Color
            </button>
          </div>
        );
      default:
        return null;
    }
  }, [controls, handleControlChange]);

  const currentDemo = demoTemplates[selectedDemo];
  const DemoComponent = currentDemo.component;

  // Group demos by category
  const demosByCategory = Object.entries(demoTemplates).reduce((acc, [key, demo]) => {
    const category = demo.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push({ key, ...demo });
    return acc;
  }, {});

  return (
    <div className="overflow-hidden min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Enhanced Header */}
      <div className="p-6 border-b backdrop-blur-xl border-gray-700/50 bg-gray-900/95">
        <div className="container mx-auto">
          <div className="flex gap-4 justify-between items-center">
            <div className="flex gap-4 items-center">
              <button
                onClick={() => window.history.back()}
                className="flex gap-2 items-center px-4 py-2 text-gray-300 rounded-lg transition-all duration-200 hover:text-cyan-400 hover:bg-gray-800/50 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </button>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                  Live Code Playground
                </h1>
                <p className="text-gray-400">Interactive Three.js experiments with real-time controls</p>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              
              
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex gap-2 items-center px-3 py-2 rounded-lg transition-colors ${
                  soundEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex gap-2 items-center px-4 py-2 bg-gray-800 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:scale-105"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              
              <button
                onClick={handleReset}
                className="flex gap-2 items-center px-4 py-2 bg-gray-800 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              
              <SavedPresets 
                onLoad={(data) => {
                  setSelectedDemo(data.demo);
                  setControls(data.controls);
                  if (data.camera) setCameraControls(data.camera);
                }}
                onSave={() => {}}
                currentPreset={{ demo: selectedDemo, controls, camera: cameraControls }}
              />
              
              <button
                onClick={exportCode}
                className="flex gap-2 items-center px-4 py-2 bg-gray-800 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:scale-105"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              
              <button
                onClick={shareDemo}
                className="flex gap-2 items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="flex gap-2 items-center px-3 py-2 bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container p-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Enhanced Demo Selection */}
          <div className="space-y-6 lg:col-span-1">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold">
                <Zap className="w-5 h-5 text-yellow-400" />
                Demos
              </h3>
              
              {Object.entries(demosByCategory).map(([category, demos]) => (
                <div key={category} className="mb-4">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="flex justify-between items-center p-2 w-full text-sm font-semibold text-left text-gray-300 transition-colors hover:text-white"
                  >
                    <span className="flex gap-2 items-center">
                      <Layers className="w-4 h-4" />
                      {category}
                    </span>
                    {expandedCategories[category] ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    }
                  </button>
                  
                  <AnimatePresence>
                    {expandedCategories[category] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 space-y-2"
                      >
                        {demos.map((demo) => (
                          <motion.button
                            key={demo.key}
                            onClick={() => setSelectedDemo(demo.key)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-3 text-left rounded-lg border transition-all duration-300 ${
                              selectedDemo === demo.key
                                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-300 shadow-lg'
                                : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-gray-500/50 hover:bg-gray-800/70'
                            }`}
                          >
                            <div className="font-semibold">{demo.name}</div>
                            <div className="text-sm opacity-70">{demo.description}</div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Enhanced Controls */}
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold">
                <Sliders className="w-5 h-5 text-purple-400" />
                Controls
              </h3>
              
              <div className="overflow-y-auto space-y-4 max-h-96 custom-scrollbar">
                {Object.entries(currentDemo.controls).map(([key, config]) => (
                  <motion.div 
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 rounded-lg border bg-gray-800/50 border-gray-700/50"
                  >
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      {config.label}
                    </label>
                    {renderControl(key, config)}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Camera Controls */}
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold">
                <Camera className="w-5 h-5 text-green-400" />
                Camera
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg border bg-gray-800/50 border-gray-700/50">
                  <span className="text-sm text-gray-300">Auto Rotate</span>
                  <button
                    onClick={() => setCameraControls(prev => ({ ...prev, autoRotate: !prev.autoRotate }))}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      cameraControls.autoRotate 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {cameraControls.autoRotate ? 'ON' : 'OFF'}
                  </button>
                </div>
                
                {cameraControls.autoRotate && (
                  <div className="p-3 rounded-lg border bg-gray-800/50 border-gray-700/50">
                    <label className="block mb-2 text-sm text-gray-300">Rotation Speed</label>
                    <input
                      type="range"
                      min="0.05"
                      max="0.5"
                      step="0.05"
                      value={cameraControls.rotationSpeed}
                      onChange={(e) => setCameraControls(prev => ({ 
                        ...prev, 
                        rotationSpeed: parseFloat(e.target.value) 
                      }))}
                      className="w-full accent-green-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:col-span-3">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Enhanced 3D Preview */}
              <div className="aspect-square">
                <div className="flex gap-2 justify-between items-center mb-4">
                  <h3 className="flex gap-2 items-center text-lg font-semibold">
                    <Monitor className="w-5 h-5 text-green-400" />
                    Preview
                    <span className="text-sm text-gray-400">({currentDemo.name})</span>
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCode(!showCode)}
                      className="flex gap-2 items-center px-3 py-1 text-sm bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
                    >
                      {showCode ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                      {showCode ? 'View' : 'Code'}
                    </button>
                    <button
                      onClick={() => {
                        const canvas = document.querySelector('canvas');
                        if (canvas) {
                          const link = document.createElement('a');
                          link.download = 'screenshot.png';
                          link.href = canvas.toDataURL();
                          link.click();
                        }
                      }}
                      className="flex gap-2 items-center px-3 py-1 text-sm bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="overflow-hidden relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-600 shadow-2xl">
                  <Canvas 
                    camera={{ position: [0, 0, 8], fov: 50 }}
                    shadows
                    gl={{ 
                      antialias: true, 
                      alpha: true,
                      powerPreference: "high-performance"
                    }}
                  >
                    <color attach="background" args={['#000000']} />
                    <fog attach="fog" args={['#000000', 5, 20]} />
                    
                    {/* Enhanced Lighting */}
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={100} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={50} color="#3B82F6" />
                    <spotLight 
                      position={[0, 10, 0]} 
                      angle={0.3} 
                      penumbra={1} 
                      intensity={50}
                      castShadow
                    />
                    
                    <CameraControls {...cameraControls} />
                    
                    <Suspense fallback={null}>
                      {isPlaying && <DemoComponent {...controls} />}
                    </Suspense>
                    
                    {/* Ground plane for shadows */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
                      <planeGeometry args={[50, 50]} />
                      <meshStandardMaterial color="#111111" transparent opacity={0.8} />
                    </mesh>
                    
                    {showPerformance && <PerformanceMonitor />}
                  </Canvas>
                  
                  {/* Overlay UI */}
                  <div className="flex absolute top-2 left-2 gap-2">
                    <div className="px-2 py-1 text-xs rounded backdrop-blur-sm bg-black/50">
                      {isPlaying ? '▶ Playing' : '⏸ Paused'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Code/Info Panel */}
              <div className="aspect-square">
                <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold">
                  {showCode ? (
                    <>
                      <Code className="w-5 h-5 text-cyan-400" />
                      Source Code
                    </>
                  ) : (
                    <>
                      <Info className="w-5 h-5 text-blue-400" />
                      Information
                    </>
                  )}
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
                      <div className="overflow-auto relative p-4 w-full h-full font-mono text-sm text-green-300 bg-gray-900 rounded-lg border border-gray-600 shadow-inner">
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => {
                              const code = currentDemo.code || '// Code not available';
                              navigator.clipboard.writeText(code);
                              setToast({ message: 'Code copied!', type: 'success' });
                            }}
                            className="p-1 text-gray-400 transition-colors hover:text-white"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <pre className="pr-8 whitespace-pre-wrap">
                          <code>{currentDemo.code || '// Code not available for this demo'}</code>
                        </pre>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="overflow-y-auto p-6 h-full bg-gradient-to-br rounded-lg border border-gray-600 shadow-inner from-gray-800/50 to-gray-900/50"
                    >
                      <div className="flex gap-3 items-center mb-6">
                        <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{currentDemo.name}</h4>
                          <p className="text-sm text-cyan-400">{currentDemo.category} Demo</p>
                        </div>
                      </div>
                      
                      <p className="mb-6 leading-relaxed text-gray-300">{currentDemo.description}</p>
                      
                      <div className="space-y-6">
                        <div>
                          <h5 className="flex gap-2 items-center mb-3 font-semibold text-cyan-400">
                            <Zap className="w-4 h-4" />
                            Features
                          </h5>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                              Real-time parameter adjustment
                            </li>
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                              Interactive 3D manipulation
                            </li>
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                              Advanced material properties
                            </li>
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                              Performance optimized
                            </li>
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                              Exportable code & presets
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="flex gap-2 items-center mb-3 font-semibold text-purple-400">
                            <Cpu className="w-4 h-4" />
                            Tech Stack
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {['React', 'Three.js', 'WebGL', 'JavaScript', 'Framer Motion'].map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-xs font-semibold text-purple-300 rounded-full border transition-colors bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="flex gap-2 items-center mb-3 font-semibold text-green-400">
                            <Settings className="w-4 h-4" />
                            Current Settings
                          </h5>
                          <div className="space-y-2">
                            {Object.entries(controls).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="font-mono text-green-400">
                                  {Array.isArray(value) ? `[${value.length} items]` : String(value)}
                                </span>
                              </div>
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

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Custom CSS for scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default LiveCodePlayground;