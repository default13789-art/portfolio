/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#050510',
        'gold-luster': '#ffff00',
        'sapphire-blue': '#00F5FF',
        'deep-amethyst': '#8A2BE2',
        'emerald-success': '#00ff41',
        'text-primary': '#FFFFFF',
        'text-secondary': '#d1d5db',
        'text-muted': '#9CA3AF',
        // Cyberpunk neon colors
        'neon-cyan': '#00F5FF',
        'neon-magenta': '#8A2BE2',
        'neon-yellow': '#ffff00',
        'neon-pink': '#ff0099',
        'neon-green': '#00ff41',
        'magenta-500': '#8A2BE2',
      },
      fontFamily: {
        // Primary display font: futuristic
        display: ['"Orbitron"', 'sans-serif'],
        // Body font: technical and industrial
        body: ['"Rajdhani"', 'sans-serif'],
        // Cyberpunk tech elements
        cinzel: ['"Space Mono"', 'monospace'],
        // Premium monospace for code
        mono: ['"JetBrains Mono"', 'monospace'],
        // Legacy support
        sans: ['"Rajdhani"', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slideUp': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slideDown': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 243, 255, 0.5)',
        'glow-lg': '0 0 40px rgba(0, 243, 255, 0.6)',
        'purple-glow': '0 0 20px rgba(255, 0, 255, 0.5)',
        'gold-glow': '0 0 20px rgba(255, 255, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
