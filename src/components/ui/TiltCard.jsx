import React, { useState, useRef, useEffect, useCallback } from 'react';

/**
 * TiltCard - A reusable glassmorphism card with 3D tilt effect on mouse hover
 *
 * @component
 * @example
 * ```jsx
 * <TiltCard
 *   className="extra-class"
 *   tiltIntensity={15}
 *   glowColor="#3ce6f9"
 *   disabled={false}
 * >
 *   <div>Your content here</div>
 * </TiltCard>
 * ```
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be displayed inside the card
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {number} [props.tiltIntensity=15] - Maximum rotation angle in degrees (0-30 recommended)
 * @param {string} [props.glowColor='#3ce6f9'] - Color for the border glow effect (hex, rgb, or color name)
 * @param {boolean} [props.disabled=false] - Disable tilt effect (useful for touch devices or accessibility)
 * @param {function} [props.onTiltStart] - Callback when tilt effect starts
 * @param {function} [props.onTiltEnd] - Callback when tilt effect ends
 * @param {function} [props.onTiltChange] - Callback with current tilt values {rotateX, rotateY}
 * @returns {JSX.Element} The TiltCard component
 */
const TiltCard = ({
  children,
  className = '',
  tiltIntensity = 15,
  glowColor = '#3ce6f9',
  disabled = false,
  onTiltStart,
  onTiltEnd,
  onTiltChange,
}) => {
  // State for tilt rotation values
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Refs for DOM elements and animation frame
  const cardRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  // Detect if device supports touch
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check for touch device capability
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };

    checkTouchDevice();
    window.addEventListener('touchstart', checkTouchDevice, { once: true });

    return () => {
      window.removeEventListener('touchstart', checkTouchDevice);
    };
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /**
   * Calculate tilt angles based on mouse position relative to card center
   * Uses requestAnimationFrame for smooth, performance-optimized updates
   */
  const calculateTilt = useCallback((clientX, clientY) => {
    if (!cardRef.current || disabled || isTouchDevice || prefersReducedMotion()) {
      return;
    }

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center (normalized -1 to 1)
    const normalizedX = (clientX - centerX) / (rect.width / 2);
    const normalizedY = (clientY - centerY) / (rect.height / 2);

    // Calculate rotation angles (clamped to tiltIntensity)
    const newRotateY = Math.max(-tiltIntensity, Math.min(tiltIntensity, normalizedX * tiltIntensity));
    const newRotateX = Math.max(-tiltIntensity, Math.min(tiltIntensity, -normalizedY * tiltIntensity));

    // Update state with new values
    setRotateX(newRotateX);
    setRotateY(newRotateY);

    // Trigger callback with current tilt values
    if (onTiltChange) {
      onTiltChange({ rotateX: newRotateX, rotateY: newRotateY });
    }
  }, [tiltIntensity, disabled, isTouchDevice, prefersReducedMotion, onTiltChange]);

  /**
   * Animation loop for smooth tilt updates
   * This provides better performance than direct state updates
   */
  const animateTilt = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      // Animation logic can be added here for spring physics
      // Currently handled by CSS transitions for simplicity
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateTilt);
  }, []);

  // Handle mouse move with throttling via requestAnimationFrame
  const handleMouseMove = useCallback((e) => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(() => {
      calculateTilt(e.clientX, e.clientY);
    });
  }, [calculateTilt]);

  // Handle mouse enter - start tilt effect
  const handleMouseEnter = useCallback(() => {
    if (disabled || isTouchDevice || prefersReducedMotion()) {
      return;
    }

    setIsHovered(true);

    if (onTiltStart) {
      onTiltStart();
    }

    // Start animation loop
    requestRef.current = requestAnimationFrame(animateTilt);
  }, [disabled, isTouchDevice, prefersReducedMotion, onTiltStart, animateTilt]);

  // Handle mouse leave - reset tilt
  const handleMouseLeave = useCallback(() => {
    if (disabled || isTouchDevice || prefersReducedMotion()) {
      return;
    }

    setIsHovered(false);

    // Reset rotation
    setRotateX(0);
    setRotateY(0);

    if (onTiltEnd) {
      onTiltEnd();
    }

    // Cancel animation loop
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    // Trigger final callback with reset values
    if (onTiltChange) {
      onTiltChange({ rotateX: 0, rotateY: 0 });
    }
  }, [disabled, isTouchDevice, prefersReducedMotion, onTiltEnd, onTiltChange]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Determine if tilt should be applied
  const shouldApplyTilt = !disabled && !isTouchDevice && !prefersReducedMotion();

  // Dynamic styles
  const cardStyle = {
    transform: shouldApplyTilt
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      : 'none',
    '--glow-color': glowColor,
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={cardStyle}
      onMouseMove={shouldApplyTilt ? handleMouseMove : undefined}
      onMouseEnter={shouldApplyTilt ? handleMouseEnter : undefined}
      onMouseLeave={shouldApplyTilt ? handleMouseLeave : undefined}
      role="article"
      aria-label="Tilt card with 3D effect"
    >
      <div className="tilt-card-content">
        {children}
      </div>

      <style jsx>{`
        .tilt-card {
          position: relative;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          padding: 24px;

          /* Enhanced shadow for glassmorphism */
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);

          /* Smooth transitions for transform changes */
          transition:
            transform 0.1s ease-out,
            box-shadow 0.3s ease,
            border-color 0.3s ease;

          /* GPU acceleration for smooth animations */
          will-change: transform;

          /* Prevent text selection during tilt */
          user-select: none;

          overflow: hidden;
        }

        /* Glow effect on hover */
        .tilt-card:hover {
          border-color: var(--glow-color);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0 20px rgba(var(--glow-color), 0.3),
            0 0 40px rgba(var(--glow-color), 0.1);
        }

        /* Inner content container to prevent transform issues */
        .tilt-card-content {
          position: relative;
          z-index: 1;
          pointer-events: auto;
          user-select: auto;
          height: 100%;
          width: 100%;
        }

        /* Decorative gradient overlay for enhanced glass effect */
        .tilt-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          border-radius: 16px 16px 0 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tilt-card:hover::before {
          opacity: 1;
        }

        /* Touch device adjustments */
        @media (hover: none) and (pointer: coarse) {
          .tilt-card {
            transform: none !important;
            transition: none;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .tilt-card {
            transform: none !important;
            transition: none;
            will-change: auto;
          }

          .tilt-card:hover {
            box-shadow:
              0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
        }

        /* Focus styles for accessibility */
        .tilt-card:focus-within {
          outline: 2px solid var(--glow-color);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default TiltCard;
