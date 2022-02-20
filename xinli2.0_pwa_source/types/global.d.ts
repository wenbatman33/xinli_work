interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}

declare interface ViteEnv {
  VITE_TITLE?: string;
  VITE_API_URL?: string;
  VITE_SOCKET_URL?: string;
  VITE_IMG_URL?: string;
  VITE_ABOUT_URL?: string;
  VITE_VIP_CLUB_URL?: string;
  VITE_SHARE_URL?: string;
  VITE_STATIC_IMG_URL?: string;
  VITE_STATIC_VIDEO_URL?: string;
  VITE_LOGIN_URL?: string;
  VITE_REGISTER_URL?: string;
  VITE_FORGET_URL?: string;
}

declare interface Window {
  _dx: any;
  APP_VERSION?: string;
}
