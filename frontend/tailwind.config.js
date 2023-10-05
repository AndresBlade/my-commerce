let plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      screens:
      {
        'smm': '300px'
      },
      
      backgroundImage: {
        "bg-degradado": 
        "linear-gradient(265deg, #3145e3 0%, #4d62ff 51%, #7c92ff 100%)",
      },

      colors:  {
        "gris": "#dde6f5",
        "shadow-gris": "#DCE1EA",
        "azul": "#7c92ff",
        "dark-blue": "#4d7cff",
        "amarillo": "#f4f0a4",
        "blanco": "#f1f4fe",
      },
    },
  },
  plugins: [
    plugin(function ({ matchVariant, theme }) {
      matchVariant(
        'nth',
        (value) => {
          return `&:nth-child(${value})`;
        },
        {
          values: {
            DEFAULT: 'n', // Valor por defecto para `nth:`
            '2n': '2n', // `nth-2n:utility` generará el selector CSS `:nth-child(2n)`
            '3n': '3n',
            '4n': '4n',
            '5n': '5n',
          },
        }
      );
    }),
  ],
};