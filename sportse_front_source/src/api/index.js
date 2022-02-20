import axios from '@/axiosSetting';

// 首頁 前台_ALL_登入 ////////////////////////////////////////////////////////
// 註冊
export const signUpAPI = payload => axios.post('/api/Frontend/Member/SignUp', payload);
// 登入
export const loginAPI = payload => axios.post('/api/Frontend/Member/Login', payload);
// 登出
export const logoutAPI = () => axios.get('/api/Frontend/Member/Logout');

// 首頁 前台_ALL_我的 ////////////////////////////////////////////////////////
// 取得銀行卡
export const memberBankCardAPI = () => axios.get('/api/Frontend/Member/BankCard');
// 新增銀行卡
export const addMemberBankCardAPI = payload => axios.post('/api/Frontend/Member/BankCard', payload);
// 取得會員資料
export const memberPersonalAPI = () => axios.get('/api/Frontend/Member/Personal');
// 修改姓名
export const memberRealnameAPI = payload => axios.patch('/api/Frontend/Member/Realname', payload);
// 修改姓名
export const memberPhoneAPI = payload => axios.patch('/api/Frontend/Member/Phone', payload);
// 修改密碼
export const memberPasswordAPI = payload => axios.patch('/api/Frontend/Member/Password', payload);

// 首頁 前台_ALL_存款 ////////////////////////////////////////////////////////
// 存款
export const depositAPI = payload => axios.post('/api/Frontend/Payment/Deposit', payload);
// 提款
export const withdrawAPI = payload => axios.post('/api/Frontend/Payment/Withdraw', payload);
// 交易清單
export const paymentOrderAPI = payload => axios.get(`/api/Frontend/Payment/PaymentOrder?type=${payload.type}&dateType=${payload.dateType}`);
// 交易清單 byID
export const paymentOrderByIdAPI = id => axios.get(`/api/Frontend/Payment/PaymentOrder?id=${id}`);

// 首頁 前台_ALL_錢包 ////////////////////////////////////////////////////////
// 錢包明細
export const walletAPI = () => axios.get('/api/Frontend/Payment/Wallet');

// 首頁 前台_ALL_熱門賽事
export const getHotMatchAPI = () => axios.get('/api/Frontend/Match/HotMatch');
// 賽事列表 前台_ALL_賽事列表
export const getMatchForTimeAPI = () => axios.get('/api/Frontend/Match/MatchForTime');
// 賽事列表 前台_ALL_賽事列表
export const getMatchForNameAPI = () => axios.get('/api/Frontend/Match/MatchForName');
// 賽事內容 前台_ALL_賽事內容 by ID
export const getMatchDataAPI = id => axios.get(`/api/Frontend/Match/MatchData/${id}`);

// 投注單 前台_ALL_投注單
export const matchBetAPI = payload => axios.post('/api/Frontend/Match/Bet', payload);

// 投注紀錄 前台_ALL_投注紀錄
// 投注紀錄
export const MatchBetLogAPI = payload => axios.get(`/api/Frontend/Match/BetLog?status=${payload.status}&dateMode=${payload.dateMode}`);
// 投注紀錄合計
export const MatchBetLogSumAPI = payload => axios.get(`/api/Frontend/Match/BetLogSum?dateMode=${payload.dateMode}`);

// 首頁 前台_ALL_優惠
// 優惠列表
export const getBannerAPI = () => axios.get('/api/Frontend/Operation/Banner');
// 優惠說明
export const getBannerByIdAPI = id => axios.get(`/api/Frontend/Operation/Banner/${id}`);

// 首頁 前台_ALL_公告
// 公告列表
export const getNewsAPI = () => axios.get('/api/Frontend/Operation/News');
// 公告說明
export const getNewsByIdAPI = id => axios.get(`/api/Frontend/Operation/News/${id}`);
// 類型列表
export const getNewsTypeAPI = () => axios.get('/api/Frontend/Operation/NewsType');
