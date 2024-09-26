/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(to bottom, var(--tw-gradient-stops))",
      },
      colors: {
        sand: "#E6B686",
        coffee: "#66321A",
        sky: "#CAF2FC",
        grape: "#9337C6",
        plum: "#301A4E",
        midnight: "#1A0536",
      },
    },
  },
  plugins: [],
};
