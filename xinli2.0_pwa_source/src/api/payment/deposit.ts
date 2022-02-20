import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type {
  GetDepositResponse,
  PostDepositRequestData,
  PostDepositResponse,
  PostDepositCancelRequestData,
  GetDepositDetailParams,
  GetDepositDetailResponse,
} from '@/api/payment/model/deposit-model';

/**
 * Api urls
 */
enum Urls {
  DEPOSIT = '/payment/deposit',
  CANCEL = '/payment/deposit/cancel',
  DETAIL = '/payment/deposit/detail',
}

/**
 * 存款： 取得線路
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getDeposit = (errorHandler?: ErrorHandler) => api.get<GetDepositResponse>(Urls.DEPOSIT, { data: errorHandler });

/**
 * 存款： 建立存款單
 * @param data Post body data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postDeposit = (data?: PostDepositRequestData, errorHandler?: ErrorHandler) => api.post<PostDepositResponse>(Urls.DEPOSIT, data, { data: errorHandler });

/**
 * 存款： 取消充值
 * @param data Post body data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postDepositCancel = (data?: PostDepositCancelRequestData, errorHandler?: ErrorHandler) => api.post(Urls.CANCEL, data, { data: errorHandler });

/**
 * 存款：單筆充值單資訊
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getDepositDetail = (params?: GetDepositDetailParams, errorHandler?: ErrorHandler) => api.get<GetDepositDetailResponse>(Urls.DETAIL, { params, data: errorHandler });
