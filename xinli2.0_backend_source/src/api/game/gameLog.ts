import { defHttp } from '/@/utils/http/axios';


enum Api {
  GetGameLog = '/backend/bettinglog/test',
}

export function GetGameLog(params) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get({ url: `${Api.GetGameLog}?${queryString}` });
}
