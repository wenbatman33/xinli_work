/**
 * 取得存款報表通用查詢參數
 */
export interface GetDepositReportParams {
  /**
   * 報表日期：開始
   */
  reportDateStart?: string;

  /**
   * 報表日期：結束
   */
  reportDateEnd?: string;

  /**
   * 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关]
   */
  serviceCode?: string;
}

/**
 * 金額區間存款報表通用陣列物件
 */
export interface DepositAmountRangeReportItem {
  /**
   * 報表日期
   */
  reportDate?: string;

  /**
   * 支付方式
   */
  serviceCode?: string;

  /**
   * 金額0~100
   */
  amount100?: number;

  /**
   * 金額101~500
   */
  amount500?: number;

  /**
   * 金額501~1,000
   */
  amount1000?: number;

  /**
   * 金額1,001~2,000
   */
  amount2000?: number;

  /**
   * 金額2,001~6,000
   */
  amount6000?: number;

  /**
   * 金額6,001~10,000
   */
  amount10000?: number;

  /**
   * 金額10,001~20,000
   */
  amount20000?: number;

  /**
   * 金額兩萬以上
   */
  amountMore20000?: number;

  /**
   * 報表最後更新日期
   */
  updatedAt?: string;

  /**
   * 報表最後建立日期
   */
  createdAt?: string;
}

/**
 * 取得金額區間存款報表通用返回資料
 */
export interface GetDepositAmountRangeReportResultModel {
  /**
   * Deposit Summary Report列表
   */
  list?: DepositAmountRangeReportItem[];

  /**
   * 總數
   */
  count?: number;

  /**
   * 金額0~100合計次數
   */
  totalAmount100?: number;

  /**
   * 金額101~500合計次數
   */
  totalAmount500?: number;

  /**
   * 金額501~1,000合計次數
   */
  totalAmount1000?: number;

  /**
   * 金額1,001~2,000合計次數
   */
  totalAmount2000?: number;

  /**
   * 金額2,001~6,000合計次數
   */
  totalAmount6000?: number;

  /**
   * 金額6,001~10,000合計次數
   */
  totalAmount10000?: number;

  /**
   * 金額10,001~20,000合計次數
   */
  totalAmount20000?: number;

  /**
   * 金額兩萬以上合計次數
   */
  totalAmountMore20000?: number;

  /**
   * 最後更新時間
   */
  updatedAt?: string;
}

/**
 * 人數存款報表通用陣列物件
 */
export interface DepositPeopleReportItem {
  /**
   * 報表日期
   */
  reportDate?: string;

  /**
   * 支付方式
   */
  serviceCode?: string;

  /**
   * 唯一存款人數
   */
  uniquePeople?: number;

  /**
   * 首存人數
   */
  firstPeople?: number;

  /**
   * 存款次數
   */
  depositNum?: number;

  /**
   * 存款金額
   */
  amount?: number;

  /**
   * 人均存款金額
   */
  avgAmount?: number;

  /**
   * 手續費
   */
  fee?: number;

  /**
   * 實收金額
   */
  actualAmount?: number;

  /**
   * 活躍人數
   */
  activePeople?: number;

  /**
   * 存款比
   */
  depositRate?: number;

  /**
   * 報表最後更新日期
   */
  updatedAt?: string;

  /**
   * 報表最後建立日期
   */
  createdAt?: string;
}

/**
 * 取得人數存款報表通用返回資料
 */
export interface GetDepositPeopleReportResultModel {
  /**
   * Deposit Summary Report列表
   */
  list?: DepositPeopleReportItem[];

  /**
   * 總數
   */
  count?: number;

  /**
   * 合計存款次數
   */
  totalDepositNum?: number;

  /**
   * 合計存款金額
   */
  totalAmount?: number;

  /**
   * 合計手續費
   */
  totalFee?: number;

  /**
   * 合計實收金額
   */
  totalActualAmount?: number;

  /**
   * 最後更新時間
   */
  updatedAt?: string;
}

/**
 * 重算存款報表通用請求參數
 */
export interface PostDepositReportData {
  /**
   * 報表日期：週報必須是週一日期；月報必須是1號日期
   */
  reportDate?: string;
}

/**
 * 取得會員存款報表查詢參數
 */
export interface GetDepositMemberReportParams {
  /**
   * 報表日期：開始
   */
  reportDateStart?: string;

  /**
   * 報表日期：結束
   */
  reportDateEnd?: string;

  /**
   * 幣別: [1:人民幣 2:USDT-ERC 3:USDT-TRC]
   */
  currency?: string;

  /**
   * 三方金流群組名稱
   */
  paymentGroup?: string;

  /**
   * 銀行卡群組名稱
   */
  bankcardGroup?: string;

  /**
   * 每頁筆數
   */
  pageSize?: number;
}
