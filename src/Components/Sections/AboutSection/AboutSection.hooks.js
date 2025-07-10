import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  COMPANY_INFO, 
  PROFILE_STATS, 
  CORE_SKILLS, 
  TECH_STACK_DATA,
  PERSONAL_DESCRIPTION,
  PERSONAL_TRAITS
} from './AboutSection.constants';

// Calculate work experience helper
const calculateExperience = () => {
  const startDate = new Date(2024, 6, 1); // July 2024 (month is 0-indexed)
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months };
};

export const useAboutSection = () => {
  // Intersection observer hooks for animations
  const { ref: titleRef, inView: titleInView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });
  
  const { ref: profileCardRef, inView: profileCardInView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });
  
  const { ref: roleCardRef, inView: roleCardInView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });
  
  const { ref: educationCardRef, inView: educationCardInView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });
  
  const { ref: techTitleRef, inView: techTitleInView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });
  
  const { ref: techGridRef, inView: techGridInView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });
  
  const { ref: descriptionRef, inView: descriptionInView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });

  // Memoized data calculations
  const experienceData = useMemo(() => {
    const { years, months } = calculateExperience();
    return {
      company: COMPANY_INFO.CURRENT,
      duration: { years, months },
      education: COMPANY_INFO.EDUCATION
    };
  }, []);

  const profileData = useMemo(() => ({
    name: 'Naveen Malhotra',
    role: 'Full Stack Developer & 3D Web Developer & AI/ML Engineer',
    stats: PROFILE_STATS,
    skills: CORE_SKILLS,
    description: PERSONAL_DESCRIPTION,
    traits: PERSONAL_TRAITS
  }), []);

  const techStackData = useMemo(() => TECH_STACK_DATA, []);

  return {
    // Animation refs and states
    refs: {
      titleRef,
      profileCardRef,
      roleCardRef,
      educationCardRef,
      techTitleRef,
      techGridRef,
      descriptionRef
    },
    inViewStates: {
      titleInView,
      profileCardInView,
      roleCardInView,
      educationCardInView,
      techTitleInView,
      techGridInView,
      descriptionInView
    },
    // Data
    profileData,
    experienceData,
    techStackData
  };
};