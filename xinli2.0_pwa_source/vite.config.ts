import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { minifyHtml, injectHtml } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';
import dayjs from 'dayjs';
import packageJson from './package.json';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      port: 8888,
      open: true,
      proxy: {},
    },
    plugins: [
      vue(),
      minifyHtml(),
      VitePWA({
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: process.env.VITE_TITLE,
          short_name: 'Short name of your app',
          description: 'Description of your app',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
      injectHtml({
        injectData: {
          title: process.env.VITE_TITLE,
          ver: packageJson.version,
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
          javascriptEnabled: true,
        },
      },
    },
  });
};
