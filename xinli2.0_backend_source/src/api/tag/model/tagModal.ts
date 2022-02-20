import { ListFetchResult } from '/@/api/model/baseModel';

export interface Tag {
  id?: number;
  name: string;
  color?: string;
  tagGroupID?: number;
}

export interface TagList extends Tag {
  updatedAt?: string;
  createdAt?: string;
}


export type TagResultModel = ListFetchResult<TagList>;
