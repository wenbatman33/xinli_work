// [GET] 取得全部存款單
export const getDepositOrdersAPI = params => axios.get('Agency/DepositOrder', { params });

// [GET] 取得存款单记录
export const getDepositOrdersLogAPI = params => axios.get('Agency/WithdrawOrder/TransLog', { params });

// [EDIT] 完成存款单
export const finishedDepositOrdersAPI = (id, data) => axios.patch(`Agency/DepositOrder/Success/${id}`, data);

// [EDIT] 失败存款单
export const failDepositOrdersAPI = (id, data) => axios.patch(`Agency/DepositOrder/Fail/${id}`, data);

// [EDIT] 修改存款单
export const editDepositOrderAPI = (id, data) => axios.patch(`Agency/DepositOrder/${id}`, data);

// [GET] 取得全部出款单
export const getWithdrawalOrdersAPI = params => axios.get('Agency/Withdrawal', { params });

// [EDIT] 修改出款单备注
export const editWithdrawalOrderAPI = (id, data) => axios.patch(`Agency/Withdrawal/Note/${id}`, data);

// [GET] 取得出款单 分單資訊
export const getWithdrawalOrderInfoAPI = id => axios.get(`Agency/WithdrawOrder/SplitOrder/${id}`);

// [EDIT] 执行出款
export const runWithdrawalAPI = (id, data) => axios.patch(`Agency/WithdrawOrder/SplitOrder/Run/${id}`, data);

// [EDIT] 设为失败
export const failWithdrawalAPI = id => axios.patch(`Agency/WithdrawOrder/SplitOrder/Fail/${id}`);

// [EDIT] 整张设为失败
export const failAllWithdrawalAPI = (id, data) => axios.patch(`Agency/Withdrawal/Fail/${id}`, data);

// [GET] 取得有代付
export const getAgentPayMerchantAPI = () => axios.get('Agency/Withdrawal/GetAgentPayMerchant');

// [GET] 取得全部提款单
export const getWithdrawOrdersAPI = params => axios.get('Agency/WithdrawOrder', { params });

// [GET] 取得提款单记录
export const getWithdrawOrderLogAPI = params => axios.get('Agency/WithdrawOrder/TransLog', { params });

// // [EDIT] 修改提款单
export const editWithdrawOrderAPI = (id, data) => axios.patch(`Agency/WithdrawOrder/${id}`, data);

// [GET] 取得单笔提款单
export const getWithdrawOrderAPI = id => axios.get(`Agency/WithdrawOrder/${id}`);

// [GET] 取得提款单info
export const getWithdrawOrderInfoAPI = id => axios.get(`Agency/WithdrawOrder/CheckInfo/${id}`);

// [EDIT] 操作提款单
 export const handleWithdrawOrderAPI = {
  success: id => axios.patch(`Agency/WithdrawOrder/Finance/Success/${id}`),                // 财务通过
  fail: (id, data) => axios.patch(`Agency/WithdrawOrder/Finance/Fail/${id}`, data),        // 财务退回
}
