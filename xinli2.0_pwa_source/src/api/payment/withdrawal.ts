import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type { GetWithdrawalResponse, PostWithdrawalRequestData, PostWithdrawalResponse } from '@/api/payment/model/withdrawal-model';

/**
 * Api urls
 */
enum Urls {
  WITHDRAWAL = '/payment/withdrawal',
}

/**
 * 提款: 提款首頁
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getWithdrawal = (errorHandler?: ErrorHandler) => api.get<GetWithdrawalResponse>(Urls.WITHDRAWAL, { data: errorHandler });

/**
 * 提款: 提款送出
 * @param data Post request body
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postWithdrawal = (data?: PostWithdrawalRequestData, errorHandler?: ErrorHandler) => api.post<PostWithdrawalResponse>(Urls.WITHDRAWAL, data, { data: errorHandler });
