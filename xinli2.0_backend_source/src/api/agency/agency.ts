import { defHttp } from '/@/utils/http/axios';

import {
  CreateAgencyResponse,
  GetAgencyResponse,
  GetAgencyListRes,
  createAgencyReq,
  GetAgencyGroupReq,
  putAgencyReq,
  getAgencyListReq,
  createAgencyRankSettingReq,
  GetAgencyGroupResponse,
  putAgencyDetailReq,
  putAgencyStatusReq,
  putAgencyGroupReq,
  checkAgencyReq,
  changeAgencyReq,
  createAgencyPromotionlinkReq,
} from './model/agencyModel';

enum ApiList {
  AgencyList = '/backend/agency/list',
  AgencyDetail = '/backend/agency',
  AgencyRankSettingPost = '/backend/agency/ranksetting',
  AgencyRankSettingOption = '/backend/agency/ranksetting/all',
  AgencyRankSetting = '/backend/agency/ranksetting/list',
  AgencyGroup = '/backend/agency/rankgroup',
  AgencyStatus = '/backend/agency/changestatus',
  AgencyCheck = '/backend/agency/node',
  AgencyMemberCheck = '/backend/agency/checkmember',
  AgencyPromotionlink = '/backend/agency/promotionlink',
  AgencyNodeList = '/backend/member/node/list',
  AgencyNode = '/backend/member/node',
  CheckAgencyNode = '/backend/member/node/checkagency',
  CheckMemberNode = '/backend/member/node/checkmember',
  CommissionList = '/backend/agency/commission/list',
  ReviewCommission = '/backend/agency/commission/review',
  ChildrenCommissionList = '/backend/agency/commission/childlist',
  ReviewChildrenCommission = '/backend/agency/commission/childreview',
}

export function createAgency(params: createAgencyReq) {
  return defHttp.post<CreateAgencyResponse>({ url: ApiList.AgencyList, params });
}

export function getAgencyDetail(params: GetAgencyGroupReq) {
  return defHttp.get<GetAgencyResponse>({ url: ApiList.AgencyDetail, params });
}
export function checkAgencyDetail(params: checkAgencyReq) {
  return defHttp.get<GetAgencyResponse>({ url: ApiList.AgencyCheck, params });
}
export function checkMemberDetail(params) {
  return defHttp.get({ url: ApiList.AgencyMemberCheck, params });
}
export function setMemberToAgency(params) {
  return defHttp.post({ url: ApiList.AgencyDetail, params });
}
export function changeAgency(params: changeAgencyReq) {
  return defHttp.put({ url: ApiList.AgencyCheck, params });
}
export function putAgencyDetail(params: putAgencyDetailReq) {
  return defHttp.put({ url: ApiList.AgencyDetail, params });
}
export function putAgencyStatus(params: putAgencyStatusReq) {
  return defHttp.put({ url: ApiList.AgencyStatus, params });
}

export function getAgencyGroup(params: GetAgencyGroupReq) {
  return defHttp.get<GetAgencyGroupResponse>({ url: ApiList.AgencyGroup, params });
}

export function putAgencyGroup(params: putAgencyGroupReq) {
  return defHttp.put({ url: ApiList.AgencyGroup, params });
}

export function getAgencyList(params: getAgencyListReq) {
  return defHttp.get<GetAgencyListRes>({ url: ApiList.AgencyList, params });
}

export function getAgencyRankSetting(params: GetAgencyGroupReq) {
  return defHttp.get({ url: ApiList.AgencyRankSettingPost, params });
}

export function getAgencyRankSettingList(params: GetAgencyGroupReq) {
  return defHttp.get({ url: ApiList.AgencyRankSetting, params });
}

export function getAgencyRankSettingOption() {
  return defHttp.get({ url: ApiList.AgencyRankSettingOption });
}

export function createAgencyRankSetting(params: createAgencyRankSettingReq) {
  return defHttp.post({ url: ApiList.AgencyRankSettingPost, params });
}
export function updateAgencyRankSetting(params: createAgencyRankSettingReq) {
  return defHttp.put({ url: ApiList.AgencyRankSettingPost, params });
}

export function updateAgencyPromotionlink(params: createAgencyPromotionlinkReq) {
  return defHttp.put({ url: ApiList.AgencyPromotionlink, params });
}
export function createAgencyPromotionlink(params) {
  return defHttp.post({ url: ApiList.AgencyPromotionlink, params });
}
// 會員換線
export function getAgencyNodeList(params) {
  return defHttp.get({ url: ApiList.AgencyNodeList, params });
}

export function checkAgencyNode(params) {
  return defHttp.get({ url: ApiList.CheckAgencyNode, params });
}

export function checkMemberNode(params) {
  return defHttp.get({ url: ApiList.CheckMemberNode, params });
}

export function updateAgencyNode(params) {
  return defHttp.post({ url: ApiList.AgencyNode, params });
}

//佣金派发
export function CommissionList(params: { date: string; }) {
  return defHttp.get({ url: ApiList.CommissionList, params });
}

export function ChildrenCommissionList(params: { date: string; }) {
  return defHttp.get({ url: ApiList.ChildrenCommissionList, params });
}

export function ReviewCommission(params: { date: string; agreeIDs: string; denyIDs: string; }) {
  return defHttp.put({ url: ApiList.ReviewCommission, params });
}

export function ReviewChildrenCommission(params: { date: string; agreeIDs: string; denyIDs: string; }) {
  return defHttp.put({ url: ApiList.ReviewChildrenCommission, params });
}