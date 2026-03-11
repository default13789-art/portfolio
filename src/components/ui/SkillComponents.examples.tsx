import React from 'react';
import SkillCard from './SkillCard';
import AnimatedProgressBar from './AnimatedProgressBar';
import RotatingIcon from './RotatingIcon';

/**
 * SkillComponents.examples
 *
 * This file demonstrates how to use the animated skill components
 * in your AI engineer portfolio.
 */

// Example 1: Using AnimatedProgressBar standalone
export const AnimatedProgressBarExample = () => {
  return (
    <div className="space-y-6 p-8 bg-[#12121a] min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-8">Animated Progress Bars</h2>

      {/* Basic progress bar */}
      <AnimatedProgressBar percentage={85} label="Python" />

      {/* Custom color and duration */}
      <AnimatedProgressBar
        percentage={92}
        color="#ff6b6b"
        label="React"
        duration={2000}
      />

      {/* Different height */}
      <AnimatedProgressBar
        percentage={78}
        color="#4ecdc4"
        label="TypeScript"
        height={12}
      />

      {/* Without percentage label */}
      <AnimatedProgressBar
        percentage={95}
        color="#ffe66d"
        label="Node"
        showPercentage={false}
      />

      {/* Without glow effect */}
      <AnimatedProgressBar
        percentage={88}
        color="#95e1d3"
        label="GraphQL"
        glow={false}
      />
    </div>
  );
};

// Example 2: Using RotatingIcon standalone
export const RotatingIconExample = () => {
  // Sample SVG icons
  const _BrainIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.5 2C9.5 2 9.5 2 9.5 2C9.5 2 9.5 2 9.5 2C9.5 2 9.5 2 9.5 2C9.5 2 9.5 2 9.5 2Z"
        stroke="#00F5FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2C12 2 12 2 12 2C12 2 12 2 12 2C12 2 12 2 12 2C12 2 12 2 12 2Z"
        stroke="#00F5FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="#00F5FF" strokeWidth="2" />
      <path d="M12 15V22M9 22H15" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="5" stroke="#00F5FF" strokeWidth="2" />
    </svg>
  );

  const CodeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 18L22 12L16 6"
        stroke="#8A2BE2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6L2 12L8 18"
        stroke="#8A2BE2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const AIIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#ff6b6b" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="#ff6b6b" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" fill="#ff6b6b" />
    </svg>
  );

  return (
    <div className="space-y-8 p-8 bg-[#12121a] min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-8">Rotating Icons</h2>

      <div className="flex gap-8 items-center flex-wrap">
        {/* Default rotating icon */}
        <div className="text-center">
          <RotatingIcon>{<BrainIcon />}</RotatingIcon>
          <p className="text-gray-400 text-sm mt-2">Default</p>
        </div>

        {/* Custom size */}
        <div className="text-center">
          <RotatingIcon size={64}>{<CodeIcon />}</RotatingIcon>
          <p className="text-gray-400 text-sm mt-2">Large (64px)</p>
        </div>

        {/* Custom rotation speed */}
        <div className="text-center">
          <RotatingIcon rotationSpeed="3s">{<AIIcon />}</RotatingIcon>
          <p className="text-gray-400 text-sm mt-2">Fast (3s)</p>
        </div>

        {/* Counter-clockwise */}
        <div className="text-center">
          <RotatingIcon rotationDirection="counter-clockwise">
            {<BrainIcon />}
          </RotatingIcon>
          <p className="text-gray-400 text-sm mt-2">Counter-clockwise</p>
        </div>

        {/* Custom glow color */}
        <div className="text-center">
          <RotatingIcon glowColor="#ff6b6b">{<CodeIcon />}</RotatingIcon>
          <p className="text-gray-400 text-sm mt-2">Red glow</p>
        </div>

        {/* Without glow */}
        <div className="text-center">
          <RotatingIcon showGlow={false}>{<AIIcon />}</RotatingIcon>
          <p className="text-gray-400 text-sm mt-2">No glow</p>
        </div>
      </div>
    </div>
  );
};

