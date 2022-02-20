/** site_banner 廣告API */
export interface BaseResponse<T> {
  list: Array<T>;
}
export interface GetBannerCategoryParams {
  /** 排序欄位[id | createdAt | updatedAt] */
  sort?: string;

  /** 排序方向[desc | asc] */
  dir?: string;

  /** 第幾頁 */
  page?: number;

  /** 每頁筆數*/
  pageSize?: number;
}

export interface GetBannerCategoryList {
  /** id */
  id: number;

  /** 分類名稱 */
  name: string;

  /** 說明 */
  description: string;

  /** 隱藏 */
  hidden: boolean;

  /** 最後執行人ID */
  editor: number;

  /** 執行人名稱 */
  editorName: string;

  /** 建立時間 */
  createdAt: string;

  /** 最後更新時間 */
  updatedAt: string;
}

export interface GetBannerCategoryResponse {
  /** 廣告分類列表 */
  list: GetBannerCategoryList[];

  /** 總筆數 */
  count: number;
}

export interface PostBannerCategoryParams {
  /** 分類名稱 */
  name: string;

  /** 說明 */
  description?: string;

  /** 是否隱藏 */
  hidden?: boolean;
}

export interface PostBannerCategoryResponse {
  /** 請求是不是成功 */
  success: boolean;
}

export interface PutBannerCategoryParams {
  /** id */
  id: number;

  /** 分類名稱 */
  name: string;

  /** 說明 */
  description?: string;

  /** 是否隱藏 */
  hidden?: boolean;
}

export interface PutBannerCategoryResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 廣告：列表
 */
export interface GetBannerParams {
  /** 標題 */
  title?: string;
  /** 廣告分類 ID [預設:0 全部] */
  bannerCategoryID?: string | number;
  /** 上架平台 0:全部 1:WEB 2:H5_android 4:H5_ios 8:pwa_android 16:pwa_ios */
  device?: number;
  /** 隱藏 */
  hidden?: boolean;
  /** 上架時間 */
  start?: string;
  /** 排序欄位 [id | start | end | updatedAt] */
  sort?: string;
  /** 排序欄位 [id | start | end | updatedAt] */
  status?: string;
  /** 排序方向 [desc | asc] */
  dir?: string | number;
  /** 第幾頁 */
  page?: number;
  /** 每頁筆數*/
  pageSize?: number;
}

export interface GetBannerList {
  /** id */
  id: number;

  /** 分類 ID */
  bannerCategoryID: number;

  /** 前台排序 */
  sort: number;

  /** 標題 */
  title: string;

  /** web 圖 */
  imageWeb: string;

  /** h5 圖 */
  imageH5: number;

  /** 是否隱藏 */
  hidden: boolean;

  /** 狀態字串 */
  statusStr: string;

  /** 說明 */
  description: string;

  /** 1:WEB 2:H5_android 4:H5_ios 8:pwa_android 16:pwa_ios */
  device: string[];

  /** 上架時間 */
  start: string;

  /** 下架時間 */
  end: string;

  /** 開啟方式 */
  target: string;

  /** 鏈結 */
  url: string;

  /** 內容 */
  context: string;

  /** 備註 */
  note: string;

  /** 最後執行人ID */
  editor: number;

  /** 執行人名稱 */
  editorName: string;

  /** 建立時間 */
  createdAt: string;

  /** 最後更新時間 */
  updatedAt: string;
}

export interface GetBannerResponse {
  /** banner列表 */
  list: GetBannerList[];

  /** 總筆數 */
  count: number;
}

/**
 * 廣告：新增
 */
export interface CreateBannerParams {
  /* 分類 ID */
  bannerCategoryID: number;
  /* 標題 */
  title: string;
  /* 是否隱藏 */
  hidden: true;
  /* 說明 */
  description: string;
  /* 前台排序 */
  sort?: number;
  /* web 圖 */
  imageWeb?: string;
  /* h5 圖 */
  imageH5?: string;
  /* 上架平台 1:WEB 2:H5_android 4:H5_ios 8:pwa_android 16:pwa_ios */
  device?: number[] | string[];
  /* 上架時間 */
  start: string;
  /* 下架時間 */
  end?: string;
  /* 開啟方式 */
  target?: string;
  /* 鏈結 */
  url?: string;
  /* 內容 */
  context?: string;
  /* 備註 */
  note?: string;
}

export interface CreateBannerResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 廣告：編輯
 */
export interface PutBannerParams {
  /* id */
  id: number | string;
  /* 分類 ID */
  bannerCategoryID: number;
  /* 標題 */
  title: string;
  /* 是否隱藏 */
  hidden: boolean;
  /* 說明 */
  description: string;
  /* 上架時間 */
  start: string;
  /* 前台排序 */
  sort?: number;
  /* web 圖 */
  imageWeb?: string;
  /* h5 圖 */
  imageH5?: string;
  /* 上架平台 1:WEB 2:H5_android 4:H5_ios 8:pwa_android 16:pwa_ios */
  device?: number[] | string[];
  /* 上架時間 */
  end?: string;
  /* 開啟方式 */
  target?: string;
  /* 鏈結 */
  url?: string;
  /* 內容 */
  context?: string;
  /* 備註 */
  note?: string;
}
export interface PutBannerResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 廣告：刪除
 */
export interface DeleteBannerParams {
  /* id */
  id: number;
}
export interface DeleteBannerResponse {
  /** 請求是不是成功 */
  success: boolean;
}

/**
 * 廣告：排序
 */
export interface SortBannerParams {
  /* id */
  id: number | string;
  /* 排序 */
  sort: number | string;
}
export interface SortBannerResopnse {
  /** 請求是不是成功 */
  success: boolean;
}
export interface BannerCategoryItem {
  bannerCategoryID: number;
  name: string;
}

/**
 * 廣告分類：下拉選單
 */
export interface BannerCategoryResopnse {
  /** 請求是不是成功 */
  list: BannerCategoryItem[];
}
