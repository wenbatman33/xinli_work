// [GET] 取得所有银行卡
export const getBankCardsAPI = params => axios.get('/BankCard', { params });

// [DELETE] 將銀行卡移出 銀行卡群組
export const deleteBankCardInGroupAPI = (id, data) => axios.patch(`/BankCard/LeaveGroup/${id}`, data);

// [ADD] 將銀行卡加入 銀行卡群組
export const addBankCardIntoGroupAPI = (id, data) => axios.patch(`/BankCard/AddGroup/${id}`, data);

// [ADD] 新增银行卡
export const addBankCard = data => axios.post('/BankCard', data);

// [GET] 取得单一银行卡
export const getBankCardAPI = id => axios.get(`BankCard/${id}`);

// [EDIT] 编辑银行卡
export const editBankCardAPI = (id, data) => axios.patch(`/BankCard/${id}`, data);

// [GET] 取得可转入群组及银行卡
export const getCanTransferBankCardAPI = id => axios.get(`/BankCardGroup/TransOutGroup/${id}`);

// [EDIT] 启用/停用 银行卡
export const editBankCardStatusAPI = id => axios.patch(`/BankCard/Status/${id}`);

// [EDIT] 上架/下架 银行卡
export const editBankCardShowAPI = id => axios.patch(`/BankCard/Show/${id}`);

// [EDIT] 冻结
export const frozenBankCardAPI = (id, data) => axios.patch(`/BankCard/Frozen/${id}`, data);

// [EDIT] 异动
export const changeBankCardAPI = (id, data) => axios.patch(`/BankCard/Change/${id}`, data);

// [EDIT] 转帐 中轉
export const transferBankCardAPI = (id, data) => axios.patch(`/BankCard/Transfer/${id}`, data);

// [EDIT] 转帐 三方轉
export const depositThirdBankCardAPI = (id, data) => axios.patch(`/BankCard/DepositThird/${id}`, data);

// [GET] 取得银行列表
export const getBanksAPI = () => axios.get('/BankCode/MappingList');

// [GET] 根据异动单id 取得异动单内容
export const getChangeAPI = id => axios.get(`/BankCardLog/${id}`);

// [GET] 根據銀行卡id 取得銀行卡明細
export const getBankCardTransLogAPI = (id, time) => axios.get(`/BankCard/TransLog/${id}`, time);

// [GET] 根據銀行卡id 取得銀行卡明細統計資訊
export const getBankCardStatisticAPI = (id, time) => axios.get(`/BankCard/Statistic/${id}`, time);
