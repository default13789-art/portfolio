# 3D Universe Scene - Usage Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install three @react-three/fiber @react-three/drei
```

### 2. Import and Use

```jsx
import UniverseScene from '@/components/3d/UniverseScene';

function App() {
  return (
    <div className="relative min-h-screen">
      <UniverseScene />
      {/* Your content goes here */}
    </div>
  );
}
```

## Integration Examples

### Hero Section Integration

```jsx
// Hero.jsx
import React from 'react';
import UniverseScene from './components/3d/UniverseScene';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* 3D Background */}
      <UniverseScene starCount={4000} />

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white">
        <h1>Welcome to My Portfolio</h1>
        <p>Move your mouse to explore the universe</p>
      </div>

      {/* Optional: Gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 pointer-events-none" />
    </section>
  );
};
```

### Full Page Background

```jsx
// App.jsx
import UniverseScene from './components/3d/UniverseScene';
import About from './sections/About';
import Projects from './sections/Projects';

function App() {
  return (
    <main className="relative">
      {/* Fixed background */}
      <div className="fixed inset-0 -z-10">
        <UniverseScene starCount={5000} />
      </div>

      {/* Scrollable content */}
      <About />
      <Projects />
    </main>
  );
}
```

### Multiple Scenes with Different Settings

```jsx
import UniverseScene from './components/3d/UniverseScene';

function Portfolio() {
  return (
    <>
      {/* Hero section - more stars */}
      <section className="h-screen relative">
        <UniverseScene starCount={5000} />
        <HeroContent />
      </section>

      {/* Contact section - fewer stars */}
      <section className="h-screen relative">
        <UniverseScene starCount={2000} />
        <ContactContent />
      </section>
    </>
  );
}
```

## Component Props Reference

### UniverseScene

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| starCount | number | 4000 | Number of stars (reduced on mobile) |
| className | string | '' | Additional CSS classes |
| style | object | {} | Additional inline styles |

### Stars (Advanced Usage)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| count | number | 4000 | Number of star particles |

### CameraRig (Advanced Usage)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| rotationIntensity | number | 0.2 | Auto-rotation intensity (0-1) |
| mouseIntensity | number | 0.5 | Mouse-following intensity (0-1) |
| smoothness | number | 0.1 | Damping factor (lower = smoother) |

### NeonGrid (Advanced Usage)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | '#00ffff' | Primary grid color (cyan) |
| secondaryColor | string | '#8b5cf6' | Secondary accent color (purple) |
| size | number | 200 | Grid size in world units |
| segments | number | 80 | Grid segments (lower = better performance) |
| positionY | number | -5 | Y position of the grid floor |
| waveSpeed | number | 0.5 | Speed of wave animation |
| waveHeight | number | 0.3 | Height/intensity of wave distortion |
| mouseInfluence | number | 0.15 | How much mouse affects grid (0-1) |
| fadeDistance | number | 60 | Distance at which grid starts fading |
| fadeLength | number | 80 | Length of fade transition zone |

## Advanced Customization

### Custom Star Colors

Edit `Stars.jsx`:

```jsx
<pointsMaterial
  size={0.15}
  color="#aaddff"  // Cool blue
  // or try:
  // color="#ffddaa"  // Warm yellow
  // color="#ffffff"  // Pure white
/>
```

### Adjust Background Colors

Edit `UniverseScene.jsx`:

```jsx
// Solid color
<color attach="background" args={['#0a0a0a']} />

// Gradient effect via CSS
style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e)' }}
```

### Modify Animation Speed

**Star Twinkling** (in `Stars.jsx`):

```jsx
// Faster
const time = state.clock.getElapsedTime() * 2

// Slower
const time = state.clock.getElapsedTime() * 0.5
```

**Camera Movement** (in `CameraRig.jsx`):

```jsx
// Faster rotation
time * rotationIntensity * 0.2  // Increase multiplier

// Slower rotation
time * rotationIntensity * 0.05  // Decrease multiplier
```

**NeonGrid Wave Animation** (via props):

```jsx
// Faster waves
<NeonGrid waveSpeed={1.0} />

// Slower waves
<NeonGrid waveSpeed={0.2} />

// No waves (static grid)
<NeonGrid waveHeight={0} />

// More dramatic waves
<NeonGrid waveHeight={0.5} />
```

### Customize NeonGrid Appearance

**Change Colors**:

```jsx
// Cyberpunk theme
<NeonGrid color="#ff00ff" secondaryColor="#00ffff" />

// Matrix theme
<NeonGrid color="#00ff00" secondaryColor="#003300" />

// Fire theme
<NeonGrid color="#ff4500" secondaryColor="#ff8c00" />
```

**Adjust Grid Density**:

```jsx
// High performance (fewer segments)
<NeonGrid segments={40} />

// High detail (more segments)
<NeonGrid segments={120} />
```

**Adjust Fade Effect**:

```jsx
// Longer visibility distance
<NeonGrid fadeDistance={100} fadeLength={150} />

// Shorter visibility (more mysterious)
<NeonGrid fadeDistance={30} fadeLength={50} />
```

## Performance Tuning

### For Low-End Devices

```jsx
<UniverseScene starCount={1500} />  // Fewer particles
```

### For High-End Devices

```jsx
<UniverseScene starCount={8000} />  // More particles
```

### Disable Animations (Static Background)

Edit `Stars.jsx` - remove the `useFrame` hook content.

## Troubleshooting

### Scene Not Rendering

1. Check that the parent container has height
2. Verify Three.js dependencies are installed
3. Check browser console for WebGL errors

### Poor Performance

1. Reduce `starCount` prop
2. Check if other components are CPU-intensive
3. Verify no memory leaks in other components

### Mobile Issues

1. Component automatically reduces particles on mobile
2. Further reduce `starCount` if needed
3. Test on actual devices, not just dev tools

## Best Practices

1. **Content Placement**: Always use z-index for content over the 3D scene
2. **Text Readability**: Add gradient overlays for better text contrast
3. **Performance**: Monitor FPS and adjust particle count accordingly
4. **Accessibility**: The scene is decorative; ensure content works without it
5. **Bundle Size**: Tree-shaking removes unused Three.js parts

## Examples in This Project

- `HeroWith3D.jsx` - Full hero section integration
- `UniverseExample.jsx` - Simple standalone example
- `README.md` - Technical documentation

## Additional Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Docs](https://threejs.org/docs/)
- [Drei Helpers](https://github.com/pmndrs/drei)
