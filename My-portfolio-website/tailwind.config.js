/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#070709",
        "acid-lime": "#D4FF00",
        "acid-lime-hover": "#C4EE00",
      },
      boxShadow: {
        "glass-surface": "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
        "glass-inner": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)",
        "lime-glow": "0 0 25px rgba(212, 255, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
