import React, { useState, useRef, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import {
  Play, Pause, RotateCcw, Download, Share2, Code, Eye, Zap, Sliders, Monitor,
  ArrowLeft, Settings, Maximize, Camera, Sparkles, Volume2, VolumeX, Layers,
  Save, FolderOpen, Trash2, Copy, Edit, X, Info, ChevronDown, ChevronUp, Cpu,
  Activity, AlertTriangle, PanelLeftClose, PanelRightClose, Wifi, Database,
  Codesandbox, Atom, Hexagon, Triangle, Circle, Square, Diamond, Octagon
} from 'lucide-react';
import * as THREE from 'three';

//================================================================================
// Sci-Fi Enhanced 3D Components
//================================================================================

function QuantumCube({ color, speed, scale, wireframe, emissive, roughness, glitchIntensity = 0.1 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [glitchTime, setGlitchTime] = useState(0);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Quantum rotation with glitch effects
      const glitch = Math.sin(time * 10) * glitchIntensity;
      meshRef.current.rotation.x = time * speed + glitch;
      meshRef.current.rotation.y = time * speed * 0.8 + glitch * 0.5;
      meshRef.current.rotation.z = time * speed * 0.3;
      
      // Quantum scaling
      const quantumScale = scale + (hovered ? 0.2 : 0) + Math.sin(time * 4) * 0.05;
      meshRef.current.scale.setScalar(quantumScale);
      
      // Quantum position jitter
      meshRef.current.position.x = Math.sin(time * 2) * 0.1;
      meshRef.current.position.y = Math.cos(time * 3) * 0.1;
    }
  });

  return (
    <group>
      <mesh 
        ref={meshRef} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={wireframe} 
          emissive={emissive} 
          roughness={roughness} 
          metalness={0.8}
          transparent
          opacity={hovered ? 0.9 : 0.8}
        />
      </mesh>
      
      {/* Holographic outline */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2.1, 2.1, 2.1]} />
        <meshBasicMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      {/* Energy field */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[3, 16, 16]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.1} 
            wireframe
          />
        </mesh>
      )}
    </group>
  );
}

