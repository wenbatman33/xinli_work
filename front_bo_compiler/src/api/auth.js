// [登入] 帳號密碼登入
export const loginAPI = loginData => axios.post('/AdminUser/Login', loginData);

// [登入] google 登入
export const GoogleLoginAPI = accessToken => axios.post('/AdminUser/AuthorizeGmail', accessToken);

// [重設密碼]
export const resetPasswordAPI = data => axios.post('AdminUser/ResetPassSubmit', data);

// [寄送重設密碼信]
export const sendResetPasswordMailAPI = data => axios.post('AdminUser/SendResetMail', data);

// [檢查重設密碼key]
export const checkResetKeyAPI = data => axios.post('AdminUser/CheckResetKey', data);

// [指定id发送重置密码信]
export const sendResetPasswordMailByAdminAPI = data => axios.post('AdminUser/SendResetMailAdmin', data);
