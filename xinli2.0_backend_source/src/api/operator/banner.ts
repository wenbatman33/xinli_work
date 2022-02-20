import { defHttp } from '/@/utils/http/axios';

import {
  GetBannerParams,
  GetBannerResponse,
  GetBannerCategoryParams,
  GetBannerCategoryResponse,
  PostBannerCategoryParams,
  PostBannerCategoryResponse,
  PutBannerCategoryParams,
  PutBannerCategoryResponse,
  CreateBannerParams,
  CreateBannerResponse,
  PutBannerParams,
  PutBannerResponse,
  DeleteBannerParams,
  DeleteBannerResponse,
  BannerCategoryResopnse,
} from './model/bannerModel';

enum ApiList {
  siteBanner = '/backend/site/banner',
  siteBannerSort = '/backend/site/banner/sort',
  siteBannerCategory = '/backend/site/banner/category',
  siteBannerCategoryDropdown = '/backend/site/banner/dropdown',
}

/**
 * @description: 廣告分類: 列表
 * @method: get
 */
export function getBannerCategory(params?: GetBannerCategoryParams) {
  return defHttp.get<GetBannerCategoryResponse>({ url: ApiList.siteBannerCategory, params });
}

/**
 * @description: 廣告分類: 新增
 * @method: post
 */
export function postBannerCategory(params?: PostBannerCategoryParams) {
  return defHttp.post<PostBannerCategoryResponse>({
    url: ApiList.siteBannerCategory,
    params,
  });
}
/**
 * @description: 廣告分類: 修改
 * @method: post
 */
export function putBannerCategory(params?: PutBannerCategoryParams) {
  return defHttp.put<PutBannerCategoryResponse>({ url: ApiList.siteBannerCategory, params });
}
/**
 * @description: 廣告: 列表
 * @method: get
 */
export function getBanner(params?: GetBannerParams) {
  return defHttp.get<GetBannerResponse>({ url: ApiList.siteBanner, params });
}
/**
 * @description: 廣告: 新增
 * @method: post
 */
export function createBanner(params?: CreateBannerParams) {
  return defHttp.post<CreateBannerResponse>({ url: ApiList.siteBanner, params });
}
/**
 * @description: 廣告: 編輯
 * @method: put
 */
export function putBanner(params?: PutBannerParams) {
  return defHttp.put<PutBannerResponse>({ url: ApiList.siteBanner, params });
}
/**
 * @description: 廣告: 編輯
 * @method: delete
 */
export function deleteBanner(data: DeleteBannerParams) {
  return defHttp.delete<DeleteBannerResponse>({ url: ApiList.siteBanner, params: data, data });
}
/**
 * @description: 廣告: 下拉選單
 * @method: get
 */
export function getBannerCategoryDropdown() {
  return defHttp.get<BannerCategoryResopnse>({ url: ApiList.siteBannerCategoryDropdown });
}
