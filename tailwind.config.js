/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: '#F5F0E5',
        lightBrown: '#C8B6A6',
        maroon: '#800020',
        darkRed: '#8B0000',
        chocolate: '#7B3F00',
        yellow: '#FFD700',
        primary: '#4A3F35',
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        brand: ['Cinzel', 'serif'],
        rubik: ['Rubik', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
