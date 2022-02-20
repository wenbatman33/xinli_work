/**
 * 提款管理：列表與篩選查詢參數
 */
export interface GetWithdrawalParams {
  /** 1會員存款 2代理存款 (預設會員存款) */
  source?: Number;

  /** 提款時間:開始 */
  withdrawalStart?: string;

  /** 提款時間:結束 */
  withdrawalEnd?: string;

  /** 會員帳號 */
  memberAccount?: string;

  /** 提款單號 */
  orderSn?: string;

  /** 狀態，全部（預設）、待審核、待出款、退回、出款中、成功、失敗 */
  status?: number;

  /** 戶名 */
  withdrawalName?: string;

  /** 提款銀行 */
  bankName?: string;

  /** 銀行卡號 */
  bankcardNo?: string;

  /** 最後更新時間:開始 */
  updatedStart?: string;

  /** 最後更新時間：結束 */
  updatedEnd?: string;

  /** 風控查核 */
  riskCheck?: string;

  /** 三方金流群組id */
  payGroupID?: string;

  /** 銀行卡組別 */
  bankcardGroupID?: string;

  /** 出帳日期 */
  creditDate?: string;
}

/**
 * 鍵與值物件
 */
export interface KeyValueItem {
  /** 傳到後端的值 */
  key?: number;

  /** 前台要顯示的值 */
  value?: string;
}

/**
 * 鍵與值物件
 */
export interface MemberKeyValueItem {
  /** 傳到後端的值 */
  key?: number;

  /** 前台要顯示的值 */
  value?: {
    account: string;
    name: string;
  };
}

/**
 * 提款單陣列物件
 */
export interface WithdrawalItem {
  /** 提款單號 */
  transactionID?: string;

  /** 提款時間 */
  transactionTime?: string;

  /** 提款金額 */
  amount?: number;

  /** 預計出款 */
  payAmount?: number;

  /** 狀態 */
  status?: KeyValueItem;

  /** 銀行卡群組 */
  bankGroup?: KeyValueItem;

  /** 三方群組 */
  thirdGroup?: KeyValueItem;

  /** 會員帳號 */
  member?: MemberKeyValueItem;

  /** 戶名 */
  bankAccount?: string;

  /** 銀行 */
  bankCode?: string;

  /** 會員銀行卡號 */
  memberBankNo?: string;

  /** 財務查核 */
  financialCheck?: KeyValueItem;

  /** 風控查核 */
  riskCheck?: KeyValueItem;

  /** 最後更新時間 */
  lastUpdate?: string;

  /** 執行人 */
  updatedBy?: string;

  /** 出帳日期 */
  creditDate?: string;
}

/**
 * 提款管理：列表與篩選返回資料
 */
export interface GetWithdrawalResultModel {
  /** 提款列表清單 */
  list?: WithdrawalItem[];

  /** 總筆數 */
  count?: number;

  /** 訂單總金額 */
  amount?: number;

  /** 訂單總手續費 */
  fee?: number;
}

/**
 * 財務提單審核通過請求參數
 */
export interface PutFinancePassData {
  /** 訂單號碼 */
  orderSn?: string;

  /** 備註 */
  note?: string;
}

/**
 * 財務提單審核通過返回資料
 */
export interface PutFinancePassResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 財務提單審核通過並提交風控請求參數
 */
export interface PutFinanceSubmitRiskPassData {
  /** 訂單號碼 */
  orderSn?: string;

  /** 備註 */
  note?: string;
}

/**
 * 財務提單審核通過並提交風控返回資料
 */
export interface PutFinanceSubmitRiskResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 財務退回請求參數
 */
export interface PutFinanceRejectPassData {
  /** 訂單號碼 */
  orderSn?: string;

  /** 備註 */
  note?: string;
}

/**
 * 財務退回返回資料
 */
export interface PutFinanceRejectResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 風控審核請求參數
 */
export interface PutRiskCheckData {
  /** 訂單號碼 */
  orderSn?: string;

  /** 備註 */
  note?: string;

  /** 2:退回 3:通過 */
  status?: number;
}

/**
 * 風控審核返回資料
 */
export interface PutRiskCheckResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 手動出款資訊查詢參數
 */
export interface GetPayoutInfoParams {
  /** 提款單號 */
  orderSn?: string;
}

/**
 * 出款單物件
 */
export interface PayoutItem {
  /** 流水號 */
  id?: number;

