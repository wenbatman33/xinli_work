import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type { GetRegionParams, GetRegionResponse } from '@/api/member/model/region-model';

/**
 * Api urls
 */
enum Urls {
  PROVINCES = '/member/region/provinces',
  CITIES = '/member/region/cities',
  STATE = '/member/region/state',
  STREET = '/member/region/street',
}

/**
 * 取得省份
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getProvinces = (errorHandler?: ErrorHandler) => api.get<GetRegionResponse>(Urls.PROVINCES, { data: errorHandler });

/**
 * 取得城市
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getCities = (params?: GetRegionParams, errorHandler?: ErrorHandler) => api.get<GetRegionResponse>(Urls.CITIES, { params, data: errorHandler });

/**
 * 取得區域
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getState = (params?: GetRegionParams, errorHandler?: ErrorHandler) => api.get<GetRegionResponse>(Urls.STATE, { params, data: errorHandler });

/**
 * 取得街區
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getStreet = (params?: GetRegionParams, errorHandler?: ErrorHandler) => api.get<GetRegionResponse>(Urls.STREET, { params, data: errorHandler });
