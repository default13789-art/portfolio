import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * WireframeSphere - An individual floating wireframe sphere component
 *
 * Features:
 * - Sphere geometry with wireframe rendering
 * - Neon cyan/purple glow effect
 * - Smooth rotation on Y axis (like a spinning globe)
 * - Gentle floating motion with sine wave bobbing
 * - Optimized segment count for performance
 * - Consistent API with other shape components
 *
 * Performance optimizations:
 * - Balanced segment count (16x16) for good quality/performance
 * - Uses LineSegments for efficient wireframe rendering
 * - GPU-accelerated transformations
 * - Lightweight material
 *
 * @param {Object} props - Component props
 * @param {number} props.size - Radius of the sphere (default: 1)
 * @param {string} props.color - Wireframe color (default: cyan)
 * @param {number} props.rotationSpeed - Rotation speed multiplier (default: 1)
 * @param {number} props.floatSpeed - Speed of floating motion (default: 1)
 * @param {number} props.floatAmplitude - Height of floating motion (default: 0.3)
 * @param {number} props.floatOffset - Phase offset for floating (default: 0)
 * @param {Array} props.position - Starting position [x, y, z] (default: [0, 0, 0])
 * @param {number} props.segments - Number of segments (default: 16, lower = better performance)
 */
export default function WireframeSphere({
  size = 1,
  color = '#00d4ff',
  rotationSpeed = 1,
  floatSpeed = 1,
  floatAmplitude = 0.3,
  floatOffset = 0,
  position = [0, 0, 0],
  segments = 16
}) {
  const meshRef = useRef()
  const initialY = useRef(position[1])

  // Create wireframe geometry using EdgesGeometry
  const geometry = useMemo(() => {
    // Create sphere geometry
    // Width segments and height segments control wireframe density
    // 16x16 provides good quality while maintaining performance
    const sphereGeometry = new THREE.SphereGeometry(
      size,
      segments,
      segments
    )

    // Create edges geometry from sphere geometry
    const edgesGeometry = new THREE.EdgesGeometry(sphereGeometry)

    return edgesGeometry
  }, [size, segments])

  // Create line material with neon glow effect
  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.7,
      linewidth: 1
    })
  }, [color])

  // Animation loop - runs every frame at 60fps
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const elapsedTime = clock.getElapsedTime()

      // Rotation primarily on Y axis (like a spinning globe)
      // Slight wobble on X and Z for more natural movement
      meshRef.current.rotation.y = elapsedTime * 0.3 * rotationSpeed
      meshRef.current.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1
      meshRef.current.rotation.z = Math.cos(elapsedTime * 0.1) * 0.1

      // Gentle floating motion with phase offset
      // Different phase creates varied movement between shapes
      meshRef.current.position.y = initialY.current +
        Math.sin(elapsedTime * floatSpeed + floatOffset) * floatAmplitude
    }
  })

  return (
    <lineSegments
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
    />
  )
}

/**
 * Usage example:
 *
 * <WireframeSphere
 *   size={1.3}
 *   color="#00d4ff"
 *   rotationSpeed={0.8}
 *   floatSpeed={0.6}
 *   floatAmplitude={0.35}
 *   floatOffset={Math.PI / 2}
 *   position={[0, 4, -12]}
 *   segments={16}
 * />
 *
 * Performance tips:
 * - Default segments (16) is optimal for most cases
 * - Reduce to 12 for better performance on slower devices
 * - Increase to 24 for higher quality on faster devices
 * - Spheres have more edges than cubes/tetrahedrons, so use fewer
 *
 * Design notes:
 * - Color (#00d4ff) is a slightly lighter cyan for variety
 * - Y-axis rotation creates a spinning globe effect
 * - Gentle wobble on X/Z makes movement more organic
 * - Float offset prevents all shapes from moving in sync
 */
