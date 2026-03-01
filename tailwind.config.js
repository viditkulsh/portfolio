/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light palette
        cream:    { 50: '#FFFDF7', 100: '#FFF9E8', 200: '#FFF3D1', DEFAULT: '#FAF6F0' },
        sand:     { 100: '#F5F0E8', 200: '#EDE6D8', 300: '#DDD4C2', DEFAULT: '#EDE6D8' },
        // Dark palette
        ink:      { 50: '#F8F8F8', 100: '#E8E8E8', 200: '#D1D1D1', 300: '#A3A3A3', 400: '#737373', 500: '#525252', 600: '#404040', 700: '#2D2D2D', 800: '#1A1A1A', 900: '#0F0F0F', DEFAULT: '#1A1A1A' },
        charcoal: { DEFAULT: '#2D2D2D', light: '#404040' },
        // Accent
        warm:     { 50: '#FFF7ED', 100: '#FFEDD5', 200: '#FED7AA', 300: '#FDBA74', 400: '#FB923C', 500: '#F97316', 600: '#EA580C', DEFAULT: '#F97316' },
        terra:    { DEFAULT: '#C2410C', light: '#EA580C' },
        sage:     { DEFAULT: '#5F7161', light: '#7C9070' },
        // Legacy mappings
        primary:  { cyan: '#F97316', purple: '#C2410C', text: '#1A1A1A' },
        void:     '#0F0F0F',
        ice:      '#F97316',
        violet:   '#C2410C',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft':    '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        'lifted':  '0 20px 60px -15px rgba(0,0,0,0.15)',
        'dark':    '0 2px 15px -3px rgba(0,0,0,0.3), 0 10px 20px -2px rgba(0,0,0,0.2)',
      },
      keyframes: {
        'fade-up':   { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'fade-in':   { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'slide-in':  { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
        'pulse-dot': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.5 } },
      },
      animation: {
        'fade-up':   'fade-up 0.6s ease-out',
        'fade-in':   'fade-in 0.4s ease-out',
        'slide-in':  'slide-in 0.5s ease-out',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
