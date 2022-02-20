import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { minifyHtml, injectHtml } from 'vite-plugin-html';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import dayjs from 'dayjs';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import pkg from './package.json';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
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
			Components({
				resolvers: [ElementPlusResolver()],
			}),
		],
		server: {
			port: 3000,
			open: true,
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
				'@static': resolve(__dirname, './public/static'),
			},
		},
		css: {
			preprocessorOptions: {
				less: {
					charset: false,
				},
				scss: {
					charset: false,
				},
			},
		},
	});
};
