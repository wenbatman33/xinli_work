import { defHttp } from '/@/utils/http/axios';
import {
  GetHourListModel,
} from './model/dailyModel';

/**
 * Api urls
 */
enum Api {
  list = '/backend/report/channel/hour_reconciliation',
  note = '/backend/report/channel/hour_reconciliation',
  dailyList = '/backend/report/channel/day_reconciliation',
  dailyNote = '/backend/report/channel/day_reconciliation',
}

export const getList = (params?: GetHourListModel) =>
 defHttp.get({
   url: Api.list,
   params,
 });

export const setNote = (params: {id: number; note: string;}) =>
 defHttp.put({
   url: Api.list,
   params,
 });

export const getDayList = (params?: GetHourListModel) =>
 defHttp.get({
   url: Api.dailyList,
   params,
 });

export const setDayNote = (params: {id: number; note: string;}) =>
 defHttp.put({
   url: Api.dailyNote,
   params,
 });