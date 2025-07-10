// ============= 8. Components/AboutSection.jsx (With Scroll Animations) =============
import React from 'react';
import { useInView } from 'react-intersection-observer'; // Import the hook
import { GraduationCap, Briefcase, Code, Database, Cloud, Brain, Zap } from 'lucide-react';
import NMImg from '../../assets/NM.jpg';
import MMLogo from '../../assets/mm.png';

const AboutSection = () => {
  // Create refs and inView states for each element you want to animate
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: profileCardRef, inView: profileCardInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: roleCardRef, inView: roleCardInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: educationCardRef, inView: educationCardInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: techTitleRef, inView: techTitleInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: techGridRef, inView: techGridInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: descriptionRef, inView: descriptionInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Calculate work experience from July 2024
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

  const { years, months } = calculateExperience();

  return (
    <section className="overflow-hidden relative py-32">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-10 top-20 w-32 h-32 bg-gradient-to-br rounded-full blur-xl from-cyan-500/20 to-blue-500/20 animate-float-slow"></div>
        <div className="absolute right-20 top-40 w-24 h-24 bg-gradient-to-br rounded-full blur-lg from-purple-500/20 to-pink-500/20 animate-float-reverse"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br rounded-full blur-2xl from-green-500/15 to-teal-500/15 animate-float-slow"></div>
      </div>
      
      <div className="container relative z-10 px-6 mx-auto">
        {/* Enhanced Title - Slide in from Bottom */}
        <div
          ref={titleRef}
          className={`mb-20 text-center transition-all duration-700 ease-out ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4 transform hover:scale-105 transition-all duration-500 [text-shadow:0_0_30px_rgba(34,211,238,0.5)] font-georama">
            About Me
          </h2>
          <div className="mx-auto w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>

        {/* Main Content Grid with 3D Cards */}
        <div className="grid gap-12 items-start mb-16 lg:grid-cols-2 font-georamalight">
          
          {/* Left Side - Slide in from Left */}
          <div
            ref={profileCardRef}
            className={`relative group transition-all duration-700 ease-out ${profileCardInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r rounded-3xl blur-xl transition-all duration-500 animate-pulse from-cyan-500/20 to-purple-500/20 group-hover:blur-2xl"></div>
            
            <div className="relative p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-3xl transition-all duration-500 hover:[transform:perspective(1000px)_rotateX(5deg)_rotateY(-5deg)_translateZ(50px)] [transform-style:preserve-3d] hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/25">
              <div className="text-center mb-8 [transform:translateZ(30px)]">
                <div className="inline-block relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-110 [transform:translateZ(20px)] overflow-hidden">
                    <img src={NMImg} alt="Naveen Malhotra" className="object-cover w-full h-full rounded-full" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-3 h-3 bg-cyan-400 rounded-full opacity-70 animate-float-slow"></div>
                  <div className="absolute -bottom-2 -right-6 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-float-reverse"></div>
                  <div className="absolute top-8 -right-8 w-4 h-4 bg-pink-400 rounded-full opacity-50 animate-float-slow"></div>
                </div>
              </div>
              <div className="space-y-6 [transform:translateZ(20px)]">
                <div className="text-center">
                  <h3 className="mb-2 text-2xl font-bold text-white transition-colors duration-300 hover:text-cyan-400">
                    Naveen Malhotra
                  </h3>
                  <p className="mb-4 font-semibold text-cyan-400">Full Stack Developer & 3D Web Developer & AI/ML Engineer</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 hover:[transform:translateZ(10px)] transition-all duration-300 hover:border-cyan-400/50">
                    <div className="mb-1 text-2xl font-bold text-cyan-400">5+</div>
                    <div className="text-sm text-gray-300">Live Systems</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 hover:[transform:translateZ(10px)] transition-all duration-300 hover:border-purple-400/50">
                    <div className="mb-1 text-2xl font-bold text-purple-400">12+</div>
                    <div className="text-sm text-gray-300">Projects</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['React.js', 'Next.js', 'Python', 'Three.js', 'TensorFlow', 'Node.js', 'Flask'].map((skill, index) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 rounded-full border border-gray-500/50 hover:border-cyan-400/50 hover:[transform:translateZ(5px)_scale(1.1)] transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Slide in from Right */}
          <div className="space-y-8">
            {/* Current Role Card - Now First */}
            <div
              ref={roleCardRef}
              className={`relative group transition-all duration-700 ease-out ${roleCardInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl transition-all duration-500 from-orange-500/20 to-red-500/20 group-hover:blur-2xl"></div>
              <div className="relative p-6 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl transition-all duration-500 hover:[transform:perspective(1000px)_rotateX(5deg)_rotateY(-5deg)_translateZ(30px)] [transform-style:preserve-3d] hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/25">
                {/* Company Logo - Top Right */}
                <div className="absolute top-4 right-4 [transform:translateZ(25px)]">
                  <div className="w-28 h-12 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-gray-500/30 hover:[transform:translateZ(10px)_scale(1.1)] transition-all duration-300 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/25">
                    <img 
                      src={MMLogo} 
                      alt="Mahindra Logo" 
                      className="object-contain w-full h-full filter brightness-110" 
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 items-start [transform:translateZ(20px)]">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg hover:[transform:translateZ(10px)_rotateY(-10deg)] transition-all duration-300">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <h3 className="mb-1 text-xl font-bold text-orange-400 transition-colors duration-300 hover:text-orange-300">Current Role</h3>
                      <p className="font-semibold text-white">Application Developer</p>
                      <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Mahindra and Mahindra LTD.</p>
                      <p className="text-sm text-gray-400">Mumbai • September 2024 - Present</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs text-orange-300 rounded-full border bg-orange-500/20 border-orange-500/30">Full-time</span>
                        <span className="px-2 py-1 text-xs text-red-300 rounded-full border bg-red-500/20 border-red-500/30">Mumbai</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Card - Now Second */}
            <div
              ref={educationCardRef}
              className={`relative group transition-all duration-700 ease-out delay-200 ${educationCardInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl transition-all duration-500 from-green-500/20 to-blue-500/20 group-hover:blur-2xl"></div>
              <div className="relative p-6 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl transition-all duration-500 hover:[transform:perspective(1000px)_rotateX(-5deg)_rotateY(5deg)_translateZ(30px)] [transform-style:preserve-3d] hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/25">
                <div className="flex gap-4 items-start [transform:translateZ(20px)]">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg hover:[transform:translateZ(10px)_rotateY(10deg)] transition-all duration-300">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="mb-1 text-xl font-bold text-green-400 transition-colors duration-300 hover:text-green-300">Education</h3>
                        <p className="font-semibold text-white">Manipal University Jaipur</p>
                        <p className="text-sm text-gray-400">Aug 2020 – July 2024</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 transition-transform duration-300 hover:scale-110">9.53</div>
                        <div className="text-xs text-gray-400">CGPA</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-300">B.Tech in Computer & Communication Engineering</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 text-xs text-green-300 rounded-full border bg-green-500/20 border-green-500/30">Bachelor's</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Overview - Enhanced with AI/ML */}
        <div className="mb-16 text-center font-georamalight">
        <h3
            ref={techTitleRef}
            className={`mb-8 text-4xl md:text-4xl font-bold text-white transition-all duration-700 ease-out ${techTitleInView ? 'opacity-100' : 'opacity-0'}`}
          >
 Current Tech Battlefield
          </h3>
          <div
            ref={techGridRef}
            className={`grid gap-8 mx-auto max-w-6xl lg:grid-cols-4 md:grid-cols-2 transition-all duration-700 ease-out ${techGridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Frontend */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl transition-all duration-500 from-cyan-500/20 to-blue-500/20 group-hover:blur-2xl"></div>
              <div className="relative p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl transition-all duration-500 hover:[transform:perspective(1000px)_rotateY(-10deg)_translateZ(40px)] [transform-style:preserve-3d] hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/25">
                <div className="[transform:translateZ(30px)]">
                  <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6 inline-block shadow-xl hover:[transform:translateZ(20px)_rotateX(10deg)] transition-all duration-300">
                    <Code className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="mb-4 text-xl font-bold text-cyan-400 transition-colors duration-300 hover:text-cyan-300">Frontend</h4>
                  <div className="space-y-3">
                    {['React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'Three.js', 'Framer Motion', 'Zustand', 'React Query'].map((tech, index) => (
                      <div key={tech} className="p-2 bg-gray-700/50 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-300 hover:[transform:translateZ(5px)] cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl transition-all duration-500 from-green-500/20 to-teal-500/20 group-hover:blur-2xl"></div>
              <div className="relative p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl transition-all duration-500 hover:[transform:perspective(1000px)_rotateY(0deg)_translateZ(40px)] [transform-style:preserve-3d] hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/25">
                <div className="[transform:translateZ(30px)]">
                  <div className="p-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mb-6 inline-block shadow-xl hover:[transform:translateZ(20px)_rotateX(10deg)] transition-all duration-300">
                    <Database className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="mb-4 text-xl font-bold text-green-400 transition-colors duration-300 hover:text-green-300">Backend</h4>
                  <div className="space-y-3">
                    {['Node.js', 'Python', 'Express.js', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL'].map((tech, index) => (
                      <div key={tech} className="p-2 bg-gray-700/50 rounded-lg text-gray-300 hover:bg-green-500/20 hover:text-green-300 transition-all duration-300 hover:[transform:translateZ(5px)] cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI/ML */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl transition-all duration-500 from-purple-500/20 to-pink-500/20 group-hover:blur-2xl"></div>
              <div className="relative p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl transition-all duration-500 hover:[transform:perspective(1000px)_rotateY(10deg)_translateZ(40px)] [transform-style:preserve-3d] hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/25">
                <div className="[transform:translateZ(30px)]">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 inline-block shadow-xl hover:[transform:translateZ(20px)_rotateX(10deg)] transition-all duration-300">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="mb-4 text-xl font-bold text-purple-400 transition-colors duration-300 hover:text-purple-300">AI/ML</h4>
                  <div className="space-y-3">
                    {['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'Hugging Face', 'Langchain'].map((tech, index) => (
                      <div key={tech} className="p-2 bg-gray-700/50 rounded-lg text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-300 hover:[transform:translateZ(5px)] cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl transition-all duration-500 from-orange-500/20 to-yellow-500/20 group-hover:blur-2xl"></div>
              <div className="relative p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl transition-all duration-500 hover:[transform:perspective(1000px)_rotateY(-10deg)_translateZ(40px)] [transform-style:preserve-3d] hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/25">
                <div className="[transform:translateZ(30px)]">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl mb-6 inline-block shadow-xl hover:[transform:translateZ(20px)_rotateX(10deg)] transition-all duration-300">
                    <Cloud className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="mb-4 text-xl font-bold text-orange-400 transition-colors duration-300 hover:text-orange-300">Cloud & DevOps</h4>
                  <div className="space-y-3">
                    {['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins'].map((tech, index) => (
                      <div key={tech} className="p-2 bg-gray-700/50 rounded-lg text-gray-300 hover:bg-orange-500/20 hover:text-orange-300 transition-all duration-300 hover:[transform:translateZ(5px)] cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Description - Enhanced */}
        <div
          ref={descriptionRef}
          className={`mx-auto max-w-4xl text-center transition-all duration-700 ease-out font-georama ${descriptionInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r rounded-3xl blur-2xl transition-all duration-500 from-cyan-500/10 to-purple-500/10 group-hover:blur-3xl"></div>
            <div className="relative p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-2xl border border-gray-600/30 rounded-3xl transition-all duration-500 hover:[transform:translateY(-10px)] hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10">
              <p className="mb-6 text-xl leading-relaxed text-gray-200 transition-colors duration-300 hover:text-white">
                Passionate <span className="font-semibold text-cyan-400">full-stack developer</span> with expertise in building <span className="font-semibold text-purple-400">scalable web applications</span>, <span className="font-semibold text-pink-400">immersive 3D experiences</span>, and <span className="font-semibold text-green-400">intelligent AI/ML solutions</span>. Specialized in React.js ecosystem, Three.js, TensorFlow, and modern cloud-native architectures.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full border border-cyan-500/30 hover:[transform:translateY(-2px)] transition-all duration-300">🚀 Innovation Focused</span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/30 hover:[transform:translateY(-2px)] transition-all duration-300">🎯 Problem Solver</span>
                <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-300 rounded-full border border-green-500/30 hover:[transform:translateY(-2px)] transition-all duration-300">💡 Creative Thinker</span>
                <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 rounded-full border border-orange-500/30 hover:[transform:translateY(-2px)] transition-all duration-300">🤖 AI Enthusiast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;