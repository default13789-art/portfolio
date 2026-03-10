import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo, lazy } from 'react'

// Lazy load individual 3D components for better performance
const Stars     = lazy(() => import('./Stars'))
const SolarSystem = lazy(() => import('./SolarSystem'))
const CameraRig = lazy(() => import('./CameraRig'))

/**
 * UniverseScene – Solar System background
 *
 * Features:
 * - Deep-space starfield (twinkling)
 * - Full solar system: Sun + 8 planets with rings, moons, asteroid belt
 * - Smooth orbital & self-rotation animations
 * - Subtle mouse-parallax camera rig
 * - Performance optimised (adaptive pixel ratio, lazy chunks)
 */
export default function UniverseScene({
  starCount = 4000,
  className = '',
  style = {}
}) {
  const adjustedStarCount = useMemo(() => starCount, [starCount])

  return (
    <div
      className={`universe-scene ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style
      }}
    >
      <Canvas
        dpr={Math.min(window.devicePixelRatio, 2)}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        camera={{
          position: [0, 14, 52],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        shadows
        style={{ background: '#020208' }}
      >
        {/* Deep space background colour */}
        <color attach="background" args={['#020208']} />

        {/* Distant fog to fade far objects */}
        <fog attach="fog" args={['#020208', 80, 200]} />

        {/* Starfield */}
        <Suspense fallback={null}>
          <Stars count={adjustedStarCount} />
        </Suspense>

        {/* Solar system (Sun + planets + rings + asteroid belt) */}
        <Suspense fallback={null}>
          <SolarSystem />
        </Suspense>

        {/* Gentle mouse-parallax camera */}
        <Suspense fallback={null}>
          <CameraRig
            rotationIntensity={0.05}
            mouseIntensity={0.12}
            smoothness={0.04}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
