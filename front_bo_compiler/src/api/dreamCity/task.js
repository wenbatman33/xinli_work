// [GET] 取得任務列表
export const getTasksAPI = params => axios.get('/Task', { params });

// [EDIT] 修改任务
export const editTaskAPI = (id, data) => axios.patch(`/Task/${id}`, data);

// [GET] 查看任务名单
export const getParticipationAPI = (id, params) => axios.get(`/Task/List/${id}`, { params });
