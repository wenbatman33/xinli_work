module.exports = {
	mode: 'jit',
	content: [
		'./public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
	],
	prefix: '',
	important: false,
	separator: ':',
	theme: {
		extend: {
			colors: {
				// 自定義網站常用色系
				xBlue: '#071F44',
				xRed:'#F0453A',
				xGold: '#D8B782',
				xYellowLight:'#FFC647',
				xYellowDark: '#FFD644',
				xOrangeLight:'#FF9344',
				xOrangeDark:'#FFB054',
				xGreenLight:'#8BDE3D',
				xGreenDark:'#A3E466',
				xBlueLight:'#3A87FC',
				xBlueDark:'#38B9FF',
				xPurpleLight:'#B055DA',
				xPurpleDark: '#D087FA',
				xVividBlue: '#1E40F5',
				SystemError:'#CE2738',
				SystemSuccess:'#39A037',
				xOddsUp:'#F0453A',
				xOddsDown: '#48BE00',
			},
			minHeight: {
				'50vh': '50vh',
			},
			keyframes: {
				fadeIn: { '0%': {	opacity: '0'},'100%': {	opacity: '1'}},
				fadeOut: { '0%': {	opacity: '0'},'100%': {	opacity: '1'}}
			},
			animation: {
				fadeIn: 'fadeIn .5s', fadeOut: 'fadeOut .5s',
				'spin-slow': 'spin 5s linear infinite'
			}
		},
	},
	corePlugins: {},
	plugins: [
		// tailwindcss 多行文本自动省略
		// ex: <p class="line-clamp-3">
		require('@tailwindcss/line-clamp' ),
	],
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
};
