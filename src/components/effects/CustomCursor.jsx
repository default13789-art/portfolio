import React, { useEffect, useRef, useState } from 'react';

/**
 * RocketCursor – Custom cursor with rocket icon and smoke trail
 *
 * Features:
 * - Sleek rocket design matching premium theme
 * - Dynamic smoke particle system from tail
 * - Smooth follow with slight lag for natural feel
 * - Hover and click states
 * - ESC toggle for accessibility
 */
const RocketCursor = () => {
  const rocketRef = useRef(null);
  const flameRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const smokeContainerRef = useRef(null);
  const smokeParticlesRef = useRef([]);
  const smokeIdRef = useRef(0);

  // Create smoke particle
  const createSmokeParticle = (x, y) => {
    if (!smokeContainerRef.current) return;

    const particle = document.createElement('div');
    const id = ++smokeIdRef.current;
    const size = Math.random() * 12 + 6;
    const duration = Math.random() * 800 + 600;

    particle.className = 'rocket-smoke-particle';
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle,
        rgba(212, 175, 55, 0.4) 0%,
        rgba(168, 85, 247, 0.2) 40%,
        transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9996;
      opacity: 0.8;
      transform: translate(-50%, -50%);
    `;

    smokeContainerRef.current.appendChild(particle);
    smokeParticlesRef.current.push({ id, element: particle, created: Date.now() });

    // Animate the smoke
    const startTime = Date.now();
    const angle = Math.random() * 60 - 30; // -30 to 30 degrees spread
    const distance = Math.random() * 30 + 20;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        particle.remove();
        smokeParticlesRef.current = smokeParticlesRef.current.filter(p => p.id !== id);
        return;
      }

      // Move outward and fade
      const currentDistance = progress * distance;
      const radian = (angle - 90) * Math.PI / 180;
      const newX = x + Math.cos(radian) * currentDistance;
      const newY = y + Math.sin(radian) * currentDistance;
      const scale = 1 + progress * 1.5;
      const opacity = 0.8 * (1 - progress);

      particle.style.left = `${newX}px`;
      particle.style.top = `${newY}px`;
      particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
      particle.style.opacity = opacity;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!isEnabled) return;

    const rocket = rocketRef.current;
    const flame = flameRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let rocketX = mouseX;
    let rocketY = mouseY;
    let velocityX = 0;
    let velocityY = 0;

    // Calculate tail position for smoke (bottom of rocket)
    const getSmokePosition = (rx, ry, rotation) => {
      const tailOffset = 24;
      const radian = (rotation - 90) * Math.PI / 180;
      return {
        x: rx - Math.cos(radian) * tailOffset,
        y: ry - Math.sin(radian) * tailOffset
      };
    };

    let lastRotation = 0;
    let smokeTimer = 0;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Mouse down handler
    const handleMouseDown = () => setIsClicking(true);

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
      // Calculate direction to mouse
      const dx = mouseX - rocketX;
      const dy = mouseY - rocketY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Snappy follow with responsive physics
      const speed = 0.35;
      const friction = 0.92;

      velocityX += dx * speed;
      velocityY += dy * speed;
      velocityX *= friction;
      velocityY *= friction;

      rocketX += velocityX;
      rocketY += velocityY;

      // Calculate rotation based on velocity direction
      let rotation = 0;
      if (Math.abs(velocityX) > 0.5 || Math.abs(velocityY) > 0.5) {
        rotation = Math.atan2(velocityY, velocityX) * 180 / Math.PI + 90;
        // Snappy rotation with smoothing
        let rotationDiff = rotation - lastRotation;
        if (rotationDiff > 180) rotationDiff -= 360;
        if (rotationDiff < -180) rotationDiff += 360;
        rotation = lastRotation + rotationDiff * 0.35;
      }
      lastRotation = rotation;

      // Update rocket position and rotation
      if (rocket) {
        rocket.style.transform = `translate(${rocketX}px, ${rocketY}px) rotate(${rotation}deg)`;

        // Update classes for states
        if (isHovering) rocket.classList.add('hover');
        else rocket.classList.remove('hover');

        if (isClicking) rocket.classList.add('clicking');
        else rocket.classList.remove('clicking');
      }

      // Animate flame
      if (flame) {
        const flicker = Math.random() * 0.3 + 0.85;
        const lengthVar = Math.random() * 0.2 + 0.9;
        flame.style.transform = `scaleY(${lengthVar}) scaleX(${flicker})`;
        if (isHovering) {
          flame.style.opacity = '1';
        } else {
          flame.style.opacity = '0.8';
        }
      }

      // Create smoke particles when moving
      const speedMagnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      if (speedMagnitude > 3) {
        smokeTimer++;
        if (smokeTimer >= 3) { // Emit smoke every 3 frames
          const smokePos = getSmokePosition(rocketX, rocketY, rotation);
          createSmokeParticle(smokePos.x, smokePos.y);
          smokeTimer = 0;
        }
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

      // Clean up smoke particles
      smokeParticlesRef.current.forEach(p => p.element?.remove());
      smokeParticlesRef.current = [];
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
      smokeParticlesRef.current.forEach(p => p.element?.remove());
    };
  }, []);

  if (!isEnabled) {
    return (
      <div className="fixed bottom-4 right-4 px-4 py-2 text-xs font-mono text-gold-luster bg-[#1A1A2E]/90 border border-gold-luster/30 rounded-lg backdrop-blur-sm z-[10001]">
        Press ESC to enable rocket cursor
      </div>
    );
  }

  return (
    <>
      {/* Smoke particle container */}
      <div ref={smokeContainerRef} className="smoke-container" />

      {/* Rocket cursor */}
      <div
        ref={rocketRef}
        className="rocket-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(0, 0)',
          transition: 'transform 0.02s linear',
          willChange: 'transform',
        }}
      >
        <svg
          width="32"
          height="48"
          viewBox="0 0 32 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rocket-svg"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 16px rgba(168, 85, 247, 0.4))',
          }}
        >
          {/* Rocket body - sleek design */}
          <defs>
            <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F4D03F" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="rocketWindow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3CE6F9" />
              <stop offset="100%" stopColor="#6B46C1" />
            </linearGradient>
            <linearGradient id="rocketFlame" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="50%" stopColor="#F7931E" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Main body */}
          <path
            d="M16 0 C16 0 24 8 24 20 L24 32 L28 36 L28 40 L24 38 L24 42 L20 44 L16 42 L12 44 L8 42 L8 38 L4 40 L4 36 L8 32 L8 20 C8 8 16 0 16 0Z"
            fill="url(#rocketBody)"
            stroke="#B8962E"
            strokeWidth="1"
          />

          {/* Window */}
          <circle
            cx="16"
            cy="14"
            r="5"
            fill="url(#rocketWindow)"
            stroke="#2A9DB8"
            strokeWidth="1.5"
          />

          {/* Window reflection */}
          <ellipse
            cx="14"
            cy="12"
            rx="2"
            ry="1.5"
            fill="rgba(255,255,255,0.6)"
          />

          {/* Side fins */}
          <path
            d="M8 32 L4 44 L8 42 Z"
            fill="#A8851F"
            stroke="#B8962E"
            strokeWidth="0.5"
          />
          <path
            d="M24 32 L28 44 L24 42 Z"
            fill="#A8851F"
            stroke="#B8962E"
            strokeWidth="0.5"
          />

          {/* Center fin */}
          <path
            d="M16 38 L16 46 L14 44 Z"
            fill="#A8851F"
            stroke="#B8962E"
            strokeWidth="0.5"
          />

          {/* Flame */}
          <g ref={flameRef} className="rocket-flame" style={{ transformOrigin: 'center 40px' }}>
            <path
              d="M12 42 Q10 46 12 50 Q16 54 20 50 Q22 46 20 42 Q16 44 12 42Z"
              fill="url(#rocketFlame)"
              opacity="0.9"
            />
            <path
              d="M14 42 Q13 46 14 49 Q16 51 18 49 Q19 46 18 42 Q16 43 14 42Z"
              fill="#FFF5CC"
              opacity="0.8"
            />
          </g>
        </svg>
      </div>
    </>
  );
};

// Fallback simple cursor for reduced motion preference
const SimpleCursor = () => {
  return null; // Use default cursor when motion is reduced
};

export { RocketCursor, SimpleCursor };
export default RocketCursor;
