// [GET] 取得權限清單
export const getPermissionListAPI = () => axios.get('/AdminFunction/GetFullStruct');

// [GET] 取得隱藏欄位清單
export const getFieldsAPI = () => axios.get('/AdminColumnName');

// [GET] 取得群組權限
export const getPermissionByGroupAPI = groupId => axios.get(`/AdminAuth/GetUserAuth/${groupId}`);

// [EDIT] 編輯群組權限
export const updatePermissionByGroupAPI = (id, data) =>  axios.patch(`/AdminAuth/AuthSetting/${id}`, data);

// [GET] 取得登入者當前頁面權限
export const getPermissionAPI = () => axios.get('/AdminAuth/GetPageAuth');
