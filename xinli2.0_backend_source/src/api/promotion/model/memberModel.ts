export interface BaseResponse<T> {
  list: T;
}

export interface GetPromotionmMemberParams {
  /* 優惠流水號 */
  promotionID: number;
  /* 優惠名稱 */
  promotionName: string;
  /* 批次流水號 */
  batchID: number;
  /* 會員ID */
  memberID: number;
  /* 會員帳號 */
  memberAccount: string;
  /* 狀態 */
  status: number;
  /* 派發時間開始 */
  sendAtStart: string;
  /* 派發時間結束 */
  sendAtEnd: string;
  /* 審核方式 */
  approveWay: number;
  /* 領取方式 */
  receiveWay: number;
  /* 第幾頁 */
  page: number;
  /* 每頁筆數 */
  pageSize: number;
}
export interface GetPromotionmMemberData {
  ID: number;
  batchID: number;
  promotionID: number;
  promotionName: string;
  batchCycle: string;
  approveWay: number;
  totalAmount: number;
  memberNumber: number;
  memberFailNumber: number;
  sendAt: string;
  updatedUser: string;
}
export interface GetPromotionmMemberResponse {
  list: GetPromotionmMemberData[];
  avgAmount: string;
  count: number;
  maxAmount: string;
  memberNumber: number;
  totalAmount: string;
}

export interface GetPromotionmMemberListParams {
  /* 優惠流水號 */
  promotionID: number;
  /* 優惠名稱 */
  promotionName: string;
  /* 批次流水號 */
  batchID: number;
  /* 會員ID */
  memberID: number;
  /* 會員帳號 */
  memberAccount: string;
  /* 狀態 */
  status: number;
  /* 派發時間開始 */
  sendAtStart: string;
  /* 派發時間結束 */
  sendAtEnd: string;
  /* 審核方式 */
  approveWay: number;
  /* 領取方式 */
  receiveWay: number;
  /* 第幾頁 */
  page: number;
  /* 每頁筆數 */
  pageSize: number;
}
export interface GetPromotionmMemberListResponse {
  ID: number;
  memberAccount: string;
  bonus: number;
  status: number;
  sendAt: string;
  promotionName: string;
  promotionID: number;
  promotionCondTypes: number[];
  batchID: number;
  batchCycle: string;
  updatedAt: string;
  updatedUser: string;
  statusAction: string[];
}
export interface GetPromotionmMemberWithdrawParams {
  memberID: number;
  startTime: string;
  endTime: string;
  promotionCondType?: number;
  status?: number;
}

export interface promotionList {
  promotionID: number;
  promotionName: string;
}
export interface GetPromotionmMemberWithdrawResponse {
  list: promotionList[];
}