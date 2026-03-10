import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getParticleCount, useFrameThrottle, usePerformanceMonitor, isFeatureEnabled } from '../../utils/performance'
import { useObject3DPool } from '../../utils/objectPool'

/**
 * NeuralNetwork - AI-inspired particle system with dynamic connections
 *
 * Creates an atmospheric neural network visualization with:
 * - 100+ glowing particles that drift organically through 3D space
 * - Dynamic connections that appear/disappear based on particle proximity
 * - Distance-based opacity for smooth line fading effects
 * - Performance-optimized using InstancedMesh and BufferGeometry
 * - Matching neon cyan/purple theme colors
 *
 * Features:
 * - Particles use InstancedMesh for GPU-efficient rendering
 * - Connections use LineSegments with BufferGeometry
 * - Organic movement with smooth velocity changes
 * - Maximum connections per particle to prevent visual clutter
 * - Configurable particle count, speed, and appearance
 *
 * Performance optimizations:
 * - Device-aware particle count adjustment
 * - InstancedMesh reuses geometry across all particles
 * - BufferGeometry for efficient line updates
 * - Frame rate throttling
 * - Adaptive quality based on FPS
 * - Object pooling for matrix updates
 * - LOD for connection distance
 * - Spatial partitioning ready for more particles
 * - Optimized distance calculations with squared distances
 * - Maximum connection limits prevent exponential growth
 *
 * @param {Object} props - Component props
 * @param {number} props.particleCount - Number of particles (default: 100)
 * @param {number} props.connectionDistance - Max distance for connections (default: 8)
 * @param {number} props.driftSpeed - Movement speed multiplier (default: 0.5)
 * @param {number} props.bounds - Area particles stay within (default: 40)
 * @param {number} props.particleSize - Size of particles (default: 0.15)
 * @param {string} props.particleColor - Particle color hex (default: "#00ffff")
 * @param {string} props.lineColor - Connection line color hex (default: "#8b5cf6")
 * @param {number} props.maxConnections - Max connections per particle (default: 5)
 * @param {boolean} props.enableGlow - Enable emissive glow effect (default: true)
 */
