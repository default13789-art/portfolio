# 3D Universe Scene Components

A lightweight, performant 3D space background system built with React Three Fiber for React portfolios.

## Components

### UniverseScene
The main container component that sets up the 3D scene.

**Props:**
- `starCount` (number, default: 4000) - Number of stars to render
- `className` (string) - Additional CSS classes
- `style` (object) - Additional inline styles

**Features:**
- Automatic mobile detection (reduces particles on small screens)
- Performance optimizations (pixel ratio capping, frame loop control)
- Responsive sizing
- Dark space environment with fog

### Stars
Particle system that creates a realistic starfield with twinkling effects.

**Props:**
- `count` (number, default: 4000) - Number of star particles

**Features:**
- BufferGeometry for optimal performance
- Subtle twinkling animation
- Slow rotation effect
- Additive blending for glow effect

### CameraRig
Handles smooth camera movements and mouse interaction.

**Props:**
- `rotationIntensity` (number, default: 0.2) - Auto-rotation intensity
- `mouseIntensity` (number, default: 0.5) - Mouse-following intensity
- `smoothness` (number, default: 0.1) - Damping factor (lower = smoother)

**Features:**
- Gentle auto-rotation
- Mouse-following parallax
- Smooth damping for natural movement

## Usage

### Basic Usage

```jsx
import UniverseScene from './components/3d/UniverseScene';

function MySection() {
  return (
    <section className="relative h-screen">
      <UniverseScene />
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </section>
  );
}
```

### With Custom Props

```jsx
<UniverseScene
  starCount={5000}
  className="z-0"
  style={{ opacity: 0.8 }}
/>
```

### Standalone Components

```jsx
import { Canvas } from '@react-three/fiber';
import Stars from './components/3d/Stars';
import CameraRig from './components/3d/CameraRig';

function CustomScene() {
  return (
    <Canvas>
      <Stars count={3000} />
      <CameraRig
        rotationIntensity={0.3}
        mouseIntensity={0.7}
        smoothness={0.15}
      />
    </Canvas>
  );
}
```

## Performance

The scene is optimized for smooth performance on normal laptops:

- **Particle count**: 4000 stars (2000 on mobile)
- **Bundle size**: < 50KB added
- **Frame rate**: 60 FPS on most devices
- **Memory usage**: Minimal due to BufferGeometry

### Optimization Techniques Used

1. **BufferGeometry** - Efficient particle rendering
2. **Pixel ratio capping** - Limits device pixel ratio to 2
3. **Mobile adaptation** - Reduces particles on small screens
4. **Additive blending** - GPU-friendly glow effect
5. **Frame loop control** - Pauses when not in view
6. **Memoization** - Computed values cached

## Customization

### Change Colors

Edit the `Stars.jsx` component:

```jsx
<pointsMaterial
  size={0.15}
  color="#88ccff"  // Change star color
  opacity={0.8}
  // ... other props
/>
```

### Adjust Animation Speed

In `Stars.jsx`, modify the time multiplier:

```jsx
// Faster twinkling
scalesArray[i] = 0.5 + Math.sin(time * 1.0 + offset) * 0.3

// Slower twinkling
scalesArray[i] = 0.5 + Math.sin(time * 0.3 + offset) * 0.3
```

### Modify Camera Movement

Adjust props on `CameraRig`:

```jsx
<CameraRig
  rotationIntensity={0.5}  // More rotation
  mouseIntensity={0.8}      // Stronger mouse effect
  smoothness={0.05}         // Smoother damping
/>
```

## Dependencies

- `three` - Core 3D library
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers (optional, not currently used)

## Browser Support

Works in all modern browsers that support:
- WebGL
- ES6 modules
- React 18+

## Tips

1. **Use as background**: Place content in a higher z-index
2. **Add overlay**: Use a gradient overlay for better text readability
3. **Performance**: Monitor FPS and reduce star count if needed
4. **Accessibility**: The scene is decorative; ensure content is accessible without it

## Example Integration

See `HeroWith3D.jsx` for a complete example of integrating the UniverseScene into a portfolio hero section.
