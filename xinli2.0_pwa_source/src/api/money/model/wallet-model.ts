import { ApiResponse } from '@/api/basic-model';

/**
 * 餘額資訊
 */
export interface MemberMoneyData {
  /**
   * Money
   */
  money?: number;

  /**
   * 鎖定錢包金額
   */
  lockMoney?: number;
}

/**
 * 前台登入取得餘額 API 返回
 */
export type GetMemberMoneyResponse = ApiResponse<MemberMoneyData>;
