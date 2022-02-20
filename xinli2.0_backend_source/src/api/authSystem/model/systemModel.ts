import { BasicPageParams, BasicFetchResult, ListFetchResult } from '/@/api/model/baseModel';
import type { GetUserInfoModel } from '/@/api/sys/model/userModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type DeptParams = {
  deptID?: number;
  deptName?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface AccountListItem extends GetUserInfoModel {
  lastLoginAt: string;
  createAt: string;
  updateAt: string;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export interface RoleItem {
  roleID?: number;
  roleName: string;
  note: string;
  status: number;
}
export interface RoleItemList extends RoleItem {
  editorAdminAccount: string;
  editorAdminID: number;
  updatedAt: string;
  createdAt: string;
}
export interface FunctionItem {
  fnID?: number;
  fnName: string;
  fnKey: string;
  status: number;
  parentID: number;
}

export interface FunctionList extends FunctionItem {
  updatedAt: string;
  createdAt: string;
  children?: FunctionItem[];
}

export interface roleFnItem extends FunctionList {
  roleID: string;
  roleName: string;
  active: boolean;
}

export interface setRoleFnItem {
  roleID: number,
  fnIDs: number[],
}

export interface RoleUserRoles {
  roleID: number;
  roleName: string;
  createAt: string;
  updateAt: string;
}
export interface RoleUserItem {
  adminID: number;
  account: string;
  name: string;
  email: string;
  roles?: RoleUserRoles[];
  status: string;
  note: string;
  lastLoginAt: string;
  createAt: string;
  updateAt: string;
}

export interface RoleUserParams {
  adminIDs: number[];
  roleID: number;
}

export interface RoleUserCreateParams {
  adminID?: number;
  account?: string;
  name?: string;
  email?: string;
  password?: string;
  status?: number;
  deptID?: number;
  title?: string;
  vpnIP?: string;
  commentCategory?: string;
  roleID?: number;
}

export interface accountSearch{
  adminID?: number;
  account?: string;
  status?: number;
  roles?: number;
  deptID?: number;
  title?: string;
}
export interface adminSearch {
  adminID?: number;
  account?: string;
  status?: number;
  roles?: number;
  deptID?: number;
  title?: string;
}

export type roleSearch = {
  roleName?: string;
  note?: string;
  status?: number | undefined;
};

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = ListFetchResult<AccountListItem>;

export type DeptListGetResultModel = ListFetchResult<DeptParams>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RoleListGetResultModel = RoleItemList[];

export type FnGetResultModel = ListFetchResult<FunctionList>;

export type RoleFnGetResultModel = ListFetchResult<roleFnItem>;

export type RoleUsersGetResultModel = ListFetchResult<RoleUserItem>;