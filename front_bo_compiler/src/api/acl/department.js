// [GET] 部門資訊
export const getDepartmentsAPI = () => axios.get('/AdminDept');

// [ADD] 部門
export const addDepartmentAPI = data => axios.post('/AdminDept', data);
