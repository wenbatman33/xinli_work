import { defHttp } from '/@/utils/http/axios';
import {
  GetGameGroupRes,
  GetGameGroupsListRes,
  fileUploadRes,
  GetGameGroupsReq,
  PutGameGroupReq,
  GetGameGroupReq,
  GetGameAgencyListRes,
  PutGameAgencyReq,
} from './model/gameModel';

enum ApiList {
  GameGroup = '/backend/game/gamegroup',
  GameGroups = '/backend/game/gamegroup/list',
  GameAgency = '/backend/game/gameagency',
  GameAgencyOption = '/backend/game/gameagency/all',
  GameAgencyList = '/backend/game/gameagency/list',
  Upload = '/file/file/upload',
  getGameGroupCategorizedByGameType = '/backend/game/gamegroup/getgamegroupcategorizedbygametype',
}

/**
 * @description: 取得遊戲廠商
 * @method: get
 */
export function getGameGroup(params: GetGameGroupReq) {
  return defHttp.get({ url: ApiList.GameGroup, params });
}
/**
 * @description: 修改遊戲廠商
 * @method: put
 */
export function putGameGroup(params?: PutGameGroupReq) {
  return defHttp.put({ url: ApiList.GameGroup, params });
}
/**
 * @description: 修改遊戲代理商
 * @method: put
 */
export function putGameAgency(params?: PutGameAgencyReq) {
  return defHttp.put({ url: ApiList.GameAgency, params });
}
/**
 * @description: 取得遊戲廠商list
 * @method: get
 */
export function getGameGroups(params?: GetGameGroupsReq) {
  return defHttp.get<GetGameGroupsListRes>({ url: ApiList.GameGroups, params });
}
/**
 * @description: 取得遊戲代理商list
 * @method: get
 */
export function getGameAgencyList(params?: GetGameGroupsReq) {
  return defHttp.get<GetGameAgencyListRes>({ url: ApiList.GameAgencyList, params });
}

/**
 * @description: 取得遊戲代理商選單
 * @method: get
 */
export function getGameAgencyOption() {
  return defHttp.get({ url: ApiList.GameAgencyOption });
}

export function fileUpload(params) {
  return defHttp.post<fileUploadRes>({ url: ApiList.Upload, params });
}

/**
 * @description: 取得遊戲廠商 by type 目前swagger尚未提供 model
 * @method: get
 */
export function getGameGroupByGameType() {
  return defHttp.get({ url: ApiList.getGameGroupCategorizedByGameType });
}
