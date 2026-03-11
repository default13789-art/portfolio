/**
 * TiltCard Component Examples
 *
 * This file demonstrates various ways to use the TiltCard component
 * Copy these examples into your application as needed
 */

import React, { useState } from 'react';
import TiltCard from './TiltCard';

/**
 * Example 1: Basic Usage
 * Simple card with default settings
 */
export const BasicExample = () => {
  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
      <TiltCard>
        <h3 style={{ color: 'white', margin: '0 0 12px 0' }}>Basic Tilt Card</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          Hover over me to see the 3D tilt effect!
        </p>
      </TiltCard>
    </div>
  );
};

/**
 * Example 2: Custom Tilt Intensity
 * Adjust how much the card rotates
 */
export const IntensityExample = () => {
  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
      <TiltCard tiltIntensity={5}>
        <h3 style={{ color: 'white', margin: '0 0 12px 0' }}>Subtle Tilt</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Tilt intensity: 5°</p>
      </TiltCard>

      <TiltCard tiltIntensity={15}>
        <h3 style={{ color: 'white', margin: '0 0 12px 0' }}>Default Tilt</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Tilt intensity: 15°</p>
      </TiltCard>

      <TiltCard tiltIntensity={30}>
        <h3 style={{ color: 'white', margin: '0 0 12px 0' }}>Strong Tilt</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Tilt intensity: 30°</p>
      </TiltCard>
    </div>
  );
};

/**
 * Example 3: Custom Glow Colors
 * Different color options for the neon border effect
 */
export const ColorExample = () => {
  return (
    <div style={{
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      flexWrap: 'wrap',
      background: 'linear-gradient(135deg, #050510 0%, #16213e 100%)'
    }}>
      <TiltCard glowColor="#00F5FF">
        <h3 style={{ color: '#00F5FF', margin: '0 0 12px 0' }}>Cyan Glow</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Glow color: #00F5FF</p>
      </TiltCard>

      <TiltCard glowColor="#8A2BE2">
        <h3 style={{ color: '#8A2BE2', margin: '0 0 12px 0' }}>Purple Glow</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Glow color: #8A2BE2</p>
      </TiltCard>

      <TiltCard glowColor="#22c55e">
        <h3 style={{ color: '#22c55e', margin: '0 0 12px 0' }}>Green Glow</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Glow color: #22c55e</p>
      </TiltCard>

      <TiltCard glowColor="#f59e0b">
        <h3 style={{ color: '#f59e0b', margin: '0 0 12px 0' }}>Orange Glow</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Glow color: #f59e0b</p>
      </TiltCard>
    </div>
  );
};

/**
 * Example 4: With Callbacks
 * Track tilt changes with callbacks
 */
export const CallbackExample = () => {
  const [tiltData, setTiltData] = useState({ rotateX: 0, rotateY: 0 });

  return (
    <div style={{
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      background: '#0f0f23'
    }}>
      <TiltCard
        tiltIntensity={20}
        glowColor="#ff6b6b"
        onTiltStart={() => console.log('Tilt started')}
        onTiltEnd={() => console.log('Tilt ended')}
        onTiltChange={(data) => setTiltData(data)}
      >
        <h3 style={{ color: '#ff6b6b', margin: '0 0 12px 0' }}>Interactive Card</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          Move your mouse to see real-time tilt data
        </p>
      </TiltCard>

      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '16px 24px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        color: '#fff'
      }}>
        <div>Rotate X: {tiltData.rotateX.toFixed(1)}°</div>
        <div>Rotate Y: {tiltData.rotateY.toFixed(1)}°</div>
      </div>
    </div>
  );
};

/**
 * Example 5: Disabled Tilt
 * Useful for touch devices or when you want a static glassmorphism card
 */
export const DisabledExample = () => {
  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
      <TiltCard disabled={true}>
        <h3 style={{ color: 'white', margin: '0 0 12px 0' }}>Static Card</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          Tilt effect is disabled
        </p>
      </TiltCard>

      <TiltCard>
        <h3 style={{ color: 'white', margin: '0 0 12px 0' }}>Interactive Card</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          Tilt effect is enabled
        </p>
      </TiltCard>
    </div>
  );
};

/**
 * Example 6: Feature Cards
 * Practical use case for feature highlights
 */
export const FeatureCardsExample = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized performance with GPU acceleration',
      glowColor: '#fbbf24'
    },
    {
      icon: '🎨',
      title: 'Customizable',
      description: 'Easy to style with props and CSS classes',
      glowColor: '#ec4899'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Works seamlessly on all devices',
      glowColor: '#8b5cf6'
    },
    {
      icon: '♿',
      title: 'Accessible',
      description: 'Respects motion preferences',
      glowColor: '#10b981'
    }
  ];

  return (
    <div style={{
      padding: '60px 40px',
      background: 'linear-gradient(135deg, #0f0f23 0%, #050510 100%)'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: 'white',
        marginBottom: '48px',
        fontSize: '2.5rem',
        fontWeight: 'bold'
      }}>
        Key Features
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {features.map((feature, index) => (
          <TiltCard
            key={index}
            tiltIntensity={12}
            glowColor={feature.glowColor}
            className="feature-card"
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '16px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                color: feature.glowColor,
                margin: '0 0 12px 0',
                fontSize: '1.5rem'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.7)',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
};

/**
 * Example 7: Profile Card
 * Social media profile style card
 */
export const ProfileCardExample = () => {
  return (
    <div style={{
      padding: '60px 40px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <TiltCard
        tiltIntensity={15}
        glowColor="#ffffff"
        style={{ maxWidth: '350px' }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: 'white',
            fontWeight: 'bold'
          }}>
            JD
          </div>

          <h3 style={{
            color: 'white',
            margin: '0 0 8px 0',
            fontSize: '1.75rem',
            fontWeight: 'bold'
          }}>
            omik
          </h3>

          <p style={{
            color: 'rgba(255,255,255,0.6)',
            margin: '0 0 20px 0',
            fontSize: '0.95rem'
          }}>
            Full Stack Developer
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.8)',
            margin: '0 0 24px 0',
            lineHeight: '1.6',
            fontSize: '0.9rem'
          }}>
            Passionate about creating beautiful and functional web experiences
          </p>

          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center'
          }}>
            {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
              <button
                key={social}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.2)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {social}
              </button>
            ))}
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

/**
 * Example 8: With Custom Styling
 * Demonstrates using the className prop
 */
export const StyledExample = () => {
  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <TiltCard
        className="custom-tilt-card"
        tiltIntensity={20}
        glowColor="#06b6d4"
      >
        <div style={{
          background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'white', margin: '0 0 12px 0', fontSize: '2rem' }}>
            Custom Styled Card
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>
            Combine TiltCard with your own styles
          </p>
        </div>
      </TiltCard>
    </div>
  );
};

// Export all examples
export default {
  BasicExample,
  IntensityExample,
  ColorExample,
  CallbackExample,
  DisabledExample,
  FeatureCardsExample,
  ProfileCardExample,
  StyledExample,
};
