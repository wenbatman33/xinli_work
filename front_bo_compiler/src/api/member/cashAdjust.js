// [GET] 资金调整审核列表
export const getAdjustListAPI = params => axios.get('CashAdjust', { params });

export const handleAdjustAPI = {
  pass: id => axios.patch(`CashAdjust/Pass/${id}`),    // 通过
  reject: id => axios.patch(`CashAdjust/Reject/${id}`) // 拒绝
}

// [ADD] 新增玩家资金调整
export const addAdjustAPI = data => axios.post('CashAdjust', data);

// [ADD] 新增存单错误调整
export const addDepositAdjustAPI = data => axios.post('CashAdjust/Deposit', data);

// [ADD] 新增梦基金点数调整
export const addAdjustPointAPI = data => axios.post('UserPoint/Adjust', data);
