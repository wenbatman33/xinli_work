import { ApiResponse } from '@/api/basic-model';

/**
 * 登入資訊
 */
export interface LoginData {
  /**
   * 帳號
   */
  account?: string;

  /**
   * 強制更換密碼
   * 1: 強制更換
   * 2: 不用更換
   */
  forceChangePassword?: number;

  /**
   * 進入二階段驗證
   * 1: 進入
   * 2: 不用
   * 3: 進入，而且需要簡訊驗證
   */
  forceTwoPhase?: number;

  /**
   * 會員ID
   */
  memberID?: number;

  /**
   * 狀態
   * 1: 啟用
   * 2: 停用
   * 3: 鎖定
   */
  status?: number;

  /**
   * Token
   */
  token?: string;
}

/**
 * 註冊設定返回資訊
 */
export interface GetRegisterConfigResponseData {
  /**
   * 註冊是否需要行為驗證(關閉即為圖形驗證) true:需要 false:不需要
   */
  registerVerify?: boolean;
}

/**
 * 註冊設定 API 返回
 */
export type GetRegisterConfigResponse = ApiResponse<GetRegisterConfigResponseData>;

/**
 * 登入設定返回資訊
 */
export interface GetLoginConfigResponseData {
  /**
   * 登入是否需要行為驗證(關閉即為圖形驗證) true:需要 false:不需要
   */
  verify?: boolean;
}

/**
 * 登入設定 API 返回
 */
export type GetLoginConfigResponse = ApiResponse<GetLoginConfigResponseData>;

/**
 * SSO註冊 API 請求參數
 */
export interface PostSSORegisterRequestData {
  /**
   * RSA加密後的資料(username,password,exp)
   */
  data?: string;

  /**
   * 手機號
   */
  phone?: string;

  /**
   * 驗證碼
   */
  captcha?: string;

  /**
   * 驗證用的Secret
   */
  secret?: string;

  /**
   * Email
   */
  email?: string;

  /**
   * 裝置ID
   */
  deviceID?: string;

  /**
   * 產品平台
   */
  platform?: number;

  /**
   * 行為驗證用的token
   */
  token?: string;
}

/**
 * SSO註冊 API 返回資訊
 */
export type PostSSORegisterResponse = ApiResponse<LoginData>;

/**
 * SSO登入 API 請求參數
 */
export interface PostSSOLoginRequestData {
  /**
   * RSA加密後的資料(username,password,exp)
   */
  data?: string;

  /**
   * 裝置ID
   */
  deviceID?: string;

  /**
   * 產品平台
   */
  platform?: number;

  /**
   * 驗證碼
   */
  captcha?: string;

  /**
   * 驗證用的Secret
   */
  secret?: string;

  /**
   * 行為驗證用的token
   */
  token?: string;
}

/**
 * SSO登入 API 返回資訊
 */
export type PostSSOLoginResponse = ApiResponse<LoginData>;

/**
 * 登入 API 請求參數
 */
export interface PostLoginRequestData {
  /**
   * 帳號
   */
  account?: string;

  /**
   * 密碼
   */
  password?: string;

  /**
   * 裝置ID
   */
  deviceID?: string;

  /**
   * 產品平台
   */
  platform?: number;

  /**
   * 驗證碼
   */
  captcha?: string;

  /**
   * 驗證用的Secret
   */
  secret?: string;

  /**
   * 行為驗證用的token
   */
  token?: string;
}

/**
 * 登入 API 返回資訊
 */
export type PostLoginResponse = ApiResponse<LoginData>;

/**
 * 二階段驗證手機請求資訊
 */
export interface PostPhoneRequestData {
  /**
   * 手機號
   */
  phone: string;

  /**
   * 裝置ID
   */
  deviceID: string;

  /**
   * 產品平台
   */
  platform?: number;
}

/**
 * 二階段驗證手機請求資訊
 */
export interface PostPhoneResponseData {
  /**
   * 驗證狀態 1: 驗證成功, 2: 需驗證簡訊
   */
  status?: number;

  /**
   * 登入資訊
   */
  result?: LoginData;
}

/**
 * 二階段驗證手機 API 返回資訊
 */
export type PostPhoneResponse = ApiResponse<PostPhoneResponseData>;

/**
 * 二階段驗證發送簡訊請求資訊
 */
export interface PostSendSmsRequestData {
  /**
   * 手機號
   */
  phone: string;

  /**
   * 裝置ID
   */
  deviceID: string;

  /**
   * 產品平台
   */
  platform?: number;
}

/**
 * 二階段驗證請求資訊
 */
export interface PostSecondRequestData {
  /**
   * 手機號
   */
  phone: string;

  /**
   * 裝置ID
   */
  deviceID: string;

  /**
   * 產品平台
   */
  platform?: number;

  /**
   * 驗證碼
   */
  code: string;
}

/**
 * 二階段驗證 API 返回資訊
 */
export type PostSecondResponse = ApiResponse<LoginData>;

/**
 * 驗證碼資訊
 */
export interface GetCaptchaResponseData {
  /**
   * Base64的image
   */
  image?: string;

  /**
   * 驗證用secret
   */
  secret?: string;
}

/**
 * 取得驗證碼 API 返回資訊
 */
export type GetCaptchaResponse = ApiResponse<GetCaptchaResponseData>;
