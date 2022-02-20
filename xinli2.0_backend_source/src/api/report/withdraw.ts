import { defHttp } from '/@/utils/http/axios';
import {
  GetWithdrawReportParams,
  GetWithdrawPeopleReportResultModel,
  GetWithdrawAmountRangeReportResultModel,
  PostWithdrawReportData,
} from './model/withdrawModel';

/**
 * Api urls
 */
enum Api {
  WithdrawAmountRangeReport = '/backend/report/withdraw/amount_range_report',
  WithdrawAmountRangeWeekReport = '/backend/report/withdraw/amount_range_week_report',
  WithdrawAmountRangeMonthReport = '/backend/report/withdraw/amount_range_month_report',
  WithdrawPeopleReport = '/backend/report/withdraw/people_report',
  WithdrawPeopleWeekReport = '/backend/report/withdraw/people_week_report',
  WithdrawPeopleMonthReport = '/backend/report/withdraw/people_month_report',
}

/**
 * 取得日提款報表，以金額區間統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getWithdrawAmountRangeReport = (params?: GetWithdrawReportParams) =>
  defHttp.get<GetWithdrawAmountRangeReportResultModel>({
    url: Api.WithdrawAmountRangeReport,
    params,
  });

/**
 * 取得週提款報表，以金額區間統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getWithdrawAmountRangeWeekReport = (params?: GetWithdrawReportParams) =>
  defHttp.get<GetWithdrawAmountRangeReportResultModel>({
    url: Api.WithdrawAmountRangeWeekReport,
    params,
  });

/**
 * 取得月提款報表，以金額區間統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getWithdrawAmountRangeMonthReport = (params?: GetWithdrawReportParams) =>
  defHttp.get<GetWithdrawAmountRangeReportResultModel>({
    url: Api.WithdrawAmountRangeMonthReport,
    params,
  });

/**
 * 取得日提款報表，以人數統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getWithdrawPeopleReport = (params?: GetWithdrawReportParams) =>
  defHttp.get<GetWithdrawPeopleReportResultModel>({
    url: Api.WithdrawPeopleReport,
    params,
  });

/**
 * 取得週提款報表，以人數統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getWithdrawPeopleWeekReport = (params?: GetWithdrawReportParams) =>
  defHttp.get<GetWithdrawPeopleReportResultModel>({
    url: Api.WithdrawPeopleWeekReport,
    params,
  });

/**
 * 取得月提款報表，以人數統計
 * @param params Query params
 * @returns VAxios request promise
 */
export const getWithdrawPeopleMonthReport = (params?: GetWithdrawReportParams) =>
  defHttp.get<GetWithdrawPeopleReportResultModel>({
    url: Api.WithdrawPeopleMonthReport,
    params,
  });

/**
 * 重算日提款報表，以金額區間統計
 * @param data Post data
 * @returns VAxios request promise
 */
export const postWithdrawAmountRangeReport = (data?: PostWithdrawReportData) =>
  defHttp.post<any>({
    url: Api.WithdrawAmountRangeReport,
    data,
  });

/**
 * 重算週提款報表，以金額區間統計
 * @param data Post data
 * @returns VAxios request promise
 */
export const postWithdrawAmountRangeWeekReport = (data?: PostWithdrawReportData) =>
  defHttp.post<any>({
    url: Api.WithdrawAmountRangeWeekReport,
    data,
  });

/**
 * 重算月提款報表，以金額區間統計
 * @param data Post data
 * @returns VAxios request promise
 */
export const postWithdrawAmountRangeMonthReport = (data?: PostWithdrawReportData) =>
  defHttp.post<any>({
    url: Api.WithdrawAmountRangeMonthReport,
    data,
  });

/**
 * 重算日提款報表，以人數統計
 * @param data Post data
 * @returns VAxios request promise
 */
export const postWithdrawPeopleReport = (data?: PostWithdrawReportData) =>
  defHttp.post<any>({
    url: Api.WithdrawPeopleReport,
    data,
  });

/**
 * 重算週提款報表，以人數統計
 * @param data Post data
 * @returns VAxios request promise
 */
export const postWithdrawPeopleWeekReport = (data?: PostWithdrawReportData) =>
  defHttp.post<any>({
    url: Api.WithdrawPeopleWeekReport,
    data,
  });

/**
 * 重算月提款報表，以人數統計
 * @param data Post data
 * @returns VAxios request promise
 */
export const postWithdrawPeopleMonthReport = (data?: PostWithdrawReportData) =>
  defHttp.post<any>({
    url: Api.WithdrawPeopleMonthReport,
    data,
  });
