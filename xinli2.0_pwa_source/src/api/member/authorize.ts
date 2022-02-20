import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type {
  GetRegisterConfigResponse,
  GetLoginConfigResponse,
  PostSSORegisterRequestData,
  PostSSORegisterResponse,
  PostSSOLoginRequestData,
  PostSSOLoginResponse,
  PostLoginRequestData,
  PostLoginResponse,
  PostPhoneRequestData,
  PostPhoneResponse,
  PostSendSmsRequestData,
  PostSecondRequestData,
  PostSecondResponse,
  GetCaptchaResponse,
} from '@/api/member/model/authorize-model';

/**
 * Api urls
 */
enum Urls {
  REGISTER_CONFIG = '/member/authorize/register/config',
  LOGIN_CONFIG = '/member/authorize/login/config',
  SSO_REGISTER = '/member/authorize/sso_register',
  SSO_LOGIN = '/member/authorize/sso_login',
  LOGIN = '/member/authorize/login',
  PHONE = '/member/authorize/phone',
  SEND_SMS = '/member/authorize/send_sms',
  SECOND = '/member/authorize/second',
  CAPTCHA = '/member/authorize/captcha',
  LOGOUT = '/member/authorize/logout',
}

/**
 * 取得註冊設定
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getRegisterConfig = (errorHandler?: ErrorHandler) => api.get<GetRegisterConfigResponse>(Urls.REGISTER_CONFIG, { data: errorHandler });

/**
 * 取得註冊設定
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getLoginConfig = (errorHandler?: ErrorHandler) => api.get<GetLoginConfigResponse>(Urls.LOGIN_CONFIG, { data: errorHandler });

/**
 * SSO註冊
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postSSORegister = (data?: PostSSORegisterRequestData, errorHandler?: ErrorHandler) => api.post<PostSSORegisterResponse>(Urls.SSO_REGISTER, data, { data: errorHandler });

/**
 * SSO登入
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postSSOLogin = (data?: PostSSOLoginRequestData, errorHandler?: ErrorHandler) => api.post<PostSSOLoginResponse>(Urls.SSO_LOGIN, data, { data: errorHandler });

/**
 * 登入
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postLogin = (data?: PostLoginRequestData, errorHandler?: ErrorHandler) => api.post<PostLoginResponse>(Urls.LOGIN, data, { data: errorHandler });

/**
 * 二階段驗證手機
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postPhone = (data?: PostPhoneRequestData, errorHandler?: ErrorHandler) => api.post<PostPhoneResponse>(Urls.PHONE, data, { data: errorHandler });

/**
 * 二階段驗證發送簡訊
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postSendSms = (data?: PostSendSmsRequestData, errorHandler?: ErrorHandler) => api.post(Urls.SEND_SMS, data, { data: errorHandler });

/**
 * 二階段驗證
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postSecond = (data?: PostSecondRequestData, errorHandler?: ErrorHandler) => api.post<PostSecondResponse>(Urls.SECOND, data, { data: errorHandler });

/**
 * 取得驗證碼
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getCaptcha = (errorHandler?: ErrorHandler) => api.get<GetCaptchaResponse>(Urls.CAPTCHA, { data: errorHandler });

/**
 * 登出
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postLogout = (errorHandler?: ErrorHandler) => api.post(Urls.LOGOUT, { data: errorHandler });
