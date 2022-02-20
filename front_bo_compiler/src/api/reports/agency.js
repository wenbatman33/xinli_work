// [GET] 取得代理会员
export const getAgencyMemberAPI = params => axios.get('ReportAgency/Member', { params });

// [GET] 取得代理会员流水记录
export const getAgencyMemberWalletAPI = params => axios.get('BackendMember/Betting', { params });
