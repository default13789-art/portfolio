import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useFrameThrottle, usePerformanceMonitor, getPerformanceConfig } from '../../utils/performance'

/**
 * NeonGrid component - An infinite wireframe grid with neon glow effects
 *
 * Features:
 * - Infinite wireframe grid extending to the horizon
 * - Neon glowing grid lines with cyan/purple theme colors
 * - Distance-based fog effect for natural fading
 * - Gentle wave/undulating animation
 * - Mouse-reactive parallax and distortion
 * - Performance-optimized geometry
 *
 * Performance optimizations:
 * - Device-aware segment count adjustment
 * - Efficient BufferGeometry with reasonable segment count
 * - GPU-based vertex shader for wave animation
 * - Custom shader material for distance fading
 * - Optimized draw calls
 * - Frame rate throttling
 * - Adaptive quality based on FPS
 * - Conditional features based on device tier
 *
 * @param {Object} props - Component props
 * @param {string} props.color - Primary grid color (hex or name)
 * @param {string} props.secondaryColor - Secondary accent color for depth
 * @param {number} props.size - Grid size in world units
 * @param {number} props.segments - Number of grid segments (lower = better performance)
 * @param {number} props.positionY - Y position of the grid floor
 * @param {number} props.waveSpeed - Speed of wave animation
 * @param {number} props.waveHeight - Height/intensity of wave distortion
 * @param {number} props.mouseInfluence - How much mouse affects grid (0-1)
 * @param {number} props.fadeDistance - Distance at which grid starts fading
 * @param {number} props.fadeLength - Length of fade transition zone
 */
