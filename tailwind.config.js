/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B4D429',
        dark: '#232323',
        darker: '#000',
        light: '#fff',
      }
    },
  },
  plugins: [],
}