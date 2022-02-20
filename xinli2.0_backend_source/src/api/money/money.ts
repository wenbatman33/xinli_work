import { defHttp } from '/@/utils/http/axios';
import { GetUseTypeResultModel, GetInOutTypeResultModel } from './model/moneyModel';

/**
 * Api urls
 */
enum Api {
  GetUseType = '/money/usetype',
  GetInOutType = '/money/usetype/inouttype',
}

/**
 * Get UseType
 * @returns VAxios request promise
 */
export const getUseType = () => defHttp.get<GetUseTypeResultModel>({ url: Api.GetUseType });

/**
 * Get InOutType
 * @returns VAxios request promise
 */
export const getInOutType = () => defHttp.get<GetInOutTypeResultModel>({ url: Api.GetInOutType });
