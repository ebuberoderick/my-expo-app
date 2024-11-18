/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/app/**/*.{js,ts,tsx}', "./src/**/*.{js,jsx,ts,tsx}"],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      danger: "#ef4444",
      success: "#11c9a4",
      blue: "#2877F2",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
