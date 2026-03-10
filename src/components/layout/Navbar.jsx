import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import CyberpunkClock from '../widgets/CyberpunkClock';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Projects', to: 'projects' },
    { name: 'Skills', to: 'skills' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="group relative cursor-pointer transition-all duration-300 flex items-center"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <defs>
                {/* 3D sphere gradient — input layer (cyan) */}
                <radialGradient id="sph-in" cx="33%" cy="28%" r="67%" fx="33%" fy="28%">
                  <stop offset="0%"   stopColor="#c8faff" />
                  <stop offset="30%"  stopColor="#1E40AF" />
                  <stop offset="75%"  stopColor="#0b6e80" />
                  <stop offset="100%" stopColor="#02242b" />
                </radialGradient>
                {/* 3D sphere gradient — hidden layer (indigo) */}
                <radialGradient id="sph-hid" cx="33%" cy="28%" r="67%" fx="33%" fy="28%">
                  <stop offset="0%"   stopColor="#ddd6fe" />
                  <stop offset="30%"  stopColor="#818cf8" />
                  <stop offset="75%"  stopColor="#3730a3" />
                  <stop offset="100%" stopColor="#0f0b2e" />
                </radialGradient>
                {/* 3D sphere gradient — output layer (purple) */}
                <radialGradient id="sph-out" cx="33%" cy="28%" r="67%" fx="33%" fy="28%">
                  <stop offset="0%"   stopColor="#f3d4ff" />
                  <stop offset="30%"  stopColor="#6B46C1" />
                  <stop offset="75%"  stopColor="#6b21a8" />
                  <stop offset="100%" stopColor="#200838" />
                </radialGradient>
                {/* Connection line gradient L→R */}
                <linearGradient id="conn-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#1E40AF" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.55" />
                </linearGradient>
                {/* Connection line gradient M→R */}
                <linearGradient id="conn-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#818cf8" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#6B46C1" stopOpacity="0.55" />
                </linearGradient>
                {/* Node glow filter */}
                <filter id="nd-glow" x="-70%" y="-70%" width="240%" height="240%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Signal dot glow */}
                <filter id="sig-glow" x="-150%" y="-150%" width="400%" height="400%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Drop shadow for whole icon */}
                <filter id="icon-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#1E40AF" floodOpacity="0.35" />
                </filter>
              </defs>

              {/* ── Whole icon: gentle float animation ── */}
              <g filter="url(#icon-shadow)">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 0,-2; 0,0"
                  dur="4s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                />

                {/* ── CONNECTIONS input→hidden (drawn first, behind nodes) ── */}
                {/* A→D */}<line x1="7" y1="13" x2="25" y2="10" stroke="url(#conn-1)" strokeWidth="0.9" strokeOpacity="0.7" />
                {/* A→E */}<line x1="7" y1="13" x2="25" y2="25" stroke="url(#conn-1)" strokeWidth="0.85" strokeOpacity="0.6" />
                {/* A→F */}<line x1="7" y1="13" x2="25" y2="40" stroke="url(#conn-1)" strokeWidth="0.7"  strokeOpacity="0.35" />
                {/* B→D */}<line x1="7" y1="25" x2="25" y2="10" stroke="url(#conn-1)" strokeWidth="0.85" strokeOpacity="0.6" />
                {/* B→E */}<line x1="7" y1="25" x2="25" y2="25" stroke="url(#conn-1)" strokeWidth="1.1"  strokeOpacity="0.75" />
                {/* B→F */}<line x1="7" y1="25" x2="25" y2="40" stroke="url(#conn-1)" strokeWidth="0.85" strokeOpacity="0.6" />
                {/* C→D */}<line x1="7" y1="37" x2="25" y2="10" stroke="url(#conn-1)" strokeWidth="0.7"  strokeOpacity="0.35" />
                {/* C→E */}<line x1="7" y1="37" x2="25" y2="25" stroke="url(#conn-1)" strokeWidth="0.85" strokeOpacity="0.6" />
                {/* C→F */}<line x1="7" y1="37" x2="25" y2="40" stroke="url(#conn-1)" strokeWidth="0.9"  strokeOpacity="0.7" />

                {/* ── CONNECTIONS hidden→output ── */}
                {/* D→G */}<line x1="25" y1="10" x2="43" y2="18" stroke="url(#conn-2)" strokeWidth="0.9"  strokeOpacity="0.7" />
                {/* D→H */}<line x1="25" y1="10" x2="43" y2="32" stroke="url(#conn-2)" strokeWidth="0.7"  strokeOpacity="0.4" />
                {/* E→G */}<line x1="25" y1="25" x2="43" y2="18" stroke="url(#conn-2)" strokeWidth="1.05" strokeOpacity="0.75" />
                {/* E→H */}<line x1="25" y1="25" x2="43" y2="32" stroke="url(#conn-2)" strokeWidth="1.05" strokeOpacity="0.75" />
                {/* F→G */}<line x1="25" y1="40" x2="43" y2="18" stroke="url(#conn-2)" strokeWidth="0.7"  strokeOpacity="0.4" />
                {/* F→H */}<line x1="25" y1="40" x2="43" y2="32" stroke="url(#conn-2)" strokeWidth="0.9"  strokeOpacity="0.7" />

                {/* ── SIGNAL DOTS (animateMotion along key paths) ── */}
                {/* Signal 1: A → E */}
                <circle r="1.5" fill="#1E40AF" filter="url(#sig-glow)">
                  <animateMotion dur="1.9s" repeatCount="indefinite" begin="0s"
                    path="M7,13 L25,25" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="1.9s" repeatCount="indefinite" begin="0s" />
                </circle>
                {/* Signal 2: B → E → H */}
                <circle r="1.5" fill="#818cf8" filter="url(#sig-glow)">
                  <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.8s"
                    path="M7,25 L25,25 L43,32" />
                  <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
                </circle>
                {/* Signal 3: E → G */}
                <circle r="1.5" fill="#6B46C1" filter="url(#sig-glow)">
                  <animateMotion dur="1.6s" repeatCount="indefinite" begin="1.5s"
                    path="M25,25 L43,18" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="1.6s" repeatCount="indefinite" begin="1.5s" />
                </circle>
                {/* Signal 4: C → F */}
                <circle r="1.2" fill="#1E40AF" filter="url(#sig-glow)">
                  <animateMotion dur="2.1s" repeatCount="indefinite" begin="2.2s"
                    path="M7,37 L25,40" />
                  <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.1s" repeatCount="indefinite" begin="2.2s" />
                </circle>

                {/* ── INPUT LAYER NODES — 3D spheres (cyan, small/far) ── */}
                {/* Node A — drop shadow ellipse for 3D grounding */}
                <ellipse cx="7.6" cy="14.8" rx="3.8" ry="1.1" fill="#000" opacity="0.22" />
                <circle cx="7" cy="13" r="4" fill="url(#sph-in)" filter="url(#nd-glow)">
                  <animate attributeName="r" values="4;4.7;4" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                </circle>
                {/* Specular highlight */}
                <circle cx="5.4" cy="11.4" r="1.1" fill="white" opacity="0.55" />

                <ellipse cx="7.6" cy="26.8" rx="3.8" ry="1.1" fill="#000" opacity="0.22" />
                <circle cx="7" cy="25" r="4" fill="url(#sph-in)" filter="url(#nd-glow)">
                  <animate attributeName="r" values="4;4.7;4" dur="2.9s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                </circle>
                <circle cx="5.4" cy="23.4" r="1.1" fill="white" opacity="0.55" />

                <ellipse cx="7.6" cy="38.8" rx="3.8" ry="1.1" fill="#000" opacity="0.22" />
                <circle cx="7" cy="37" r="4" fill="url(#sph-in)" filter="url(#nd-glow)">
                  <animate attributeName="r" values="4;4.7;4" dur="2.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                </circle>
                <circle cx="5.4" cy="35.4" r="1.1" fill="white" opacity="0.55" />

                {/* ── HIDDEN LAYER NODES — 3D spheres (indigo, medium) ── */}
                <ellipse cx="25.7" cy="12" rx="4.5" ry="1.3" fill="#000" opacity="0.25" />
                <circle cx="25" cy="10" r="4.5" fill="url(#sph-hid)" filter="url(#nd-glow)">
                  <animate attributeName="r" values="4.5;5.3;4.5" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                </circle>
                <circle cx="23.1" cy="8.2" r="1.4" fill="white" opacity="0.52" />

                {/* Center node — largest, most prominent */}
                <ellipse cx="25.7" cy="27.2" rx="5.5" ry="1.6" fill="#000" opacity="0.28" />
                <circle cx="25" cy="25" r="5.5" fill="url(#sph-hid)" filter="url(#nd-glow)">
                  <animate attributeName="r" values="5.5;6.4;5.5" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                </circle>
                <circle cx="22.8" cy="22.8" r="1.8" fill="white" opacity="0.58" />

                <ellipse cx="25.7" cy="42" rx="4.5" ry="1.3" fill="#000" opacity="0.25" />
                <circle cx="25" cy="40" r="4.5" fill="url(#sph-hid)" filter="url(#nd-glow)">
                  <animate attributeName="r" values="4.5;5.3;4.5" dur="2.7s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                </circle>
                <circle cx="23.1" cy="38.2" r="1.4" fill="white" opacity="0.52" />

                {/* ── OUTPUT LAYER NODES — 3D spheres (purple, bright/close) ── */}
                <ellipse cx="43.7" cy="20" rx="4.2" ry="1.2" fill="#000" opacity="0.25" />
                <circle cx="43" cy="18" r="4.2" fill="url(#sph-out)" filter="url(#nd-glow)">
                  <animate attributeName="r" values="4.2;5;4.2" dur="2.3s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                </circle>
                <circle cx="41.2" cy="16.3" r="1.3" fill="white" opacity="0.57" />

                <ellipse cx="43.7" cy="34" rx="4.2" ry="1.2" fill="#000" opacity="0.25" />
                <circle cx="43" cy="32" r="4.2" fill="url(#sph-out)" filter="url(#nd-glow)">
                  <animate attributeName="r" values="4.2;5;4.2" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                </circle>
                <circle cx="41.2" cy="30.3" r="1.3" fill="white" opacity="0.57" />
              </g>
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-sapphire-blue to-deep-amethyst rounded-lg opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                className="group relative text-gray-300 hover:text-sapphire-blue transition-all duration-300 cursor-pointer text-sm font-medium"
              >
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover:scale-105">{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sapphire-blue to-deep-amethyst transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-sapphire-blue/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              </Link>
            ))}

            {/* Cyberpunk Clock Widget */}
            <CyberpunkClock />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden group relative text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/5"
            aria-label="Toggle menu"
          >
            <span className="relative z-10">
              <svg
                className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </span>
            <span className="absolute inset-0 bg-sapphire-blue/20 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 top-16 bg-[#0a0a0f]/95 backdrop-blur-xl animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6 py-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative text-gray-300 hover:text-sapphire-blue transition-all duration-300 cursor-pointer text-2xl font-semibold py-3 px-8 rounded-xl hover:bg-white/5 min-w-[200px] text-center"
                  style={{
                    animation: `fadeInUp 0.3s ease-out forwards ${index * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  <span className="relative z-10 inline-block transition-transform duration-300 group-hover:scale-110">{item.name}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-sapphire-blue/10 to-deep-amethyst/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                </Link>
              ))}

              {/* Mobile Clock Widget */}
              <div className="mt-4">
                <CyberpunkClock />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
