# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-03-11

### Premium Redesign with 3D Contact Form

This release represents a significant visual enhancement to the portfolio, introducing a premium design language with luxury color accents, improved glassmorphism effects, and strategic 3D element placement.

### Premium Design Updates

#### Color Palette
- **Charcoal (#1A1A2E)**: Deep background for rich contrast
- **Gold (#D4AF37)**: Premium accent color for luxury feel
- **Sapphire (#1E40AF)**: Blue accent for depth
- **Amethyst (#6B46C1)**: Purple accent for visual interest

#### Visual Enhancements
- Enhanced glassmorphism effects with `backdrop-blur-xl`
- Premium gold accents throughout the interface
- Improved button gradients with 3-color stops (Gold → Cyan → Purple)
- Enhanced hover states with gold glow effects
- Subtle borders on cards with `border-white/10`
- Shadow effects with gold tint: `shadow-[0_0_40px_rgba(212,175,55,0.15)]`

#### Typography & Layout
- Premium typography hierarchy with improved spacing
- Enhanced card designs with subtle borders
- Better visual rhythm and spacing consistency
- Improved mobile responsiveness across all sections

### 3D Elements

#### Hero Section
- **Removed**: 3D solar system from Hero section
- **Result**: Cleaner, more focused hero content
- Rationale: Improve page load performance and content focus

#### Contact Form
- **Added**: 3D UniverseScene to "Send a Message" card
- **Features**:
  - Solar system with Sun and 8 planets
  - Starfield with 4000 stars (1500 on mobile)
  - Mouse-parallax camera rig
  - Proper SSR/hydration support
- **Positioning**: Behind contact form as animated background
- **Performance**: Lazy-loaded with IntersectionObserver
- **Unloading**: Automatically unloads when not visible (5s delay)

### Technical Improvements

#### SSR/Hydration Fixes
- Fixed `window.devicePixelRatio` access causing black screen
- Moved DPR access from render to `useEffect` hook
- Changed Canvas `alpha` from `false` to `true` for transparency
- Fixed fog syntax using array format `args={['#020208', 80, 200]}`

#### Performance Optimizations
- DPR capped at maximum 2 for performance
- Lazy loading of 3D components with `React.lazy()`
- IntersectionObserver-based loading triggers
- Unloading of 3D scenes when not visible
- Mobile-specific optimizations (reduced star count)

#### Form Enhancements
- Enhanced form validation with Formspree integration
- Improved error handling and user feedback
- Client-side validation before submission
- Clear success/error states with visual feedback
- Fallback to mailto if Formspree unavailable

### Files Modified

#### Component Changes

**`src/components/3d/UniverseScene.jsx`**
- Fixed SSR/hydration issues
- Added `useState` and `useEffect` hooks
- Moved `window.devicePixelRatio` access to `useEffect`
- Changed `alpha: false` to `alpha: true` in Canvas config
- Fixed fog syntax to use array format

**`src/components/3d/ContactCharacter.jsx`**
- **DELETED**: Removed 3D robot character component (347 lines)
- Was used briefly in Contact form before being replaced

**`src/components/sections/Contact.jsx`**
- Removed 3D character integration
- Removed `CharacterContainer` component
- Added `LazyUniverseScene` import
- Removed `isFormHovered` state
- Added 3D universe background to "Send a Message" card
- Enhanced form styling with premium colors
- Improved gold accent integration
- Added backdrop blur effects

**`src/components/sections/Hero.jsx`**
- Minor adjustments for consistency
- Maintained clean design without 3D elements

#### Styling Updates

**Color Variables Applied Across:**
- `/src/components/sections/Contact.jsx` - Premium gold/sapphire/amethyst theme
- `/src/components/sections/Hero.jsx` - Consistent styling
- `/src/components/ui/Card.jsx` - Glassmorphism enhancements
- `/src/components/ui/Button.jsx` - Premium gradient buttons
- `/src/components/layout/Navbar.jsx` - Consistent theming

### Breaking Changes

**None** - All changes are visual enhancements and optimizations that maintain backward compatibility.

### Migration Notes

No migration required. This release is fully backward compatible.

### Dependencies

**Key Dependencies:**
- `react`: ^19.2.0
- `react-dom`: ^19.2.0
- `@react-three/fiber`: ^9.5.0
- `@react-three/drei`: ^10.7.7
- `three`: ^0.183.2
- `tailwindcss`: ^3.4.19

**Dev Dependencies:**
- `vite`: ^7.3.1
- `vercel`: ^50.29.0

### Deployment

**Platform**: Vercel
**Build**: Optimized production build with Terser minification
**Performance**: Speed Insights integrated

### Known Issues

None at this time.

### Future Enhancements

- Potential addition of more 3D elements to other sections
- Further performance optimizations for mobile devices
- Additional animation micro-interactions
- Enhanced accessibility features

---

## [1.0.0] - 2026-03-10

### Initial Release

#### Core Features
- Hero section with typing animation
- About section
- Skills section with visualization
- Projects showcase
- Contact form with Formspree integration
- 3D solar system in Hero section
- Responsive design across all breakpoints
- Dark theme optimized

#### Technical Foundation
- React 19 with Vite
- TailwindCSS for styling
- React Three Fiber for 3D elements
- Formspree for form handling
- Smooth scroll navigation
- Custom cursor effect

#### Documentation
- Comprehensive component documentation
- 3D component usage guides
- Performance monitoring setup
- Deployment instructions

---

## Version History Legend

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes

## Links

- **Repository**: [GitHub Repository URL]
- **Documentation**: [Docs URL]
- **Issue Tracker**: [Issues URL]
