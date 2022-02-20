import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type { GetBalanceCurrentResponse, GetBalanceSingleParams, GetBalanceSingleResponse } from '@/api/game/model/balance-model';

/**
 * Api urls
 */
enum Urls {
  CURRENT = '/game/game/balance/current',
  SINGLE = '/game/game/balance/single',
}

/**
 * 立即取得所有錢包餘額
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getBalanceCurrent = (errorHandler?: ErrorHandler) => api.get<GetBalanceCurrentResponse>(Urls.CURRENT, { data: errorHandler });

/**
 * 立即取得單一錢包餘額
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getBalanceSingle = (params?: GetBalanceSingleParams, errorHandler?: ErrorHandler) => api.get<GetBalanceSingleResponse>(Urls.SINGLE, { params, data: errorHandler });
