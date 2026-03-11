import React from 'react';
import { AIFrame, TechSectionHeader, HoverCard, TechTag, CornerAccent } from '../effects/SectionEnhancer';
import { StatusIndicator, CodeSnippet } from '../effects/HUDDecorations';

/**
 * ENHANCED HERO SECTION WITH AI INTERFACE ELEMENTS
 *
 * This example shows how to integrate the futuristic AI interface components
 * into the existing Hero section for a more immersive experience.
 */

const EnhancedHeroExample = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* AI Frame with full decorations */}
      <AIFrame
        showCorners={true}
        showStatus={true}
        showData={true}
        showCode={true}
        statusText="SYSTEM ONLINE"
        className="w-full h-full"
      >
        {/* Corner accents */}
        <CornerAccent position="top-left" />
        <CornerAccent position="top-right" />
        <CornerAccent position="bottom-left" />
        <CornerAccent position="bottom-right" />

        {/* Main Content */}
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* Tech-styled header */}
            <div className="text-center mb-8">
              <TechTag variant="purple" size="md">
                V2.0.26
              </TechTag>
            </div>

            {/* Glassmorphism card with hover effect */}
            <HoverCard className="glass-card p-8 md:p-12 lg:p-16 text-center">
              {/* Greeting with code-like styling */}
              <p className="text-[#00F5FF] font-mono text-sm mb-4">
                <span className="opacity-50">&lt;system&gt;</span>
                <span className="ml-2">Hello, I'm</span>
                <span className="opacity-50 ml-2">&lt;/system&gt;</span>
              </p>

              {/* Name with enhanced glow */}
              <h1 className="heading-xl gradient-text neon-text mb-6">
                omik
              </h1>

              {/* Role with typing cursor */}
              <div className="heading-lg text-gray-200 mb-6 flex items-center justify-center gap-2">
                <span className="text-[#00F5FF]">&lt;</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2]">
                  AI Automation Engineer
                </span>
                <span className="typing-cursor" />
                <span className="text-[#00F5FF]">/&gt;</span>
              </div>

              {/* Tagline */}
              <p className="body-text text-lg mb-8 max-w-2xl mx-auto">
                Building intelligent systems that bridge the gap between human creativity and artificial intelligence
              </p>

              {/* CTA Buttons with tech styling */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                  <span className="relative flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    View Projects
                  </span>
                </button>

                <button className="px-8 py-4 bg-transparent border-2 border-[#00F5FF] text-[#00F5FF] font-semibold rounded-lg hover:bg-[#00F5FF]/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(60,230,249,0.4)]">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Me
                  </span>
                </button>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                <TechTag variant="default">React</TechTag>
                <TechTag variant="purple">AI/ML</TechTag>
                <TechTag variant="success">Automation</TechTag>
                <TechTag variant="warning">Cloud</TechTag>
              </div>
            </HoverCard>

            {/* Status indicators */}
            <div className="flex justify-center items-center gap-6 mt-8 text-xs font-mono text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>ONLINE</span>
              </div>
              <span>|</span>
              <span>LAT: 40.7128° N</span>
              <span>|</span>
              <span>LNG: 74.0060° W</span>
            </div>
          </div>
        </div>
      </AIFrame>

      {/* Decorative code snippets */}
      <div className="absolute top-20 left-10 hidden lg:block opacity-20">
        <CodeSnippet code="const ai = new NeuralNetwork();" />
      </div>

      <div className="absolute bottom-20 right-10 hidden lg:block opacity-20">
        <CodeSnippet code="await quantum.process();" />
      </div>
    </section>
  );
};

export default EnhancedHeroExample;
