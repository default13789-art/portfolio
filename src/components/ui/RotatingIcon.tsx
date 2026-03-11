import React, { useRef, useEffect, useState } from 'react';

/**
 * RotatingIcon - An icon with continuous rotation animation and glow effects
 *
 * @component
 * @example
 * // See README.SKILL_COMPONENTS.md for usage examples
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - SVG icon to rotate
 * @param {string} [props.rotationSpeed='10s'] - Duration for one full rotation (CSS time value)
 * @param {boolean} [props.pauseOnHover=true] - Whether to pause rotation on hover
 * @param {string} [props.glowColor='#00F5FF'] - Color for the glow effect
 * @param {number} [props.size=48] - Size of the icon container in pixels
 * @param {boolean} [props.showGlow=true] - Whether to show the glow effect
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {string} [props.rotationDirection='clockwise'] - Direction of rotation ('clockwise' or 'counter-clockwise')
 * @returns {JSX.Element} The RotatingIcon component
 */
const RotatingIcon = ({
  children,
  rotationSpeed = '10s',
  pauseOnHover = true,
  glowColor = '#00F5FF',
  size = 48,
  showGlow = true,
  className = '',
  rotationDirection = 'clockwise',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef(null);
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);

  // Check for reduced motion preference
  const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  // Validate rotation speed format
  const validateRotationSpeed = (speed) => {
    // Check if it's a valid CSS time value (number followed by s or ms)
    const isValidTime = /^(\d+(\.\d+)?(s|ms))$/.test(speed);
    return isValidTime ? speed : '10s';
  };

  const validRotationSpeed = validateRotationSpeed(rotationSpeed);

  // Cleanup any ongoing animations
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  // Handle keyboard interaction for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsHovered((prev) => !prev);
    }
  };

  const validSize = typeof size === 'number' && size > 0 ? size : 48;

  return (
    <div
      ref={containerRef}
      className={`rotating-icon-container ${className}`}
      style={{
        width: `${validSize}px`,
        height: `${validSize}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      onFocus={() => pauseOnHover && setIsHovered(true)}
      onBlur={() => pauseOnHover && setIsHovered(false)}
      onKeyDown={handleKeyDown}
      role="img"
      aria-label="Rotating icon"
      tabIndex={0}
    >
      <div
        ref={iconRef}
        className="rotating-icon"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '--rotation-speed': validRotationSpeed,
          '--rotation-direction': rotationDirection === 'counter-clockwise' ? 'reverse' : 'normal',
          '--glow-color': glowColor,
          '--icon-size': `${validSize}px`,
        }}
      >
        {/* Glow effect container */}
        {showGlow && !prefersReducedMotion() && (
          <div
            className="icon-glow"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
              opacity: isHovered ? '1' : '0.5',
              transition: 'opacity 0.3s ease',
              filter: 'blur(8px)',
              animation: isHovered ? 'pulse-glow 1.5s ease-in-out infinite' : 'none',
            }}
          />
        )}

        {/* Icon wrapper with rotation */}
        <div
          className="icon-wrapper"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: prefersReducedMotion()
              ? 'none'
              : `rotate var(--rotation-speed) linear infinite`,
            animationDirection: 'var(--rotation-direction)',
            animationPlayState: pauseOnHover && isHovered ? 'paused' : 'running',
          }}
        >
          {children}
        </div>

        {/* Static styles for animation */}
        <style jsx>{`
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes pulse-glow {
            0%,
            100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
            }
          }

          .rotating-icon-container {
            position: relative;
            cursor: pointer;
          }

          .icon-wrapper {
            will-change: transform;
          }

          /* Ensure SVG fills the container */
          .icon-wrapper :global(svg) {
            width: 100%;
            height: 100%;
            filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
          }

          /* Enhanced glow on hover for the icon itself */
          .rotating-icon-container:hover .icon-wrapper :global(svg) {
            filter: drop-shadow(0 0 8px var(--glow-color));
            transition: filter 0.3s ease;
          }

          /* Focus styles for accessibility */
          .rotating-icon-container:focus-visible {
            outline: 2px solid var(--glow-color);
            outline-offset: 4px;
            border-radius: 50%;
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            .icon-wrapper {
              animation: none !important;
            }

            .icon-glow {
              animation: none !important;
            }
          }

          /* Touch device adjustments */
          @media (hover: none) and (pointer: coarse) {
            .rotating-icon-container {
              /* Keep rotating on touch devices but disable hover pause */
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default RotatingIcon;
