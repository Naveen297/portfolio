import React from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin } from 'lucide-react';
import Amazing3DScene from './Amazing3DScene';
import ContactForm from './ContactForm';

// The main contact section component that assembles everything
const ContactSection = () => {
    return (
        <section className="relative py-32 overflow-hidden bg-gray-900 font-geormama">
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
                    {/* Left Side: 3D Canvas and Contact Info Overlay */}
                    <motion.div
                        className="relative w-full overflow-hidden border border-gray-800 h-96 rounded-2xl lg:h-full bg-black/50 group"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} style={{ background: 'transparent' }}>
                            <Amazing3DScene />
                        </Canvas>
                        <ContactInfoOverlay />
                        <CornerTechLabels />
                    </motion.div>

                    {/* Right Side: Contact Form */}
                    <motion.div 
                        className="flex flex-col justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
                
                <TechStackDisplay />
            </div>
        </section>
    );
};

// Sub-component for the contact info that appears on hover
const ContactInfoOverlay = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-700 opacity-0 bg-gradient-to-br backdrop-blur-xl group-hover:opacity-100 from-black/80 via-gray-900/90 to-black/80">
        <motion.div 
            className="max-w-md space-y-6 text-center"
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
        >
            <div className="space-y-4">
                <ContactCard icon={<Mail className="w-6 h-6 text-cyan-400" />} title="Email" value="naveenmalhotra148@gmail.com" href="mailto:naveenmalhotra148@gmail.com" color="cyan" delay={0.4} />
                <ContactCard icon={<Linkedin className="w-6 h-6 text-purple-400" />} title="LinkedIn" value="Connect on LinkedIn" href="https://linkedin.com/in/naveenmalhotra148" color="purple" delay={0.5} />
                <ContactCard icon={<Phone className="w-6 h-6 text-green-400" />} title="Phone" value="+91 6386048691" href="tel:+916386048691" color="green" delay={0.6} />
            </div>
            <InteractionHint />
        </motion.div>
    </div>
);

// A reusable card for contact details
const ContactCard = ({ icon, title, value, href, color, delay }) => (
    <motion.a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`flex gap-4 items-center p-4 bg-gradient-to-r rounded-xl border backdrop-blur-md transition-all duration-300 from-${color}-500/20 to-blue-500/20 border-${color}-400/30 hover:border-${color}-400/60 group/card`}
        whileHover={{ scale: 1.05, y: -3, boxShadow: `0 20px 40px rgba(var(--${color}-rgb), 0.3)` }}
        whileTap={{ scale: 0.98 }}
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay }}
    >
        <div className={`p-3 rounded-lg border transition-all duration-300 bg-${color}-500/20 border-${color}-400/50 group-hover/card:bg-${color}-500/30`}>
            {icon}
        </div>
        <div className="flex-1 text-left">
            <div className="text-sm font-medium tracking-wide text-gray-300 uppercase">{title}</div>
            <div className={`text-lg font-bold text-white transition-colors group-hover/card:text-${color}-300`}>{value}</div>
        </div>
    </motion.a>
);

// Hint for user interaction
const InteractionHint = () => (
    <motion.div 
        // className="p-4 mt-8 border rounded-lg bg-gradient-to-r backdrop-blur-md from-yellow-500/10 to-orange-500/10 border-yellow-400/20"
        // initial={{ opacity: 0, y: 20 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // transition={{ delay: 0.8 }}
    >
        {/* <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold tracking-wide text-yellow-400 uppercase">Interactive 3D</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-sm text-gray-300">Move your cursor to interact with the scene</p> */}
    </motion.div>
);

// Corner labels for the canvas
const CornerTechLabels = () => (
    <>
        <div className="absolute px-3 py-1 font-mono text-xs border rounded-full top-4 left-4 text-cyan-400 bg-black/50 border-cyan-500/30">Three.js + R3F</div>
        <div className="absolute px-3 py-1 font-mono text-xs text-purple-400 border rounded-full right-4 bottom-4 bg-black/50 border-purple-500/30">Interactive 3D</div>
    </>
);

// Display of the tech stack at the bottom
const TechStackDisplay = () => {
    const technologies = ['Three.js', 'React Three Fiber', 'Framer Motion', 'WebGL', 'React.js', 'Quantum Computing Visualization'];
    return (
        <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
        >
            <p className="mb-4 text-sm text-gray-500">Powered by cutting-edge technology</p>
<div className="flex flex-wrap justify-center gap-4">
    {technologies.map((tech, index) => (
        <motion.span
            key={tech}
            className="px-3 py-1 font-mono text-xs border rounded-full text-cyan-400 bg-gray-800/50 border-cyan-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }} // This remains for the initial stagger animation
            
            // Apply a faster, specific transition just for the hover effect
            whileHover={{ 
                scale: 1.1, 
                y: -2, 
                transition: { type: 'tween', duration: 0.2, ease: 'easeOut' } 
            }}
        >
            {tech}
        </motion.span>
    ))}
</div>
        </motion.div>
    );
};

export default ContactSection;