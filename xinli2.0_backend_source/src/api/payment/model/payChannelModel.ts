/**
 * 商戶陣列元素
 */
export interface PayChannelNameItem {
  /** id */
  id: number;

  /** 商戶名稱 */
  name: string;
}

/**
 * 商戶管理: 新增商戶請求參數
 */
export interface PostPayChannelNameData {
  /** 商戶名稱 */
  name: string;
}

/**
 * 商戶號管理: 商戶號列表查詢參數
 */
export interface GetPayChannelParams {
  /** 商戶號 */
  sn?: string;

  /** 商戶號狀態 */
  status?: number;

  /** 商戶名稱 */
  name?: string;

  /** 是否支援代付 */
  supplyAp?: boolean;

  /** 排序欄位 */
  sort?: string;

  /** 排序方向 [desc | asc] */
  dir?: string;
}

/**
 * 商戶號管理: 新增商戶號請求參數
 */
export interface PostPayChannelData {
  /** 商戶id */
  payChannelNameID?: number;

  /** 商戶號 */
  sn?: string;

  /** 結算方式，T0:0 T1:1 D0:2 D1:3 */
  method?: number;

  /** 是否支援代付 */
  supplyAp?: boolean;

  /** 代付每筆上限 */
  apUpperLimit?: number;

  /** 代付每筆下限 */
  apLowerLimit?: number;

  /** 代付每日上限 */
  apDayLimit?: number;

  /** 代付手續費，每千 */
  apFee?: number;

  /** 代付手續費，每筆 */
  apPerFee?: number;

  /** 代付狀態[1:啟用,2:停用] */
  apStatus?: number;

  /** 18代付每筆上限 */
  eighteenApUpperLimit?: number;

  /** 18代付每筆下限 */
  eighteenApLowerLimit?: number;

  /** 結算每筆上限 */
  spUpperLimit?: number;

  /** 結算每筆下限 */
  spLowerLimit?: number;

  /** 結算手續費，每千 */
  spFee?: number;

  /** 結算手續費，每筆 */
  spPerFee?: number;

  /** 商戶號充值上限 */
  depositLimit?: number;

  /** 充值每筆上限 */
  depositUpperLimit?: number;

  /** 充值每筆下限 */
  depositLowerLimit?: number;

  /** 充值手續費，每千 */
  depositFee?: number;

  /** 充值手續費，每筆 */
  depositPerFee?: number;

  /** 餘額查詢url */
  balanceUrl?: string;

  /** 訂單查詢url */
  orderQueryUrl?: string;

  /** 三方代收的網址 */
  requestUrl?: string;

  /** 三方回調網址 */
  notifyUrl?: string;

  /** 日切開始時間 */
  settleStime?: string;

  /** 日切結束時間 */
  settleEtime?: string;

  /** 備註 */
  note?: string;

  /** 啟用狀態[1:啟用,2:停用] */
  status?: number;
}

/**
 * 商戶號管理: 編輯商戶號請求參數
 */
export interface PutPayChannelData {
  /** 商戶號id */
  id?: number;

  /** 商戶id */
  payChannelNameID?: number;

  /** 商戶號 */
  sn?: string;

  /** 結算方式，T0:0 T1:1 D0:2 D1:3 */
  method?: number;

  /** 是否支援代付 */
  supplyAp?: boolean;

  /** 代付每筆上限 */
  apUpperLimit?: number;

  /** 代付每筆下限 */
  apLowerLimit?: number;

  /** 代付每日上限 */
  apDayLimit?: number;

  /** 代付手續費，每千 */
  apFee?: number;

  /** 代付手續費，每筆 */
  apPerFee?: number;

  /** 代付狀態[1:啟用,2:停用] */
  apStatus?: number;

  /** 18代付每筆上限 */
  eighteenApUpperLimit?: number;

  /** 18代付每筆下限 */
  eighteenApLowerLimit?: number;

  /** 結算每筆上限 */
  spUpperLimit?: number;

  /** 結算每筆下限 */
  spLowerLimit?: number;

  /** 結算手續費，每千 */
  spFee?: number;

  /** 結算手續費，每筆 */
  spPerFee?: number;

  /** 商戶號充值上限 */
  depositLimit?: number;

  /** 充值每筆上限 */
  depositUpperLimit?: number;

  /** 充值每筆下限 */
  depositLowerLimit?: number;

  /** 充值手續費，每千 */
  depositFee?: number;

  /** 充值手續費，每筆 */
  depositPerFee?: number;

