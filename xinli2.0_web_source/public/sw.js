// console.log('service-worker');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// 存任何的.js
workbox.routing.registerRoute(
	new RegExp('.*.js'),
	workbox.strategies.cacheFirst({
		cacheName: 'js-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 24 * 60 * 60, // 1 day
			}),
		],
	})
);

// 存任何的css
workbox.routing.registerRoute(
	new RegExp('.*.css'),
	workbox.strategies.cacheFirst({
		cacheName: 'css-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 24 * 60 * 60, // 1 day
			}),
		],
	})
);

// 存任何的images
workbox.routing.registerRoute(
	new RegExp('.*.(?:png|jpg|jpeg|svg|gif)'),
	workbox.strategies.cacheFirst({
		cacheName: 'image-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 24 * 60 * 60, // 1 day
			}),
		],
	})
);

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
