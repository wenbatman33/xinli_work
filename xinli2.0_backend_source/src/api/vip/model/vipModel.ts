import { ListFetchResult } from '/@/api/model/baseModel';

export interface vipPrize {
  id: number;
  account: string;
  vipLevel: number;
  vipStatus: number;
  status: number;
  gift: string;
  createdAt: string;
  type: number
}

export interface prize {
  account: string;
  time: string;
  gift: string;
}


export type VipPrizeResultModel = ListFetchResult<vipPrize>;

