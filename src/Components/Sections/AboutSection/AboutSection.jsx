import React from 'react';
import SectionHeader from './components/SectionHeader';
import ProfileCard from './components/ProfileCard';
import ExperienceCard from './components/ExperienceCard';
import EducationCard from './components/EducationCard';
import TechStackGrid from './components/TechStackGrid';
import PersonalDescription from './components/PersonalDescription';
import BackgroundEffects from './components/BackgroundEffects';
import { useAboutSection } from './AboutSection.hooks';

const AboutSection = () => {
  const {
    refs,
    inViewStates,
    profileData,
    experienceData,
    techStackData
  } = useAboutSection();

  return (
    <section className="overflow-hidden relative py-32">
      <BackgroundEffects />
      
      <div className="container relative z-10 px-6 mx-auto">
        <SectionHeader 
          ref={refs.titleRef}
          inView={inViewStates.titleInView}
        />

        <div className="grid gap-12 items-start mb-16 lg:grid-cols-2 font-geormama">
          <ProfileCard 
            ref={refs.profileCardRef}
            data={profileData}
            inView={inViewStates.profileCardInView}
          />

          <div className="space-y-8">
            <ExperienceCard 
              ref={refs.roleCardRef}
              data={experienceData}
              inView={inViewStates.roleCardInView}
            />
            
            <EducationCard 
              ref={refs.educationCardRef}
              data={experienceData.education}
              inView={inViewStates.educationCardInView}
            />
          </div>
        </div>

        <TechStackGrid 
          titleRef={refs.techTitleRef}
          gridRef={refs.techGridRef}
          titleInView={inViewStates.techTitleInView}
          gridInView={inViewStates.techGridInView}
          data={techStackData}
        />

        <PersonalDescription 
          ref={refs.descriptionRef}
          data={profileData}
          inView={inViewStates.descriptionInView}
        />
      </div>
    </section>
  );
};

export default AboutSection;