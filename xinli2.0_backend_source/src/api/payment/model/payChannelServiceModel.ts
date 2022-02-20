/** pay_channel_service線路API */

export interface BaseResponse<T> {
  list: T;
}

/**
 * 線路管理（代收）:新增線路API
 */
export interface CreateServiceParams {
  /** type 2 新增為銀行卡組別 */
  type?: string;
  /** 線路名稱 */
  name?: string;
  /** 商戶id */
  payChannelID?: number;
  /** 支援裝置 */
  device?: number;
  /** 支付方式 */
  serviceCode?: string;
  /** 備註 */
  note?: string;
  /** 單筆上限 */
  upperLimit?: number;
  /** 單筆下限 */
  lowerLimit?: number;
  /** 每日限額 */
  dayLimit?: number;
  /** 每千手續費 */
  fee?: number;
  /** 每筆手續費 */
  perFee?: number;
}
export interface CreateServiceResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 線路管理（代收）:線路列表API
 */
export interface GetServiceParams {
  /** 線路名稱 */
  name?: string;
  /** 狀態 0: 全部，啟用狀態 1: 啟用，2: 關閉 */
  status?: number;
  /** 支付方式 */
  serviceCode?: string;
  /** 金流組別 */
  groupID?: number;
  /** 商戶與商戶號都帶商戶ID */
  payChannelID?: number;
  /** 結算方式 */
  type?: number;
  /** 銀行卡金流組別 */
  bankGroupID?: number;
  /** 三方金流組別 */
  thirdGroupID?: number;
  /** 商戶號 */
  payChannelNameID?: number;
  /** 結算方式 */
  method?: number;
  /** 第幾頁 */
  page?: number;
  /** 每頁筆數 */
  pageSize?: number;
}
export interface GetServiceResponse {
  /** 類型[1三方2銀行卡] */
  type?: number | string;
  /** 線路ＩＤ */
  id?: number;
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
  /** 單筆限額 */
  limit?: string;
  /** 代收手續費 */
  fee?: string;
  /** 狀態 0: 全部，啟用狀態 1: 啟用，2: 關閉 */
  status?: string;
  /** 備註 */
  note?: string;
}

/**
 * 線路管理（代收）:查看列表API
 */
export interface GetServiceByIdParams {
  /** 線路ＩＤ */
  id: number;
  /** 類型[1三方2銀行卡] */
  type?: number | string;
}
export interface GetServiceByIdResponse {
  /** 類型[1三方2銀行卡] */
  type?: number | string;
  /** 線路ＩＤ */
  id?: number;
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
  /** 單筆限額 */
  limit?: string;
  /** 代收手續費 */
  fee?: number;
  /** 狀態 */
  status?: string;
  /** 備註 */
  note?: string;
  /** 每筆手續費 */
  perFee?: number;
  /** 單筆上限 */
  upperLimit?: number;
  /** 單筆下限 */
  lowerLimit?: number;
  /** 結帳方式 */
  method?: number;
  /** 支付方式 */
  serviceCode?: string;
  /** 商戶id */
  payChannelID?: number;
}

/**
 * 線路管理（代收）:編輯列表API
 */
export interface PutEditServiceParams {
  /** 線路ID */
  id?: string;
  /** 狀態 */
  status?: string;
  /** 線路名稱 */
  name?: string;
  /** 商戶id */
  payChannelID?: number;
  /** 支援裝置 */
  device?: number;
  /** 支付方式 */
  serviceCode?: string;
  /** 備註 */
  note?: string;
  /** 單筆上限 */
  upperLimit?: number;
  /** 單筆下限 */
  lowerLimit?: number;
  /** 每日限額 */
  dayLimit?: number;
  /** 每千手續費 */
  fee?: number;
  /** 每筆手續費 */
  perFee?: number;
  //
  method?: number;
}
export interface PutEditServiceResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 取得搜尋下拉清單
 */
export interface DropdownItem {
  /** 傳到後端的值 */
  key: unknown;
  value: unknown;
}
export interface GetServiceDropdownResponse {
  /** 线路名称下拉清單 */
  groups: DropdownItem[];
  /** 线路状态下拉清單 */
  status: DropdownItem[];
  /** 支付方式下拉清單 */
  serviceCode: DropdownItem[];
  /** 結算方式下拉清單 */
  method: DropdownItem[];
}

/**
 * 取得搜尋共用下拉清單
 */
export interface GetChannelDropdownResponse {
  /** 商戶 */
  payChannelName: DropdownItem[];
  /** 商戶號 */
  payChannel: DropdownItem[];
  /** 線路 */
  payChannelService: DropdownItem[];
  /** 銀行卡金流組別 */
  bankGroups: DropdownItem[];
  /** 三方金流組別 */
  thirdGroups: DropdownItem[];
  /** 状态下拉清单 */
  status: DropdownItem[];
  /** 支付方式下拉清单 */
  serviceCode: DropdownItem[];
  /** 结算方式下拉清单 */
  method: DropdownItem[];
  /** 群组下拉清单 */
  groups: DropdownItem[];
  /** 卡片用途下拉清单 */
  type: DropdownItem[];
  /** 性别下拉清单 */
  gender: DropdownItem[];
  /** 银行下拉清单 */
  banks: DropdownItem[];
  /** 开户省市下拉清单 */
  city: DropdownItem[];

  subjects: DropdownItem[];
}

/**
 * 取得不包含指定線路的群組
 */
export interface GetGroupsExcludeParams {
  /** 線路ＩＤ */
  id: number | string;
  /** 類型[1三方2銀行卡] */
  type: number | string;
}
export interface ExcludeItem {
  key: unknown;
  value: unknown;
}
export interface GetGroupsExcludeResponse {
  groups: ExcludeItem[];
}

/**
 * 將線路儲存到指定的金流群組
 */
export interface PutEditServiceGroupsParams {
  /** 當前線路的id */
  id: number;
  /** 金流群組ids */
  ids: number[];
}
export interface PutEditServicegGroupsResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 將線路重新排序
 */
export interface PutEditServiceSortParams {
  /** 線路ＩＤ */
  id?: number;
  /** 重新排序後的位置，由 0 開始計算，例如：重新排序後的位置是第三，則帶 2 */
  sort?: number;
}
export interface PutEditServiceSortResponse {
  /** 請求是不是成功 */
  success: boolean;
}
