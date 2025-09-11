/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f9f506',
        'text-primary': '#1c1c0d',
        'text-secondary': '#6e6d5a',
        'bg-primary': '#fcfcf8',
        'bg-secondary': '#f4f4e6',
        'border-color': '#e5e5d1',
      },
      fontFamily: {
        'spline': ['Spline Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
