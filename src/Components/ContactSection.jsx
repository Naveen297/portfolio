import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Send } from 'lucide-react';
import * as THREE from 'three';

// Floating Energy Orbs
function EnergyOrb({ position, color, size = 0.2 }) {
    const meshRef = useRef();
    const lightRef = useRef();
    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(time * 2 + position[0]) * 0.5;
            meshRef.current.rotation.x = time * 0.5;
            meshRef.current.rotation.y = time * 0.3;
            
            // Pulsing effect
            const pulse = 1 + Math.sin(time * 3) * 0.3;
            meshRef.current.scale.setScalar(pulse);
            
            if (lightRef.current) {
                lightRef.current.intensity = 50 + Math.sin(time * 4) * 20;
            }
        }
    });

    return (
        <>
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[size, 2]} />
                <meshStandardMaterial 
                    color={color} 
                    emissive={color} 
                    emissiveIntensity={0.5}
                    transparent 
                    opacity={0.8}
                />
            </mesh>
            <pointLight ref={lightRef} position={position} color={color} intensity={50} distance={3} />
        </>
    );
}

// Neural Network Connections
function NeuralNetwork() {
    const groupRef = useRef();
    const points = useMemo(() => {
        const pts = [];
        for (let i = 0; i < 20; i++) {
            pts.push(new THREE.Vector3(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 4
            ));
        }
        return pts;
    }, []);

    const connections = useMemo(() => {
        const lines = [];
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                if (points[i].distanceTo(points[j]) < 3) {
                    lines.push([points[i], points[j]]);
                }
            }
        }
        return lines;
    }, [points]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.1;
            groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Connection Lines */}
            {connections.map((connection, index) => (
                <line key={index}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([
                                connection[0].x, connection[0].y, connection[0].z,
                                connection[1].x, connection[1].y, connection[1].z
                            ])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#22d3ee" transparent opacity={0.3} />
                </line>
            ))}
            
            {/* Network Nodes */}
            {points.map((point, index) => (
                <mesh key={index} position={[point.x, point.y, point.z]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshStandardMaterial 
                        color="#22d3ee" 
                        emissive="#22d3ee" 
                        emissiveIntensity={0.5}
                    />
                </mesh>
            ))}
        </group>
    );
}

