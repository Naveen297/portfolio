// ============= 1. Components/TypewriterHeader.jsx =============
import React, { useState, useEffect } from 'react';

const TypewriterHeader = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const texts = ['Naveen Malhotra', 'Navvy'];
  const typingSpeed = 120;
  const deletingSpeed = 80;
  const waitTime = 2000;

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, waitTime);
      return () => clearTimeout(waitTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        } else {
          setIsWaiting(true);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentTextIndex, isDeleting, isWaiting]);

  return (
    <div className="typewriter-container">
      <div className="typewriter-background-glow"></div>
      <div className="typewriter-text">
        <span className="typed-text font-geormama">{displayText}</span>
        <span className={`cursor ${cursorVisible ? 'visible' : 'hidden'}`}>|</span>
      </div>
      <div className="typewriter-underline"></div>
    </div>
  );
};

export default TypewriterHeader;