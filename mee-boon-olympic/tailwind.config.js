// tailwind.config.js
/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    
  ],
  theme: {
    
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          second: 'var(--color-text-second)',
          muted: 'var(--color-text-muted)',
          inverted: 'var(--color-text-inverted)',
          silver: 'var(--color-text-silver)',
          bronze: 'var(--color-text-bronze)',
          gold: 'var(--color-text-gold)',
          headTable: 'var(--color-table-header-text)'
        },
      },
      backgroundColor: {
        skin: { fill: 'var(--color-fill)',
          'button-fill': 'var(--color-button-fill',
          'button-accent': 'var(--color-button-accent)',
          'button-hover': 'var(--color-button-hover-accent)',
          'header-table': 'var(--color-table-header)',
          'row': 'var(--color-table-row)',
          'row-alt': 'var(--color-table-row-alt)',
          'row-hover': 'var(--color-table-row-hover)'
        },
      },
      border: {
        skin: { base: 'var(--color-boder-base)',
          'alt': 'var(--color-boder-alt)',
          'table': 'var(--color-boder-table)'
          
        }
      },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
}