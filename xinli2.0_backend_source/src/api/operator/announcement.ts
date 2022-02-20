import { defHttp } from '/@/utils/http/axios';

import {
  GetAnnouncementParams,
  GetAnnouncementResponse,
  DeleteAnnouncementParams,
  DeleteAnnouncementResponse,
  PostAnnouncementParams,
  PostAnnouncementResponse,
  PutAnnouncementParams,
  PutAnnouncementResponse,
} from './model/announcementModel';

enum ApiList {
  announcement = '/backend/site/announcement',
  announcementSort = '/backend/site/announcement/sort',
}

/**
 * @description: 公告: 列表
 * @method: get
 */
export function getAnnouncement(params?: GetAnnouncementParams) {
  return defHttp.get<GetAnnouncementResponse>({ url: ApiList.announcement, params });
}

/**
 * @description: 公告: 刪除
 * @method: delete
 */
export function deleteAnnouncement(data?: DeleteAnnouncementParams) {
  return defHttp.delete<DeleteAnnouncementResponse>({
    url: ApiList.announcement,
    params: data,
    data,
  });
}

/**
 * @description: 公告: 新增
 * @method: post
 */
export function createAnnouncement(params?: PostAnnouncementParams) {
  return defHttp.post<PostAnnouncementResponse>({ url: ApiList.announcement, params });
}

/**
 * @description: 公告: 修改
 * @method: put
 */
export function putAnnouncement(params?: PutAnnouncementParams) {
  return defHttp.put<PutAnnouncementResponse>({ url: ApiList.announcement, params });
}
