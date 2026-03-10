import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────
   Planet data – tuned for visual appeal, not strict scale
   radius  : visual sphere radius
   distance: orbital radius from Sun
   speed   : orbital speed (rad/s at 60 fps)
   tilt    : axial tilt (radians)
   color   : base albedo hex
   emissive: subtle self-glow
───────────────────────────────────────────────────────── */
const PLANETS = [
  {
    name: 'Mercury',
    radius: 0.22,
    distance: 5.5,
    speed: 1.60,
    tilt: 0.03,
    color: '#a0a0a0',
    emissive: '#1a1a1a',
    roughness: 0.9,
  },
  {
    name: 'Venus',
    radius: 0.55,
    distance: 7.5,
    speed: 1.17,
    tilt: 0.05,
    color: '#f5e6a3',
    emissive: '#2a2000',
    roughness: 0.7,
  },
  {
    name: 'Earth',
    radius: 0.58,
    distance: 10.0,
    speed: 1.00,
    tilt: 0.41,
    color: '#2a5f8e',
    emissive: '#051005',
    roughness: 0.6,
    hasMoon: true,
  },
  {
    name: 'Mars',
    radius: 0.38,
    distance: 13.0,
    speed: 0.80,
    tilt: 0.44,
    color: '#c1440e',
    emissive: '#150400',
    roughness: 0.9,
  },
  {
    name: 'Jupiter',
    radius: 1.35,
    distance: 18.5,
    speed: 0.43,
    tilt: 0.05,
    color: '#c88b3a',
    emissive: '#150700',
    roughness: 0.5,
    bands: true,
  },
  {
    name: 'Saturn',
    radius: 1.10,
    distance: 24.5,
    speed: 0.32,
    tilt: 0.47,
    color: '#ead6a6',
    emissive: '#151000',
    roughness: 0.5,
    hasRings: true,
  },
  {
    name: 'Uranus',
    radius: 0.80,
    distance: 30.0,
    speed: 0.22,
    tilt: 1.71, // nearly on its side
    color: '#b5e3e3',
    emissive: '#001515',
    roughness: 0.4,
  },
  {
    name: 'Neptune',
    radius: 0.75,
    distance: 35.5,
    speed: 0.18,
    tilt: 0.49,
    color: '#2a4090',
    emissive: '#000515',
    roughness: 0.4,
  },
]

/* ─────────────────────────────────────────────────────────
   Orbital path ring (line loop)
───────────────────────────────────────────────────────── */
function OrbitPath({ radius }) {
  const geometry = useMemo(() => {
    const pts = []
    const segs = 128
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    return geo
  }, [radius])

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#ffffff" opacity={0.07} transparent depthWrite={false} />
    </line>
  )
}

/* ─────────────────────────────────────────────────────────
   Saturn-style rings (flat torus mesh)
───────────────────────────────────────────────────────── */
function PlanetRings({ radius }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius * 1.35, radius * 2.4, 64]} />
      <meshBasicMaterial
        color="#c8a96e"
        side={THREE.DoubleSide}
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ─────────────────────────────────────────────────────────
   Moon orbiting Earth
───────────────────────────────────────────────────────── */
function Moon({ earthRef }) {
  const moonRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (moonRef.current) {
      moonRef.current.position.set(
        Math.cos(t * 3.5) * 1.1,
        0,
        Math.sin(t * 3.5) * 1.1
      )
    }
  })
  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color="#d0d0d0" roughness={1} metalness={0} />
    </mesh>
  )
}

/* ─────────────────────────────────────────────────────────
   Individual planet + its orbit pivot
───────────────────────────────────────────────────────── */
function Planet({ data, initialAngle }) {
  const pivotRef = useRef()
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (pivotRef.current) {
      pivotRef.current.rotation.y = initialAngle + t * data.speed * 0.15
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * data.speed * 0.8 // self-rotation
    }
  })

  return (
    <group ref={pivotRef}>
      {/* Planet mesh at distance from center */}
      <group position={[data.distance, 0, 0]} rotation={[0, 0, data.tilt]}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <sphereGeometry args={[data.radius, 40, 40]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.emissive}
            roughness={data.roughness}
            metalness={0.05}
          />
        </mesh>

        {/* Saturn's rings */}
        {data.hasRings && <PlanetRings radius={data.radius} />}

        {/* Earth's moon */}
        {data.hasMoon && <Moon />}

        {/* Subtle atmosphere glow (point light per planet) */}
        <pointLight color={data.color} intensity={0.3} distance={data.radius * 8} decay={2} />
      </group>
    </group>
  )
}

/* ─────────────────────────────────────────────────────────
   The Sun (glowing sphere at origin)
───────────────────────────────────────────────────────── */
function Sun() {
  const sunRef = useRef()
  const glowRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (sunRef.current) {
      sunRef.current.rotation.y = t * 0.04
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 1.2) * 0.03
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group>
      {/* Core */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffcc00"
          emissiveIntensity={1.5}
          roughness={0.4}
          metalness={0}
        />
      </mesh>

      {/* Soft outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Second halo layer */}
      <mesh>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Main sun point light */}
      <pointLight color="#ffffff" intensity={3.5} distance={120} decay={1.2} castShadow />
      {/* Warm fill light */}
      <pointLight color="#ffcc00" intensity={0.6} distance={80} decay={2} />
    </group>
  )
}

/* ─────────────────────────────────────────────────────────
   Asteroid belt (dense ring between Mars & Jupiter)
───────────────────────────────────────────────────────── */
function AsteroidBelt() {
  const meshRef = useRef()
  const count = 600

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 15.5 + Math.random() * 2.0
      const yJitter = (Math.random() - 0.5) * 0.4
      pos[i * 3]     = Math.cos(angle) * r
      pos[i * 3 + 1] = yJitter
      pos[i * 3 + 2] = Math.sin(angle) * r
      sz[i] = Math.random()
    }
    return [pos, sz]
  }, [])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.012
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#8a7a6a"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─────────────────────────────────────────────────────────
   Root SolarSystem component
───────────────────────────────────────────────────────── */
export default function SolarSystem() {
  // Spread planets evenly around the orbit at startup
  const initialAngles = useMemo(
    () => PLANETS.map((_, i) => (i / PLANETS.length) * Math.PI * 2),
    []
  )

  return (
    <group>
      {/* Ambient fill so dark sides aren't pitch black */}
      <ambientLight intensity={0.04} />

      {/* The Sun */}
      <Sun />

      {/* Orbital guide lines */}
      {PLANETS.map((p) => (
        <OrbitPath key={`orbit-${p.name}`} radius={p.distance} />
      ))}

      {/* Asteroid belt */}
      <AsteroidBelt />

      {/* Planets */}
      {PLANETS.map((p, i) => (
        <Planet key={p.name} data={p} initialAngle={initialAngles[i]} />
      ))}
    </group>
  )
}
