// [GET] 夢基金錢包紀錄
export const getCashLogAPI = params => axios.get('Task/Member/PointLog', { params });

// [GET] 夢基金日報
export const getDreamCashRecordAPI = params => axios.get('Reports/PointDay', { params });

// [GET] 夢基金日報
export const getDateDreamCashRecordAPI = (date, params) => axios.get(`Reports/PointDay/${date}`, { params });

// [GET] 取得竟猜日报
export const getBetRecordAPI = params => axios.get('Reports/Month/Task/Bet', { params });

// [GET] 取得竟猜日报合计
export const getBetRecordTotalAPI = params => axios.get('Reports/Month/Task/Bet/Sum', { params });

// [GET] 取得特定日期 竟猜日报
export const getTimeBetRecordAPI = params => axios.get('Reports/Day/Task/Bet', { params });

// [GET] 取得特定日期 竟猜日报合计
export const getTimeBetRecordTotalAPI = params => axios.get('Reports/Day/Task/Bet/Sum', { params });

// [GET] 取得特定日期 竟猜日报
export const getGameBetRecordAPI = params => axios.get('Reports/Game/Task/Bet', { params });

// [GET] 取得特定日期 竟猜日报合计
export const getGameBetRecordTotalAPI = params => axios.get('Reports/Game/Task/Bet/Sum', { params });

// [GET] 任务日报
export const getTaskRecordAPI = params => axios.get('Reports/Task', { params });

// [GET] 任务日报 - 完成任一任务
export const getCompletedAnyTaskAPI = params => axios.get('Reports/MissionByList/ByMission', { params })

// [GET] 任务日报 - 完成N项任务人数
export const getCompletedTaskCountAPI = (count, params) => axios.get(`Reports/MissionByList/ByFinishList/${count}`, { params });

// [GET] 任务日报 - 完成特定任务人数
export const getCompletedTaskAPI = params => axios.get('Reports/MissionByList/ByFinish', { params });
