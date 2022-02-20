export interface ListFetchResult<T extends any> {
  list: T[];
  count: number;
}

export interface getAgencyListTypeItem {
  key: number;
  name: string;
  displayName: string;
}

export interface CreateAgencyResponse {
  id?: number;
}

export interface GetAgencyGroupReq {
  id?: number;
}

export interface checkAgencyReq {
  agencyAccount?: string;
}
export interface changeAgencyReq {
  agencyID?: string;
  parentAgencyID?: string;
}
export interface fileUploadRes {
  url?: number;
}
export interface createAgencyPromotionlinkReq {
  id?: string;
  type?: number;
  promotionLink?: string;
}
export interface createAgencyReq {
  AgencyGroupID?: number;
  AgencyTypeID?: number;
  name?: string;
  displayName?: string;
  sort?: number;
  bettingCode?: string;
  trialPlay?: number;
  status?: number;
  imageH5?: string;
  imagePc?: string;
}
export interface createAgencyRankSettingReq {
  groupName?: string;
  type?: number;
  rank1MinProfit?: number;
  rank1ActiveMemberCount?: number;
  rank1CommissionPercent?: number;
  rank2MinProfit?: number;
  rank2ActiveMemberCount?: number;
  rank2CommissionPercent?: number;
  rank3MinProfit?: number;
  rank3ActiveMemberCount?: number;
  rank3CommissionPercent?: number;
  rank4MinProfit?: number;
  rank4ActiveMemberCount?: number;
  rank4CommissionPercent?: number;
  rank5MinProfit?: number;
  rank5ActiveMemberCount?: number;
  rank5CommissionPercent?: number;
  rank6MinProfit?: number;
  rank6ActiveMemberCount?: number;
  rank6CommissionPercent?: number;
  rank7MinProfit?: number;
  rank7ActiveMemberCount?: number;
  rank7CommissionPercent?: number;
}
export interface GetAgencyResponse {
  id: string;
  account: string;
  name: string;
  phone: string;
  email: string;
  wechat: string;
  qq: string;
  lastLoginTime: string;
  lastLoginIp: string;
  reivewAgencyTime: string;
  applyAgencyIp: string;
  memberAccount: string;
  parentAgencyID: string;
  parentAgencyAccount: string;
  childAgencyCount: string;
  memberCount: string;
  status: string;
  depositLimit: string;
  withdrawLimit: string;
  promotionLinks?: promotionLinksItem[];
}
export interface GetAgencyCheckResponse {
  memberID: 'string';
  account: 'string';
  name: 'string';
}
export interface GetAgencyGroupResponse {
  giveOffer: number;
  groupID: number;
  groupName: 'string';
  type: number;
}
export interface promotionLinksItem {
  id?: number;
  agencyID?: number;
  type?: number;
  promotionLink: string;
}
export interface GetAgencyListItem {
  id?: number;
  account?: string;
  parentAgencyID?: number;
  parentAgencyAccount?: string;
  childAgencyCount?: number;
  memberCount?: number;
  giveOffer?: number;
  rankGroupID?: number;
  rankGroupName?: string;
  agencyWallet?: number;
  promotionLinks?: promotionLinksItem[];
  lastLoginTime?: string;
  activeStatus?: number;
  reviewTime?: string;
}

export interface getAgencyListReq {
  agencyID?: string;
  agencyAccount?: string;
  //帳號是否精確搜尋[1:模糊搜尋2:精確搜尋]
  exactlyMatching?: number;
  reviewStartTime?: string;
  reviewEndTime?: string;
  //是否計算佣金[0全部1是2否]
  giveOffer?: number;
  rankGroupID?: string;
  activeStatus?: number;
  //帳號狀態[0全部1正常2鎖定提款3黑名單]
  status?: number;
}

export interface putAgencyReq {
  id?: number;
  AgencyGroupID?: number;
  AgencyTypeID?: number;
  name?: string;
  displayName?: string;
  bettingCode?: string;
  trialPlay?: number;
  status?: number;
  imageH5?: string;
  imagePc?: string;
  sort?: number;
}

export interface putChildapplicationReq {
  id?: number;
  remark?: string;
}
export interface putAgencyDetailReq {
  id?: number;
  name?: 'string';
  phone?: 'string';
  email?: 'string';
  wechat?: 'string';
  qq?: 'string';
}

export interface putAgencyStatusReq {
  id?: number;
  status?: number;
  depositLimit?: number;
  withdrawLimit?: number;
}

export interface putAgencyGroupReq {
  agencyID?: number;
  giveOffer?: string;
  rankGroupID?: string;
}
export interface GetAgencyGroupRes {
  id?: number;
  name?: string;
  displayName?: string;
  AgencyTypeList?: getAgencyListTypeModel;
  status?: number;
  imageH5?: string;
  imagePc?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetAgencyGroupsReq {
  name?: string;
  displayName?: string;
  AgencyTypeID?: number;
  status?: number;
  page?: number;
  pageSize?: number;
}

export interface PutAgencyGroupReq {
  id?: number;
  name?: string;
  displayName?: string;
  AgencyTypeList?: string;
  status?: number;
  imageH5?: string;
  imagePc?: string;
}

export interface CommissionModel {
  id?: number;
  date?: string;
  deliveredAt?: string;
  agencyID?: number;
  agencyAccount?: string;
  wallet?: number;
  commissionPercent?: number;
  totalWinAmount?: number;
  totalCommission?: number;
  lastTotalCommission?: number;
  childCommissionAmount?: number;
  childBonusAmount?: number;
  status?: number;
  childDeliveredAt?: string;
  childTotalWinAmount?: number;
  childStatus?: number;
  setStatus?: number;
}

export type getAgencyListTypeModel = ListFetchResult<getAgencyListTypeItem>;
export type GetAgencyListRes = ListFetchResult<GetAgencyListItem>;
export type GetAgencyGroupsListRes = ListFetchResult<GetAgencyGroupRes>;
