/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030014',
        surface: 'rgba(255, 255, 255, 0.03)',
        surfaceBorder: 'rgba(255, 255, 255, 0.08)',
        primary: {
          DEFAULT: '#8b5cf6', // purple-500
          light: '#a78bfa',
          dark: '#6d28d9',
        },
        secondary: {
          DEFAULT: '#06b6d4', // cyan-500
          light: '#22d3ee',
          dark: '#0891b2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-secondary': '0 0 20px rgba(6, 182, 212, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
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
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
