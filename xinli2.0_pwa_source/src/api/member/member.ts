import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type {
  GetMeResponse,
  PutNameRequestData,
  PostPhoneRequestData,
  PostPhoneResponse,
  PutPhoneRequestData,
  PutEmailRequestData,
  PostPasswordRequestData,
  PostPasswordResponse,
  PutPasswordRequestData,
  GetBankcardsResponse,
  PostBankcardRequestData,
  DeleteBankcardParams,
  PostBankcardOtherRequestData,
  GetUSDTSResponse,
  PostSmsRequestData,
  PostUSDTRequestData,
  DeleteUSDTParams,
  PutDetailRequestData,
} from '@/api/member/model/member-model';

/**
 * Api urls
 */
enum Urls {
  ME = '/member/member/me',
  NAME = '/member/member/name',
  PHONE = '/member/member/phone',
  EMAIL = '/member/member/email',
  PASSWORD = '/member/member/password',
  DETAIL = '/member/member/detail',
  BANKCARDS = '/member/member/bankcards',
  BANKCARD = '/member/member/bankcard',
  BANKCARD_OTHER = '/member/member/bankcard/other',
  USDTS = '/member/member/usdts',
  SMS = '/member/member/sms',
  USDT = '/member/member/usdt',
}

/**
 * 取得會員詳細資料
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getMe = (errorHandler?: ErrorHandler) => api.get<GetMeResponse>(Urls.ME, { data: errorHandler });

/**
 * 修改會員實名
 * @param data Put data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const putName = (data?: PutNameRequestData, errorHandler?: ErrorHandler) => api.put(Urls.NAME, data, { data: errorHandler });

/**
 * 發送手機驗證碼
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postPhone = (data?: PostPhoneRequestData, errorHandler?: ErrorHandler) => api.post<PostPhoneResponse>(Urls.PHONE, data, { data: errorHandler });

/**
 * 修改會員手機
 * @param data Put data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const putPhone = (data?: PutPhoneRequestData, errorHandler?: ErrorHandler) => api.put(Urls.PHONE, data, { data: errorHandler });

/**
 * 修改會員信箱
 * @param data Put data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const putEmail = (data?: PutEmailRequestData, errorHandler?: ErrorHandler) => api.put(Urls.EMAIL, data, { data: errorHandler });

/**
 * 驗證舊密碼
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postPassword = (data?: PostPasswordRequestData, errorHandler?: ErrorHandler) => api.post<PostPasswordResponse>(Urls.PASSWORD, data, { data: errorHandler });

/**
 * 修改會員密碼
 * @param data Put data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const putPassword = (data?: PutPasswordRequestData, errorHandler?: ErrorHandler) => api.put(Urls.PASSWORD, data, { data: errorHandler });

/**
 * 修改會員資料
 * @param data Put data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const putDetail = (data?: PutDetailRequestData, errorHandler?: ErrorHandler) => api.put(Urls.DETAIL, data, { data: errorHandler });

/**
 * 取得會員銀行卡
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getBankcards = (errorHandler?: ErrorHandler) => api.get<GetBankcardsResponse>(Urls.BANKCARDS, { data: errorHandler });

/**
 * 新增會員銀行卡
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postBankcard = (data?: PostBankcardRequestData, errorHandler?: ErrorHandler) => api.post(Urls.BANKCARD, data, { data: errorHandler });

/**
 * 刪除會員銀行卡
 * @param params Delete query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const deleteBankcard = (params?: DeleteBankcardParams, errorHandler?: ErrorHandler) => api.delete(Urls.BANKCARD, { params, data: errorHandler });

/**
 * 新增他人銀行卡
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postBankcardOther = (data?: PostBankcardOtherRequestData, errorHandler?: ErrorHandler) => api.post(Urls.BANKCARD_OTHER, data, { data: errorHandler });

/**
 * 取得會員USDT
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getUDSTS = (errorHandler?: ErrorHandler) => api.get<GetUSDTSResponse>(Urls.USDTS, { data: errorHandler });

/**
 * 驗證驗證碼
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postSms = (data?: PostSmsRequestData, errorHandler?: ErrorHandler) => api.post(Urls.SMS, data, { data: errorHandler });

/**
 * 新增會員USDT
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postUSDT = (data?: PostUSDTRequestData, errorHandler?: ErrorHandler) => api.post(Urls.USDT, data, { data: errorHandler });

/**
 * 刪除會員USDT
 * @param params Delete query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const deleteUSDT = (params?: DeleteUSDTParams, errorHandler?: ErrorHandler) => api.delete(Urls.USDT, { params, data: errorHandler });
