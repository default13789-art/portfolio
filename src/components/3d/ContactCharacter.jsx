import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * ContactCharacter - A cute robot messenger character for the contact form
 *
 * Features:
 * - Procedural robot with floating animation
 * - Reactive eyes that follow mouse movement
 * - Neon cyan and purple theme matching the portfolio
 * - Gentle bobbing and rotation animations
 * - Holding a message envelope prop
 * - Wave animation on hover
 *
 * Performance optimizations:
 * - Simple geometries for fast rendering
 * - Minimal state updates
 * - Optimized animation loop
 * - Reusable materials
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isHovered - Whether form is being interacted with
 * @param {boolean} props.isSubmitting - Whether form is submitting
 * @param {boolean} props.isSuccess - Whether submission was successful
 */
export default function ContactCharacter({ isHovered = false, isSubmitting = false, isSuccess = false }) {
  const groupRef = useRef()
  const headRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const envelopeRef = useRef()

  // Memoize materials for performance
  const materials = useMemo(() => {
    return {
      body: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#3ce6f9'),
        metalness: 0.3,
        roughness: 0.4,
        emissive: new THREE.Color('#3ce6f9'),
        emissiveIntensity: 0.2
      }),
      accent: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#a855f7'),
        metalness: 0.5,
        roughness: 0.3,
        emissive: new THREE.Color('#a855f7'),
        emissiveIntensity: 0.3
      }),
      white: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        metalness: 0.1,
        roughness: 0.5
      }),
      eye: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00ffff'),
        emissive: new THREE.Color('#00ffff'),
        emissiveIntensity: 0.8
      }),
      envelope: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#fbbf24'),
        metalness: 0.2,
        roughness: 0.6
      })
    }
  }, [])

  // Animation loop
  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()
    const mouse = state.mouse

    // Gentle floating animation
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.1

    // Body rotation based on mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.3,
      0.05
    )

    // Head follows mouse more actively
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mouse.x * 0.5,
        0.08
      )
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -mouse.y * 0.3,
        0.08
      )
    }

    // Arm animations
    if (leftArmRef.current) {
      // Wave animation when hovered
      const waveAngle = isHovered ? Math.sin(time * 4) * 0.4 + 0.5 : 0.2
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.z,
        waveAngle,
        0.1
      )
    }

    if (rightArmRef.current) {
      // Hold envelope steady or raise it when submitting
      const raiseAngle = isSubmitting ? -1.5 : -0.3
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.z,
        raiseAngle,
        0.1
      )
    }

    // Envelope animation - bounces when submitting
    if (envelopeRef.current && isSubmitting) {
      envelopeRef.current.position.y = Math.sin(time * 10) * 0.05
      envelopeRef.current.rotation.z = Math.sin(time * 8) * 0.1
    } else if (envelopeRef.current) {
      envelopeRef.current.position.y = 0
      envelopeRef.current.rotation.z = 0
    }

    // Success celebration - spin and jump
    if (isSuccess && groupRef.current) {
      groupRef.current.position.y = Math.abs(Math.sin(time * 3)) * 0.3
      groupRef.current.rotation.y += 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={0.8}>
      {/* Shadow */}
      <mesh position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial
          color={new THREE.Color('#000000')}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Body - rounded rectangle */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.7, 0.5]} />
        {materials.body}
      </mesh>

      {/* Rounded corners for body */}
      <mesh position={[0.25, 0.3, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        {materials.body}
      </mesh>
      <mesh position={[-0.25, 0.3, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        {materials.body}
      </mesh>
      <mesh position={[0.25, -0.3, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        {materials.body}
      </mesh>
      <mesh position={[-0.25, -0.3, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        {materials.body}
      </mesh>

      {/* Chest display/panel */}
      <mesh position={[0, 0.1, 0.26]}>
        <boxGeometry args={[0.3, 0.3, 0.05]} />
        {materials.accent}
      </mesh>

      {/* Chest screen glow */}
      <mesh position={[0, 0.1, 0.29]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshBasicMaterial
          color={new THREE.Color('#00ffff')}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Head group */}
      <group ref={headRef} position={[0, 0.6, 0]}>
        {/* Head - rounded rectangle */}
        <mesh>
          <boxGeometry args={[0.5, 0.45, 0.45]} />
          {materials.body}
        </mesh>

        {/* Head rounded corners */}
        <mesh position={[0.2, 0.2, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          {materials.body}
        </mesh>
        <mesh position={[-0.2, 0.2, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          {materials.body}
        </mesh>
        <mesh position={[0.2, -0.2, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          {materials.body}
        </mesh>
        <mesh position={[-0.2, -0.2, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          {materials.body}
        </mesh>

        {/* Face plate */}
        <mesh position={[0, 0, 0.23]}>
          <boxGeometry args={[0.35, 0.3, 0.05]} />
          {materials.white}
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.1, 0.05, 0.26]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          {materials.eye}
        </mesh>
        <mesh position={[0.1, 0.05, 0.26]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          {materials.eye}
        </mesh>

        {/* Eye highlights */}
        <mesh position={[-0.08, 0.07, 0.32]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          {materials.white}
        </mesh>
        <mesh position={[0.12, 0.07, 0.32]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          {materials.white}
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15]} />
          {materials.accent}
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color={new THREE.Color('#ff4444')}
            emissive={new THREE.Color('#ff4444')}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Left arm - for waving */}
      <group ref={leftArmRef} position={[-0.4, 0.1, 0]}>
        {/* Shoulder */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          {materials.accent}
        </mesh>
        {/* Arm */}
        <mesh position={[-0.15, 0, 0]}>
          <boxGeometry args={[0.3, 0.12, 0.12]} />
          {materials.body}
        </mesh>
        {/* Hand */}
        <mesh position={[-0.32, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          {materials.white}
        </mesh>
      </group>

      {/* Right arm - holding envelope */}
      <group ref={rightArmRef} position={[0.4, 0.1, 0]}>
        {/* Shoulder */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          {materials.accent}
        </mesh>
        {/* Arm */}
        <mesh position={[0.15, 0, 0]}>
          <boxGeometry args={[0.3, 0.12, 0.12]} />
          {materials.body}
        </mesh>
        {/* Hand with envelope */}
        <group position={[0.32, 0, 0]} ref={envelopeRef}>
          {/* Envelope */}
          <mesh>
            <boxGeometry args={[0.2, 0.14, 0.02]} />
            {materials.envelope}
          </mesh>
          {/* Envelope flap */}
          <mesh position={[0, 0.04, 0.01]} rotation={[0.3, 0, 0]}>
            <planeGeometry args={[0.18, 0.1]} />
            <meshStandardMaterial
              color={new THREE.Color('#f59e0b')}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>

      {/* Hover ring effect when form is interacted with */}
      {isHovered && (
        <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.65, 32]} />
          <meshBasicMaterial
            color={new THREE.Color('#3ce6f9')}
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  )
}

/**
 * Usage example:
 *
 * import { Canvas } from '@react-three/fiber'
 * import ContactCharacter from './components/3d/ContactCharacter'
 *
 * function ContactForm3D() {
 *   const [isHovered, setIsHovered] = useState(false)
 *   const [isSubmitting, setIsSubmitting] = useState(false)
 *   const [isSuccess, setIsSuccess] = useState(false)
 *
 *   return (
 *     <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
 *       <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
 *         <ambientLight intensity={0.5} />
 *         <directionalLight position={[5, 5, 5]} intensity={0.8} />
 *         <pointLight position={[0, 2, 2]} intensity={0.5} color="#3ce6f9" />
 *         <ContactCharacter
 *           isHovered={isHovered}
 *           isSubmitting={isSubmitting}
 *           isSuccess={isSuccess}
 *         />
 *       </Canvas>
 *       {/* Contact form overlay *\/}
 *     </div>
 *   )
 * }
 */
