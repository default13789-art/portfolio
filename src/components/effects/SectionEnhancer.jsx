import React from 'react';
import { HUDCorners, StatusIndicator, DataBars, CodeSnippet } from './HUDDecorations';

// Section wrapper with AI interface decorations
export const AIFrame = ({
  children,
  showCorners = true,
  showStatus = false,
  showData = false,
  showCode = false,
  statusText = 'ACTIVE',
  className = ''
}) => (
  <div className={`relative ${className}`}>
    {/* HUD Corners */}
    {showCorners && <HUDCorners />}

    {/* Status Indicator */}
    {showStatus && (
      <div className="absolute top-4 right-4">
        <StatusIndicator status="online" text={statusText} />
      </div>
    )}

    {/* Data Bars */}
    {showData && (
      <div className="absolute bottom-4 left-4">
        <DataBars count={8} className="h-8" />
      </div>
    )}

    {/* Code Snippet */}
    {showCode && (
      <div className="absolute bottom-4 right-4">
        <CodeSnippet code="init_sequence(); // AI_READY" />
      </div>
    )}

    {/* Content */}
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

// Glowing border frame
export const GlowFrame = ({ children, className = '', color = 'cyan' }) => {
  const colors = {
    cyan: 'from-[#00f3ff] to-[#ff00ff]',
    purple: 'from-[#ff00ff] to-[#ff00ff]',
    green: 'from-[#22c55e] to-[#00f3ff]'
  };

  return (
    <div className={`relative p-[1px] rounded-lg bg-gradient-to-r ${colors[color]} ${className}`}>
      <div className="relative bg-[#050505] rounded-lg">
        {children}
      </div>
    </div>
  );
};

// Section header with tech styling
export const TechSectionHeader = ({
  title,
  subtitle,
  icon,
  badge = null
}) => (
  <div className="text-center mb-16">
    {/* Badge */}
    {badge && (
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass-card rounded-full">
        <span className="w-2 h-2 bg-[#00f3ff] rounded-full animate-pulse" />
        <span className="text-sm font-mono text-[#00f3ff]">{badge}</span>
      </div>
    )}

    {/* Icon */}
    {icon && (
      <div className="flex justify-center mb-6">
        <div className="p-4 glass-card rounded-2xl">
          {icon}
        </div>
      </div>
    )}

    {/* Title */}
    <h2 className="heading-xl gradient-text neon-text mb-4">
      {title}
    </h2>

    {/* Subtitle */}
    {subtitle && (
      <p className="body-text text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}

    {/* Decorative line */}
    <div className="flex items-center justify-center gap-4 mt-8">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00f3ff]" />
      <div className="w-2 h-2 bg-[#00f3ff] rounded-full animate-pulse" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#ff00ff]" />
    </div>
  </div>
);

// Card hover effect container
export const HoverCard = ({
  children,
  className = '',
  glowOnHover = true
}) => (
  <div
    className={`relative group transition-all duration-300 ${glowOnHover ? 'hover:shadow-[0_0_30px_rgba(60,230,249,0.2)]' : ''} ${className}`}
  >
    {/* Scanning line effect on hover */}
    <div className="absolute inset-0 overflow-hidden rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f3ff]/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000" />
    </div>

    {children}
  </div>
);

// Animated background pattern
export const AnimatedPattern = ({ type = 'grid', className = '' }) => {
  const patterns = {
    grid: 'bg-grid-pattern',
    dots: 'radial-gradient(circle, rgba(60, 230, 249, 0.1) 1px, transparent 1px)',
    lines: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(60, 230, 249, 0.03) 10px, rgba(60, 230, 249, 0.03) 11px)'
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${patterns[type]} ${className}`}
      style={type === 'dots' ? { backgroundSize: '20px 20px' } : {}}
    />
  );
};

// Info tooltip with tech styling
export const TechTooltip = ({ children, content }) => (
  <div className="group relative inline-block">
    {children}

    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 glass-card rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
      <div className="text-xs font-mono text-[#00f3ff]">{content}</div>
      {/* Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#050505]/80" />
    </div>
  </div>
);

// Progress bar with tech styling
export const TechProgressBar = ({ progress, label, color = 'cyan' }) => {
  const colors = {
    cyan: 'from-[#00f3ff] to-[#ff00ff]',
    purple: 'from-[#ff00ff] to-[#ff00ff]',
    green: 'from-[#22c55e] to-[#00f3ff]'
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="font-mono text-[#00f3ff]">{progress}%</span>
      </div>

      <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        {/* Progress fill */}
        <div
          className="relative h-full bg-gradient-to-r rounded-full transition-all duration-1000"
          style={{
            width: `${progress}%`,
            background: colors[color]
          }}
        >
          {/* Glowing edge */}
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
      </div>
    </div>
  );
};

// Tag/chip with tech styling
export const TechTag = ({ children, variant = 'default', size = 'md' }) => {
  const variants = {
    default: 'bg-[#00f3ff]/10 border-[#00f3ff]/30 text-[#00f3ff]',
    purple: 'bg-[#ff00ff]/10 border-[#ff00ff]/30 text-[#ff00ff]',
    success: 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]',
    warning: 'bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full font-mono transition-all duration-200 hover:scale-105 ${variants[variant]} ${sizes[size]}`}
    >
      <span className="w-1 h-1 rounded-full bg-current" />
      {children}
    </span>
  );
};

// Decorative corner accent
export const CornerAccent = ({ position = 'top-left' }) => {
  const positions = {
    'top-left': 'top-0 left-0 border-t-2 border-l-2',
    'top-right': 'top-0 right-0 border-t-2 border-r-2',
    'bottom-left': 'bottom-0 left-0 border-b-2 border-l-2',
    'bottom-right': 'bottom-0 right-0 border-b-2 border-r-2'
  };

  return (
    <div
      className={`absolute w-8 h-8 border-[#00f3ff]/30 ${positions[position]}`}
      style={{
        borderRadius: position.includes('top') ? '4px 0 0 0' : '0 0 0 4px'
      }}
    />
  );
};

export default {
  AIFrame,
  GlowFrame,
  TechSectionHeader,
  HoverCard,
  AnimatedPattern,
  TechTooltip,
  TechProgressBar,
  TechTag,
  CornerAccent
};
