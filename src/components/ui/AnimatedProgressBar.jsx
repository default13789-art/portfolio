import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedProgressBar - A glowing, animated progress bar component
 *
 * @component
 * @example
 * ```jsx
 * <AnimatedProgressBar
 *   percentage={85}
 *   color="#3ce6f9"
 *   label="Python"
 *   duration={1500}
 * />
 * ```
 *
 * @param {Object} props - Component props
 * @param {number} props.percentage - Target percentage (0-100)
 * @param {string} [props.color='#3ce6f9'] - Color for the progress bar (hex, rgb, or color name)
 * @param {string} [props.label] - Label to display above the progress bar
 * @param {number} [props.duration=1500] - Animation duration in milliseconds
 * @param {number} [props.height=8] - Height of the progress bar in pixels
 * @param {boolean} [props.showPercentage=true] - Whether to show the percentage label
 * @param {boolean} [props.glow=true] - Whether to show the glow effect
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @returns {JSX.Element} The AnimatedProgressBar component
 */
const AnimatedProgressBar = ({
  percentage,
  color = '#3ce6f9',
  label,
  duration = 1500,
  height = 8,
  showPercentage = true,
  glow = true,
  className = '',
}) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const progressBarRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // Easing function for smooth animation (ease-out cubic)
  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };

  // Animate progress bar
  const animateProgress = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    setCurrentPercentage(clampedPercentage * easedProgress);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animateProgress);
    }
  };

  // Intersection Observer to trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (progressBarRef.current) {
      observer.observe(progressBarRef.current);
    }

    return () => {
      if (progressBarRef.current) {
        observer.unobserve(progressBarRef.current);
      }
    };
  }, [isVisible]);

  // Start animation when component becomes visible
  useEffect(() => {
    if (isVisible) {
      animationRef.current = requestAnimationFrame(animateProgress);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, duration, clampedPercentage]);

  // Check for reduced motion preference
  const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  // If reduced motion is preferred, show full progress immediately
  useEffect(() => {
    if (prefersReducedMotion() && isVisible) {
      setCurrentPercentage(clampedPercentage);
    }
  }, [isVisible, clampedPercentage]);

  return (
    <div
      ref={progressBarRef}
      className={`animated-progress-bar ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(currentPercentage)}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label={label || `Progress: ${clampedPercentage}%`}
    >
      {/* Header with label and percentage */}
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-gray-300 font-medium text-sm">{label}</span>
          )}
          {showPercentage && (
            <span
              className="font-semibold text-sm transition-colors duration-300"
              style={{ color }}
            >
              {Math.round(currentPercentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Bar Container */}
      <div
        className="relative rounded-full overflow-hidden transition-all duration-300"
        style={{
          height: `${height}px`,
          backgroundColor: 'rgba(26, 26, 36, 0.8)',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Animated Progress Fill */}
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all"
          style={{
            width: `${currentPercentage}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${adjustColorBrightness(color, 20)})`,
            boxShadow: glow
              ? `0 0 10px ${color}40, 0 0 20px ${color}20, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
              : 'none',
            transition: prefersReducedMotion() ? 'none' : `width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          {/* Animated shimmer effect */}
          {!prefersReducedMotion() && (
            <div className="absolute top-0 left-0 w-full h-full">
              <div
                className="absolute top-0 left-0 h-full w-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  animation: 'shimmer 2s infinite',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Inline styles for animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animated-progress-bar {
          width: 100%;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animated-progress-bar div[style*="transition"] {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Helper function to adjust color brightness
 * @param {string} color - Hex color code
 * @param {number} amount - Amount to adjust (-255 to 255)
 * @returns {string} Adjusted hex color
 */
const adjustColorBrightness = (color, amount) => {
  let usePound = false;
  let col = color.trim();

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);

  let r = (num >> 16) + amount;
  let b = ((num >> 8) & 0x00ff) + amount;
  let g = (num & 0x0000ff) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (
    (usePound ? '#' : '') +
    (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')
  );
};

export default AnimatedProgressBar;
