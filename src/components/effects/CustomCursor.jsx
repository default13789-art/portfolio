import React, { useEffect, useRef, useState } from 'react';

/**
 * PremiumPointerCursor – Custom cursor with standard pointer shape and premium effects
 *
 * Features:
 * - Standard arrow pointer shape for familiarity
 * - Premium glow effects with theme colors (Gold, Sapphire, Amethyst)
 * - Subtle trailing particles for visual interest
 * - Smooth hover and click animations
 * - ESC toggle for accessibility
 * - Optimized for performance
 */
const PremiumPointerCursor = () => {
  const cursorRef = useRef(null);
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
    const size = Math.random() * 6 + 3;
    const duration = Math.random() * 400 + 300;

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
      opacity: 0.7;
      transform: translate(-50%, -50%);
    `;

    // Randomize colors for premium effect
    const colors = [
      'rgba(212, 175, 55, 0.5)',  // Gold
      'rgba(30, 64, 175, 0.4)',   // Sapphire
      'rgba(107, 70, 193, 0.4)',  // Amethyst
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
    particle.style.boxShadow = `0 0 ${size}px ${color}`;

    trailContainerRef.current.appendChild(particle);
    trailParticlesRef.current.push({ id, element: particle, created: Date.now() });

    // Animate the particle
    const startTime = Date.now();
    const driftX = (Math.random() - 0.5) * 20;
    const driftY = (Math.random() - 0.5) * 20;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        particle.remove();
        trailParticlesRef.current = trailParticlesRef.current.filter(p => p.id !== id);
        return;
      }

      // Subtle drift and fade
      const newX = x + driftX * progress;
      const newY = y + driftY * progress;
      const scale = 1 - progress * 0.5;
      const opacity = 0.7 * (1 - progress);

      particle.style.left = `${newX}px`;
      particle.style.top = `${newY}px`;
      particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
      particle.style.opacity = opacity;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  // Create ripple effect on click
  const createClickRipple = (x, y) => {
    if (!trailContainerRef.current) return;

    const ripple = document.createElement('div');
    const duration = 500;

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
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.5), inset 0 0 10px rgba(212, 175, 55, 0.3);
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

      const scale = 1 + progress * 3;
      const opacity = 1 - progress;

      ripple.style.transform = `translate(-50%, -50%) scale(${scale})`;
      ripple.style.opacity = opacity;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!isEnabled) return;

    const cursor = cursorRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    let lastTrailX = mouseX;
    let lastTrailY = mouseY;
    let trailTimer = 0;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create trail particles on movement
      const distance = Math.sqrt(
        Math.pow(mouseX - lastTrailX, 2) + Math.pow(mouseY - lastTrailY, 2)
      );

      if (distance > 15) {
        trailTimer++;
        if (trailTimer >= 2) {
          createTrailParticle(mouseX, mouseY);
          lastTrailX = mouseX;
          lastTrailY = mouseY;
          trailTimer = 0;
        }
      }
    };

    // Mouse down handler
    const handleMouseDown = (e) => {
      setIsClicking(true);
      createClickRipple(e.clientX, e.clientY);
    };

    // Mouse up handler
    const handleMouseUp = () => setIsClicking(false);

    // Hover detection
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

    // Animation loop
    const animate = () => {
      // Direct, responsive follow with minimal lag
      const easing = 0.2;
      cursorX += (mouseX - cursorX) * easing;
      cursorY += (mouseY - cursorY) * easing;

      // Update cursor position
      if (cursor) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        // Update classes for states
        if (isHovering) cursor.classList.add('hover');
        else cursor.classList.remove('hover');

        if (isClicking) cursor.classList.add('clicking');
        else cursor.classList.remove('clicking');
      }

      requestAnimationFrame(animate);
    };

    // Event listeners
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

      // Clean up trail particles
      trailParticlesRef.current.forEach(p => p.element?.remove());
      trailParticlesRef.current = [];
    };
  }, [isEnabled, isHovering, isClicking]);

  // Toggle cursor on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsEnabled(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      trailParticlesRef.current.forEach(p => p.element?.remove());
    };
  }, []);

  if (!isEnabled) {
    return (
      <div className="fixed bottom-4 right-4 px-4 py-2 text-xs font-mono text-[#D4AF37] bg-[#1A1A2E]/90 border border-[#D4AF37]/30 rounded-lg backdrop-blur-sm z-[10001]">
        Press ESC to enable premium cursor
      </div>
    );
  }

  return (
    <>
      {/* Trail particle container */}
      <div ref={trailContainerRef} className="cursor-trail-container" />

      {/* Premium pointer cursor */}
      <div
        ref={cursorRef}
        className="premium-pointer-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(0, 0)',
          willChange: 'transform',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-svg"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.8)) drop-shadow(0 0 16px rgba(212, 175, 55, 0.4))',
            transition: 'filter 0.2s ease, transform 0.15s ease',
          }}
        >
          <defs>
            {/* Premium gradient for the pointer */}
            <linearGradient id="pointerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F4D03F" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8962E" />
            </linearGradient>

            {/* Glow effect gradient */}
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(212, 175, 55, 0.3)" />
              <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
            </radialGradient>

            {/* Clip path for pointer shape */}
            <clipPath id="pointerClip">
              <path d="M5.5 3.5L18.5 12L12 13.5L14 20.5L5.5 3.5Z" />
            </clipPath>
          </defs>

          {/* Outer glow */}
          <circle
            cx="12"
            cy="12"
            r="12"
            fill="url(#glowGradient)"
            className="pointer-glow"
          />

          {/* Main pointer shape */}
          <g clipPath="url(#pointerClip)">
            {/* Base fill with gradient */}
            <path
              d="M5.5 3.5L18.5 12L12 13.5L14 20.5L5.5 3.5Z"
              fill="url(#pointerGradient)"
              stroke="#B8962E"
              strokeWidth="0.5"
            />

            {/* Inner highlight for depth */}
            <path
              d="M6 4L17 11L11 12L13 18L6 4Z"
              fill="rgba(255, 255, 255, 0.2)"
              className="pointer-highlight"
            />

            {/* Accent line */}
            <path
              d="M5.5 3.5L12 13.5L18.5 12"
              stroke="rgba(30, 64, 175, 0.3)"
              strokeWidth="0.5"
              fill="none"
            />
          </g>

          {/* Subtle sapphire accent at tip */}
          <circle
            cx="5.5"
            cy="3.5"
            r="1.5"
            fill="rgba(107, 70, 193, 0.5)"
            className="pointer-accent"
          />
        </svg>

        {/* Embedded styles for state animations */}
        <style jsx>{`
          .premium-pointer-cursor.hover .pointer-svg {
            filter: drop-shadow(0 0 12px rgba(30, 64, 175, 0.9))
                    drop-shadow(0 0 24px rgba(212, 175, 55, 0.6))
                    drop-shadow(0 0 36px rgba(107, 70, 193, 0.4)) !important;
            transform: scale(1.2);
          }

          .premium-pointer-cursor.hover .pointer-glow {
            opacity: 1;
            animation: pulse-glow 1.5s ease-in-out infinite;
          }

          .premium-pointer-cursor.hover .pointer-accent {
            fill: rgba(30, 64, 175, 0.8);
            animation: accent-pulse 1s ease-in-out infinite;
          }

          .premium-pointer-cursor.clicking .pointer-svg {
            filter: drop-shadow(0 0 16px rgba(212, 175, 55, 1))
                    drop-shadow(0 0 32px rgba(212, 175, 55, 0.8)) !important;
            transform: scale(0.9);
          }

          .premium-pointer-cursor.clicking .pointer-highlight {
            fill: rgba(255, 255, 255, 0.4);
          }

          @keyframes pulse-glow {
            0%, 100% {
              opacity: 0.6;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.3);
            }
          }

          @keyframes accent-pulse {
            0%, 100% {
              r: 1.5;
            }
            50% {
              r: 2;
            }
          }
        `}</style>
      </div>
    </>
  );
};

// Fallback simple cursor for reduced motion preference
const SimpleCursor = () => {
  return null; // Use default cursor when motion is reduced
};

export { PremiumPointerCursor, SimpleCursor };
export default PremiumPointerCursor;
