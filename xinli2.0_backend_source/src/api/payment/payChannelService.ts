import { defHttp } from '/@/utils/http/axios';
import {
  BaseResponse,
  CreateServiceParams,
  CreateServiceResponse,
  GetServiceParams,
  GetServiceResponse,
  GetServiceByIdParams,
  GetServiceByIdResponse,
  PutEditServiceParams,
  PutEditServiceResponse,
  GetServiceDropdownResponse,
  GetGroupsExcludeParams,
  GetGroupsExcludeResponse,
  PutEditServiceGroupsParams,
  PutEditServicegGroupsResponse,
  PutEditServiceSortParams,
  PutEditServiceSortResponse,
  GetChannelDropdownResponse,
} from './model/payChannelServiceModel';

enum ApiList {
  ServiceCreate = '/backend/pay_channel_service/create',
  Service = '/backend/pay_channel_service/',
  ServiceEdit = '/backend/pay_channel_service/edit',
  ServiceDropdown = '/backend/pay_channel_service/dropdown',
  ServiceExclude = '/backend/pay_channel_service/groups/exclude',
  ServiceGroups = '/backend/pay_channel_service/groups',
  ServiceSort = '/backend/pay_channel_service/sort',
  channelDropdown = '/backend/pay/pay_channel/dropdown',
}

/**
 * @description: 線路管理（代收）:新增線路API
 * @method: post
 */
export function createService(params: CreateServiceParams) {
  return defHttp.post<CreateServiceResponse>({ url: ApiList.ServiceCreate, params });
}
/**
 * @description: 線路管理（代收）:線路列表API
 * @method: get
 */
export function getService(params?: GetServiceParams) {
  return defHttp.get<BaseResponse<GetServiceResponse>>({ url: ApiList.Service, params });
}
/**
 * @description: 線路管理（代收）:查看列表API
 * @method: get
 */
export function getServiceById(params?: GetServiceByIdParams) {
  return defHttp.get<GetServiceByIdResponse>({ url: ApiList.ServiceEdit, params });
}
/**
 * @description: 線路管理（代收）:編輯列表API
 * @method: put
 */
export function putEditService(params: PutEditServiceParams) {
  return defHttp.put<PutEditServiceResponse>({ url: ApiList.ServiceEdit, params });
}

/**
 * @description: 取得搜尋下拉清單
 * @method: get
 */
export function getServiceDropdown() {
  return defHttp.get<GetServiceDropdownResponse>({ url: ApiList.ServiceDropdown });
}
/**
/**
 * @description: 取得搜尋下拉清單
 * @method: get
 */
export function getChannelDropdown() {
  return defHttp.get<GetChannelDropdownResponse>({ url: ApiList.channelDropdown });
}
/**
 * @description: 取得不包含指定線路的群組
 * @method: get
 */
export function getServiceGroupsExclude(params: GetGroupsExcludeParams) {
  return defHttp.get<GetGroupsExcludeResponse>({ url: ApiList.ServiceExclude, params });
}
/**
 * @description: 將線路儲存到指定的金流群組
 * @method: put
 */
export function putServiceGroups(params: PutEditServiceGroupsParams) {
  return defHttp.put<PutEditServicegGroupsResponse>({ url: ApiList.ServiceGroups, params });
}
/**
 * @description: 將線路重新排序
 * @method: put
 */
export function putServiceSort(params: PutEditServiceSortParams) {
  return defHttp.put<PutEditServiceSortResponse>({ url: ApiList.ServiceSort, params });
}
