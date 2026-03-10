# NeuralNetwork Component

A sophisticated AI-inspired particle system for React Three Fiber that creates an atmospheric neural network visualization with dynamic connections.

## Features

### Visual Effects
- **Glowing Particles**: 100+ spherical particles with customizable colors
- **Dynamic Connections**: Lines that appear/disappear based on particle proximity
- **Smooth Fading**: Connection opacity based on distance (closer = more visible)
- **Organic Movement**: Particles drift naturally with Perlin-like motion
- **Gentle Rotation**: Entire network slowly rotates for added dynamism

### Performance Optimizations
- **InstancedMesh**: GPU-efficient particle rendering (single draw call)
- **BufferGeometry**: Optimized line updates
- **Connection Limits**: Prevents exponential line growth
- **Efficient Calculations**: Optimized distance checks
- **Frustum Culling**: Optional for moving cameras

### Customization
- Fully configurable appearance and behavior
- Matches portfolio's neon cyan/purple theme
- Adjustable particle count, speed, and colors
- Flexible bounds and connection settings

## Installation

The component uses existing dependencies in your portfolio:

```bash
# Already installed in your project
- @react-three/fiber
- three
```

## Quick Start

```jsx
import { Canvas } from '@react-three/fiber'
import NeuralNetwork from './components/3d/NeuralNetwork'

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 35], fov: 60 }}>
      <NeuralNetwork />
    </Canvas>
  )
}
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `particleCount` | number | `100` | Number of particles in the network |
| `connectionDistance` | number | `8` | Maximum distance for connections to form |
| `driftSpeed` | number | `0.5` | Movement speed multiplier |
| `bounds` | number | `40` | Area particles stay within |
| `particleSize` | number | `0.15` | Size of individual particles |
| `particleColor` | string | `"#00ffff"` | Particle color (hex) |
| `lineColor` | string | `"#8b5cf6"` | Connection line color (hex) |
| `maxConnections` | number | `5` | Maximum connections per particle |
| `enableGlow` | boolean | `true` | Enable emissive glow effect |

## Usage Examples

### Basic Usage

```jsx
<Canvas>
  <NeuralNetwork />
</Canvas>
```

### Custom Configuration

```jsx
<Canvas>
  <NeuralNetwork
    particleCount={120}
    connectionDistance={10}
    driftSpeed={0.3}
    bounds={50}
    particleSize={0.2}
    particleColor="#00ffaa"
    lineColor="#ff00ff"
    maxConnections={6}
  />
</Canvas>
```

### Integrated Scene

```jsx
import { Canvas } from '@react-three/fiber'
import NeuralNetwork from './components/3d/NeuralNetwork'
import Stars from './components/3d/Stars'
import CameraRig from './components/3d/CameraRig'

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 35], fov: 60 }}>
      <Stars count={3000} />
      <NeuralNetwork particleCount={100} />
      <CameraRig />
    </Canvas>
  )
}
```

### As Background Element

```jsx
<div className="fixed inset-0 pointer-events-none z-0">
  <Canvas>
    <NeuralNetwork
      particleCount={60}
      connectionDistance={6}
      driftSpeed={0.2}
      maxConnections={3}
      particleSize={0.1}
    />
  </Canvas>
</div>
```

### Responsive Configuration

```jsx
const isMobile = window.innerWidth < 768

<Canvas>
  <NeuralNetwork
    particleCount={isMobile ? 60 : 100}
    connectionDistance={isMobile ? 6 : 8}
    maxConnections={isMobile ? 3 : 5}
  />
</Canvas>
```

## Preset Configurations

### Dense Network (More Connections)

```jsx
<NeuralNetwork
  particleCount={120}
  connectionDistance={10}
  maxConnections={7}
  driftSpeed={0.3}
/>
```

### Sparse Network (Minimal, Calming)

```jsx
<NeuralNetwork
  particleCount={80}
  connectionDistance={6}
  maxConnections={3}
  driftSpeed={0.2}
/>
```

### Active Network (Faster Movement)

```jsx
<NeuralNetwork
  particleCount={100}
  connectionDistance={8}
  driftSpeed={0.8}
  maxConnections={5}
/>
```

### Custom Colors (Different Themes)

```jsx
<NeuralNetwork
  particleColor="#ff00ff"  // Magenta particles
  lineColor="#00ff00"       // Green connections
/>
```

### Large Network (Impressive but Heavier)

```jsx
<NeuralNetwork
  particleCount={150}
  connectionDistance={10}
  maxConnections={6}
  bounds={50}
