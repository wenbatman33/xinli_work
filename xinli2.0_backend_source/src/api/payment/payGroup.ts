import { defHttp } from '/@/utils/http/axios';
import {
  BaseResponse,
  PostPayGroupParams,
  PostPayGroupResponse,
  GetPayGroupParams,
  GetPayGroupResponse,
  PutPayGroupParams,
  PutPayGroupResponse,
  GetPayGroupsParams,
  GetPayGroupsResponse,
  PostPayGroupMemberParams,
  PostPayGroupMemberResponse,
} from './model/payGroupModel';

enum ApiList {
  PayGroup = '/backend/pay_group/group',
  PayGroups = '/backend/pay_group/groups',
  PayGroupMember = '/backend/pay_group/member',
}

/**
 * @description: 金流組別（三方）：新增金流組別API
 * @method: post
 */
export function createPayGroup(params: PostPayGroupParams) {
  return defHttp.post<PostPayGroupResponse>({ url: ApiList.PayGroup, params });
}
/**
 * @description: 金流組別（三方）：取得單一組別
 * @method: get
 */
export function getPayGroup(params: GetPayGroupParams) {
  return defHttp.get<BaseResponse<GetPayGroupResponse>>({ url: ApiList.PayGroup, params });
}
/**
 * @description: 金流組別（三方）：修改金流組別API
 * @method: put
 */
export function putPayGroup(params: PutPayGroupParams) {
  return defHttp.put<PutPayGroupResponse>({ url: ApiList.PayGroup, params });
}
/**
 * @description: 金流組別（三方）:金流組別列表API
 * @method: get
 */
export function getPayGroups(params: GetPayGroupsParams) {
  return defHttp.get<BaseResponse<GetPayGroupsResponse>>({ url: ApiList.PayGroups, params });
}
/**
 * @description: 金流組別（三方）：加入玩家(會員需已填寫手機+不可填寫錯誤帳號(待會員dc處理)
 * @method: gpostet
 */
export function postPayGroupsMember(params: PostPayGroupMemberParams) {
  return defHttp.post<PostPayGroupMemberResponse>({ url: ApiList.PayGroupMember, params });
}
