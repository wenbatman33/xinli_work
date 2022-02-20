// [GET] 取得群組
export const getGroupsAPI = () => axios.get('/AdminAuth');

// [ADD] 新增群組
export const addGroupAPI = data => axios.post('/AdminAuth', data);

// [GET] 查詢單一群組 - id
export const getGroupAPI = id => axios.get(`/AdminAuth/${id}`);

// [EDIT] 修改群組資料
export const editGroupAPI = editData => axios.patch(`/AdminAuth/${editData.id}`, editData);
