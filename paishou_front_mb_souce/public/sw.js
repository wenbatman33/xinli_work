console.log('service-worker construct');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// 暫存任何的.js
workbox.routing.registerRoute(
	({ url }) => {
		return /\.js$/.test(url.href);
	},
	workbox.strategies.cacheFirst({
		cacheName: 'js-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 1 * 60 * 60, // 1 hour
			}),
		],
	})
);

// 暫存任何的css
workbox.routing.registerRoute(
	({ url }) => {
		return /\.css$/.test(url.href);
	},
	workbox.strategies.cacheFirst({
		cacheName: 'css-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 1 * 60 * 60, // 1 hour
			}),
		],
	})
);

// 暫存任何的images
workbox.routing.registerRoute(
	({ url }) => {
		return /\.(?:png|jpg|jpeg|svg|gif)$/.test(url.href);
	},
	workbox.strategies.cacheFirst({
		cacheName: 'image-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 1 * 60 * 60, // 1 hour
			}),
		],
	})
);

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
