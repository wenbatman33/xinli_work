import { defHttp } from '/@/utils/http/axios';
import { MemberResultModel, IP_DeviceResultModel, RepeatResultModel, memberDeviceGhostResultModel, adjustmentApply, adjustmentListResultModel } from './model/riskModal';


enum Api {
  GetCheckList = '/backend/risk/member/list',
  SetCheck = '/backend/risk/member/check',
  GetIPList = '/backend/risk/ip/list',
  GetDeviceList = '/backend/risk/device/list',
  GetRepeatList = '/backend/risk/repeat/list',
  GetMemberDeviceGhost = '/backend/risk/search',
  setMultiAccount = '/backend/risk/multiaccount',
  adjustmentList = '/backend/adjustment/list',
  CreateAdjustmentApply = '/backend/adjustment/create',
  ReviewApply = '/backend/adjustment/verify',
  UpdateAdjustmentApply = '/backend/adjustment/update',
  DeleteAdjustmentApply = '/backend/adjustment/delete',
  GetAdjustmentApply = '/backend/adjustment/search',
}

export function GetCheckList(params) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<MemberResultModel>({ url: `${Api.GetCheckList}?${queryString}` });
}

export function SetCheck(params) {
  return defHttp.put({ url: Api.SetCheck, params });
}

export function GetIPList(params) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<IP_DeviceResultModel>({ url: `${Api.GetIPList}?${queryString}` });
}

export function GetDeviceList(params) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<IP_DeviceResultModel>({ url: `${Api.GetDeviceList}?${queryString}` });
}

export function GetRepeatList() {
  return defHttp.get<RepeatResultModel>({ url: `${Api.GetRepeatList}` });
}

export function GetMemberDeviceGhostList(params) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<memberDeviceGhostResultModel>({ url: `${Api.GetMemberDeviceGhost}?${queryString}` });
}

export function SetMultiAccount(params) {
  return defHttp.put({ url: Api.setMultiAccount, params });
}

export function adjustmentList() {
  return defHttp.get({ url: `${Api.adjustmentList}` });
}

export function CreateAdjustmentApply(params: adjustmentApply) {
  return defHttp.post({ url: Api.CreateAdjustmentApply, params });
}

export function ReviewApply(params) {
  return defHttp.put({ url: Api.ReviewApply, params });
}

export function UpdateAdjustmentApply(params) {
  return defHttp.put({ url: Api.UpdateAdjustmentApply, params });
}

export function DeleteAdjustmentApply(adjustmentID: number) {
  return defHttp.delete({ url: `${Api.DeleteAdjustmentApply}?id=${adjustmentID}`});
}

export function GetAdjustmentApply(params) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<adjustmentListResultModel>({ url: `${Api.GetAdjustmentApply}?${queryString}` });
}