# 3D Scene Optimization - Quick Reference

## Quick Start

### For the Hero Component
```jsx
import LazyUniverseScene from '../3d/LazyUniverseScene';

// In your JSX
<LazyUniverseScene
  starCount={isMobile ? 1500 : 4000}
  visibilityThreshold={0.1}
  rootMargin="100px"
  unloadWhenHidden={true}
  unloadDelay={5000}
/>
```

## Key Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `starCount` | number | 4000 | Number of stars |
| `visibilityThreshold` | number | 0.1 | When to trigger load (0-1) |
| `rootMargin` | string | '100px' | Load提前量 |
| `unloadWhenHidden` | boolean | true | Unload when hidden |
| `unloadDelay` | number | 5000 | Delay before unload (ms) |

## Performance Utilities

```jsx
import {
  isMobile,
  shouldReduce3DEffects,
  getOptimized3DSettings,
  PerformanceMonitor
} from '../utils/PerformanceMonitor';

// Check device type
if (isMobile()) {
  // Use mobile settings
}

// Get optimized settings
const settings = getOptimized3DSettings();
// Returns: { starCount, shapeCount, pixelRatio, etc. }

// Monitor FPS
const monitor = new PerformanceMonitor();
monitor.start();
console.log(monitor.getFPS());
```

## Common Patterns

### 1. Conditional 3D Loading
```jsx
const [canLoad3D, setCanLoad3D] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => setCanLoad3D(true), 1500);
  return () => clearTimeout(timer);
}, []);

return canLoad3D && <LazyUniverseScene />;
```

### 2. Device-Specific Settings
```jsx
const settings = getOptimized3DSettings();

<LazyUniverseScene
  starCount={settings.starCount}
  shapeCount={settings.shapeCount}
/>
```

### 3. Performance-Based Loading
```jsx
const monitor = new PerformanceMonitor();
useEffect(() => {
  monitor.start();
  return () => monitor.stop();
}, []);

const starCount = monitor.isLowPerformance() ? 1500 : 4000;
```

## Troubleshooting

### Scene Not Loading
1. Check browser console for errors
2. Verify Three.js is installed: `npm list three @react-three/fiber`
3. Check if defer3DLoading is false
4. Verify IntersectionObserver is supported

### Poor Performance
1. Reduce starCount prop
2. Set unloadWhenHidden to true
3. Check device with `shouldReduce3DEffects()`
4. Monitor FPS with PerformanceMonitor

### Memory Issues
1. Verify unloading is working
2. Check IntersectionObserver cleanup
3. Monitor with React DevTools
4. Reduce particle counts

## File Locations

- **LazyUniverseScene**: `/src/components/3d/LazyUniverseScene.jsx`
- **UniverseScene**: `/src/components/3d/UniverseScene.jsx`
- **Loading Component**: `/src/components/ui/Scene3DLoading.jsx`
- **Performance Utils**: `/src/components/utils/PerformanceMonitor.js`
- **Documentation**: `/3D_PERFORMANCE_OPTIMIZATIONS.md`

## Performance Tips

1. **Always lazy load** - Use React.lazy() for 3D components
2. **Add Suspense** - Each lazy component needs a Suspense boundary
3. **Defer loading** - Wait 1-2 seconds after initial load
4. **Detect visibility** - Only render when in viewport
5. **Unload when hidden** - Free up resources when not needed
6. **Adapt to device** - Reduce effects on mobile/low-end devices
7. **Monitor performance** - Use PerformanceMonitor to track FPS

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires:
- IntersectionObserver API
- React 18+
- Three.js
- @react-three/fiber

## Quick Tests

```bash
# Test build
npm run build

# Test dev server
npm run dev

# Check for issues
npm run lint
```

## Further Reading

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [React Lazy Loading](https://react.dev/reference/react/lazy)
- Full documentation: `3D_PERFORMANCE_OPTIMIZATIONS.md`