  /** 提款金額 */
  amount?: number;

  /** 出款方式 */
  payType?: KeyValueItem;

  /** 商戶號或卡號 */
  payID?: KeyValueItem;

  /** 出款手續費 */
  fee?: number;

  /** 1出款中 2成功 3失敗 */
  status?: KeyValueItem;

  /** 三方單號 */
  thirdSn?: string;

  /** 執行人 */
  editorName?: string;

  /** 更新時間 */
  updatedAt?: string;
}

/**
 * 手動出款資訊返回資料
 */
export interface GetPayoutInfoResultModel {
  /** 提款單號 */
  orderSn?: string;

  /** 會員帳號 */
  account?: string;

  /** 出款總金額 */
  amount?: number;

  /** 已出款金額，包含已出款，出款中的金額，不包含失敗金額 */
  totalAmount?: number;

  /** 銀行卡號 */
  bankcard?: string;

  /** 銀行名 */
  bankName?: string;

  /** 戶名 */
  withdrawalName?: string;

  /** 出款單列表 */
  payouts?: PayoutItem[];
}

/**
 * 查看訂單紀錄查詢參數
 */
export interface GetWithdrawalNoteParams {
  /** id */
  id?: string;
}
GetStakeParams;
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
export interface GetWithdrawalNoteResultModel {
  list?: NoteItem[];
}

/**
 * 新增提款單備註請求參數
 */
export interface PostWithdrawalNoteData {
  /** id */
  id?: string;

  /** 紀錄 */
  note?: string;
}

/**
 * 新增提款單備註返回資料
 */
export interface PostWithdrawalNoteResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 查詢三方回調狀態請求參數
 */
export interface PostWithdrawalCallbackData {
  /** id */
  id?: string;
}

/**
 * 查詢三方回調狀態返回資料
 */
export interface PostWithdrawalCallbackResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 手動出款請求參數
 */
export interface PostWithdrawalPayData {
  /** 提款單序號 */
  orderSN?: string;

  /** 出款類型 1:銀行卡 2:商戶號 */
  type?: number;

  /** 出款類型 ID */
  id?: number;

  /** 出款金額 */
  amount?: number;

  /** 手續費 (銀行卡自填 三方等回調) */
  fee?: number;
}

/**
 * 手動出款返回資料
 */
export interface PostWithdrawalPayResultModel {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 出款方式陣列物件
 */
export interface WithdrawalMethodItem {
  /** id */
  id?: number;

  /** 名稱 or 卡號 */
  name?: string;

  /** 每筆上限 */
  limitUpper?: number;

  /** 每筆下限 */
  limitLower?: number;

  /** 每日上限 */
  dayUpper?: number;

  /** 目前餘額 */
  balance?: number;
}

/**
 * 可出款方式列表返回資料
 */
export interface GetWithdrawalListResultModel {
  list?: WithdrawalMethodItem[];
}

/**
 * 財務進入審核請求資訊
 */
export interface PostWithdrawalAuditData {
  /** id */
  id?: string;
}

/**
 * 財務進入審核返回資料
 */
export interface PostWithdrawalAuditResultModel {
  /** 是否取得審核頭香 true: 成功, false: 有其他人正在審核 */
  ok: boolean;

  /** 假如 ok = false, $acc 為正在審核人帳號 */
  acc: string;
}

/**
 * 出款面板陣列物件
 */
export interface PayoutNaviItem {
  /** id */
  id?: number;

  /** 排序 */
  sort?: number;

  /** 商戶名稱 */
  name?: string;

  /** 目前可代付餘額 */
  balance?: number;

  /** 是否為出款中 true:出款中 false:空閒 */
  paying?: boolean;

  /** 是否啟用快速出款 1:啟用 2:停用 */
  status?: number;
}

/**
 * 取得出款面板返回資料
 */
export interface GetPayoutNaviResultModel {
  list?: PayoutNaviItem[];
}

/**
 * 出款面板排序請求資訊
 */
export interface PutPayoutNaviSortData {
  /** id */
  id?: number;

  /** 排序 */
  sort?: number;
}

/**
 * 出款面板排序返回資料
 */
export interface PutPayoutNaviSortResultModel {
  /** 請求是不是成功 */
  success?: boolean;
}

/**
 * 出款面板狀態開關請求資訊
 */
export interface PutPayoutNaviStatusData {
  /** id */
  id?: number;

