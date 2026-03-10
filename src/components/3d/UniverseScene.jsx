import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo, lazy } from 'react'

// Lazy load individual 3D components for better performance
const Stars = lazy(() => import('./Stars'))
const NeonGrid = lazy(() => import('./NeonGrid'))
const CameraRig = lazy(() => import('./CameraRig'))
const FloatingShapes = lazy(() => import('./FloatingShapes'))
const NeuralNetwork = lazy(() => import('./NeuralNetwork'))

/**
 * UniverseScene - A lightweight 3D space background
 *
 * Features:
 * - Dark space environment with fog
 * - Thousands of twinkling stars
 * - Floating geometric shapes for added depth
 * - Animated neural network for AI/tech atmosphere
 * - Neon grid floor for retro sci-fi aesthetic
 * - Subtle camera movement and mouse interaction
 * - Performance optimized for smooth running on laptops
 * - Responsive design that works on mobile
 *
 * Performance optimizations:
 * - Limited pixel ratio for better performance
 * - Frame loop control (demand when not in view)
 * - Efficient BufferGeometry for particles
 * - Adaptive particle count based on device
 */
export default function UniverseScene({
  starCount = 4000,
  shapeCount = 18,
  className = '',
  style = {}
}) {
  // Reduce particle count on mobile devices for better performance
  const adjustedStarCount = useMemo(() => {
    const isMobile = window.innerWidth < 768
    return isMobile ? Math.min(starCount, 2000) : starCount
  }, [starCount])

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
        dpr={Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio for performance
        gl={{
          antialias: false, // Disable antialiasing for better performance
          powerPreference: 'high-performance'
        }}
        camera={{
          position: [0, 0, 30],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e)' }}
      >
        {/* Space environment - loaded immediately */}
        <color attach="background" args={['#050510']} />
        <fog
          attach="fog"
          args={['#050510', 20, 150]}
          distance={80}
        />

        {/* Subtle ambient lighting */}
        <ambientLight intensity={0.1} />

        {/* Lazy loaded 3D components with individual Suspense boundaries */}
        <Suspense fallback={null}>
          {/* Starfield - priority component */}
          <Stars count={adjustedStarCount} />
        </Suspense>

        <Suspense fallback={null}>
          {/* Floating geometric shapes - secondary priority */}
          <FloatingShapes
            count={shapeCount}
            spreadX={70}
            spreadY={30}
            spreadZ={70}
            animationSpeed={0.2}
            minDistance={12}
          />
        </Suspense>

        <Suspense fallback={null}>
          {/* Neural network visualization - tertiary priority */}
          <NeuralNetwork
            particleCount={90}
            connectionDistance={7}
            driftSpeed={0.15}
            bounds={25}
            nodeColor="#00ffaa"
            connectionColor="#00ffaa"
            nodeSize={0.15}
            opacity={0.4}
          />
        </Suspense>

        <Suspense fallback={null}>
          {/* Neon grid floor - lowest priority */}
          <NeonGrid
            color="#00ffff"
            secondaryColor="#8b5cf6"
            size={200}
            segments={60}
            positionY={-8}
            waveSpeed={0.3}
            waveHeight={0.2}
            mouseInfluence={0.1}
            fadeDistance={50}
            fadeLength={100}
          />
        </Suspense>

        <Suspense fallback={null}>
          {/* Camera controls - load last */}
          <CameraRig
            rotationIntensity={0.1}
            mouseIntensity={0.3}
            smoothness={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
