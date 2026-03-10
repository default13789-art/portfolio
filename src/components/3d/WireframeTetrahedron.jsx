import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * WireframeTetrahedron - An individual floating wireframe tetrahedron component
 *
 * Features:
 * - Tetrahedron geometry (4-sided pyramid/triangular pyramid)
 * - Wireframe with neon purple glow effect
 * - Tumbling rotation animation
 * - Gentle floating motion with sine wave bobbing
 * - Optimized geometry for performance
 * - Consistent API with other shape components
 *
 * Performance optimizations:
 * - Uses LineSegments for efficient wireframe rendering
 * - Minimal geometry (only 6 edges)
 * - GPU-accelerated transformations
 * - Lightweight material
 *
 * @param {Object} props - Component props
 * @param {number} props.size - Size/radius of the tetrahedron (default: 1)
 * @param {string} props.color - Wireframe color (default: purple)
 * @param {number} props.rotationSpeed - Base rotation speed multiplier (default: 1)
 * @param {number} props.floatSpeed - Speed of floating motion (default: 1)
 * @param {number} props.floatAmplitude - Height of floating motion (default: 0.3)
 * @param {number} props.floatOffset - Phase offset for floating (default: 0)
 * @param {Array} props.position - Starting position [x, y, z] (default: [0, 0, 0])
 * @param {Array} props.rotation - Starting rotation [x, y, z] (default: [0, 0, 0])
 */
export default function WireframeTetrahedron({
  size = 1,
  color = '#8b5cf6',
  rotationSpeed = 1,
  floatSpeed = 1,
  floatAmplitude = 0.3,
  floatOffset = 0,
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) {
  const meshRef = useRef()
  const initialY = useRef(position[1])

  // Create wireframe geometry using EdgesGeometry
  const geometry = useMemo(() => {
    // Create tetrahedron geometry
    // Radius determines the size of the tetrahedron
    const tetraGeometry = new THREE.TetrahedronGeometry(size, 0)

    // Create edges geometry from tetrahedron geometry
    const edgesGeometry = new THREE.EdgesGeometry(tetraGeometry)

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

      // Tumbling rotation with different axis speeds
      // Creates a more chaotic, interesting motion than the cube
      meshRef.current.rotation.x = rotation[0] + elapsedTime * 0.25 * rotationSpeed
      meshRef.current.rotation.y = rotation[1] + elapsedTime * 0.35 * rotationSpeed
      meshRef.current.rotation.z = rotation[2] + elapsedTime * 0.2 * rotationSpeed

      // Gentle floating motion with phase offset
      // Using cos instead of sin for different motion pattern
      meshRef.current.position.y = initialY.current +
        Math.cos(elapsedTime * floatSpeed + floatOffset) * floatAmplitude
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
 * <WireframeTetrahedron
 *   size={1.2}
 *   color="#8b5cf6"
 *   rotationSpeed={1.2}
 *   floatSpeed={0.7}
 *   floatAmplitude={0.25}
 *   floatOffset={Math.PI / 3}
 *   position={[-8, 3, -15]}
 *   rotation={[Math.PI / 6, 0, 0]}
 * />
 *
 * Performance tips:
 * - Tetrahedron is the most efficient shape (only 4 faces, 6 edges)
 * - Detail level 0 is optimal for wireframes
 * - LineBasicMaterial is very lightweight
 * - Perfect for adding visual interest without performance cost
 *
 * Design notes:
 * - The purple color (#8b5cf6) complements the cyan cube
 * - Tumbling motion creates more dynamic visual interest
 * - Float offset allows staggering multiple tetrahedrons
 */
