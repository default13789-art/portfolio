import React from 'react';
import { AIFrame, TechSectionHeader } from './SectionEnhancer';

/**
 * AI Section Wrapper
 *
 * A high-level wrapper component that automatically adds AI interface
 * decorations to any section. Makes it easy to enhance existing sections.
 *
 * Usage:
 * <AISectionWrapper
 *   title="Projects"
 *   subtitle="My Work"
 *   showCorners={true}
 *   showStatus={true}
 * >
 *   Your content here
 * </AISectionWrapper>
 */

const AISectionWrapper = ({
  children,
  title,
  subtitle,
  badge = null,
  icon = null,
  showCorners = true,
  showStatus = false,
  showData = false,
  showCode = false,
  statusText = 'ACTIVE',
  className = '',
  id = ''
}) => {
  return (
    <section id={id} className={`relative py-20 lg:py-32 ${className}`}>
      <AIFrame
        showCorners={showCorners}
        showStatus={showStatus}
        showData={showData}
        showCode={showCode}
        statusText={statusText}
      >
        <div className="section-container">
          {/* Section Header */}
          {(title || subtitle) && (
            <TechSectionHeader
              title={title}
              subtitle={subtitle}
              icon={icon}
              badge={badge}
            />
          )}

          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </AIFrame>
    </section>
  );
};

/**
 * Lightweight AI Section
 *
 * Simpler version with minimal decorations for better performance
 */
const LightweightAISection = ({
  children,
  title,
  subtitle,
  className = '',
  id = ''
}) => {
  return (
    <section id={id} className={`relative py-20 lg:py-32 ${className}`}>
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="section-container relative z-10">
        {title && (
          <div className="text-center mb-12">
            <h2 className="heading-xl gradient-text neon-text mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="body-text text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
};

/**
 * Minimal AI Decoration
 *
 * Just the essential AI elements - corners and subtle patterns
 */
const MinimalAISection = ({
  children,
  className = '',
  id = ''
}) => {
  return (
    <section id={id} className={`relative py-16 lg:py-24 ${className}`}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* Corner accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-[#00F5FF]/20" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-[#00F5FF]/20" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-[#00F5FF]/20" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-[#00F5FF]/20" />
      </div>

      {/* Content */}
      <div className="section-container relative z-10">
        {children}
      </div>
    </section>
  );
};

export default AISectionWrapper;
export { LightweightAISection, MinimalAISection };
