import { ApiResponse } from '@/api/basic-model';

/**
 * 取得紀錄查詢參數
 */
export interface GetRecordParams {
  /**
   * 時間區間開始
   */
  startTime?: string;

  /**
   * 時間區間結束
   */
  endTime?: string;
}

/**
 * 紅利紀錄物件
 */
export interface BonusRecordItem {
  /**
   * 存入
   */
  bonusIn?: string;

  /**
   * 類型[優惠、VIP禮金、反水、其他]
   */
  typeName?: string;

  /**
   * 金額
   */
  bonus?: number;

  /**
   * 狀態[1處理中2成功3失敗]
   */
  status?: string;

  /**
   * 狀態[成功,失败,等待中]
   */
  statusStr?: string;

  /**
   * 單號
   */
  orderNo?: string;

  /**
   * 時間
   */
  updatedAt?: string;

  /**
   * 說明
   */
  description?: string;
}

/**
 * 取得紅利紀錄返回資訊
 */
export interface GetBonusRecordResponseData {
  /**
   * 列表
   */
  list?: BonusRecordItem[];
}

/**
 * 取得紅利紀錄 API 返回
 */
export type GetBonusRecordResponse = ApiResponse<GetBonusRecordResponseData>;

/**
 * 充值紀錄物件
 */
export interface DepositRecordItem {
  /**
   * 付費方式(充值渠道名稱 or 代理帳號)
   */
  payment?: string;

  /**
   * 充值金額
   */
  amount?: number;

  /**
   * 狀態[1:處理中 2:失敗 3:完成 4:逾時]
   */
  status?: string;

  /**
   * 狀態[成功,失败,等待中]
   */
  statusStr?: string;

  /**
   * 訂單號
   */
  id?: string;

  /**
   * 存單建立時間
   */
  createdAt?: string;

  /**
   * 匯率
   */
  exchangeRate?: number;
}

/**
 * 取得充值紀錄返回資訊
 */
export interface GetDepositRecordResponseData {
  /**
   * 列表
   */
  list?: DepositRecordItem[];
}

/**
 * 取得紅利紀錄 API 返回
 */
export type GetDepositRecordResponse = ApiResponse<GetDepositRecordResponseData>;

/**
 * 提款紀錄物件
 */
export interface WithdrawalRecordItem {
  /**
   * 提款方式（銀行卡orUSDT）
   */
  payment?: string;

  /**
   * 提款金額
   */
  amount?: number;

  /**
   * 狀態[1.待審核 2.待出款 3.退回 4.出款中 5. 完成 6.失敗]
   */
  status?: string;

  /**
   * 狀態[審核中,失敗,等待中,成功]
   */
  statusStr?: string;

  /**
   * 存入位置：提款標的銀行與末4碼卡號 or （ERC20/TRC20）虛擬提領地址
   */
  to?: string;

  /**
   * 訂單號
   */
  id?: string;

  /**
   * 提單建立時間
   */
  createdAt?: string;

  /**
   * 匯率（若使用USDT 才會有）
   */
  exchangeRate?: number;
}

/**
 * 取得提款紀錄返回資訊
 */
export interface GetWithdrawalRecordResponseData {
  /**
   * 列表
   */
  list?: WithdrawalRecordItem[];
}

/**
 * 取得提款紀錄 API 返回
 */
export type GetWithdrawalRecordResponse = ApiResponse<GetWithdrawalRecordResponseData>;
