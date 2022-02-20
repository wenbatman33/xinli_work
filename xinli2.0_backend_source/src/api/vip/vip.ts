import { defHttp } from '/@/utils/http/axios';
import { VipPrizeResultModel, prize} from './model/vipModel';


enum Api {
  search = '/backend/vip/gift/search',
  addGift = '/backend/vip/gift/birthday',
}

export function GetPrizeList(params) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<VipPrizeResultModel>({ url: `${Api.search}?${queryString}` });
}

export function AddBirthGift(params: prize) {
  return defHttp.post({ url: Api.addGift, params });
}