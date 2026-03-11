# Floating Geometric Shapes Components

A collection of React Three Fiber components for creating floating wireframe geometric shapes with neon glow effects. Perfect for adding visual interest to 3D portfolio backgrounds.

## Components

### 1. FloatingShapes (Container)
Main component that manages multiple floating shapes in 3D space.

**File:** `/src/components/3d/FloatingShapes.jsx`

**Features:**
- Spawns cubes, tetrahedrons, and spheres randomly
- Configurable count, spread area, and animation speed
- Optimized performance with reusable geometry
- Random positions, rotations, and animation parameters

**Props:**
```javascript
<FloatingShapes
  count={15}              // Total number of shapes
  spreadX={60}            // Horizontal spread area
  spreadY={30}            // Vertical spread area
  spreadZ={60}            // Depth spread area
  minDistance={10}        // Minimum distance from center
  animationSpeed={1}      // Global animation speed multiplier
  enableCubes={true}      // Include cubes
  enableTetrahedrons={true} // Include tetrahedrons
  enableSpheres={true}    // Include spheres
/>
```

### 2. WireframeCube
Individual floating wireframe cube component.

**File:** `/src/components/3d/WireframeCube.jsx`

**Features:**
- Wireframe geometry using LineSegments
- Neon cyan glow (#00ffff)
- Multi-axis rotation
- Sine wave floating motion

**Props:**
```javascript
<WireframeCube
  size={1}                // Cube size
  color="#00ffff"         // Wireframe color
  rotationSpeed={1}       // Rotation speed multiplier
  floatSpeed={1}          // Floating speed
  floatAmplitude={0.3}    // Floating height
  position={[0, 0, 0]}    // Starting position
  rotation={[0, 0, 0]}    // Starting rotation
/>
```

### 3. WireframeTetrahedron
Individual floating tetrahedron (4-sided pyramid) component.

**File:** `/src/components/3d/WireframeTetrahedron.jsx`

**Features:**
- TetrahedronGeometry with wireframe
- Neon purple glow (#8b5cf6)
- Tumbling rotation animation
- Cosine wave floating motion

**Props:**
```javascript
<WireframeTetrahedron
  size={1}                // Tetrahedron radius
  color="#8b5cf6"         // Wireframe color
  rotationSpeed={1}       // Rotation speed multiplier
  floatSpeed={1}          // Floating speed
  floatAmplitude={0.3}    // Floating height
  floatOffset={0}         // Phase offset for motion
  position={[0, 0, 0]}    // Starting position
  rotation={[0, 0, 0]}    // Starting rotation
/>
```

### 4. WireframeSphere
Individual floating wireframe sphere component.

**File:** `/src/components/3d/WireframeSphere.jsx`

**Features:**
- SphereGeometry with wireframe
- Neon cyan glow (#00d4ff)
- Y-axis rotation (like spinning globe)
- Gentle wobble and floating motion

**Props:**
```javascript
<WireframeSphere
  size={1}                // Sphere radius
  color="#00d4ff"         // Wireframe color
  rotationSpeed={1}       // Rotation speed multiplier
  floatSpeed={1}          // Floating speed
  floatAmplitude={0.3}    // Floating height
  floatOffset={0}         // Phase offset for motion
  position={[0, 0, 0]}    // Starting position
  segments={16}           // Geometry detail (lower = better performance)
/>
```

## Usage

### Basic Integration

```jsx
import { Canvas } from '@react-three/fiber'
import FloatingShapes from './components/3d/FloatingShapes'

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <FloatingShapes count={15} />
    </Canvas>
  )
}
```

### With Other Components

```jsx
import { Canvas } from '@react-three/fiber'
import FloatingShapes from './components/3d/FloatingShapes'
import NeonGrid from './components/3d/NeonGrid'
import Stars from './components/3d/Stars'

function PortfolioScene() {
  return (
    <Canvas camera={{ position: [0, 5, 30] }}>
      <ambientLight intensity={0.3} />

      {/* Background elements */}
      <Stars count={500} />

      {/* Floor */}
      <NeonGrid positionY={-8} />

      {/* Floating shapes */}
      <FloatingShapes
        count={15}
        spreadX={60}
        spreadY={30}
        spreadZ={60}
        minDistance={10}
      />
    </Canvas>
  )
}
```

### Individual Shape Usage

```jsx
import { Canvas } from '@react-three/fiber'
import WireframeCube from './components/3d/WireframeCube'
import WireframeTetrahedron from './components/3d/WireframeTetrahedron'
import WireframeSphere from './components/3d/WireframeSphere'

function CustomScene() {
  return (
    <Canvas>
      <WireframeCube
        position={[5, 2, -10]}
        size={1.5}
        color="#00ffff"
      />

      <WireframeTetrahedron
        position={[-8, 3, -15]}
        size={1.2}
        color="#8b5cf6"
      />

      <WireframeSphere
        position={[0, 4, -12]}
        size={1.3}
        color="#00d4ff"
        segments={16}
      />
    </Canvas>
  )
}
```

## Performance Optimization

### Recommended Settings by Device

**High-end Desktops:**
```javascript
<FloatingShapes
  count={25}
  spreadX={80}
  spreadY={40}
  spreadZ={80}
/>
```

**Average Laptops:**
```javascript
<FloatingShapes
  count={15}
  spreadX={60}
  spreadY={30}
  spreadZ={60}
/>
```

**Lower-end Devices:**
```javascript
<FloatingShapes
  count={8}
  spreadX={40}
  spreadY={20}
  spreadZ={40}
  enableSpheres={false}  // Spheres have more edges
/>
```

### Performance Tips

1. **Reduce shape count** - Each shape adds draw calls
2. **Lower segment counts** - Especially for spheres
3. **Disable unused shape types** - Only enable what you need
4. **Reduce spread areas** - Keeps shapes closer to camera
5. **Lower animation speed** - Reduces computation per frame

### Performance Characteristics

- **Cubes**: 12 edges, most efficient
- **Tetrahedrons**: 6 edges, very efficient
- **Spheres**: ~48-96 edges (depends on segments), less efficient

## Customization

### Color Themes

**Portfolio Default (Cyan/Purple):**
```javascript
<WireframeCube color="#00ffff" />
<WireframeTetrahedron color="#8b5cf6" />
<WireframeSphere color="#00d4ff" />
```

**Cool Blues:**
```javascript
<WireframeCube color="#3b82f6" />
<WireframeTetrahedron color="#06b6d4" />
<WireframeSphere color="#60a5fa" />
```

**Warm Tones:**
```javascript
<WireframeCube color="#f59e0b" />
<WireframeTetrahedron color="#ef4444" />
<WireframeSphere color="#f97316" />
```

### Animation Styles

**Slow & Gentle:**
```javascript
<WireframeCube
  rotationSpeed={0.3}
  floatSpeed={0.5}
  floatAmplitude={0.2}
/>
```

**Fast & Energetic:**
```javascript
<WireframeCube
  rotationSpeed={2}
  floatSpeed={1.5}
  floatAmplitude={0.5}
/>
```

**Minimal Movement:**
```javascript
<WireframeCube
  rotationSpeed={0.1}
  floatSpeed={0.2}
  floatAmplitude={0.1}
/>
```

## Technical Details

### Technologies Used
- React Three Fiber (@react-three/fiber)
- Three.js (r183)
- React hooks (useRef, useMemo, useFrame)

### Performance Optimizations
- useMemo for geometry and material creation
- LineSegments for efficient wireframe rendering
- EdgesGeometry for clean edges only
- GPU-accelerated transformations
- Optimized segment counts
- Minimal state updates

### Animation Technique
- useFrame hook for 60fps animation
- Sine/cosine waves for smooth floating
- Multi-axis rotation for visual interest
- Phase offsets to prevent synchronization

## File Structure

```
src/components/3d/
├── FloatingShapes.jsx           # Container component
├── FloatingShapesExample.jsx    # Usage example
├── WireframeCube.jsx            # Cube component
├── WireframeTetrahedron.jsx     # Tetrahedron component
├── WireframeSphere.jsx          # Sphere component
└── FLOATING_SHAPES_README.md    # This file
```

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Supported (reduce count for performance)

## License

These components are part of your portfolio project.
