import React, { useEffect, useRef } from 'react';

const ParticleEffects = ({ count = 50 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    const particles = [];
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${10 + Math.random() * 20}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.width = `${1 + Math.random() * 3}px`;
      particle.style.height = particle.style.width;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, [count]);

  return <div ref={containerRef} className="particles-container" />;
};

const GlowingLines = () => (
  <>
    <div className="glow-line horizontal" style={{ top: '20%', opacity: 0.3 }} />
    <div className="glow-line horizontal" style={{ top: '80%', opacity: 0.3 }} />
    <div className="glow-line vertical" style={{ left: '10%', opacity: 0.3 }} />
    <div className="glow-line vertical" style={{ right: '10%', opacity: 0.3 }} />
  </>
);

const GradientMesh = () => <div className="gradient-mesh" />;

const PulsingOrbs = () => (
  <>
    <div className="pulsing-orb pulsing-orb-1" />
    <div className="pulsing-orb pulsing-orb-2" />
    <div className="pulsing-orb pulsing-orb-3" />
  </>
);

const ScanLines = () => <div className="scan-lines" />;

// Combined ambient effects component
const AmbientEffects = ({ particles = true, lines = true, mesh = true, orbs = true, scanlines = false }) => (
  <>
    {particles && <ParticleEffects />}
    {lines && <GlowingLines />}
    {mesh && <GradientMesh />}
    {orbs && <PulsingOrbs />}
    {scanlines && <ScanLines />}
  </>
);

export { ParticleEffects, GlowingLines, GradientMesh, PulsingOrbs, ScanLines, AmbientEffects as default };
