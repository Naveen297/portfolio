// src/Sections/ExperienceSection/JawDroppingBackground.jsx

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';
import * as THREE from 'three';

// Component for the central DNA-like helix
function DataHelix() {
  const group = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    const points = 200;
    const radius = 1;
    const height = 8;

    for (let i = 0; i < points; i++) {
      const t = (i / points) * Math.PI * 4; // Two full rotations
      const y = (i / points) * height - height / 2;
      
      const x1 = radius * Math.cos(t);
      const z1 = radius * Math.sin(t);
      temp.push({ id: i*2, pos: [x1, y, z1] });

      const x2 = radius * Math.cos(t + Math.PI); // 180 degrees offset
      const z2 = radius * Math.sin(t + Math.PI);
      temp.push({ id: i*2 + 1, pos: [x2, y, z2] });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    group.current.rotation.y = time * 0.1;
    group.current.rotation.x = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <group ref={group}>
      {particles.map(p => (
        <mesh key={p.id} position={p.pos}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial emissive="#a855f7" emissiveIntensity={1.5} color="#a855f7" />
        </mesh>
      ))}
    </group>
  );
}

// Component for the orbiting particle rings
function OrbitingParticles() {
  const group = useRef();
  const particles = useMemo(() => {
    const temp = [];
    // Ring 1
    for (let i = 0; i < 50; i++) {
      const t = (i / 50) * Math.PI * 2;
      temp.push({ id: `r1-${i}`, pos: [Math.cos(t) * 2.5, (Math.random() - 0.5) * 0.2, Math.sin(t) * 2.5], speed: 0.2, size: 0.02 });
    }
    // Ring 2
    for (let i = 0; i < 80; i++) {
      const t = (i / 80) * Math.PI * 2;
      temp.push({ id: `r2-${i}`, pos: [Math.cos(t) * 4, (Math.random() - 0.5) * 0.3, Math.sin(t) * 4], speed: -0.15, size: 0.03 });
    }
    return temp;
  }, []);

  useFrame((state) => {
    group.current.rotation.y += 0.002;
  });

  return (
    <group ref={group}>
      {particles.map(p => (
        <mesh key={p.id} position={p.pos}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshStandardMaterial emissive="#22d3ee" emissiveIntensity={0.8} color="#22d3ee" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Component for the background starfield
function Starfield() {
    const positions = useMemo(() => {
        const pos = new Float32Array(500 * 3);
        for(let i=0; i < 500; i++) {
            pos.set([(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20], i * 3);
        }
        return pos;
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.015} color="#ffffff" transparent opacity={0.5} />
        </points>
    )
}

const JawDroppingBackground = () => {
  // A "sun" object for the GodRays effect to emanate from
  const sun = useMemo(() => new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.9 })
  ), []);

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 75 }}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 5, 5]} intensity={0.5} />
      
      <primitive object={sun} />

      <Starfield />
      <DataHelix />
      <OrbitingParticles />
      
      <EffectComposer>
        <Bloom intensity={0.6} kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.5} />
        <GodRays sun={sun} samples={60} density={0.97} decay={0.97} weight={0.6} exposure={0.4} />
      </EffectComposer>
    </Canvas>
  );
};

export default JawDroppingBackground;