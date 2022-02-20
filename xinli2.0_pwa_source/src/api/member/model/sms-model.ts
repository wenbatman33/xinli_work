import { ApiResponse } from '@/api/basic-model';

/**
 * 發送訊息請求資訊
 */
export interface GetSendParams {
  /**
   * 手機號
   */
  phone?: string;
}

/**
 * 驗證驗證碼請求資訊
 */
export interface PostVerifyRequestData {
  /**
   * 驗證碼
   */
  code?: string;
}

/**
 * 驗證驗證碼返回資訊
 */
export interface PostVerifyResponseData {
  /**
   * 驗證密文
   */
  secret?: string;
}

/**
 * 驗證驗證碼 API 返回資訊
 */
export type PostVerifyResponse = ApiResponse<PostVerifyResponseData>;
