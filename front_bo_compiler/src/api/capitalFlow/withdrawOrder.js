// [GET] 取得全部提款单
export const getWithdrawOrdersAPI = params => axios.get('/WithdrawOrder', { params });

// [GET] 取得提款单记录
export const getWithdrawOrderLogAPI = params => axios.get('/WithdrawOrder/TransLog', { params });

// // [EDIT] 修改提款单
export const editWithdrawOrderAPI = (id, data) => axios.patch(`/WithdrawOrder/${id}`, data);

// [GET] 取得单笔提款单
export const getWithdrawOrderAPI = id => axios.get(`/WithdrawOrder/${id}`);

// [GET] 取得提款单info
export const getWithdrawOrderInfoAPI = id => axios.get(`/WithdrawOrder/CheckInfo/${id}`);

// [EDIT] 操作提款单
export const handleWithdrawOrderAPI = {
  success: id => axios.patch(`/WithdrawOrder/Finance/Success/${id}`),                // 财务通过
  fail: (id, data) => axios.patch(`/WithdrawOrder/Finance/Fail/${id}`, data),        // 财务退回
  pass: (id, data) => axios.patch(`/WithdrawOrder/PassToRisk/${id}`, data),          // 财务通过 移交风控
  riskSuccess: (id, data) => axios.patch(`/WithdrawOrder/Risk/Success/${id}`, data), // 风控通过
  riskFail: (id, data) => axios.patch(`/WithdrawOrder/Risk/Fail/${id}`, data)        // 风控退回
}

// [GET] 取得提款單會員資金明細
export const getWithdrawOrderCashLogAPI = params => axios.get('/WithdrawOrder/Cashlog', { params });

// [GET] 取得風控提款單
export const getRiskWithdrawOrdersAPI = params => axios.get('/WithdrawOrder/Risk', { params });
