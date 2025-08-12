// This is tailwind.config.js file present in the root directory of the project.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // New Gradient-based Color Palette
        gradient: {
          'deep-blue': '#0D1B2A',
          'violet': '#5B2C6F',
          'charcoal': '#1C1C1C',
          'silver': '#C0C0C0',
          'teal': '#0F766E',
          'indigo': '#312E81',
        },
        primary: {
          dark: '#0D1B2A',
          light: '#5B2C6F',
          accent: '#0F766E',
          text: '#EDEDED',
          silver: '#C0C0C0',
        },
        glassmorphism: {
          bg: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.2)',
          dark: 'rgba(13, 27, 42, 0.8)',
        }
      },
      fontFamily: {
        'dm-serif': ['DM Serif Display', 'serif'],
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'helvetica': ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'bounce-in': 'bounce-in 0.6s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%': {
            'box-shadow': '0 0 5px rgba(160, 32, 240, 0.4), 0 0 10px rgba(160, 32, 240, 0.3), 0 0 15px rgba(160, 32, 240, 0.2)'
          },
          '100%': {
            'box-shadow': '0 0 10px rgba(160, 32, 240, 0.6), 0 0 20px rgba(160, 32, 240, 0.5), 0 0 30px rgba(160, 32, 240, 0.4)'
          },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '70%': { transform: 'scale(0.9)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #0D1B2A 0%, #5B2C6F 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #1C1C1C 0%, #C0C0C0 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0F766E 0%, #312E81 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0D1B2A 0%, #5B2C6F 50%, #312E81 100%)',
        'cyber-grid': "url(\"data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23A020F0' fill-opacity='0.1' fill-rule='nonzero'%3e%3cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e\")",
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.glassmorphism': {
          background: 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.neon-border': {
          border: '2px solid transparent',
          'background-clip': 'padding-box',
          'box-shadow': '0 0 10px rgba(0, 255, 224, 0.5), inset 0 0 10px rgba(160, 32, 240, 0.3)',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}

