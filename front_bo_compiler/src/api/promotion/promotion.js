// [GET] 取得所有優惠
export const getPromotionsAPI = params => axios.get('/Promotion', { params });

// [ADD] 新增優惠
export const addPromotionAPI = data => axios.post('Promotion', data);

// [GET] 取得單一優惠
export const getPromotionAPI = id => axios.get(`Promotion/${id}`);

// [EDIT] 修改優惠
export const editPromotionAPI = (id, data) => axios.post(`/Promotion/Update/${id}`, data);

// [GET] 取得目前在線上的優惠
export const getOnlinePromotionsAPI = () => axios.get('/Promotion/Online');

// [GET] 取得申请优惠名单
export const getApplyPromotionListAPI = params => axios.get('/Promotion/List', { params });

// [EDIT] 變更優惠狀態
export const changePromotionStatusAPI = (id, data) => axios.patch(`/Promotion/CheckStatus/${id}`, data);

// [GET] 取得獎勵類型 目前不用從 API 取得 直接寫死
export const getPromotionTypesAPI = () => {
  return Promise.resolve({
    data: {
      data: {
        1: '红利',
        2: '返水',
        3: '实体',
        4: '梦基金'
      }
    }
  })
}

// [GET] 取得 優惠類型(前台分類) 後端目前還未實作 未來需要可新增
export const getPromotionGroupsAPI = () => {
  return Promise.resolve({
    data: {
      data: {
        1: '节日',
        2: '体育',
        3: '真人',
        4: '棋牌',
        5: '电子',
        6: '彩票',
        7: 'VIP'
      }
    }
  })
}

// [GET] 取得优惠规则
export const getPromotionRulesAPI = () => axios.get('Promotion/Rule');

// [GET] 取得在线优惠
export const getCanPickPromotionsAPI = () => axios.get('Promotion/Online');
