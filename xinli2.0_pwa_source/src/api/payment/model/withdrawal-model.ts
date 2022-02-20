import { ApiResponse } from '@/api/basic-model';

/**
 * 提款: 提款首頁返回資訊
 */
export interface GetWithdrawalResponseData {
  /**
   * ERC 匯率
   */
  exchangeRateERC?: number;

  /**
   * TRC 匯率
   */
  exchangeRateTRC?: number;
}

/**
 * 提款: 提款首頁 API 返回資訊
 */
export type GetWithdrawalResponse = ApiResponse<GetWithdrawalResponseData>;

/**
 * 提款: 提款送出請求參數
 */
export interface PostWithdrawalRequestData {
  /**
   * 提領方式 1:銀行卡 2:USDT-ERC 3:USDT-TRC
   */
  type?: number;

  /**
   * 提領地址 or 提領銀行卡 id
   */
  id?: string;

  /**
   * 提款金額
   */
  amount?: number;
}

/**
 * 提款: 提款送出返回資訊
 */
export interface PostWithdrawalResponseData {
  id?: string;
}

/**
 * 提款: 提款送出 API 返回資訊
 */
export type PostWithdrawalResponse = ApiResponse<PostWithdrawalResponseData>;
