/** pay_bank_card 銀行卡API */
export interface BaseResponse<T> {
  list: Array<T>;
}

/**
 * 銀行卡管理：新增銀行卡API
 */
export interface CreateBankCardParams {
  /** 銀行卡號 */
  cardNo: number;
  /** 銀行ID */
  payBankID: number;
  /** 戶名 */
  accountName: string;
  /** 用途[1出款2結算3中轉4倉庫] */
  type: number;
  /** 每日上限 */
  dayUpper?: number;
  /** 單筆下限 */
  limitLower?: number;
  /** 單筆上限 */
  limitUpper?: number;
  /** 初始金額 */
  originalAmount?: number;
  /** 卡商 */
  broker?: string;
  /** 開戶省(中文) */
  province?: string;
  /** 開戶城市(中文) */
  city?: string;
  /** 開戶分行 */
  branch?: string;
  /** 狀態[1啟用2停用] */
  status: number;
  /** 備註 */
  note?: string;
  /** 網銀帳號 */
  bankAccount?: string;
  /** 原始登入密碼 */
  oriLoginPw?: string;
  /** 原始U盾密碼 */
  oriUPw?: string;
  /** 原始取款密碼 */
  oriWithdrawalPw?: string;
  /** 網銀登入密碼 */
  loginPw?: string;
  /** 網銀U盾密碼 */
  uPw?: string;
  /** 網銀取款密碼 */
  withdrawalPw?: string;
  /** 開戶人身份證件號 */
  identity?: string;
  /** 性別[1女2男] */
  gender?: number;
  /** 驗卡日期 */
  verifyDates: string;
  /** 對應手機號 */
  phone?: number;
}
export interface CreateBankCardResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 銀行卡管理：查看銀行卡資料API by ID
 */
export interface GetBankCardParams {
  /** ID */
  ID: number;
}
export interface GetBankCardResponse {
  /** ID */
  ID: number;
  /** 卡號 */
  cardNo: number;
  /** 銀行名稱 */
  bankName: string;
  /** 銀行代號 */
  bankCode: string;
  /** 戶名 */
  accountName: string;
  /** 用途 */
  type: number;
  /** 每日上限 */
  dayUpper: number;
  /** 今日進 */
  dayIn: number;
  /** 今日出 */
  dayOut: number;
  /** 帳戶餘額 */
  balance: number;
  /** 單筆下限 */
  limitLower: number;
  /** 單筆上限 */
  limitUpper: number;
  /** 初始金額 */
  originalAmount: number;
  /** 卡商 */
  broker: string;
  /** 開戶省 */
  province: string;
  /** 開戶城市 */
  city: string;
  /** 開戶分行 */
  branch: string;
  /** 狀態 */
  status: string;
  /** 備註 */
  note: string;
  /** 網銀帳號 */
  bankAccount: string;
  /** 原始登入密碼 */
  oriLoginPw: string;
  /** 原始U盾密碼 */
  oriUPw: string;
  /** 原始取款密碼 */
  oriWithdrawalPw: string;
  /** 網銀登入密碼 */
  loginPw: string;
  /** 網銀U盾密碼 */
  uPw: string;
  /** 網銀取款密碼 */
  withdrawalPw: string;
  /** 開戶人身分證號 */
  identity: string;
  /** 性別 */
  gender: string;
  /** 驗卡日期 */
  verify_date: string;
  /** 對應手機號 */
  phone: number;
  /** 更新時間 */
  updatedAt: string;
}

/**
 * 銀行卡管理：修改銀行卡API
 */
export interface PutBankCardParams {
  /** ID */
  ID?: number;
  /** 銀行卡號 */
  cardNo?: number;
  /** 銀行ID */
  payBankID?: number;
  /** 戶名 */
  accountName?: string;
  /** 用途[1出款2結算3中轉4倉庫] */
  type?: number;
  /** 每日上限 */
  dayUpper?: number;
  /** 單筆下限 */
  limitLower?: number;
  /** 單筆上限 */
  limitUpper?: number;
  /** 卡商 */
  broker?: string;
  /** 開戶省(中文) */
  province?: string;
  /** 開戶城市(中文) */
  city?: string;
  /** 開戶分行 */
  branch?: string;
  /** 狀態[1啟用2停用] */
  status?: number;
  /** 備註 */
  note?: string;
  /** 網銀帳號 */
  bankAccount?: string;
  /** 原始登入密碼 */
  oriLoginPw?: string;
  /** 原始U盾密碼 */
  oriUPw?: string;
  /** 原始取款密碼 */
  oriWithdrawalPw?: string;
  /** 網銀登入密碼 */
  loginPw?: string;
  /** 網銀U盾密碼 */
  uPw?: string;
  /** 網銀取款密碼 */
  withdrawalPw?: string;
  /** 開戶人身份證件號 */
  identity?: string;
  /** 性別[1女2男] */
  gender?: number;
  /** 驗卡日期 */
  verifyDate?: string;
  /** 對應手機號 */
  phone?: number;
}

export interface PutBankCardResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 城市列表
 */
export interface CityItem {
  id: string;
  name: string;
}
/**
 * 省市列表
 */
export interface ProvinceList {
  province?: string;
  province_id?: string;
  city: CityItem[];
}

/**
 * 銀行卡管理：下拉選單
 */
export interface CityList {
  id?: string;
  name?: string;
  province?: string;
  province_id?: string;
}

