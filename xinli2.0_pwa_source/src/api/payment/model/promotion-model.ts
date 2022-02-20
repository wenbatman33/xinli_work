import { ApiResponse } from '@/api/basic-model';

/**
 * 優惠活動列表查詢參數
 */
export interface GetPromotionParams {
  /**
   * 優惠分類
   */
  type?: number;
}

/**
 * 關聯優惠物件
 */
export interface ApplyPromotionItem {
  /**
   * 優惠ID
   */
  id?: number;

  /**
   * 優惠名稱
   */
  name?: string;

  /**
   * 參加狀態[1申請參加,2已申請參加]
   */
  applyStatus?: number;
}

/**
 * 優惠物件
 */
export interface PromotionItem {
  /**
   * 上架id
   */
  id?: string;

  /**
   * 優惠名稱
   */
  name?: string;

  /**
   * 上架分類
   */
  type?: string;

  /**
   * 置頂
   */
  top?: number;

  /**
   * 排序
   */
  orderNo?: number;

  /**
   * 優惠內容
   */
  content?: string;

  /**
   * 裝置[1:WebPC,2:MobileWeb,3:AndroidPWA,4:iOSPWA]
   */
  device?: string;

  /**
   * 狀態[1即將開始2進行中3已結束]
   */
  status?: number;

  /**
   * 圖片WEB
   */
  imageWeb?: string;

  /**
   * 圖片H5
   */
  imageH5?: string;

  /**
   * 上架時間
   */
  startTime?: string;

  /**
   * 下架時間
   */
  endTime?: string;

  /**
   * 開啟方式[1優惠卡片2內部網頁3外部連結]
   */
  openWay?: number;

  /**
   * 若為內部網頁或外部連結，則需會有網址
   */
  openLink?: string;

  /**
   * 關聯優惠
   */
  promotion?: ApplyPromotionItem[];
}

/**
 * 優惠活動列表資訊
 */
export interface GetPromotionResponseData {
  list?: PromotionItem[];
}

/**
 * 優惠活動列表 API 返回
 */
export type GetPromotionResponse = ApiResponse<GetPromotionResponseData>;

/**
 * 單則優惠內容查詢參數
 */
export interface GetPromotionOneParams {
  /**
   * 優惠ID
   */
  ID?: string;
}

/**
 * 單則優惠內容 API 返回
 */
export type GetPromotionOneResponse = ApiResponse<PromotionItem>;

/**
 * 優惠下拉選單物件
 */
export interface DropdownItem {
  /**
   * 傳到後端的值
   */
  key?: string;

  /**
   * 前台要顯示的值
   */
  value?: string;
}

/**
 * 優惠下拉選單資料
 */
export interface GetPromotionDropdownResponseData {
  promotionLaunchedType?: DropdownItem[];
}

/**
 * 優惠下拉選單 API 返回
 */
export type GetPromotionDropdownResponse = ApiResponse<GetPromotionDropdownResponseData>;

/**
 * 優惠申請請求資訊
 */
export interface PostApplyPromotionRequestData {
  /**
   * 優惠ID
   */
  promotionID?: number;
}

/**
 * 優惠申請返回資訊
 */
export interface PostApplyPromotionResponseData {
  /**
   * 請求是不是成功
   */
  success?: boolean;
}

/**
 * 優惠申請 API 返回
 */
export type PostApplyPromotionResponse = ApiResponse<PostApplyPromotionResponseData>;
