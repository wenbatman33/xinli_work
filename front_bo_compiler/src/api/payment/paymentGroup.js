// [GET] 取得所有三方金流群組
export const getPaymentGroupsAPI = params => axios.get('/PayChannelGroup', { params });

// [ADD] 新增三方金流群组
export const addPaymentGroupAPI = data => axios.post('/PayChannelGroup', data);

// [EDIT] 编辑三方金流群组
export const editPaymentGroupAPI = (id, data) => axios.patch(`/PayChannelGroup/${id}`, data);

// [GET] 取得單一三方金流群組
export const getPaymentGroupAPI = id => axios.get(`/PayChannelGroup/${id}`);

// [GET] 取得 三方金流群组下所有通道
export const getPaymentChannelWithGroup = (id, params) => axios.get(`/PayChannelGroup/WithGroup/${id}`, { params });

// [GET] 取得 非 三方金流群组下所有通道
export const getPaymentChannelWithoutGroup = (id, params) => axios.get(`/PayChannelGroup/WithOutGroup/${id}`, { params });

// [DELETE] 将通道从指定三方金流群组移出
export const deleteChannelInGroupAPI = (id, data) => axios.delete(`/PayChannelGroup/Remove/${id}`, { data });

// [DELETE] 将通道从指定三方金流群组移出
export const addChannelIntoGroupAPI = (id, data) => axios.post(`/PayChannelGroup/Add/${id}`, data);
