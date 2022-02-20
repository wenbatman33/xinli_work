// [GET] 取得所有公告
export const getNewsListAPI = params => axios.get('/News', { params });

// [ADD] 新增公告
export const addNewsAPI = data => axios.post('/News', data);

// [GET] 取得單一公告
export const getNewsAPI = id => axios.get(`/News/${id}`);

// [EDIT] 修改公告
export const editNewsAPI = (id, data) => axios.patch(`/News/${id}`, data);

// [DELETE] 刪除公告
export const deleteNewsAPI = id => axios.delete(`/News/${id}`);
