import axios from '@/axiosSetting';

// 前台 簡訊 ////////////////////////////////////////////////////////
// 發送簡訊認證 /Sms/Send
export const SmsSendAPI = payload => axios.post('/Sms/Send', payload);
// 驗證簡訊碼
export const SmsVerifyAPI = payload => axios.post('/Sms/Verify', payload);

// 前台 簡訊 ////////////////////////////////////////////////////////
// 新增會員銀行卡
export const BankCardAPI = payload => axios.post('/BankCard', payload);
// 預設銀行卡
export const BankCardDefaultAPI = payload => axios.patch('/BankCard/Default', payload);
// 銀行代碼列表
export const BankCardMapListAPI = () => axios.get('/BankCard/MapList');

// 前台 會員 ////////////////////////////////////////////////////////
// 邀請代理
export const InviteAgencyAPI = payload => axios.post('/Invite/Agency', payload);
// 邀請交易員
export const InviteTraderAPI = payload => axios.post('/Invite/Trader', payload);
// 個人主頁
export const MemberAPI = () => axios.get('/Member');
// 個人資訊
export const MemberInfoAPI = () => axios.get('/Member/Info');
// 重新綁定裝置
export const MembeDevicerReBindAPI = payload => axios.patch('/Member/Device/ReBind', payload);
// 修改下級分潤
export const MembeFeeAPI = payload => axios.patch('/Member/Fee', payload);
// 修改會員凍結狀態
export const MembeFrozenAPI = payload => axios.patch('/Member/Frozen', payload);

// 登入
export const MemberLoginAPI = payload => axios.post('/Member/Login', payload);
// 修改密碼
export const MemberPasswordAPI = payload => axios.patch('/Member/Password', payload);
// 修改密碼
export const MemberPasswordResetAPI = payload => axios.patch('/Member/Password/Reset', payload);
// 設定個人資料
export const MemberProfileAPI = payload => axios.patch('/Member/Profile', payload);
// 設定帳號密碼並啟用與綁定裝置
export const MemberRegisterAPI = payload => axios.post('/Member/Register', payload);
// 下級列表
export const MemberSubListAPI = () => axios.get('/Member/SubList');
// 上分點數
export const PointAssignAPI = payload => axios.post('/Point/Assign', payload);

// 訂單
export const MemberOderListAPI = payload => ((payload) ? axios.get(`/Order/Check?order_sn=${payload.order_sn}`) : axios.get('/Order/Check'));
// 點數記錄
export const MemberPointLogAPI = payload => axios.get(`/PointLog/GetLogList?current_page=${payload.current_page}&per_page=${payload.per_page}`);
