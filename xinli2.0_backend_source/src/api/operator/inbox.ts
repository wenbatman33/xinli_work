import { defHttp } from '/@/utils/http/axios';

import {
  inboxSettingList,
  inboxList,
  inboxLetter,
  letterMembers,
} from './model/inboxModel';

enum ApiList {
  inboxSetting = '/backend/site/letter/setting/list',
  inboxSettingEdit = '/backend/site/letter/setting',
  inboxList = '/backend/site/letter/list',
  inboxLetter = '/backend/site/letter/member',
  cancelLetter = '/backend/site/letter/member/cancel',
}

export function getInboxSetting(params) {
  return defHttp.get<inboxSettingList>({ url: ApiList.inboxSetting, params });
}

export function editInboxSetting(params) {
  return defHttp.put({ url: ApiList.inboxSettingEdit, params });
}

export function getInboxList(params) {
  return defHttp.get<inboxList>({ url: ApiList.inboxList, params });
}

export function getLetterMember(params: { letterSettingId: number, memberAccount?: string }) {
  return defHttp.get<letterMembers>({ url: ApiList.inboxLetter, params });
}

export function addLetter(params: inboxLetter) {
  return defHttp.post({ url: ApiList.inboxLetter, params });
}

export function editLetter(params) {
  return defHttp.put({ url: ApiList.inboxLetter, params });
}

export function cancelLetter(params: { letterSettingId: number }) {
  return defHttp.put({ url: ApiList.cancelLetter, params });
}

