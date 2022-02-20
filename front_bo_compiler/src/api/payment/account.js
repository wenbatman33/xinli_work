// [GET] 取得所有科目
export const getAccountListAPI = params => axios.get('/PayChannelAccTitle', { params });

// [ADD] 新增科目
export const addAccountAPI = data => axios.post('/PayChannelAccTitle', data);

// [EDIT] 修改科目
export const editAccountAPI = (id, data) => axios.patch(`/PayChannelAccTitle/${id}`, data);
