export interface GetHourListModel {
  /**
   * 報表日期:開始
   */
  reportDateStart: string;

  /**
   * 報表日期：結束
   */
  reportDateEnd: string;

  /**
   * 報表時段:開始
   */
  reportHourStart: string;

  /**
   * 報表時段：結束
   */
  reportHourEnd: string;

  /**
   * 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关]
   */
  serviceCode?: string;
  payChannelNameID? :number;
  payChannelName?: string;
  payChannelID?: number;
  payChannelSn?: string;
  balanceDiff?: boolean;
  balanceChange?: boolean;
}

export interface NoteModel {
  id: number;
  note: string;
}