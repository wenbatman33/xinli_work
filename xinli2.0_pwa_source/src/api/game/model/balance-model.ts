import { ApiResponse } from '@/api/basic-model';

/**
 * 遊戲錢包物件
 */
export interface BalanceItem {
  /**
   * 錢包ID
   */
  walletID?: string;

  /**
   * 錢包名稱
   */
  name?: string;

  /**
   * 金額
   */
  moeny?: number;

  /**
   * 狀態, 1:成功取得 2:取得失敗
   */
  status?: number;

  /**
   * 最後更新日期
   */
  updatedAt?: string;
}

/**
 * 遊戲錢包資訊
 */
export interface GetBalanceCurrentResponseData {
  /**
   * 錢包紀錄
   */
  list?: BalanceItem[];
}

/**
 * 遊戲錢包 API 返回
 */
export type GetBalanceCurrentResponse = ApiResponse<GetBalanceCurrentResponseData>;

/**
 * 單一遊戲錢包查詢參數
 */
export interface GetBalanceSingleParams {
  /**
   * Game group id
   */
  id?: number;
}

/**
 * 單一遊戲錢包 API 返回
 */
export type GetBalanceSingleResponse = ApiResponse<BalanceItem>;
