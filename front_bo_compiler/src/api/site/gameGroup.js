// [GET] 取得所有遊戲廠商
export const getGameGroupsAPI = params => axios.get('/BackendGameGroup', { params });

// [ADD] 新增遊戲廠商
export const addGameGroupAPI = data => axios.post('BackendGameGroup', data);

// [GET] 取得單一遊戲廠商
export const getGameGroupAPI = id => axios.get(`/BackendGameGroup/${id}`);

// [EDIT] 修改遊戲廠商
export const editGameGroupAPI = (id, data) => axios.post(`/BackendGameGroup/${id}`, data);
