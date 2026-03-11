import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

/**
 * Sound Effects System for AI Interface
 *
 * Provides subtle UI sound effects for interactions.
 * Prepared for future use - sounds are disabled by default.
 *
 * Usage:
 * 1. Wrap app with SoundProvider
 * 2. Use useSounds() hook in components
 * 3. Call sound.play('hover') etc.
 */

const SoundContext = createContext(null);

// Sound effect types
export const SoundType = {
  HOVER: 'hover',
  CLICK: 'click',
  SUCCESS: 'success',
  ERROR: 'error',
  TYPING: 'typing',
  NOTIFICATION: 'notification',
  SCAN: 'scan'
};

// Sound provider component
export const SoundProvider = ({ children }) => {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRefs = useRef({});

  // Initialize audio contexts (prepared for future sound files)
  useEffect(() => {
    // Audio files would be loaded here
    // For now, this is prepared structure
    const sounds = Object.values(SoundType);

    sounds.forEach(sound => {
      audioRefs.current[sound] = {
        play: () => {
          if (!enabled) return;
          // Sound playback logic here
          console.log(`[Sound] ${sound} (volume: ${volume})`);
        }
      };
    });

    return () => {
      // Cleanup
    };
  }, [enabled, volume]);

  const play = (type) => {
    const sound = audioRefs.current[type];
    if (sound) {
      sound.play();
    }
  };

  const toggle = () => setEnabled(prev => !prev);

  const value = {
    enabled,
    volume,
    setVolume,
    play,
    toggle
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};

// Hook to use sounds in components
export const useSounds = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSounds must be used within SoundProvider');
  }
  return context;
};

// Sound toggle button component
export const SoundToggle = () => {
  const { enabled, toggle } = useSounds();

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 left-4 z-50 p-3 glass-card rounded-full hover:scale-110 transition-transform"
      aria-label={enabled ? 'Disable sounds' : 'Enable sounds'}
      title={enabled ? 'Sounds On' : 'Sounds Off'}
    >
      {enabled ? (
        <svg className="w-5 h-5 text-[#00F5FF]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      )}
    </button>
  );
};

// Higher-order component for sound-enabled buttons
export const withSound = (Component, soundType = SoundType.CLICK) => {
  return function SoundComponent(props) {
    const { play, enabled } = useSounds();
    const soundRef = useRef(null);

    const handleClick = (e) => {
      if (enabled) {
        play(soundType);
      }
      if (props.onClick) {
        props.onClick(e);
      }
    };

    const handleMouseEnter = () => {
      if (enabled && soundType === SoundType.HOVER) {
        play(SoundType.HOVER);
      }
    };

    return (
      <Component
        {...props}
        ref={soundRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      />
    );
  };
};

// Sound effect hooks for common interactions
export const useHoverSound = () => {
  const { play, enabled } = useSounds();

  return () => {
    if (enabled) {
      play(SoundType.HOVER);
    }
  };
};

export const useClickSound = () => {
  const { play, enabled } = useSounds();

  return () => {
    if (enabled) {
      play(SoundType.CLICK);
    }
  };
};

export const useSuccessSound = () => {
  const { play, enabled } = useSounds();

  return () => {
    if (enabled) {
      play(SoundType.SUCCESS);
    }
  };
};

export default {
  SoundProvider,
  useSounds,
  SoundToggle,
  withSound,
  useHoverSound,
  useClickSound,
  useSuccessSound,
  SoundType
};
