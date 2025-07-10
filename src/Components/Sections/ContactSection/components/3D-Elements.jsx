import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Component: EnergyOrb.js
export function EnergyOrb({ position, color, size = 0.2 }) {
    const meshRef = useRef();
    const lightRef = useRef();
    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(time * 2 + position[0]) * 0.5;
            meshRef.current.rotation.x = time * 0.5;
            meshRef.current.rotation.y = time * 0.3;
            
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

// Component: NeuralNetwork.js
export function NeuralNetwork() {
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

// Component: DNAHelix.js
export function DNAHelix() {
    const groupRef = useRef();
    const helixPoints = useMemo(() => {
        const points1 = [], points2 = [], bridges = [];
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
            {helixPoints.points1.map((point, index) => (
                <mesh key={`strand1-${index}`} position={[point.x, point.y, point.z]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.3} />
                </mesh>
            ))}
            {helixPoints.points2.map((point, index) => (
                <mesh key={`strand2-${index}`} position={[point.x, point.y, point.z]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.3} />
                </mesh>
            ))}
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

// Component: QuantumField.js
export function QuantumField() {
    const instancedMeshRef = useRef();
    const count = 200;
    const positions = useMemo(() => new Float32Array(Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 10)), []);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = positions[i3] + Math.sin(time * 2 + i) * 0.1;
            const y = positions[i3 + 1] + Math.cos(time * 1.5 + i) * 0.1;
            const z = positions[i3 + 2] + Math.sin(time * 3 + i) * 0.1;
            dummy.position.set(x, y, z);
            if (Math.random() < 0.01) {
                dummy.position.x += (Math.random() - 0.5) * 2;
                dummy.position.y += (Math.random() - 0.5) * 2;
                dummy.position.z += (Math.random() - 0.5) * 2;
            }
            dummy.rotation.set(time * (1 + i * 0.1), time * (0.5 + i * 0.05), time * (0.3 + i * 0.03));
            dummy.scale.setScalar(0.5 + Math.sin(time * 4 + i) * 0.3);
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
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} transparent opacity={0.7} />
        </instancedMesh>
    );
}

// Component: HolographicGrid.js
export function HolographicGrid() {
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
        const size = 8, divisions = 20, step = size / divisions, halfSize = size / 2;
        for (let i = 0; i <= divisions; i++) {
            const p = -halfSize + (i * step);
            lines.push([new THREE.Vector3(-halfSize, p, 0), new THREE.Vector3(halfSize, p, 0)]);
            lines.push([new THREE.Vector3(p, -halfSize, 0), new THREE.Vector3(p, halfSize, 0)]);
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
                            array={new Float32Array([...line[0].toArray(), ...line[1].toArray()])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#22d3ee" transparent opacity={0.2} />
                </line>
            ))}
        </group>
    );
}

// Component: MouseTracker.js
export function MouseTracker() {
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
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1} transparent opacity={0.8} />
        </mesh>
    );
}