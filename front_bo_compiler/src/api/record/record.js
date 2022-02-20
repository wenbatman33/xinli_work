// [GET] 會員遊戲紀錄遊戲總表合計
export const getMemberBetRecordAllSumAPI = params => axios.get('/ReportBet/AllSum', { params });

// [GET] 會員遊戲紀錄遊戲總表
export const getMemberBetRecordAllAPI = params => axios.get('/ReportBet/All', { params });

// [GET] 會員各平台遊戲紀錄合計
export const getMemberBetRecordGameGroupSumAPI = params => axios.get('/ReportBet/GameGroupSum', { params });

// [GET] 會員各平台遊戲紀錄
export const getMemberBetRecordGameGroupAPI = params => axios.get('/ReportBet/GameGroup', { params });

// [GET] 存提款記錄
export const getMemberCashRecordPaymentAPI = (id, params) => axios.get(`/CashRecord/Payment/${id}`, { params });

// [GET] 存提款記錄統計
export const getMemberCashRecordPaymentSumAPI = (id, params) => axios.get(`/CashRecord/PaymentSum/${id}`, { params });

// [GET] 優惠紀錄
export const getMemberCashRecordPromotionAPI = (id, params) => axios.get(`/CashRecord/Promotion/${id}`, { params });

// [GET] 優惠紀錄統計
export const getMemberCashRecordPromotionSumAPI = (id, params) => axios.get(`/CashRecord/PromotionSum/${id}`, { params });

// [GET] 存款与优惠概况
export const getCashOverviewAPI = params => axios.get('CashRecord', { params });

// [GET] 會員錢包紀錄
export const getMemberWalletRecordAPI = (id, params) => axios.get(`/CashRecord/CashLog/${id}`, { params });
