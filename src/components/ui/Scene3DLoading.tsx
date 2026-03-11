import React from 'react';

/**
 * Scene3DLoading - Loading placeholder for 3D scenes
 * Provides a visually consistent loading state while 3D components are being loaded
 */
const Scene3DLoading = () => {
  return (
    <div
      className="universe-scene-loading absolute inset-0 flex items-center justify-center"
      style={{
        background: 'linear-gradient(to bottom, #0a0a0a, #050510)',
        animation: 'pulse-subtle 2s ease-in-out infinite'
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Loading spinner */}
        <div className="relative">
          <div
            className="w-12 h-12 border-4 border-[#00F5FF]/20 border-t-[#00F5FF] rounded-full animate-spin"
            style={{
              boxShadow: '0 0 20px rgba(60, 230, 249, 0.3)'
            }}
          />
        </div>

        {/* Loading text */}
        <p className="text-[#00F5FF] text-sm animate-pulse">
          Loading 3D Experience...
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default Scene3DLoading;
