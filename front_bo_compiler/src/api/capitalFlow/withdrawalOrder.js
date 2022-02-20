// [GET] 取得全部出款单
export const getWithdrawalOrdersAPI = params => axios.get('/Withdrawal', { params });

// [EDIT] 修改出款单备注
export const editWithdrawalOrderAPI = (id, data) => axios.patch(`/Withdrawal/Note/${id}`, data);

// [GET] 取得单笔出款单
export const getWithdrawalOrderAPI = id => axios.get(`/WithdrawOrderal/${id}`);

// [GET] 取得出款单 分單資訊
export const getWithdrawalOrderInfoAPI = id => axios.get(`/WithdrawOrder/SplitOrder/${id}`);

// [EDIT] 执行出款
export const runWithdrawalAPI = (id, data) => axios.patch(`/WithdrawOrder/SplitOrder/Run/${id}`, data);

// [EDIT] 设为失败
export const failWithdrawalAPI = id => axios.patch(`/WithdrawOrder/SplitOrder/Fail/${id}`);

// [EDIT] 整张设为失败
export const failAllWithdrawalAPI = (id, data) => axios.patch(`/Withdrawal/Fail/${id}`, data);

// [GET] 取得有代付
export const getAgentPayMerchantAPI = () => axios.get('/Withdrawal/GetAgentPayMerchant');
