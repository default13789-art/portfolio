import React, { useState, useEffect, useRef, Suspense } from 'react';
import Scene3DLoading from '../ui/Scene3DLoading';

/**
 * LazyUniverseScene - Lazy-loaded 3D solar system scene
 *
 * Features:
 * - Uses IntersectionObserver to detect when Contact section is visible
 * - Only loads 3D components when needed (defers Three loading)
 * - Provides loading fallback during component loading
 * - Renders immediately once load is triggered (no waiting for second observer callback)
 */
const LazyUniverseScene = ({
  className = '',
  style = {},
  visibilityThreshold = 0.1,
  rootMargin = '100px',
  unloadWhenHidden = false,
  unloadDelay = 10000
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Trigger load after component mounts
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Import UniverseScene component only when needed
  const UniverseScene = React.useMemo(() => {
    return React.lazy(() => import('./UniverseScene'));
  }, []);

  return (
    <div ref={containerRef} className={`lazy-universe-scene ${className}`} style={style}>
      {shouldLoad ? (
        <Suspense fallback={<Scene3DLoading />}>
          <UniverseScene />
        </Suspense>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'linear-gradient(to bottom, #0a0a0a, #050510)'
          }}
        >
          <div className="text-gray-500 text-sm">Loading solar system...</div>
        </div>
      )}
    </div>
  );
};

export default LazyUniverseScene;