function NeonSpheres({ count, colors, speed, radius, amplitude, pulseSpeed = 2 }) {
  const groupRef = useRef();
  const sphereRefs = useRef([]);
  const [energyField, setEnergyField] = useState(false);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) { 
      groupRef.current.rotation.y = time * speed; 
    }
    
    sphereRefs.current.forEach((sphere, i) => {
      if (sphere) {
        // Orbital motion with energy pulses
        const angle = (i / count) * Math.PI * 2 + time * speed;
        const x = Math.cos(angle) * (radius + Math.sin(time * pulseSpeed + i) * 0.5);
        const z = Math.sin(angle) * (radius + Math.sin(time * pulseSpeed + i) * 0.5);
        const y = Math.sin(time * 2 + i) * amplitude + Math.cos(time * pulseSpeed + i * 0.5) * 0.3;
        
        sphere.position.set(x, y, z);
        sphere.rotation.x = time * (1 + i * 0.1);
        sphere.rotation.y = time * (0.8 + i * 0.05);
        
        // Energy pulsing
        const pulse = 1 + Math.sin(time * pulseSpeed + i) * 0.3;
        sphere.scale.setScalar(pulse);
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
          <group key={i}>
            <mesh 
              ref={(el) => (sphereRefs.current[i] = el)} 
              position={[x, 0, z]} 
              castShadow 
              receiveShadow
              onPointerOver={() => setEnergyField(true)}
              onPointerOut={() => setEnergyField(false)}
            >
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial 
                color={colors[i % colors.length]} 
                roughness={0.1} 
                metalness={0.9}
                emissive={colors[i % colors.length]}
                emissiveIntensity={0.2}
              />
            </mesh>
            
            {/* Neon glow effect */}
            <mesh position={[x, 0, z]}>
              <sphereGeometry args={[0.7, 16, 16]} />
              <meshBasicMaterial 
                color={colors[i % colors.length]} 
                transparent 
                opacity={0.15} 
              />
            </mesh>
            
            {/* Energy trails */}
            <mesh position={[x, 0, z]}>
              <torusGeometry args={[0.8, 0.05, 8, 16]} />
              <meshBasicMaterial 
                color={colors[i % colors.length]} 
                transparent 
                opacity={0.6}
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Central energy core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial 
          color="#00ffff" 
          transparent 
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function QuantumWave({ amplitude, frequency, speed, wireframe, color, distortionIntensity = 1 }) {
  const meshRef = useRef();
  const geometryRef = useRef();
  const materialRef = useRef();

  // We'll store a clone of the original, flat vertex positions
  const originalPositions = useRef();

  // This runs once when the component mounts to save the original geometry
  useEffect(() => {
    if (geometryRef.current) {
      originalPositions.current = geometryRef.current.attributes.position.clone();
    }
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (geometryRef.current && originalPositions.current) {
      const currentPositions = geometryRef.current.attributes.position.array;
      const originalPosArray = originalPositions.current.array;

      for (let i = 0; i < currentPositions.length; i += 3) {
        // Get the original x and y from the plane's geometry
        const x_original = originalPosArray[i];
        const y_original = originalPosArray[i + 1];

        // Wave equations are now based on both dimensions of the plane
        const wave1 = Math.sin(x_original * frequency + time * speed) * amplitude;
        const wave2 = Math.sin(y_original * frequency * 0.5 + time * speed * 0.5) * amplitude * 0.5;
        const wave3 = Math.sin((x_original + y_original) * frequency * 0.3 + time * speed * 1.5) * amplitude * 0.3;
        const distortion = Math.sin(x_original * y_original * 0.1 + time * 2) * distortionIntensity * 0.2;

        // ✅ Apply the deformation to the local Z-axis (up/down after rotation)
        currentPositions[i + 2] = wave1 + wave2 + wave3 + distortion;
      }
      
      geometryRef.current.attributes.position.needsUpdate = true;
      geometryRef.current.computeVertexNormals();
    }

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.1 + Math.sin(time * 3) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry ref={geometryRef} args={[15, 15, 150, 150]} />
        <meshStandardMaterial 
          ref={materialRef}
          color={color} 
          wireframe={wireframe} 
          side={THREE.DoubleSide}
          emissive={color}
          emissiveIntensity={0.1}
          transparent
          opacity={wireframe ? 0.8 : 0.9}
        />
      </mesh>
      
      {/* This holographic overlay will remain a flat grid over the wave */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <planeGeometry args={[15, 15, 75, 75]} />
        <meshBasicMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

function CyberParticles({ particleCount, spread, speed, size, color, networkEffect = true }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const velocitiesRef = useRef();
  const connectionsRef = useRef([]);
  
  const { positions, connections } = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const conn = [];
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // Create network connections
      if (networkEffect && i < particleCount - 1) {
        for (let j = i + 1; j < Math.min(i + 5, particleCount); j++) {
          conn.push(i * 3, i * 3 + 1, i * 3 + 2);
          conn.push(j * 3, j * 3 + 1, j * 3 + 2);
        }
      }
    }
    
    velocitiesRef.current = vel;
    connectionsRef.current = new Float32Array(conn);
    return { positions: pos, connections: conn };
  }, [particleCount, spread, networkEffect]);
  
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
        
        // Quantum tunneling effect - particles occasionally jump
        if (Math.random() < 0.001) {
          positions[i * 3] = (Math.random() - 0.5) * spread;
          positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
          positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
        }
        
        // Boundary reflection
        if (Math.abs(positions[i * 3]) > spread / 2) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > spread / 2) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > spread / 2) velocities[i * 3 + 2] *= -1;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          color={color} 
          size={size} 
          transparent 
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {networkEffect && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={connections.length / 3} array={connectionsRef.current} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial 
            color={color} 
            transparent 
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}
    </group>
  );
}

function HolographicDNA({ helixRadius, height, segments, speed, color1, color2, dataFlow = true }) {
  const groupRef = useRef();
  const dataRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) { 
      groupRef.current.rotation.y = time * speed; 
    }
    if (dataRef.current) {
      dataRef.current.rotation.y = -time * speed * 2;
    }
  });

  const spheres = [];
  const dataSpheres = [];
  
  for (let i = 0; i < segments; i++) {
    const t = i / segments;
    const angle1 = t * Math.PI * 8;
    const angle2 = angle1 + Math.PI;
    const y = (t - 0.5) * height;
    
    spheres.push(
      <group key={`helix1-${i}`}>
        <mesh position={[Math.cos(angle1) * helixRadius, y, Math.sin(angle1) * helixRadius]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color={color1} 
            emissive={color1}
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[Math.cos(angle1) * helixRadius, y, Math.sin(angle1) * helixRadius]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial 
            color={color1} 
            transparent 
            opacity={0.2} 
          />
        </mesh>
      </group>
    );
    
    spheres.push(
      <group key={`helix2-${i}`}>
        <mesh position={[Math.cos(angle2) * helixRadius, y, Math.sin(angle2) * helixRadius]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color={color2} 
            emissive={color2}
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[Math.cos(angle2) * helixRadius, y, Math.sin(angle2) * helixRadius]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial 
            color={color2} 
            transparent 
            opacity={0.2} 
          />
        </mesh>
      </group>
    );
    
    // Data flow spheres
    if (dataFlow && i % 3 === 0) {
      dataSpheres.push(
        <mesh key={`data-${i}`} position={[0, y, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.8}
          />
        </mesh>
      );
    }
  }

  return (
    <group>
      <group ref={groupRef}>{spheres}</group>
      {dataFlow && <group ref={dataRef}>{dataSpheres}</group>}
      
      {/* Central energy beam */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, height, 8]} />
        <meshBasicMaterial 
          color="#00ffff" 
          transparent 
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function CyberTorus({ majorRadius, minorRadius, segments, color, speed, energyRings = true }) {
  const meshRef = useRef();
  const ringsRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * speed;
      meshRef.current.rotation.y = time * speed * 0.7;
      meshRef.current.rotation.z = time * speed * 0.3;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x = -time * speed * 1.5;
      ringsRef.current.rotation.y = time * speed * 0.5;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <torusGeometry args={[majorRadius, minorRadius, 32, segments]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.1} 
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Holographic overlay */}
      <mesh ref={meshRef}>
        <torusGeometry args={[majorRadius + 0.1, minorRadius + 0.05, 16, segments / 2]} />
        <meshBasicMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.4}
        />
      </mesh>
      
      {energyRings && (
        <group ref={ringsRef}>
          {[0.7, 1.3, 1.9].map((scale, i) => (
            <mesh key={i}>
              <torusGeometry args={[majorRadius * scale, 0.02, 8, 32]} />
              <meshBasicMaterial 
                color={color} 
                transparent 
                opacity={0.3 - i * 0.1}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

function QuantumFractal({ iterations, scale, color, glitchEffect = true }) {
  const groupRef = useRef();
  const [glitchState, setGlitchState] = useState(0);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) { 
      groupRef.current.rotation.y = time * 0.2; 
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
    
    if (glitchEffect && Math.random() < 0.01) {
      setGlitchState(Math.random());
    }
  });

  const createQuantumFractal = (depth, size, position) => {
    if (depth === 0) return null;
    const newSize = size * scale;
    const offset = size * 0.6;
    const glitchOffset = glitchEffect ? glitchState * 0.2 : 0;
    
    return (
      <group key={depth} position={position}>
        <mesh>
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial 
            color={color} 
            wireframe 
            emissive={color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Energy core */}
        <mesh>
          <sphereGeometry args={[size * 0.3, 8, 8]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.4}
          />
        </mesh>
        
        {depth > 1 && [
          [offset + glitchOffset, offset, offset], 
          [-offset - glitchOffset, offset, offset], 
          [offset, -offset + glitchOffset, offset], 
          [-offset, -offset - glitchOffset, offset], 
          [offset + glitchOffset, offset, -offset], 
          [-offset - glitchOffset, offset, -offset], 
          [offset, -offset + glitchOffset, -offset], 
          [-offset, -offset - glitchOffset, -offset]
        ].map((pos, i) => createQuantumFractal(depth - 1, newSize, pos))}
      </group>
    );
  };

  return <group ref={groupRef}>{createQuantumFractal(iterations, 2, [0, 0, 0])}</group>;
}

//================================================================================
// Sci-Fi UI Components
//================================================================================

function PerformanceTracker({ onUpdate }) {
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());

  useFrame(() => {
    frameCount.current++;
    const now = Date.now();

    if (now - lastTime.current >= 1000) {
      const fps = frameCount.current;
      frameCount.current = 0;
      lastTime.current = now;
      const quantumState = Math.random();
      let memory = 0;
      if (performance.memory) {
        memory = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
      }
      onUpdate({ fps, memory, quantumState });
    }
  });

  return null; // This component doesn't render anything
}

const QuantumPerformanceMonitor = ({ fps, memory, quantumState }) => {
  return (
    <motion.div 
      // This is the only line that needs to change
      className="absolute right-4 bottom-4 z-10 p-3 text-xs rounded-lg border-2 backdrop-blur-md border-cyan-400/30 bg-gray-900/70"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-3 items-center mb-2 text-cyan-400">
        <Activity className="w-4 h-4" />
        <span className="font-mono">QUANTUM METRICS</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-green-400">FPS:</span>
          <span className="font-mono text-green-300">{fps || 0}</span>
        </div>
        
        {memory > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-blue-400">MEM:</span>
            <span className="font-mono text-blue-300">{memory}MB</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-purple-400">QST:</span>
          <span className="font-mono text-purple-300">{(quantumState * 100).toFixed(1)}%</span>
        </div>
      </div>
      
      {/* Holographic border effect */}
      <div className="absolute inset-0 rounded-lg border-2 animate-pulse pointer-events-none border-cyan-400/20"></div>
    </motion.div>
  );
};

function QuantumCameraControls({ autoRotate, rotationSpeed }) {
  const { camera } = useThree();
  useFrame((state) => {
    if (autoRotate) {
      const time = state.clock.getElapsedTime();
      camera.position.x = Math.cos(time * rotationSpeed) * 12;
      camera.position.z = Math.sin(time * rotationSpeed) * 12;
      camera.position.y = Math.sin(time * rotationSpeed * 0.5) * 2;
      camera.lookAt(0, 0, 0);
    }
  });
  return null;
}

const HolographicToast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' 
    ? 'bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-green-400/50' 
    : type === 'error' 
    ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/50' 
    : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.8 }}
      className={`fixed right-4 bottom-4 z-50 p-4 text-white rounded-lg border-2 shadow-2xl backdrop-blur-md ${bgColor}`}
    >
      <div className="flex gap-3 items-center">
        <div className="p-1 rounded bg-white/20">
          {type === 'success' ? <Wifi className="w-4 h-4" /> : 
           type === 'error' ? <AlertTriangle className="w-4 h-4" /> : 
           <Database className="w-4 h-4" />}
        </div>
        <span className="font-medium">{message}</span>
        <button 
          onClick={onClose} 
          className="ml-2 transition-colors text-white/70 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Holographic scan line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

const CyberPresets = ({ onLoad, currentPreset }) => {
  const [presets, setPresets] = useState([]);
  const [showPresets, setShowPresets] = useState(false);
  const [presetName, setPresetName] = useState('');

  const savePreset = () => {
    if (presetName.trim()) {
      const newPreset = { 
        id: Date.now(), 
        name: presetName, 
        data: currentPreset,
        timestamp: new Date().toISOString()
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
      {/* <motion.button 
        onClick={() => setShowPresets(!showPresets)} 
        className="flex gap-2 items-center px-4 py-2 rounded-lg border-2 backdrop-blur-md transition-all duration-300 bg-gray-800/50 border-cyan-400/30 hover:bg-gray-700/70 hover:border-cyan-400/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Database className="w-4 h-4" />
        <span>QUANTUM PRESETS</span>
      </motion.button> */}

      <AnimatePresence>
        {showPresets && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute right-0 top-full z-50 mt-3 w-96 rounded-lg border-2 shadow-2xl backdrop-blur-md bg-gray-900/80 border-cyan-400/30"
          >
            <div className="p-4 border-b border-cyan-400/20">
              <h3 className="flex gap-2 items-center mb-3 font-semibold text-cyan-400">
                <Atom className="w-5 h-5" />
                SAVE QUANTUM STATE
              </h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={presetName} 
                  onChange={(e) => setPresetName(e.target.value)} 
                  placeholder="Enter quantum signature..." 
                  className="flex-1 px-3 py-2 text-white rounded border-2 backdrop-blur-sm bg-gray-800/50 border-gray-600/50 focus:border-cyan-400/50 focus:outline-none" 
                />
                <motion.button 
                  onClick={savePreset} 
                  className="px-3 py-2 rounded border-2 transition-all bg-cyan-600/20 border-cyan-400/50 hover:bg-cyan-600/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="flex gap-2 items-center mb-3 font-semibold text-purple-400">
                <Codesandbox className="w-5 h-5" />
                STORED QUANTUM STATES
              </h3>
              {presets.length === 0 ? (
                <p className="text-sm text-gray-400">No quantum states stored</p>
              ) : (
                <div className="overflow-y-auto space-y-2 max-h-64">
                  {presets.map((preset) => (
                    <motion.div 
                      key={preset.id} 
                      className="flex justify-between items-center p-3 rounded border-2 backdrop-blur-sm bg-gray-800/30 border-gray-600/30 hover:border-cyan-400/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div>
                        <span className="font-medium text-white">{preset.name}</span>
                        <div className="text-xs text-gray-400">
                          {new Date(preset.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button 
                          onClick={() => loadPreset(preset)} 
                          className="text-cyan-400 transition-colors hover:text-cyan-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FolderOpen className="w-4 h-4" />
                        </motion.button>
                        <motion.button 
                          onClick={() => deletePreset(preset.id)} 
                          className="text-red-400 transition-colors hover:text-red-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Holographic border animation */}
            <div className="absolute inset-0 rounded-lg border-2 pointer-events-none border-cyan-400/10">
              <motion.div 
                className="absolute inset-0 rounded-lg border-2 border-cyan-400/30"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.3)',
                    '0 0 40px rgba(34, 211, 238, 0.1)',
                    '0 0 20px rgba(34, 211, 238, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QuantumEditorPanel = ({ code, setCode, onApply, onRevert, error }) => {
  return (
    <motion.div 
      className="flex flex-col h-full rounded-lg border-2 backdrop-blur-md bg-gray-900/80 border-cyan-400/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center p-3 rounded-t-lg border-b backdrop-blur-sm bg-gray-800/50 border-cyan-400/20">
        <div className="flex gap-2 items-center">
          <div className="p-1 rounded bg-cyan-500/20">
            <Code className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-lg font-semibold text-cyan-400">QUANTUM CODE EDITOR</h3>
          <div className="flex gap-1 ml-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <motion.button 
            onClick={onRevert} 
            className="flex gap-2 items-center px-3 py-1 text-sm rounded-lg border-2 transition-all bg-gray-700/50 border-gray-600/50 hover:bg-gray-600/70 hover:border-gray-500/70"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" /> 
            REVERT
          </motion.button>
          <motion.button 
            onClick={onApply} 
            className="flex gap-2 items-center px-3 py-1 text-sm rounded-lg border-2 transition-all bg-cyan-600/20 border-cyan-400/50 hover:bg-cyan-600/40 hover:border-cyan-400/70"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-4 h-4" /> 
            EXECUTE
          </motion.button>
        </div>
      </div>

      <div className="relative flex-grow">
        <Editor 
          height="100%" 
          language="javascript" 
          theme="vs-dark" 
          value={code} 
          onChange={(value) => setCode(value || '')} 
          options={{ 
            minimap: { enabled: false }, 
            fontSize: 14, 
            wordWrap: 'on', 
            scrollBeyondLastLine: false,
            fontFamily: 'JetBrains Mono, monospace',
            lineNumbers: 'on',
            glyphMargin: true,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'all'
          }} 
        />
        
        {/* Code scanning animation */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {error && (
        <motion.div 
          className="flex gap-2 items-center p-3 text-red-400 rounded-b-lg border-t bg-red-900/20 border-red-400/30"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <AlertTriangle className="w-4 h-4" />
          <pre className="font-mono text-xs">{error}</pre>
        </motion.div>
      )}

      {/* Holographic border */}
      <div className="absolute inset-0 rounded-lg border-2 pointer-events-none border-cyan-400/10">
        <motion.div 
          className="absolute inset-0 rounded-lg border-2 border-cyan-400/20"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(34, 211, 238, 0.2)',
              '0 0 40px rgba(34, 211, 238, 0.05)',
              '0 0 20px rgba(34, 211, 238, 0.2)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

//================================================================================
// Enhanced Demo Templates with Sci-Fi Components
//================================================================================
const quantumDemoTemplates = {
  quantumCube: { 
    name: "Quantum Cube", 
    description: "A quantum-enhanced cube with glitch effects and holographic overlays.", 
    category: "Quantum", 
    component: QuantumCube, 
    controls: { 
      color: { type: 'color', default: '#00ffff', label: 'Quantum Color' }, 
      speed: { type: 'range', default: 1, min: 0, max: 5, step: 0.1, label: 'Rotation Speed' }, 
      scale: { type: 'range', default: 1, min: 0.3, max: 3, step: 0.1, label: 'Scale Factor' }, 
      wireframe: { type: 'boolean', default: false, label: 'Wireframe Mode' }, 
      emissive: { type: 'color', default: '#001a1a', label: 'Energy Emission' }, 
      roughness: { type: 'range', default: 0.2, min: 0, max: 1, step: 0.1, label: 'Surface Roughness' },
      glitchIntensity: { type: 'range', default: 0.2, min: 0, max: 1, step: 0.1, label: 'Glitch Intensity' }
    }
  },
  neonSpheres: { 
    name: "Neon Orbital Spheres", 
    description: "Energy-charged spheres with neon trails and orbital mechanics.", 
    category: "Quantum", 
    component: NeonSpheres, 
    controls: { 
      count: { type: 'range', default: 8, min: 3, max: 20, step: 1, label: 'Sphere Count' }, 
      colors: { type: 'colorArray', default: ['#00ffff', '#ff00ff', '#ffff00', '#ff0080'], label: 'Energy Colors' }, 
      speed: { type: 'range', default: 0.3, min: 0, max: 2, step: 0.01, label: 'Orbital Speed' }, 
      radius: { type: 'range', default: 4, min: 2, max: 10, step: 0.5, label: 'Orbital Radius' }, 
      amplitude: { type: 'range', default: 2, min: 0, max: 8, step: 0.1, label: 'Wave Amplitude' },
      pulseSpeed: { type: 'range', default: 2, min: 0.1, max: 5, step: 0.1, label: 'Energy Pulse Speed' }
    }
  },
  quantumWave: { 
    name: "Quantum Wave Field", 
    description: "Multi-dimensional wave interference with quantum distortions.", 
    category: "Physics", 
    component: QuantumWave, 
    controls: { 
      amplitude: { type: 'range', default: 1.5, min: 0.1, max: 5, step: 0.1, label: 'Wave Amplitude' }, 
      frequency: { type: 'range', default: 0.8, min: 0.1, max: 3, step: 0.1, label: 'Wave Frequency' }, 
      speed: { type: 'range', default: 2.5, min: 0.1, max: 8, step: 0.1, label: 'Propagation Speed' }, 
      wireframe: { type: 'boolean', default: true, label: 'Wireframe Display' }, 
      color: { type: 'color', default: '#00ff88', label: 'Energy Color' },
      distortionIntensity: { type: 'range', default: 1, min: 0, max: 3, step: 0.1, label: 'Quantum Distortion' }
    }
  },
  cyberParticles: { 
    name: "Cyber Particle Network", 
    description: "Intelligent particle swarm with network connections and quantum tunneling.", 
    category: "Physics", 
    component: CyberParticles, 
    controls: { 
      particleCount: { type: 'range', default: 1500, min: 100, max: 8000, step: 100, label: 'Particle Count' }, 
      spread: { type: 'range', default: 12, min: 5, max: 25, step: 1, label: 'Field Spread' }, 
      speed: { type: 'range', default: 1.5, min: 0.1, max: 5, step: 0.1, label: 'Movement Speed' }, 
      size: { type: 'range', default: 0.15, min: 0.05, max: 0.8, step: 0.05, label: 'Particle Size' }, 
      color: { type: 'color', default: '#00ffaa', label: 'Network Color' },
      networkEffect: { type: 'boolean', default: true, label: 'Network Connections' }
    }
  },
  holographicDNA: { 
    name: "Holographic DNA", 
    description: "Bio-digital DNA helix with data flow and holographic properties.", 
    category: "Advanced", 
    component: HolographicDNA, 
    controls: { 
      helixRadius: { type: 'range', default: 1.5, min: 0.5, max: 4, step: 0.1, label: 'Helix Radius' }, 
      height: { type: 'range', default: 8, min: 3, max: 15, step: 0.5, label: 'Helix Height' }, 
      segments: { type: 'range', default: 60, min: 20, max: 120, step: 5, label: 'Data Segments' }, 
      speed: { type: 'range', default: 0.8, min: 0, max: 3, step: 0.1, label: 'Rotation Speed' }, 
      color1: { type: 'color', default: '#00ffff', label: 'Primary Strand' }, 
      color2: { type: 'color', default: '#ff0080', label: 'Secondary Strand' },
      dataFlow: { type: 'boolean', default: true, label: 'Data Flow Effect' }
    }
  },
  cyberTorus: { 
    name: "Cyber Torus Ring", 
    description: "High-tech torus with energy rings and holographic overlays.", 
    category: "Advanced", 
    component: CyberTorus, 
    controls: { 
      majorRadius: { type: 'range', default: 2.5, min: 1, max: 5, step: 0.1, label: 'Major Radius' }, 
      minorRadius: { type: 'range', default: 0.8, min: 0.1, max: 2, step: 0.1, label: 'Minor Radius' }, 
      segments: { type: 'range', default: 128, min: 16, max: 256, step: 8, label: 'Ring Segments' }, 
      color: { type: 'color', default: '#ff6600', label: 'Energy Color' }, 
      speed: { type: 'range', default: 0.7, min: 0, max: 3, step: 0.1, label: 'Rotation Speed' },
      energyRings: { type: 'boolean', default: true, label: 'Energy Ring Effect' }
    }
  },
  quantumFractal: { 
    name: "Quantum Fractal", 
    description: "Self-similar fractal structure with quantum glitch effects.", 
    category: "Advanced", 
    component: QuantumFractal, 
    controls: { 
      iterations: { type: 'range', default: 3, min: 1, max: 5, step: 1, label: 'Fractal Depth' }, 
      scale: { type: 'range', default: 0.6, min: 0.3, max: 0.9, step: 0.05, label: 'Scale Factor' }, 
      color: { type: 'color', default: '#aa00ff', label: 'Fractal Color' },
      glitchEffect: { type: 'boolean', default: true, label: 'Quantum Glitch' }
    }
  },
};

//================================================================================
// Main Sci-Fi Playground Component
//================================================================================
const SciFiLiveCodePlayground = () => {
  const [selectedDemo, setSelectedDemo] = useState('quantumCube');
  const [isPlaying, setIsPlaying] = useState(true);
  const [controls, setControls] = useState({});
  const [cameraControls, setCameraControls] = useState({ autoRotate: false, rotationSpeed: 0.15 });
  const [viewMode, setViewMode] = useState('info');
  const [liveCode, setLiveCode] = useState('');
  const [codeError, setCodeError] = useState(null);
  const [toast, setToast] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({ 
    Quantum: true, 
    Physics: true, 
    Advanced: true 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [perfData, setPerfData] = useState({ fps: 0, memory: 0, quantumState: 0 });

  const generateCodeFromControls = useCallback((demoKey, currentControls) => {
    const demo = quantumDemoTemplates[demoKey];
    if (!demo) return '';
    const propsString = Object.entries(currentControls)
      .map(([key, value]) => {
        const config = demo.controls[key];
        let propValue;
        if (config.type === 'colorArray') {
          propValue = JSON.stringify(value);
        } else if (typeof value === 'string') {
          propValue = `'${value}'`;
        } else {
          propValue = value;
        }
        return `  ${key}={${propValue}}`;
      })
      .join('\n');
    return `<${demo.component.name}\n${propsString}\n/>`;
  }, []);

  useEffect(() => {
    const demo = quantumDemoTemplates[selectedDemo];
    const initialControls = {};
    Object.entries(demo.controls).forEach(([key, config]) => {
      initialControls[key] = config.default;
    });
    setControls(initialControls);
    setLiveCode(generateCodeFromControls(selectedDemo, initialControls));
    setCodeError(null);
  }, [selectedDemo, generateCodeFromControls]);

  const handleControlChange = useCallback((key, value) => {
    setControls(prev => {
      const newControls = { ...prev, [key]: value };
      setLiveCode(generateCodeFromControls(selectedDemo, newControls));
      setCodeError(null);
      return newControls;
    });
  }, [selectedDemo, generateCodeFromControls]);

  const handleReset = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const demo = quantumDemoTemplates[selectedDemo];
      const resetControls = {};
      Object.entries(demo.controls).forEach(([key, config]) => {
        resetControls[key] = config.default;
      });
      setControls(resetControls);
      setLiveCode(generateCodeFromControls(selectedDemo, resetControls));
      setCodeError(null);
      setIsLoading(false);
      setToast({ message: 'Quantum state reset to default parameters', type: 'success' });
    }, 800);
  }, [selectedDemo, generateCodeFromControls]);

  const handleApplyCode = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const props = {};
        const propRegex = /(\w+)\s*=\s*\{([^}]+)\}/gs;
        let match;
        while ((match = propRegex.exec(liveCode)) !== null) {
          const key = match[1];
          let valueStr = match[2];
          try {
            const value = new Function(`return ${valueStr}`)();
            props[key] = value;
          } catch (e) {
            console.error(`Error parsing prop '${key}':`, e);
            throw new Error(`Invalid quantum signature for property: ${key}`);
          }
        }
        const validControls = {};
        const demo = quantumDemoTemplates[selectedDemo];
        Object.keys(demo.controls).forEach(key => {
          if (props.hasOwnProperty(key)) {
            validControls[key] = props[key];
          } else {
            validControls[key] = controls[key];
          }
        });
        setControls(validControls);
        setCodeError(null);
        setIsLoading(false);
        setToast({ message: 'Quantum code successfully compiled and executed!', type: 'success' });
      } catch (e) {
        setCodeError(e.message || 'Quantum compilation error. Please verify syntax.');
        setIsLoading(false);
        setToast({ message: 'Quantum compilation failed', type: 'error' });
      }
    }, 1000);
  }, [liveCode, selectedDemo, controls]);

  const handleRevertCode = useCallback(() => {
    setLiveCode(generateCodeFromControls(selectedDemo, controls));
    setCodeError(null);
    setToast({ message: 'Code reverted to current quantum state', type: 'info' });
  }, [controls, selectedDemo, generateCodeFromControls]);

  const exportCode = useCallback(() => {
    const demo = quantumDemoTemplates[selectedDemo];
    const timestamp = new Date().toISOString();
    const configCode = `/*
 * Quantum Component Export
 * Demo: ${demo.name}
 * Generated: ${timestamp}
 * Quantum Signature: ${btoa(JSON.stringify(controls)).substring(0, 16)}
 */

${liveCode}

// Component configuration:
${JSON.stringify(controls, null, 2)}`;
    
    const blob = new Blob([configCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantum-${demo.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.js`;
    a.click();
    URL.revokeObjectURL(url);
    setToast({ message: 'Quantum code exported to local storage!', type: 'success' });
  }, [selectedDemo, liveCode, controls]);

  const shareDemo = useCallback(() => {
    const shareData = { 
      demo: selectedDemo, 
      controls: controls, 
      camera: cameraControls,
      timestamp: Date.now()
    };
    const encoded = btoa(JSON.stringify(shareData));
    const url = `${window.location.origin}?quantum=${encoded}`;
    navigator.clipboard.writeText(url);
    setToast({ message: 'Quantum signature copied to quantum clipboard!', type: 'success' });
  }, [selectedDemo, controls, cameraControls]);

  const toggleCategory = useCallback((category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  }, []);

  const renderQuantumControl = useCallback((key, config) => {
    const value = controls[key] === undefined ? config.default : controls[key];
    
    switch (config.type) {
      case 'range':
        return (
          <div className="space-y-3">
            <input 
              type="range" 
              min={config.min} 
              max={config.max} 
              step={config.step} 
              value={value} 
              onChange={(e) => handleControlChange(key, parseFloat(e.target.value))} 
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700/50 slider-thumb-cyan" 
            />
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">{config.min}</span>
              <span className="px-2 py-1 font-mono text-sm font-bold text-cyan-300 rounded border bg-cyan-500/20 border-cyan-400/50">
                {value}
              </span>
              <span className="text-gray-400">{config.max}</span>
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
              className="w-full h-12 bg-gray-800 rounded-lg border-2 cursor-pointer border-gray-600/50 hover:border-cyan-400/50" 
            />
            <div className="mt-2 font-mono text-xs text-center text-gray-400">{value}</div>
            <div className="absolute inset-0 rounded-lg border-2 animate-pulse pointer-events-none border-cyan-400/20"></div>
          </div>
        );
      case 'boolean':
        return (
          <motion.button 
            onClick={() => handleControlChange(key, !value)} 
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 font-semibold ${
              value 
                ? 'text-cyan-300 shadow-lg bg-cyan-500/20 border-cyan-400/50 shadow-cyan-400/20' 
                : 'text-gray-400 bg-gray-800/50 border-gray-600/50 hover:border-gray-500/70'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {value ? '✓ ACTIVE' : '✗ INACTIVE'}
          </motion.button>
        );
      case 'colorArray':
        return (
          <div className="space-y-3">
            {(value || []).map((color, i) => (
              <motion.div 
                key={i} 
                className="flex gap-3 items-center p-2 rounded-lg border backdrop-blur-sm bg-gray-800/30 border-gray-600/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => { 
                    const newColors = [...value]; 
                    newColors[i] = e.target.value; 
                    handleControlChange(key, newColors); 
                  }} 
                  className="w-10 h-10 rounded border-2 border-gray-600 cursor-pointer" 
                />
                <span className="flex-1 font-mono text-sm text-gray-300">
                  Energy Node {i + 1}
                </span>
                <motion.button 
                  onClick={() => { 
                    const newColors = value.filter((_, index) => index !== i); 
                    handleControlChange(key, newColors); 
                  }} 
                  className="text-red-400 transition-colors hover:text-red-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
            <motion.button 
              onClick={() => { 
                const newColors = [...(value || []), '#00ffff']; 
                handleControlChange(key, newColors); 
              }} 
              className="px-3 py-2 w-full text-sm rounded-lg border-2 transition-all bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/70 hover:border-cyan-400/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              + Add Energy Node
            </motion.button>
          </div>
        );
      default: 
        return null;
    }
  }, [controls, handleControlChange]);

  const currentDemo = quantumDemoTemplates[selectedDemo];
  const DemoComponent = currentDemo.component;
  const demosByCategory = Object.entries(quantumDemoTemplates).reduce((acc, [key, demo]) => {
    const category = demo.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push({ key, ...demo });
    return acc;
  }, {});

  return (
    <div className="flex overflow-hidden relative h-screen text-white bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated background elements */}
      <div className="overflow-hidden absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-10 blur-3xl"
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 blur-3xl"
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 100, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ right: '15%', bottom: '25%' }}
        />
        <motion.div 
          className="absolute w-64 h-64 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full opacity-10 blur-3xl"
          animate={{ 
            x: [0, 60, 0], 
            y: [0, -80, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: '60%', top: '60%' }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden relative flex-shrink-0 w-96 h-full border-r-2 backdrop-blur-md bg-gray-900/70 border-cyan-400/30"
          >
            {/* Sidebar background effects */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div 
                className="absolute w-32 h-32 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-20 blur-2xl"
                animate={{ 
                  x: [0, 50, 0], 
                  y: [0, 100, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{ left: '-20px', top: '20%' }}
              />
            </div>

            <div className="flex relative z-10 flex-col h-full">
              <div className="p-4 bg-gradient-to-r border-b-2 border-cyan-400/30 from-gray-800/50 to-gray-900/50">
                <div className="flex justify-between items-center mb-3">
                  <motion.h1 
                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    QUANTUM PLAYGROUND
                  </motion.h1>
                  <motion.button
                    onClick={() => window.history.back()}
                    className="flex gap-2 items-center px-3 py-1 text-sm rounded-lg border-2 transition-all bg-gray-800/50 border-gray-600/50 hover:border-cyan-400/50 hover:bg-gray-700/70"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    EXIT
                  </motion.button>
                </div>
                <p className="font-mono text-sm text-cyan-400">Real-time 3D Quantum Experiments</p>
                <div className="flex gap-1 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>

              <div className="overflow-y-auto flex-grow p-4 custom-scrollbar">
                <div className="mb-6">
                  <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-cyan-400">
                    <Atom className="w-5 h-5" />
                    QUANTUM EXPERIMENTS
                  </h3>
                  {Object.entries(demosByCategory).map(([category, demos]) => (
                    <motion.div 
                      key={category} 
                      className="mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.button 
                        onClick={() => toggleCategory(category)} 
                        className="flex justify-between items-center p-3 w-full text-sm font-semibold text-left rounded-lg border-2 transition-all bg-gray-800/30 border-gray-600/30 hover:border-cyan-400/50 hover:bg-gray-700/50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex gap-2 items-center">
                          {category === 'Quantum' && <Hexagon className="w-4 h-4 text-cyan-400" />}
                          {category === 'Physics' && <Triangle className="w-4 h-4 text-purple-400" />}
                          {category === 'Advanced' && <Octagon className="w-4 h-4 text-pink-400" />}
                          {category}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedCategories[category] ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </motion.button>
                      
                      <AnimatePresence>
                        {expandedCategories[category] && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-2 space-y-2"
                          >
                            {demos.map((demo, index) => (
                              <motion.button 
                                key={demo.key} 
                                onClick={() => setSelectedDemo(demo.key)} 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.03, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 relative overflow-hidden ${
                                  selectedDemo === demo.key 
                                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/70 text-cyan-300 shadow-lg shadow-cyan-400/20' 
                                    : 'bg-gray-800/30 border-gray-700/30 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600/50'
                                }`}
                              >
                                <div className="relative z-10">
                                  <div className="font-semibold">{demo.name}</div>
                                  <div className="mt-1 text-xs text-gray-400">{demo.description}</div>
                                </div>
                                
                                {selectedDemo === demo.key && (
                                  <motion.div 
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                  />
                                )}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-purple-400">
                    <Sliders className="w-5 h-5" />
                    QUANTUM CONTROLS
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(currentDemo.controls).map(([key, config], index) => (
                      <motion.div 
                        key={`${selectedDemo}-${key}`} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="overflow-hidden relative p-4 rounded-lg border-2 backdrop-blur-sm bg-gray-800/30 border-gray-700/30 hover:border-cyan-400/30"
                      >
                        <label className="block mb-3 text-sm font-medium text-cyan-300">
                          {config.label}
                        </label>
                        {renderQuantumControl(key, config)}
                        
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 rounded-lg border pointer-events-none border-cyan-400/10"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Camera Controls */}
                <div className="mb-6">
                  <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-pink-400">
                    <Camera className="w-5 h-5" />
                    CAMERA MATRIX
                  </h3>
                  <div className="space-y-3">
                    <motion.button 
                      onClick={() => setCameraControls(prev => ({ ...prev, autoRotate: !prev.autoRotate }))} 
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 font-semibold ${
                        cameraControls.autoRotate 
                          ? 'text-pink-300 bg-pink-500/20 border-pink-400/50 shadow-lg shadow-pink-400/20' 
                          : 'text-gray-400 bg-gray-800/50 border-gray-600/50 hover:border-gray-500/70'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {cameraControls.autoRotate ? '✓ AUTO ORBIT ACTIVE' : '✗ MANUAL CONTROL'}
                    </motion.button>
                    
                    {cameraControls.autoRotate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-pink-300">Orbit Speed</label>
                        <input 
                          type="range" 
                          min={0.05} 
                          max={0.5} 
                          step={0.01} 
                          value={cameraControls.rotationSpeed} 
                          onChange={(e) => setCameraControls(prev => ({ ...prev, rotationSpeed: parseFloat(e.target.value) }))} 
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700/50" 
                        />
                        <div className="text-center">
                          <span className="px-2 py-1 font-mono text-xs text-pink-300 rounded border bg-pink-500/20 border-pink-400/50">
                            {cameraControls.rotationSpeed}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Holographic border */}
            <div className="absolute inset-0 border-r-2 pointer-events-none border-cyan-400/20">
              <motion.div 
                className="absolute inset-0 border-r-2 border-cyan-400/30"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.2)',
                    '0 0 40px rgba(34, 211, 238, 0.1)',
                    '0 0 20px rgba(34, 211, 238, 0.2)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex relative flex-col flex-1">
        {/* Sidebar toggle */}
        <motion.button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="absolute top-4 left-4 z-20 p-3 rounded-lg border-2 backdrop-blur-md transition-all duration-300 bg-gray-800/50 border-cyan-400/30 hover:bg-gray-700/70 hover:border-cyan-400/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isSidebarOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelRightClose className="w-5 h-5" />}
          </motion.div>
        </motion.button>

        {/* Top Control Bar */}
        <div className="flex flex-shrink-0 justify-end items-center p-4 pl-20 border-b-2 backdrop-blur-md bg-gray-900/50 border-cyan-400/20">
          <div className="flex gap-3 items-center">
            <motion.button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="flex gap-2 items-center px-4 py-2 rounded-lg border-2 backdrop-blur-md transition-all duration-300 bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/70 hover:border-cyan-400/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Activity className="w-4 h-4" />
                </motion.div>
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isLoading ? 'LOADING...' : isPlaying ? 'PAUSE' : 'PLAY'}
            </motion.button>

            <motion.button 
              onClick={handleReset} 
              className="flex gap-2 items-center px-4 py-2 rounded-lg border-2 backdrop-blur-md transition-all duration-300 bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/70 hover:border-yellow-400/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              <RotateCcw className="w-4 h-4" />
              RESET
            </motion.button>

            <CyberPresets 
              onLoad={(data) => { 
                setSelectedDemo(data.demo); 
                setControls(data.controls); 
                if (data.camera) setCameraControls(data.camera); 
                setToast({ message: 'Quantum state loaded successfully!', type: 'success' });
              }} 
              currentPreset={{ demo: selectedDemo, controls, camera: cameraControls }} 
            />

            <motion.button 
              onClick={exportCode} 
              className="flex gap-2 items-center px-4 py-2 rounded-lg border-2 backdrop-blur-md transition-all duration-300 bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/70 hover:border-green-400/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              EXPORT
            </motion.button>

            <motion.button 
              onClick={shareDemo} 
              className="flex gap-2 items-center px-4 py-2 bg-gradient-to-r rounded-lg border-2 backdrop-blur-md transition-all duration-300 from-blue-600/20 to-purple-600/20 border-blue-400/50 hover:border-purple-400/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-4 h-4" />
              TRANSMIT
            </motion.button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid overflow-hidden flex-1 grid-rows-2 gap-4 p-4">
          {/* 3D Viewport */}
          <div className="overflow-hidden relative row-span-1 w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-lg border-2 shadow-2xl border-cyan-400/30">
            <div className="flex absolute top-3 right-3 z-10 p-1 space-x-1 rounded-lg border-2 backdrop-blur-md bg-gray-800/70 border-gray-600/50">
              <motion.button 
                onClick={() => setViewMode('info')} 
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'info' 
                    ? 'bg-blue-600 shadow-lg shadow-blue-400/30' 
                    : 'hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Info className="w-4 h-4" />
              </motion.button>
              <motion.button 
                onClick={() => setViewMode('editor')} 
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'editor' 
                    ? 'bg-cyan-600 shadow-lg shadow-cyan-400/30' 
                    : 'hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit className="w-4 h-4" />
              </motion.button>
              <motion.button 
                onClick={() => setViewMode('code')} 
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'code' 
                    ? 'bg-purple-600 shadow-lg shadow-purple-400/30' 
                    : 'hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Code className="w-4 h-4" />
              </motion.button>
            </div>

            <Canvas 
              key={selectedDemo + JSON.stringify(controls)} 
              camera={{ position: [0, 0, 12], fov: 60 }} 
              shadows 
              gl={{ 
                antialias: true, 
                alpha: true, 
                powerPreference: "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.2
              }}
              dpr={[1, 2]}
            >
              <color attach="background" args={['#000008']} />
              <fog attach="fog" args={['#000010', 8, 30]} />
              
              {/* Enhanced Lighting */}
              <ambientLight intensity={0.2} color="#0066ff" />
              <pointLight position={[15, 15, 15]} intensity={150} castShadow color="#00ffff" />
              <pointLight position={[-15, -15, -15]} intensity={100} color="#ff00ff" />
              <spotLight 
                position={[0, 20, 0]} 
                intensity={200} 
                angle={0.3} 
                penumbra={1} 
                castShadow 
                color="#ffffff"
                shadow-mapSize={[2048, 2048]}
              />
              
              <QuantumCameraControls {...cameraControls} />
              <Suspense fallback={null}>
                {isPlaying && DemoComponent && <DemoComponent {...controls} />}
              </Suspense>
              
              {/* Enhanced Ground Plane */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial 
                  color="#000020" 
                  transparent 
                  opacity={0.6}
                  roughness={0.8}
                  metalness={0.2}
                />
              </mesh>
              
              {/* Grid helper */}
              <gridHelper args={[50, 50, '#003366', '#001122']} position={[0, -5.9, 0]} />
              
              <PerformanceTracker onUpdate={setPerfData} />
            </Canvas>
            
            <QuantumPerformanceMonitor {...perfData} />
            
            {/* Holographic border */}
            <div className="absolute inset-0 rounded-lg border-2 pointer-events-none border-cyan-400/20">
              <motion.div 
                className="absolute inset-0 rounded-lg border-2 border-cyan-400/30"
                animate={{ 
                  boxShadow: [
                    '0 0 30px rgba(34, 211, 238, 0.3)',
                    '0 0 60px rgba(34, 211, 238, 0.1)',
                    '0 0 30px rgba(34, 211, 238, 0.3)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                
              />
            </div>
            
          </div>

          {/* Bottom Panel */}
          <div className="row-span-1 min-h-0">
            <AnimatePresence mode="wait">
              
              {viewMode === 'editor' ? (
                <motion.div 
                  key="editor" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="h-full"
                >
                  <QuantumEditorPanel 
                    code={liveCode} 
                    setCode={setLiveCode} 
                    onApply={handleApplyCode} 
                    onRevert={handleRevertCode} 
                    error={codeError} 
                  />
                </motion.div>
              ) : viewMode === 'code' ? (
                <motion.div 
                  key="code" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="h-full"
                >
                  <div className="overflow-auto relative p-4 w-full h-full font-mono text-sm text-green-300 rounded-lg border-2 shadow-inner bg-gray-900/80 border-cyan-400/30">
                    <div className="absolute top-3 right-3">
                      <motion.button 
                        onClick={() => { 
                          navigator.clipboard.writeText(liveCode); 
                          setToast({ message: 'Quantum code copied to clipboard!', type: 'success' }); 
                        }} 
                        className="p-2 text-gray-400 rounded border-2 transition-all bg-gray-800/50 border-gray-600/50 hover:border-cyan-400/50 hover:text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <pre className="pr-12 whitespace-pre-wrap">
                      <code>{liveCode}</code>
                    </pre>
                    
                    {/* Code scanning animation */}
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"
                      animate={{ y: [0, '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="info" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="overflow-y-auto p-6 h-full rounded-lg border-2 backdrop-blur-md bg-gray-800/30 border-cyan-400/30"
                >
                  <div className="flex gap-4 items-center mb-6">
                    <motion.div 
                      className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(34, 211, 238, 0.5)',
                          '0 0 30px rgba(34, 211, 238, 0.3)',
                          '0 0 20px rgba(34, 211, 238, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        {currentDemo.name}
                      </h4>
                      <p className="font-mono text-sm text-cyan-400">{currentDemo.category} Quantum Experiment</p>
                    </div>
                  </div>
                  
                  <p className="mb-6 text-lg leading-relaxed text-gray-300">
                    {currentDemo.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border-2 backdrop-blur-sm bg-gray-900/30 border-purple-400/30">
                      <h5 className="flex gap-2 items-center mb-2 font-semibold text-purple-400">
                        <Activity className="w-4 h-4" />
                        Quantum Properties
                      </h5>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Real-time physics simulation</li>
                        <li>• Interactive material properties</li>
                        <li>• Advanced lighting effects</li>
                        <li>• Quantum state management</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg border-2 backdrop-blur-sm bg-gray-900/30 border-cyan-400/30">
                      <h5 className="flex gap-2 items-center mb-2 font-semibold text-cyan-400">
                        <Cpu className="w-4 h-4" />
                        Control Matrix
                      </h5>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• {Object.keys(currentDemo.controls).length} quantum parameters</li>
                        <li>• Live code compilation</li>
                        <li>• State preservation system</li>
                        <li>• Real-time visualization</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 mt-6 bg-gradient-to-r rounded-lg border-2 backdrop-blur-sm from-blue-500/10 to-purple-500/10 border-blue-400/30">
                    <h5 className="flex gap-2 items-center mb-3 font-semibold text-blue-400">
                      <Database className="w-4 h-4" />
                      Quantum Instructions
                    </h5>
                    <div className="grid gap-3 text-sm text-gray-300 md:grid-cols-2">
                      <div>
                        <span className="font-mono text-cyan-400">CTRL+SPACE:</span> Live compile
                      </div>
                      <div>
                        <span className="font-mono text-cyan-400">CTRL+R:</span> Reset quantum state
                      </div>
                      <div>
                        <span className="font-mono text-cyan-400">CTRL+S:</span> Save preset
                      </div>
                      <div>
                        <span className="font-mono text-cyan-400">CTRL+E:</span> Export quantum code
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {toast && (
          <HolographicToast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm bg-black/50"
          >
            <motion.div 
              className="p-8 rounded-lg border-2 backdrop-blur-md bg-gray-900/80 border-cyan-400/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex flex-col gap-4 items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="p-3 rounded-full bg-cyan-500/20"
                >
                  <Atom className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-cyan-400">Quantum Processing</h3>
                  <p className="text-sm text-gray-400">Compiling quantum matrix...</p>
                </div>
                <div className="overflow-hidden w-48 h-1 bg-gray-700 rounded-full">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { 
          width: 8px; 
        }
        .custom-scrollbar::-webkit-scrollbar-track { 
          background: rgba(31, 41, 55, 0.3); 
          border-radius: 4px; 
          border: 1px solid rgba(34, 211, 238, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: linear-gradient(45deg, rgba(34, 211, 238, 0.6), rgba(147, 51, 234, 0.6)); 
          border-radius: 4px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(45deg, rgba(34, 211, 238, 0.8), rgba(147, 51, 234, 0.8)); 
        }
        
        .slider-thumb-cyan::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #00ffff, #ff00ff);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }
        
        .slider-thumb-cyan::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #00ffff, #ff00ff);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }

        /* Holographic text animation */
        @keyframes holographicShimmer {
          0%, 100% { text-shadow: 0 0 5px rgba(34, 211, 238, 0.5); }
          50% { text-shadow: 0 0 20px rgba(34, 211, 238, 0.8), 0 0 30px rgba(147, 51, 234, 0.6); }
        }
        
        .holographic-text {
          animation: holographicShimmer 2s ease-in-out infinite;
        }

        /* Quantum glow keyframes */
        @keyframes quantumGlow {
          0%, 100% { 
            box-shadow: 
              0 0 5px rgba(34, 211, 238, 0.3),
              inset 0 0 5px rgba(34, 211, 238, 0.1);
          }
          50% { 
            box-shadow: 
              0 0 20px rgba(34, 211, 238, 0.6),
              0 0 30px rgba(147, 51, 234, 0.4),
              inset 0 0 10px rgba(34, 211, 238, 0.2);
          }
        }
        
        .quantum-glow {
          animation: quantumGlow 3s ease-in-out infinite;
        }

        /* Matrix rain effect */
        @keyframes matrixRain {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        .matrix-rain {
          animation: matrixRain 3s linear infinite;
        }

        /* Scanning line effect */
        @keyframes scanLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        
        .scan-line {
          animation: scanLine 4s linear infinite;
        }

        /* Enhanced focus styles */
        input:focus, button:focus {
          outline: 2px solid rgba(34, 211, 238, 0.5);
          outline-offset: 2px;
        }

        /* Quantum button hover effects */
        .quantum-button {
          position: relative;
          overflow: hidden;
        }
        
        .quantum-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .quantum-button:hover::before {
          left: 100%;
        }

        /* Energy field effect */
        @keyframes energyField {
          0%, 100% { 
            background: radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%);
          }
          50% { 
            background: radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(34, 211, 238, 0.05) 50%, transparent 70%);
          }
        }
        
        .energy-field {
          animation: energyField 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SciFiLiveCodePlayground;