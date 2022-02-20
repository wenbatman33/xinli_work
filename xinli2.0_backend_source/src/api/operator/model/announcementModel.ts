/** 公告: 列表API */
export interface BaseResponse<T> {
  list: Array<T>;
}

export interface GetAnnouncementParams {
  /** 標題 */
  title?: string;

  /** 隱藏 */
  hidden?: boolean;

  /** 排序欄位 [id | sort | start | updatedAt] */
  sort?: string;

  /** 排序方向 [desc | asc] */
  dir?: string;

  /** 第幾頁 */
  page?: number;

  /** 每頁筆數*/
  pageSize?: number;
}

export interface AnnouncementList {
  /* id */
  id: number;

  /* 前台排序 */
  sort: number;

  /* 標題 */
  title: string;

  /* 是否置頂 */
  top: boolean;

  /* 隱藏 */
  hidden: boolean;

  /* 上架時間 */
  start: string;

  /* 內容 */
  context: string;

  /* 最後執行人ID */
  editor: number;

  /* 執行人名稱 */
  editorName: string;

  /* 建立時間 */
  createdAt: string;

  /* 最後更新時間 */
  updatedAt: string;
}
export interface GetAnnouncementResponse {
  list: AnnouncementList[];
  /** 總筆數 */
  count: number;
}

export interface DeleteAnnouncementParams {
  /* id */
  id: number;
}
export interface DeleteAnnouncementResponse {
  /** 請求是不是成功 */
  success: boolean;
}
export interface PostAnnouncementParams {
  /* 前台排序 */
  sort: number;
  /* 標題 */
  title: string;
  /* 隱藏  */
  hidden: boolean;
  /* 是否置頂 */
  top?: boolean;
  /* 上架時間 */
  start: string;
  /* 內容 */
  context?: string;
}
export interface PostAnnouncementResponse {
  /** 請求是不是成功 */
  success: boolean;
}

export interface PutAnnouncementParams {
  /* 前台排序 */
  sort: number;
  /* 標題 */
  title: string;
  /* 隱藏  */
  hidden: boolean;
  /* 是否置頂 */
  top?: boolean;
  /* 上架時間 */
  start: string;
  /* 內容 */
  context?: string;
}
export interface PutAnnouncementResponse {
  /** 請求是不是成功 */
  success: boolean;
}
