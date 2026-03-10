import React from 'react';

// HUD Corner Decorations
export const HUDCorners = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`}>
    <div className="hud-corner hud-corner-tl" />
    <div className="hud-corner hud-corner-tr" />
    <div className="hud-corner hud-corner-bl" />
    <div className="hud-corner hud-corner-br" />
  </div>
);

// Binary Code Stream
export const BinaryStream = ({ density = 'medium' }) => {
  const lines = density === 'high' ? 20 : density === 'low' ? 5 : 10;

  const generateBinary = () => {
    return Array(8).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('');
  };

  return (
    <div className="binary-decorator">
      {Array(lines).fill(0).map((_, i) => (
        <div key={i} style={{ animationDelay: `${i * 0.5}s` }}>
          {generateBinary()} {generateBinary()} {generateBinary()}
        </div>
      ))}
    </div>
  );
};

// Circuit Board Pattern
export const CircuitPattern = ({ className = '' }) => (
  <div className={`circuit-pattern ${className}`} />
);

// Hexagon Pattern
export const HexPattern = ({ className = '' }) => (
  <div className={`hex-pattern ${className}`} />
);

// Data Visualization Bars
export const DataBars = ({ count = 10, className = '' }) => (
  <div className={`data-bars ${className}`}>
    {Array(count).fill(0).map((_, i) => (
      <div
        key={i}
        className="data-bar"
        style={{
          height: `${20 + Math.random() * 80}%`,
          animationDelay: `${i * 0.1}s`
        }}
      />
    ))}
  </div>
);

// Status Indicator
export const StatusIndicator = ({ status = 'online', text }) => {
  const statusColors = {
    online: '#3ce6f9',
    offline: '#ef4444',
    busy: '#f59e0b',
    processing: '#a855f7'
  };

  return (
    <div className="status-indicator" style={{ color: statusColors[status] }}>
      {text || status}
    </div>
  );
};

// Tech Frame
export const TechFrame = ({ children, className = '' }) => (
  <div className={`tech-frame ${className}`}>
    {children}
  </div>
);

// Animated Border Container
export const AnimatedBorder = ({ children, className = '' }) => (
  <div className={`animated-border ${className}`}>
    {children}
  </div>
);

// HUD Line Decorations
export const HUDLines = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Horizontal lines */}
    <div className="absolute top-[25%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3ce6f9]/30 to-transparent" />
    <div className="absolute top-[50%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c084fc]/30 to-transparent" />
    <div className="absolute top-[75%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3ce6f9]/30 to-transparent" />

    {/* Vertical lines */}
    <div className="absolute top-0 bottom-0 left-[25%] w-px bg-gradient-to-b from-transparent via-[#c084fc]/30 to-transparent" />
    <div className="absolute top-0 bottom-0 left-[50%] w-px bg-gradient-to-b from-transparent via-[#3ce6f9]/30 to-transparent" />
    <div className="absolute top-0 bottom-0 left-[75%] w-px bg-gradient-to-b from-transparent via-[#c084fc]/30 to-transparent" />
  </div>
);

// Grid Overlay
export const GridOverlay = ({ size = 50, opacity = 0.1 }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `
        linear-gradient(rgba(60, 230, 249, ${opacity}) 1px, transparent 1px),
        linear-gradient(90deg, rgba(60, 230, 249, ${opacity}) 1px, transparent 1px)
      `,
      backgroundSize: `${size}px ${size}px`
    }}
  />
);

// Code Snippet Decoration
export const CodeSnippet = ({ code = 'const ai = new Future();' }) => (
  <div className="font-mono text-xs text-[#3ce6f9]/40 select-none pointer-events-none">
    {code}
  </div>
);

// Metrics Display
export const MetricsDisplay = ({ metrics = [] }) => (
  <div className="flex gap-6 font-mono text-xs">
    {metrics.map((metric, i) => (
      <div key={i} className="flex items-center gap-2">
        <span className="text-gray-500">{metric.label}:</span>
        <span className="text-[#3ce6f9]">{metric.value}</span>
      </div>
    ))}
  </div>
);

// Glitch Text Effect
export const GlitchText = ({ text, className = '' }) => (
  <span className={`glitch-effect inline-block ${className}`}>
    {text}
  </span>
);

// Matrix Rain (Subtle Background)
export const MatrixRain = ({ className = '' }) => (
  <div className={`matrix-rain ${className}`} />
);

// Target Reticle
export const TargetReticle = ({ size = 100 }) => (
  <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    style={{ width: size, height: size }}
  >
    {/* Outer circle */}
    <div className="absolute inset-0 border border-[#3ce6f9]/30 rounded-full animate-pulse" />

    {/* Inner circle */}
    <div
      className="absolute inset-[20%] border border-[#c084fc]/30 rounded-full"
      style={{ animation: 'pulse 2s ease-in-out infinite' }}
    />

    {/* Crosshairs */}
    <div className="absolute top-1/2 left-0 right-0 h-px bg-[#3ce6f9]/20 -translate-y-1/2" />
    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#3ce6f9]/20 -translate-x-1/2" />

    {/* Corner brackets */}
    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#3ce6f9]/40" />
    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#3ce6f9]/40" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#3ce6f9]/40" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#3ce6f9]/40" />
  </div>
);

// Progress Ring
export const ProgressRing = ({ progress = 75, size = 60, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(60, 230, 249, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3ce6f9" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-mono text-[#3ce6f9]">{progress}%</span>
      </div>
    </div>
  );
};

// Loading Spinner (AI Themed)
export const AISpinner = ({ size = 40 }) => (
  <div className="relative" style={{ width: size, height: size }}>
    {/* Outer ring */}
    <div
      className="absolute inset-0 border-2 border-transparent border-t-[#3ce6f9] rounded-full animate-spin"
      style={{ animationDuration: '1s' }}
    />

    {/* Middle ring */}
    <div
      className="absolute inset-2 border-2 border-transparent border-t-[#c084fc] rounded-full animate-spin"
      style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
    />

    {/* Inner dot */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-2 h-2 bg-[#3ce6f9] rounded-full animate-pulse" />
    </div>
  </div>
);

// Combines multiple HUD elements
export const HUDOverlay = ({ children }) => (
  <div className="relative">
    {/* Background effects */}
    <GridOverlay />
    <CircuitPattern />

    {/* HUD lines */}
    <HUDLines />

    {/* Content */}
    {children}

    {/* Corner decorations */}
    <HUDCorners />
  </div>
);

export default {
  HUDCorners,
  BinaryStream,
  CircuitPattern,
  HexPattern,
  DataBars,
  StatusIndicator,
  TechFrame,
  AnimatedBorder,
  HUDLines,
  GridOverlay,
  CodeSnippet,
  MetricsDisplay,
  GlitchText,
  MatrixRain,
  TargetReticle,
  ProgressRing,
  AISpinner,
  HUDOverlay
};
