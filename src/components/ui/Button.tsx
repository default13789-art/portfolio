import React, { useState, useRef } from 'react';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050510] relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-sapphire-blue via-deep-amethyst to-gold-luster text-white shadow-lg hover:shadow-gold-glow hover:scale-110',
        premium: 'bg-gradient-to-r from-gold-luster via-sapphire-blue to-deep-amethyst text-white shadow-gold-glow hover:shadow-glow-lg hover:scale-110',
        secondary: 'bg-transparent border-2 border-sapphire-blue text-sapphire-blue hover:bg-sapphire-blue/10 hover:shadow-glow',
        outline: 'border-2 border-gray-600 text-gray-300 hover:border-sapphire-blue hover:text-sapphire-blue hover:shadow-glow',
        ghost: 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  const [ripple, setRipple] = useState(null);
  const buttonRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipple(newRipple);

    setTimeout(() => {
      setRipple(null);
    }, 600);
  };

  const handleMouseMove = (e) => {
    if (!isHovered) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 8;
    const moveY = (y - centerY) / 8;

    setMousePosition({ x: moveX, y: moveY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={(node) => {
        buttonRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className={buttonVariants({ variant, size, className })}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) ${isHovered ? 'scale(1.05)' : 'scale(1)'}`,
      }}
      {...props}
    >
      {children}
      {ripple && (
        <span
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '0',
            height: '0',
          }}
        />
      )}
      <style>{`
        @keyframes ripple {
          to {
            width: 300px;
            height: 300px;
            margin-left: -150px;
            margin-top: -150px;
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
      `}</style>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
