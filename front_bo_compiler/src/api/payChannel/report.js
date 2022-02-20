// [GET] 取得存款\出款卡 報表
export const getReportBankCard = params => axios.get(`/Reports/ReportBankCard?date=${params.date}&card_type=${params.card_type}`);

// [GET] 取得存款\出款卡 報表
export const getReportBankCardChart = params => axios.get(`/Reports/ReportBankCard/${params.date}?card_type=${params.card_type}`);

// [GET] 取得銀行卡類型匯總表
export const getReportBankCardTotal = params => axios.get(`/Reports/ReportBankCardTotal?date=${params.date}&card_type=${params.card_type}`);

// [GET] 取得銀行卡類型匯總表 by Date
export const getReportBankCardTotalByDate = params => axios.get(`/Reports/ReportBankCardTotal/${params.date}?card_type=${params.card_type}`);

// [GET] 取得三方金流報表
export const getReport = params => axios.get(`/Report/Third?year=${params.year}&month=${params.month}`);