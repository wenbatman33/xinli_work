import { defHttp } from '/@/utils/http/axios';
import { UcardParams, UcardMoneyInOut } from '/@/api/payment/model/payUModel';

enum ApiList {
  Ucard = '/backend/pay/usdt',
  UcardMoneyIn = '/backend/pay/usdt/money/in',
  UcardMoneyOut = '/backend/pay/usdt/money/out',
  UcardLog = '/backend/pay/usdt/log',
  UcardLogNote = '/backend/pay/usdt/log/note',
}

export function getUcardList(params) {
  return defHttp.get({ url: ApiList.Ucard, params });
}

export function createUcard(params: UcardParams) {
  return defHttp.post({ url: ApiList.Ucard, params });
}

export function editUcard(params: UcardParams) {
  return defHttp.put({ url: ApiList.Ucard, params });
}

export function UcardMoneyIn(params: UcardMoneyInOut) {
  return defHttp.post({ url: ApiList.UcardMoneyIn, params });
}

export function UcardMoneyOut(params: UcardMoneyInOut) {
  return defHttp.post({ url: ApiList.UcardMoneyOut, params });
}

export function getUcardLog(params) {
  return defHttp.get({ url: ApiList.UcardLog, params });
}

export function editUcardLogNote(params: {id: string; note: string}) {
  return defHttp.put({ url: ApiList.UcardLogNote, params });
}