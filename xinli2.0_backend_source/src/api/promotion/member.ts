import { defHttp } from '/@/utils/http/axios';

import {
  GetPromotionmMemberParams,
  GetPromotionmMemberResponse,
  GetPromotionmMemberListParams,
  GetPromotionmMemberListResponse,
  GetPromotionmMemberWithdrawParams,
  GetPromotionmMemberWithdrawResponse,
} from './model/memberModel';

enum ApiList {
  promotionMember = '/backend/promotion/member',
  promotionMemberList = '/backend/promotion/member/list',
  promotionMemberWithdraw = '/backend/promotion/member/withdrw',
}

/**
 * @description: 優惠:批次派發列表
 * @method: get
 */
export function getPromotionmMember(params?: GetPromotionmMemberParams) {
  return defHttp.get<GetPromotionmMemberResponse>({
    url: ApiList.promotionMember,
    params,
  });
}
/**
 * @description: 優惠:申請清單
 * @method: get
 */
export function getPromotionmMemberList(params?: GetPromotionmMemberListParams) {
  return defHttp.get<GetPromotionmMemberListResponse>({
    url: ApiList.promotionMemberList,
    params,
  });
}
/**
 * @description: 優惠:提供會員在指定時間內領取的優惠資訊
 * @method: get
 */
export function getPromotionmMemberWithdraw(params?: GetPromotionmMemberWithdrawParams) {
  return defHttp.get<GetPromotionmMemberWithdrawResponse>({
    url: ApiList.promotionMemberWithdraw,
    params,
  });
}