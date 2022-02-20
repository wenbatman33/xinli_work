// [GET] 取得所有银行卡金流群組
export const getBankCardGroupsAPI = params => axios.get('/BankCardGroup', { params });

// [ADD] 新增银行卡金流群组
export const addBankCardGroupAPI = data => axios.post('/BankCardGroup', data);

// [EDIT] 编辑银行卡金流群组
export const editBankCardGroupAPI = (id, data) => axios.patch(`/BankCardGroup/${id}`, data);

// [GET] 取得單一银行卡金流群組
export const getBankCardGroupAPI = id => axios.get(`/BankCardGroup/${id}`);
