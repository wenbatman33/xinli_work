module.exports = {
  purge: [
    './src/*.vue',
    './src/views/*.vue',
    './src/components/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        myPurple: {
          default: '#9378FF',
        },
        myRed: {
          default: '#D46767',
        },
        myTeal: {
          default: '#68D1D7',
        },
        myGreen: {
          default: '#2C9611',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
