import { defHttp } from '/@/utils/http/axios';

import {
  CreateGameResponse,
  GetGameResponse,
  GetGameListRes,
  createGameReq,
  GetGameGroupReq,
  putGameReq,
  getGameListReq,
  GetGameTypeListRes,
  GetGameGroupOptionRes,
} from './model/gameModel';

enum ApiList {
  GameList = '/backend/game/gamelist',
  GameLists = '/backend/game/gamelist/list',
  GameListType = '/backend/game/gamelist/type',
  GameGroupOption = '/backend/game/gamegroup/all',
}

/**
 * @description: 建立遊戲
 * @method: post
 */
export function createGame(params: createGameReq) {
  return defHttp.post<CreateGameResponse>({ url: ApiList.GameList, params });
}
/**
 * @description: 取得遊戲
 * @method: get
 */
export function getGame(params: GetGameGroupReq) {
  return defHttp.get<GetGameResponse>({ url: ApiList.GameList, params });
}
/**
 * @description: 修改遊戲
 * @method: put
 */
export function putGame(params: putGameReq) {
  return defHttp.put({ url: ApiList.GameList, params });
}
/**
 * @description: 取得遊戲list
 * @method: get
 */
export function getGameList(params: getGameListReq) {
  return defHttp.get<GetGameListRes>({ url: ApiList.GameLists, params });
}
/**
 * @description: 取得遊戲類型
 * @method: get
 */
export function getGameListType() {
  return defHttp.get<GetGameTypeListRes>({ url: ApiList.GameListType });
}
/**
 * @description: 取得遊戲廠商
 * @method: get
 */
export function getGameGroupOption() {
  return defHttp.get<GetGameGroupOptionRes>({ url: ApiList.GameGroupOption });
}
