import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import AnimatedProgressBar from '../ui/AnimatedProgressBar';
import SkillIcon, { CategoryIcon } from '../ui/SkillIcons';
import useRevealAnimations from '../utils/useRevealAnimations';

const Skills = () => {
  // Use the custom reveal hook
  const { ref: sectionRef, isVisible } = useRevealAnimations({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true
  });

  const [visibleCards, setVisibleCards] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate cards in sequence
      portfolioData.skills.categories.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 150);
      });
    }
  }, [isVisible]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding bg-[#12121a] relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-[#00F5FF]/5 rounded-full blur-3xl -top-48 -left-48"
          style={{
            animation: 'float 20s ease-in-out infinite',
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-deep-amethyst/5 rounded-full blur-3xl -bottom-48 -right-48"
          style={{
            animation: 'float 20s ease-in-out infinite reverse',
          }}
        ></div>
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className={`reveal-section-header ${isVisible ? 'reveal-active' : ''} text-center mb-16`}>
          <h2 className="heading-lg gradient-text mb-4">Skills & Expertise</h2>

          {/* Animated Gradient Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-sapphire-blue to-deep-amethyst mx-auto rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
              style={{
                animation: 'shimmer 2s infinite',
                width: '100%',
              }}
            ></div>
          </div>

          <p className="body-text max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {portfolioData.skills.categories.map((category, categoryIndex) => (
            <SkillCard
              key={categoryIndex}
              category={category}
              index={categoryIndex}
              isVisible={visibleCards.includes(categoryIndex)}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className={`reveal reveal-fade-in-up reveal-stagger-8 ${isVisible ? 'reveal-active' : ''} mt-16 text-center`}>
          <p className="text-gray-400 text-lg">
            Always learning and exploring new technologies.{' '}
            <span className="text-sapphire-blue">Current focus:</span> AI/ML integration and advanced frontend architectures.
          </p>
        </div>
      </div>

      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .skill-card-glow:hover {
          box-shadow:
            0 0 20px rgba(5, 181, 212, 0.3),
            0 0 40px rgba(168, 85, 247, 0.2);
        }
      `}</style>
    </section>
  );
};

// Individual Skill Card Component
const SkillCard = ({ category, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [progressBarsVisible, setProgressBarsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      // Trigger progress bars after card is visible
      setTimeout(() => {
        setProgressBarsVisible(true);
      }, 300);
    }
  }, [isVisible]);

  return (
    <div
      ref={cardRef}
      className={`group glass-card p-6 relative overflow-hidden transition-all duration-500 transform will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isHovered ? 'skill-card-glow -translate-y-2 scale-105 border-sapphire-blue/50' : 'hover:border-sapphire-blue/30 hover:-translate-y-1'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient border effect on hover */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(45deg, #00F5FF, #8A2BE2, #00F5FF)',
          backgroundSize: '200% 200%',
          animation: isHovered ? 'gradientShift 3s ease infinite' : 'none',
          filter: 'blur(8px)',
        }}
      />

      {/* Category Header */}
      <div className="flex items-center mb-6 relative z-10">
        <div className="mr-3 group/icon flex-shrink-0">
          <div className="neon-box-glow-subtle p-1.5 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/8 flex items-center justify-center">
            <CategoryIcon name={category.name} size={40} />
          </div>
        </div>
        <div className="flex-1">
          <h3 className={`heading-md text-lg transition-all duration-300 group-hover:text-sapphire-blue ${isHovered ? 'neon-text-cyan' : ''}`}>
            {category.name}
          </h3>
          <p className="text-gray-400 text-sm transition-colors duration-300 group-hover:text-gray-300">
            {category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}
          </p>
        </div>
        <div className={`w-2 h-2 rounded-full bg-sapphire-blue opacity-0 transition-all duration-300 ${isHovered ? 'opacity-100 shadow-[0_0_10px_rgba(30,64,175,0.8)]' : ''}`}></div>
      </div>

      {/* Skills List */}
      <div className="space-y-4 relative z-10">
        {category.skills.map((skill, skillIndex) => (
          <div key={skillIndex} className="group/skill">
            {/* Skill label row with icon */}
            <div
              className="flex justify-between items-center mb-1.5"
              style={{
                opacity: progressBarsVisible ? 1 : 0,
                transform: progressBarsVisible ? 'translateX(0)' : 'translateX(-10px)',
                transition: `all 0.5s ease-out ${skillIndex * 100}ms`,
              }}
            >
              <span className="flex items-center gap-2">
                <span className="p-0.5 rounded-md bg-white/5 border border-white/[0.07] flex items-center justify-center" style={{ width: 26, height: 26 }}>
                  <SkillIcon name={skill.name} size={16} />
                </span>
                <span className="text-gray-300 font-medium text-sm">{skill.name}</span>
              </span>
              <span className="font-semibold text-sm" style={{ color: '#00F5FF' }}>
                {progressBarsVisible ? skill.level : 0}%
              </span>
            </div>
            <AnimatedProgressBar
              percentage={skill.level}
              color="#00F5FF"
              duration={1200}
              height={8}
              showPercentage={false}
              glow={true}
              className="skill-progress-bar"
              style={{
                opacity: progressBarsVisible ? 1 : 0,
                transform: progressBarsVisible ? 'translateX(0)' : 'translateX(-10px)',
                transition: `all 0.5s ease-out ${skillIndex * 100}ms`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
