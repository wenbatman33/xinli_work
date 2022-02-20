/**
 * 顯示項目列表查詢參數
 */
export interface GetFinanceParams {
  /** 啟用狀態 0: 全部，1: 啟用，2: 關閉 */
  status?: number;

  /** 維護狀態 0: 全部，1: 維護中，2: 正常 */
  maintain?: number;
}

/**
 * 顯示項目列表陣列元素
 */
export interface FinanceItem extends PostFinanceCreateData {
  /** ID */
  id?: number;

  /** 最後更新時間 */
  updatedAt?: string;

  /** 執行人 */
  updatedUser?: string;

  /** 線路列表 */
  services?: ChannelItem[];
}

/**
 * 新增顯示項目請求參數
 */
export interface PostFinanceCreateData {
  /** 前台名稱 */
  name?: string;

  /** 備註 */
  note?: string;

  /** 币別 */
  currency?: number;

  /** 同時啟用最大線路數量 */
  nums?: number;

  /** 啟用狀態 */
  status?: number;

  /** 維護狀態 */
  maintain?: number;
  icon: string;
  isRecommend: boolean;
  needRealName: boolean;
  tooltip: string;
  hasDoc: boolean;
  docTitle: string;
  docURL: string;
}

/**
 * 搜尋線路查詢參數
 */
export interface GetChannelParams {
  /** 當前的前台顯示的線路ＩＤ */
  financeID?: number;

  /** 線路名稱 */
  name?: string;

  /** 狀態 */
  status?: number;

  /** 支付方式 */
  method?: string;

  /** 金流組別 */
  groupID?: number;
}

/**
 * 線路列表陣列元素
 */
export interface ChannelItem {
  /** 線路id */
  id?: number;

  /** 商戶id */
  payChannelID: number;

  /** 商戶名稱 */
  name?: string;

  /** 線路成功率 */
  rate?: number;

  /** 金流群組 */
  groups?: string[];

  /** 今日收款總額 */
  amount?: number;

  /** 剩餘可使用額度 */
  remain?: number;

  /** 商戶日切時間 */
  settle?: string;

  /** 單筆上限 */
  upperLimit?: number;

  /** 單筆下限 */
  lowerLimit?: number;

  /** 每日限額 */
  dayLimit?: number;

  /** 每筆手續費 */
  perFee?: number;

  /** 代收手續費 */
  fee?: number;

  /** 狀態 */
  status?: number;

  /** 備註 */
  note?: string;

  /** 支付方式 */
  serviceCode?: string;

  /** 支付方式 */
  method?: number;
}

/**
 * 加入線路請求餐數
 */
export interface PostFinanceAddData {
  /** 前台顯示線路 id */
  financeID?: number;

  /** 線路 id */
  payChannelServiceID?: number;
}

/**
 * 取得顯示項目查詢參數
 */
export interface GetFinanceEditParams {
  /** 指定的前台顯示線路ID */
  id?: number;
}

/**
 * 儲存顯示項目請求參數
 */
export interface PutFinanceEditData extends PostFinanceCreateData {
  /** 指定的前台顯示線路ID */
  id?: number;
}

/**
 * 移除線路請求參數
 */
export interface DeleteChannelData {
  /** 前台顯示線路 id */
  financeID?: number;

  /** 線路 id */
  payChannelServiceID?: number;
}

/**
 * 移除顯示項目請求參數
 */
export interface DeleteFinanceData {
  /** 前台顯示線路 id */
  financeID?: number;
}

/**
 * 將線路重新排序請求參數
 */
export interface PutFinanceSortData {
  /** 線路ＩＤ */
  id?: number;

  /** 重新排序後的位置，由 0 開始計算，例如：重新排序後的位置是第三，則帶 2 */
  sort?: number;
}

/**
 * 顯示項目列表返回資料
 */
export interface GetFinanceResultModel {
  /** 項目陣列 */
  list: FinanceItem[];
}

/**
 * 新增顯示項目返回資料
 */
export interface PostFinanceCreateResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 搜尋線路返回資料
 */
export interface GetChannelResultModel {
  /** 項目陣列 */
  list: ChannelItem[];
}

/**
 * 加入線路返回資料
 */
export interface PostFinanceAddResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 取得單一線路返回資料
 */
export interface GetFinanceEditResultModel {
  /** 名稱 */
  name?: string;

  /** 備註 */
  note?: string;

  /** 同時啟用線路 */
  nums?: number;

  /** 顯示狀態 */
  status?: string;

  /** 維護狀態 */
  maintain?: string;

  /** 最後更新時間 */
  updatedAt?: string;

  /** 執行人 */
  updatedUser?: string;
}

/**
 * 儲存單一線路返回資料
 */
export interface PutFinanceEditResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 移除線路返回資料
 */
export interface DeleteChannelResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 移除顯示項目返回資料
 */
export interface DeleteFinanceResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 將線路重新排序返回資料
 */
export interface PutFinanceSortResultModel {
  /** 請求是不是成功 */
  success: boolean;
}