// DNA Helix Structure
function DNAHelix() {
    const groupRef = useRef();
    const helixPoints = useMemo(() => {
        const points1 = [];
        const points2 = [];
        const bridges = [];
        
        for (let i = 0; i < 50; i++) {
            const t = (i / 50) * Math.PI * 4;
            const y = (i / 50) * 6 - 3;
            const radius = 1.5;
            
            const x1 = Math.cos(t) * radius;
            const z1 = Math.sin(t) * radius;
            const x2 = Math.cos(t + Math.PI) * radius;
            const z2 = Math.sin(t + Math.PI) * radius;
            
            points1.push(new THREE.Vector3(x1, y, z1));
            points2.push(new THREE.Vector3(x2, y, z2));
            
            if (i % 3 === 0) {
                bridges.push([new THREE.Vector3(x1, y, z1), new THREE.Vector3(x2, y, z2)]);
            }
        }
        
        return { points1, points2, bridges };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.2;
            groupRef.current.position.y = Math.sin(time) * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            {/* First Helix Strand */}
            {helixPoints.points1.map((point, index) => (
                <mesh key={`strand1-${index}`} position={[point.x, point.y, point.z]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial 
                        color="#a855f7" 
                        emissive="#a855f7" 
                        emissiveIntensity={0.3}
                    />
                </mesh>
            ))}
            
            {/* Second Helix Strand */}
            {helixPoints.points2.map((point, index) => (
                <mesh key={`strand2-${index}`} position={[point.x, point.y, point.z]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial 
                        color="#ec4899" 
                        emissive="#ec4899" 
                        emissiveIntensity={0.3}
                    />
                </mesh>
            ))}
            
            {/* Bridge Connections */}
            {helixPoints.bridges.map((bridge, index) => (
                <line key={`bridge-${index}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([
                                bridge[0].x, bridge[0].y, bridge[0].z,
                                bridge[1].x, bridge[1].y, bridge[1].z
                            ])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#fbbf24" transparent opacity={0.6} />
                </line>
            ))}
        </group>
    );
}

// Quantum Particles
function QuantumField() {
    const instancedMeshRef = useRef();
    const count = 200;
    
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }
        return pos;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            
            // Quantum uncertainty effect
            const x = positions[i3] + Math.sin(time * 2 + i) * 0.1;
            const y = positions[i3 + 1] + Math.cos(time * 1.5 + i) * 0.1;
            const z = positions[i3 + 2] + Math.sin(time * 3 + i) * 0.1;
            
            dummy.position.set(x, y, z);
            
            // Random quantum jumps
            if (Math.random() < 0.01) {
                dummy.position.x += (Math.random() - 0.5) * 2;
                dummy.position.y += (Math.random() - 0.5) * 2;
                dummy.position.z += (Math.random() - 0.5) * 2;
            }
            
            // Quantum spin
            dummy.rotation.x = time * (1 + i * 0.1);
            dummy.rotation.y = time * (0.5 + i * 0.05);
            dummy.rotation.z = time * (0.3 + i * 0.03);
            
            // Scale based on wave function
            const scale = 0.5 + Math.sin(time * 4 + i) * 0.3;
            dummy.scale.setScalar(scale);
            
            dummy.updateMatrix();
            if (instancedMeshRef.current) {
                instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
            }
        }
        
        if (instancedMeshRef.current) {
            instancedMeshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={instancedMeshRef} args={[null, null, count]}>
            <octahedronGeometry args={[0.02, 0]} />
            <meshStandardMaterial 
                color="#06b6d4" 
                emissive="#06b6d4" 
                emissiveIntensity={0.8}
                transparent 
                opacity={0.7}
            />
        </instancedMesh>
    );
}

// Holographic Grid
function HolographicGrid() {
    const gridRef = useRef();
    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (gridRef.current) {
            gridRef.current.rotation.x = time * 0.1;
            gridRef.current.rotation.z = time * 0.05;
            gridRef.current.position.y = Math.sin(time * 0.5) * 0.2;
        }
    });

    const gridLines = useMemo(() => {
        const lines = [];
        const size = 8;
        const divisions = 20;
        const step = size / divisions;
        const halfSize = size / 2;

        // Horizontal lines
        for (let i = 0; i <= divisions; i++) {
            const y = -halfSize + (i * step);
            lines.push([
                new THREE.Vector3(-halfSize, y, 0),
                new THREE.Vector3(halfSize, y, 0)
            ]);
        }

        // Vertical lines
        for (let i = 0; i <= divisions; i++) {
            const x = -halfSize + (i * step);
            lines.push([
                new THREE.Vector3(x, -halfSize, 0),
                new THREE.Vector3(x, halfSize, 0)
            ]);
        }

        return lines;
    }, []);

    return (
        <group ref={gridRef} position={[0, 0, -3]}>
            {gridLines.map((line, index) => (
                <line key={index}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([
                                line[0].x, line[0].y, line[0].z,
                                line[1].x, line[1].y, line[1].z
                            ])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial 
                        color="#22d3ee" 
                        transparent 
                        opacity={0.2}
                    />
                </line>
            ))}
        </group>
    );
}

// Interactive Mouse Tracker
function MouseTracker() {
    const sphereRef = useRef();
    const { mouse, viewport } = useThree();
    
    useFrame(() => {
        if (sphereRef.current) {
            sphereRef.current.position.x = mouse.x * viewport.width / 2;
            sphereRef.current.position.y = mouse.y * viewport.height / 2;
        }
    });

    return (
        <mesh ref={sphereRef}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
                color="#fbbf24" 
                emissive="#fbbf24" 
                emissiveIntensity={1}
                transparent 
                opacity={0.8}
            />
        </mesh>
    );
}

// Main 3D Scene Component
function Amazing3DScene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={100} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={50} color="#22d3ee" />
            <pointLight position={[5, -5, 5]} intensity={30} color="#a855f7" />
            
            {/* 3D Elements */}
            <Suspense fallback={null}>
                <QuantumField />
                <DNAHelix />
                <NeuralNetwork />
                <HolographicGrid />
                <MouseTracker />
                
                {/* Energy Orbs */}
                <EnergyOrb position={[-3, 2, 1]} color="#22d3ee" size={0.3} />
                <EnergyOrb position={[3, -1, 2]} color="#a855f7" size={0.25} />
                <EnergyOrb position={[0, 3, -1]} color="#ec4899" size={0.35} />
                <EnergyOrb position={[-2, -2, 3]} color="#fbbf24" size={0.2} />
                <EnergyOrb position={[4, 1, -2]} color="#10b981" size={0.28} />
            </Suspense>
        </>
    );
}

const ContactSection = () => {
    // --- IMPORTANT: Paste your Formspree endpoint URL here ---
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkgbabqz"; 

    return (
        <section className="overflow-hidden relative py-32 bg-gray-900 font-georama">
            <div className="container px-6 mx-auto">
                <motion.h2 
                    className="mb-12 text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 md:text-6xl [text-shadow:0_0_30px_rgba(168,85,247,0.5)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Let's Build the Future Together
                </motion.h2>

                <div className="grid gap-16 lg:grid-cols-2">
                    {/* Left Side: Amazing 3D Canvas */}
                    <motion.div
                        className="overflow-hidden relative w-full h-96 rounded-2xl border border-gray-800 lg:h-full bg-black/50 group"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <Canvas 
                            camera={{ position: [0, 0, 8], fov: 60 }}
                            style={{ background: 'transparent' }}
                        >
                            <Amazing3DScene />
                        </Canvas>

                        {/* Premium Contact Info Overlay */}
                        <div className="flex absolute inset-0 flex-col justify-center items-center p-8 bg-gradient-to-br opacity-0 backdrop-blur-xl transition-all duration-700 group-hover:opacity-100 from-black/80 via-gray-900/90 to-black/80">
                            <motion.div 
                                className="space-y-6 max-w-md text-center"
                                initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                                whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
                                transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
                            >
                                {/* Premium Contact Cards */}
                                <div className="space-y-4">
                                    {/* Email Card */}
                                    <motion.a 
                                        href="mailto:naveenmalhotra148@gmail.com" 
                                        className="flex gap-4 items-center p-4 bg-gradient-to-r rounded-xl border backdrop-blur-md transition-all duration-300 from-cyan-500/20 to-blue-500/20 border-cyan-400/30 hover:border-cyan-400/60 group/card"
                                        whileHover={{ 
                                            scale: 1.05, 
                                            y: -3,
                                            boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ x: -50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className="p-3 rounded-lg border transition-all duration-300 bg-cyan-500/20 border-cyan-400/50 group-hover/card:bg-cyan-500/30">
                                            <Mail className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="text-sm font-medium tracking-wide text-gray-300 uppercase">Email</div>
                                            <div className="text-lg font-bold text-white transition-colors group-hover/card:text-cyan-300">
                                                naveenmalhotra148@gmail.com
                                            </div>
                                        </div>
                                    </motion.a>
                                    
                                    {/* LinkedIn Card */}
                                    <motion.a 
                                        href="https://linkedin.com/in/naveenmalhotra148" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex gap-4 items-center p-4 bg-gradient-to-r rounded-xl border backdrop-blur-md transition-all duration-300 from-purple-500/20 to-pink-500/20 border-purple-400/30 hover:border-purple-400/60 group/card"
                                        whileHover={{ 
                                            scale: 1.05, 
                                            y: -3,
                                            boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ x: 50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className="p-3 rounded-lg border transition-all duration-300 bg-purple-500/20 border-purple-400/50 group-hover/card:bg-purple-500/30">
                                            <Linkedin className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="text-sm font-medium tracking-wide text-gray-300 uppercase">LinkedIn</div>
                                            <div className="text-lg font-bold text-white transition-colors group-hover/card:text-purple-300">
                                                Connect on LinkedIn
                                            </div>
                                        </div>
                                    </motion.a>
                                    
                                    {/* Phone Card */}
                                    <motion.a 
                                        href="tel:+916386048691" 
                                        className="flex gap-4 items-center p-4 bg-gradient-to-r rounded-xl border backdrop-blur-md transition-all duration-300 from-green-500/20 to-emerald-500/20 border-green-400/30 hover:border-green-400/60 group/card"
                                        whileHover={{ 
                                            scale: 1.05, 
                                            y: -3,
                                            boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ x: -50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <div className="p-3 rounded-lg border transition-all duration-300 bg-green-500/20 border-green-400/50 group-hover/card:bg-green-500/30">
                                            <Phone className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="text-sm font-medium tracking-wide text-gray-300 uppercase">Phone</div>
                                            <div className="text-lg font-bold text-white transition-colors group-hover/card:text-green-300">
                                                +91 6386048691
                                            </div>
                                        </div>
                                    </motion.a>
                                </div>
                                
                                {/* Interaction Hint */}
                                <motion.div 
                                    className="p-4 mt-8 bg-gradient-to-r rounded-lg border backdrop-blur-md from-yellow-500/10 to-orange-500/10 border-yellow-400/20"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <div className="flex gap-2 justify-center items-center mb-2">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-semibold tracking-wide text-yellow-400 uppercase">Interactive 3D</span>
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    </div>
                                    <p className="text-sm text-gray-300">
                                        Move your cursor around to interact with the quantum field and neural networks
                                    </p>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Corner Tech Labels */}
                        <div className="absolute top-4 left-4 px-3 py-1 font-mono text-xs text-cyan-400 rounded-full border bg-black/50 border-cyan-500/30">
                            Three.js + R3F
                        </div>
                        <div className="absolute right-4 bottom-4 px-3 py-1 font-mono text-xs text-purple-400 rounded-full border bg-black/50 border-purple-500/30">
                            Interactive 3D
                        </div>
                    </motion.div>

                    {/* Right Side: Enhanced Contact Form */}
                    <motion.div 
                        className="flex flex-col justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    >
                        <motion.form
                            action={FORMSPREE_ENDPOINT}
                            method="POST"
                            className="p-8 space-y-6 rounded-2xl border border-gray-700 shadow-2xl backdrop-blur-xl bg-gray-800/50"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="mb-6 text-center">
                                <h3 className="mb-2 text-2xl font-bold text-white">Send a Message</h3>
                                <p className="text-gray-400">Let's discuss your next big idea</p>
                            </div>

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-300">Your Name</label>
                                <motion.input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    required 
                                    className="px-4 py-3 w-full text-white rounded-lg border border-gray-600 transition-all duration-300 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-300">Your Email</label>
                                <motion.input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required 
                                    className="px-4 py-3 w-full text-white rounded-lg border border-gray-600 transition-all duration-300 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block mb-2 text-sm font-semibold text-gray-300">Message</label>
                                <motion.textarea 
                                    id="message" 
                                    name="message" 
                                    rows="4" 
                                    required 
                                    placeholder="Tell me about your project ideas, collaboration opportunities, or just say hello!"
                                    className="px-4 py-3 w-full text-white rounded-lg border border-gray-600 transition-all duration-300 resize-none bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </div>
                            
                            <motion.button
                                type="submit"
                                className="flex overflow-hidden relative gap-2 justify-center items-center px-8 py-4 w-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                                whileHover={{ 
                                    scale: 1.05, 
                                    y: -2,
                                    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Send className="w-5 h-5" />
                                Launch Message Into the Digital Cosmos
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent via-white/20"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.5 }}
                                />
                            </motion.button>
                        </motion.form>
                    </motion.div>
                </div>
                
                {/* Bottom Tech Stack Display */}
                <motion.div 
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <p className="mb-4 text-sm text-gray-500">Powered by cutting-edge technology</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {[
                            'Three.js', 'React Three Fiber', 'Framer Motion', 
                            'WebGL', 'React.js', 'Quantum Computing Visualization'
                        ].map((tech, index) => (
                            <motion.span
                                key={tech}
                                className="px-3 py-1 font-mono text-xs text-cyan-400 rounded-full border bg-gray-800/50 border-cyan-500/30"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;