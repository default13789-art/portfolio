import React, { useState, useEffect, useRef, Suspense } from 'react';
import Scene3DLoading from '../ui/Scene3DLoading';
import { getOptimized3DSettings } from '../utils/PerformanceMonitor';

/**
 * LazyUniverseScene - Lazy-loaded 3D scene with visibility detection
 *
 * Features:
 * - Uses IntersectionObserver to detect when Hero section is visible
 * - Only loads 3D components when needed (defers Three.js loading)
 * - Provides loading fallback during component loading
 * - Unloads 3D scene when not visible to save resources
 * - Configurable visibility threshold and root margin
 */
const LazyUniverseScene = ({
  starCount = 4000,
  className = '',
  style = {},
  visibilityThreshold = 0.1, // Trigger when 10% visible
  rootMargin = '100px', // Start loading 100px before visible
  unloadWhenHidden = true, // Unload component when not visible
  unloadDelay = 5000 // Wait 5 seconds after hiding before unloading
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef(null);
  const unloadTimeoutRef = useRef(null);

  useEffect(() => {
    // Defer initial check until after page load
    const deferCheck = setTimeout(() => {
      setShouldLoad(true);
    }, 100);

    return () => clearTimeout(deferCheck);
  }, []);

  useEffect(() => {
    if (!shouldLoad || !containerRef.current) return;

    // Create IntersectionObserver to detect visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;

          if (isIntersecting) {
            // Clear any pending unload timeout
            if (unloadTimeoutRef.current) {
              clearTimeout(unloadTimeoutRef.current);
              unloadTimeoutRef.current = null;
            }

            setIsVisible(true);
            setHasLoaded(true);
          } else if (unloadWhenHidden) {
            // Schedule unload after delay
            unloadTimeoutRef.current = setTimeout(() => {
              setIsVisible(false);
            }, unloadDelay);
          }
        });
      },
      {
        threshold: visibilityThreshold,
        rootMargin: rootMargin
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (unloadTimeoutRef.current) {
        clearTimeout(unloadTimeoutRef.current);
      }
    };
  }, [shouldLoad, visibilityThreshold, rootMargin, unloadWhenHidden, unloadDelay]);

  // Get optimized settings based on device capabilities
  const optimizedSettings = getOptimized3DSettings();

  // Import UniverseScene component only when needed
  const UniverseScene = React.useMemo(() => {
    return React.lazy(() => import('./UniverseScene'));
  }, []);

  // Use optimized star count if not explicitly provided
  const finalStarCount = starCount || optimizedSettings.starCount;

  return (
    <div ref={containerRef} className={`lazy-universe-scene ${className}`} style={style}>
      {shouldLoad && hasLoaded && (
        <Suspense fallback={<Scene3DLoading />}>
          {isVisible ? (
            <UniverseScene starCount={finalStarCount} />
          ) : (
            <Scene3DLoading />
          )}
        </Suspense>
      )}
      {!hasLoaded && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e)'
          }}
        />
      )}
    </div>
  );
};

export default LazyUniverseScene;
