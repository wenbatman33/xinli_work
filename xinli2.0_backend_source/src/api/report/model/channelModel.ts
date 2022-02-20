/**
 * 取得進款統計報表查詢參數
 */
export interface GetChannelDepositParams {
  /**
   * 報表日期:開始
   */
  reportDateStart?: string;

  /**
   * 報表日期：結束
   */
  reportDateEnd?: string;

  /**
   * 報表時段:開始
   */
  reportHourStart?: string;

  /**
   * 報表時段：結束
   */
  reportHourEnd?: string;

  /**
   * 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关]
   */
  serviceCode?: string;

  /**
   * 線路id
   */
  payChannelServiceID?: string;
}

/**
 * 取得進款統計報表返回資訊
 */
export interface GetChannelDepositResultModel {
  /**
   * 線路進款統計列表
   */
  channels?: string[];

  /**
   * 線路陣列列表清單
   */
  list?: Recordable<string>;

  /**
   * 總數
   */
  count?: number;

  /**
   * 最後更新時間
   */
  updatedAt?: string;
}

/**
 * 重算進款統計報表請求資訊
 */
export interface PosthannelDepositData {
  /**
   * 報表日期
   */
  reportDate?: string;

  /**
   * 報表時段
   */
  reportHour?: string;
}

/**
 * 取得單一線路進款表查詢參數
 */
export interface GetChannelSingleChannelDepositParams {
  /**
   * 報表日期:開始
   */
  reportDateStart?: string;

  /**
   * 報表日期：結束
   */
  reportDateEnd?: string;

  /**
   * 報表時段:開始
   */
  reportHourStart?: string;

  /**
   * 報表時段：結束
   */
  reportHourEnd?: string;

  /**
   * 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关]
   */
  serviceCode?: string;

  /**
   * 線路id
   */
  payChannelServiceID?: string;
}

/**
 * 單一線路進款表陣列物件
 */
export interface ChannelSingleChannelDepositItem {
  /**
   * id
   */
  id: number;

  /**
   * 報表日期
   */
  reportDate: string;

  /**
   * 報表小時
   */
  reportHour: number;

  /**
   * 支付方式
   */
  serviceCode: string;

  /**
   * 線路ID
   */
  payChannelServiceID: number;

  /**
   * 線路名稱
   */
  payChannelServiceName: string;

  /**
   * 存款次數
   */
  depositNum: number;

  /**
   * 存款金額
   */
  amount: number;

  /**
   * 備註
   */
  note: string;

  /**
   * 報表最後更新日期
   */
  updatedAt: string;

  /**
   * 報表最後建立日期
   */
  createdAt: string;
}

/**
 * 取得單一線路進款表返回資訊
 */
export interface GetChannelSingleChannelDepositResultModel {
  /**
   * 線路進款統計列表
   */
  list?: ChannelSingleChannelDepositItem[];

  /**
   * 總數
   */
  count: number;

  /**
   * 合計存款次數
   */
  totalDepositNum: number;

  /**
   * 合計存款金額
   */
  totalAmount: number;

  /**
   * 最後更新時間
   */
  updatedAt: string;
}

/**
 * 變更單一線路進款表備註
 */
export interface PutChannelSingleChannelDepositNoteData {
  /**
   * 報表ID
   */
  id?: string;

  /**
   * 備註
   */
  note?: string;
}
