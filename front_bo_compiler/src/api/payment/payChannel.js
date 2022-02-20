// [GET] 取得所有通道
export const getChannelsAPI = params => axios.get('/PayChannel/Service', { params });
export const searchChannelsAPI = params => axios.get('/PayChannel/Service/Search', { params });

// [GET] 取得單一通道
export const getChannelAPI = id => axios.get(`PayChannel/Service/${id}`);

// [EDIT] 修改通道
export const editChannelAPI = (id, data) => axios.patch(`/PayChannel/Service/${id}`, data);

// [EDIT] 修改通道狀態
export const editChannelStatusAPI = id => axios.patch(`/PayChannel/Service/Status/${id}`);

// [GET] 取得 交易方式
export const getPayServiceListAPI = () => axios.get('/PayChannel/Service/ServiceCode');

// [GET] 取得 特定通道明細
export const getPayChannelTransLogAPI = (id, params) => axios.get(`/PayChannel/Service/TransLog/${id}`, params);

// [GET] 取得 特定通道明細統計資訊
export const getPayChannelStatisticAPI = (id, params) => axios.get(`/PayChannel/Service/Statistic/${id}`, params);