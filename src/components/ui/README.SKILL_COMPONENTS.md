# Animated Skill Components

A collection of beautiful, animated components for displaying skills in your AI engineer portfolio. These components feature smooth animations, glassmorphism effects, and full accessibility support.

## Components

### 1. AnimatedProgressBar

A glowing progress bar with smooth fill animation and counting percentage.

#### Features
- Animated fill from 0% to target percentage
- Glowing effect using box-shadow
- Gradient color support
- Percentage label that counts up
- Smooth easing animation (ease-out cubic)
- Intersection Observer for lazy animation
- Configurable width, color, animation duration
- Full accessibility support
- Reduced motion support

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `percentage` | `number` (required) | - | Target percentage (0-100) |
| `color` | `string` | `'#3ce6f9'` | Color for the progress bar (hex, rgb, or color name) |
| `label` | `string` | `undefined` | Label to display above the progress bar |
| `duration` | `number` | `1500` | Animation duration in milliseconds |
| `height` | `number` | `8` | Height of the progress bar in pixels |
| `showPercentage` | `boolean` | `true` | Whether to show the percentage label |
| `glow` | `boolean` | `true` | Whether to show the glow effect |
| `className` | `string` | `''` | Additional CSS classes to apply |

#### Usage Example

```jsx
import AnimatedProgressBar from '@/components/ui/AnimatedProgressBar';

// Basic usage
<AnimatedProgressBar percentage={85} label="Python" />

// Custom color and duration
<AnimatedProgressBar
  percentage={92}
  color="#ff6b6b"
  label="React"
  duration={2000}
/>

// Different height
<AnimatedProgressBar
  percentage={78}
  color="#4ecdc4"
  label="TypeScript"
  height={12}
/>

// Without percentage label
<AnimatedProgressBar
  percentage={95}
  color="#ffe66d"
  label="Node.js"
  showPercentage={false}
/>
```

---

### 2. RotatingIcon

An icon with continuous rotation animation and glow effects on hover.

#### Features
- Slow continuous rotation animation
- Glow effect on hover
- Configurable rotation speed
- Pause on hover option
- Clockwise and counter-clockwise rotation
- Icon container with radial glow
- Full keyboard accessibility
- Reduced motion support

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` (required) | - | SVG icon to rotate |
| `rotationSpeed` | `string` | `'10s'` | Duration for one full rotation (CSS time value) |
| `pauseOnHover` | `boolean` | `true` | Whether to pause rotation on hover |
| `glowColor` | `string` | `'#3ce6f9'` | Color for the glow effect |
| `size` | `number` | `48` | Size of the icon container in pixels |
| `showGlow` | `boolean` | `true` | Whether to show the glow effect |
| `className` | `string` | `''` | Additional CSS classes to apply |
| `rotationDirection` | `'clockwise' \| 'counter-clockwise'` | `'clockwise'` | Direction of rotation |

#### Usage Example

```jsx
import RotatingIcon from '@/components/ui/RotatingIcon';

// Basic usage
<RotatingIcon>
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#3ce6f9" strokeWidth="2" />
  </svg>
</RotatingIcon>

// Custom size and speed
<RotatingIcon size={64} rotationSpeed="3s">
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" />
  </svg>
</RotatingIcon>

// Counter-clockwise rotation
<RotatingIcon rotationDirection="counter-clockwise">
  <svg>{/* ... */}</svg>
</RotatingIcon>

// Custom glow color
<RotatingIcon glowColor="#ff6b6b">
  <svg>{/* ... */}</svg>
