// [GET] 取得所有 banner
export const getBannersAPI = params => axios.get('/Banner', { params });

// [ADD] 新增 banner
export const addBannerAPI = data => axios.post('/Banner', data);

// [GET] 取得單一 Banner
export const getBannerAPI = id => axios.get(`/Banner/${id}`);

// [EDIT] 修改 Banner
export const editBannerAPI = (id, data) => axios.post(`/Banner/Update/${id}`, data);

// [DELETE] 刪除 Banner
export const deleteBannerAPI = id => axios.delete(`/Banner/${id}`);

// [GET] 取得 Banner 位置, 目前無 API 先寫死
export const getBannerGroupAPI = () => {
  return Promise.resolve({
    data: {
      data: {
        1: '首页',
        2: '盖板',
        3: '游戏介绍页',
        4: '注册完成页',
        5: '登入影片',
        6: '代理线下',
      }
    }
  })
}
