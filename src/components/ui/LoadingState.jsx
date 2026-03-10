import React, { useState, useEffect } from 'react';

const LoadingState = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING');
  const [currentPhase, setCurrentPhase] = useState(0);

  const loadingPhases = [
    'INITIALIZING',
    'LOADING ASSETS',
    'CALIBRATING NEURAL NETWORKS',
    'ESTABLISHING CONNECTION',
    'ACCESSING MAINFRAME',
    'DECRYPTING DATA',
    'RENDERING INTERFACE',
    'READY'
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 50);

    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => {
        if (prev >= loadingPhases.length - 1) {
          clearInterval(phaseInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phaseInterval);
    };
  }, []);

  useEffect(() => {
    setLoadingText(loadingPhases[currentPhase]);
  }, [currentPhase]);

  useEffect(() => {
    if (progress === 100 && onComplete) {
      setTimeout(onComplete, 500);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]">
      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(60, 230, 249, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(60, 230, 249, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* Pulsing Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-[#00f3ff] rounded-full blur-[100px] opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#ff00ff] rounded-full blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00f3ff] rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Main Loading Container */}
      <div className="relative z-10 w-full max-w-2xl px-8">
        {/* Logo/Brand Animation */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            {/* Rotating Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-32 h-32 border-2 border-[#00f3ff]/30 rounded-full animate-spin"
                style={{ animationDuration: '3s' }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-24 h-24 border-2 border-[#ff00ff]/30 rounded-full animate-spin"
                style={{ animationDuration: '2s', animationDirection: 'reverse' }}
              />
            </div>

            {/* Central Text */}
            <div className="relative z-10 w-16 h-16 flex items-center justify-center">
              <span className="text-4xl font-black gradient-text neon-text">Omik</span>
            </div>
          </div>
        </div>

        {/* Loading Text with Typing Effect */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-lg">
            <span className="text-[#00f3ff] font-mono text-sm">&gt;</span>
            <span className="text-gray-300 font-mono text-lg tracking-wider">{loadingText}</span>
            <span className="typing-cursor" />
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="relative">
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00f3ff]/20 to-[#ff00ff]/20 rounded-lg blur-lg" />

          {/* Progress Bar Background */}
          <div className="relative glass-card rounded-lg p-6">
            {/* Progress Info */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-sm font-mono">SYSTEM STATUS</span>
              <span className="text-[#00f3ff] font-mono text-lg font-bold">{Math.round(progress)}%</span>
            </div>

            {/* Progress Bar Track */}
            <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
              {/* Animated Background Grid */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(60, 230, 249, 0.3) 2px, rgba(60, 230, 249, 0.3) 4px)'
                }}
              />

              {/* Progress Fill */}
              <div
                className="relative h-full bg-gradient-to-r from-[#00f3ff] via-[#00f3ff] to-[#ff00ff] rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer Effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                  style={{ animation: 'shimmer 1.5s infinite' }}
                />
              </div>

              {/* Glowing Leading Edge */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-[0_0_10px_rgba(60,230,249,0.8)] transition-all duration-100 ease-out"
                style={{ left: `${progress}%` }}
              />
            </div>

            {/* Binary Data Stream */}
            <div className="mt-4 flex justify-between items-center font-mono text-xs text-gray-500">
              <span className="animate-pulse">01101000 01100101 01101100 01101100 01101111</span>
              <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>10101010 11010010 00110101</span>
            </div>
          </div>
        </div>

        {/* Data Visualization Elements */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card rounded-lg p-4">
              <div className="text-gray-500 text-xs font-mono mb-2">NODE_0{i + 1}</div>
              <div className="h-16 flex items-end justify-between gap-1">
                {[...Array(8)].map((_, j) => (
                  <div
                    key={j}
                    className="flex-1 bg-gradient-to-t from-[#00f3ff] to-[#ff00ff] rounded-sm transition-all duration-300"
                    style={{
                      height: `${Math.random() * 100}%`,
                      opacity: 0.3 + Math.random() * 0.7,
                      animation: `pulse ${1 + Math.random()}s ease-in-out infinite`,
                      animationDelay: `${j * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Status */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 text-xs font-mono text-gray-600">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              ONLINE
            </span>
            <span>|</span>
            <span>v2.0.26</span>
            <span>|</span>
            <span>REACT</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.7;
            transform: scaleY(0.8);
          }
        }

        .typing-cursor {
          display: inline-block;
          width: 3px;
          height: 1.2em;
          background-color: #00f3ff;
          margin-left: 4px;
          animation: blink 1s infinite;
          vertical-align: text-bottom;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
