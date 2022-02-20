import { defHttp } from '/@/utils/http/axios';

import {
  BaseResponse,
  CreateLaunchedParams,
  UpdateLaunchedParams,
  CreateLaunchedResponse,
  GetLaunchedParams,
  GetLaunchedResponse,
  GetLaunchedListParams,
  GetLaunchedListResponse,
} from './model/launchedModel';

enum ApiList {
  launched = '/backend/promotion/launched',
  launchedList = '/backend/promotion/launched/list',
}

/**
 * @description: 優惠：新增優惠上架API
 * @method: post
 */
export function createLaunched(params?: CreateLaunchedParams) {
  return defHttp.post<CreateLaunchedResponse>({ url: ApiList.launched, params });
}

/**
 * @description: 優惠：編輯優惠上架API
 * @method: post
 */
 export function updateLaunched(params?: UpdateLaunchedParams) {
  return defHttp.put<CreateLaunchedResponse>({ url: ApiList.launched, params });
}

/**
 * @description: 優惠：取得單一上架優惠
 * @method: get
 */
export function getLaunched(params?: GetLaunchedParams) {
  return defHttp.get<GetLaunchedResponse>({
    url: ApiList.launched,
    params,
  });
}
/**
 * @description: 優惠:優惠上架列表API
 * @method: get
 */
export function getLaunchedList(params?: GetLaunchedListParams) {
  return defHttp.get<BaseResponse<GetLaunchedListResponse>>({
    url: ApiList.launchedList,
    params,
  });
}
