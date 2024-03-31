/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'black': '#1C1C1C',
        'white': '#F6F6F6',
        'a1': '#9CDDE8',
        'a2': '#E096E6',

      },
      fontFamily: {
        poppins: ['Poppins'],
        vt: ['VT323'],
        press: ['"Press Start 2P"'],
      }
    },
  },
  plugins: [require("daisyui")],
}