/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(30 41 59)',
        secondary: 'rgb(148 163 184)',
        dark: '#0f172a',
      },
    },
  },
  plugins: [],
};
