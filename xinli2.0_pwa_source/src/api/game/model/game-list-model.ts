import { ApiResponse } from '@/api/basic-model';

/**
 * 從遊戲廠商取得遊戲列表查詢參數
 */
export interface GetByGroupIdParams {
  /**
   * 遊戲廠商ID
   */
  gameGroupID?: number;
}

/**
 * Game item
 */
export interface GameItem {
  /**
   * 遊戲id
   */
  id?: number;

  /**
   * 遊戲顯示名稱
   */
  displayName?: string;

  /**
   * 順序
   */
  sort?: number;

  /**
   * 遊戲狀態
   */
  status?: number;

  /**
   * 遊戲試玩
   */
  trialPlay?: number;

  /**
   * 遊戲圖片pc
   */
  imagePc?: string;

  /**
   * 遊戲圖片h5
   */
  imageH5?: string;

  /**
   * 遊戲入口連結
   */
  roomUrl?: string;

  /**
   * 遊戲是否
   */
  isFavorite?: boolean;
}

/**
 * 從遊戲廠商取得遊戲列表返回資料
 */
export interface GetByGroupIdResponseData {
  list?: GameItem[];
}

/**
 * 從遊戲廠商取得遊戲列表 API 返回
 */
export type GetByGroupIdResponse = ApiResponse<GetByGroupIdResponseData>;

/**
 * 取得使用者收藏遊戲資料查詢參數
 */
export interface GetFavoriteGameParams {
  /**
   * 遊戲類型ID
   */
  gameTypeID?: number;
}

/**
 * 取得使用者收藏遊戲資料
 */
export interface GetFavoriteGameResponseData {
  list?: GameItem[];
}

/**
 * 取得使用者收藏遊戲 API 返回
 */
export type GetFavoriteGameResponse = ApiResponse<GetFavoriteGameResponseData>;

/**
 * 取得熱門遊戲查詢參數
 */
export interface GetHotGameParams {
  /**
   * 遊戲類型ID
   */
  gameGroupID?: number;
}

/**
 * Hot game item
 */
export interface HotGameItem {
  /**
   * 遊戲廠商ID
   */
  gameGroupID?: number;

  /**
   * 遊戲廠商名稱
   */
  gameGroupDisplayName?: string;

  /**
   * 遊戲列表
   */
  gameList?: GameItem[];

  /**
   * 遊戲列表
   */
  gLists?: GameItem[];
}

/**
 * 取得熱門遊戲資料
 */
export interface GetHotGameResponseData {
  list?: HotGameItem[];
}

/**
 * 取得熱門遊戲 API 返回
 */
export type GetHotGameResponse = ApiResponse<GetHotGameResponseData>;

/**
 * 取得最近遊玩遊戲查詢參數
 */
export interface GetPlayedGameParams {
  /**
   * 遊戲廠商ID
   */
  gameGroupID?: number;
}

/**
 * 最近遊玩遊戲物件
 */
export interface PlayedGameItem {
  /**
   * 遊戲廠商ID
   */
  gameGroupID?: number;

  /**
   * 遊戲廠商名稱
   */
  gameGroupDisplayName?: string;

  /**
   * 遊戲列表
   */
  gameList?: GameItem;
}

/**
 * 取得最近遊玩遊戲資料
 */
export interface GetPlayedGameResponseData {
  list?: PlayedGameItem[];
}

/**
 * 取得最近遊玩遊戲 API 返回
 */
export type GetPlayedGameResponse = ApiResponse<GetPlayedGameResponseData>;

/**
 * 收藏此遊戲請求資訊
 */
export interface PostLikeRequestData {
  /**
   * 遊戲ID
   */
  gameListID?: number;
}

/**
 * 取消收藏此遊戲請求資訊
 */
export interface DeleteUnlikeParams {
  /**
   * 遊戲ID
   */
  gameListID?: number;
}
