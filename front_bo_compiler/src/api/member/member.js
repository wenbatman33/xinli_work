// [GET] 搜寻使用者
export const searchMemberAPI = keyword => axios.get(`/MemberSearch/${keyword}`);

// [GET] 取得所有使用者
export const getMembersAPI = params => axios.get('/BackendMember', { params });

// [GET] 取得單一使用者
export const getMemberAPI = id => axios.get(`/BackendMember/${id}`);

// [EDIT] 更改使用者密碼
export const editMemberPasswordAPI = (id, data) => axios.post(`/BackendMember/ChangePassword/${id}`, data);

// [EDIT] 修改玩家资料
export const editDetailAPI = {
  realname: (id, data) => axios.post(`/BackendMember/ChangeName/${id}`, data),     // 姓名
  birthday: (id, data) => axios.post(`/BackendMember/ChangeBirthday/${id}`, data), // 生日
  email: (id, data) => axios.post(`/BackendMember/ChangeEmail/${id}`, data),       // Email
  phone: (id, data) => axios.post(`/BackendMember/ChangePhone/${id}`, data),       // 电话
}

// [ADD] 新增玩家银行卡
export const addMemberBankCardAPI = data => axios.post('/BackendMember/BankCard', data);

// [EDIT] 修改玩家銀行卡
export const editMemberBankCardAPI = (id, data) => axios.patch(`/BackendMember/BankCard/${id}`, data);

// [EDIT] 根据银行卡id 设为预设卡
export const setDefaultBankCardAPI = id => axios.get(`/BackendMember/BankCard/SetDefault/${id}`);

// [DELETE] 根据银行卡id 移除银行卡资料
export const deleteMemberBankCardAPI = id => axios.delete(`/BackendMember/BankCard/${id}`);

// [GET] 取得驗證碼記錄
export const getMemberOtpListAPI = params => axios.get('/BackendMember/OtpList', { params });

// [GET] 取得玩家的群组
export const getMemberOwnGroupAPI = id => axios.get(`/MemberGroup/List/GetByMember/${id}`);

// [EDIT] 修改玩家提款限制
export const editMemberWithdrawLimitAPI = (id, data) => axios.patch(`/BackendMember/WithdrawLimit/${id}`, data);

// [GET] /api/BackendMember/MemberLoginLog
export const getMemberLoginLogAPI = params => axios.get('/BackendMember/MemberLoginLog', { params });

// [EDIT] 修改玩家提款限制
export const editMemberWithAPI = (id, data) => axios.patch(`/BackendMember/WithdrawLimit/${id}`, data);

// 冻结玩家
export const frozenMemberAPI = data => axios.post('BackendMember/FrozenChange', data);

// 批次冻结玩家
export const batchFrozenMemberAPI = data => axios.post('BackendMember/BatchFrozenChange', data);

// [EDIT] 修改玩家代理来源
export const editMemberAgencyAPI = (id, data) => axios.post(`BackendMember/ChangeAgency/${id}`, data);

// 刷新遊戲廠商餘額
export const refreshGameCashAPI = params => axios.get('GameBalance/Refresh', { params });

// 玩家存提开关
export const editMemberCashStatusAPI = (id, data) => axios.patch(`BackendMember/PaySetting/${id}`, data);

// 玩家存提批次开关
export const batchEditMemberCashStatusAPI = data => axios.post('BackendMember/Batch/PaySetting', data);

// 更新玩家遊戲登入鎖定
export const editMemberGameStatusAPI = data => axios.post('GameLoginLock/UpdateMemberLock', data);

// 取得待批次處理完家
export const getBatchMembersAPI = params => axios.get('BackendMember/SimpleMemberLogSelect', { params });
