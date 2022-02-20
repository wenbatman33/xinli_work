module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{vue,ts,tsx}'],
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    extend: {
      colors: {
        primary: '#071F44',
        accent: '#F0453A',
        secondary1: '#F0453A',
        gradient1: '#1E40F5',
        secondary2: '#DA072D',
        gradient2: '#FF6A3C',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        yellowLightBg: '#FFC647',
        yellowDarkBg: '#FFC647',
        orangeLightBg: '#FF9344',
        orangeDarkBg: '#FFB054',
        greenLightBg: '#8BDE3D',
        greenDarkBg: '#8BDE3D',
        lightBlueLightBg: '#2AD9C4',
        lightBlueDarkBg: '#45E3D0',
        blueLightBg: '#3A87FC',
        blueDarkBg: '#38B9FF',
        purpleLightBg: '#B055DA',
        purpleDarkBg: '#D087FA',
        vividBlue: '#1E40F5',
        systemError: '#CE2738',
        systemSuccess: '#39A037',
        systemOddsFail: '#48BE00',
      },
      minHeight: {
        '50vh': '50vh',
      },
    },
  },
  corePlugins: {},
  // tailwindcss 多行文本自动省略
  // ex: <p class="line-clamp-3">
  plugins: [require('@tailwindcss/line-clamp')],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
