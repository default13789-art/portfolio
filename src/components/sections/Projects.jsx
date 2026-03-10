import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Card, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import TiltCard from '../ui/TiltCard';
import useRevealAnimations from '../utils/useRevealAnimations';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [imageLoaded, setImageLoaded] = useState({});
  const [filteredProjects, setFilteredProjects] = useState(portfolioData.projects);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for tilt intensity adjustment
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use the custom reveal hook
  const { ref: sectionRef, isVisible } = useRevealAnimations({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  });

  // Handle image loading states
  const handleImageLoad = (projectId) => {
    setImageLoaded(prev => ({ ...prev, [projectId]: true }));
  };

  // Filter projects
  useEffect(() => {
    const filtered = filter === 'all'
      ? portfolioData.projects
      : portfolioData.projects.filter(project =>
          filter === 'featured' ? project.featured : !project.featured
        );
    setFilteredProjects(filtered);
  }, [filter]);

  return (
    <section
      id="projects"
      className="section-padding bg-[#0a0a0f] relative overflow-hidden"
      ref={sectionRef}
      aria-label="Projects section"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-orb w-96 h-96 bg-[#05b5d4]/20 top-20 -left-48"></div>
        <div className="glow-orb w-96 h-96 bg-[#a855f7]/20 bottom-20 -right-48"></div>
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className={`reveal-section-header ${isVisible ? 'reveal-active' : ''} text-center mb-12`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-[#a855f7]/5 border border-[#a855f7]/20 text-[#c084fc]/70 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
            0x03 · PROJECT REGISTRY
          </span>
          <h2 className="heading-lg gradient-text mb-4">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#05b5d4] to-[#a855f7] mx-auto rounded-full mb-6 animate-pulse-glow"></div>
          <p className="body-text max-w-2xl mx-auto">
            On-chain proof of work. Every project is a deployed block in my builder history.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`reveal reveal-fade-in-up reveal-stagger-1 ${isVisible ? 'reveal-active' : ''} flex flex-wrap justify-center gap-4 mb-12`}>
          <button
            onClick={() => setFilter('all')}
            className={`group relative px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform will-change-transform ${
              filter === 'all'
                ? 'bg-gradient-to-r from-[#05b5d4] to-[#a855f7] text-white shadow-lg shadow-[#05b5d4]/30 scale-105'
                : 'bg-[#1a1a24] text-gray-400 hover:text-white hover:bg-[#1a1a24]/80 border border-transparent hover:border-[#05b5d4]/30 hover:scale-105 hover:shadow-lg hover:shadow-[#05b5d4]/20'
            }`}
            aria-pressed={filter === 'all'}
            aria-label="Show all projects"
          >
            <span className="relative z-10">All Projects</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#05b5d4] to-[#a855f7] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></span>
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`group relative px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform will-change-transform ${
              filter === 'featured'
                ? 'bg-gradient-to-r from-[#05b5d4] to-[#a855f7] text-white shadow-lg shadow-[#05b5d4]/30 scale-105'
                : 'bg-[#1a1a24] text-gray-400 hover:text-white hover:bg-[#1a1a24]/80 border border-transparent hover:border-[#05b5d4]/30 hover:scale-105 hover:shadow-lg hover:shadow-[#05b5d4]/20'
            }`}
            aria-pressed={filter === 'featured'}
            aria-label="Show featured projects"
          >
            <span className="relative z-10">Featured</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#05b5d4] to-[#a855f7] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></span>
          </button>
          <button
            onClick={() => setFilter('other')}
            className={`group relative px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform will-change-transform ${
              filter === 'other'
                ? 'bg-gradient-to-r from-[#05b5d4] to-[#a855f7] text-white shadow-lg shadow-[#05b5d4]/30 scale-105'
                : 'bg-[#1a1a24] text-gray-400 hover:text-white hover:bg-[#1a1a24]/80 border border-transparent hover:border-[#05b5d4]/30 hover:scale-105 hover:shadow-lg hover:shadow-[#05b5d4]/20'
            }`}
            aria-pressed={filter === 'other'}
            aria-label="Show other projects"
          >
            <span className="relative z-10">Others</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#05b5d4] to-[#a855f7] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-reveal-stagger="fade-in-up"
              className={`reveal reveal-card reveal-stagger-${Math.min(index + 2, 10)} ${isVisible ? 'reveal-active' : ''}`}
            >
              <TiltCard
                tiltIntensity={isMobile ? 4 : 12}
                glowColor={index % 2 === 0 ? '#3ce6f9' : '#a855f7'}
                className="group h-full"
              >
                {/* Project Image */}
                <div className="project-image-container relative overflow-hidden rounded-lg mb-4 aspect-video bg-[#1a1a24]">
                  {!imageLoaded[project.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a24] animate-pulse">
                      <div className="w-12 h-12 border-4 border-[#05b5d4]/30 border-t-[#05b5d4] rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      imageLoaded[project.id] ? 'opacity-100' : 'opacity-0'
                    } group-hover:scale-110`}
                    onLoad={() => handleImageLoad(project.id)}
                    loading="lazy"
                  />
                  <div className="project-image-overlay"></div>
                  <div className="project-image-shine"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80"></div>

                  {/* NFT Rarity Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-md ${
                      project.featured
                        ? 'bg-gradient-to-r from-[#f59e0b]/20 to-[#ef4444]/20 border border-[#f59e0b]/40 text-[#fbbf24]'
                        : index % 2 === 0
                          ? 'bg-[#a855f7]/15 border border-[#a855f7]/30 text-[#c084fc]'
                          : 'bg-[#3ce6f9]/10 border border-[#3ce6f9]/25 text-[#3ce6f9]'
                    }`}>
                      ◆ {project.featured ? 'LEGENDARY' : index % 2 === 0 ? 'RARE' : 'COMMON'}
                    </span>
                  </div>
                  {/* Token ID badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-white/10 text-gray-400 text-xs font-mono rounded-lg">
                      #{String(index + 1).padStart(3, '0')}
                    </span>
                  </div>
                </div>

                <CardContent className="card-content flex flex-col h-full">
                  {/* Project Title */}
                  <h3 className="heading-md mb-2 group-hover:text-[#3ce6f9] transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack — token pill style */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="tech-tag inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#0a0a0f] text-[#3ce6f9] text-xs font-mono rounded-md border border-[#3ce6f9]/15 hover:border-[#3ce6f9]/35 hover:bg-[#3ce6f9]/5 cursor-default transition-all"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#3ce6f9]/60" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-4 pt-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 project-link"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <Button variant="primary" size="sm" className="w-full group/btn">
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </span>
                    </Button>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 project-link"
                    aria-label={`View GitHub repository of ${project.title}`}
                  >
                    <Button variant="outline" size="sm" className="w-full group/btn">
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </span>
                    </Button>
                  </a>
                </CardFooter>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1a1a24] mb-6">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="heading-md text-gray-400 mb-2">No projects found</h3>
            <p className="body-text text-gray-500">Try selecting a different filter category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
