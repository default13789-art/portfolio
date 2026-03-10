import React, { useState, useEffect, useRef } from 'react';
import TiltCard from './TiltCard';
import RotatingIcon from './RotatingIcon';
import AnimatedProgressBar from './AnimatedProgressBar';

/**
 * SkillCard - A glassmorphism card for displaying skill categories with animations
 *
 * @component
 * @example
 * // See README.SKILL_COMPONENTS.md for usage examples
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - SVG icon for the category
 * @param {string} props.title - Category title
 * @param {string} [props.description] - Category description
 * @param {Array<{name: string, level: number, color?: string}>} props.skills - Array of skills with levels
 * @param {string} [props.glowColor='#3ce6f9'] - Color for glow effects
 * @param {number} [props.delay=0] - Entrance animation delay in milliseconds
 * @param {number} [props.iconSize=48] - Size of the rotating icon
 * @param {string} [props.rotationSpeed='10s'] - Rotation speed for the icon
 * @param {boolean} [props.pauseIconOnHover=true] - Whether to pause icon rotation on hover
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {boolean} [props.showPercentage=true] - Whether to show percentage labels on progress bars
 * @returns {JSX.Element} The SkillCard component
 */
const SkillCard = ({
  icon,
  title,
  description,
  skills = [],
  glowColor = '#3ce6f9',
  delay = 0,
  iconSize = 48,
  rotationSpeed = '10s',
  pauseIconOnHover = true,
  className = '',
  showPercentage = true,
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef(null);

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsInView(true);
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [hasAnimated]);

  // Validate skills array
  const validatedSkills = Array.isArray(skills)
    ? skills.map((skill) => ({
        name: skill.name || 'Unknown',
        level: Math.max(0, Math.min(100, skill.level || 0)),
        color: skill.color || glowColor,
      }))
    : [];

  return (
    <div
      ref={cardRef}
      className={`skill-card-wrapper ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      <TiltCard
        glowColor={glowColor}
        className="skill-card h-full"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${glowColor}30`,
        }}
      >
        {/* Card Header */}
        <div className="skill-card-header mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Rotating Icon */}
              <div className="icon-container">
                <RotatingIcon
                  rotationSpeed={rotationSpeed}
                  pauseOnHover={pauseIconOnHover}
                  glowColor={glowColor}
                  size={iconSize}
                >
                  {icon}
                </RotatingIcon>
              </div>

              {/* Title and Description */}
              <div className="flex-1">
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${glowColor}, #a855f7)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {title}
                </h3>
                {description && (
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Decorative line */}
          <div
            className="h-px rounded-full mb-4"
            style={{
              background: `linear-gradient(90deg, ${glowColor}60, transparent)`,
            }}
          />
        </div>

        {/* Skills List */}
        <div className="skills-list space-y-4">
          {validatedSkills.map((skill, index) => (
            <AnimatedProgressBar
              key={`${skill.name}-${index}`}
              percentage={skill.level}
              color={skill.color}
              label={skill.name}
              duration={1500 + index * 100}
              showPercentage={showPercentage}
              height={8}
              glow={true}
            />
          ))}

          {/* Empty state */}
          {validatedSkills.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No skills to display</p>
            </div>
          )}
        </div>

        {/* Neon border glow effect */}
        <div
          className="neon-glow"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '16px',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            boxShadow: `inset 0 0 20px ${glowColor}20`,
          }}
        />

        {/* Card styles */}
        <style jsx>{`
          .skill-card-wrapper {
            position: relative;
            height: 100%;
          }

          .skill-card {
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: all 0.3s ease;
          }

          .skill-card:hover .neon-glow {
            opacity: 1;
          }

          .icon-container {
            flex-shrink: 0;
          }

          .skill-card-header {
            flex-shrink: 0;
          }

          .skills-list {
            flex: 1;
            overflow-y: auto;
            padding-right: 8px;
          }

          /* Custom scrollbar for skills list */
          .skills-list::-webkit-scrollbar {
            width: 4px;
          }

          .skills-list::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 2px;
          }

          .skills-list::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
          }

          .skills-list::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            .skill-card-wrapper {
              transition: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }

          /* Responsive adjustments */
          @media (max-width: 640px) {
            .skill-card-header {
              margin-bottom: 1rem;
            }

            .icon-container {
              display: flex;
              justify-content: center;
              margin-bottom: 1rem;
            }

            .skills-list {
              padding-right: 4px;
            }
          }
        `}</style>
      </TiltCard>
    </div>
  );
};

export default SkillCard;
