/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mustard: {
          50: '#FFFEF2',
          100: '#FFF9D2',
          200: '#FEF09F',
          300: '#FDE05B',
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
          800: '#78350F',
          900: '#451A03',
        },
        forest: {
          50: '#F2F8F5',
          100: '#E1EFE8',
          200: '#C2DFD0',
          300: '#95C5AF',
          400: '#5FA387',
          500: '#388365',
          600: '#27684F',
          700: '#1F5340',
          800: '#1B4334',
          900: '#0E291F',
          950: '#071711',
        },
        cream: {
          50: '#FCFBF7',
          100: '#F8F5ED',
          200: '#F1EAD9',
          300: '#E6DAC1',
          400: '#D6C4A2',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

