import { defHttp } from '/@/utils/http/axios';

export interface fileUploadResponse {
  /** 請求是不是成功 */
  url: string;
}

/**
 * @description: 共用圖片上傳
 * @method: post
 */
export function fileUpload(params: FormData) {
  return defHttp.post<fileUploadResponse>({ url: '/file/file/upload', params });
}
