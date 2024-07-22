/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#776E65",
        secondColor: "#bbada0",
        cement: "#8f7a66",
        secondCement: "#776555",
        thirdCement: "#eee4da59",
        mainWhite: "#f9f6f2",
        secondWhite: "#eee4da",
        bgCement: "#aa9888",
      },
    },
  },
  plugins: [],
};
