interface ImportMetaEnv extends ViteEnv {
	__: unknown;
}

declare interface ViteEnv {
	VITE_VER?: string;
	VITE_TITLE?: string;
	VITE_API_URL?: string;
}

declare interface Window {
	staticPath?: any;
	apiImgPath?: any;
	_dx?: any;
}
