import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, ExternalLink } from 'lucide-react';
import TypewriterHeader from '../UI/TypewriterHeader.jsx';
import WavingCreature from '../UI/WavingCreature';
import GlowingLogo from '../UI/GlowingLogo';

const Navigation = ({ activeSection, scrollToSection, isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // For sections on the main page, we still want to scroll
    if (scrollToSection && sectionId.startsWith('#')) {
      // We need to navigate to home first if we are on another page
      if (location.pathname !== '/') {
         window.location.href = `/${sectionId}`;
      } else {
        scrollToSection(sectionId.substring(1));
      }
    }
  };

  const navItems = [
    { label: 'Home', path: '/#home' },
    { label: 'About', path: '/#about' },
    { label: 'Experience', path: '/#experience' },
    { label: 'Projects', path: '/#projects' },
    { label: 'Skills', path: '/#skills' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-40 border-b backdrop-blur-xl bg-gray-900/95 border-gray-700/30 font-geormama">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex justify-between items-center">
          {/* Glowing Logo + Typewriter Header */}
          <div className="flex items-center">
            <GlowingLogo />
            <TypewriterHeader />
          </div>
          
          {/* Desktop Navigation + Creature Container */}
          <div className="flex relative items-center">
            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-6 md:flex">
              {navItems.map((item) => {
                const isPageLink = !item.path.includes('#');
                const targetSection = item.path.substring(item.path.indexOf('#') + 1);
                
                const isActive = isPageLink
                  ? location.pathname.startsWith(item.path)
                  : activeSection === targetSection && location.pathname === '/';

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => handleNavClick(item.path.includes('#') ? `#${targetSection}` : item.path)}
                    className={`font-medium transition-all duration-500 hover:text-cyan-400 relative group ${
                      isActive ? 'text-cyan-400' : 'text-gray-300'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </Link>
                );
              })}
              
              {/* Playground Button */}
              <Link
                to="/playground"
                className="flex gap-2 items-center px-4 py-2 font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 border-purple-400/30 group"
              >
                <Code className="w-4 h-4 transition-transform group-hover:rotate-12" />
                <span>Playground</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>
            </div>
            
            <div className='hidden ml-5 md:block'><WavingCreature /></div> 
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg transition-all duration-300 md:hidden hover:bg-gray-800/50 hover:scale-110"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="border-t backdrop-blur-xl border-gray-700/50 md:hidden bg-gray-800/95">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => {
               const targetSection = item.path.substring(item.path.indexOf('#') + 1);
               return(
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => handleNavClick(item.path.includes('#') ? `#${targetSection}` : item.path)}
                  className={`block w-full text-left transition-all duration-500 hover:text-cyan-400 hover:translate-x-2 ${
                    location.pathname.startsWith(item.path) || (activeSection === targetSection && location.pathname === '/') ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </Link>
               )
            })}
            
            {/* Mobile Playground Button */}
            <Link
              to="/playground"
              onClick={() => setIsMenuOpen(false)}
              className="flex gap-3 items-center p-3 mt-4 w-full text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg transition-all duration-300 hover:translate-x-2"
            >
              <Code className="w-5 h-5" />
              <span className="font-semibold">Live Code Playground</span>
              <ExternalLink className="ml-auto w-4 h-4 opacity-60" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;