  /** 餘額查詢url */
  balanceUrl?: string;

  /** 訂單查詢url */
  orderQueryUrl?: string;

  /** 三方代收的網址 */
  requestUrl?: string;

  /** 三方回調網址 */
  notifyUrl?: string;

  /** 日切開始時間 */
  settleStime?: string;

  /** 日切結束時間 */
  settleEtime?: string;

  /** 備註 */
  note?: string;

  /** 啟用狀態[1:啟用,2:停用] */
  status?: number;
}

/**
 * 商戶號管理: 查看特定商戶號查詢參數
 */
export interface GetPayChannelShowParams {
  /** id */
  id: number;
}

/**
 * 商戶號管理: 充值請求參數
 */
export interface PostRemainAddData {
  /** 異動商戶號id */
  id?: number;

  /** 類型 1:銀行卡 2:商戶號 */
  targetType?: number;

  /** 銀行卡 或 商戶號 id */
  targetID?: number;

  /** 異動金額 */
  amount?: number;

  /** 手續費 */
  fee?: number;

  /** 三方單號 */
  thirdID?: string;

  /** 異動備註 */
  note?: string;
}

/**
 * 商戶號管理: 結算請求參數
 */
export interface PostRemainSubData {
  /** 異動商戶號id */
  id?: number;

  /** 類型 1:銀行卡 2:商戶號 */
  targetType?: number;

  /** 銀行卡 或 商戶號 id */
  targetID?: number;

  /** 異動金額 */
  amount?: number;

  /** 手續費 */
  fee?: number;

  /** 三方單號 */
  thirdID?: string;

  /** 異動備註 */
  note?: string;
}

/**
 * 商戶號管理: 凍結請求參數
 */
export interface PostFrozenAddData {
  /** 異動商戶號id */
  id?: number;

  /** 異動金額 */
  amount?: number;

  /** 手續費 */
  fee?: number;

  /** 異動備註 */
  note?: string;
}

/**
 * 商戶號管理: 解除凍結請求參數
 */
export interface PostFrozenSubData {
  /** 異動商戶號id */
  id?: number;

  /** 異動金額 */
  amount?: number;

  /** 手續費 */
  fee?: number;

  /** 異動備註 */
  note?: string;
}

/**
 * 商戶號管理: 代付狀態變更請求參數
 */
export interface PostPayChannelApData {
  /** 異動商戶號id */
  id?: number;
}

/**
 * 商戶號陣列元素
 */
export interface PayChannelItem {
  /** id */
  id?: number;

  /** 商戶名稱 */
  name?: string;

  /** 商戶號 */
  sn?: string;

  /** 商戶號狀態 */
  status?: number;

  /** 結算方式，T0:0 T1:1 D0:2 D1:3 */
  method?: number;

  /** 線路數量 */
  payChannelServiceCount?: number;

  /** 日切時間 */
  settle?: string;

  /** 商戶餘額 */
  remainAmount?: number;

  /** 凍結金額 */
  frozenAmount?: number;

  /** 今日累計收款 */
  todayDepositTotal?: number;

  /** 今日累計出款 */
  todayWithdrawalTotal?: number;

  /** 代付每筆上限 */
  apUpperLimit?: number;

  /** 代付每筆下限 */
  apLowerLimit?: number;

  /** 代付每日上限 */
  apDayLimit?: number;

  /** 代付手續費，每千 */
  apFee?: number;

  /** 代付手續費，每筆 */
  apPerFee?: number;

  /** 18代付每筆上限 */
  eighteenApUpperLimit?: number;

  /** 18代付每筆下限 */
  eighteenApLowerLimit?: number;

  /** 代付可用餘額 */
  apAmount?: number;

  /** 是否有提供代付 */
  supplyAp?: boolean;

  /** 代付狀態 */
  apStatus?: number;

  /** 結算每筆上限 */
  spUpperLimit?: number;

  /** 結算每筆下限 */
  spLowerLimit?: number;

  /** 結算手續費，每千 */
  spFee?: number;

  /** 結算手續費，每筆 */
  spPerFee?: number;

  /** 可存放餘額百分比 ex:0.73 = 73% */
  depositRatio?: number;

  /** 商戶號充值上限 */
  depositLimit?: number;

  /** 充值每筆上限 */
  depositUpperLimit?: number;

  /** 充值每筆下限 */
  depositLowerLimit?: number;

  /** 充值手續費，每千 */
  depositFee?: number;

