import { defHttp } from '/@/utils/http/axios';
import {
  GetDepositReportParams,
  GetDepositPeopleReportResultModel,
  GetDepositAmountRangeReportResultModel,
  GetDepositMemberReportParams,
  PostDepositReportData,
} from './model/depositModel';

/**
 * Api urls
 */
enum Api {
  DepositAmountRangeReport = '/backend/report/deposit/amount_range_report',
  DepositAmountRangeWeekReport = '/backend/report/deposit/amount_range_week_report',
  DepositAmountRangeMonthReport = '/backend/report/deposit/amount_range_month_report',
  DepositPeopleReport = '/backend/report/deposit/people_report',
  DepositPeopleWeekReport = '/backend/report/deposit/people_week_report',
  DepositPeopleMonthReport = '/backend/report/deposit/people_month_report',
  DepositMemberReport = '/backend/report/deposit/member_report',
}

/**
 * 取得日存款報表，以金額區間統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getDepositAmountRangeReport = (params?: GetDepositReportParams) =>
  defHttp.get<GetDepositAmountRangeReportResultModel>({
    url: Api.DepositAmountRangeReport,
    params,
  });

/**
 * 取得週存款報表，以金額區間統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getDepositAmountRangeWeekReport = (params?: GetDepositReportParams) =>
  defHttp.get<GetDepositAmountRangeReportResultModel>({
    url: Api.DepositAmountRangeWeekReport,
    params,
  });

/**
 * 取得月存款報表，以金額區間統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getDepositAmountRangeMonthReport = (params?: GetDepositReportParams) =>
  defHttp.get<GetDepositAmountRangeReportResultModel>({
    url: Api.DepositAmountRangeMonthReport,
    params,
  });

/**
 * 取得日存款報表，以人數統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getDepositPeopleReport = (params?: GetDepositReportParams) =>
  defHttp.get<GetDepositPeopleReportResultModel>({
    url: Api.DepositPeopleReport,
    params,
  });

/**
 * 取得週存款報表，以人數統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getDepositPeopleWeekReport = (params?: GetDepositReportParams) =>
  defHttp.get<GetDepositPeopleReportResultModel>({
    url: Api.DepositPeopleWeekReport,
    params,
  });

/**
 * 取得月存款報表，以人數統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getDepositPeopleMonthReport = (params?: GetDepositReportParams) =>
  defHttp.get<GetDepositPeopleReportResultModel>({
    url: Api.DepositPeopleMonthReport,
    params,
  });

/**
 * 取得會員存款報表
 * @param params Query params
 * @returns VAxios request promise
 */
export const getDepositMemberReport = (params?: GetDepositMemberReportParams) =>
  defHttp.get<any>({
    url: Api.DepositMemberReport,
    params,
  });

/**
 * 重算日存款報表，以金額區間統計
 * @param data Post data
 * @returns VAxios request promise
 */
export const postDepositAmountRangeReport = (data?: PostDepositReportData) =>
  defHttp.post<any>({
    url: Api.DepositAmountRangeReport,
    data,
  });

/**
 * 重算週存款報表，以金額區間統計。reportDate 必須是週一日期
 * @param data Post data
 * @returns VAxios request promise
 */
export const postDepositAmountWeekRangeReport = (data?: PostDepositReportData) =>
  defHttp.post<any>({
    url: Api.DepositAmountRangeWeekReport,
    data,
  });

/**
 * 重算月存款報表，以金額區間統計。reportDate 必須是1號日期
 * @param data Post data
 * @returns VAxios request promise
 */
export const postDepositAmountMonthRangeReport = (data?: PostDepositReportData) =>
  defHttp.post<any>({
    url: Api.DepositAmountRangeMonthReport,
    data,
  });

/**
 * 重算日存款報表，以人數統計
 * @param data Post data
 * @returns VAxios request promise
 */
export const postDepositPeopleReport = (data?: PostDepositReportData) =>
  defHttp.post<any>({
    url: Api.DepositPeopleReport,
    data,
  });

/**
 * 重算週存款報表，以人數統計。reportDate 必須是週一日期
 * @param data Post data
 * @returns VAxios request promise
 */
export const postDepositPeopleWeekReport = (data?: PostDepositReportData) =>
  defHttp.post<any>({
    url: Api.DepositPeopleWeekReport,
    data,
  });

/**
 * 重算月存款報表，以人數統計。reportDate 必須是1號日期
 * @param data Post data
 * @returns VAxios request promise
 */
export const postDepositPeopleMonthReport = (data?: PostDepositReportData) =>
  defHttp.post<any>({
    url: Api.DepositPeopleMonthReport,
    data,
  });

/**
 * 重算會員存款報表
 * @param data Post data
 * @returns VAxios request promise
 */
export const postDepositMemberReport = (data?: PostDepositReportData) =>
  defHttp.post<any>({
    url: Api.DepositMemberReport,
    data,
  });
