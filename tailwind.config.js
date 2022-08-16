/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#661CF1",
          200: "#5718CD",
          300: "#4714A9",
        },
        neutral: {
          100: "#fafafa",
          200: "#d4d4d4",
          300: "#a3a3a3",
          400: "#737373",
          500: "#404040",
          600: "#262626",
          700: "#171717",
        },
        success: "#5EC269",
        warning: "#FACC15",
        error: "#EF4444",
      },
      boxShadow: ({ theme }) => ({
        custom: `1px 1px 6px 1px ${theme("colors.primary.100")}26`,
      }),
      backgroundImage: {
        "gradient-100":
          "linear-gradient(148.13deg, #661CF1 21.15%, #9262EE 80.92%, #D0C3E9 116.7%);",
        "gradient-200":
          "linear-gradient(146.83deg, rgba(102, 28, 241, 0.4) 36.46%, rgba(146, 98, 238, 0.4) 122.99%, rgba(208, 195, 233, 0.4) 174.8%);",
      },
    },
  },
};
