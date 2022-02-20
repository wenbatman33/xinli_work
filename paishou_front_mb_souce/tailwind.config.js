module.exports = {
	purge: ['./src/*.vue', './src/views/*.vue', './src/views/**/*.vue', './src/views/event/**/*.vue', './src/views/event/**/**/*.vue', './src/components/*.vue', './src/components/**/*.vue'],
	prefix: '',
	important: false,
	separator: ':',
	theme: {
		extend: {
			colors: {
				psBlue: '#0031d4',
				psBlueLight: '#3f91ff',
				psBlueDark: '#2c3e50',
				psGrayLight: '#f4f5f8',
				psGray: '#8e8e93',
				psGrayC6: '#c6c6c6',
				psGrayDark: '#4b4b4b',
				psOrange: '#ff9a00',
				psYellow: '#fbfe00',
				psRed: '#f1433f',
				psPink: '#f759ab',
				psGeen: '#36cfc9',
				psPurple: '#9254de',
				// --------------------
				psV3Red: '#a62337',
				psV3RedLight: '#df2f4a',
				psV3Yellow: '#f8b62d',
				psV3YellowNeon: '#ffff10',
				psV3Orange: '#ff7a00',
			},
		},
	},
	corePlugins: {},
	plugins: [],
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
};
