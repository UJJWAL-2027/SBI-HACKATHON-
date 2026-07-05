/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          500: '#1e3a8a', // Default navy
          600: '#1e3a5f',
          800: '#0f172a',
          900: '#020617', // Very dark navy
        },
        softblue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
        }
      }
    },
  },
  plugins: [],
}
