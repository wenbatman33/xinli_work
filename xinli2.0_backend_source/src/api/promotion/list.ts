import { defHttp } from '/@/utils/http/axios';

import {
  BaseResponse,
  GetPromotionDropdownResponse,
  GetPromotionListParams,
  GetPromotionListResponse,
  CreatePromotionParams,
  CreatePromotionResponse,
  DeletePromotionParams,
  DeletePromotionResponse,
  PutPromotionParams,
  PutPromotionResponse,
  CreatePromotionCondParams,
  CreatePromotionCondResponse,
  GetPromotionCondParams,
  GetPromotionCondResponse,
  PutPromotionCondParams,
  PutPromotionCondResponse,
  GetPromotionCondListParams,
  GetPromotionCondListResponse,
  GetPromotionExcludeParams,
  GetPromotionExcludeResponse,
  DeletePromotionCondParams,
  DeletePromotionCondResponse,
  DeletePromotionCondCondsParams,
  DeletePromotionCondCondsResponse,
} from './model/listModel';

enum ApiList {
  promotionDropdown = '/backend/promotion/dropdown',
  promotion = '/backend/promotion',
  promotionList = '/backend/promotion/list',
  promotionCond = '/backend/promotion/cond',
  promotionCondList = '/backend/promotion/cond/list',
  promotionExclude = '/backend/promotion/exclude',
  promotionCondConds = '/backend/promotion/cond/conds',
  promotionLog = '/backend/promotion/log/list',
}

/**
 * @description: 優惠:下拉選單API
 * @method: get
 */
export function getPromotionDropdown() {
  return defHttp.get<GetPromotionDropdownResponse>({
    url: ApiList.promotionDropdown,
  });
}
/**
 * @description: 優惠：新增優惠API
 * @method: post
 */
export function createPromotion(params?: CreatePromotionParams) {
  return defHttp.post<CreatePromotionResponse>({
    url: ApiList.promotion,
    params,
  });
}
/**
 * @description: 優惠：新增優惠API
 * @method: DELETE
 */
export function deletePromotion(data?: DeletePromotionParams) {
  return defHttp.delete<DeletePromotionResponse>({ url: ApiList.promotion, params: data, data });
}

/**
 * @description: 優惠：修改優惠API
 * @method: put
 */
export function putPromotion(params?: PutPromotionParams) {
  return defHttp.put<PutPromotionResponse>({
    url: ApiList.promotion,
    params,
  });
}
/**
 * @description: 優惠:優惠列表API
 * @method: get
 */
export function getPromotionList(params?: GetPromotionListParams) {
  return defHttp.get<BaseResponse<GetPromotionListResponse>>({
    url: ApiList.promotionList,
    params,
  });
}

/**
 * @description: 優惠：新增優惠模板API
 * @method: post
 */
export function createPromotionCond(params?: CreatePromotionCondParams) {
  return defHttp.post<CreatePromotionCondResponse>({
    url: ApiList.promotionCond,
    params,
  });
}

/**
 * @description: 優惠：取得單一優惠模板
 * @method: get
 */
export function getPromotionCond(params?: GetPromotionCondParams) {
  return defHttp.get<GetPromotionCondResponse>({
    url: ApiList.promotionCond,
    params,
  });
}

/**
 * @description: 優惠：修改優惠模板API
 * @method: put
 */
export function putPromotionCond(params?: PutPromotionCondParams) {
  return defHttp.put<PutPromotionCondResponse>({
    url: ApiList.promotionCond,
    params,
  });
}

/**
 * @description: 優惠：優惠模板列表
 * @method: get
 */
export function getPromotionCondList(params?: GetPromotionCondListParams) {
  return defHttp.get<GetPromotionCondListResponse>({
    url: ApiList.promotionCondList,
    params,
  });
}
/**
 * @description: 優惠:排除優惠選單
 * @method: get
 */
export function getPromotionExclude(params?: GetPromotionExcludeParams) {
  return defHttp.get<GetPromotionExcludeResponse>({
    url: ApiList.promotionExclude,
    params,
  });
}

/**
 * @description: 優惠：刪除優惠單一模板
 * @method: delete
 */
export function deletePromotionCond(data?: DeletePromotionCondParams) {
  return defHttp.delete<DeletePromotionCondResponse>({
    url: ApiList.promotionCond,
    params: data,
    data,
  });
}
/**
 * @description: 優惠：刪除指定優惠與類型的多個模板
 * @method: delete
 */
export function deletePromotionCondConds(data?: DeletePromotionCondCondsParams) {
  return defHttp.delete<DeletePromotionCondCondsResponse>({
    url: ApiList.promotionCondConds,
    params: data,
    data,
  });
}

/**
 * @description: 優惠:優惠操作记录API
 * @method: get
 */
 export function getPromotionLog(params: {ID: number}) {
  return defHttp.get({
    url: `${ApiList.promotionLog}`,
    params
  });
}