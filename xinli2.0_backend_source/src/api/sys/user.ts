import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel, UserFnResultModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/backend/admin/user/login',
  Logout = '/logout',
  GetUserInfo = '/backend/admin/user/admin',
  GetPermCode = '/getPermCode',
  GetUserFns = '/backend/admin/user/fns',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo(adminID?: number) {
  const searchText: string = adminID ? `?adminID=${adminID}`:'';
  return defHttp.get<GetUserInfoModel>({ url: `${Api.GetUserInfo}${searchText}` });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function getUserFns(adminID: number|string) {
  return defHttp.get<UserFnResultModel>({ url: `${Api.GetUserFns}?adminID=${parseInt(adminID,10)}` });
}