  /** 狀態 [1:啟用, 2:停用] */
  status?: number;
}

/**
 * 出款面板狀態開關返回資料
 */
export interface PutPayoutNaviStatusResultModel {
  /** 請求是不是成功 */
  success?: boolean;
}

/**
 * 快速出款請求資訊
 */
export interface PostPayoutQuickData {
  /** id */
  id?: string;
}

/**
 * 快速出款返回資料
 */
export interface PostPayoutQuickResultModel {
  /** 請求是不是成功 */
  success?: boolean;
}

/**
 * 取得審核詳細資料-會員提款查詢參數
 */
export interface GetMemberInfoParams {
  id?: string;
}

/**
 * 取得審核詳細資料-會員提款返回資料
 */
export interface GetMemberInfoRsultModel {
  /** 銀行卡金流組別 */
  bankcardGroup?: KeyValueItem;

  /** 三方金流組別 */
  payGroup?: KeyValueItem;

  /** VIP 等級 */
  vip?: number;

  /** 提款狀態 (true 綠勾勾) */
  withdrawalStatus?: boolean;

  /** 目前錢包 */
  money?: number;

  /** 凍結金額 */
  lockMoney?: number;

  /** 每日上限 */
  dayUpper?: number;

  /** 每日上限狀態 (true 綠勾勾) */
  dayUpperStatus?: boolean;

  /** 單筆下限 */
  limitLower?: number;

  /** 單筆上限 */
  limitUpper?: number;

  /** 單筆上下限狀態 (true 綠勾勾) */
  limitStatus?: boolean;

  /** 今日存款金額 */
  todayDepositAmount?: number;

  /** 今日提款金額 */
  todayWithdrawalAmount?: number;

  /** 今日存提差 */
  spread?: number;

  /** 流水區間開始時間 */
  turnoverDurationStart?: string;

  /** 流水區間結束時間 */
  turnoverDurationEnd?: string;
}

/**
 * 會員組別陣列物件
 */
export interface GroupItem {
  /** 群組ID */
  ID?: number;

  /** 群組類型[1三方2銀行卡] */
  type?: number;

  /** 中文名稱 */
  name?: string;

  /** 英文名稱 */
  nameEn?: string;

  /** 單筆下限 */
  depositLower?: number;

  /** 單筆上限 */
  depositUpper?: number;

  /** 備註 */
  remark?: string;

  /** 編輯權限 */
  editFlag?: number;

  /** 當前線路 */
  payChannelServiceName?: string;

  /** 代收線路數 */
  payChannelServiceCnt?: number;

  /** 會員人數 */
  memberCnt?: number;

  /** 更新者ID */
  updatedUser?: number;

  /** 更新者帳號 */
  updatedUserName?: string;

  /** 更新時間 */
  updatedAt?: string;
}

/**
 * 會員詳細資訊
 */
export interface MemberDetail {
  /** 帳號 */
  account?: string;

  /** ID */
  id?: number;

  /** 姓名 */
  name?: string;

  /** 電話 */
  phone?: string;

  /** 電話所在區域 */
  phoneArea?: string;

  /** email */
  email?: string;

  /** 地址 */
  address?: string;

  /** ip */
  ip?: string;

  /** ip所在地區 */
  ipArea?: string;

  /** 狀態 */
  status?: number;

  /** 存款狀態 */
  depositLimit?: number;

  /** 提款狀態 */
  withdrawLimit?: number;

  /** 銀行卡歸屬地 */
  bankcardArea?: string;

  /** 線上狀態 */
  currentStatus?: Boolean;

  /** 支付群組 */
  paymentGroups?: GroupItem;

  /** 銀行卡群組 */
  bankcardGroups?: GroupItem;
}

/**
 * 會員錢包資訊
 */
export interface MemberMoney {
  /** 錢包總額 */
  totalMoney?: number;

  /** 錢包鎖定 */
  totalLock?: number;

  /** 總存款 */
  totalDeposit?: number;

  /** 總提款 */
  totalWithdraw?: number;

  /** 總輸贏 */
  totalWin?: number;

  /** 總紅利 */
  totalBonus?: number;

  /** 總流水 */
  totalRate?: number;

  /** 總返水 */
  totalRefound?: number;
}

/**
 * 查看訂單紀錄查詢參數
 */
export interface GetStakeParams {
  /** id */
  id?: number;
  /** 開始時間 */
  startTime?: string;
  /** 結束時間 */
  endTime?: string;
}