export interface BankList {
  id: string;
  bankCode: string;
  bankName: string;
}
export interface DropdownItem {
  label: string;
  value: unknown;
  key: unknown;
}
export interface GetBankCardDropdownResponse {
  /** 狀態下拉清單 */
  status: DropdownItem[];
  /** 卡片用途下拉清單 */
  type: DropdownItem[];
  /** 性別下拉清單 */
  gender: DropdownItem[];
  /** 銀行下拉清單 */
  banks: BankList[];
  /** 開戶省市下拉清單 */
  city: CityList[];
}

/**
 * 銀行卡管理：新增銀行卡 篩選列表 API
 */

export interface GetBankCardsParams {
  /** 線路名稱 */
  cardNo?: string;
  /** 狀態[1啟用2停用] */
  status?: number;
  /** 用途[1出款2結算3中轉4倉庫] */
  type?: number;
  /** 戶名 */
  accountName?: number;
  /** 銀行ID; */
  payBankID?: number;
  /** 頁號 */
  page?: number;
  /** 每頁容量; */
  pageSize?: number;
}

export interface GetBankCardsResponse {
  value?: number;
  /** 銀行ID; */
  payBankID?: number;
  /** ID */
  ID?: number;
  /** 卡號 */
  cardNo?: number;
  /** 銀行名稱 */
  bankName?: string;
  /** 銀行代號 */
  bankCode?: string;
  /** 戶名 */
  accountName?: string;
  /** 用途 */
  type?: number;
  /** 每日上限 */
  dayUpper?: number;
  /** 今日進 */
  dayIn?: number;
  /** 今日出 */
  dayOut?: number;
  /** 帳戶餘額 */
  balance?: number;
  /** 單筆下限 */
  limitLower?: number;
  /** 單筆上限 */
  limitUpper?: number;
  /** 初始金額 */
  originalAmount?: number;
  /** 卡商 */
  broker?: string;
  /** 開戶省 */
  province?: string;
  /** 開戶城市 */
  city?: string;
  /** 開戶分行 */
  branch?: string;
  /** 狀態 */
  status?: string;
  /** 備註 */
  note?: string;
  /** 網銀帳號 */
  bankAccount?: string;
  /** 原始登入密碼 */
  oriLoginPw?: string;
  /** 原始U盾密碼 */
  oriUPw?: string;
  /** 原始取款密碼 */
  oriWithdrawalPw?: string;
  /** 網銀登入密碼 */
  loginPw?: string;
  /** 網銀U盾密碼 */
  uPw?: string;
  /** 網銀取款密碼 */
  withdrawalPw?: string;
  /** 開戶人身分證號 */
  identity?: string;
  /** 性別 */
  gender?: string;
  /** 驗卡日期 */
  verify_date?: string;
  /** 對應手機號 */
  phone?: number;
  /** 更新時間 */
  updatedAt?: string;
}

/**
 * 銀行卡管理：轉帳
 */

export interface TransferBankCardsParams {
  /** 銀行卡ID */
  bankcardID: number;
  /** 目標銀行卡號 */
  cardNo: number;
  /** 金額  */
  amount: number;
  /**  手續費 */
  fee: number;
  /** 入帳時間  */
  logTime: string;
  /**  備註 */
  note?: string;
}

export interface TransferBankCardsResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 銀行卡管理：凍結
 */
export interface LockBankCardsParams {
  /** 銀行卡ID */
  bankcardID?: number;
  /** 金額  */
  amount?: number;
  /**  備註 */
  note?: string;
}

export interface LockBankCardsResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 銀行卡管理：解除凍結
 */
export interface UnlockBankCardsParams {
  /** 銀行卡ID */
  bankcardID?: number;
  /** 金額  */
  amount?: number;
  /**  備註 */
  note?: string;
}

export interface UnlockBankCardsResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 銀行卡管理：解除凍結
 */
export interface GetBankCardsLogParams {
  /**  交易時間開始 */
  logTimeStart?: string;
  /**  交易時間結束 */
  logTimeEnd?: string;
  /**  銀行卡號 */
  cardNo?: number | string;
  /**  排序[1倒序2正序] */
  orderBy?: number;
  /**  第幾頁 */
  page?: number;
  /**  每頁筆數 */
  pageSize?: number;
}

export interface BankCardsLogList {
  /**  ID */
  ID: number;
  /**  交易時間 */
  logTime: string;
  /**  銀行卡ID */
  bankcardID: number;
  /**  科目ID */
  subjectID: number;
  /**  收支類型[1收2支] */
  type: number;
  /**  金額 */
  amount: number;
  /**  手續費 */
  fee: number;
  /**  結餘 */
  balance: number;
  /**  相關單號 */
  tradeID: number;
  /**  三方單號 */
  thirdParty: string;
  /**  交易對象類型 */
  tradeObjectType: number;
  /**  交易對象 */
  tradeObject: string;
  /**  備註 */
  note: string;
  /**  執行人 */
  updatedUser: string;
  /**  更新時間 */
  updatedAt: string;
}
export interface GetBankCardsLogResponse {
  list: BankCardsLogList[];
  /* 總筆數 */
  count: number;
  /* 收入筆數 */
  countIn: number;
  /* 支出筆數 */
  countOut: number;
}

export interface GetBankCardsLogNoteParams {
  /* 銀行卡明細ID */
  bankcardLogID: number;
  /* 備註 */
  note: string;
}
export interface GetBankCardsLogNoteResponse {
  /** 請求是不是成功 */
  success: boolean;
}
