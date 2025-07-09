import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Navigation from './Navigation';
import LoadingScreen from './LoadingScreen';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import LinkedInPostsSection from './LinkedInPostsSection'; // ADD THIS IMPORT
import ContactSection from './ContactSection';
import Footer from './Footer';
import '../Styles/portfolioStyles.css';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  // --- NEW: Refs for each section to enable scrolling ---
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const linkedinRef = useRef(null); // ADD THIS REF
  const contactRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    experience: experienceRef,
    projects: projectsRef,
    skills: skillsRef,
    linkedin: linkedinRef, // ADD THIS TO SECTION REFS
    contact: contactRef,
  };

  // --- NEW: Function to handle smooth scrolling ---
  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // --- NEW: Intersection observers to track which section is in view ---
  const observerOptions = { threshold: 0.3, rootMargin: "-50px 0px -50px 0px" };
  const { ref: homeViewRef, inView: homeInView } = useInView(observerOptions);
  const { ref: aboutViewRef, inView: aboutInView } = useInView(observerOptions);
  const { ref: experienceViewRef, inView: experienceInView } = useInView(observerOptions);
  const { ref: projectsViewRef, inView: projectsInView } = useInView(observerOptions);
  const { ref: skillsViewRef, inView: skillsInView } = useInView(observerOptions);
  const { ref: linkedinViewRef, inView: linkedinInView } = useInView(observerOptions); // ADD THIS
  const { ref: contactViewRef, inView: contactInView } = useInView(observerOptions);

  // --- NEW: Combine refs for both scrolling and observing ---
  const setHomeRef = (node) => { homeRef.current = node; homeViewRef(node); };
  const setAboutRef = (node) => { aboutRef.current = node; aboutViewRef(node); };
  const setExperienceRef = (node) => { experienceRef.current = node; experienceViewRef(node); };
  const setProjectsRef = (node) => { projectsRef.current = node; projectsViewRef(node); };
  const setSkillsRef = (node) => { skillsRef.current = node; skillsViewRef(node); };
  const setLinkedInRef = (node) => { linkedinRef.current = node; linkedinViewRef(node); }; // ADD THIS
  const setContactRef = (node) => { contactRef.current = node; contactViewRef(node); };

  // --- NEW: Effect to update the active section based on scroll position ---
  useEffect(() => {
    if (homeInView) setActiveSection('home');
    else if (aboutInView) setActiveSection('about');
    else if (experienceInView) setActiveSection('experience');
    else if (projectsInView) setActiveSection('projects');
    else if (skillsInView) setActiveSection('skills');
    else if (linkedinInView) setActiveSection('linkedin'); // ADD THIS
    else if (contactInView) setActiveSection('contact');
  }, [homeInView, aboutInView, experienceInView, projectsInView, skillsInView, linkedinInView, contactInView]); // ADD linkedinInView

  // Initialize Vanta.js effect
  useEffect(() => {
    const loadVantaScripts = () => {
      return new Promise((resolve) => {
        if (!window.THREE) {
          const threeScript = document.createElement('script');
          threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
          threeScript.onload = () => {
            const vantaScript = document.createElement('script');
            vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.rings.min.js';
            vantaScript.onload = resolve;
            document.head.appendChild(vantaScript);
          };
          document.head.appendChild(threeScript);
        } else if (!window.VANTA) {
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.rings.min.js';
          vantaScript.onload = resolve;
          document.head.appendChild(vantaScript);
        } else {
          resolve();
        }
      });
    };

    loadVantaScripts().then(() => {
      if (vantaRef.current && window.VANTA && window.VANTA.RINGS) {
        vantaEffect.current = window.VANTA.RINGS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x00ffff,
          backgroundColor: 0x0f0f23,
          backgroundAlpha: 0.8
        });
      }
    });

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Resume download functionality
  const downloadResume = () => {
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Resume download functionality would be implemented here');
    element.download = 'Naveen_Malhotra_Resume.pdf';
    element.click();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="overflow-x-hidden relative min-h-screen text-white bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Simplified background elements */}
      <div className="overflow-hidden fixed inset-0 opacity-50 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br rounded-full blur-3xl from-cyan-500/20 to-blue-500/20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br rounded-full blur-3xl from-purple-500/20 to-pink-500/20"></div>
      </div>

      <Navigation 
        activeSection={activeSection}
        scrollToSection={scrollToSection} // Pass the scroll function
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* --- NEW: Sections are wrapped in divs with refs for targeting --- */}
      <div ref={setHomeRef} id="home">
        <HeroSection 
          vantaRef={vantaRef}
          downloadResume={downloadResume}
        />
      </div>
      <div ref={setAboutRef} id="about">
        <AboutSection />
      </div>
      <div ref={setExperienceRef} id="experience">
        <ExperienceSection />
      </div>
      <div ref={setProjectsRef} id="projects">
        <ProjectsSection />
      </div>
      <div ref={setSkillsRef} id="skills">  
        <SkillsSection />
      </div>
      <div ref={setLinkedInRef} id="linkedin">
        {/* <LinkedInPostsSection /> */}
      </div>
      <div ref={setContactRef} id="contact">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;