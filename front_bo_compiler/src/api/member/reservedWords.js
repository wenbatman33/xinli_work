// [GET] 取得保留字列表
export const getReservedWordsAPI = () => axios.get('ReservedWord');

// [ADD] 新增保留字
export const addReservedWordAPI = data => axios.post('ReservedWord', data);

// [DELETE] 删除保留字
export const deleteReservedWordAPI = id => axios.delete(`ReservedWord/${id}`);

// [EDIT] 修改保留字
export const editReservedWordAPI = (id, data) => axios.patch(`ReservedWord/${id}`, data);
