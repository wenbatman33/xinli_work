import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type {
  GetGameLogListParams,
  GetGameLogListResponse,
  GetSlotLogListResponse,
  GetEsportLogListResponse,
  GetLotteryLogListResponse,
  GetFishLogListResponse,
  GetSportLogListResponse,
} from '@/api/game/model/log-model';

/**
 * Api urls
 */
enum Urls {
  LIST = '/game/log/list',
  SLOT_LIST = '/game/log/slot/list',
  ESPORT_LIST = '/game/log/esport/list',
  LOTTERT_LIST = '/game/log/lottery/list',
  FISH_LIST = '/game/log/fish/list',
  SPORT_LIST = '/game/log/sport/list',
}

/**
 * 注單列表
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getGameLogList = (params?: GetGameLogListParams, errorHandler?: ErrorHandler) => api.get<GetGameLogListResponse>(Urls.LIST, { params, data: errorHandler });

/**
 * 老虎機注單詳情
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getSlotLogList = (params?: GetGameLogListParams, errorHandler?: ErrorHandler) => api.get<GetSlotLogListResponse>(Urls.SLOT_LIST, { params, data: errorHandler });

/**
 * 電競體育類注單詳情
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getEsportLogList = (params?: GetGameLogListParams, errorHandler?: ErrorHandler) => api.get<GetEsportLogListResponse>(Urls.ESPORT_LIST, { params, data: errorHandler });

/**
 * 彩票類注單詳情
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getLotteryLogList = (params?: GetGameLogListParams, errorHandler?: ErrorHandler) => api.get<GetLotteryLogListResponse>(Urls.LOTTERT_LIST, { params, data: errorHandler });

/**
 * 補魚類注單詳情
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getFishLogList = (params?: GetGameLogListParams, errorHandler?: ErrorHandler) => api.get<GetFishLogListResponse>(Urls.FISH_LIST, { params, data: errorHandler });

/**
 * 體育類注單詳情
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getSportLogList = (params?: GetGameLogListParams, errorHandler?: ErrorHandler) => api.get<GetSportLogListResponse>(Urls.SPORT_LIST, { params, data: errorHandler });
