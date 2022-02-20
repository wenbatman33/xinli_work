import { defHttp } from '/@/utils/http/axios';
import {
  GetChannelDepositParams,
  GetChannelDepositResultModel,
  PosthannelDepositData,
  GetChannelSingleChannelDepositParams,
  GetChannelSingleChannelDepositResultModel,
  PutChannelSingleChannelDepositNoteData,
} from './model/channelModel';

/**
 * Api urls
 */
enum Api {
  ChannelDeposit = '/backend/report/channel/deposit',
  ChannelSingleChannelDeposit = '/backend/report/channel/single_channel_deposit',
  ChannelSingleChannelDepositNote = '/backend/report/channel/single_channel_deposit_note',
}

/**
 * 取得進款統計報表
 * @param params Query params
 * @returns VAxios request promise
 */
export const getChannelDepositReport = (params?: GetChannelDepositParams) =>
  defHttp.get<GetChannelDepositResultModel>({
    url: Api.ChannelDeposit,
    params,
  });

/**
 * 重算進款統計報表: 若未指定reportHour，會重算一整天的時段
 * @param data Post data
 * @returns VAxios request promise
 */
export const postChannelDepositReport = (data?: PosthannelDepositData) =>
  defHttp.post<any>({
    url: Api.ChannelDeposit,
    data,
  });

/**
 * 取得單一線路進款表
 * @param params Query params
 * @returns VAxios request promise
 */
export const getChannelSingleChannelDepositReport = (
  params?: GetChannelSingleChannelDepositParams
) =>
  defHttp.get<GetChannelSingleChannelDepositResultModel>({
    url: Api.ChannelSingleChannelDeposit,
    params,
  });

/**
 * 變更單一線路進款表備註
 * @param data Put data
 * @returns VAxios request promise
 */
export const putChannelSingleChannelDepositNote = (data?: PutChannelSingleChannelDepositNoteData) =>
  defHttp.put<any>({
    url: Api.ChannelSingleChannelDepositNote,
    data,
  });
