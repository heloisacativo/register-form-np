/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./index.html",
    "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      'dark-violet-background': '#030712',
      'blue-light-text': '#8A92A4',
      'blue-normal': '#225E86',
      'blue-normal-light': '#25323A',
      'blue-light': '#ADADDF',
      'stormy-blue': '#476A98',
      'stormy-blue-soft': '#84B4D4'
    },
    screens: {
      xxs: '360px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [],
}
