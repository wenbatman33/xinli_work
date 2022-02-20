// [GET] 取得营运报表
export const getBusinessReportAPI = params => axios.get('/Reports/BusinessReport', { params });

// [GET] 取得营运报表 总计
export const getBusinessReportTotalAPI = params => axios.get('/Reports/BusinessReport/GetTotal', { params });

// [GET] 取得 报表相关会员
export const getBusinessReportMemberAPI = {
  singUp: params => axios.get('/Reports/BusinessReport/GetSignUpMember', { params }),
  activeMember: params => axios.get('/Reports/BusinessReport/GetActiveMember', { params }),
  memberCnt: params => axios.get('/Reports/BusinessReport/GetDistinctBetMember', { params }),
  depositMember: params => axios.get('/Reports/BusinessReport/GetSignUpDepositMember', { params }),
}

// [GET] 取得红利金额列表
export const getBusinessReportBonusListAPI = params => axios.get('/Reports/BusinessReport/GetBonusList', { params });

// [GET] 根據遊戲種類取得營運報表
export const getBusinessReportByTypeAPI = {
  table: params => axios.get('/Reports/BusinessReport/GetGameTypeReport', { params }),
  total: params => axios.get('/Reports/BusinessReport/GetGameTypeReportTotal', { params }),
}

// [GET] 根據遊戲厂商取得營運報表
export const getBusinessReportByGroupAPI = {
  table: params => axios.get('/Reports/BusinessReport/GetGameGroupReport', { params }),
  total: params => axios.get('/Reports/BusinessReport/GetGameGroupReportTotal', { params }),
}
