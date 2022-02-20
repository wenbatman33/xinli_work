import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type { GetGameGroupLobbyResponse, GetGameGroupWalletTypeResponse } from '@/api/game/model/game-group-model';

/**
 * Api urls
 */
enum Urls {
  LOBBY = '/game/gamegroup/lobby',
  WALLET_TYPE = '/game/gamegroup/wallettype',
}

/**
 * 取得大廳遊戲類型
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getGameGroupLobby = (errorHandler?: ErrorHandler) => api.get<GetGameGroupLobbyResponse>(Urls.LOBBY, { data: errorHandler });

/**
 * 取得遊戲錢包類型
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getGameGroupWalletType = (errorHandler?: ErrorHandler) => api.get<GetGameGroupWalletTypeResponse>(Urls.WALLET_TYPE, { data: errorHandler });
