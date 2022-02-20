export interface ListFetchResult<T extends any> {
  list: T[];
  count?: number;
}
export interface ArrayItem {
  value: any;
  key: number;
}
export interface GameGroupOptionItem {
  displayName: string;
  name: string;
  key: number;
}
export interface getGameTypeItem {
  id: number;
  name: string;
}
export interface getGameListTypeItem {
  value: any;
  key: number;
  name: string;
  displayName: string;
}
export interface CreateGameResponse {
  id?: number;
}

export interface GetGameGroupReq {
  id?: number;
}

export interface fileUploadRes {
  url?: number;
}

export interface createGameReq {
  gameGroupID?: number;
  gameTypeID?: number;
  name?: string;
  displayName?: string;
  sort?: number;
  bettingCode?: string;
  trialPlay?: number;
  status?: number;
  imageH5?: string;
  imagePc?: string;
}
export interface GetGameResponse {
  id?: number;
  gameGroupID?: number;
  gameGroupName?: string;
  gameTypeID?: number;
  gameTypeName?: string;
  name?: string;
  displayName?: string;
  sort?: number;
  bettingCode?: string;
  trialPlay?: number;
  status?: number;
  imageH5?: string;
  imagePc?: string;
  screenShotH5?: string;
  screenShotPc?: string;
  createdAt?: string;
  updatedAt?: string;
  isHotGame? : number;
  recommendedSort? : number;
  recommendedImageH5?: string;
}

export interface GetGameListItem {
  id?: number;
  gameGroupID?: number;
  gameGroupName?: string;
  gameTypeID?: number;
  gameTypeName?: string;
  name?: string;
  displayName?: string;
  sort?: number;
  bettingCode?: string;
  trialPlay?: number;
  status?: number;
  imageH5?: string;
  imagePc?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface getGameListReq {
  gameGroupID?: number;
  gameTypeID?: number;
  name?: string;
  displayName?: string;
  sort?: number;
  bettingCode?: string;
  trialPlay?: number;
  page?: number;
  pageSize?: number;
}

export interface putGameReq {
  id?: number;
  gameGroupID?: number;
  gameTypeID?: number;
  name?: string;
  displayName?: string;
  bettingCode?: string;
  trialPlay?: number;
  status?: number;
  imageH5?: string;
  imagePc?: string;
  sort?: number;
}

export interface GetGameGroupRes {
  createdAt?: string;
  displayName?: string;
  gameAgencyName?: string;
  gameType?: getGameTypeItem[];
  id?: number;
  imageH5?: string;
  imagePc?: string;
  name?: string;
  openWay?: number;
  status?: number;
  updatedAt?: string;
  walletType?: number;
}

export interface GetGameGroupsReq {
  name?: string;
  displayName?: string;
  gameTypeID?: number;
  status?: number;
  page?: number;
  pageSize?: number;
}

export interface PutGameGroupReq {
  id?: number;
  name?: string;
  displayName?: string;
  gameTypeID?: number;
  status?: number;
  imageH5?: string;
  imagePc?: string;
}
export interface PutGameAgencyReq {
  id?: number;
  status?: number;
  imageH5?: string;
  imagePc?: string;
}
export interface GetGameAgencyRes {
  createdAt?: string;
  gameGroups?: ArrayItem[];
  gameLists?: ArrayItem[];
  id?: number;
  imageH5?: string;
  imagePc?: string;
  name?: string;
  status?: number;
  updatedAt?: string;
}
export type GetGameListRes = ListFetchResult<GetGameListItem>;
export type GetGameGroupsListRes = ListFetchResult<GetGameGroupRes>;
export type GetGameAgencyListRes = ListFetchResult<GetGameAgencyRes>;
export type GetGameTypeListRes = ListFetchResult<ArrayItem>;
export type GetGameGroupOptionRes = ListFetchResult<GameGroupOptionItem>;
