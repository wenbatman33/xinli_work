import {
  MenuParams,
  roleSearch,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RoleListGetResultModel,
  FnGetResultModel,
  FunctionItem,
  RoleItem,
  RoleFnGetResultModel,
  setRoleFnItem,
  RoleUsersGetResultModel,
  RoleUserParams,
  RoleUserCreateParams,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  
  IsAccountExist = '/system/accountExist',
  MenuList = '/system/getMenuList',

  AccountList = '/backend/admin/user/admins',
  CreateAccount = '/backend/admin/user/admin',
  UpdateAccount = '/backend/admin/user/info',
  ResetPassword = '/backend/admin/user/resetpassword',
  UpdatePassword = '/backend/admin/user/updatepassword',
  DeptList = '/backend/admin/user/depts',
  FnList = '/backend/admin/function/functions',
  setFn = '/backend/admin/function/function',
  RoleList = '/backend/admin/role/adminroles',
  addRole = '/backend/admin/role/adminrole',
  updateRole = '/backend/admin/role/adminroleinfo',
  getRoleFns = '/backend/admin/role/roles',
  setRoleFns = '/backend/admin/role/fns',
  getRoleUsers = '/backend/admin/role/adminusers',
  setRoleUsers = '/backend/admin/role/adminuser',
  authLogs = '/backend/authLogs/Logs'
}

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });


// export const getFnList = () =>
//   defHttp.get<FnGetResultModel>({ url: Api.FnList });

export const getAccountList = (params) => {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<AccountListGetResultModel>({ url: `${Api.AccountList}?${queryString}` });
}

export const CreateAccount = (params: RoleUserCreateParams) =>
  defHttp.post({ url: Api.CreateAccount, params });

export const UpdateAccount = (params: RoleUserCreateParams) =>
  defHttp.put({ url: Api.UpdateAccount, params });

export const getDeptList = () =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList });

export const ResetPassword = (params) =>
  defHttp.put({ url: Api.ResetPassword, params });

export const UpdatePassword = (params) =>
  defHttp.put({ url: Api.UpdatePassword, params });


export function getFnList(params){
  if (params.fnKey === '') delete params.fnKey;
  if (params.fnName === '') delete params.fnName;
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<FnGetResultModel>({ url: `${Api.FnList}?${queryString}` }).then(res=>{
    let root = res.list.all.filter(fn=>fn.parentID === 0);
    res.list.all.forEach(item => {
      if(item.parentID !== 0){
        let parent = res.list.parent.find(fn=>fn.fnID === item.parentID);
        const exist = root.some(r=>r.fnID === item.parentID);
        if(parent && !exist){
          root.push(parent);
        }
      }
    });
    root.forEach(parent=>{
      parent.children = res.list.all.filter(fn=>fn.parentID === parent.fnID);
    })
    return root;
  });
}

export const setFn = (params: FunctionItem) =>
  defHttp.post({ url: Api.setFn, params });

export const updateFn = (params: FunctionItem) =>
  defHttp.put({ url: Api.setFn, params });

export const deleteFn = (fnID: number) =>
  defHttp.delete({ url: `${Api.setFn}?fnID=${fnID}`});

export const addRole = (params: RoleItem) =>
  defHttp.post({ url: Api.addRole, params });

export const getRoles = (params: roleSearch) =>{
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<RoleListGetResultModel>({ url: `${Api.RoleList}?${queryString}` });
}
  

export const updateRole = (params: RoleItem) =>
  defHttp.put({ url: Api.updateRole, params });

export const getRoleFns = (roleID: number) =>
  defHttp.get<RoleFnGetResultModel>({ url: `${Api.getRoleFns}?pageSize=500&roleID=${roleID}` });

export const setRoleFns = (params: setRoleFnItem) =>
  defHttp.put({ url: Api.setRoleFns, params });

export const getRoleUsers = (roleID: number) =>
  defHttp.get<RoleUsersGetResultModel>({ url: `${Api.getRoleUsers}?pageSize=500&roleID=${roleID}` });

export const setRoleUsers = (params: RoleUserParams) =>
  defHttp.put({ url: Api.setRoleUsers, params });

export const getAuthLogs = (params) =>{
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get({ url: `${Api.authLogs}?${queryString}` });
}