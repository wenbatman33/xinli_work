// [GET] 取得職稱
export const getJobsAPI = () => axios.get('AdminJob');

// [ADD] 職稱
export const addJobAPI = data => axios.post('/AdminJob', data);
