/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px'
      },
      fontFamily: {
        manro: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
