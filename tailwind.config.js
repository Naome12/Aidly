/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        amaranth: ["Amaranth-Regular", "sans-serif"],
        "amaranth-bold": ["Amaranth-Bold", "sans-serif"],
        "amaranth-bolditalic": ["Amaranth-BoldItalic", "sans-serif"],
        "amaranth-italic": ["Amaranth-Italic", "sans-serif"],
        "nunitosans-italic": ["NunitoSans-Italic", "sans-serif"],
        nunitosans: ["NunitoSans-Regular", "sans-serif"],
        poppins : ["Poppins-Regular"],
        "poppins-light" : ["Poppins-Light"]
      },
      colors: {
        primary: {
          100: "#AD9FEA",
        },
        red: {
          DEFAULT: "#ff0000",
          100: "#FF1818",
          200: "#FF1417",
        },
        black: {
          DEFAULT: "#000000",
          100: "#0D0D0D",
          200: "#262626",
          300: "#757474"
        },
        white: {
          DEFAULT: "#ffffff",
          100: "#F5F6FA",
        },
      },
    },
  },
  plugins: [],
};
