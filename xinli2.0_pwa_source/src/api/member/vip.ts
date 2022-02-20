import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type { GetVipInfoResponse, GetVipSettingResponse, GetVipGiftResponse, PostVipGiftRequestData, PostVipGiftTypeRequestData, PostVipGiftReadRequestData } from '@/api/member/model/vip-model';

/**
 * Api urls
 */
enum Urls {
  INFO = '/member/vip/info',
  SETTING = '/member/vip/setting',
  GIFT = '/member/vip/gift',
  GIFT_TYPE = '/member/vip/gift/type',
  GIFT_ALL = '/member/vip/gift/all',
  GIFT_READ = '/member/vip/gift/read',
}

/**
 * 取得VIP資訊
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getVipInfo = (errorHandler?: ErrorHandler) => api.get<GetVipInfoResponse>(Urls.INFO, { data: errorHandler });

/**
 * 取得VIP設定
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getVipSetting = (errorHandler?: ErrorHandler) => api.get<GetVipSettingResponse>(Urls.SETTING, { data: errorHandler });

/**
 * 取得VIP可領取資訊
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getVipGift = (errorHandler?: ErrorHandler) => api.get<GetVipGiftResponse>(Urls.GIFT, { data: errorHandler });

/**
 * 領取VIP禮金
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postVipGift = (data?: PostVipGiftRequestData, errorHandler?: ErrorHandler) => api.post(Urls.GIFT, data, { data: errorHandler });

/**
 * 領取VIP禮金(依照類型)
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postVipGiftType = (data?: PostVipGiftTypeRequestData, errorHandler?: ErrorHandler) => api.post(Urls.GIFT_TYPE, data, { data: errorHandler });

/**
 * 一鍵領取VIP禮金
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postVipGiftAll = (errorHandler?: ErrorHandler) => api.post(Urls.GIFT_ALL, { data: errorHandler });

/**
 * 已讀VIP禮金
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postVipGiftRead = (data?: PostVipGiftReadRequestData, errorHandler?: ErrorHandler) => api.post(Urls.GIFT_READ, data, { data: errorHandler });
