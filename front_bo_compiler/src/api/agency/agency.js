// [GET] 取得代理列表
export const getAgenciesAPI = params => axios.get('Agency/MemberInfo', { params });

// [GET] 取得单一代理
export const getAgencyAPI = (id, params) => axios.get(`Agency/MemberInfo/${id}`, params );

// [GET] 取得代理登入记录
export const getAgencyLoginLogAPI = params => axios.get('Agency/MemberLoginLog', { params });

// [ADD] 新增代理
export const addAgencyAPI = data => axios.post('Agency/MemberInfo', data);

// [EDIT] 修改代理
export const editAgencyAPI = (id, data) => axios.patch(`Agency/MemberInfo/${id}`, data);

// [GET] 取得代理佣金比例设定状态
export const getAgencyCommissionAPI = id => axios.get(`Agency/Commission/GetCommissionModify/${id}`);

// [EDIT] 修改代理佣金比例
export const editAgencyCommissionAPI = (id, data) => axios.patch(`Agency/Commission/SetCommissionModify/${id}`, data);

// [EDIT] 代理资金调整
export const agencyCashAdjustAPI = data => axios.post('Agency/CashAdjust', data);

// [EDIT] 修改代理金流群組
export const editAgencyCashGroupAPI = (id, data) => axios.patch(`Agency/Group/${id}`, data);
