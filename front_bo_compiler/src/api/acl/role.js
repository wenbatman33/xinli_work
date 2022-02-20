// [GET] 群組列表
export const getRolesAPI = searchData => axios.get('/AdminAuth', { params: searchData });

// [ADD] 創建群組
export const addRoleAPI = insertData => axios.post('/AdminAuth', insertData);
