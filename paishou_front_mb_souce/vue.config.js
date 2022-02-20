// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const resolve = (dir) => {
	return path.join(__dirname, dir);
};

const YYYY = new Date().getFullYear().toString();
const MM = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`;
const DD = new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`;
const HH = new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`;
const mm = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`;
process.env.VUE_APP_BUILDTIME = `.${YYYY}${MM}${DD}${HH}${mm}`;

module.exports = {
	publicPath: '/',
	outputDir: process.env.outputDir,
	assetsDir: 'assets',
	productionSourceMap: false,
	filenameHashing: true,
	lintOnSave: false,
	devServer: {
		open: true,
		host: '0.0.0.0',
		port: 8888,
		https: false,
		hotOnly: true,
	},
	pwa: {
		manifestOptions: {
			name: '拍手直播',
			short_name: '拍手直播',
			start_url: './source=pwa_app',
			display: 'standalone',
			theme_color: '#a62337',
			background_color: '#ffffff',
			manifestPath: 'manifest.json?v=' + process.env.VUE_APP_VER + process.env.VUE_APP_BUILDTIME,
			icons: [
				{
					src: './publicAssets/img/appAssets/android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: './publicAssets/img/appAssets/android-chrome-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
		},
		themeColor: '#a62337',
		msTileColor: '#a62337',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black',
		iconPaths: {
			maskicon: null,
			favicon32: './publicAssets/img/appAssets/favicon-32x32.png',
			favicon16: './publicAssets/img/appAssets/favicon-16x16.png',
			appleTouchIcon: './publicAssets/img/appAssets/apple-touch-icon.png',
			msTileImage: null,
		},
	},
};
