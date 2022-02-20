import api from '@/api';
import type { ErrorHandler } from '@/api/basic-model';
import type { GetMemberMoneyResponse } from '@/api/money/model/wallet-model';

/**
 * Api urls
 */
enum Urls {
  MEMBER_MONEY = '/money/wallet/member/money',
}

/**
 * 前台登入取得餘額
 * @param errorHandler Error handler
 * @returns Axios request promise
 */
export const getMemberMoney = (errorHandler?: ErrorHandler) => api.get<GetMemberMoneyResponse>(Urls.MEMBER_MONEY, { data: errorHandler });
