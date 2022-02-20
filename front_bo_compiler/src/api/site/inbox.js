// [GET] 取得所有站内信
export const getInboxesAPI = params => axios.get('/MemberInbox', { params });

// [ADD] 新增站内信
export const addInboxAPI = data => axios.post('/MemberInbox', data);

// [GET] 取得單一站内信
export const getInboxAPI = id => axios.get(`/MemberInbox/${id}`);

// [EDIT] 修改站内信
export const editInboxAPI = (id, data) => axios.patch(`/MemberInbox/${id}`, data);

// [DELETE] 刪除站内信
export const deleteInboxAPI = id => axios.delete(`/MemberInbox/${id}`);

// [GET] 取得站內信類型, 目前無 API 先寫死
export const getInboxTypesAPI = () => {
  return Promise.resolve({
    data: {
      data: {
        1: '會員通知',
        2: '活動通知',
        3: '優惠通知',
        4: '風險通知',
        5: '客服通知',
        6: '出入款通知',
        7: '系統通知',
        8: '其他',
      }
    }
  })
}
