/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      blue: {
        400: "#1AB4F0",
        800: "#0B5F9E",
        900: "#084B8A",
      },
      gray: {
        100: "#E6E6E6",
        800: "#333333",
        900: "#141414",
      },
      textColor: {
        gray: {
          100: "#E6E6E6",
        },
      },
      red: {
        100: "#481414",
      },
      backgroundColor: {
        red: {
          100: "#481414",
        },
      },
      borderRadius: {
        movie: "86px 22px 0 0",
      },
      fontFamily: {
        roboto: "Roboto,sans-serif",
      },
      height: {
        destaque: "700px",
      },
    },
  },
  plugins: [],
};