</RotatingIcon>
```

---

### 3. SkillCard

A glassmorphism card for displaying skill categories with 3D tilt effect.

#### Features
- Uses TiltCard for 3D effect
- Category icon with RotatingIcon
- Category name and description
- List of skills with AnimatedProgressBar
- Entrance animation (fade-in-up)
- Neon border glow on hover
- Fully responsive design
- Intersection Observer for lazy animation
- Custom scrollbar for skill list

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` (required) | - | SVG icon for the category |
| `title` | `string` (required) | - | Category title |
| `description` | `string` | `undefined` | Category description |
| `skills` | `Array<{name: string, level: number, color?: string}>` | `[]` | Array of skills with levels |
| `glowColor` | `string` | `'#3ce6f9'` | Color for glow effects |
| `delay` | `number` | `0` | Entrance animation delay in milliseconds |
| `iconSize` | `number` | `48` | Size of the rotating icon |
| `rotationSpeed` | `string` | `'10s'` | Rotation speed for the icon |
| `pauseIconOnHover` | `boolean` | `true` | Whether to pause icon rotation on hover |
| `className` | `string` | `''` | Additional CSS classes to apply |
| `showPercentage` | `boolean` | `true` | Whether to show percentage labels on progress bars |

#### Usage Example

```jsx
import SkillCard from '@/components/ui/SkillCard';

// Basic usage
<SkillCard
  icon={
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#3ce6f9" strokeWidth="2" />
    </svg>
  }
  title="AI & Machine Learning"
  description="Building intelligent systems"
  skills={[
    { name: "TensorFlow", level: 90 },
    { name: "PyTorch", level: 85 },
    { name: "OpenAI API", level: 95 }
  ]}
/>

// Custom colors per skill
<SkillCard
  icon={<svg>{/* ... */}</svg>}
  title="Programming Languages"
  glowColor="#ff6b6b"
  skills={[
    { name: 'Python', level: 95, color: '#3ce6f9' },
    { name: 'JavaScript', level: 92, color: '#ffe66d' },
    { name: 'TypeScript', level: 88, color: '#4ecdc4' },
  ]}
/>

// With custom delay and icon size
<SkillCard
  icon={<svg>{/* ... */}</svg>}
  title="Web Development"
  delay={100}
  iconSize={64}
  rotationSpeed="15s"
  skills={[
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 90 },
  ]}
/>
```

---

## Complete Skills Section Example

Here's how to use all components together to create a complete skills section:

```jsx
import React from 'react';
import SkillCard from '@/components/ui/SkillCard';

const SkillsSection = () => {
  const AIIcon = () => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" />
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const WebDevIcon = () => (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12H22" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const categories = [
    {
      icon: <AIIcon />,
      title: 'AI & Machine Learning',
      description: 'Building intelligent systems with cutting-edge technologies',
      glowColor: '#3ce6f9',
      skills: [
        { name: 'TensorFlow', level: 90 },
        { name: 'PyTorch', level: 85 },
        { name: 'OpenAI API', level: 95 },
        { name: 'LangChain', level: 80 },
      ],
    },
    {
      icon: <WebDevIcon />,
      title: 'Web Development',
      description: 'Modern web applications with React and Next.js',
      glowColor: '#a855f7',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 88 },
        { name: 'TailwindCSS', level: 92 },
      ],
    },
  ];

  return (
    <section id="skills" className="section-padding bg-[#12121a]">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg gradient-text mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#05b5d4] to-[#a855f7] mx-auto rounded-full mb-6" />
          <p className="body-text max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              glowColor={category.glowColor}
              delay={index * 100}
              skills={category.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
```

---

## Styling & Theming

All components support custom colors via the `glowColor` or `color` props. The components use CSS variables for dynamic styling:

```css
--glow-color: #3ce6f9;
--rotation-speed: 10s;
--rotation-direction: normal;
```

---

## Accessibility Features

All components include comprehensive accessibility support:

- **Semantic HTML**: Proper use of ARIA roles and attributes
- **Keyboard Navigation**: Full keyboard support with visible focus states
- **Screen Readers**: Descriptive aria-labels for interactive elements
- **Reduced Motion**: Respects `prefers-reduced-motion` settings
- **Focus Management**: Clear focus indicators for keyboard users

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- Intersection Observer API support (with polyfill available)

---

## Performance Considerations

- Components use `requestAnimationFrame` for smooth animations
- Intersection Observer for lazy loading animations
- CSS transforms for GPU-accelerated animations
- Proper cleanup in useEffect hooks
- Will-change property optimization

---

## License

These components are part of the AI Engineer Portfolio project.
