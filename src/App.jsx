import React, { useState, useEffect, lazy, Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import LoadingState from './components/ui/LoadingState';
import CustomCursor from './components/effects/CustomCursor';
import ParticleEffects from './components/effects/ParticleEffects';
import './styles/index.css';

// Dynamic imports for code splitting
const Navbar = lazy(() => import('./components/layout/Navbar'));
const Footer = lazy(() => import('./components/layout/Footer'));
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3ce6f9]"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [defer3DLoading, setDefer3DLoading] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCursorEnabled(false);
    }

    // Add cursor effects class to body
    if (cursorEnabled) {
      document.body.classList.add('cursor-effects-enabled');
    }

    // Defer 3D scene loading until after initial page load
    // This improves initial page load performance
    const deferTimeout = setTimeout(() => {
      setDefer3DLoading(false);
    }, 1500); // Wait 1.5 seconds after initial load before allowing 3D scene to initialize

    return () => clearTimeout(deferTimeout);
  }, [cursorEnabled]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingState onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Custom Cursor */}
      {cursorEnabled && <CustomCursor />}

      {/* Ambient Background Effects */}
      <ParticleEffects
        particles={true}
        lines={true}
        mesh={true}
        orbs={true}
        scanlines={false}
      />

      {/* Main Content with Suspense boundaries */}
      <div className="relative z-10">
        <Suspense fallback={<SectionLoader />}>
          <Navbar />
        </Suspense>

        <main>
          <Suspense fallback={<SectionLoader />}>
            <Hero defer3DLoading={defer3DLoading} />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}

export default App;
