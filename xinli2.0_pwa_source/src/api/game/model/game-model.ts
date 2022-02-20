import { ApiResponse } from '@/api/basic-model';

/**
 * 一鍵回收資訊
 */
export interface PostRecycleResponseData {
  /**
   * Money
   */
  money?: number;
}

/**
 * 一鍵回收 API 返回
 */
export type PostRecycleResponse = ApiResponse<PostRecycleResponseData>;

/**
 * 登入遊戲取得網址查詢參數
 */
export interface GetGameLoginParams {
  /**
   * 遊戲ID
   */
  gameListID?: string;
}

/**
 * 登入遊戲取得網址返回
 */
export interface GetGameLoginResponseData {
  /**
   * 遊戲網址
   */
  url?: string;
}

/**
 * 登入遊戲取得網址 API 返回
 */
export type GetGameLoginResponse = ApiResponse<GetGameLoginResponseData>;
