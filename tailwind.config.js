/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'dancing': ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-in-down': 'fadeInDown 0.8s ease-in-out',
        'pulse': 'pulse 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(253, 253, 150, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(253, 253, 150, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(253, 253, 150, 0)' },
        },
      },
    },
  },
  plugins: [],
};