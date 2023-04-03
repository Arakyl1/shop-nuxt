/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    colors: {
      blue: {
        100: "#77B1F5",
        300: "#4A98F5",
        500: "#1074EB",
        700: "#356DB0",
        900: "#054899",
      },
      yellow: {
        100: "#FFC773",
        300: "#FFB240",
        500: "#FF9900",
        700: "#BF8630",
        900: "#A66300"
      },
      red: {
        100: "#F7A2A2",
        300: "#F78383",
        500: "#EF5959",
        700: "#B35F5F",
        900: "#9B1D1D"
      },
      gray: {
        100: "#F7F7F7",
        300: "#9C9C9C",
        500: "#7D7D7D",
        700: "#757575",
        900: "#5E5E5E"
      },
      black: {
        100: "#575757",
        300: "#383838",
        500: "#323232",
        700: "#2D2D2D",
        900: "#282828"
      },
      white: "#ffffff"
    },
    extend: {
      borderRadius: {
        '3px': '3px',
        '5px': '5px'
      },
      lineHeight: {
        'none': '1',
        'tight': '0.8',
        'snug': '1.2',
        'normal': '1.2',
        'relaxed': '1.2',
        'loose': '1.2',
        '3': '1.2',
        '4': '1.2',
        '5': '1.2',
        '6': '1.2',
        '7': '1.2',
        '8': '1.2',
        '9': '1.2',
        '10': '1.2',
      }
    },
    screens: {
      '2xl': { 'max' :'1536px'},

      'xl': { 'max' :'1280px'},

      'lg': { 'max' :'1024px'},

      'md': { 'max' :'767px'},

      'sm': { 'max' : '640px'},
      
      'xs': { 'max' : '360px'},
    }
  },
  plugins: [],
}
