import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import { minifyHtml, injectHtml } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import dayjs from 'dayjs';
import pkg from './package.json';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		root: process.cwd(),
		publicDir: 'public',
		build: {
			outDir: 'dist',
		},
		server: {
			port: 8888,
			open: true,
			proxy: {},
		},
		plugins: [
			vue(),
			minifyHtml(),
			injectHtml({
				injectData: {
					title: process.env.VITE_TITLE,
					ver: pkg.version,
					buildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
				},
			}),
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
				'@static': resolve(__dirname, './public/static'),
			},
		},
		css: {
			preprocessorOptions: {
				less: {
					modifyVars: {
						'primary-color': '#F0453A',
						'error-color': '#F0453A',
						'btn-danger-bg': '#F0453A',
						'btn-danger-border': '#F0453A',
						'link-color': '#071F44',
						'border-radius-base': '6px',
						'btn-font-weight': 600,
					},
					javascriptEnabled: true,
				},
			},
		},
	});
};
