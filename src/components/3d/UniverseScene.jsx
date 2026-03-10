import { Canvas } from '@react-three/fiber'
import { Suspense, lazy, useState, useEffect } from 'react'

// Lazy load individual 3D components for better performance
const SolarSystem = lazy(() => import('./SolarSystem'))
const CameraRig = lazy(() => import('./CameraRig'))

/**
 * UniverseScene – Solar System background
 *
 * Features:
 * - Pure black background
 * - Full solar system: Sun + 8 planets with rings, moons, asteroid belt
 * - Smooth orbital & self-rotation animations
 * - Subtle mouse-parallax camera rig
 * - Performance optimised (adaptive pixel ratio, lazy chunks)
 */
export default function UniverseScene({
  className = '',
  style = {}
}) {
  const [dpr, setDpr] = useState(1)

  useEffect(() => {
    // Safe access to window.devicePixelRatio after mount
    setDpr(Math.min(window.devicePixelRatio || 1, 2))
  }, [])

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
        dpr={dpr}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        camera={{
          position: [0, 14, 52],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        shadows
        style={{ background: '#000000' }}
      >
        {/* Pure black background */}
        <color attach="background" args={['#000000']} />

        {/* Distant fog to fade far objects */}
        <fog attach="fog" args={['#000000', 80, 200]} />

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
