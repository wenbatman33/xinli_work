// [GET] 取得遊戲報表 - 日報
export const getDayBetReportAPI = params => axios.get('/ReportBet/Game/Day', { params });

// [GET] 取得遊戲報表 - 週報
export const getWeekBetReportAPI = params => axios.get('/ReportBet/Game/Week', { params });

// [GET] 取得遊戲報表 - 月報
export const getMonthBetReportAPI = params => axios.get('/ReportBet/Game/Month', { params });

// [GET] 取得唯一投注人數
export const getBetReportUniqueBetMemberCntAPI = params => axios.get('/ReportBet/UniqueBetMemberCnt', { params });

// [GET] 取得報表最後更新時間
export const getBetReportReportMaxUpdatedAtAPI = () => axios.get('/ReportBet/ReportMaxUpdatedAt');

// [GET] 依據類別取得廠商和遊戲
export const getBetReportGameListAPI = params => axios.get('/ReportBet/GameList', { params });