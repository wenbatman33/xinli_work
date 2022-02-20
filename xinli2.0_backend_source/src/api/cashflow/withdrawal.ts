import { defHttp } from '/@/utils/http/axios';
import {
  GetWithdrawalParams,
  GetWithdrawalResultModel,
  PutFinancePassData,
  PutFinancePassResultModel,
  PutFinanceSubmitRiskPassData,
  PutFinanceSubmitRiskResultModel,
  PutFinanceRejectPassData,
  PutFinanceRejectResultModel,
  PutRiskCheckData,
  PutRiskCheckResultModel,
  GetPayoutInfoParams,
  GetPayoutInfoResultModel,
  GetWithdrawalNoteParams,
  GetWithdrawalNoteResultModel,
  PostWithdrawalNoteData,
  PostWithdrawalNoteResultModel,
  PostWithdrawalCallbackData,
  PostWithdrawalCallbackResultModel,
  GetWithdrawalListResultModel,
  PostWithdrawalPayData,
  PostWithdrawalPayResultModel,
  PostWithdrawalAuditData,
  PostWithdrawalAuditResultModel,
  GetPayoutNaviResultModel,
  PutPayoutNaviSortData,
  PutPayoutNaviSortResultModel,
  PutPayoutNaviStatusData,
  PutPayoutNaviStatusResultModel,
  PostPayoutQuickData,
  PostPayoutQuickResultModel,
  GetMemberInfoParams,
  GetMemberInfoRsultModel,
  GetStakeParams,
} from './model/withdrawalModel';

/**
 * Api urls
 */
enum Api {
  Withdrawal = '/backend/withdrawal',
  WithdrawalFinancePass = '/backend/withdrawal/finance/pass',
  WithdrawalFinanceSubmitRisk = '/backend/withdrawal/finance/submitrisk',
  WithdrawalFinanceReject = '/backend/withdrawal/finance/reject',
  WithdrawalRiskCheck = '/backend/withdrawal/risk/check',
  WithdrawalPayoutInfo = '/backend/withdrawal/payout/info',
  WithdrawalNote = '/backend/withdrawal/note',
  WithdrawalCallback = '/backend/withdrawal/callback',
  WithdrawalList = '/backend/withdrawal/list',
  WithdrawalPay = '/backend/withdrawal/pay',
  WithdrawalAudit = '/backend/withdrawal/audit',
  WithdrawalPayoutNavi = '/backend/withdrawal/payout/navi',
  WithdrawalPayoutNaviSort = '/backend/withdrawal/payout/navi/sort',
  WithdrawalPayoutNaviStatus = '/backend/withdrawal/payout/navi/status',
  WithdrawalPayoutQuick = '/backend/withdrawal/payout/quick',
  WithdrawalMemberInfo = '/backend/withdrawal/member/info',
  WithdrawalStake = '/backend/withdrawal/betting',
}

/**
 * 提款管理：列表與篩選
 * @param params Query params
 * @returns VAxios request promise
 */
export const getWithdrawal = (params?: GetWithdrawalParams) =>
  defHttp.get<GetWithdrawalResultModel>({ url: Api.Withdrawal, params });

/**
 * 提款管理：財務提單審核通過
 * @param data Put body data
 * @returns VAxios request promise
 */
export const putFinancePass = (data?: PutFinancePassData) =>
  defHttp.put<PutFinancePassResultModel>({ url: Api.WithdrawalFinancePass, data });

/**
 * 提款管理：財務提單審核通過並提交風控
 * @param data Put body data
 * @returns VAxios request promise
 */
export const putFinanceSubmitRisk = (data?: PutFinanceSubmitRiskPassData) =>
  defHttp.put<PutFinanceSubmitRiskResultModel>({ url: Api.WithdrawalFinanceSubmitRisk, data });

/**
 * 提款管理：財務退回
 * @param data Put body data
 * @returns VAxios request promise
 */
