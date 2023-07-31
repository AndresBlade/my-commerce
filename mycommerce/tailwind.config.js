/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        "bg-degradado": 
        "linear-gradient(265deg, #3145e3cc 0%, #4d62ffcc 51%, #7c92ffcc 100%)",
      },

      colors:  {
        "bg-gris": "#dde6f5",
        "azul": "#7c92ffcc",
        "amarillo": "#f4f0a4",
        "blanco": "#f1f4fe",
      },
    },
  },
  plugins: [],
};