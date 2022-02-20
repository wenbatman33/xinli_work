// [GET] 取得跳轉資料
export const getRedirectAPI = () => axios.get('Event0002/Backend/GetPageJump');

// [EDIT] 更新跳转资料
export const editRedirectAPI = data => axios.post('Event0002/Backend/UpdatePageJump', data);

// [GET] 取得活动列表
export const getEventListAPI = params => axios.get('Event0002/Backend/EventPage', { params });

// [ADD] 新增活动
export const addEventAPI = data => axios.post('Event0002/Backend/EventPage', data);

// [EDIT] 更新活动资料
export const editEventAPI = (id, data) => axios.post(`Event0002/Backend/EventPage/Update/${id}`, data);

// [GET] 取得報名資料
export const getJoinListAPI = params => axios.get('Event0002/Backend/GetRegList', { params });

// [GET] 活動統計報表
export const getReportAPI = params => axios.get('Reports/OfflineEvent', { params });

// [GET] 活動匯總表
export const getReportEventAPI = params => axios.get('Reports/OfflineEventList', { params });

// [GET] 活動明細
export const getEventDetailAPI = (id, params) => axios.get(`Reports/OfflineEventDetail/${id}`, { params });
