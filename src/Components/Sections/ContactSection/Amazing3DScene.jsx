import React, { Suspense } from 'react';
import {
    EnergyOrb,
    QuantumField,
    DNAHelix,
    NeuralNetwork,
    HolographicGrid,
    MouseTracker
} from './components/3D-Elements';

// Main 3D Scene Component
const Amazing3DScene = () => {
    return (
        <>
            {/* Lighting setup for the scene */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={100} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={50} color="#22d3ee" />
            <pointLight position={[5, -5, 5]} intensity={30} color="#a855f7" />
            
            {/* All 3D elements are wrapped in Suspense for potential async loading */}
            <Suspense fallback={null}>
                <QuantumField />
                <DNAHelix />
                <NeuralNetwork />
                <HolographicGrid />
                <MouseTracker />
                
                {/* Individual Energy Orbs */}
                <EnergyOrb position={[-3, 2, 1]} color="#22d3ee" size={0.3} />
                <EnergyOrb position={[3, -1, 2]} color="#a855f7" size={0.25} />
                <EnergyOrb position={[0, 3, -1]} color="#ec4899" size={0.35} />
                <EnergyOrb position={[-2, -2, 3]} color="#fbbf24" size={0.2} />
                <EnergyOrb position={[4, 1, -2]} color="#10b981" size={0.28} />
            </Suspense>
        </>
    );
};

export default Amazing3DScene;