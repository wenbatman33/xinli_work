import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type { GetSendParams, PostVerifyRequestData, PostVerifyResponse } from '@/api/member/model/sms-model';

/**
 * Api urls
 */
enum Urls {
  SEND = '/member/sms/send',
  VERIFY = '/member/sms/verify',
}

/**
 * 發送訊息
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getSend = (params?: GetSendParams, errorHandler?: ErrorHandler) => api.get(Urls.SEND, { params, data: errorHandler });

/**
 * 驗證驗證碼
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postVerify = (data?: PostVerifyRequestData, errorHandler?: ErrorHandler) => api.post<PostVerifyResponse>(Urls.VERIFY, data, { data: errorHandler });
