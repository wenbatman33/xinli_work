module.exports = {
	mode: 'jit',
	content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	prefix: '',
	important: false,
	separator: ':',
	theme: {
		extend: {
			colors: {
				primary: '#967140',
				primaryLight: '#CDA269',
				subWhite: '#8b8b8b',
				xGolden: '#CDA269',
				xRed: '#FF4F42',
				xRedDark: '#C60000',
				xGray666: '#666',
				xGray19: '#191919',
				xDarkGray: '#1B1B1B',
				darkOpacity: 'rgba(21, 21, 21, 0.62);',
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
