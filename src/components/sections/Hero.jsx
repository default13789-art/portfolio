import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { portfolioData } from '../../data/portfolioData';
import Button from '../ui/Button';

const Hero = () => {
  // Typing animation state
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Roles to cycle through
  const roles = [
    "Prompt Engineer",
    "AI Automation Engineer",
    "Web Apps Developer"
  ];

  // Ref for managing the typing interval
  const typingTimeoutRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing phase
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          setTypingSpeed(100);
        } else {
          // Finished typing, pause before deleting
          setIsDeleting(true);
          setTypingSpeed(2000); // Pause at the end
        }
      } else {
        // Deleting phase
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          setTypingSpeed(50); // Delete faster
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false);
          setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
          setTypingSpeed(500); // Pause before typing next
        }
      }
    };

    typingTimeoutRef.current = setTimeout(handleTyping, typingSpeed);

    // Cleanup timeout on unmount
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed, roles]);

  // Social media icons with improved styling
  const socialIcons = {
    github: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    linkedin: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle gradient overlay for better text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/30 to-[#0a0a0f] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 section-container">
        <div className="max-w-4xl mx-auto">
          {/* Glassmorphism Card */}
          <div className="glass-card p-6 sm:p-8 md:p-12 lg:p-16 text-center backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-[0_0_40px_rgba(212,175,55,0.15)] mx-2 sm:mx-0">

            {/* ── Web3 Identity Bar ── */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in-up opacity-0 stagger-1">
              {/* Decentralized builder tag */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-deep-amethyst/10 to-sapphire-blue/10 border border-deep-amethyst/25 text-deep-amethyst">
                <span className="w-1.5 h-1.5 rounded-full bg-deep-amethyst animate-pulse" />
                Decentralized Builder · LVL 9
              </span>
              {/* Network badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#0a0a0f] border border-white/10 text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                ETH Mainnet
              </span>
            </div>

            {/* Greeting */}
            <p className="text-[#d4af37] font-semibold mb-3 sm:mb-4 text-base sm:text-lg animate-fade-in-up opacity-0 stagger-2">
              Hello, I'm
            </p>

            {/* Name with Enhanced Neon Glow - Responsive sizing */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text neon-text-gradient neon-pulse mb-4 sm:mb-6 animate-fade-in-up opacity-0 stagger-2 font-black px-2"
              style={{
                textShadow: '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(60, 230, 249, 0.6), 0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(212, 175, 55, 0.3), 0 0 120px rgba(60, 230, 249, 0.2)'
              }}
            >
              {portfolioData.hero.name}
            </h1>

            {/* Typing Animation for Roles - Responsive sizing */}
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-200 mb-4 sm:mb-6 animate-fade-in-up opacity-0 stagger-3 min-h-[48px] sm:min-h-[60px] md:min-h-[72px] flex items-center justify-center px-2">
              <span className="text-[#d4af37] text-sm sm:text-base">&lt;</span>
              <span className="mx-1 sm:mx-2 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#3ce6f9] to-[#a855f7]">
                {displayText}
              </span>
              <span className="typing-cursor" aria-hidden="true" />
              <span className="text-[#d4af37] text-sm sm:text-base">/&gt;</span>
            </div>

            {/* Tagline - Responsive text */}
            <p className="body-text text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in-up opacity-0 stagger-4 leading-relaxed px-4">
              {portfolioData.hero.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up opacity-0 stagger-5 px-4 sm:px-0">
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="w-full max-w-xs sm:w-auto group"
                aria-label="View Omik's projects"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg neon-glow-pulse-cyan will-change-transform hover:scale-105 transition-transform duration-300 min-h-[48px]"
                  style={{
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)'
                  }}
                >
                  <span className="flex items-center gap-2 relative z-10">
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="text-sm sm:text-base">{portfolioData.hero.cta.primary}</span>
                  </span>
                </Button>
              </Link>

              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="w-full max-w-xs sm:w-auto group"
                aria-label="Contact Omik"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg will-change-transform hover:scale-105 transition-transform duration-300 neon-border-glow-purple min-h-[48px]"
                  style={{
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <span className="flex items-center gap-2 relative z-10">
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm sm:text-base">{portfolioData.hero.cta.secondary}</span>
                  </span>
                </Button>
              </Link>
            </div>

            {/* Social Links - Responsive spacing */}
            <div className="flex justify-center items-center space-x-6 sm:space-x-8 mt-8 sm:mt-12 animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
              {Object.entries(portfolioData.hero.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-gray-400 hover:text-[#d4af37] transition-all duration-300 transform p-2 sm:p-3 will-change-transform"
                  aria-label={`Visit ${platform} profile`}
                  title={`Connect on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                >
                  {/* Glow effect on hover */}
                  <span className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-150" />

                  {/* Icon */}
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 inline-block">
                    {socialIcons[platform]}
                  </span>

                  {/* Underline effect */}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#3ce6f9] transition-all duration-300 group-hover:w-8"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with Enhanced Styling */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <Link
          to="about"
          smooth={true}
          duration={500}
          className="cursor-pointer group flex flex-col items-center gap-2"
          aria-label="Scroll to about section"
        >
          <span className="text-gray-400 text-sm mb-1 group-hover:text-[#d4af37] transition-all duration-300 group-hover:translate-y-1 inline-block">
            Scroll Down
          </span>
          <div className="relative">
            <div className="absolute inset-0 bg-[#d4af37]/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 scale-100 group-hover:scale-125" />
            <svg
              className="w-8 h-8 text-gray-400 group-hover:text-[#d4af37] transition-all duration-300 animate-bounce relative z-10 group-hover:scale-110"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
