/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        theme: {
          "dim": "#CBB3BF",
          "dim-alternate": "#C6DADA",
          "bright": "#9160D6"
        }
      },
      fontFamily: {
        playfair: [ "Playfair Display" ],
        rubik: [ "Rubik" ]
      }
    }
  }
};
