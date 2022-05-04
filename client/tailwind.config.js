module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter var", "sans-serif"],
      freehand: ["Freehand", "cursive"],
      engagement: ["Engagement", "cursive"],
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "6rem",
          xl: "12rem",
        },
      },
    },
  },
  plugins: [],
};
