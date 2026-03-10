import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const crosshairRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const trailRefs = useRef([]);
  const trailTimeoutsRef = useRef([]);

  // Create cursor trail
  useEffect(() => {
    const trailCount = 5;
    trailRefs.current = Array(trailCount).fill(0).map(() => React.createRef());

    const trailElements = trailRefs.current.map((ref, i) => {
      const el = document.createElement('div');
      el.className = 'cursor-trail';
      el.style.opacity = (1 - i / trailCount) * 0.3;
      el.style.width = `${8 - i}px`;
      el.style.height = `${8 - i}px`;
      document.body.appendChild(el);
      ref.current = el;
      return el;
    });

    return () => {
      // Clear any pending timeouts
      trailTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      trailTimeoutsRef.current = [];
      trailElements.forEach(el => el.remove());
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    const ring = ringRef.current;
    const crosshair = crosshairRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let glowX = 0;
    let glowY = 0;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Clear previous pending trail updates
      trailTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      trailTimeoutsRef.current = [];

      // Update trail positions with tracked timeouts
      trailRefs.current.forEach((ref, i) => {
        if (ref.current) {
          const timeout = setTimeout(() => {
            if (ref.current) {
              ref.current.style.left = `${mouseX}px`;
              ref.current.style.top = `${mouseY}px`;
            }
          }, i * 20);
          trailTimeoutsRef.current.push(timeout);
        }
      });
    };

    // Mouse down handler
    const handleMouseDown = () => setIsClicking(true);

    // Mouse up handler
    const handleMouseUp = () => setIsClicking(false);

    // Hover detection
    const handleMouseEnter = (e) => {
      if (e.target.matches('a, button, input, textarea, select, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.matches('a, button, input, textarea, select, [role="button"]')) {
        setIsHovering(false);
      }
    };

    // Animation loop
    const animate = () => {
      // Smooth cursor follow
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      // Faster dot follow
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;

      // Even slower glow follow
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      // Update positions
      if (cursor) {
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        if (isClicking) cursor.classList.add('clicking');
        else cursor.classList.remove('clicking');
      }

      if (dot) {
        dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;
      }

      if (glow) {
        glow.style.transform = `translate(${glowX - 50}px, ${glowY - 50}px)`;
      }

      if (ring) {
        ring.style.left = `${cursorX - 20}px`;
        ring.style.top = `${cursorY - 20}px`;
      }

      if (crosshair) {
        crosshair.style.left = `${cursorX - 15}px`;
        crosshair.style.top = `${cursorY - 15}px`;
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
    };
  }, [isEnabled]);

  // Handle hover state
  useEffect(() => {
    if (cursorRef.current) {
      if (isHovering) {
        cursorRef.current.classList.add('hover');
      } else {
        cursorRef.current.classList.remove('hover');
      }
    }
  }, [isHovering]);

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

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={glowRef} className="cursor-glow" />
      <div ref={ringRef} className="cursor-tech-ring" />
      <div ref={crosshairRef} className="cursor-crosshair" />

      {/* Toggle indicator */}
      {!isEnabled && (
        <div className="fixed bottom-4 right-4 px-3 py-1 text-xs font-mono text-gray-500 bg-gray-900/50 rounded">
          Press ESC to enable cursor
        </div>
      )}
    </>
  );
};

// Simplified cursor with just the main elements
const SimpleCursor = () => {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-4 h-4 border-2 border-sapphire-blue rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150"
      style={{
        left: position.x - 8,
        top: position.y - 8
      }}
    />
  );
};

export { CustomCursor, SimpleCursor };
export default CustomCursor;
