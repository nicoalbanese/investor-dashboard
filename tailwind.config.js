module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'a-light': '#F4EBE5',
        'a-dark': '#2D2D41',
        'a-blue': '#287AA9'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
