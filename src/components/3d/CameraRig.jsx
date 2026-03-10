import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector2 } from 'three'

/**
 * CameraRig component - Handles subtle camera movements
 * Features:
 * - Gentle auto-rotation
 * - Mouse-following parallax effect
 * - Smooth damping for natural feel
 * - Configurable intensity
 */
export default function CameraRig({
  rotationIntensity = 0.2,
  mouseIntensity = 0.5,
  smoothness = 0.1
}) {
  const { camera } = useThree()
  const mouseRef = useRef(new Vector2())
  const targetRotationRef = useRef({ x: 0, y: 0 })
  const currentRotationRef = useRef({ x: 0, y: 0 })

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position to -1 to 1 range
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Smooth camera movement with damping
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Calculate target rotation based on mouse position + auto-rotation
    targetRotationRef.current.x = mouseRef.current.y * mouseIntensity +
                                 Math.sin(time * 0.1) * rotationIntensity * 0.3
    targetRotationRef.current.y = mouseRef.current.x * mouseIntensity +
                                 time * rotationIntensity * 0.1

    // Smoothly interpolate current rotation to target (damping)
    currentRotationRef.current.x +=
      (targetRotationRef.current.x - currentRotationRef.current.x) * smoothness
    currentRotationRef.current.y +=
      (targetRotationRef.current.y - currentRotationRef.current.y) * smoothness

    // Apply rotation to camera
    camera.rotation.x = currentRotationRef.current.x
    camera.rotation.y = currentRotationRef.current.y
  })

  return null
}
