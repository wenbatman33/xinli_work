import { Toast, Dialog } from 'vant';
import { LocalStorageKeys } from '@/utils/constants';
import { useAppStore } from '@/store/app-store';
import { useSocketStore } from '@/store/socket-store';
import i18n from '@/i18n';
import router from '@/router';
import type { LoginData } from '@/api/member/model/authorize-model';

/**
 * Environment
 */
const ENV = import.meta.env;

/**
 * 套用圖片網址
 * @param path 圖片路徑
 */
export const imgUrl = (path?: string) => {
  return `${ENV.VITE_IMG_URL}/${path || ''}`;
};

/**
 * 套用靜態圖片網址
 * @param path 圖片路徑
 */
export const staticImgUrl = (path?: string) => {
  return `${ENV.VITE_STATIC_IMG_URL}/${path || ''}`;
};

/**
 * 套用靜態影片網址
 * @param path 影片路徑
 */
export const staticVideoUrl = (path?: string) => {
  return `${ENV.VITE_STATIC_VIDEO_URL}/${path || ''}`;
};

/**
 * 取得等級圖片
 * @param level 等級
 */
export const levelImg = (level?: number) => {
  if (level) {
    return staticImgUrl(`icon-level${level}.svg`);
  } else {
    return staticImgUrl(`icon-level0.svg`);
  }
};

/**
 * 取得等級進度調顏色
 * @param level 等級
 */
export const levelProgressColor = (level?: number) => {
  if (level && level >= 10) {
    return 'linear-gradient(90deg, #CF429E 0%, #731653 100%)';
  } else if (level && level >= 7) {
    return 'linear-gradient(90deg, #CD5AEA 0%, #6D17A0 100%)';
  } else if (level && level >= 4) {
    return 'linear-gradient(90deg, #44C7FF 0%, #1F25C1 100%)';
  } else {
    return 'linear-gradient(90deg, #F9683A 0%, #D01B1B 100%)';
  }
};

/**
 * 設置加載失敗的預設圖片
 * @param e Event
 */
export const errorImg = (e: Event, src?: string) => {
  if (src) {
    (e.target as HTMLImageElement).src = src;
  } else {
    (e.target as HTMLImageElement).src = staticImgUrl('icon-error-img.svg');
  }
};

/**
 * 數字轉千分位字串
 * @param value 數字
 * @return 千分位字串
 */
export const commaFormat = (value?: number | string, noCurrency?: boolean): string => {
  try {
    const str = Number(value || 0).toLocaleString('en', { style: 'currency', currency: 'JPY', maximumFractionDigits: 2 });
    if (noCurrency == true) {
      return str.replace('¥', '');
    } else {
      return str.replace('¥', '¥ ');
    }
  } catch (e) {
    return String(value || 0);
  }
};

/**
 * Copy text
 * @param text Text
 * @returns Copy successful
 */
export const copy = (text?: string) => {
  var textArea = document.createElement('textarea');
  textArea.value = text || '';

  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    Toast({
      position: 'bottom',
      teleport: '#toast-container',
      message: i18n.global.t('common_copySuccess'),
    });
  } catch (err) {
    Toast({
      position: 'bottom',
      teleport: '#toast-container',
      message: err,
    });
  }

  document.body.removeChild(textArea);
};

/**
 * Get bearer token
 * @param token Origin token
 */
export const getBearerToken = (token?: string) => {
  return `Bearer ${token || ''}`;
};

/**
 * 取得裝置代碼
 * @returns 裝置代碼
 */
export const getDeviceID = (): string => {
  return '1';
};

/**
 * 取得平台代碼
 * @returns 1=WebPC、2=MobileWeb、3=AndroidPWA、4=IOSPWA
 */
export const getPlatform = (): number => {
  return 2;
};

/**
 * 是否為Safari瀏覽器
 * @returns 是否為Safari瀏覽器
 */