// Example 3: Using SkillCard with various configurations
export const SkillCardExample = () => {
  // Sample SVG icons for categories
  const AIIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="#00F5FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="#00F5FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="#00F5FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const WebDevIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#8A2BE2" strokeWidth="2" />
      <path d="M2 12H22" stroke="#8A2BE2" strokeWidth="2" />
      <path d="M12 2C12 2 12 12 12 22" stroke="#8A2BE2" strokeWidth="2" />
    </svg>
  );

  const CloudIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 10H17.5C17.5 6.41 14.59 3.5 11 3.5C7.96 3.5 5.38 5.55 4.41 8.29C4.15 8.25 3.85 8.25 3.59 8.29C1.96 8.57 0.5 10.18 0.5 12C0.5 13.93 2.07 15.5 4 15.5H18C19.93 15.5 21.5 13.93 21.5 12C21.5 10.07 19.93 8.5 18 8.5C17.72 8.5 17.45 8.53 17.19 8.59"
        stroke="#4ecdc4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="p-8 bg-[#12121a] min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-8">Skill Cards</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AI & Machine Learning Card */}
        <SkillCard
          icon={<AIIcon />}
          title="AI & Machine Learning"
          description="Building intelligent systems with cutting-edge technologies"
          glowColor="#00F5FF"
          delay={0}
          skills={[
            { name: 'TensorFlow', level: 90 },
            { name: 'PyTorch', level: 85 },
            { name: 'OpenAI API', level: 95 },
            { name: 'LangChain', level: 80 },
          ]}
        />

        {/* Web Development Card */}
        <SkillCard
          icon={<WebDevIcon />}
          title="Web Development"
          description="Modern web applications with React and Next"
          glowColor="#8A2BE2"
          delay={100}
          rotationSpeed="15s"
          skills={[
            { name: 'React', level: 95 },
            { name: 'Next', level: 90 },
            { name: 'TypeScript', level: 88 },
            { name: 'TailwindCSS', level: 92 },
          ]}
        />

        {/* Cloud & DevOps Card */}
        <SkillCard
          icon={<CloudIcon />}
          title="Cloud & DevOps"
          description="Scalable infrastructure and deployment solutions"
          glowColor="#4ecdc4"
          delay={200}
          pauseIconOnHover={false}
          skills={[
            { name: 'AWS', level: 85 },
            { name: 'Docker', level: 82 },
            { name: 'Kubernetes', level: 75 },
            { name: 'CI/CD', level: 88 },
          ]}
        />

        {/* Custom colors per skill */}
        <SkillCard
          icon={<AIIcon />}
          title="Programming Languages"
          description="Core programming expertise"
          glowColor="#ff6b6b"
          delay={300}
          skills={[
            { name: 'Python', level: 95, color: '#00F5FF' },
            { name: 'JavaScript', level: 92, color: '#ffe66d' },
            { name: 'TypeScript', level: 88, color: '#4ecdc4' },
            { name: 'Go', level: 75, color: '#ff6b6b' },
          ]}
        />
      </div>
    </div>
  );
};

// Example 4: Complete Skills Section implementation
export const SkillsSectionExample = () => {
  const AIIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const WebDevIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12H22" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2C12 2 12 12 12 22" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const categories = [
    {
      icon: <AIIcon />,
      title: 'AI & Machine Learning',
      description: 'Expertise in building intelligent systems',
      glowColor: '#00F5FF',
      skills: [
        { name: 'TensorFlow', level: 90 },
        { name: 'PyTorch', level: 85 },
        { name: 'OpenAI API', level: 95 },
        { name: 'LangChain', level: 80 },
        { name: 'Hugging Face', level: 88 },
      ],
    },
    {
      icon: <WebDevIcon />,
      title: 'Web Development',
      description: 'Full-stack modern web applications',
      glowColor: '#8A2BE2',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next', level: 90 },
        { name: 'TypeScript', level: 88 },
        { name: 'Node', level: 85 },
        { name: 'GraphQL', level: 82 },
      ],
    },
  ];

  return (
    <section id="skills" className="section-padding bg-[#12121a]">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg gradient-text mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] mx-auto rounded-full mb-6" />
          <p className="body-text max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              glowColor={category.glowColor}
              delay={index * 100}
              skills={category.skills}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg">
            Always learning and exploring new technologies.{' '}
            <span className="text-[#00F5FF]">Current focus:</span> AI/ML
            integration and advanced frontend architectures.
          </p>
        </div>
      </div>
    </section>
  );
};

// Example 5: Minimal usage
export const MinimalExample = () => {
  return (
    <div className="p-8 bg-[#12121a]">
      {/* Just a simple progress bar */}
      <AnimatedProgressBar percentage={75} label="My Skill" />

      {/* Just a simple rotating icon */}
      <div className="mt-8">
        <RotatingIcon>
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#00F5FF" strokeWidth="2" />
          </svg>
        </RotatingIcon>
      </div>

      {/* Just a simple skill card */}
      <div className="mt-8 max-w-md">
        <SkillCard
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#8A2BE2" strokeWidth="2" />
            </svg>
          }
          title="My Category"
          skills={[{ name: 'Skill 1', level: 80 }, { name: 'Skill 2', level: 90 }]}
        />
      </div>
    </div>
  );
};

export default {
  AnimatedProgressBarExample,
  RotatingIconExample,
  SkillCardExample,
  SkillsSectionExample,
  MinimalExample,
};
