import { defHttp } from '/@/utils/http/axios';
import {
  getListRequestModel,
  operationModel,
} from './model/walletModel';

/**
 * Api urls
 */
enum Api {
  list = '/backend/agencywallet/manualoperation/list',
  operate = '/backend/agencywallet/manualoperation',
  permit = '/backend/agencywallet/manualoperation/permit',
  deny = '/backend/agencywallet/manualoperation/deny',
}

export const getList = (params?: getListRequestModel) =>
 defHttp.get({
   url: Api.list,
   params,
 });

export const addOperation = (params?: operationModel) =>
 defHttp.post({
   url: Api.operate,
   params,
 });

export const permit = (params?: {id: number}) =>
 defHttp.put({
   url: Api.permit,
   params,
 });

export const deny = (params?: {id: number}) =>
 defHttp.put({
   url: Api.deny,
   params,
 });