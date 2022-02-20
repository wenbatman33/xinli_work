// [GET] 後台使用者資料
export const getUsersAPI = params => axios.get('/AdminUser', { params });

// [ADD] 創建使用者
export const addUserAPI = insertData => axios.post('/AdminUser', insertData);

// [GET] 查詢單一使用者 - id
export const getUserAPI = id => axios.get(`/AdminUser/${id}`);

// [EDIT] 修改使用者
export const editUserAPI = editData => axios.patch(`/AdminUser/${editData.id}`, editData);

// [GET] 取得群組下所有使用者
export const getUsersByGroupAPI = params => axios.get('/AdminUser/AuthUser', { params });

// [GET] 取得非群組內所有使用者
export const getUsersByOtherGroupAPI = params => axios.get('/AdminUser/AuthUserExcept', { params });

// [GET] 取得使用者操作記錄
export const getUserActionLogAPI = params => axios.get('/AdminUser/GetUserActionLog', { params });