export const putFinanceReject = (data?: PutFinanceRejectPassData) =>
  defHttp.put<PutFinanceRejectResultModel>({ url: Api.WithdrawalFinanceReject, data });

/**
 * 提款管理：風控審核
 * @param data Put body data
 * @returns VAxios request promise
 */
export const putRiskCheck = (data?: PutRiskCheckData) =>
  defHttp.put<PutRiskCheckResultModel>({ url: Api.WithdrawalRiskCheck, data });

/**
 * 提款管理：手動出款資訊
 * @param params Query params
 * @returns VAxios request promise
 */
export const getPayoutInfo = (params?: GetPayoutInfoParams) =>
  defHttp.get<GetPayoutInfoResultModel>({ url: Api.WithdrawalPayoutInfo, params });

/**
 * 提款管理：查看訂單紀錄
 * @param params Query params
 * @returns VAxios request promise
 */
export const getWithdrawalNote = (params?: GetWithdrawalNoteParams) =>
  defHttp.get<GetWithdrawalNoteResultModel>({ url: Api.WithdrawalNote, params });

/**
 * 提款管理：新增訂單備註
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postWithdrawalNote = (data?: PostWithdrawalNoteData) =>
  defHttp.post<PostWithdrawalNoteResultModel>({ url: Api.WithdrawalNote, data });

/**
 * 提款管理：查詢三方回調狀態
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postWithdrawalCallback = (data?: PostWithdrawalCallbackData) =>
  defHttp.post<PostWithdrawalCallbackResultModel>({ url: Api.WithdrawalCallback, data });

/**
 * 提款管理：可出款方式列表
 * @param params Query params
 * @returns VAxios request promise
 */
export const getWithdrawalList = () =>
  defHttp.get<GetWithdrawalListResultModel>({ url: Api.WithdrawalList });

/**
 * 提款管理：手動出款
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postWithdrawalPay = (data?: PostWithdrawalPayData) =>
  defHttp.post<PostWithdrawalPayResultModel>({ url: Api.WithdrawalPay, data });

/**
 * 提款管理: 財務進入審核
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postWithdrawalAudit = (data?: PostWithdrawalAuditData) =>
  defHttp.post<PostWithdrawalAuditResultModel>({ url: Api.WithdrawalAudit, data });

/**
 * 提款管理: 取得出款面板
 * @returns VAxios request promise
 */
export const getPayoutNavi = () =>
  defHttp.get<GetPayoutNaviResultModel>({ url: Api.WithdrawalPayoutNavi });

/**
 * 提款管理: 出款面板排序
 * @param data Put body data
 * @returns VAxios request promise
 */
export const putPayoutNaviSort = (data?: PutPayoutNaviSortData) =>
  defHttp.put<PutPayoutNaviSortResultModel>({ url: Api.WithdrawalPayoutNaviSort, data });

/**
 * 提款管理: 出款面板狀態開關
 * @param data Put body data
 * @returns VAxios request promise
 */
export const putPayoutNaviStatus = (data?: PutPayoutNaviStatusData) =>
  defHttp.put<PutPayoutNaviStatusResultModel>({ url: Api.WithdrawalPayoutNaviStatus, data });

/**
 * 提款管理: 快速出款
 * @param data Post body data
 * @returns VAxios request promise
 */
export const postPayoutQuick = (data?: PostPayoutQuickData) =>
  defHttp.post<PostPayoutQuickResultModel>({ url: Api.WithdrawalPayoutQuick, data });

/**
 * 提款管理：取得審核詳細資料-會員提款
 * @param params Query params
 * @returns VAxios request promise
 */
export const getMemberInfo = (params?: GetMemberInfoParams) =>
  defHttp.get<GetMemberInfoRsultModel>({ url: Api.WithdrawalMemberInfo, params });

/**
 * 提款管理：取得流水明細
 * @param params Query params
 * @returns VAxios request promise
 */
export const getStake = (params?: GetStakeParams) =>
  defHttp.get({ url: Api.WithdrawalStake, params });
  
  