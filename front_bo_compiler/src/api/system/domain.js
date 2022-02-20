// [GET] 取得网域列表
export const getDomainsAPI = params => axios.get('Domain', { params });

// [ADD] 新增网域
export const addDomainAPI = data => axios.post('Domain', data);

// [EDIT] 修改网域
export const editDomainAPI = (id, data) => axios.patch(`Domain/${id}`, data);
