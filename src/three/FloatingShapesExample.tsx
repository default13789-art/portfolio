import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import FloatingShapes from './FloatingShapes'

/**
 * FloatingShapesExample - Demo component showing how to use the floating shapes
 *
 * This example demonstrates the FloatingShapes component with various configurations.
 * You can use this as a reference for integrating the shapes into your portfolio.
 */
export default function FloatingShapesExample() {
  return (
    <Canvas
      camera={{ position: [0, 5, 30], fov: 50 }}
      style={{ background: '#050510' }}
    >
      {/* Ambient light for subtle overall illumination */}
      <ambientLight intensity={0.3} />

      {/* Optional: Add other 3D components here */}
      {/* <NeonGrid positionY={-8} /> */}
      {/* <Stars count={500} /> */}

      {/* Floating shapes - the main attraction */}
      <FloatingShapes
        count={15}
        spreadX={60}
        spreadY={30}
        spreadZ={60}
        minDistance={10}
        animationSpeed={1}
        enableCubes={true}
        enableTetrahedrons={true}
        enableSpheres={true}
      />

      {/* Camera controls for debugging/development */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
      />
    </Canvas>
  )
}

/**
 * Usage in your portfolio:
 *
 * 1. Import the component:
 *    import FloatingShapes from './three/FloatingShapes'
 *
 * 2. Add to your Canvas:
 *    <Canvas>
 *      <FloatingShapes count={15} />
 *    </Canvas>
 *
 * 3. Customize props:
 *    <FloatingShapes
 *      count={20}              // More shapes
 *      spreadX={80}            // Wider spread
 *      spreadY={40}            // Taller spread
 *      animationSpeed={0.5}    // Slower animation
 *      enableCubes={true}      // Include cubes
 *      enableTetrahedrons={true} // Include tetrahedrons
 *      enableSpheres={false}   // Exclude spheres
 *    />
 *
 * Performance recommendations:
 * - 10-15 shapes: Good performance on most laptops
 * - 15-20 shapes: Good performance on modern laptops
 * - 20+ shapes: May impact performance on older devices
 *
 * For production, consider:
 * - Detecting device performance and adjusting count
 * - Using React.memo to prevent unnecessary re-renders
 * - Lazy loading the 3D scene
 */
