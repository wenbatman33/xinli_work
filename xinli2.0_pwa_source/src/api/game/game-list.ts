import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type {
  GetByGroupIdParams,
  GetByGroupIdResponse,
  GetFavoriteGameParams,
  GetFavoriteGameResponse,
  GetHotGameParams,
  GetHotGameResponse,
  GetPlayedGameParams,
  GetPlayedGameResponse,
  PostLikeRequestData,
  DeleteUnlikeParams,
} from '@/api/game/model/game-list-model';

/**
 * Api urls
 */
enum Urls {
  GET_BY_GROUP_ID = '/game/gamelist/getbygroupid',
  GET_FAVOIRTE_GAME = '/game/gamelist/getfavoritegame',
  HOT_GAME = '/game/gamelist/hotgame/h5',
  PLAYED_GAME = '/game/gamelist/playedgame',
  LIKE = '/game/gamelist/like',
  UNLIKE = '/game/gamelist/unlike',
}

/**
 * 取得大廳遊戲類型
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getByGroupId = (params?: GetByGroupIdParams, errorHandler?: ErrorHandler) => api.get<GetByGroupIdResponse>(Urls.GET_BY_GROUP_ID, { params, data: errorHandler });

/**
 * 取得大廳遊戲類型
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getFavoriteGame = (params?: GetFavoriteGameParams, errorHandler?: ErrorHandler) => api.get<GetFavoriteGameResponse>(Urls.GET_FAVOIRTE_GAME, { params, data: errorHandler });

/**
 * 取得熱門遊戲
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getHotGame = (params?: GetHotGameParams, errorHandler?: ErrorHandler) => api.get<GetHotGameResponse>(Urls.HOT_GAME, { params, data: errorHandler });

/**
 * 取得最近遊玩遊戲
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getPlayedGame = (params?: GetPlayedGameParams, errorHandler?: ErrorHandler) => api.get<GetPlayedGameResponse>(Urls.PLAYED_GAME, { params, data: errorHandler });

/**
 * 取得最近遊玩遊戲
 * @param data Post request data
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const postLike = (data?: PostLikeRequestData, errorHandler?: ErrorHandler) => api.post(Urls.LIKE, data, { data: errorHandler });

/**
 * 取得最近遊玩遊戲
 * @param params Get query params
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const deleteUnlike = (params?: DeleteUnlikeParams, errorHandler?: ErrorHandler) => api.delete(Urls.UNLIKE, { params, data: errorHandler });
