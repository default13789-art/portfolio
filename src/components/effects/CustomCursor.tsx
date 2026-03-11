import React, { useEffect, useRef, useState } from 'react';

/**
 * PremiumCircleCursor – Sleek circle cursor with premium effects
 *
 * Features:
 * - 20px circle with gradient
 * - Multi-color glow (Gold, Sapphire, Amethyst)
 * - Trailing particles
 * - Click ripple/burst effects
 * - ESC toggle support
 */
const PremiumCircleCursor = () => {
  const cursorRef = useRef(null);
  const outerRingRef = useRef(null);
  const trailContainerRef = useRef(null);
  const trailParticlesRef = useRef([]);
  const particleIdRef = useRef(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Create trailing particle
  const createTrailParticle = (x, y) => {
    if (!trailContainerRef.current) return;

    const particle = document.createElement('div');
    const id = ++particleIdRef.current;
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 300 + 200;

    particle.className = 'cursor-trail-particle';
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9996;
      opacity: 0.6;
      transform: translate(-50%, -50%);
    `;

    const colors = [
      'rgba(212, 175, 55, 0.5)',
      'rgba(0, 243, 255, 0.4)',
      'rgba(255, 0, 255, 0.4)',
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

    trailContainerRef.current.appendChild(particle);
    trailParticlesRef.current.push({ id, element: particle, created: Date.now() });

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        particle.remove();
        trailParticlesRef.current = trailParticlesRef.current.filter(p => p.id !== id);
        return;
      }

      particle.style.opacity = 0.6 * (1 - progress);
      particle.style.transform = `translate(-50%, -50%) scale(${1 - progress * 0.5})`;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  // Create click ripple effect
  const createClickRipple = (x, y) => {
    if (!trailContainerRef.current) return;

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const ripple = document.createElement('div');
        const duration = 600;

        ripple.className = 'cursor-click-ripple';
        ripple.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9995;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(212, 175, 55, 0.8);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        `;

        trailContainerRef.current.appendChild(ripple);

        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = elapsed / duration;

          if (progress >= 1) {
            ripple.remove();
            return;
          }

          const scale = 1 + progress * 4;
          const opacity = 1 - progress;
          ripple.style.transform = `translate(-50%, -50%) scale(${scale})`;
          ripple.style.opacity = opacity;

          requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      }, i * 100);
    }

    // Create burst particles
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const burstParticle = document.createElement('div');
      const duration = 400;

      burstParticle.className = 'cursor-click-burst';
      burstParticle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9995;
        background: rgba(212, 175, 55, 0.8);
        transform: translate(-50%, -50%);
      `;

      trailContainerRef.current.appendChild(burstParticle);

      const startTime = Date.now();
      const distance = 40;
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress >= 1) {
          burstParticle.remove();
          return;
        }

        const currentDist = progress * distance;
        const newX = x + Math.cos(angle) * currentDist;
        const newY = y + Math.sin(angle) * currentDist;
        const opacity = 1 - progress;

        burstParticle.style.left = `${newX}px`;
        burstParticle.style.top = `${newY}px`;
        burstParticle.style.opacity = opacity;

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (!isEnabled) return;

    const cursor = cursorRef.current;
    const outerRing = outerRingRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let outerX = mouseX;
    let outerY = mouseY;

    let lastTrailX = mouseX;
    let lastTrailY = mouseY;
    let trailTimer = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const distance = Math.sqrt(
        Math.pow(mouseX - lastTrailX, 2) + Math.pow(mouseY - lastTrailY, 2)
      );

      if (distance > 10) {
        trailTimer++;
        if (trailTimer >= 2) {
          createTrailParticle(mouseX, mouseY);
          lastTrailX = mouseX;
          lastTrailY = mouseY;
          trailTimer = 0;
        }
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      createClickRipple(e.clientX, e.clientY);
    };

    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      if (e.target.matches('a, button, input, textarea, select, [role="button"], .cursor-interactive')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.matches('a, button, input, textarea, select, [role="button"], .cursor-interactive')) {
        setIsHovering(false);
      }
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      outerX += (mouseX - outerX) * 0.12;
      outerY += (mouseY - outerY) * 0.12;

      if (cursor) {
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;

        if (isHovering) cursor.classList.add('hover');
        else cursor.classList.remove('hover');

        if (isClicking) cursor.classList.add('clicking');
        else cursor.classList.remove('clicking');
      }

      if (outerRing) {
        outerRing.style.transform = `translate(${outerX - 16}px, ${outerY - 16}px)`;

        if (isHovering) outerRing.classList.add('hover');
        else outerRing.classList.remove('hover');

        if (isClicking) outerRing.classList.add('clicking');
        else outerRing.classList.remove('clicking');
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      trailParticlesRef.current.forEach(p => p.element?.remove());
      trailParticlesRef.current = [];
    };
  }, [isEnabled, isHovering, isClicking]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsEnabled(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      trailParticlesRef.current.forEach(p => p.element?.remove());
    };
  }, []);

  if (!isEnabled) {
    return (
      <div className="fixed bottom-4 right-4 px-4 py-2 text-xs font-mono text-[#D4AF37] bg-[#050510]/90 border border-[#D4AF37]/30 rounded-lg backdrop-blur-sm z-[10001]">
        Press ESC to enable cursor
      </div>
    );
  }

  return (
    <>
      <div ref={trailContainerRef} className="cursor-trail-container" />

      <div
        ref={cursorRef}
        className="premium-circle-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(0, 0)',
          willChange: 'transform',
        }}
      >
        <div
          className="cursor-main-circle"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(244, 208, 63, 0.9) 0%, rgba(212, 175, 55, 0.8) 50%, rgba(184, 150, 46, 0.7) 100%)',
            boxShadow: `
              0 0 12px rgba(212, 175, 55, 0.8),
              0 0 24px rgba(212, 175, 55, 0.5),
              0 0 36px rgba(0, 243, 255, 0.3),
              inset 0 2px 4px rgba(255, 255, 255, 0.3),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2)
            `,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '15%',
              width: '30%',
              height: '30%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>

      <div
        ref={outerRingRef}
        className="premium-circle-cursor-outer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(0, 0)',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid rgba(212, 175, 55, 0.5)',
            boxShadow: `
              0 0 15px rgba(212, 175, 55, 0.3),
              0 0 30px rgba(0, 243, 255, 0.2),
              inset 0 0 15px rgba(212, 175, 55, 0.2)
            `,
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </>
  );
};

const SimpleCursor = () => null;

export { PremiumCircleCursor, SimpleCursor };
export default PremiumCircleCursor;
