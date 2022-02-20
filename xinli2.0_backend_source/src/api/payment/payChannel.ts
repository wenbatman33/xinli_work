import { defHttp } from '/@/utils/http/axios';
import {
  GetPayChannelNameResultModel,
  PostPayChannelNameData,
  PostPayChannelNameResultModel,
  GetPayChannelParams,
  GetPayChannelResultModel,
  PostPayChannelData,
  PostPayChannelResultModel,
  PutPayChannelData,
  PutPayChannelResultModel,
  GetPayChannelShowParams,
  GetPayChannelShowResultModel,
  PostRemainAddData,
  PostRemainAddResultModel,
  PostRemainSubData,
  PostRemainSubResultModel,
  PostFrozenAddData,
  PostFrozenAddResultModel,
  PostFrozenSubData,
  PostFrozenSubResultModel,
  PostPayChannelApData,
  PostPayChannelApResultModel,
  GetPayChannelLogParams,
  GetPayChannelLogModel,
  PutPayChannelLogNoteParams,
  PutPayChannelLogNoteModel,
  GetPayChannelSearchParams,
  GetPayChannelSearchResultModel,
} from './model/payChannelModel';

/**
 * Api urls
 */
enum Api {
  PayChannel = '/backend/pay/pay_channel',
  PayChannelName = '/backend/pay/pay_channel_name',
  PayChannelShow = '/backend/pay/pay_channel/show',
  PayChannelRemainAdd = '/backend/pay/pay_channel/remain/add',
  PayChannelRemainSub = '/backend/pay/pay_channel/remain/sub',
  PayChannelFrozenAdd = '/backend/pay/pay_channel/frozen/add',
  PayChannelFrozenSub = '/backend/pay/pay_channel/frozen/sub',
  PayChannelAp = '/backend/pay/pay_channel/ap',
  PayChannelLog = '/backend/pay/pay_channel/log',
  PayChannelLogNote = '/backend/pay/pay_channel/log/note',
  PayChannelSearch = '/backend/pay/pay_channel/search',
}

/**
 * 商戶管理: 商戶列表
 * @returns VAxios request promise
 */
export const getPayChannelName = () =>
  defHttp.get<GetPayChannelNameResultModel>({ url: Api.PayChannelName });

/**
 * 商戶管理: 新增商戶
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postPayChannelName = (data?: PostPayChannelNameData) =>
  defHttp.post<PostPayChannelNameResultModel>({ url: Api.PayChannelName, data });

/**
 * 商戶號管理: 商戶號列表查詢
 * @param params Get query params
 * @returns VAxios request promise
 */
export const getPayChannel = (params?: GetPayChannelParams) =>
  defHttp.get<GetPayChannelResultModel>({ url: Api.PayChannel, params });

/**
 * 商戶號管理: 新增商戶號
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postPayChannel = (data?: PostPayChannelData) =>
  defHttp.post<PostPayChannelResultModel>({ url: Api.PayChannel, data });

/**
 * 商戶號管理: 編輯商戶號
 * @param data Post body data
 * @returns VAxios request promise
 */
export const putPayChannel = (data?: PutPayChannelData) =>
  defHttp.put<PutPayChannelResultModel>({ url: Api.PayChannel, data });

/**
 * 商戶號管理: 查看特定商戶號
 * @param params Get query params
 * @returns VAxios request promise
 */
export const getPayChannelShow = (params?: GetPayChannelShowParams) =>
  defHttp.get<GetPayChannelShowResultModel>({ url: Api.PayChannelShow, params });

/**
 * 商戶號管理: 充值
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postRemainAdd = (data?: PostRemainAddData) =>
  defHttp.post<PostRemainAddResultModel>({ url: Api.PayChannelRemainAdd, data });

/**
 * 商戶號管理: 結算
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postRemainSub = (data?: PostRemainSubData) =>
  defHttp.post<PostRemainSubResultModel>({ url: Api.PayChannelRemainSub, data });

/**
 * 商戶號管理: 凍結
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postFrozenAdd = (data?: PostFrozenAddData) =>
  defHttp.post<PostFrozenAddResultModel>({ url: Api.PayChannelFrozenAdd, data });

/**
 * 商戶號管理: 解除凍結
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postFrozenSub = (data?: PostFrozenSubData) =>
  defHttp.post<PostFrozenSubResultModel>({ url: Api.PayChannelFrozenSub, data });

/**
 * 商戶號管理: 代付狀態變更
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postPayChannelAp = (data?: PostPayChannelApData) =>
  defHttp.post<PostPayChannelApResultModel>({ url: Api.PayChannelAp, data });

/**
 * 商戶號管理: 帳務明細
 * @returns VAxios request promise
 */
export const getPayChannelLog = (params: GetPayChannelLogParams) =>
  defHttp.get<GetPayChannelLogModel>({ url: Api.PayChannelLog, params });

/**
 * 商戶號管理: 修改帳務明細備註
 * @returns VAxios request promise
 */
export const putPayChannelLogNote = (data: PutPayChannelLogNoteParams) =>
  defHttp.put<PutPayChannelLogNoteModel>({ url: Api.PayChannelLogNote, data });

/**
 * 商戶號管理: 取得銀行卡號 / 商戶號資訊
 * @param params Get query params
 * @returns VAxios request promise
 */
export const getPayChannelSearch = (params: GetPayChannelSearchParams) =>
  defHttp.get<GetPayChannelSearchResultModel>({ url: Api.PayChannelSearch, params });
