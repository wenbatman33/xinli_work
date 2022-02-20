// [GET] 取得全部存款單
export const getDepositOrdersAPI = params => axios.get('/DepositOrder', { params });

// [GET] 取得存款单记录
export const getDepositOrdersLogAPI = params => axios.get('/WithdrawOrder/TransLog', { params });

// [EDIT] 完成存款单
export const finishedDepositOrdersAPI = (id, data) => axios.patch(`/DepositOrder/Success/${id}`, data);

// [EDIT] 失败存款单
export const failDepositOrdersAPI = (id, data) => axios.patch(`/DepositOrder/Fail/${id}`, data);

// [EDIT] 修改存款单
export const editDepositOrderAPI = (id, data) => axios.patch(`/DepositOrder/${id}`, data);

// [EDIT] 连结异动单
export const depositOrderLinkChangeAPI = (id, data) => axios.patch(`/DepositOrder/LinkChange/${id}`, data);
