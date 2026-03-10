import { Canvas } from '@react-three/fiber'
import NeuralNetwork from './NeuralNetwork'
import CameraRig from './CameraRig'
import Stars from './Stars'

/**
 * NeuralNetworkExample - Complete scene showcasing the NeuralNetwork component
 *
 * This example demonstrates:
 * - Basic NeuralNetwork usage with default settings
 * - Layered 3D scene with multiple components
 * - Proper camera positioning for optimal viewing
 * - Integration with other 3D components
 *
 * The neural network creates an atmospheric AI/tech background effect
 * that suggests artificial intelligence without being distracting.
 */
export default function NeuralNetworkExample() {
  return (
    <Canvas
      camera={{ position: [0, 0, 35], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: '#0a0a0f' }}
    >
      {/* Background starfield for depth */}
      <Stars count={3000} />

      {/* Main neural network visualization */}
      <NeuralNetwork
        particleCount={100}
        connectionDistance={8}
        driftSpeed={0.5}
        bounds={40}
        particleSize={0.15}
        particleColor="#00ffff"
        lineColor="#8b5cf6"
        maxConnections={5}
      />

      {/* Smooth camera movement */}
      <CameraRig />
    </Canvas>
  )
}

/**
 * Alternative configurations:
 *
 * 1. Dense Network (more connections):
 *    <NeuralNetwork
 *      particleCount={120}
 *      connectionDistance={10}
 *      maxConnections={7}
 *      driftSpeed={0.3}
 *    />
 *
 * 2. Sparse Network (minimal, calming):
 *    <NeuralNetwork
 *      particleCount={80}
 *      connectionDistance={6}
 *      maxConnections={3}
 *      driftSpeed={0.2}
 *    />
 *
 * 3. Active Network (faster movement):
 *    <NeuralNetwork
 *      particleCount={100}
 *      connectionDistance={8}
 *      driftSpeed={0.8}
 *      maxConnections={5}
 *    />
 *
 * 4. Custom Colors (different themes):
 *    <NeuralNetwork
 *      particleColor="#ff00ff"  // Magenta particles
 *      lineColor="#00ff00"       // Green connections
 *    />
 *
 * 5. Large Network (impressive but heavier):
 *    <NeuralNetwork
 *      particleCount={150}
 *      connectionDistance={10}
 *      maxConnections={6}
 *      bounds={50}
 *    />
 */

/**
 * Integration with existing portfolio sections:
 *
 * In a Hero section:
 * ```jsx
 * <section className="relative h-screen">
 *   <div className="absolute inset-0 z-0">
 *     <Canvas>
 *       <NeuralNetwork particleCount={80} />
 *     </Canvas>
 *   </div>
 *   <div className="relative z-10 flex items-center justify-center h-full">
 *     <h1 className="text-6xl font-bold">AI Developer</h1>
 *   </div>
 * </section>
 * ```
 *
 * In an About section:
 * ```jsx
 * <section className="relative py-20">
 *   <div className="absolute inset-0 z-0 opacity-50">
 *     <Canvas>
 *       <NeuralNetwork
 *         particleCount={60}
 *         driftSpeed={0.3}
 *         bounds={30}
 *       />
 *     </Canvas>
 *   </div>
 *   <div className="relative z-10 container mx-auto px-4">
 *     <p className="text-lg">About me...</p>
 *   </div>
 * </section>
 * ```
 *
 * As a subtle background element:
 * ```jsx
 * <div className="fixed inset-0 pointer-events-none z-0">
 *   <Canvas>
 *     <NeuralNetwork
 *       particleCount={50}
 *       connectionDistance={6}
 *       driftSpeed={0.2}
 *       maxConnections={3}
 *       particleSize={0.1}
 *     />
 *   </Canvas>
 * </div>
 * ```
 */

/**
 * Performance considerations:
 *
 * For optimal performance:
 * - Keep particleCount between 80-100 for most devices
 * - Use connectionDistance of 6-8 to balance visuals and performance
 * - Limit maxConnections to 3-5 to prevent exponential line growth
 * - Lower particleCount on mobile devices
 * - Consider using React.memo for parent components
 *
 * Performance testing:
 * - Test on target devices before deployment
 * - Monitor frame rate with browser DevTools
 * - Adjust parameters based on device capabilities
 * - Consider progressive enhancement (fewer particles on mobile)
 *
 * Mobile optimization example:
 * ```jsx
 * const isMobile = window.innerWidth < 768
 *
 * <NeuralNetwork
 *   particleCount={isMobile ? 60 : 100}
 *   connectionDistance={isMobile ? 6 : 8}
 *   maxConnections={isMobile ? 3 : 5}
 * />
 * ```
 */
