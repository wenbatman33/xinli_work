export interface getListRequestModel {
  agencyID?: string;
  agencyAccount?: string;
  //帳號是否精確搜尋[1:模糊搜尋2:精確搜尋]
  exactlyMatching?: number;
  applyStartTime?: string;
  applyEndTime?: string;
  reviewStartTime?: string;
  reviewEndTime?: string;
  type: number;
  //帳號狀態[0全部1成功2拒絕3待審核]
  status?: number;
}
export interface operationModel {
  agencyID: number;
  amount: number;
  turnoverLimit: string;
  remark: string;
  type: number;
  refMemberID: string;
}
