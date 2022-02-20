// [GET] 取得佣金報表
export const getCommissionRecordAPI = params => axios.get('Agency/Commission/List', { params });

// [EDIT] 修改佣金狀態
export const editCommissionStatusAPI = data => axios.post('Agency/Commission/ChangeStatus', data);

// 派發佣金
export const payCommissionAPI = data => axios.post('Agency/Commission/PayCommission', data);

// [GET] 取得营运报表
export const getOperationRecordAPI = params => axios.get('ReportAgency/Operation', { params });

// [GET] 取得营运报表總計
export const getOperationRecordSumAPI = params => axios.get('ReportAgency/OperationSum', { params });

// [GET] 取得代理钱包日报
export const getWalletRecordAPI = params => axios.get('ReportAgency/UserCash', { params });

// [GET] 取得代理钱包日报总计
export const getWalletRecordSumAPI = params => axios.get('ReportAgency/UserCashSum', { params });

// [GET] 取得代理日報
export const getAgencyRecordAPI = params => axios.get('ReportAgency/DayReport', { params });

// [GET] 取得代理日報合计
export const getAgencyRecordSumAPI = params => axios.get('ReportAgency/DayReportSum', { params });