export default function NeonGrid({
  color = '#00ffff', // Cyan primary color
  secondaryColor = '#8b5cf6', // Purple secondary color
  size = 200,
  segments = 80,
  positionY = -5,
  waveSpeed = 0.5,
  waveHeight = 0.3,
  mouseInfluence = 0.15,
  fadeDistance = 60,
  fadeLength = 80
}) {
  const meshRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })
  const { camera } = useThree() // Used in shader for camera position

  // Performance optimization hooks
  const { checkUpdate, getDelta } = useFrameThrottle()
  const { updateFPS, getQuality } = usePerformanceMonitor()

  // Get device performance configuration
  const perfConfig = useMemo(() => getPerformanceConfig(), [])

  // Adjust segments based on device capabilities
  const adjustedSegments = useMemo(() => {
    const multiplier = perfConfig.particleMultiplier
    return Math.max(20, Math.floor(segments * multiplier))
  }, [segments, perfConfig.particleMultiplier])

  // Reduce wave height on lower-end devices
  const adjustedWaveHeight = useMemo(() => {
    return waveHeight * getQuality()
  }, [waveHeight])

  // Disable mouse interaction on low-end devices
  const adjustedMouseInfluence = useMemo(() => {
    return perfConfig.particleMultiplier < 0.5 ? 0 : mouseInfluence
  }, [mouseInfluence, perfConfig.particleMultiplier])

  // Track mouse position for interactive effects
  useEffect(() => {
    if (adjustedMouseInfluence === 0) return // Skip if mouse interaction is disabled

    const handleMouseMove = (event) => {
      // Normalize to -1 to 1 range
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [adjustedMouseInfluence])

  // Create custom shader material for wave animation and distance fading
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uSecondaryColor: { value: new THREE.Color(secondaryColor) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uFadeDistance: { value: fadeDistance },
        uFadeLength: { value: fadeLength },
        uWaveHeight: { value: adjustedWaveHeight },
        uMouseInfluence: { value: adjustedMouseInfluence }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uWaveHeight;
        uniform float uMouseInfluence;

        varying float vDistance;
        varying float vElevation;
        varying vec2 vUv;

        void main() {
          vUv = uv;

          vec3 pos = position;

          // Create wave animation with multiple frequencies
          float wave1 = sin(pos.x * 0.05 + uTime) * cos(pos.z * 0.03 + uTime * 0.7);
          float wave2 = sin(pos.x * 0.08 - uTime * 0.5) * sin(pos.z * 0.06 + uTime * 0.3);
          float combinedWave = (wave1 + wave2) * 0.5;

          // Add mouse influence to wave
          float mouseDist = distance(uv, uMouse * 0.5 + 0.5);
          float mouseEffect = smoothstep(0.5, 0.0, mouseDist) * uMouseInfluence;
          combinedWave += mouseEffect * sin(uTime * 2.0) * 2.0;

          // Apply wave to Y position
          pos.y += combinedWave * uWaveHeight;
          vElevation = combinedWave;

          // Calculate distance from camera for fog effect
          vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
          vDistance = length(worldPosition.xyz - cameraPosition);

          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uSecondaryColor;
        uniform float uFadeDistance;
        uniform float uFadeLength;

        varying float vDistance;
        varying float vElevation;
        varying vec2 vUv;

        void main() {
          // Create grid pattern
          float gridX = step(0.98, fract(vUv.x * 80.0));
          float gridY = step(0.98, fract(vUv.y * 80.0));
          float grid = max(gridX, gridY);

          // Discard fragments not on grid lines
          if (grid < 0.5) discard;

          // Distance-based fog effect
          float fogFactor = smoothstep(
            uFadeDistance,
            uFadeDistance + uFadeLength,
            vDistance
          );

          // Mix colors based on elevation for depth effect
          vec3 finalColor = mix(uColor, uSecondaryColor, (vElevation + 1.0) * 0.5);

          // Apply fog (fade to background color)
          vec3 fogColor = vec3(0.02, 0.02, 0.06); // Dark blue-gray background
          finalColor = mix(finalColor, fogColor, fogFactor);

          // Add glow effect based on distance
          float glow = 1.0 - fogFactor;
          finalColor *= glow * 1.5;

          // Add subtle pulsing glow
          float pulse = sin(vDistance * 0.1) * 0.1 + 0.9;
          finalColor *= pulse;

          gl_FragColor = vec4(finalColor, glow * 0.8);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  }, [color, secondaryColor, fadeDistance, fadeLength, adjustedWaveHeight, adjustedMouseInfluence])

  // Create optimized plane geometry
  const geometry = useMemo(() => {
    // Create a plane with proper segment count for performance
    const geo = new THREE.PlaneGeometry(size, size, adjustedSegments, adjustedSegments)

    // Rotate to be flat on the ground
    geo.rotateX(-Math.PI / 2)

    return geo
  }, [size, adjustedSegments])

  // Animation loop with performance optimizations
  useFrame(({ clock }) => {
    updateFPS() // Monitor performance

    const time = clock.getElapsedTime()

    // Check if we should update this frame (throttling)
    if (!checkUpdate(time * 1000)) {
      return
    }

    if (meshRef.current) {
      const material = meshRef.current.material
      const delta = getDelta()

      // Update time uniform for wave animation (normalized to 60 FPS)
      material.uniforms.uTime.value = time * waveSpeed * delta * 60

      // Update mouse uniform with smooth interpolation (only if enabled)
      if (adjustedMouseInfluence > 0) {
        const targetMouseX = mouseRef.current.x
        const targetMouseY = mouseRef.current.y
        material.uniforms.uMouse.value.x += (targetMouseX - material.uniforms.uMouse.value.x) * 0.05
        material.uniforms.uMouse.value.y += (targetMouseY - material.uniforms.uMouse.value.y) * 0.05

        // Subtle parallax effect based on mouse position
        meshRef.current.position.x = THREE.MathUtils.lerp(
          meshRef.current.position.x,
          mouseRef.current.x * 2,
          0.02
        )
        meshRef.current.position.z = THREE.MathUtils.lerp(
          meshRef.current.position.z,
          mouseRef.current.y * 2,
          0.02
        )
      }
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={shaderMaterial}
      position={[0, positionY, 0]}
    />
  )
}

/**
 * Usage example:
 *
 * <NeonGrid
 *   color="#00ffff"
 *   secondaryColor="#8b5cf6"
 *   size={200}
 *   segments={80}
 *   positionY={-5}
 *   waveSpeed={0.5}
 *   waveHeight={0.3}
 *   mouseInfluence={0.15}
 *   fadeDistance={60}
 *   fadeLength={80}
 * />
 *
 * Performance tips:
 * - Reduce 'segments' prop for better performance (try 40-60 on slower devices)
 * - Reduce 'size' if you don't need the grid to extend as far
 * - Set 'waveHeight' to 0 to disable wave animation
 * - Set 'mouseInfluence' to 0 to disable mouse interaction
 */
