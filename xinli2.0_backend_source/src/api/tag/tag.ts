import { defHttp } from '/@/utils/http/axios';
import { Tag, TagResultModel } from './model/tagModal';


enum Api {
  GetTagGroup = '/backend/member/tag/groups',
  SetTagGroup = '/backend/member/tag/group',
  GetTag = '/backend/member/tag/tags',
  SetTag = '/backend/member/tag/tag',
}

export function getTagGroup() {
  return defHttp.get<TagResultModel>({ url: Api.GetTagGroup });
}

export function CreateTagGroup(params: Tag) {
  return defHttp.post({ url: Api.SetTagGroup, params });
}

export function UpdateTagGroup(params: Tag) {
  return defHttp.put({ url: Api.SetTagGroup, params });
}

export function getTag() {
  return defHttp.get<TagResultModel>({ url: Api.GetTag });
}

export function CreateTag(params: Tag) {
  return defHttp.post({ url: Api.SetTag, params });
}

export function UpdateTag(params: Tag) {
  return defHttp.put({ url: Api.SetTag, params });
}

