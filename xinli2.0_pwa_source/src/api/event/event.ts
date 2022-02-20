import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type {
  GetAnnouncementResponse,
  GetBannerParams,
  GetBannerResponse,
  GetLetterListParams,
  GetLetterListResponse,
  GetLetterParams,
  GetLetterResponse,
  PutLetterRequestData,
  PutLetterResponse,
  DeleteLetterParams,
  DeleteLetterResponse,
} from '@/api/event/model/event-model';

/**
 * Api urls
 */
enum Urls {
  ANNOUNCEMENT = '/event/announcement',
  BANNER = '/event/banner',
  LETTER_LIST = '/event/letter/list',
  LETTER = '/event/letter',
}

/**
 * 取得公告
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getAnnouncement = (errorHandler?: ErrorHandler) => api.get<GetAnnouncementResponse>(Urls.ANNOUNCEMENT, { data: errorHandler });

/**
 * 取得廣告
 * @param params Query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getBanner = (params?: GetBannerParams, errorHandler?: ErrorHandler) => api.get<GetBannerResponse>(Urls.BANNER, { params, data: errorHandler });

/**
 * 會員站內信
 * @param params Query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getLetterList = (params?: GetLetterListParams, errorHandler?: ErrorHandler) => api.get<GetLetterListResponse>(Urls.LETTER_LIST, { params, data: errorHandler });

/**
 * 單一站內信
 * @param params Query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getLetter = (params?: GetLetterParams, errorHandler?: ErrorHandler) => api.get<GetLetterResponse>(Urls.LETTER, { params, data: errorHandler });

/**
 * 讀取站內信
 * @param data Put request data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const putLetter = (data?: PutLetterRequestData, errorHandler?: ErrorHandler) => api.put<PutLetterResponse>(Urls.LETTER, data, { data: errorHandler });

/**
 * 刪除站內信
 * @param params Delete request query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const deleteLetter = (params?: DeleteLetterParams, errorHandler?: ErrorHandler) => api.delete<DeleteLetterResponse>(Urls.LETTER, { params, data: errorHandler });
