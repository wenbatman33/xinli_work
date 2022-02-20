/**
 * 存款單列表查詢參數
 */
export interface GetDepositParams {
  /** 1會員存款 2代理存款 (預設會員存款) */
  source?: Number;

  /** 存款時間 start */
  createdAtStart?: String;

  /** 存款時間 end */
  createdAtEnd?: String;

  /** 最後更新時間 start */
  updateAtStart?: String;

  /** 最後更新時間 end */
  updateAtEnd?: String;

  /** 狀態：全部:0 處理中:1 失敗:2 完成:3 */
  status?: String;

  /** 單號：模糊搜尋，可同時搜尋我方存款單號與三方單號 */
  id?: String;

  /** 存款方式：全部、支付寶、微信等支付方式，下拉式選擇 */
  method?: String;

  /** 會員帳號：模糊搜尋 */
  memberName?: String;

  /** 三方金流群組id */
  payGroupID?: String;

  /** 存款卡金流群組id */
  bankcardGroupID?: String;

  /** 入帳日期 */
  balanceDate?: String;

  /** 線路：模糊搜尋 */
  serviceName?: String;

  /** 裝置 1:WEB 2:H5_android 4:H5_ios 8:pwa_android 16:pwa_ios */
  device?: String;

  /** 到帳方式 0:全部 1:系統 2:手動 4:代理 , 逗號分開 預設 1,2 */
  type?: String;

  /** 商戶ID */
  payChannelNameID?: String;

  /** 商戶號ID */
  payChannelID?: String;

  /** 排序欄位 */
  sort?: String;

  /** 排序方向 [desc | asc] */
  dir?: String;
}

/**
 * 存款單列表陣列元素
 */
export interface DepositItem {
  /** id */
  id?: string;

  /** 到帳方式 1:系統 2:手動 4:代理 */
  type?: number;

  /** 會員帳號 */
  memberAccount?: string;

  /** 會員名稱 */
  memberName?: string;

  /** 會員ID */
  memberID?: number;

  /** 存單金額 */
  amount?: number;

  /** 手續費 */
  fee?: number;

  /** 狀態 1:處理中 2:失敗 3:完成 */
  status?: number;

  /** 三方金流組別id (逗號分開) */
  payGroupName?: string;

  /** 銀行卡金流組別id (逗號分開) */
  bankcardGroupName?: string;

  /** 存款人姓名 */
  depositName?: string;

  /** 存款線路 */
  gatway?: string;

  /** 存款方式 */
  payment?: string;

  /** 三方單號 */
  thirdID?: string;

  /** 存款銀行卡 */
  bankcard?: string;

  /** 裝置 1:WEB 2:H5_android 4:H5_ios 8:pwa_android 16:pwa_ios */
  device?: number;

  /** 入帳日期 */
  balanceDate?: string;

  /** 執行人 */
  editorName?: string;

  /** 存款時間 */
  createdAt?: string;

  /** 最後更新時間 */
  updatedAt?: string;
}

/**
 * 存款單列表返回資料
 */
export interface GetDepositResultModel {
  /** 資料筆數 */
  count: number;

  /** 訂單總金額 */
  amount?: number;

  /** 訂單總手續費 */
  fee?: number;

  /** 資料列表 */
  list?: DepositItem[];
}

/**
 * 新增存款單請求參數
 */
export interface PostDepositData {
  /** 1會員存款 2代理存款 (預設會員存款) */
  source?: Number;

  /** 會員帳號 */
  memberAccount?: string;

  /** 入帳時間 */
  balanceDate?: string;

  /** 存款金額 */
  amount?: number;

  /** 線路id */
  payChannelServiceID?: string;

  /** 交易手續費 */
  fee?: number;

  /** 三方單號 */
  thirdID?: string;

  /** 備註說明 */
  note?: string;
}

/**
 * 新增存款單返回資料
 */
export interface PostDepositResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 查看訂單紀錄查詢參數
 */
export interface GetDepositNoteParams {
  /** id */
  id?: string;
}

/**
 * 訂單紀錄陣列元素
 */
export interface NoteItem {
  /** 紀錄ID (流水號) */
  id?: number;

  /** 紀錄 */
  note?: string;

  /** 編輯者 */
  author?: string;

  /** 操作時間 */
  createdAt?: string;
}

/**
 * 查看訂單紀錄返回資料
 */
export interface GetDepositNoteResultModel {
  list?: NoteItem[];
}

/**
 * 新增存款單備註請求參數
 */
export interface PostDepositNoteData {
  /** id */
  id?: string;

  /** 紀錄 */
  note?: string;
}

/**
 * 新增存款單備註返回資料
 */
export interface PostDepositNoteResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 修改存款單入帳日請求參數
 */
export interface PutDepositBalanceDateData {
  /** id */
  id?: string;

  /** 入帳日 */
  balanceDate?: string;

  /** 紀錄 */
  note?: string;
}

/**
 * 修改存款單入帳日返回資料
 */
export interface PutDepositBalanceDateResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 查詢三方回調狀態請求參數
 */
export interface PostDepositCallbackData {
  /** id */
  id?: string;
}

/**
 * 查詢三方回調狀態返回資料
 */
export interface PostDepositCallbackResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 計算手續費請求參數
 */
export interface PostDepositFeeData {
  /** 存款金額 */
  amount?: number;

  /** 線路id */
  payChannelServiceID?: string;
}

/**
 * 計算手續費返回資料
 */
export interface PostDepositFeeResultModel {
  /** 參考手續費 */
  fee?: number;
}
