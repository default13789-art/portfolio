import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    host: true,
    open: true
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2018',
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': [
            'three',
            '@react-three/fiber',
            '@react-three/drei',
          ],
        },
        chunkFileNames:  'assets/js/[name]-[hash].js',
        entryFileNames:  'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop()
          if (/^(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(ext)) return `assets/media/[name]-[hash][extname]`
          if (/^(png|jpe?g|gif|svg|ico|webp|avif)$/.test(ext))  return `assets/images/[name]-[hash][extname]`
          if (ext === 'css') return `assets/css/[name]-[hash][extname]`
          return `assets/[name]-[hash][extname]`
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    reportCompressedSize: true,
    emptyOutDir: true,
    assetsInlineLimit: 4096,
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-scroll',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'class-variance-authority'
    ],
  },

  css: {
    devSourcemap: false,
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
