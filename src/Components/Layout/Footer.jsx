import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, Code, Sparkles } from 'lucide-react';
import * as THREE from 'three';

// Floating Tech Icons in 3D
function FloatingTechIcon({ position, icon, color, rotationSpeed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 2 + position[0]) * 0.3;
      meshRef.current.rotation.x = time * rotationSpeed * 0.5;
      meshRef.current.rotation.y = time * rotationSpeed;
      meshRef.current.rotation.z = Math.sin(time) * 0.2;
      
      // Gentle pulsing
      const scale = 1 + Math.sin(time * 3) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.3}
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}

// Particle Heart System
function HeartParticles() {
  const particlesRef = useRef();
  const count = 50;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create heart shape using parametric equations
      const t = (i / count) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3) * 0.1;
      const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.1;
      const z = (Math.random() - 0.5) * 2;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.z = time * 0.2;
      // Gentle breathing effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      particlesRef.current.scale.setScalar(scale);
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#ec4899" 
        size={0.1} 
        transparent 
        opacity={0.8}
        sizeAttenuation 
      />
    </points>
  );
}

// Orbiting Rings
function OrbitingRings() {
  const groupRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = time * 0.3;
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[1, 1.5, 2].map((radius, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, index * Math.PI / 3]}>
          <torusGeometry args={[radius, 0.02, 8, 32]} />
          <meshStandardMaterial 
            color={index === 0 ? "#22d3ee" : index === 1 ? "#a855f7" : "#ec4899"} 
            emissive={index === 0 ? "#22d3ee" : index === 1 ? "#a855f7" : "#ec4899"}
            emissiveIntensity={0.2}
            transparent 
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Animated Car with Headlamps
function AnimatedCar() {
  const carGroupRef = useRef();
  const leftHeadlampRef = useRef();
  const rightHeadlampRef = useRef();
  const wheelFrontRef = useRef();
  const wheelBackRef = useRef();
  const leftTargetRef = useRef();
  const rightTargetRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (carGroupRef.current) {
      // Move car from left to right across screen
      const progress = (time * 0.2) % 2; // Complete cycle every 10 seconds
      let xPosition;
      let rotation = 0;
      
      if (progress < 1) {
        // Moving from left to right
        xPosition = -10 + (progress * 20); // From -10 to +10
        rotation = 0; // Facing right
      } else {
        // Moving from right to left
        xPosition = 10 - ((progress - 1) * 20); // From +10 to -10
        rotation = Math.PI; // Facing left
      }
      
      carGroupRef.current.position.x = xPosition;
      carGroupRef.current.position.y = -2.2; // Ground level
      carGroupRef.current.position.z = 4; // Closer to camera
      carGroupRef.current.rotation.y = rotation;
      
      // Gentle bouncing motion
      carGroupRef.current.position.y += Math.sin(time * 8) * 0.03;
      
      // Update headlamp targets
      if (leftTargetRef.current && rightTargetRef.current) {
        const targetDistance = 5;
        const targetX = xPosition + (rotation === 0 ? targetDistance : -targetDistance);
        leftTargetRef.current.position.x = targetX;
        rightTargetRef.current.position.x = targetX;
      }
    }
    
    // Rotate wheels
    if (wheelFrontRef.current) {
      wheelFrontRef.current.rotation.x = time * 3;
    }
    if (wheelBackRef.current) {
      wheelBackRef.current.rotation.x = time * 3;
    }
    
    // Animate headlamp intensity
    if (leftHeadlampRef.current) {
      leftHeadlampRef.current.intensity = 120 + Math.sin(time * 8) * 30;
    }
    if (rightHeadlampRef.current) {
      rightHeadlampRef.current.intensity = 120 + Math.sin(time * 8 + 0.3) * 30;
    }
  });

  return (
    <>
      {/* Invisible targets for headlamp direction */}
      <mesh ref={leftTargetRef} position={[5, -2, 4]} visible={false} />
      <mesh ref={rightTargetRef} position={[5, -2, 4]} visible={false} />
      
      <group ref={carGroupRef}>
        {/* Car Body */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[1.4, 0.4, 0.7]} />
          <meshStandardMaterial color="#1e40af" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Car Roof */}
        <mesh position={[0.1, 0.65, 0]} scale={[0.8, 0.3, 0.8]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#1d4ed8" metalness={0.5} roughness={0.4} />
        </mesh>
        
        {/* Front Bumper */}
        <mesh position={[0.75, 0.1, 0]} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.6]} />
          <meshStandardMaterial color="#3730a3" />
        </mesh>
        
        {/* Back Bumper */}
        <mesh position={[-0.75, 0.1, 0]} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.6]} />
          <meshStandardMaterial color="#3730a3" />
        </mesh>
        
        {/* Wheels */}
        <mesh ref={wheelFrontRef} position={[0.5, -0.1, 0.4]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh ref={wheelBackRef} position={[0.5, -0.1, -0.4]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[-0.5, -0.1, 0.4]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[-0.5, -0.1, -0.4]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        
        {/* Wheel Rims */}
        {[
          [0.5, -0.1, 0.41],
          [0.5, -0.1, -0.41],
          [-0.5, -0.1, 0.41],
          [-0.5, -0.1, -0.41]
        ].map((position, index) => (
          <mesh key={index} position={position}>
            <cylinderGeometry args={[0.10, 0.10, 0.02, 8]} />
            <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        
        {/* Headlamps */}
        <mesh position={[0.8, 0.25, 0.25]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[0.8, 0.25, -0.25]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={0.8}
          />
        </mesh>
        
        {/* Headlamp Light Sources */}
        <spotLight
          ref={leftHeadlampRef}
          position={[0.9, 0.25, 0.25]}
          target={leftTargetRef.current}
          color="#ffffff"
          intensity={150}
          distance={8}
          angle={Math.PI / 4}
          penumbra={0.4}
          castShadow
        />
        <spotLight
          ref={rightHeadlampRef}
          position={[0.9, 0.25, -0.25]}
          target={rightTargetRef.current}
          color="#ffffff"
          intensity={150}
          distance={8}
          angle={Math.PI / 4}
          penumbra={0.4}
          castShadow
        />
        
        {/* Windshield */}
        <mesh position={[0.3, 0.55, 0]} rotation={[-0.1, 0, 0]}>
          <planeGeometry args={[0.7, 0.4]} />
          <meshStandardMaterial 
            color="#87ceeb" 
            transparent 
            opacity={0.6} 
            metalness={0.1}
            roughness={0.1}
          />
        </mesh>
        
        {/* Side Windows */}
        <mesh position={[0.2, 0.55, 0.36]} rotation={[0, Math.PI/2, 0]}>
          <planeGeometry args={[0.4, 0.3]} />
          <meshStandardMaterial 
            color="#87ceeb" 
            transparent 
            opacity={0.5} 
          />
        </mesh>
        <mesh position={[0.2, 0.55, -0.36]} rotation={[0, -Math.PI/2, 0]}>
          <planeGeometry args={[0.4, 0.3]} />
          <meshStandardMaterial 
            color="#87ceeb" 
            transparent 
            opacity={0.5} 
          />
        </mesh>
        
        {/* Taillights */}
        <mesh position={[-0.75, 0.2, 0.3]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial 
            color="#dc2626" 
            emissive="#dc2626" 
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh position={[-0.75, 0.2, -0.3]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial 
            color="#dc2626" 
            emissive="#dc2626" 
            emissiveIntensity={0.4}
          />
        </mesh>
        
        {/* Door Handles */}
        <mesh position={[0.2, 0.3, 0.38]}>
          <boxGeometry args={[0.1, 0.03, 0.05]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.2, 0.3, -0.38]}>
          <boxGeometry args={[0.1, 0.03, 0.05]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Antenna */}
        <mesh position={[-0.3, 0.9, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        
        {/* License Plate */}
        <mesh position={[0.8, 0.05, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.25, 0.08]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Exhaust Pipe */}
        <mesh position={[-0.8, -0.15, -0.2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
          <meshStandardMaterial color="#4b5563" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </>
  );
}

// Road/Ground with lane markings
function Road() {
  const roadRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Subtle road texture movement
    if (roadRef.current) {
      roadRef.current.material.map && (roadRef.current.material.map.offset.x = time * 0.1);
    }
  });

  return (
    <>
      {/* Main Road */}
      <mesh ref={roadRef} position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[25, 10]} />
        <meshStandardMaterial 
          color="#374151" 
          transparent 
          opacity={0.8}
          roughness={0.9}
        />
      </mesh>
      
      {/* Lane Markings */}
      {[-1, 0, 1].map((z, index) => (
        <mesh key={index} position={[0, -2.48, z * 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[25, 0.1]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            emissive="#fbbf24"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      
      {/* Road Edge Lines */}
      <mesh position={[0, -2.48, 3.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[25, 0.15]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, -2.48, -3.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[25, 0.15]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </>
  );
}

// Streetlights
function StreetLights() {
  return (
    <>
      {[-8, -4, 0, 4, 8].map((x, index) => (
        <group key={index} position={[x, 0, 5]}>
          {/* Pole */}
          <mesh position={[0, -1, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
            <meshStandardMaterial color="#4b5563" />
          </mesh>
          
          {/* Light */}
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial 
              color="#fbbf24" 
              emissive="#fbbf24" 
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* Street Light Source */}
          <pointLight
            position={[0, 0.2, 0]}
            color="#fbbf24"
            intensity={30}
            distance={4}
            decay={2}
          />
        </group>
      ))}
    </>
  );
}

// Main 3D Scene
function Footer3DScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#22d3ee" />
      <pointLight position={[-5, -5, 5]} intensity={30} color="#a855f7" />
      
      {/* Environmental lighting for car */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Tech Icons (moved higher to avoid car) */}
      <FloatingTechIcon position={[-3, 1, 1]} color="#61dafb" rotationSpeed={0.8} />
      <FloatingTechIcon position={[-1, 1.5, -1]} color="#22d3ee" rotationSpeed={1.2} />
      <FloatingTechIcon position={[1, 0.7, 2]} color="#a855f7" rotationSpeed={0.9} />
      <FloatingTechIcon position={[3, 1.2, 0]} color="#10b981" rotationSpeed={1.1} />
      
      {/* Heart Particles (moved higher) */}
      <group position={[0, 1, -2]}>
        <HeartParticles />
      </group>
      
      {/* Orbiting Rings (moved higher) */}
      <group position={[0, 1, -1]}>
        <OrbitingRings />
      </group>
      
      {/* Road and Car */}
      <Road />
      <AnimatedCar />
      <StreetLights />
    </>
  );
}

const Footer = () => {
  const techStack = [
    { name: 'React.js', icon: '⚛️', color: 'text-cyan-400', description: 'UI Framework' },
    { name: 'Three.js / R3F', icon: '🧊', color: 'text-purple-400', description: '3D Graphics' },
    { name: 'Firebase', icon: '🔥', color: 'text-yellow-400', description: 'Backend & DB' },
    { name: 'TailwindCSS', icon: '🎨', color: 'text-teal-400', description: 'Styling' },
    { name: 'Framer Motion', icon: '✨', color: 'text-pink-400', description: 'UI Animations' },
    { name: 'GSAP', icon: '🟩', color: 'text-green-400', description: 'Scroll Animations' },
    { name: 'Node.js', icon: '🟢', color: 'text-lime-400', description: 'Runtime' },
    { name: 'Vanta.js', icon: '🌊', color: 'text-blue-400', description: 'Backgrounds' }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Naveen297',
      color: 'hover:text-gray-300',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/naveenmalhotra148',
      color: 'hover:text-blue-400',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: 'mailto:naveenmalhotra148@gmail.com',
      color: 'hover:text-cyan-400',
      label: 'Email'
    }
  ];

  return (
    <footer className="overflow-hidden relative bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50 font-georamalight">
      {/* 3D Background with Car */}
      <div className="absolute inset-0 opacity-60">
        <Canvas 
          camera={{ position: [0, 3, 12], fov: 50 }}
          shadows
          shadowMap={{ enabled: true, type: THREE.PCFSoftShadowMap }}
        >
          <Footer3DScene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t via-transparent from-gray-900/85 to-gray-900/70"></div>

      <div className="container relative px-6 py-16 mx-auto">
        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-3">
          
          {/* Left Section - About */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-3 items-center mb-6">
              <div className="p-2 bg-gradient-to-br rounded-lg border from-cyan-500/20 to-purple-500/20 border-cyan-400/30">
                <Code className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Naveen Malhotra
              </h3>
            </div>
            
            <p className="mb-6 leading-relaxed text-gray-200">
              Full-stack developer passionate about creating immersive web experiences 
              with cutting-edge technologies. Always exploring the intersection of 
              creativity and code.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-800/60 rounded-lg border border-gray-600/50 text-gray-300 transition-all duration-300 ${social.color} hover:border-gray-500 hover:bg-gray-700/60 backdrop-blur-sm`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex gap-3 items-center mb-8">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Built with Amazing Technologies</h3>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="p-4 bg-gradient-to-br rounded-xl border backdrop-blur-sm transition-all duration-300 from-gray-800/60 to-gray-900/60 border-gray-600/30 hover:border-gray-500/50 group"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    rotateY: 5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex gap-3 items-center mb-2">
                    <span className="text-2xl">{tech.icon}</span>
                    <div>
                      <h4 className={`font-semibold ${tech.color} group-hover:scale-110 transition-transform`}>
                        {tech.name}
                      </h4>
                      <p className="text-xs text-gray-400">{tech.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="pt-12 mt-12 border-t border-gray-700/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col gap-6 justify-between items-center md:flex-row">
            
            {/* Copyright */}
            <div className="flex gap-2 items-center text-gray-300">
              <span>© 2025 Naveen Malhotra.</span>
              <motion.div
                className="flex gap-1 items-center"
                whileHover={{ scale: 1.1 }}
              >
                <span>Made with</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    color: ['#ec4899', '#ef4444', '#ec4899']
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </motion.div>
                <span className="font-semibold text-pink-400">and lots of coffee</span>
              </motion.div>
            </div>

            {/* Performance Badge */}
            <motion.div 
              className="flex gap-2 items-center px-4 py-2 bg-gradient-to-r rounded-full border backdrop-blur-sm from-green-500/20 to-emerald-500/20 border-green-400/30"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-400">Optimized for Performance</span>
            </motion.div>
          </div>

          {/* Fun Stats */}
          <motion.div 
            className="flex flex-wrap gap-8 justify-center mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { label: 'Lines of Code', value: '80,000+', icon: '💻' },
              { label: 'Coffee Cups', value: '200+', icon: '☕' },
              { label: 'Projects Built', value: '12+', icon: '🚀' },
              { label: 'Happy Clients', value: '100%', icon: '😊' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="mb-1 text-2xl">{stat.icon}</div>
                <div className="text-lg font-bold text-cyan-400">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Car Info Badge */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex gap-2 items-center px-4 py-2 bg-gradient-to-r rounded-full border backdrop-blur-sm from-blue-500/20 to-purple-500/20 border-blue-400/30">
            <span className="text-sm text-blue-300">🚗 Watch the animated car cruise by </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 w-96 h-32 bg-gradient-to-t to-transparent blur-3xl transform -translate-x-1/2 from-cyan-500/10"></div>
      {/* <p className='flex justify-center text-xs'>||297||</p> */}
    </footer>
  );
};

export default Footer;