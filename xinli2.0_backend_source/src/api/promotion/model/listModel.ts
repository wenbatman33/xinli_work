export interface BaseResponse<T> {
  list: T;
}
export interface DropdownItem {
  key: string;
  value: string;
}
export interface GetPromotionDropdownResponse {
  /* 週期類型下拉清單 */
  cycleType: DropdownItem[];
  /* 參加/審核/領取方式下拉清單 */
  way: DropdownItem[];
  /* 審核週期下拉清單 */
  approveCycle: DropdownItem[];
  /* 優惠類型下拉清單 */
  promotionLaunchedType: DropdownItem[];
  /* 排序條件下拉清單 */
  orderBy: DropdownItem[];
  /* 置頂下拉清單 */
  top: DropdownItem[];
  /* 是否顯示下拉清單 */
  display: DropdownItem[];
  /* 狀態下拉清單 */
  status: DropdownItem[];
  /* 裝置下拉清單 */
  device: DropdownItem[];
  /* 開啟方式下拉清單 */
  openWay: DropdownItem[];
  /* 優惠模板類型下拉清單 */
  promotionCondType: DropdownItem[];
  /* 優惠狀態下拉清單 */
  promotionStatus: DropdownItem[];  
}
export interface GetPromotionListParams {
  /* ID */
  ID: string | number;
  /* 名稱 */
  name?: string;
  /* 下架時間 */
  startTime?: string;
  /* 下架時間 */
  endTime?: string;
  /* 優惠模板類型 */
  promotionCondType?: number;
  /* 狀態 */
  status?: number;
  /* 排序條件 */
  orderBy?: number;
  /* 第幾頁 */
  page?: number;
  /* 每頁筆數 */
  pageSize?: number;
}
export interface CreatePromotionParams {
  /* 名稱 */
  name: string;
  /* 活動時間 */
  startTime: string;
  /* 活動時間 */
  endTime: string;
  /* 週期類型[1無限制2天3週4月] */
  cycleType: number;
  /* 週期指定範圍 */
  cycleRange: string[];
  /* 可參加次數 */
  applyTimes: number;
  /* 提領流水倍數 */
  withdrawTimes: number;
  /* 單次回饋上限 */
  maxBonus: number;
  /* 週期回饋上限 */
  cycleMaxBonus: number;
  /* 狀態[1開2關] */
  status: number;
  /* 參加方式[1自動2自助] */
  applyWay: number;
  /* 審核方式[1自動2自助] */
  approveWay: number;
  /* 審核週期[1當期2前期] */
  approveCycle: number;
  /* 領取方式[1自動2自助] */
  receiveWay: number;
  /* 領取時限 */
  receiveTime?: string;
  /* 排除優惠 */
  excludePromotion?: number[];
  /* 排除會員標籤 */
  excludeMemberTag?: number[];
  /* 允許會員標籤 */
  allowMemberTag?: number[];
  /* 允許會員ID */
  allowMemberID?: number[];
  /* 允許的VIP */
  allowVip?: string;
  /* 允許的代理下線會員(輸入代理) */
  allowAgencyMember?: number[];
  /* 說明 */
  description?: string;
  /* 存款支付方式(pay_channel_service/dropdown:serviceCode) */
  depositServiceCode: string[];
  /* 註冊允許平台[1:WebPC,2:MobileWeb,3:AndroidPWA,4:iOSPWA] */
  platformRegister?: number[];
  /* 登入允許平台[1:WebPC,2:MobileWeb,3:AndroidPWA,4:iOSPWA] */
  platformLogin?: number[];
}
export interface CreatePromotionResponse {
  /** 請求是不是成功 */
  success: boolean;
}

export interface DeletePromotionParams {
  /* ID */
  ID: string | number;
}
export interface DeletePromotionResponse {
  /** 請求是不是成功 */
  success: boolean;
}

