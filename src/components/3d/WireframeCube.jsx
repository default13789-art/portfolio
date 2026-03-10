import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * WireframeCube - An individual floating wireframe cube component
 *
 * Features:
 * - Wireframe geometry using LineSegments for clean edges
 * - Neon cyan glow effect matching portfolio theme
 * - Smooth rotation on multiple axes
 * - Gentle floating motion with sine wave bobbing
 * - Optimized geometry for performance
 * - Fully customizable size, colors, and animation speeds
 *
 * Performance optimizations:
 * - Uses LineSegments instead of full mesh
 * - Efficient geometry with reasonable segment count
 * - GPU-accelerated transformations
 * - Minimal draw calls
 *
 * @param {Object} props - Component props
 * @param {number} props.size - Size of the cube (default: 1)
 * @param {string} props.color - Wireframe color (default: cyan)
 * @param {number} props.rotationSpeed - Base rotation speed multiplier (default: 1)
 * @param {number} props.floatSpeed - Speed of floating motion (default: 1)
 * @param {number} props.floatAmplitude - Height of floating motion (default: 0.3)
 * @param {Array} props.position - Starting position [x, y, z] (default: [0, 0, 0])
 * @param {Array} props.rotation - Starting rotation [x, y, z] (default: [0, 0, 0])
 */
export default function WireframeCube({
  size = 1,
  color = '#00ffff',
  rotationSpeed = 1,
  floatSpeed = 1,
  floatAmplitude = 0.3,
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) {
  const meshRef = useRef()
  const initialY = useRef(position[1])

  // Create wireframe geometry using EdgesGeometry for clean edges
  const geometry = useMemo(() => {
    // Create box geometry
    const boxGeometry = new THREE.BoxGeometry(size, size, size, 1, 1, 1)

    // Create edges geometry from box geometry
    const edgesGeometry = new THREE.EdgesGeometry(boxGeometry)

    return edgesGeometry
  }, [size])

  // Create line material with neon glow effect
  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.8,
      linewidth: 1
    })
  }, [color])

  // Animation loop - runs every frame at 60fps
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const elapsedTime = clock.getElapsedTime()

      // Rotation on multiple axes for tumbling effect
      // Different speeds for each axis create more natural movement
      meshRef.current.rotation.x = rotation[0] + elapsedTime * 0.2 * rotationSpeed
      meshRef.current.rotation.y = rotation[1] + elapsedTime * 0.3 * rotationSpeed
      meshRef.current.rotation.z = rotation[2] + elapsedTime * 0.15 * rotationSpeed

      // Gentle floating motion using sine wave
      // Creates smooth bobbing up and down
      meshRef.current.position.y = initialY.current +
        Math.sin(elapsedTime * floatSpeed) * floatAmplitude
    }
  })

  return (
    <lineSegments
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
    />
  )
}

/**
 * Usage example:
 *
 * <WireframeCube
 *   size={1.5}
 *   color="#00ffff"
 *   rotationSpeed={1}
 *   floatSpeed={0.8}
 *   floatAmplitude={0.3}
 *   position={[5, 2, -10]}
 *   rotation={[0, Math.PI / 4, 0]}
 * />
 *
 * Performance tips:
 * - Default segment count (1, 1, 1) is optimal for wireframes
 * - LineSegments are very efficient, requiring only 12 lines
 * - Material uses LineBasicMaterial which is GPU-optimized
 * - Animation updates are minimal (rotation + position.y only)
 */
