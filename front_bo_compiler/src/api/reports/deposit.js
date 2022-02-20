// [GET] 依人數取得存款報表
export const getDepositPeopleListReportAPI = params => axios.get('/ReportDeposit/PeopleList', { params });

// [GET] 依人數取得存款報表總計
export const getDepositPeopleSumReportAPI = params => axios.get('/ReportDeposit/PeopleSum', { params });

// [GET] 依金額區間取得存款報表
export const getDepositSpacingListReportAPI = params => axios.get('/ReportDeposit/SpacingList', { params });

// [GET] 依金額區間取得存款報表總計
export const getDepositSpacingSumReportAPI = params => axios.get('/ReportDeposit/SpacingSum', { params });

// [GET] 取得 唯一存款名單
export const getDepositUniPayMemberReportAPI = params => axios.get('/ReportDeposit/UniPayMember', { params });