export interface GetPromotioParams {
  /* ID */
  ID: string | number;
}
export interface GetPromotioResponse {
  /* ID */
  ID: number;
  /* 名稱 */
  name: string;
  /* 活動時間開始 */
  startTime: string;
  /* 活動時間結束 */
  endTime: string;
  /* 週期類型[1無限制2天3週4月] */
  cycleType: number;
  /* 週期指定範圍 */
  cycleRange: string[];
  /* 可參加次數 */
  applyTimes: number;
  /* 提領流水倍數 */
  withdrawTimes: number;
  /* 單次回饋上限 */
  maxBonus: number;
  /* 週期回饋上限 */
  cycleMaxBonus: number;
  /* 狀態[1開2關] */
  status: number;
  /* 參加方式[1自動2自助] */
  applyWay: number;
  /* 審核方式[1自動2自助] */
  approveWay: number;
  /* 審核週期[1當期2前期] */
  approveCycle: number;
  /* 領取方式[1自動2自助] */
  receiveWay: number;
  /* 領取時限 */
  receiveTime: string;
  /* 排除優惠 */
  excludePromotion: number[];
  /* 排除會員標籤 */
  excludeMemberTag: number[];
  /* 允許會員標籤 */
  allowMemberTag: number[];
  /* 允許會員ID */
  allowMemberID: number[];
  /* 允許的VIP */
  allowVip: string;
  /* 允許的代理下線會員(輸入代理) */
  allowAgencyMember: number[];
  /* 說明 */
  description: string;
  /* 執行人 */
  updatedUser: string;
  /* 更新時間 */
  updatedAt: string;
  /* 優惠模板類型 */
  promotionCondTypes: string[];
}
export interface PutPromotionParams {
  /* ID */
  ID: number;
  /* 名稱 */
  name: string;
  /* 活動時間 */
  startTime: string;
  /* 活動時間 */
  endTime: string;
  /* 週期類型[1無限制2天3週4月] */
  cycleType: number;
  /* 週期指定範圍 */
  cycleRange: string[];
  /* 可參加次數 */
  applyTimes: number;
  /* 提領流水倍數 */
  withdrawTimes: number;
  /* 單次回饋上限 */
  maxBonus: number;
  /* 週期回饋上限 */
  cycleMaxBonus: number;
  /* 狀態[1開2關] */
  status: number;
  /* 參加方式[1自動2自助] */
  applyWay: number;
  /* 審核方式[1自動2自助] */
  approveWay: number;
  /* 審核週期[1當期2前期] */
  approveCycle: number;
  /* 領取方式[1自動2自助] */
  receiveWay: number;
  /* 領取時限 */
  receiveTime: string;
  /* 排除優惠 */
  excludePromotion: number[];
  /* 排除會員標籤 */
  excludeMemberTag: number[];
  /* 允許會員標籤 */
  allowMemberTag: number[];
  /* 允許會員ID */
  allowMemberID: number[];
  /* 允許的VIP */
  allowVip: string;
  /* 允許的代理下線會員(輸入代理) */
  allowAgencyMember: number[];
  /* 說明 */
  description: string;
}
export interface PutPromotionResponse {
  /** 請求是不是成功 */
  success: boolean;
}
export interface GetPromotionListResponse {
  /* ID */
  ID: number;
  /* 名稱 */
  name: string;
  /* 活動時間開始 */
  startTime: string;
  /* 活動時間結束 */
  endTime: string;
  /* 週期類型[1無限制2天3週4月] */
  cycleType: number;
  /* 週期指定範圍 */
  cycleRange: string[];
  /* 可參加次數 */
  applyTimes: number;
  /* 提領流水倍數 */
  withdrawTimes: number;
  /* 單次回饋上限 */
  maxBonus: number;
  /* 週期回饋上限 */
  cycleMaxBonus: number;
  /* 狀態[1開2關] */
  status: number;
  /* 參加方式[1自動2自助] */
  applyWay: number;
  /* 審核方式[1自動2自助] */
  approveWay: number;
  /* 審核週期[1當期2前期] */
  approveCycle: number;
  /* 領取方式[1自動2自助] */
  receiveWay: number;
  /* 領取時限 */
  receiveTime: string;
  /* 排除優惠 */
  excludePromotion: number[];
  /* 排除會員標籤 */
  excludeMemberTag: number[];
  /* 允許會員標籤 */
  allowMemberTag: number[];
  /* 允許會員ID */
  allowMemberID: number[];
  /* 允許的VIP */
  allowVip: number[];
  /* 允許的代理下線會員 */
  allowAgencyMember: number[];
  /* 說明 */
  description: string;
  /* 執行人 */
  updatedUser: string;
  /* 更新時間 */
  updatedAt: string;
  /* 優惠模板類型 */
  promotionCondTypes: string[];
}

export interface CreatePromotionCondParams {
  /* 優惠ID */
  promotionID: number;
  /* 優惠模板[1存款,2投注,3流水] */
  type: number;
  /* 允許的遊戲類型 */
  gameTypeID: number;
  /* 允許的遊戲ID */
  gameListID: number;
  /* 區間 */
  rangeMin: string;
  /* 區間 */
  rangeMax: string;
  /* 回饋類型[1比例2區間隨機] */
  bonusType: number;
  /* 回饋(區間隨機) */
  bonus: number[];
  
