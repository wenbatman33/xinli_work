// [GET] 取得所有歡迎詞
export const getGreetingsListAPI = params => axios.get('/BackendGreetings', { params });

// [ADD] 新增歡迎詞
export const addGreetingsAPI = data => axios.post('/BackendGreetings', data);

// [EDIT] 編輯歡迎詞
export const editGreetingsAPI = (id, data) => axios.patch(`/BackendGreetings/${id}`, data);

// [EDIT] 修改歡迎詞狀態
export const editGreetingsStatusAPI = id => axios.get(`/BackendGreetings/ToggleStat/${id}`);

// [GET] 取得單一歡迎詞
export const getGreetingsAPI = id => axios.get(`/BackendGreetings/${id}`);

// [DELETE] 刪除歡迎詞
export const deleteGreetingsAPI = id => axios.delete(`/BackendGreetings/${id}`);

// [GET] 取得顯示時間區間 暫時固定 先寫進 code 裡 之後若要更動再由後台提供
export const getPeriodsAPI = () => {
  return Promise.resolve({
    data: {
      data: {
        1: {
          display: '早上',
          period: '03:00 - 09:59'
        },
        2: {
          display: '中午',
          period: '10:00 - 14:59'
        },
        3: {
          display: '下午',
          period: '15:00 - 20:59'
        },
        4: {
          display: '晚上',
          period: '21:00 - 02:59'
        },
        5: {
          display: '全日',
          period: ''
        }
      }
    }
  })
}
