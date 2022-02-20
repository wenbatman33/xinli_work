import videojs from 'video.js';
import window from 'global/window';

/**
 * Set window screen orientation
 * @param {*} mode Orientation mode
 */
export const setOrientation = (mode) => {
	if (window.screen.orientation) {
		window.screen.orientation.lock(mode).then(
			() => {},
			(err) => {
				console.error(err);
			}
		);
	} else if (window.screen.mozLockOrientation) {
		window.screen.mozLockOrientation(mode);
	} else if (window.screen.msLockOrientation) {
		window.screen.msLockOrientation(mode);
	} else if (window.screen.lockOrientation) {
		window.screen.lockOrientation(mode);
	}
};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 */
const onPlayerReady = (player) => {
	player.on('fullscreenchange', (e) => {
		if (player.isFullscreen()) {
			setOrientation('landscape');
		}
	});
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function landscapeFullscreen
 */
const landscapeFullscreen = function () {
	if (videojs.browser.IS_ANDROID || videojs.browser.IS_IOS) {
		this.ready(() => {
			onPlayerReady(this);
		});
	}
};

// Register the plugin with video.js.
registerPlugin('landscapeFullscreen', landscapeFullscreen);

export default landscapeFullscreen;
