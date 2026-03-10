import React, { useState, useEffect } from 'react';
import './cyberpunk-clock.css';

const CyberpunkClock = () => {
  const [time, setTime] = useState(new Date());
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Random glitch effect every 5-10 seconds
    const glitchTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(glitchTimer);
    };
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return { hours, minutes, seconds };
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div
      className={`cyberpunk-clock-container ${glitchActive ? 'animate-glitch' : ''}`}
      onMouseEnter={() => setGlitchActive(true)}
      onMouseLeave={() => setGlitchActive(false)}
    >
      {/* Main Clock Widget */}
      <div className="relative group cursor-pointer transition-all duration-300">
        {/* Clock Display */}
        <div className="relative bg-gradient-to-br from-[#050505] to-[#1a1a2e] border border-cyan-500/30 rounded-lg p-3 overflow-hidden shadow-lg shadow-cyan-500/10">
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="scanline"></div>
          </div>

          {/* Tech Border Decorations */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>

          {/* Matrix Background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="matrix-bg w-full h-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center gap-2">
            {/* Digital Time */}
            <div className="font-mono text-base md:text-lg tracking-wider">
              <span
                className="text-cyan-400 neon-text"
                style={{ color: '#00f3ff' }}
              >
                {hours}
              </span>
              <span
                className="text-magenta-500 animate-pulse mx-0.5"
                style={{ color: '#d946ef' }}
              >
                :
              </span>
              <span
                className="text-cyan-400 neon-text"
                style={{ color: '#00f3ff' }}
              >
                {minutes}
              </span>
              <span
                className="text-magenta-500 animate-pulse mx-0.5"
                style={{ color: '#d946ef' }}
              >
                :
              </span>
              <span
                className="neon-text"
                style={{ color: '#ffff00' }}
              >
                {seconds}
              </span>
            </div>

            {/* Vertical Separator */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent hidden sm:block"></div>

            {/* Date & Location */}
            <div className="flex flex-col justify-center hidden sm:flex">
              <div className="text-[10px] text-gray-400 uppercase tracking-widest">
                {formatDate(time)}
              </div>
              <div className="text-[9px] text-cyan-500/80 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Bogura, BD
              </div>
            </div>
          </div>

          {/* Weather Badge */}
          <div className="absolute -right-10 sm:-right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5">
            <div className="text-sm sm:text-base">🌡️</div>
            <div className="text-[10px] sm:text-xs font-mono" style={{ color: '#ffff00' }}>
              28°C
            </div>
            <div className="text-[8px] text-gray-500">HUMID</div>
          </div>

          {/* Glitch Overlay */}
          {glitchActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent pointer-events-none"></div>
          )}
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

        {/* Neon Accent Line */}
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500 transition-all duration-500 rounded-full"></div>
      </div>

      {/* Status Indicators */}
      <div className="flex gap-1">
        <div
          className="w-1 h-1 rounded-full animate-pulse"
          style={{ backgroundColor: '#00f3ff' }}
        ></div>
        <div
          className="w-1 h-1 rounded-full animate-pulse"
          style={{ backgroundColor: '#d946ef', animationDelay: '0.2s' }}
        ></div>
        <div
          className="w-1 h-1 rounded-full animate-pulse"
          style={{ backgroundColor: '#ffff00', animationDelay: '0.4s' }}
        ></div>
      </div>
    </div>
  );
};

export default CyberpunkClock;
