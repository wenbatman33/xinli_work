// [GET] 取得全部PushManage
export const getPushManageAPI = params => axios.get('/PushManage', { params });

// [post] 新增PushManage
export const addPushManageAPI = params => axios.post('/PushManage', params);

// [delete] 刪除PushManage
export const deletePushManageAPI = id => axios.delete(`/PushManage/${id}`);

// [post] 修改PushManage
export const editPushManageAPI = (id, params) => axios.post(`/PushManage/Update/${id}`,  params);