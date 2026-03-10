import { useRef } from 'react'
import * as THREE from 'three'

/**
 * Object pooling utilities for particle systems to reduce garbage collection
 * Reuses objects instead of creating/destroying them repeatedly
 */

/**
 * Generic object pool for reusable objects
 */
export class ObjectPool {
  constructor(createFn, resetFn, initialSize = 100) {
    this.createFn = createFn
    this.resetFn = resetFn
    this.pool = []
    this.activeObjects = new Set()

    // Pre-allocate objects
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn())
    }
  }

  /**
   * Acquire an object from the pool
   */
  acquire() {
    let obj = this.pool.pop()

    if (!obj) {
      // Create new object if pool is empty
      obj = this.createFn()
    }

    this.activeObjects.add(obj)
    return obj
  }

  /**
   * Release an object back to the pool
   */
  release(obj) {
    if (this.activeObjects.has(obj)) {
      this.activeObjects.delete(obj)
      this.resetFn(obj)
      this.pool.push(obj)
    }
  }

  /**
   * Release all active objects
   */
  releaseAll() {
    this.activeObjects.forEach(obj => {
      this.resetFn(obj)
      this.pool.push(obj)
    })
    this.activeObjects.clear()
  }

  /**
   * Get pool statistics
   */
  getStats() {
    return {
      total: this.pool.length + this.activeObjects.size,
      available: this.pool.length,
      active: this.activeObjects.size
    }
  }
}

/**
 * Hook for managing a pool of THREE.Object3D instances
 * Useful for instanced mesh updates
 */
export function useObject3DPool(initialSize = 1000) {
  const poolRef = useRef(null)
  const dummyRef = useRef(null)

  if (!poolRef.current) {
    poolRef.current = []
    dummyRef.current = new THREE.Object3D()

    // Pre-allocate dummy objects
    for (let i = 0; i < initialSize; i++) {
      const obj = new THREE.Object3D()
      poolRef.current.push(obj)
    }
  }

  /**
   * Get a dummy object from the pool
   */
  const acquire = () => {
    if (poolRef.current.length > 0) {
      return poolRef.current.pop()
    }
    return new THREE.Object3D()
  }

  /**
   * Return a dummy object to the pool
   */
  const release = (obj) => {
    if (obj && obj instanceof THREE.Object3D) {
      obj.position.set(0, 0, 0)
      obj.rotation.set(0, 0, 0)
      obj.scale.set(1, 1, 1)
      obj.updateMatrix()
      poolRef.current.push(obj)
    }
  }

  /**
   * Get the shared dummy object (for backwards compatibility)
   */
  const getSharedDummy = () => dummyRef.current

  return {
    acquire,
    release,
    getSharedDummy,
    poolSize: poolRef.current.length
  }
}

/**
 * Pool for Float32Arrays used in particle systems
 */
export class ArrayPool {
  constructor(initialSize = 10, arraySize = 1000) {
    this.pool = []
    this.arraySize = arraySize

    // Pre-allocate arrays
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(new Float32Array(arraySize))
    }
  }

  /**
   * Acquire an array from the pool
   */
  acquire() {
    let arr = this.pool.pop()

    if (!arr) {
      arr = new Float32Array(this.arraySize)
    }

    return arr
  }

  /**
   * Release an array back to the pool
   */
  release(arr) {
    if (arr instanceof Float32Array && arr.length === this.arraySize) {
      // Clear the array
      arr.fill(0)
      this.pool.push(arr)
    }
  }

  /**
   * Get pool statistics
   */
  getStats() {
    return {
      total: this.pool.length,
      arraySize: this.arraySize
    }
  }
}

/**
 * Pre-configured pools for common use cases
 */

// Pool for position updates in particle systems
export const positionArrayPool = new ArrayPool(5, 3000) // 5 arrays of 3000 elements

// Pool for velocity arrays
export const velocityArrayPool = new ArrayPool(5, 3000)

// Pool for matrix updates
export const matrixPool = new ObjectPool(
  () => new THREE.Matrix4(),
  (matrix) => matrix.identity(),
  100
)

/**
 * Utility to batch process particles with chunking
 * Helps avoid long-running tasks that block the main thread
 */
export function processInBatches(items, processFn, batchSize = 100) {
  return new Promise((resolve) => {
    const results = []
    let index = 0

    function processBatch() {
      const end = Math.min(index + batchSize, items.length)

      for (let i = index; i < end; i++) {
        results.push(processFn(items[i], i))
      }

      index = end

      if (index < items.length) {
        // Schedule next batch
        setTimeout(processBatch, 0)
      } else {
        resolve(results)
      }
    }

    processBatch()
  })
}

/**
 * Adaptive quality controller for particle systems
 * Adjusts particle count based on performance
 */
export function useAdaptiveQuality(baseCount = 1000) {
  const currentCount = useRef(baseCount)
  const targetCount = useRef(baseCount)
  const lastAdjustment = useRef(Date.now())
  const adjustmentInterval = 2000 // Adjust every 2 seconds

  /**
   * Adjust particle count based on FPS
   */
  const adjustQuality = (fps, targetFPS) => {
    const now = Date.now()

    if (now - lastAdjustment.current < adjustmentInterval) {
      return currentCount.current
    }

    if (fps < targetFPS * 0.7) {
      // Reduce particle count
      targetCount.current = Math.max(baseCount * 0.3, targetCount.current * 0.9)
    } else if (fps > targetFPS * 0.95) {
      // Increase particle count
      targetCount.current = Math.min(baseCount, targetCount.current * 1.1)
    }

    // Smooth transition
    currentCount.current += (targetCount.current - currentCount.current) * 0.1
    lastAdjustment.current = now

    return Math.floor(currentCount.current)
  }

  /**
   * Get current particle count
   */
  const getCount = () => Math.floor(currentCount.current)

  /**
   * Reset to base count
   */
  const reset = () => {
    currentCount.current = baseCount
    targetCount.current = baseCount
  }

  return {
    adjustQuality,
    getCount,
    reset,
    currentCount: currentCount.current,
    targetCount: targetCount.current
  }
}
