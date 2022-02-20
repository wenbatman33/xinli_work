import { defHttp } from '/@/utils/http/axios';
import {
  BaseResponse,
  CreateBankCardParams,
  CreateBankCardResponse,
  GetBankCardParams,
  GetBankCardResponse,
  PutBankCardParams,
  PutBankCardResponse,
  GetBankCardDropdownResponse,
  GetBankCardsParams,
  GetBankCardsResponse,
  GetBankCardsLogParams,
  GetBankCardsLogResponse,
  GetBankCardsLogNoteParams,
  GetBankCardsLogNoteResponse,
} from './model/payBankCardModel';

enum ApiList {
  BankCard = '/backend/pay_bankcard',
  BankCardDropdown = '/backend/pay_bankcard/dropdown',
  BankCardList = '/backend/pay_bankcard/bankcards',
  BankCardTransfer = '/backend/pay_bankcard/transfer',
  BankCardLock = '/backend/pay_bankcard/lock',
  BankCardUnlock = '/backend/pay_bankcard/unlock',
  BankCardLog = '/backend/pay_bankcard/log',
  BankCardLogNote = '/backend/pay_bankcard/note',
}
/**
 * @description: 銀行卡管理：新增銀行卡API
 * @method: post
 */
export function createBankCard(params: CreateBankCardParams) {
  return defHttp.post<CreateBankCardResponse>({ url: ApiList.BankCard, params });
}
/**
 * @description: 銀行卡管理：查看銀行卡資料API
 * @method: get
 */
export function getBankCard(params?: GetBankCardParams) {
  return defHttp.get<BaseResponse<GetBankCardResponse>>({ url: ApiList.BankCard, params });
}

/**
 * @description: 銀行卡管理：修改銀行卡API
 * @method: put
 */
export function putBankCard(params: PutBankCardParams) {
  return defHttp.put<PutBankCardResponse>({ url: ApiList.BankCard, params });
}

/**
 * @description: 取得搜尋下拉清單
 * @method: get
 */
export function getBankCardDropdown() {
  return defHttp.get<GetBankCardDropdownResponse>({ url: ApiList.BankCardDropdown });
}

/**
 * @description: 銀行卡管理：列表與搜尋篩選API
 * @method: get
 */
export function getBankCardList(params?: GetBankCardsParams) {
  return defHttp.get<BaseResponse<GetBankCardsResponse>>({ url: ApiList.BankCardList, params });
}

/**
 * @description: 銀行卡管理：轉帳
 * @method: post
 */
export function transferBankCard(params: CreateBankCardParams) {
  return defHttp.post<CreateBankCardResponse>({ url: ApiList.BankCardTransfer, params });
}

/**
 * @description: 銀行卡管理：凍結
 * @method: post
 */
export function lockBankCard(params: CreateBankCardParams) {
  return defHttp.post<CreateBankCardResponse>({ url: ApiList.BankCardLock, params });
}

/**
 * @description: 銀行卡管理：解除凍結
 * @method: post
 */
export function unlockBankCard(params: CreateBankCardParams) {
  return defHttp.post<CreateBankCardResponse>({ url: ApiList.BankCardUnlock, params });
}

/**
 * @description: 銀行卡明細：帳務明細
 * @method: get
 */
export function getBankCardLog(params?: GetBankCardsLogParams) {
  return defHttp.get<GetBankCardsLogResponse>({ url: ApiList.BankCardLog, params });
}

/**
 * @description: 銀行卡明細：增加備註
 * @method: get
 */
export function postBankCardLogNote(params?: GetBankCardsLogNoteParams) {
  return defHttp.post<GetBankCardsLogNoteResponse>({ url: ApiList.BankCardLogNote, params });
}
