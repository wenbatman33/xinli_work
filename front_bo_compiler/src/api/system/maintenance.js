// [GET] 取得全站跟存提維護數據
export const getMaintenanceAPI = () => axios.get('/Maintenance')

// [POST] 儲存全站跟存提維護數據
export const editMaintenanceAPI = params => axios.post('/Maintenance', params)

// [GET] /api/Maintenance/Sport
export const getSportMaintenanceAPI = () => axios.get('/Maintenance/Sport')

// [POST] 儲存體育維護數據
export const editSportMaintenanceAPI = params => axios.post('/Maintenance/Sport', params)
