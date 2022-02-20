// [GET] 取得卡商列表
export const getBankCardSupplierAPI = params => axios.get('/BankCardSupplier', { params });

// [ADD] 新增卡商
export const addBankCardSupplieAPI = data => axios.post('/BankCardSupplier', data);

// [GET] 取得單筆卡商資料
export const getSingleBankCardSupplierAPI = (id, params)  => axios.get(`/BankCardSupplier/${id}`, { params });

// [PATCH] 修改卡商
export const editBankCardSupplieAPI = (id, data) => axios.patch(`/BankCardSupplier/${id}`, data);
