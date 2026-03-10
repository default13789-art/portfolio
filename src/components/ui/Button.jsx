import React, { useState, useRef } from 'react';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0f] relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-[#05b5d4] to-[#a855f7] text-white shadow-lg hover:shadow-[0_0_30px_rgba(60,230,249,0.5)] hover:scale-110',
        secondary: 'bg-transparent border-2 border-[#16ddfa] text-[#3ce6f9] hover:bg-[#16ddfa]/10 hover:border-[#3ce6f9] hover:shadow-[0_0_20px_rgba(60,230,249,0.3)]',
        outline: 'border-2 border-gray-600 text-gray-300 hover:border-[#16ddfa] hover:text-[#3ce6f9] hover:shadow-[0_0_15px_rgba(60,230,249,0.2)]',
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