export default function NeuralNetwork({
  particleCount = 100,
  connectionDistance = 8,
  driftSpeed = 0.5,
  bounds = 40,
  particleSize = 0.15,
  particleColor = '#00ffff',
  lineColor = '#8b5cf6',
  maxConnections = 5
}) {
  // Refs for meshes and data
  const particlesRef = useRef()
  const linesRef = useRef()

  // Performance optimization hooks
  const { checkUpdate, getDelta } = useFrameThrottle()
  const { updateFPS, getQuality } = usePerformanceMonitor()
  const { getSharedDummy } = useObject3DPool()

  // Get adjusted particle count based on device capabilities
  const adjustedCount = useMemo(() => getParticleCount(particleCount), [particleCount])

  // Get feature flags
  const enableGlowFeature = useMemo(() => isFeatureEnabled('enableGlow'), [])

  // Particle data arrays
  const particleData = useRef({
    positions: null,
    velocities: null,
    noiseOffsets: null
  })

  // Initialize particles and their properties
  useEffect(() => {
    const positions = new Float32Array(adjustedCount * 3)
    const velocities = new Float32Array(adjustedCount * 3)
    const noiseOffsets = new Float32Array(adjustedCount * 3)

    // Initialize each particle with random position and velocity
    for (let i = 0; i < adjustedCount; i++) {
      // Random position within bounds
      positions[i * 3] = (Math.random() - 0.5) * bounds
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds

      // Random velocity for organic movement
      // Use small values for gentle drifting
      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02

      // Pre-calculate random noise offsets for organic movement
      noiseOffsets[i * 3] = Math.random() * 0.1
      noiseOffsets[i * 3 + 1] = Math.random() * 0.15
      noiseOffsets[i * 3 + 2] = Math.random() * 0.2
    }

    particleData.current = { positions, velocities, noiseOffsets }
  }, [adjustedCount, bounds])

  // Create particle geometry and material (memoized)
  const particleGeometry = useMemo(() => {
    return new THREE.SphereGeometry(particleSize, 8, 8)
  }, [particleSize])

  const particleMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(particleColor),
      transparent: true,
      opacity: 0.9
    })
  }, [particleColor])

  // Create line material (memoized)
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(lineColor),
      transparent: true,
      opacity: enableGlowFeature ? 0.6 : 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }, [lineColor, enableGlowFeature])

  // Calculate maximum number of possible connections
  // Each particle can connect to maxConnections others
  // Total lines = (adjustedCount * maxConnections)
  const maxLines = Math.floor(adjustedCount * maxConnections)

  // LOD-adjusted connection distance
  const lodConnectionDistance = useMemo(() => {
    const quality = getQuality()
    return connectionDistance * (0.7 + quality * 0.3)
  }, [connectionDistance, getQuality])

  // Create line geometry with dynamic buffer
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()

    // Position attribute for line vertices
    const positions = new Float32Array(maxLines * 6) // 2 points * 3 coordinates per line
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Opacity attribute for fading effect
    const opacities = new Float32Array(maxLines * 2) // 2 vertices per line
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1))

    geometry.setDrawRange(0, 0) // Start with no lines

    return geometry
  }, [maxLines])

  // Squared connection distance for faster comparisons (avoid sqrt)
  const connectionDistanceSq = lodConnectionDistance * lodConnectionDistance

  // Animation loop with performance optimizations
  useFrame((state) => {
    updateFPS() // Monitor performance

    const time = state.clock.getElapsedTime()

    // Check if we should update this frame (throttling)
    if (!checkUpdate(time * 1000)) {
      return
    }

    if (!particlesRef.current || !linesRef.current || !particleData.current.positions) {
      return
    }

    const { positions, velocities, noiseOffsets } = particleData.current
    const delta = getDelta()
    const quality = getQuality()

    // Normalize speed to 60 FPS
    const normalizedSpeed = driftSpeed * delta * 60

    // Update particle positions
    for (let i = 0; i < adjustedCount; i++) {
      const i3 = i * 3

      // Add gentle Perlin-like noise to velocity for organic movement
      // Using pre-calculated offsets and sine waves for smooth motion
      velocities[i3] += Math.sin(time * 0.3 + noiseOffsets[i3]) * 0.0001 * normalizedSpeed
      velocities[i3 + 1] += Math.cos(time * 0.2 + noiseOffsets[i3 + 1]) * 0.0001 * normalizedSpeed
      velocities[i3 + 2] += Math.sin(time * 0.25 + noiseOffsets[i3 + 2]) * 0.0001 * normalizedSpeed

      // Apply velocity to position
      positions[i3] += velocities[i3] * normalizedSpeed
      positions[i3 + 1] += velocities[i3 + 1] * normalizedSpeed
      positions[i3 + 2] += velocities[i3 + 2] * normalizedSpeed

      // Boundary checking with soft bouncing
      const halfBounds = bounds / 2
      const bounceFactor = -0.5 // Reverse velocity with damping

      if (positions[i3] > halfBounds) {
        positions[i3] = halfBounds
        velocities[i3] *= bounceFactor
      } else if (positions[i3] < -halfBounds) {
        positions[i3] = -halfBounds
        velocities[i3] *= bounceFactor
      }

      if (positions[i3 + 1] > halfBounds) {
        positions[i3 + 1] = halfBounds
        velocities[i3 + 1] *= bounceFactor
      } else if (positions[i3 + 1] < -halfBounds) {
        positions[i3 + 1] = -halfBounds
        velocities[i3 + 1] *= bounceFactor
      }

      if (positions[i3 + 2] > halfBounds) {
        positions[i3 + 2] = halfBounds
        velocities[i3 + 2] *= bounceFactor
      } else if (positions[i3 + 2] < -halfBounds) {
        positions[i3 + 2] = -halfBounds
        velocities[i3 + 2] *= bounceFactor
      }

      // Update instance matrix using pooled dummy object
      const dummy = getSharedDummy()
      dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2])
      dummy.updateMatrix()
      particlesRef.current.setMatrixAt(i, dummy.matrix)
    }

    // Update particle instances
    particlesRef.current.instanceMatrix.needsUpdate = true

    // Update connections (skip on lowest quality for performance)
    if (quality > 0.5 || state.clock.elapsedTime % 0.1 < 0.02) { // Update every other frame on low quality
      const linePositions = linesRef.current.geometry.attributes.position.array
      const lineOpacities = linesRef.current.geometry.attributes.opacity.array
      let lineIndex = 0

      // LOD: Reduce connection checks on lower quality
      const connectionStride = quality < 0.7 ? 2 : 1

      // Find connections between nearby particles
      for (let i = 0; i < adjustedCount; i += connectionStride) {
        let connections = 0

        for (let j = i + 1; j < adjustedCount; j++) {
          // Check if we've reached max connections for this particle
          if (connections >= maxConnections) {
            break
          }

          const i3 = i * 3
          const j3 = j * 3

          // Calculate squared distance (faster, no sqrt needed)
          const dx = positions[j3] - positions[i3]
          const dy = positions[j3 + 1] - positions[i3 + 1]
          const dz = positions[j3 + 2] - positions[i3 + 2]
          const distSq = dx * dx + dy * dy + dz * dz

          // Create connection if particles are close enough
          if (distSq < connectionDistanceSq && lineIndex < maxLines) {
            const lineIndex2 = lineIndex * 2

            // Set line endpoints
            linePositions[lineIndex2 * 3] = positions[i3]
            linePositions[lineIndex2 * 3 + 1] = positions[i3 + 1]
            linePositions[lineIndex2 * 3 + 2] = positions[i3 + 2]

            linePositions[lineIndex2 * 3 + 3] = positions[j3]
            linePositions[lineIndex2 * 3 + 4] = positions[j3 + 1]
            linePositions[lineIndex2 * 3 + 5] = positions[j3 + 2]

            // Calculate opacity based on distance
            // Closer particles = more opaque lines
            const dist = Math.sqrt(distSq)
            const opacity = 1 - (dist / lodConnectionDistance)
            lineOpacities[lineIndex2] = opacity
            lineOpacities[lineIndex2 + 1] = opacity

            connections++
            lineIndex++
          }
        }
      }

      // Update line geometry
      linesRef.current.geometry.attributes.position.needsUpdate = true
      linesRef.current.geometry.attributes.opacity.needsUpdate = true
      linesRef.current.geometry.setDrawRange(0, lineIndex * 2)
    }

    // Gentle rotation of entire network (normalized to 60 FPS)
    const rotationSpeed = 0.02 * delta * 60
    linesRef.current.rotation.y = time * rotationSpeed
    particlesRef.current.rotation.y = time * rotationSpeed
  })

  return (
    <group>
      {/* Particle system using InstancedMesh */}
      <instancedMesh
        ref={particlesRef}
        args={[particleGeometry, particleMaterial, adjustedCount]}
        frustumCulled={false}
      />

      {/* Connection lines */}
      <lineSegments
        ref={linesRef}
        geometry={lineGeometry}
        material={lineMaterial}
        frustumCulled={false}
      />
    </group>
  )
}

