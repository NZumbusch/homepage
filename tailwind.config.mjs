/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: "rgb(25 20 20 / <alpha-value>)",
        light: "rgb(250 250 250 / <alpha-value>)",
        music: {
          "dim": "rgb(203 179 191 / <alpha-value>)",
          "dim-alternate": "rgb(198 218 218 / <alpha-value>)",
          "bright": "rgb(145 96 214 / <alpha-value>)"
        }
      },
      fontFamily: {
        playfair: [ "Playfair Display", "serif" ],
        rubik: [ "Rubik", "sans-serif" ],
        mono: [ "Fira Code", "monospace" ]
      }
    }
  },
  plugins: [],
};