  /** 充值手續費，每筆 */
  depositPerFee?: number;

  /** 餘額查詢url */
  balanceUrl?: string;

  /** 訂單查詢url */
  orderQueryUrl?: string;

  /** 三方代收的網址 */
  requestUrl?: string;

  /** 三方回調網址 */
  notifyUrl?: string;

  /** 日切開始時間 */
  settleStime?: string;

  /** 日切結束時間 */
  settleEtime?: string;

  /** 備註 */
  note?: string;
}

/**
 * 商戶管理: 商戶列表返回資料
 */
export interface GetPayChannelNameResultModel {
  /** 商戶陣列 */
  list: PayChannelNameItem[];
}

/**
 * 商戶管理: 新增商戶返回資料
 */
export interface PostPayChannelNameResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 商戶號管理: 商戶號列表返回資料
 */
export interface GetPayChannelResultModel {
  /** 商戶號陣列 */
  list: PayChannelItem[];
}

/**
 * 商戶號管理: 新增商戶號返回資料
 */
export interface PostPayChannelResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 商戶號管理: 編輯商戶號返回資料
 */
export interface PutPayChannelResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 商戶號管理: 查看特定商戶號返回資料
 */
export interface GetPayChannelShowResultModel {
  /** 商戶號陣列 */
  list: PayChannelItem[];
}

/**
 * 商戶號管理: 充值返回資料
 */
export interface PostRemainAddResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 商戶號管理: 結算返回資料
 */
export interface PostRemainSubResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 商戶號管理: 凍結返回資料
 */
export interface PostFrozenAddResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 商戶號管理: 解除凍結返回資料
 */
export interface PostFrozenSubResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 商戶號管理: 代付狀態變更請求參數
 */
export interface PostPayChannelApResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 商戶號管理: 代付狀態變更請求參數
 */
export interface GetPayChannelLogParams {
  /** 交易時間開始 */
  createdAtStart: string;

  /** 交易時間結束 */
  createdAtEnd: string;

  /** 商戶號ID */
  payChannelID?: number;

  /** 商戶號 */
  payChannel?: number;

  /** 線路ID */
  payChannelServiceID?: number;

  /** 線路 */
  payChannelService?: number;

  /** 排序方向 [desc | asc] */
  dir?: string;
}

/**
 * 商戶號管理: 帳務明細查詢參數
 */
export interface payChannelLogList {
  /** id */
  id: number;

  /** 交易時間 */
  createdAt: string;

  /** 科目ID */
  subjectID: number;

  /** 收 */
  in: number;

  /** 支 */
  out: number;

  /** 手續費 */
  fee: number;

  /** 結餘 */
  remainBalance: number;

  /** 凍結結餘 */
  frozenBalance: number;

  /** 相關單號 */
  relationID: string;

  /** 三方單號 */
  thirdID: string;

  /** 交易對象類型 0無對象 1商戶號 2會員 3銀行卡 4代理 */
  targetType: number;

  /** 交易對象ID*/
  targetID: number;

  /** 交易對象 (會員帳號 商戶號 卡號) */
  targetName: string;

  /** 執行人 */
  editorName: string;

  /** 備註 */
  note: string;
}

/**
 * 商戶號管理: 帳務明細返回資料
 */
export interface GetPayChannelLogModel {
  list: payChannelLogList[];

  /** 手續費 */
  fee: number;

  /** 收 */
  in: number;

  /** 支 */
  out: number;
}

/**
 * 商戶號管理: 修改帳務明細備註請求參數
 */
export interface PutPayChannelLogNoteParams {
  /** id */
  id: number;

  /** note */
  note: string;
}

/**
 * 商戶號管理: 修改帳務明細備註返回資料
 */
export interface PutPayChannelLogNoteModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 商戶號管理: 取得銀行卡號 / 商戶號資訊查詢參數
 */
export interface GetPayChannelSearchParams {
  /** 關鍵字 */
  keyword: string;
}

/**
 * 商戶號管理: 取得銀行卡號 / 商戶號資訊返回資料
 */
export interface GetPayChannelSearchResultModel {
  /** 類型 1:銀行卡 2:商戶號 */
  type?: number;

  /** 銀行卡 或 商戶號 id */
  id?: number;

  /** 戶名 or 商戶名 */
  name?: string;

  /** 銀行名稱 (銀行卡才有) */
  bankName?: string;

  /** 銀行卡用途[1出款2結算3中轉4倉庫] */
  bankcardType?: string;
}
