/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    // borderRadius: {
    //   full: "9999px",
    //   xl: "8px",
    //   lg: "6px",
    //   base: "4px",
    // },
    extend: {},
  },
  plugins: [],
};
