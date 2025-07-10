// ============= 2. Components/WavingCreature.jsx (New Version) =============
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// This component defines the look and behavior of our "Cosmic Wisp"
const Wisp = () => {
  const groupRef = useRef();
  const coreRef = useRef();
  const particlesRef = useRef();

  // Generate random positions for the stardust particles
  const particlePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 50; i++) {
      const radius = 0.6 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      );
    }
    return positions;
  }, []);

  // useFrame is a hook that runs on every rendered frame
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    
    // 1. Animate the entire group (bobbing and rotating)
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
    }
    
    // 2. Animate the core (pulsing glow)
    if (coreRef.current) {
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.1;
      coreRef.current.scale.set(scale, scale, scale);
    }
    
    // 3. Animate the stardust particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -elapsedTime * 0.5;
      particlesRef.current.rotation.x = elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing core */}
      <Sphere ref={coreRef} args={[0.2, 32, 32]}>
        <meshStandardMaterial
          color="#06b6d4" // cyan-500
          emissive="#06b6d4"
          emissiveIntensity={4}
          toneMapped={false} // Ensures the glow effect is vibrant
        />
      </Sphere>

      {/* Orbiting ring */}
      <Torus args={[0.4, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#a855f7" // purple-500
          emissive="#a855f7"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Torus>

      {/* Stardust particles */}
      <group ref={particlesRef}>
        {particlePositions.map((pos, i) => (
          <Sphere key={i} position={pos} args={[0.01, 8, 8]}>
            <meshStandardMaterial
              color="#ffffff"
              emissive="#22d3ee" // cyan-400
              emissiveIntensity={2}
              toneMapped={false}
            />
          </Sphere>
        ))}
      </group>
    </group>
  );
};

// This is the main component that will be exported and used in Navigation.jsx
const WavingCreature = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 75 }}
      // Enables a transparent background to see the page behind
      gl={{ alpha: true }} 
      style={{
        width: '120px',
        height: '120px',
        position: 'absolute',
        top: '50%',
        right: '-90px',
        transform: 'translateY(-50%)',
        pointerEvents: 'none' // To allow clicks to pass through the canvas
      }}
    >
      {/* Basic lighting for the scene */}
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={50} color="#22d3ee" />
      
      {/* The 3D Wisp itself */}
      <Wisp />
    </Canvas>
  );
};

export default WavingCreature;