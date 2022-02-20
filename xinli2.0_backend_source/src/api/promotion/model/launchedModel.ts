export interface BaseResponse<T> {
  list: T;
}
/**
 * 優惠：新增優惠上架API
 */
export interface CreateLaunchedParams {
  /* 名稱 */
  name: string;
  /* 類型 */
  type: number[];
  /* 內容 */
  content?: string;
  /* 裝置 */
  device: number[];
  /* 排序 */
  orderNo?: number;
  /* 置頂 */
  top?: number;
  /* 顯示 */
  display?: number;
  /* 上架時間 */
  startTime: string;
  /* 下架時間 */
  endTime?: string;
  /* 圖片WEB */
  imageWeb?: string;
  /* 圖片h5 */
  imageH5?: string;
  /* 開啟方式 */
  openWay: number;
  /* 網址 */
  openLink?: string;
  /* 關聯優惠 */
  promotions: number[];
}

export interface UpdateLaunchedParams extends CreateLaunchedParams {
  ID: number,
}

export interface CreateLaunchedResponse {
  /* 請求是不是成功 */
  success: boolean;
}

export interface GetLaunchedParams {
  /* ID */
  ID: string | number;
}

export interface GetLaunchedResponse {
  /* ID */
  ID: number;
  /* 名稱 */
  name: string;
  /* 類型 */
  type: string;
  /* 內容 */
  content: string;
  /* 裝置 */
  device: string;
  /* 排序 */
  orderNo: number;
  /* 置頂 */
  top: number;
  /* 顯示 */
  display: number;
  /* 下架時間 */
  startTime: string;
  /* 下架時間 */
  endTime: string;
  /* 圖片WEB */
  imageWeb: string;
  /* 圖片h5 */
  imageH5: string;
  /* 開啟方式 */
  openWay: number;
  /* 網址 */
  openLink: string;
  /* 執行人 */
  updatedUser: string;
  /* 最後更新時間 */
  updatedAt: string;
  /* 關聯優惠 */
  promotions: string[];
}

export interface GetLaunchedListParams {
  /* 名稱 */
  name?: string;
  /* 類型 */
  type?: number;
  /* 顯示 */
  display?: number;
  /* 裝置 */
  device?: number;
  /* 上架時間 */
  startTime?: string;
  /* 下架時間 */
  endTime?: string;
  /* 排序條件 */
  orderBy?: number;
  /* 第幾頁 */
  page?: number;
  /* 每頁筆數 */
  pageSize?: number;
}
export interface GetLaunchedListResponse {
  /* ID */
  ID: number;
  /* 名稱 */
  name: string;
  /* 類型 */
  type: string;
  /* 內容 */
  content: string;
  /* 裝置 */
  device: string;
  /* 排序 */
  orderNo: number;
  /* 置頂 */
  top: number;
  /* 顯示 */
  display: number;
  /* 下架時間 */
  startTime: string;
  /* 下架時間 */
  endTime: string;
  /* 圖片WEB */
  imageWeb: string;
  /* 圖片h5 */
  imageH5: string;
  /* 開啟方式 */
  openWay: number;
  /* 網址 */
  openLink: string;
  /* 執行人 */
  updatedUser: string;
  /* 最後更新時間 */
  updatedAt: string;
  /* 關聯優惠 */
  promotions: string[];
}
