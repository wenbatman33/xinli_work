/** 金流組別（三方) */
export interface BaseResponse<T> {
  list: T;
}

/**
 * 金流組別（三方）：新增金流組別API
 */
export interface PostPayGroupParams {
  /** 群組類型 */
  type: number;
  /** 群組中文名稱 */
  name: string;
  /** 群組英文名稱 */
  nameEn: string;
  /** 單筆下限 */
  depositLower: number;
  /** 單筆上限 */
  depositUpper: number;
  /** 備註 */
  remark: string;
}
export interface PostPayGroupResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 金流組別（三方）：取得單一組別
 */
export interface GetPayGroupParams {
  ID: number;
}
export interface GetPayGroupResponse {
  type?: number;
  /** 群組ID */
  ID?: number;
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
 * 金流組別（三方）：修改金流組別API
 */
export interface PutPayGroupParams {
  /** 修改當前ID */
  ID: number;
  /** 群組中文名稱 */
  name: string;
  /** 群組英文名稱 */
  nameEn?: string;
  /** 單筆下限 */
  depositLower: number;
  /** 單筆上限 */
  depositUpper: number;
  /** 備註 */
  remark?: string;
}
export interface PutPayGroupResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 金流組別（三方）:金流組別列表API
 */
export interface GetPayGroupsParams {
  /** 類型[1三方2銀行卡] */
  type: number | string;
  /** 名稱 */
  name?: string;
}
export interface GetPayGroupsResponse {
  /** 群組ID */
  ID?: number;
  /** 中文名稱 */
  name?: string;
  /** 群組英文名稱 */
  nameEn?: string;
  /** 單筆下限 */
  depositLower?: number;
  /** 單筆上限 */
  depositUpper?: number;
  /** 備註 */
  remark?: string;
  /** /** 編輯權限 */
  editFlag?: number;
  /** 代收線路數 */
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
 * 金流組別（三方）：加入玩家(會員需已填寫手機+不可填寫錯誤帳號(待會員dc處理)
 */
export interface PostPayGroupMemberParams {
  /** 群組ID */
  payGroupID: number;
  /** 玩家帳號 */
  memberAccounts: string;
}
export interface PostPayGroupMemberResponse {
  /** 請求是不是成功 */
  success: boolean;
}
