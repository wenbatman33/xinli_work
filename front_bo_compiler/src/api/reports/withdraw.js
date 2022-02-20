// [GET] 依人數取得存款報表
export const getWithdrawPeopleListReportAPI = params => axios.get('/ReportWithdraw/PeopleList', { params });

// [GET] 依人數取得存款報表總計
export const getWithdrawPeopleSumReportAPI = params => axios.get('/ReportWithdraw/PeopleSum', { params });

// [GET] 依金額區間取得存款報表
export const getWithdrawSpacingListReportAPI = params => axios.get('/ReportWithdraw/SpacingList', { params });

// [GET] 依金額區間取得存款報表總計
export const getWithdrawSpacingSumReportAPI = params => axios.get('/ReportWithdraw/SpacingSum', { params });

// [GET] 取得 唯一存款名單
export const getWithdrawUniPayMemberReportAPI = params => axios.get('/ReportWithdraw/UniPayMember', { params });
