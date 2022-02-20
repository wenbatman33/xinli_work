import { defHttp } from '/@/utils/http/axios';

import { GetAgencyGroupReq, putChildapplicationReq } from './model/agencyModel';

enum ApiList {
  AgencyChildList = '/backend/agency/childapplication/list',
  AgencyChildDetail = '/backend/agency/childapplication',
  AgencyChildPermit = '/backend/agency/childapplication/permit',
  AgencyChildDeny = '/backend/agency/childapplication/deny',
  AgencyList = '/backend/agency/application/list',
  AgencyDetail = '/backend/agency/application',
}

export function getAgencyChildList(params: GetAgencyGroupReq) {
  return defHttp.get({ url: ApiList.AgencyChildList, params });
}
export function getAgencyChildDetail(params: GetAgencyGroupReq) {
  return defHttp.get({ url: ApiList.AgencyChildDetail, params });
}
export function putAgencyChildPermit(params: putChildapplicationReq) {
  return defHttp.put({ url: ApiList.AgencyChildPermit, params });
}
export function putAgencyChildDeny(params: putChildapplicationReq) {
  return defHttp.put({ url: ApiList.AgencyChildDeny, params });
}

//代理審核
export function getAgencyList(params: GetAgencyGroupReq) {
  return defHttp.get({ url: ApiList.AgencyList, params });
}
export function getAgencyDetail(params: GetAgencyGroupReq) {
  return defHttp.get({ url: ApiList.AgencyDetail, params });
}
export function putAgencyDetail(params: putChildapplicationReq) {
  return defHttp.put({ url: ApiList.AgencyDetail, params });
}
