/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#060D09',
          900: '#09140E',
          850: '#0D1C14',
          800: '#12261C',
          700: '#1A3628',
          600: '#244B38',
        },
        surface: {
          dark: 'rgba(10, 22, 16, 0.72)',
          card: 'rgba(14, 30, 22, 0.55)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-subtle': 'rgba(255, 255, 255, 0.04)',
          'border-emerald': 'rgba(52, 211, 153, 0.18)',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E4ECE7',
          200: '#C7D7CD',
          300: '#A4BEAE',
          400: '#7FA18C',
          500: '#5F856E',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
        'glow-emerald': '0 0 50px -10px rgba(52, 211, 153, 0.25)',
        'glow-ambient': '0 -20px 60px -10px rgba(16, 185, 129, 0.12)',
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '24px',
      }
    },
  },
  plugins: [],
}

