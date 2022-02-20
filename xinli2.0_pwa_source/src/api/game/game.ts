import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type { PostRecycleResponse, GetGameLoginParams, GetGameLoginResponse } from '@/api/game/model/game-model';

/**
 * Api urls
 */
enum Urls {
  RECYCLE = '/game/game/recycle',
  LOGIN = '/game/game/login',
}

/**
 * 一鍵回收
 * @param data Post data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postRecycle = (errorHandler?: ErrorHandler) => api.post<PostRecycleResponse>(Urls.RECYCLE, { data: errorHandler });

/**
 * 登入遊戲取得網址
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getGameLogin = (params?: GetGameLoginParams, errorHandler?: ErrorHandler) => api.get<GetGameLoginResponse>(Urls.LOGIN, { params, data: errorHandler });
