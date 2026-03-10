import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getParticleCount, useFrameThrottle, usePerformanceMonitor } from '../../utils/performance'

/**
 * Stars component - Creates a realistic starfield with twinkling effect
 * Uses BufferGeometry for optimal performance with thousands of particles
 *
 * Performance optimizations:
 * - Device-aware particle count adjustment
 * - LOD system for distance-based quality
 * - Frame rate throttling
 * - Adaptive quality based on FPS
 */
export default function Stars({ count = 4000 }) {
  const pointsRef = useRef()
  const { checkUpdate, getDelta } = useFrameThrottle()
  const { updateFPS, getQuality } = usePerformanceMonitor()

  // Get adjusted particle count based on device capabilities
  const adjustedCount = useMemo(() => getParticleCount(count), [count])

  // Generate star positions only once on mount
  const [positions, scales, twinkleOffsets] = useMemo(() => {
    const positions = new Float32Array(adjustedCount * 3)
    const scales = new Float32Array(adjustedCount)
    const twinkleOffsets = new Float32Array(adjustedCount)

    for (let i = 0; i < adjustedCount; i++) {
      // Distribute stars in a sphere around the camera
      const radius = 50 + Math.random() * 100
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Random initial scale for variation
      scales[i] = Math.random()

      // Store random offset for twinkling (prevents recalculation)
      twinkleOffsets[i] = i * 0.1 + Math.random() * 0.5
    }

    return [positions, scales, twinkleOffsets]
  }, [adjustedCount])

  // Optimized twinkling animation with throttling
  useFrame((state) => {
    updateFPS() // Monitor performance

    const time = state.clock.getElapsedTime()

    // Check if we should update this frame (throttling)
    if (!checkUpdate(time * 1000)) {
      return
    }

    if (pointsRef.current) {
      const delta = getDelta()
      const quality = getQuality()
      const scalesArray = pointsRef.current.geometry.attributes.scale.array

      // LOD: Update fewer stars on lower quality settings
      const updateStride = quality < 0.7 ? 3 : quality < 0.9 ? 2 : 1

      // Update scales for twinkling effect (optimized loop)
      for (let i = 0; i < adjustedCount; i += updateStride) {
        // Create a subtle pulsing effect with different frequencies per star
        const offset = twinkleOffsets[i]
        scalesArray[i] = 0.5 + Math.sin(time * 0.5 + offset) * 0.3 + Math.random() * 0.2
      }

      pointsRef.current.geometry.attributes.scale.needsUpdate = true

      // Slow rotation of the entire starfield
      pointsRef.current.rotation.y = time * 0.02 * delta * 60 // Normalize to 60 FPS
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={adjustedCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={adjustedCount}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
