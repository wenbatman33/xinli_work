/**
 * 活動 - 召喚大神
 * 目前只有一種活動
 * */

// [GET] 取得排行榜
export const getRankAPI = params => axios.get('Event0001/Backend/LeaderBoard', { params });

// [GET] 取得赛事日期列表
export const getBetDateListAPI = () => axios.get('Event0001/Backend/GetMatchDateList');

// [GET] 取得赛事列表
export const getBetListAPI = params => axios.get('Event0001/Backend/Match', { params });

// [EDIT] 修改全部赛事状态
export const editAllBetStatusAPI = data => axios.post('Event0001/Backend/UpdateAllStatus', data);

// [EDIT] 修改赛事
export const editBetAPI = (id, data) => axios.patch(`Event0001/Backend/Match/${id}`, data);
