// [GET] 取得所有商户
export const getMerchantsAPI = params => axios.get('/PayChannel', { params });

// [GET] 取得单一商户
export const getMerchantAPI = id => axios.get(`/PayChannel/${id}`);

// [EDIT] 更新商户
export const editMerchantAPI = (id, data) => axios.patch(`/PayChannel/${id}`, data);

// [ADD] 提交结算
export const settleMerchantAPI = (id, data) => axios.post(`/PayChannel/Settle/${id}`, data);

// [GET] 取得 特定商戶明細
export const getMerchantTransLogAPI = (id, params) => axios.get(`/PayChannel/TransLog/${id}`, params);

// [GET] 取得 特定商戶明細統計資訊
export const getMerchantStatisticAPI = (id, params) => axios.get(`/PayChannel/Statistic/${id}`, params);
