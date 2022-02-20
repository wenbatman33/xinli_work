// [GET] 取得所有遊戲
export const getGamesAPI = params => axios.get('/BackendGameList', { params });

// [ADD] 新增遊戲
export const addGameAPI = data => axios.post('/BackendGameList', data);

// [GET] 取得單一遊戲
export const getGameAPI = id => axios.get(`/BackendGameList/${id}`);

// [EDIT] 修改遊戲
export const editGameAPI = (id, data) => axios.post(`/BackendGameList/${id}`, data);

// [GET] 取得遊戲標籤列表
export const getGameTagsAPI = () =>axios.get('/BackendGameList/GetTagList');
