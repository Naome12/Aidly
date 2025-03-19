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
      },
      colors: {
        primary: {
          100: "#AEA1E9",
        },
        red: {
          100: "#FE1B1B",
        },
        black: {
          DEFAULT: "#000000",
          100: "#0D0D0D",
          200: "#262626",
        },
        white: {
          DEFAULT: "#ffffff",
          100: "#A8A8A9",
        },
      },
    },
  },
  plugins: [],
};
