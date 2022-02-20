import { ApiResponse } from '@/api/basic-model';

/**
 * 線路物件
 */
export interface DepositItem {
  /**
   * 線路 ID
   */
  id?: number;

  /**
   * 線路名稱
   */
  name?: string;

  /**
   * 說明
   */
  note?: string;

  /**
   * Icon
   */
  icon?: string;

  /**
   * 推廣文字
   */
  tooltip?: string;

  /**
   * 充值下限
   */
  lower?: number;

  /**
   * 充值上限
   */
  upper?: number;

  /**
   * 維護狀態 1:維護中 2:正常
   */
  maintain?: number;

  /**
   * 是否推薦
   */
  isRecommend?: boolean;

  /**
   * 是否需要真實姓名
   */
  needRealName?: boolean;

  /**
   * 是否有教學
   */
  hasDoc?: boolean;

  /**
   * 教學文字
   */
  docTitle?: string;

  /**
   * 教學位置
   */
  docURL?: string;
}

/**
 * 存款： 取得線路返回資訊
 */
export interface GetDepositResponseData {
  /**
   * 列表
   */
  list?: DepositItem[];

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
 * 存款： 取得線路 API 返回資訊
 */
export type GetDepositResponse = ApiResponse<GetDepositResponseData>;

/**
 * 存款： 建立存款單請求參數
 */
export interface PostDepositRequestData {
  /**
   * 線路 id
   */
  id?: number;

  /**
   * 存款金額
   */
  amount?: number;

  /**
   * 真實姓名
   */
  realName?: string;
}

/**
 * 存款： 建立存款單返回資料
 */
export interface PostDepositResponseData {
  /**
   * 訂單編號
   */
  id?: string;

  /**
   * 開啟網址
   */
  url?: string;

  /**
   * 開啟方式 1:收銀台
   */
  type?: number;
}

/**
 * 存款： 建立存款單 API 返回資料
 */
export type PostDepositResponse = ApiResponse<PostDepositResponseData>;

/**
 * 存款： 取消充值
 */
export interface PostDepositCancelRequestData {
  /**
   * id
   */
  id?: string;
}

/**
 * 存款：單筆充值單資訊查詢參數
 */
export interface GetDepositDetailParams {
  /**
   * Id
   */
  id?: string;
}

/**
 * 存款：單筆充值單資訊返回資料
 */
export interface GetDepositDetailResponseData {
  /**
   * 訂單顯示類型[1:R5-1 站內顯示銀行卡資訊, 2:R5-2-A 站內顯示 QR Code(無銀行卡), 3:R5-2-B 站內顯示 QR Code(有銀行卡), 4:R5-3 跳轉三方出納台]
   */
  cashierType?: number;

  /**
   * 有效充值時間: 若超過指定時間，訂單失效]
   */
  effectiveTime?: number;

  /**
   * 訂單編號
   */
  id?: string;

  /**
   * 實際支付金額
   */
  payAmount?: number;

  /**
   * 充值金額
   */
  amount?: number;

  /**
   * 銀行名稱
   */
  bankName?: string;

  /**
   * 收款卡號
   */
  bankcard?: string;

  /**
   * 收款戶名
   */
  bankcardOwner?: string;

  /**
   * 附言
   */
  prompt?: string;

  /**
   * 充值渠道
   */
  payChannelName?: string;

  /**
   * 目標錢包
   */
  targetWallet?: string;

  /**
   * QRCODE URL或三方出納台URL
   */
  url?: string;
}

/**
 * 存款：單筆充值單資訊 API 返回資料
 */
export type GetDepositDetailResponse = ApiResponse<GetDepositDetailResponseData>;
