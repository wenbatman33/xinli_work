interface ImportMetaEnv extends ViteEnv {
	__: unknown;
}

declare interface ViteEnv {
	VITE_TITLE?: string;
	VITE_API_URL?: string;
}

declare interface Window {
	staticPath?: any;
	apiUrl?: any;
	apiImg?: any;
	socketUrl?: any;
	memberUrl?: any;
	_dx?: any;
}
