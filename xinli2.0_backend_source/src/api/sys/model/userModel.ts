import { ListFetchResult } from '/@/api/model/baseModel';
/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string;
  password: string;
  loginCode: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  account: string;
  adminEffectiveTime: number;
  adminID: string | number;
  bearerToken: string;
  email: string;
  name: string;
  note: string;
  roles: RoleInfo[];
  fns?: UserFn[];
  passwordUpdatedAt?: number;
  homePath?: string;
  status: number;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 帳號名稱
  account: string;
  // 生效時間
  adminEffectiveTime: number;
  // 用户id
  adminID: string | number;
  // 用戶email
  email: string;
  // 用户名
  name: string;
  // 記錄
  note?: string;
  // 备注绑定词
  commentCategory?: string;
  // 預設首頁
  homePath?: string;
  // 狀態
  status: number;
  roles: RoleInfo[];
}

export interface UserFn {
  fnID: number;
  fnName: string;
  fnKey: string;
}

export type UserFnResultModel = ListFetchResult<UserFn>;