export const isSafari = () => {
  const userAgent = navigator.userAgent;
  return userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1;
};

/**
 * Validate phone format
 * @param phone Phone number
 * @returns Format valid or invalid
 */
export const validatePhone = (phone: string): boolean => {
  return /^(13|14|15|16|17|18|19)\d{9}$/.test(phone);
};

/**
 * Validate email format
 * @param email Email
 * @returns Format valid or invalid
 */
export const validateEmail = (email: string): boolean => {
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    email
  );
};

/**
 * Calculate middle color with ratio
 * @param color1 Start color when ratio 0.0
 * @param color2 End color when ratio 1.0
 * @param ratio Ratio
 * @returns Middle color
 */
export const calculateMiddleColor = (color1 = 'FF0000', color2 = '00FF00', ratio: number) => {
  const hex = (color: number) => {
    const colorString = color.toString(16);
    return colorString.length === 1 ? `0${colorString}` : colorString;
  };

  const r = Math.ceil(parseInt(color2.substring(0, 2), 16) * ratio + parseInt(color1.substring(0, 2), 16) * (1 - ratio));
  const g = Math.ceil(parseInt(color2.substring(2, 4), 16) * ratio + parseInt(color1.substring(2, 4), 16) * (1 - ratio));
  const b = Math.ceil(parseInt(color2.substring(4, 6), 16) * ratio + parseInt(color1.substring(4, 6), 16) * (1 - ratio));

  return hex(r) + hex(g) + hex(b);
};

/**
 * Save login data
 * @param data Login data
 */
export const saveLoginData = (data?: LoginData) => {
  // Storage authorization token
  window.localStorage.setItem(LocalStorageKeys.TOKEN, data?.token || '');

  // Storage member id
  window.localStorage.setItem(LocalStorageKeys.MEMBER_ID, data?.memberID?.toString() || '');

  // Storage member account
  window.localStorage.setItem(LocalStorageKeys.MEMBER_ACCOUNT, data?.account?.toString() || '');

  // Storage force two phase
  window.localStorage.setItem(LocalStorageKeys.FORCE_TWO_PHASE, data?.forceTwoPhase?.toString() || '');

  // Storage force change password
  window.localStorage.setItem(LocalStorageKeys.FORCE_CHANGE_PASSWORD, data?.forceChangePassword?.toString() || '');

  // Connect socket
  useSocketStore().connect();
};

/**
 * Clear login data
 */
export const clearLoginData = () => {
  // Remove token
  window.localStorage.removeItem(LocalStorageKeys.TOKEN);

  // Remove member id
  window.localStorage.removeItem(LocalStorageKeys.MEMBER_ID);

  // Remove member account
  window.localStorage.removeItem(LocalStorageKeys.MEMBER_ACCOUNT);

  // Remove force two phase
  window.localStorage.removeItem(LocalStorageKeys.FORCE_TWO_PHASE);

  // Remove force change password
  window.localStorage.removeItem(LocalStorageKeys.FORCE_CHANGE_PASSWORD);

  // Close web socket
  useSocketStore().close();
};

/**
 * Get login and authorized status
 */
export const authorized = (): boolean => {
  const token = window.localStorage.getItem(LocalStorageKeys.TOKEN);
  return token != undefined && token.length > 0;
};

/**
 * Launch deep link
 */
