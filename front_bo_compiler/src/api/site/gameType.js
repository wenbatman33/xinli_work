// [GET] 取得所有遊戲類型
export const getGameTypesAPI = params => axios.get('/BackendGameType', { params });

// [GET] 取得單一遊戲類型
export const getGameTypeAPI = id => axios.get(`/BackendGameType/${id}`);

// [EDIT] 修改遊戲類型
export const editGameTypeAPI = (id, data) => axios.post(`/BackendGameType/${id}`, data);
