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
    minify: 'terser',
    target: 'es2018',
    terserOptions: {
      compress: {
        drop_console: true,   // remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      format: {
        comments: false,      // strip all comments
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three')
          ) {
            return 'vendor-three'
          }
          if (id.includes('node_modules')) {
            return 'vendor-others'
          }
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
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    reportCompressedSize: true,
    emptyOutDir: true,
    assetsInlineLimit: 4096, // inline assets < 4 KB as base64
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
