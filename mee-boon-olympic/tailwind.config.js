// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      gray: colors.gray,
      blue: colors.indigo,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Poppins', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}
