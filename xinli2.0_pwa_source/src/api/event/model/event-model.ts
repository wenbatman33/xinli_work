import { ApiResponse } from '@/api/basic-model';

/**
 * 公告物件
 */
export interface AnnouncementItem {
  /**
   * id
   */
  id?: string;

  /**
   * 標題
   */
  title?: string;

  /**
   * 內容
   */
  context?: string;

  /**
   * 圖片位置
   */
  image?: string;

  /**
   * 是否置頂
   */
  top?: boolean;

  /**
   * 開始時間
   */
  start?: string;
}

/**
 * 取得公告返回資訊
 */
export interface GetAnnouncementResponseData {
  /**
   * 列表
   */
  list?: AnnouncementItem[];
}

/**
 * 取得公告 API 返回
 */
export type GetAnnouncementResponse = ApiResponse<GetAnnouncementResponseData>;

/**
 * 取得廣告查詢參數
 */
export interface GetBannerParams {
  /**
   * 分類ID
   */
  categortyID?: number;
}

/**
 * 廣告物件
 */
export interface BannerItem {
  /**
   * id
   */
  id?: number;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 標題
   */
  title?: string;

  /**
   * 內容
   */
  context?: string;

  /**
   * h5 圖片位置
   */
  imageH5?: string;

  /**
   * web 圖片位置
   */
  imageWeb?: string;

  /**
   * 說明
   */
  description?: string;

  /**
   * 開始時間
   */
  start?: string;

  /**
   * 結束時間
   */
  end?: string;

  /**
   * 備註
   */
  note?: string;

  /**
   * depplink URL
   */
  targetURL?: string;

  /**
   * 開啟方式 0無 1產品內 2產品內網頁 3另開視窗
   */
  deeplinkType?: number;
}

/**
 * 取得廣告返回資訊
 */
export interface GetBannerResponseData {
  /**
   * 列表
   */
  list?: BannerItem[];
}

/**
 * 取得廣告 API 返回
 */
export type GetBannerResponse = ApiResponse<GetBannerResponseData>;

/**
 * 會員站內信查詢參數
 */
export interface GetLetterListParams {
  /**
   * 第幾頁
   */
  page?: number;

  /**
   * 每頁筆數
   */
  pageSize?: number;
}

/**
 * 站內信物件
 */
export interface LetterItem {
  /**
   * id
   */
  id?: number;

  /**
   * 類型[1系統2手動]
   */
  type?: number;

  /**
   * 站內信編號
   */
  letterSettingId?: number;

  /**
   * 標題
   */
  title?: string;

  /**
   * 內容
   */
  content?: string;

  /**
   * 狀態[1待發送2已發送3已讀取4失敗5回收]
   */
  status?: number;

  /**
   * 發送時間
   */
  sendAt?: string;
}

/**
 * 會員站內信返回資訊
 */
export interface GetLetterListResponseData {
  list?: LetterItem[];
}

/**
 * 會員站內信 API 返回
 */
export type GetLetterListResponse = ApiResponse<GetLetterListResponseData>;

/**
 * 單一站內信查詢參數
 */
export interface GetLetterParams {
  /**
   * 站內信ID
   */
  ID?: string;
}

/**
 * 單一站內信 API 返回
 */
export type GetLetterResponse = ApiResponse<LetterItem>;

/**
 * 讀取站內信請求參數
 */
export interface PutLetterRequestData {
  /**
   * 站內信ID
   */
  ID?: number;
}

/**
 * 讀取站內信返回資料
 */
export interface PutLetterResponseData {
  /**
   * 請求是不是成功
   */
  success?: boolean;
}

/**
 * 讀取站內信 API 返回
 */
export type PutLetterResponse = ApiResponse<PutLetterResponseData>;

/**
 * 刪除站內信請求參數
 */
export interface DeleteLetterParams {
  /**
   * 站內信ID
   */
  ID?: number;
}

/**
 * 刪除站內信返回資料
 */
export interface DeleteLetterResponseData {
  /**
   * 請求是不是成功
   */
  success?: boolean;
}

/**
 * 刪除站內信 API 返回
 */
export type DeleteLetterResponse = ApiResponse<DeleteLetterResponseData>;
