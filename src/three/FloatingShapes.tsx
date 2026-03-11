import { useMemo } from 'react'
import WireframeCube from './WireframeCube'
import WireframeTetrahedron from './WireframeTetrahedron'
import WireframeSphere from './WireframeSphere'
import { getParticleCount } from '../../utils/performance'

/**
 * FloatingShapes - Container component that manages multiple floating geometric shapes
 *
 * Features:
 * - Spawns multiple wireframe shapes randomly in 3D space
 * - Manages position, rotation, and floating animation for each shape
 * - Creates varied, visually interesting background elements
 * - Performance-optimized with configurable shape count
 * - Cubes, tetrahedrons, and spheres with neon glow effects
 * - Each shape has unique starting position, rotation, and animation parameters
 *
 * Performance optimizations:
 * - Device-aware shape count adjustment
 * - Reuses geometry instances across shapes
 * - LineSegments are GPU-efficient
 * - Balanced default shape count (15) for good performance
 * - Random distribution prevents visual clustering
 * - Optimized segment counts for all shapes
 * - Automatic LOD based on device capabilities
 *
 * @param {Object} props - Component props
 * @param {number} props.count - Total number of shapes to spawn (default: 15)
 * @param {number} props.spreadX - Horizontal spread area (default: 60)
 * @param {number} props.spreadY - Vertical spread area (default: 30)
 * @param {number} props.spreadZ - Depth spread area (default: 60)
 * @param {number} props.minDistance - Minimum distance from center (default: 10)
 * @param {number} props.animationSpeed - Global animation speed multiplier (default: 1)
 * @param {boolean} props.enableCubes - Include cubes in the mix (default: true)
 * @param {boolean} props.enableTetrahedrons - Include tetrahedrons (default: true)
 * @param {boolean} props.enableSpheres - Include spheres (default: true)
 */
export default function FloatingShapes({
  count = 15,
  spreadX = 60,
  spreadY = 30,
  spreadZ = 60,
  minDistance = 10,
  animationSpeed = 1,
  enableCubes = true,
  enableTetrahedrons = true,
  enableSpheres = true
}) {
  // Get adjusted shape count based on device capabilities
  const adjustedCount = useMemo(() => getParticleCount(count), [count])
  // Generate shape configurations once on mount
  const shapes = useMemo(() => {
    const availableTypes = []
    if (enableCubes) availableTypes.push('cube')
    if (enableTetrahedrons) availableTypes.push('tetrahedron')
    if (enableSpheres) availableTypes.push('sphere')

    // If no types are enabled, default to cubes
    if (availableTypes.length === 0) {
      availableTypes.push('cube')
    }

    const generatedShapes = []

    for (let i = 0; i < adjustedCount; i++) {
      // Randomly select shape type
      const type = availableTypes[Math.floor(Math.random() * availableTypes.length)]

      // Generate random position within spread area
      // Use rejection sampling to ensure minimum distance from center
      let position
      let attempts = 0
      do {
        position = [
          (Math.random() - 0.5) * spreadX,
          (Math.random() - 0.5) * spreadY,
          (Math.random() - 0.5) * spreadZ
        ]
        attempts++
      } while (
        Math.sqrt(position[0] ** 2 + position[1] ** 2 + position[2] ** 2) < minDistance &&
        attempts < 10
      )

      // Random starting rotation
      const rotation = [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ]

      // Random size with some variation
      const size = 0.8 + Math.random() * 1.2

      // Random rotation speed (varies per shape for interest)
      const rotationSpeed = 0.5 + Math.random() * 1.5

      // Random float speed and amplitude
      const floatSpeed = 0.5 + Math.random() * 1.0
      const floatAmplitude = 0.2 + Math.random() * 0.4
      const floatOffset = Math.random() * Math.PI * 2

      generatedShapes.push({
        type,
        position,
        rotation,
        size,
        rotationSpeed,
        floatSpeed,
        floatAmplitude,
        floatOffset
      })
    }

    return generatedShapes
  }, [adjustedCount, spreadX, spreadY, spreadZ, minDistance, enableCubes, enableTetrahedrons, enableSpheres])

  // Render all shapes
  return (
    <group>
      {shapes.map((shape, index) => {
        const commonProps = {
          key: `shape-${index}`,
          position: shape.position,
          rotation: shape.rotation,
          size: shape.size,
          rotationSpeed: shape.rotationSpeed * animationSpeed,
          floatSpeed: shape.floatSpeed * animationSpeed,
          floatAmplitude: shape.floatAmplitude,
          floatOffset: shape.floatOffset
        }

        // Render appropriate shape component
        switch (shape.type) {
          case 'cube':
            return <WireframeCube {...commonProps} />

          case 'tetrahedron':
            return <WireframeTetrahedron {...commonProps} />

          case 'sphere':
            return <WireframeSphere {...commonProps} />

          default:
            return null
        }
      })}
    </group>
  )
}

/**
 * Usage example:
 *
 * <FloatingShapes
 *   count={15}
 *   spreadX={60}
 *   spreadY={30}
 *   spreadZ={60}
 *   minDistance={10}
 *   animationSpeed={1}
 *   enableCubes={true}
 *   enableTetrahedrons={true}
 *   enableSpheres={true}
 * />
 *
 * Performance tips:
 * - Reduce 'count' for better performance (try 8-10 on slower devices)
 * - Reduce 'spread' areas to keep shapes closer to camera
 * - Disable shape types you don't need
 * - Lower 'animationSpeed' to reduce movement computation
 *
 * Design tips:
 * - Shapes spawn outside minDistance to avoid blocking center content
 * - Random sizes create visual depth and interest
 * - Varied rotation/float speeds prevent synchronized movement
 * - Spread areas can be adjusted for different scene compositions
 * - Try increasing count to 20-25 for denser backgrounds
 *
 * Integration example:
 *
 * import { Canvas } from '@react-three/fiber'
 * import FloatingShapes from './three/FloatingShapes'
 *
 * function App() {
 *   return (
 *     <Canvas camera={{ position: [0, 0, 20] }}>
 *       <FloatingShapes count={15} />
 *       {/* Your other 3D components *\/}
 *     </Canvas>
 *   )
 * }
 */
