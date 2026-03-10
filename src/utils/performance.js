import { useRef, useEffect } from 'react'

/**
 * Performance utilities for optimizing 3D rendering based on device capabilities
 * Detects GPU/memory, adjusts particle counts, implements LOD, and frame rate throttling
 */

// Device capability detection
let deviceTierCache = null
let webglCapabilities = null

/**
 * Detect device capabilities and return tier (high/medium/low)
 * @returns {string} Device tier: 'high' | 'medium' | 'low'
 */
export function detectDeviceTier() {
  if (deviceTierCache) {
    return deviceTierCache
  }

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4

  // Check device memory (if available)
  const memory = navigator.deviceMemory || 4

  // Check for mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )

  // WebGL capability detection
  let maxTextureSize = 2048
  let maxRenderbufferSize = 2048
  let maxVertexAttributes = 8

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (gl) {
      maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
      maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE)
      maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)

      webglCapabilities = {
        maxTextureSize,
        maxRenderbufferSize,
        maxVertexAttributes,
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER)
      }
    }
  } catch (e) {
    console.warn('WebGL detection failed:', e)
  }

  // Calculate device score
  let score = 0

  // CPU score (0-30 points)
  score += Math.min(cores * 3, 30)

  // Memory score (0-30 points)
  score += Math.min(memory * 5, 30)

  // WebGL score (0-40 points)
  score += Math.min((maxTextureSize / 4096) * 20, 20)
  score += Math.min((maxVertexAttributes / 16) * 20, 20)

  // Mobile penalty
  if (isMobile) {
    score *= 0.6
  }

  // Determine tier based on score
  if (score >= 70 && !isMobile) {
    deviceTierCache = 'high'
  } else if (score >= 40) {
    deviceTierCache = 'medium'
  } else {
    deviceTierCache = 'low'
  }

  console.log(`[Performance] Device tier: ${deviceTierCache} (score: ${score.toFixed(1)})`, {
    cores,
    memory,
    isMobile,
    webgl: webglCapabilities
  })

  return deviceTierCache
}

/**
 * Get adjusted particle count based on device tier
 * @param {number} baseCount - Base particle count for high-end devices
 * @returns {number} Adjusted particle count
 */
export function getParticleCount(baseCount) {
  const tier = detectDeviceTier()

  switch (tier) {
    case 'high':
      return baseCount
    case 'medium':
      return Math.floor(baseCount * 0.6)
    case 'low':
      return Math.floor(baseCount * 0.3)
    default:
      return baseCount
  }
}

/**
 * Get configuration based on device tier
 * @returns {Object} Performance configuration
 */
export function getPerformanceConfig() {
  const tier = detectDeviceTier()

  const configs = {
    high: {
      particleMultiplier: 1.0,
      enableShadows: true,
      enablePostProcessing: true,
      enableGlow: true,
      maxFPS: 144,
      lodDistance: 100,
      textureSize: 2048
    },
    medium: {
      particleMultiplier: 0.6,
      enableShadows: true,
      enablePostProcessing: false,
      enableGlow: true,
      maxFPS: 60,
      lodDistance: 70,
      textureSize: 1024
    },
    low: {
      particleMultiplier: 0.3,
      enableShadows: false,
      enablePostProcessing: false,
      enableGlow: false,
      maxFPS: 30,
      lodDistance: 50,
      textureSize: 512
    }
  }

  return configs[tier]
}

/**
 * Hook for frame rate throttling
 * @param {number} targetFPS - Target FPS (default: from device config)
 * @returns {Object} Throttle utilities
 */
export function useFrameThrottle(targetFPS = null) {
  const lastFrameTime = useRef(0)
  const frameInterval = useRef(1000 / (targetFPS || getPerformanceConfig().maxFPS))
  const deltaTime = useRef(0)
  const shouldUpdate = useRef(true)

  useEffect(() => {
    if (targetFPS) {
      frameInterval.current = 1000 / targetFPS
    }
  }, [targetFPS])

  /**
   * Check if frame should be updated based on throttle
   * @param {number} currentTime - Current time from clock
   * @returns {boolean} True if frame should update
   */
  const checkUpdate = (currentTime) => {
    const elapsed = currentTime - lastFrameTime.current

    if (elapsed >= frameInterval.current) {
      lastFrameTime.current = currentTime - (elapsed % frameInterval.current)
      deltaTime.current = elapsed / 1000
      shouldUpdate.current = true
    } else {
      shouldUpdate.current = false
    }

    return shouldUpdate.current
  }

  /**
   * Get delta time for the last frame
   * @returns {number} Delta time in seconds
   */
  const getDelta = () => deltaTime.current

  return {
    checkUpdate,
    getDelta,
    shouldUpdate: () => shouldUpdate.current,
    frameInterval: frameInterval.current
  }
}

/**
 * Calculate LOD level based on distance
 * @param {number} distance - Distance from camera
 * @param {string} tier - Device tier
 * @returns {number} LOD level (0-2, where 0 is highest quality)
 */
export function calculateLOD(distance, tier = null) {
  const config = getPerformanceConfig()
  const lodDistance = config.lodDistance

  if (distance < lodDistance * 0.5) {
    return 0 // High detail
  } else if (distance < lodDistance) {
    return 1 // Medium detail
  } else {
    return 2 // Low detail
  }
}

/**
 * Check if feature should be enabled based on device tier
 * @param {string} feature - Feature name
 * @returns {boolean} True if feature should be enabled
 */
export function isFeatureEnabled(feature) {
  const config = getPerformanceConfig()
  return config[feature] !== undefined ? config[feature] : true
}

/**
 * Get WebGL capabilities
 * @returns {Object|null} WebGL capabilities or null
 */
export function getWebGLCapabilities() {
  return webglCapabilities
}

/**
 * Clear device tier cache (useful for testing)
 */
export function clearDeviceCache() {
  deviceTierCache = null
  webglCapabilities = null
}

/**
 * Monitor performance and adjust quality dynamically
 * @returns {Object} Performance monitoring utilities
 */
export function usePerformanceMonitor() {
  const fps = useRef(60)
  const frameCount = useRef(0)
  const lastFPSCheck = useRef(Date.now())
  const qualityLevel = useRef(1.0)

  /**
   * Update FPS counter
   */
  const updateFPS = () => {
    frameCount.current++
    const now = Date.now()

    if (now - lastFPSCheck.current >= 1000) {
      fps.current = frameCount.current
      frameCount.current = 0
      lastFPSCheck.current = now

      // Adjust quality based on FPS
      const targetFPS = getPerformanceConfig().maxFPS

      if (fps.current < targetFPS * 0.6) {
        // Reduce quality if FPS is too low
        qualityLevel.current = Math.max(0.5, qualityLevel.current - 0.1)
      } else if (fps.current > targetFPS * 0.9) {
        // Increase quality if FPS is good
        qualityLevel.current = Math.min(1.0, qualityLevel.current + 0.05)
      }
    }
  }

  /**
   * Get current FPS
   */
  const getFPS = () => fps.current

  /**
   * Get current quality level
   */
  const getQuality = () => qualityLevel.current

  /**
   * Reset quality level
   */
  const resetQuality = () => {
    qualityLevel.current = 1.0
  }

  return {
    updateFPS,
    getFPS,
    getQuality,
    resetQuality
  }
}
