// 上傳圖片
export const uploadImageAPI = data => axios.post('/ImagesUpload', data);

// 修改密碼
export const editPasswordAPI = data => axios.post('AdminUser/ChangePassword', data);
