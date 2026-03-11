/**
 * UniverseExample - A simple example demonstrating the 3D Universe Scene
 *
 * This file shows how to use the UniverseScene component
 * as a standalone demo or for testing purposes.
 */

import React from 'react';
import UniverseScene from './UniverseScene';

const UniverseExample = () => {
  return (
    <div className="relative w-full h-screen">
      {/* The 3D Universe Background */}
      <UniverseScene starCount={4000} />

      {/* Sample content overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">
            3D Universe Scene
          </h1>
          <p className="text-xl text-gray-300">
            A lightweight, performant space background
          </p>
          <div className="mt-8 text-sm text-gray-400">
            <p>Move your mouse to interact with the camera and grid</p>
            <p>Watch the stars twinkle and the neon grid undulate</p>
          </div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-0" />
    </div>
  );
};

export default UniverseExample;
