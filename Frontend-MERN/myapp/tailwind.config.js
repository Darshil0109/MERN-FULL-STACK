/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define custom colors for light and dark mode using CSS variables
        background: 'var(--bg-color)',
        text: 'var(--text-color)',
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        buttonBackground: 'var(--button-bg)',
        buttonText: 'var(--button-text)',
      },
    },
  },
  plugins: [],
}