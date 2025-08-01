/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Essential for manual toggle
  theme: {
    extend: {
      colors: {
        green: {
          600: '#16a34a', // Slightly brighter green for better visibility
        },
        emerald: {
          600: '#059669', // Better dark mode green
        },
        gray: {
          700: '#374151', // Dark mode secondary
          800: '#1f2937', // Dark mode background alternative
        }
      }
    },
  },
  plugins: [],
}