/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        greenBg: "#EFFAFA",
        greenDark: "#5CA5A5",
        green: "#63BABA",
        green10: "rgba(92, 165, 165, 0.1)",
        black: "#2B3939",
        gray: "#7C8F8F",
        grayLight: "#B7C4C4",
      },
      fontFamily: {
        sans: ["League Spartan", "sans-serif"],
      },
      backgroundImage: {
        bgHeaderMobile: "url('../img/bg-header-mobile.svg')",
        bgHeaderDesktop: "url('../img/bg-header-desktop.svg')",
      },
      boxShadow: {
        DEFAULT: "0 15px 20px -5px rgba(13, 113, 130, 0.15)",
      },
    },
    letterSpacing: {
      tight: "-0.12px",
    },
    screens: {
      sm: "576px",
      md: "800px",
    },
  },
  plugins: [],
};
