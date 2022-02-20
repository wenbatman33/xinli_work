import { defHttp } from '/@/utils/http/axios';

enum Api {
  systemConfig = '/backend/member/system/config',
  loginPCConfig = '/backend/member/setting/config',
  loginH5Config = '/backend/member/setting/h5config',
  getDomains = '/backend/domain/list',
  domainGroup = '/backend/domain/group',
  domain = '/backend/domain/domain',
  smsVender = '/backend/sms/vendor',
  authVendor = '/backend/member/setting/line/config',
}

export function getSystemConfig() {
  return defHttp.get({ url: `${Api.systemConfig}` });
}

export function updateSystemConfig(params) {
  return defHttp.put({ url: Api.systemConfig, params });
}

export function getLoginPCConfig() {
  return defHttp.get({ url: `${Api.loginPCConfig}` });
}
export function getLoginH5Config() {
  return defHttp.get({ url: `${Api.loginH5Config}` });
}
export function updateLoginPCConfig(params) {
  return defHttp.put({ url: Api.loginPCConfig, params });
}
export function updateLoginH5Config(params) {
  return defHttp.put({ url: Api.loginH5Config, params });
}
export function getDomains() {
  return defHttp.get({ url: `${Api.getDomains}` }).then(res=>{
    res.list = res.list.sort((a,b)=>{
      return a.sort > b.sort ? 1 : -1;
    });
    return res;
  });
}
export function createDomainGroup(params) {
  return defHttp.post({ url: Api.domainGroup, params });
}
export function updateDomainGroup(params) {
  return defHttp.put({ url: Api.domainGroup, params });
}
export function createDomain(params) {
  return defHttp.post({ url: Api.domain, params });
}
export function updateDomain(params) {
  return defHttp.put({ url: Api.domain, params });
}

export function getSmsVendor() {
  return defHttp.get({ url: `${Api.smsVender}` });
}
export function setSmsVendor(id: number) {
  return defHttp.put({ url: Api.smsVender, params: { id } });
}

export function getAuthVendor() {
  return defHttp.get({ url: `${Api.authVendor}` });
}