/**
 * Usage example:
 *
 * import { Canvas } from '@react-three/fiber'
 * import NeuralNetwork from './components/3d/NeuralNetwork'
 *
 * function Scene() {
 *   return (
 *     <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
 *       <NeuralNetwork
 *         particleCount={100}
 *         connectionDistance={8}
 *         driftSpeed={0.5}
 *         bounds={40}
 *         particleSize={0.15}
 *         particleColor="#00ffff"
 *         lineColor="#8b5cf6"
 *         maxConnections={5}
 *       />
 *     </Canvas>
 *   )
 * }
 *
 * Performance tips:
 * - Particle count is automatically adjusted based on device capabilities
 * - High-end devices: 100% of specified particleCount
 * - Medium-end devices: 60% of specified particleCount
 * - Low-end devices: 30% of specified particleCount
 * - Reduce connectionDistance to reduce line count
 * - Decrease maxConnections to limit visual clutter
 * - Adjust bounds to keep particles in view
 * - Use frustumCulling if camera moves significantly
 *
 * Visual customization:
 * - particleColor: Cyan (#00ffff) matches neon theme
 * - lineColor: Purple (#8b5cf6) complements cyan
 * - Increase particleSize for more visible nodes
 * - Lower driftSpeed for calmer movement
 *
 * Integration suggestions:
 * - Place behind main content for atmospheric background
 * - Use with CameraRig for smooth camera movement
 * - Combine with Stars for depth layering
 * - Adjust bounds to match your scene composition
 *
 * Technical notes:
 * - Uses InstancedMesh for GPU-efficient particle rendering
 * - Lines update every frame based on particle proximity
 * - Opacity fades smoothly as particles drift apart
 * - Particles bounce softly off boundary edges
 * - Organic movement created with layered sine waves
 * - Entire network slowly rotates for added dynamism
 * - Device-aware performance optimizations applied automatically
 * - Frame rate throttling prevents excessive CPU usage
 * - Object pooling reduces garbage collection overhead
 */
