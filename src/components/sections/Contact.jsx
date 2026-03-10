import React, { useState, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Card, CardContent } from '../ui/Card';
import useRevealAnimations from '../utils/useRevealAnimations';
import LazyUniverseScene from '../3d/LazyUniverseScene';

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [canLoad3D, setCanLoad3D] = useState(false);

  // Detect mobile screen size and enable 3D loading when section is visible
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enable 3D loading when component mounts (deferred to avoid cascading renders)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanLoad3D(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const { ref: sectionRef, isVisible } = useRevealAnimations({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-[#0a0a0f] relative overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sapphire-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-deep-amethyst/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className={`reveal-section-header ${isVisible ? 'reveal-active' : ''} text-center mb-16`}>
          <h2 className="heading-lg gradient-text mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sapphire-blue to-deep-amethyst mx-auto rounded-full mb-6 animate-pulse" />
          <p className="body-text max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </div>

        <div className="space-y-12">
          {/* ── Contact Info Section ── */}
          <div className={`reveal reveal-fade-in-up reveal-stagger-1 ${isVisible ? 'reveal-active' : ''}`}>
            <div className="text-center mb-10">
              <h3 className="heading-md mb-4">Let's Connect</h3>
              <p className="body-text text-lg">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Email card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-luster/20 via-sapphire-blue/20 to-deep-amethyst/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <Card className="relative hover:transform hover:-translate-y-1 transition-transform duration-300 hover:border-[#d4af37]/30 backdrop-blur-xl bg-white/[0.03] border-white/10 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-gold-luster/20 to-sapphire-blue/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-gold-luster/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      <svg className="w-7 h-7 text-[#d4af37]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-200 mb-2">Email</h4>
                    <a href={`mailto:${portfolioData.contact.email}`} className="text-gold-luster hover:text-sapphire-blue transition-colors">
                      {portfolioData.contact.email}
                    </a>
                  </CardContent>
                </Card>
              </div>

              {/* Phone card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-luster/20 via-sapphire-blue/20 to-deep-amethyst/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <Card className="relative hover:transform hover:-translate-y-1 transition-transform duration-300 hover:border-[#d4af37]/30 backdrop-blur-xl bg-white/[0.03] border-white/10 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-gold-luster/20 to-sapphire-blue/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-gold-luster/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      <svg className="w-7 h-7 text-[#d4af37]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-200 mb-2">Phone</h4>
                    <a href={`tel:${portfolioData.contact.phone}`} className="text-gold-luster hover:text-sapphire-blue transition-colors">
                      {portfolioData.contact.phone}
                    </a>
                  </CardContent>
                </Card>
              </div>

              {/* LinkedIn card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-luster/20 via-sapphire-blue/20 to-deep-amethyst/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <Card className="relative hover:transform hover:-translate-y-1 transition-transform duration-300 hover:border-[#d4af37]/30 backdrop-blur-xl bg-white/[0.03] border-white/10 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-gold-luster/20 to-sapphire-blue/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-gold-luster/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      <svg className="w-7 h-7 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-200 mb-2">LinkedIn</h4>
                    <a href={portfolioData.contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gold-luster hover:text-sapphire-blue transition-colors">
                      linkedin.com/in/omik
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Social icon row */}
            <div className="text-center">
              <h4 className="heading-sm mb-4">Follow Me</h4>
              <div className="flex justify-center space-x-4">
                {/* GitHub */}
                <a href={portfolioData.contact.social.github} target="_blank" rel="noopener noreferrer"
                  className="group relative w-12 h-12 bg-[#1a1a24] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-700 hover:border-deep-amethyst"
                  aria-label="GitHub">
                  <div className="absolute inset-0 bg-gradient-to-r from-deep-amethyst to-sapphire-blue rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href={portfolioData.contact.social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="group relative w-12 h-12 bg-[#1a1a24] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-700 hover:border-sapphire-blue"
                  aria-label="LinkedIn">
                  <div className="absolute inset-0 bg-gradient-to-r from-sapphire-blue to-deep-amethyst rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {portfolioData.contact.social.twitter && (
                  <a href={portfolioData.contact.social.twitter} target="_blank" rel="noopener noreferrer"
                    className="group relative w-12 h-12 bg-[#1a1a24] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-700 hover:border-deep-amethyst"
                    aria-label="Twitter">
                    <div className="absolute inset-0 bg-gradient-to-r from-deep-amethyst to-sapphire-blue rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}

                {portfolioData.contact.social.devto && (
                  <a href={portfolioData.contact.social.devto} target="_blank" rel="noopener noreferrer"
                    className="group relative w-12 h-12 bg-[#1a1a24] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-700 hover:border-sapphire-blue"
                    aria-label="Dev.to">
                    <div className="absolute inset-0 bg-gradient-to-r from-sapphire-blue to-deep-amethyst rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.5 12.5c0 1.9-.8 3-2.3 3-1.5 0-2.2-1.1-2.2-3 0-1.9.7-3 2.2-3 1.5 0 2.3 1.1 2.3 3zm.8 0c0-2.3-1.2-3.8-3.1-3.8-1.9 0-3 1.5-3 3.8 0 2.3 1.1 3.8 3 3.8 1.9 0 3.1-1.5 3.1-3.8zm11.4 0c0 1.9-.8 3-2.3 3-1.5 0-2.2-1.1-2.2-3 0-1.9.7-3 2.2-3 1.5 0 2.3 1.1 2.3 3zm.8 0c0-2.3-1.2-3.8-3.1-3.8-1.9 0-3 1.5-3 3.8 0 2.3 1.1 3.8 3 3.8 1.9 0 3.1-1.5 3.1-3.8zm-8.3-3.6h-1.4v7.2h1.4v-4.4c0-1.1.9-2 2-2s1.8.9 1.8 2v4.4h1.4v-5c0-1.7-1.4-3.1-3.2-3.1-1.1 0-2 .5-2.5 1.3v-1.4z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── 3D Solar System Card ── */}
          <div className={`reveal reveal-fade-in-up reveal-stagger-2 ${isVisible ? 'reveal-active' : ''}`}>
            <div className="flex justify-center">
              <div className="group relative w-full max-w-4xl">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-luster/20 via-sapphire-blue/20 to-deep-amethyst/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <Card className="relative backdrop-blur-xl bg-white/[0.03] border-white/10 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                  <CardContent className="p-0">
                    <div className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                      {/* 3D Universe Scene */}
                      {canLoad3D && (
                        <LazyUniverseScene
                          starCount={isMobile ? 2500 : 6000}
                          visibilityThreshold={0.1}
                          rootMargin="100px"
                          unloadWhenHidden={false}
                          unloadDelay={10000}
                          className="w-full h-full rounded-xl"
                        />
                      )}

                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sapphire-blue/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-deep-amethyst/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                      </div>

                      {/* Decorative corner accents */}
                      <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-gold-luster/20 rounded-tl-xl" />
                      <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-gold-luster/20 rounded-tr-xl" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-gold-luster/20 rounded-bl-xl" />
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-gold-luster/20 rounded-br-xl" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
