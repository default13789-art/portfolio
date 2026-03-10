import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for section reveal animations using IntersectionObserver
 *
 * Features:
 * - IntersectionObserver-based reveal on scroll
 * - Multiple reveal animation types (fade-in-up, fade-in-left, fade-in-right, fade-in)
 * - Staggered animations for child elements
 * - Configurable threshold and root margin
 * - Respects prefers-reduced-motion for accessibility
 * - Proper cleanup to prevent memory leaks
 *
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Percentage of element visible before triggering (0-1)
 * @param {string} options.rootMargin - Margin around the root element (CSS syntax)
 * @param {boolean} options.triggerOnce - Whether to trigger animation only once
 * @param {number} options.staggerDelay - Delay between staggered child animations (ms)
 * @param {string} options.animationType - Default animation type for elements
 * @returns {Object} - { ref, isVisible, revealClass }
 *
 * @example
 * const { ref, isVisible, revealClass } = useRevealAnimations({
 *   threshold: 0.15,
 *   rootMargin: '0px 0px -100px 0px',
 *   triggerOnce: true,
 *   staggerDelay: 100
 * });
 */
const useRevealAnimations = ({
  threshold = 0.15,
  rootMargin = '0px 0px -100px 0px',
  triggerOnce = true,
  staggerDelay = 100,
  animationType = 'fade-in-up'
} = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [staggeredChildren, setStaggeredChildren] = useState([]);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Find all staggered children and trigger their animations
          const children = element.querySelectorAll('[data-reveal-stagger]');
          children.forEach((child, index) => {
            setTimeout(() => {
              setStaggeredChildren(prev => [...prev, index]);
            }, index * staggerDelay);
          });

          // Unobserve after triggering if triggerOnce is true
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          // Reset visibility when scrolling away if not triggerOnce
          setIsVisible(false);
          setStaggeredChildren([]);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, staggerDelay]);

  // Generate the appropriate reveal class based on animation type
  const getRevealClass = (type = animationType, index = null) => {
    const baseClass = 'reveal';
    const typeClass = `reveal-${type}`;
    const activeClass = 'reveal-active';

    // Check if this is a staggered child and if it's time to show it
    const isStaggeredChild = index !== null;
    const shouldShow = isStaggeredChild
      ? staggeredChildren.includes(index)
      : isVisible;

    return `${baseClass} ${typeClass} ${shouldShow ? activeClass : ''}`.trim();
  };

  return {
    ref,
    isVisible,
    revealClass: getRevealClass(),
    getRevealClass,
    staggeredChildren
  };
};

export default useRevealAnimations;


/**
 * Alternative hook for managing multiple revealable elements
 * Useful for grids or lists where each item needs independent observation
 *
 * @param {number} count - Number of items to observe
 * @param {Object} options - Configuration options (same as useRevealAnimations)
 * @returns {Array} - Array of refs and visibility states
 *
 * @example
 * const { refs, visibilities } = useMultipleRevealAnimations(projects.length, {
 *   threshold: 0.1,
 *   staggerDelay: 150
 * });
 */
export const useMultipleRevealAnimations = (count, options = {}) => {
  const refs = useRef([]);
  const [visibilities, setVisibilities] = useState(new Array(count).fill(false));

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setVisibilities(new Array(count).fill(true));
      return;
    }

    const observers = [];

    refs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibilities(prev => {
              const newVisibilities = [...prev];
              newVisibilities[index] = true;
              return newVisibilities;
            });

            if (options.triggerOnce !== false) {
              observer.unobserve(element);
            }
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px 0px -50px 0px',
        }
      );

      observer.observe(element);
      observers.push({ observer, element });
    });

    return () => {
      observers.forEach(({ observer, element }) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [count, options]);

  return {
    refs,
    visibilities,
    getRef: (index) => (el) => {
      refs.current[index] = el;
    },
    getRevealClass: (index, type = 'fade-in-up') => {
      const isVisible = visibilities[index];
      return `reveal reveal-${type} ${isVisible ? 'reveal-active' : ''}`.trim();
    }
  };
};


/**
 * Hook for parallax scroll effects
 * Creates a subtle parallax effect as user scrolls
 *
 * @param {number} speed - Speed multiplier (default: 0.5)
 * @returns {Object} - { ref, transform }
 *
 * @example
 * const { ref, transform } = useParallax(0.3);
 * <div ref={ref} style={{ transform }}>
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState('translateY(0px)');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      setTransform(`translateY(${rate}px)`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return { ref, transform };
};


/**
 * Hook for scroll progress indicator
 * Returns the scroll progress percentage (0-100)
 *
 * @returns {number} - Scroll progress percentage
 *
 * @example
 * const scrollProgress = useScrollProgress();
 * <div style={{ width: `${scrollProgress}%` }} />
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progressPercentage = (scrolled / documentHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progressPercentage)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return progress;
};
