import { ApiResponse } from '@/api/basic-model';

/**
 * 遊戲大廳
 */
export interface GameLobbyItem {
  /**
   * 遊戲編號
   */
  id?: number;

  /**
   * 顯示名稱
   */
  display?: string;

  /**
   * 大廳資訊
   */
  info?: string;
}

/**
 * 遊戲廠商
 */
export interface GameGroupItem {
  /**
   * 遊戲廠商id
   */
  id?: number;

  /**
   * 遊戲廠商顯示名稱
   */
  displayName?: string;

  /**
   * 遊戲廠商狀態
   */
  status?: number;

  /**
   * 遊戲廠商顯示名稱
   */
  maintainTime?: string;

  /**
   * 遊戲廠商圖片H5
   */
  imageH5?: string;

  /**
   * 遊戲廠商圖片PC
   */
  imagePc?: string;

  /**
   * 遊戲廠商開啟方式 1:遊戲大廳 2:遊戲列表 3:進入遊戲
   */
  openWay?: number;

  /**
   * 遊戲廠商URL
   */
  gameUrl?: string;

  /**
   * 遊戲大廳列表
   */
  openGameListIDs?: GameLobbyItem[];
}

/**
 * 遊戲類型
 */
export interface GameType {
  /**
   * 遊戲類型id
   */
  id?: number;

  /**
   * 遊戲類型名稱
   */
  name?: string;

  /**
   * 遊戲廠商列表
   */
  gameGroupList?: GameGroupItem[];
}

/**
 * 取得大廳遊戲類型返回資訊
 */
export interface GetGameGroupLobbyResponseData {
  /**
   * 遊戲類型
   */
  list?: GameType[];
}

/**
 * 取得大廳遊戲類型 API 返回
 */
export type GetGameGroupLobbyResponse = ApiResponse<GetGameGroupLobbyResponseData>;

/**
 * 遊戲錢包類型
 */
export interface WalletTypeItem {
  /**
   * ID
   */
  id?: number;

  /**
   * 名稱
   */
  displayName?: string;

  /**
   * 類型
   */
  walletType?: number;
}

/**
 * 遊戲錢包類型返回資訊
 */
export interface GetGameGroupWalletTypeResponseData {
  /**
   * 遊戲錢包類型
   */
  list?: WalletTypeItem[];
}

/**
 * 遊戲錢包類型 API 返回資訊
 */
export type GetGameGroupWalletTypeResponse = ApiResponse<GetGameGroupWalletTypeResponseData>;
