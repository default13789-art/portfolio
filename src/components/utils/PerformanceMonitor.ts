/**
 * PerformanceMonitor - Utilities for monitoring and optimizing 3D scene performance
 */

/**
 * Check if device is mobile
 */
export const isMobile = () => {
  return window.innerWidth < 768;
};

/**
 * Check if device should use reduced 3D effects
 * Takes into account both device capabilities and user preferences
 */
export const shouldReduce3DEffects = () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check for low-end devices (heuristic)
  const isLowEndDevice = (
    // Less than 4GB RAM (heuristic based on navigator.deviceMemory if available)
    (navigator.deviceMemory && navigator.deviceMemory < 4) ||
    // Low number of CPU cores (heuristic)
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
    // Mobile device
    isMobile()
  );

  return prefersReducedMotion || isLowEndDevice;
};

/**
 * Get optimized particle counts based on device capabilities
 */
export const getOptimizedParticleCount = (baseCount, mobileMultiplier = 0.4) => {
  if (shouldReduce3DEffects()) {
    return Math.floor(baseCount * mobileMultiplier);
  }
  return baseCount;
};

/**
 * Get optimized settings for 3D scenes based on device
 */
export const getOptimized3DSettings = () => {
  const reduceEffects = shouldReduce3DEffects();

  return {
    starCount: reduceEffects ? 1500 : 4000,
    shapeCount: reduceEffects ? 8 : 18,
    neuralNetworkParticles: reduceEffects ? 50 : 90,
    neonGridSegments: reduceEffects ? 30 : 60,
    pixelRatio: reduceEffects ? 1 : Math.min(window.devicePixelRatio, 2),
    antialias: !reduceEffects,
    shadows: !reduceEffects,
  };
};

/**
 * Performance monitor for tracking FPS and memory usage
 */
export class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.lastTime = performance.now();
    this.frames = 0;
    this.isMonitoring = false;
  }

  start() {
    this.isMonitoring = true;
    this.lastTime = performance.now();
    this.frames = 0;
    this.measure();
  }

  stop() {
    this.isMonitoring = false;
  }

  measure() {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    this.frames++;

    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
      this.frames = 0;
      this.lastTime = currentTime;

      // Log performance warning if FPS is low
      if (this.fps < 30) {
        console.warn(`Low FPS detected: ${this.fps}. Consider reducing 3D effects.`);
      }
    }

    requestAnimationFrame(() => this.measure());
  }

  getFPS() {
    return this.fps;
  }

  isLowPerformance() {
    return this.fps > 0 && this.fps < 30;
  }
}

/**
 * Lazy load Three and related dependencies
 */
export const lazyLoadThreeJS = async () => {
  try {
    // These will be loaded only when needed
    const [
      { Canvas },
      threeModule
    ] = await Promise.all([
      import('@react-three/fiber'),
      import('three')
    ]);

    return { Canvas, three: threeModule };
  } catch (error) {
    console.error('Failed to lazy load Three:', error);
    throw error;
  }
};

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if element is in viewport with intersection observer
 */
export const createVisibilityObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '100px',
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        callback(entry.isIntersecting, entry.target);
      });
    },
    { ...defaultOptions, ...options }
  );

  return observer;
};