  orderNo?: number;
  /* 審核標的，為申請前最後一次執行的行為[1是2否] */
  beforeApply?: number;
}
export interface CreatePromotionCondResponse {
  /** 請求是不是成功 */
  success: boolean;
}

export interface GetPromotionCondParams {
  ID: number;
}
export interface GetPromotionCondResponse {
  ID: number;
  /* 優惠ID */
  promotionID: number;
  /* 優惠模板[1存款,2投注,3流水] */
  type: number;
  /* 允許的遊戲類型 */
  gameTypeID: number;
  /* 允許的遊戲ID */
  gameListID: number;
  /* 區間 */
  rangeMin: string;
  /* 區間 */
  rangeMax: string;
  /* 回饋類型[1比例2區間隨機] */
  bonusType: number;
  /* 回饋 */
  bonus: number[];
}

export interface PutPromotionCondParams {
  ID: number;
  /* 優惠ID */
  promotionID: number;
  /* 優惠模板[1存款,2投注,3流水] */
  type: number;
  /* 允許的遊戲類型 */
  gameTypeID: number;
  /* 允許的遊戲ID */
  gameListID: number;
  /* 區間 */
  rangeMin: string;
  /* 區間 */
  rangeMax: string;
  /* 回饋類型[1比例2區間隨機] */
  bonusType: number;
  /* 回饋 */
  bonus: number[];
}
export interface PutPromotionCondResponse {
  /** 請求是不是成功 */
  success: boolean;
}

export interface GetPromotionCondListParams {
  promotionID: number;
}

export interface GetPromotionCondListResponse {
  ID: number;
  /* 優惠ID */
  promotionID: number;
  /* 優惠模板[1存款,2投注,3流水] */
  type: number;
  /* 允許的遊戲類型 */
  gameTypeID: number;
  /* 允許的遊戲ID */
  gameListID: number;
  /* 區間 */
  rangeMin: string;
  /* 區間 */
  rangeMax: string;
  /* 回饋類型[1比例2區間隨機] */
  bonusType: number;
  /* 回饋 */
  bonus: number[];
}

export interface GetPromotionCondListResponse {
  list: GetPromotionCondListResponse[];
}

export interface GetPromotionExcludeParams {
  ID: number | undefined;
}

export interface GetPromotionExcludeData {
  /* ID */
  ID: number;
  /* 名稱 */
  name: string;
  /* 活動時間開始 */
  startTime: string;
  /* 活動時間結束 */
  endTime: string;
  /* 週期類型[1無限制2天3週4月] */
  cycleType: number;
  /* 週期指定範圍 */
  cycleRange: string[];
  /* 可參加次數 */
  applyTimes: number;
  /* 提領流水倍數 */
  withdrawTimes: number;
  /* 單次回饋上限 */
  maxBonus: number;
  /* 週期回饋上限 */
  cycleMaxBonus: number;
  /* 狀態[1開2關] */
  status: number;
  /* 參加方式[1自動2自助] */
  applyWay: number;
  /* 審核方式[1自動2自助] */
  approveWay: number;
  /* 審核週期[1當期2前期] */
  approveCycle: number;
  /* 領取方式[1自動2自助] */
  receiveWay: number;
  /* 領取時限 */
  receiveTime: string;
  /* 排除優惠 */
  excludePromotion: number[];
  /* 排除會員標籤 */
  excludeMemberTag: number[];
  /* 允許會員標籤 */
  allowMemberTag: number[];
  /* 允許會員ID */
  allowMemberID: number[];
  /* 允許的VIP */
  allowVip: string;
  /* 允許的代理下線會員(輸入代理) */
  allowAgencyMember: number[];
  /* 說明 */
  description: string;
  /* 執行人 */
  updatedUser: string;
  /* 更新時間 */
  updatedAt: string;
  /* 優惠模板類型 */
  promotionCondTypes: string[];
}

export interface GetPromotionExcludeResponse {
  list: GetPromotionExcludeData[];
}
export interface DeletePromotionCondParams {
  ID: number;
}

export interface DeletePromotionCondResponse {
  /** 請求是不是成功 */
  success: boolean;
}
export interface DeletePromotionCondCondsParams {
  promotionID: number;
  type: number;
}

export interface DeletePromotionCondCondsResponse {
  /** 請求是不是成功 */
  success: boolean;
}
