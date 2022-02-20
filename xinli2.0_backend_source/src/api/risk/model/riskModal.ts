import { TagList } from '../../tag/model/tagModal';
import { ListFetchResult } from '/@/api/model/baseModel';

export interface memberList {
  riskID: number;
  account: string;
  phone: string;
  registerIp: string;
  registerDevice: string;
  registerDate: string;
}

export interface IP_DeviceList {
  memberID: number;
  account: string;
  agent: string;
  registerDate: string;
  registerDevice: string;
  registerIp: string;
  loginDate: string;
  loginDevice: string;
  loginIp: string
}

export interface repeatList {
  deviceID: string;
  totalMemberCount: number;
  lockMemberCount: number;
  multiAccountTag: number;
  relateAgent: string
}

export interface memberDeviceGhostList {
  memberID: number;
  account: string;
  realName: string;
  agent: string;
  registerDate: string;
  registerIp: string;
  loginDate: string;
  loginDevice: string;
  loginIp: SVGStringList;
  tags: TagList[],
  depositLimit: number;
  withdrawLimit: number;
  status: number;
  gameLogin: number;
}

export interface adjustmentApply {
  subject: string,
  reason: string,
  description: string,
  adjustmentType: number,
  amount: number | string,
  amountTimes: number | string,
  finalAmount: number | string,
  currency: string,
  isSpread: number,
  memberList: string[]
}

export interface adjustmentList {
  id: number;
  transactionID: string;
  memberName: string;
  adjustmentType: number;
  subject: string;
  reason: number;
  finalAmount: number;
  verifyAt: string;
  updatedAt: string;
  status: string;
  updateUser: string;
}


export type MemberResultModel = ListFetchResult<memberList>;
export type IP_DeviceResultModel = ListFetchResult<IP_DeviceList>;
export type RepeatResultModel = ListFetchResult<repeatList>;
export type memberDeviceGhostResultModel = ListFetchResult<memberDeviceGhostList>;
export type adjustmentListResultModel = ListFetchResult<adjustmentList>;

