// [GET] 取得全部AppVersion
export const getAppVersionAPI = params => axios.get('/AppVersion', { params })

// [GET] 新增AppVersion
export const addAppVersionAPI = params => axios.post('/AppVersion', params )

// [GET] 取得全部AppVersion
export const editAppVersionAPI = (id, params) => axios.post(`/AppVersion/Update/${id}`, params)
