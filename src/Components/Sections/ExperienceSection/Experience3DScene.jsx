// src/Sections/ExperienceSection/Experience3DScene.jsx

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Sub-components for the 3D scene
function FloatingCodeBlock({ position, color, rotationSpeed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0]) * 0.3;
      meshRef.current.rotation.y = time * rotationSpeed * 0.4;
      const scale = 1 + Math.sin(time * 1.5) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} transparent opacity={0.6} roughness={0.4} metalness={0.6} />
    </mesh>
  );
}

function ExperienceTimeline() {
  const groupRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.15;
    }
  });

  const timelinePoints = useMemo(() => [
      new THREE.Vector3(0, -2.5 * 1.2, 0),
      new THREE.Vector3(0, -1.5 * 1.2, 0),
      new THREE.Vector3(0, -0.5 * 1.2, 0),
      new THREE.Vector3(0, 0.5 * 1.2, 0),
      new THREE.Vector3(0, 1.5 * 1.2, 0),
      new THREE.Vector3(0, 2.5 * 1.2, 0),
  ], []);

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 8, 6]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.2} />
      </mesh>
      {timelinePoints.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#a855f7" : "#ec4899"} emissive={index % 2 === 0 ? "#a855f7" : "#ec4899"} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function SkillParticles() {
  const particlesRef = useRef();
  const count = 60;
  
  const positions = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 10;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 6;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return posArray;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial color="#22d3ee" size={0.025} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function TechOrbs() {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  const orbPositions = useMemo(() => [
    { pos: [1.8, 0.8, 0], color: "#61dafb" }, { pos: [-1.8, -0.8, 0.8], color: "#a855f7" },
    { pos: [0, 1.8, -0.8], color: "#10b981" }, { pos: [0.8, -1.8, 0], color: "#f59e0b" },
  ], []);

  return (
    <group ref={groupRef}>
      {orbPositions.map((orb, index) => (
        <mesh key={index} position={orb.pos}>
          <icosahedronGeometry args={[0.12, 1]} />
          <meshStandardMaterial color={orb.color} emissive={orb.color} emissiveIntensity={0.25} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// Main 3D scene component
const Experience3DScene = () => {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#22d3ee" />
      <pointLight position={[-4, -4, 4]} intensity={25} color="#a855f7" />
      <SkillParticles />
      <ExperienceTimeline />
      <TechOrbs />
      <FloatingCodeBlock position={[-3, 1.5, 0.8]} color="#61dafb" rotationSpeed={0.7} />
      <FloatingCodeBlock position={[3, -0.8, -0.8]} color="#a855f7" rotationSpeed={1.0} />
      <FloatingCodeBlock position={[-2.5, -1.5, 1.5]} color="#10b981" rotationSpeed={0.8} />
      <FloatingCodeBlock position={[2.5, 0.8, 0]} color="#f59e0b" rotationSpeed={0.9} />
    </>
  );
};

export default Experience3DScene;