import { defHttp } from '/@/utils/http/axios';
import {
  GetDepositParams,
  GetDepositResultModel,
  PostDepositData,
  PostDepositResultModel,
  GetDepositNoteParams,
  GetDepositNoteResultModel,
  PostDepositNoteData,
  PostDepositNoteResultModel,
  PutDepositBalanceDateData,
  PutDepositBalanceDateResultModel,
  PostDepositCallbackData,
  PostDepositCallbackResultModel,
  PostDepositFeeData,
  PostDepositFeeResultModel,
} from './model/depositModel';

/**
 * Api urls
 */
enum Api {
  Deposit = '/backend/pay/deposit',
  DepositNote = '/backend/pay/deposit/note',
  DepositBalanceDate = '/backend/pay/deposit/balancedate',
  DepositCallback = '/backend/pay/deposit/callback',
  DepositFee = '/backend/pay/deposit/fee',
}

/**
 * 存款單列表
 * @param params Query params
 * @returns VAxios request promise
 */
export const getDeposit = (params?: GetDepositParams) =>
  defHttp.get<GetDepositResultModel>({ url: Api.Deposit, params });

/**
 * 新增存款單
 * @param data Post data
 * @returns VAxios request promise
 */
export const postDeposit = (data?: PostDepositData) =>
  defHttp.post<PostDepositResultModel>({ url: Api.Deposit, data });

/**
 * 查看訂單紀錄
 * @param params Query params
 * @returns VAxios request promise
 */
export const getDepositNote = (params?: GetDepositNoteParams) =>
  defHttp.get<GetDepositNoteResultModel>({ url: Api.DepositNote, params });

/**
 * 新增存款單備註
 * @param data Post data
 * @returns VAxios request promise
 */
export const postDepositNote = (data?: PostDepositNoteData) =>
  defHttp.post<PostDepositNoteResultModel>({ url: Api.DepositNote, data });

/**
 * 修改存款單入帳日
 * @param data Put data
 * @returns VAxios request promise
 */
export const putDepositBalanceDate = (data?: PutDepositBalanceDateData) =>
  defHttp.put<PutDepositBalanceDateResultModel>({ url: Api.DepositBalanceDate, data });

/**
 * 查詢三方回調狀態
 * @param data Post data
 * @returns VAxios request promise
 */
export const postDepositCallback = (data?: PostDepositCallbackData) =>
  defHttp.post<PostDepositCallbackResultModel>({ url: Api.DepositCallback, data });

/**
 * 計算手續費
 * @param data Post data
 * @returns VAxios request promise
 */
export const postDepositFee = (data?: PostDepositFeeData) =>
  defHttp.post<PostDepositFeeResultModel>({ url: Api.DepositFee, data });
