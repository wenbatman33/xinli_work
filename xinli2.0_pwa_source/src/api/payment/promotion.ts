import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type {
  GetPromotionParams,
  GetPromotionResponse,
  GetPromotionOneParams,
  GetPromotionOneResponse,
  GetPromotionDropdownResponse,
  PostApplyPromotionRequestData,
  PostApplyPromotionResponse,
} from '@/api/payment/model/promotion-model';

/**
 * Api urls
 */
enum Urls {
  PROMOTION = '/payment/promotion',
  PROMOTION_ONE = '/payment/promotion/one',
  PROMOTION_DROPDOWN = '/payment/promotion/dropdown',
  PROMOTION_APPLY = '/payment/promotion/apply',
}

/**
 * 優惠活動：列表
 * @param params Query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getPromotion = (params?: GetPromotionParams, errorHandler?: ErrorHandler) => api.get<GetPromotionResponse>(Urls.PROMOTION, { params, data: errorHandler });

/**
 * 優惠活動：單則優惠內容
 * @param params Query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getPromotionOne = (params?: GetPromotionOneParams, errorHandler?: ErrorHandler) => api.get<GetPromotionOneResponse>(Urls.PROMOTION_ONE, { params, data: errorHandler });

/**
 * 優惠：下拉選單
 * @param params Query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getPromotionDropdown = (errorHandler?: ErrorHandler) => api.get<GetPromotionDropdownResponse>(Urls.PROMOTION_DROPDOWN, { data: errorHandler });

/**
 * 優惠：申請
 * @param data Post body data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postApplyPromotion = (data?: PostApplyPromotionRequestData, errorHandler?: ErrorHandler) => api.post<PostApplyPromotionResponse>(Urls.PROMOTION_APPLY, data, { data: errorHandler });