export const deepLink = (url?: string) => {
  // Parse deep link
  const scheme = /^(\w+):\/?\/?/.exec(url || '')?.[1];
  const host = /^\w+:\/?\/?([^#?:\/\s]+)\/?/.exec(url || '')?.[1];
  const query = url?.matchAll(/[\?|\&]([^=]+)\=([^&#]+)/g);
  const params: Record<string, string> = {};
  let next, done, value;
  do {
    next = query?.next();
    done = next?.done;
    value = next?.value;
    if (value && value.length >= 3) {
      const k = String(value[1]);
      const v = String(value[2]);
      params[k] = v;
    }
  } while (done === false && value);
  const id = params.id || '';

  // Home
  if (scheme == 'xinli' && host == 'home') {
    router.push({
      path: `/`,
    });
    return;
  }

  // Peraonal
  if (scheme == 'xinli' && host == 'personal') {
    router.replace({
      path: '/profile',
    });
    return;
  }

  // Promo detail
  if (scheme == 'xinli' && host == 'promo' && id.length > 0) {
    router.push({
      path: `/promotion/detail/${id}`,
    });
    return;
  }

  // Promo list
  if (scheme == 'xinli' && host == 'promo') {
    router.push({
      path: '/promotion/list',
    });
    return;
  }

  // Bet
  if (scheme == 'xinli' && host == 'bet') {
    router.push({
      path: '/bet/list',
    });
    return;
  }

  // Profile
  if (scheme == 'xinli' && host == 'profile') {
    router.push({
      path: '/personal',
    });
    return;
  }

  // Atm
  if (scheme == 'xinli' && host == 'atm') {
    router.push({
      path: '/withdrawal/management',
    });
    return;
  }

  // Transaction
  if (scheme == 'xinli' && host == 'transaction') {
    router.push({
      path: '/transaction',
    });
    return;
  }

  // Security
  if (scheme == 'xinli' && host == 'security') {
    router.push({
      path: '/security',
    });
    return;
  }

  // Assemble
  if (scheme == 'xinli' && host == 'assemble' && id.length > 0) {
    useAppStore().showGameGroupPopup(Number(id));
    return;
  }

  // Vip
  if (scheme == 'xinli' && host == 'vip') {
    router.push({
      path: '/vip',
    });
    return;
  }

  // Deposit
  if (scheme == 'xinli' && host == 'deposit') {
    router.push({
      path: '/deposit',
    });
    return;
  }

  // Withdrawal
  if (scheme == 'xinli' && host == 'withdrawal') {
    router.push({
      path: '/withdrawal',
    });
    return;
  }

  // Announcement detail
  if (scheme == 'xinli' && host == 'announcement' && id.length > 0) {
    router.push({
      path: `/announcement/detail/${id}`,
    });
    return;
  }

  // Announcement list
  if (scheme == 'xinli' && host == 'announcement') {
    router.push({
      path: `/announcement/list`,
    });
    return;
  }

  // Inbox
  if (scheme == 'xinli' && host == 'inbox') {
    router.push({
      path: `/letter/list`,
    });
    return;
  }

  // Login
  if (scheme == 'xinli' && host == 'login') {
    window.location.href = ENV.VITE_LOGIN_URL || '';
    return;
  }

  // Signup
  if (scheme == 'xinli' && host == 'signup') {
    window.location.href = ENV.VITE_REGISTER_URL || '';
    return;
  }

  // In app
  if (scheme == 'xinli' && host == 'inapp' && id.length > 0) {
    useAppStore().showInAppPopup(id, '');
    return;
  }

  // Out app
  if (scheme == 'xinli' && host == 'outapp' && id.length > 0) {
    window.open(id, '_blank');
    return;
  }

  // Undefined internal page
  if (scheme == 'xinli') {
    router.replace({
      path: '/',
    });
    return;
  }

  // Http
  if (scheme == 'http' || scheme == 'https') {
    window.open(url, '_blank');
    return;
  }
};

/**
 * 顯示登入彈窗
 */
export const showLoginDialog = () => {
  Dialog({
    theme: 'round-button',
    teleport: '#dialog-container',
    title: i18n.global.t('common_loginRequiredTitle'),
    message: i18n.global.t('common_loginRequiredMessage'),
    confirmButtonText: i18n.global.t('common_login'),
    cancelButtonText: i18n.global.t('common_close'),
    showCancelButton: true,
    showConfirmButton: true,
  }).then(() => {
    window.location.href = ENV.VITE_LOGIN_URL || '';
  });
};