/>
```

## Performance Guidelines

### Optimal Settings

- **Desktop**: 100 particles, 8 connection distance, 5 max connections
- **Laptop**: 80-100 particles, 6-8 connection distance, 3-5 max connections
- **Mobile**: 60-80 particles, 5-6 connection distance, 2-3 max connections

### Performance Tips

1. **Reduce particle count** for better performance (try 80-100)
2. **Lower connection distance** to reduce line count
3. **Decrease maxConnections** to limit visual clutter
4. **Adjust bounds** to keep particles in view
5. **Enable frustum culling** if camera moves significantly

### Testing Performance

```jsx
// Monitor frame rate in browser DevTools
// Target: 60fps on desktop, 30fps on mobile

// Test configuration
<NeuralNetwork
  particleCount={100}  // Start here
  connectionDistance={8}
  maxConnections={5}
/>
```

## Visual Customization

### Color Themes

The component matches your portfolio's neon theme:

- **Default**: Cyan particles (`#00ffff`) + Purple lines (`#8b5cf6`)
- **Alternate**: Magenta particles (`#ff00ff`) + Cyan lines (`#00ffff`)
- **Custom**: Any hex color values

### Size Adjustments

- **Larger particles**: Increase `particleSize` (0.2-0.3)
- **Smaller particles**: Decrease `particleSize` (0.08-0.12)
- **Subtle effect**: Use smaller particles with lower opacity

### Movement Speed

- **Calm**: `driftSpeed={0.2}` - Gentle, slow movement
- **Active**: `driftSpeed={0.5}` - Balanced movement
- **Energetic**: `driftSpeed={0.8}` - Fast, dynamic movement

## Integration Examples

### Hero Section

```jsx
<section className="relative h-screen">
  <div className="absolute inset-0 z-0">
    <Canvas>
      <NeuralNetwork particleCount={80} />
    </Canvas>
  </div>
  <div className="relative z-10 flex items-center justify-center h-full">
    <h1 className="text-6xl font-bold gradient-text">AI Developer</h1>
  </div>
</section>
```

### About Section

```jsx
<section className="relative py-20">
  <div className="absolute inset-0 z-0 opacity-50">
    <Canvas>
      <NeuralNetwork
        particleCount={60}
        driftSpeed={0.3}
        bounds={30}
      />
    </Canvas>
  </div>
  <div className="relative z-10 container mx-auto px-4">
    <p className="text-lg">About me...</p>
  </div>
</section>
```

### Fixed Background

```jsx
<div className="fixed inset-0 pointer-events-none z-0">
  <Canvas>
    <NeuralNetwork
      particleCount={50}
      connectionDistance={6}
      driftSpeed={0.2}
      maxConnections={3}
      particleSize={0.1}
    />
  </Canvas>
</div>
```

## Technical Details

### Architecture

- **Particles**: InstancedMesh with SphereGeometry
- **Lines**: LineSegments with BufferGeometry
- **Animation**: useFrame hook for 60fps updates
- **Optimization**: Reused geometry, efficient calculations

### Movement Algorithm

Particles use organic movement with:
- Random initial velocities
- Perlin-like noise (layered sine waves)
- Soft boundary bouncing
- Smooth velocity changes

### Connection Logic

- Distance-based (O(n²) complexity)
- Maximum connections per particle
- Opacity fades with distance
- Dynamic appear/disappear

### Rendering

- **Particles**: Single draw call via InstancedMesh
- **Lines**: Dynamic BufferGeometry updates
- **Materials**: MeshBasicMaterial + LineBasicMaterial
- **Blending**: AdditiveBlending for glow effect

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Optimized configurations recommended

## Troubleshooting

### Low Frame Rate

```jsx
// Reduce complexity
<NeuralNetwork
  particleCount={80}
  connectionDistance={6}
  maxConnections={3}
/>
```

### Too Many Lines

```jsx
// Limit connections
<NeuralNetwork
  connectionDistance={6}
  maxConnections={3}
/>
```

### Particles Too Fast

```jsx
// Slow down movement
<NeuralNetwork
  driftSpeed={0.2}
/>
```

### Particles Out of View

```jsx
// Adjust bounds and camera
<NeuralNetwork bounds={30} />
// In Canvas: camera={{ position: [0, 0, 25] }}
```

## Files

- **Component**: `/src/components/3d/NeuralNetwork.jsx`
- **Example**: `/src/components/3d/NeuralNetworkExample.jsx`
- **README**: `/src/components/3d/NEURAL_NETWORK_README.md`

## Credits

Created for the React Three Fiber portfolio with AI/tech theme.

---

**Last Updated**: March 2026
**Version**: 1.0.0
