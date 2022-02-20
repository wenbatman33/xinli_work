import { defHttp } from '/@/utils/http/axios';
import {
  GetFinanceParams,
  GetFinanceResultModel,
  PostFinanceCreateData,
  PostFinanceCreateResultModel,
  GetChannelParams,
  GetChannelResultModel,
  PostFinanceAddData,
  PostFinanceAddResultModel,
  GetFinanceEditParams,
  GetFinanceEditResultModel,
  PutFinanceEditData,
  PutFinanceEditResultModel,
  DeleteChannelData,
  DeleteChannelResultModel,
  DeleteFinanceData,
  DeleteFinanceResultModel,
  PutFinanceSortData,
  PutFinanceSortResultModel,
} from './model/financeModel';

/**
 * Api urls
 */
enum Api {
  Finance = '/backend/finance',
  FinanceCreate = '/backend/finance/create',
  FinanceSearchChannel = '/backend/finance/search/channel',
  FinanceAdd = '/backend/finance/add',
  FinanceEdit = '/backend/finance/edit',
  FinanceDeleteChannel = '/backend/finance/delete',
  FinanceDelete = '/backend/finance/finance_delete',
  FinanceSort = '/backend/finance/sort',
}

/**
 * 顯示項目列表
 * @param params Query params
 * @returns VAxios request promise
 */
export const getFinance = (params?: GetFinanceParams) =>
  defHttp.get<GetFinanceResultModel>({ url: Api.Finance, params });

/**
 * 新增顯示項目
 * @param data Post data
 * @returns VAxios request promise
 */
export const postFinanceCreate = (data?: PostFinanceCreateData) =>
  defHttp.post<PostFinanceCreateResultModel>({ url: Api.FinanceCreate, data });

/**
 * 搜尋線路
 * @param params Query params
 * @returns VAxios request promise
 */
export const getChannel = (params?: GetChannelParams) =>
  defHttp.get<GetChannelResultModel>({ url: Api.FinanceSearchChannel, params });

/**
 * 加入線路
 * @param data Post data
 * @returns VAxios request promise
 */
export const postFinanceAdd = (data?: PostFinanceAddData) =>
  defHttp.post<PostFinanceAddResultModel>({ url: Api.FinanceAdd, data });

/**
 * 取得單一線路
 * @param params Query params
 * @returns VAxios request promise
 */
export const getFinanceEdit = (params?: GetFinanceEditParams) =>
  defHttp.get<GetFinanceEditResultModel>({ url: Api.FinanceEdit, params });

/**
 * 儲存單一線路
 * @param data Put data
 * @returns VAxios request promise
 */
export const putFinanceEdit = (data?: PutFinanceEditData) =>
  defHttp.put<PutFinanceEditResultModel>({ url: Api.FinanceEdit, data });

/**
 * 移除線路
 * @param data Delete data
 * @returns VAxios request promise
 */
export const deleteChannel = (data?: DeleteChannelData) =>
  defHttp.delete<DeleteChannelResultModel>({ url: Api.FinanceDeleteChannel, params: data, data });

/**
 * 移除顯示項目
 * @param data Delete data
 * @returns VAxios request promise
 */
export const deleteFinance = (data?: DeleteFinanceData) =>
  defHttp.delete<DeleteFinanceResultModel>({ url: Api.FinanceDelete, params: data, data });

/**
 * 將線路重新排序
 * @param data Put data
 * @returns VAxios request promise
 */
export const putFinanceSort = (data?: PutFinanceSortData) =>
  defHttp.put<PutFinanceSortResultModel>({ url: Api.FinanceSort, data });
