// [GET] 取得订单列表
export const getOrdersAPI = params => axios.get('GoodsOrder/List', { params });

// [GET] 取得訂單明細
export const getOrderDetailAPI = id => axios.get(`GoodsOrder/${id}`);

// [EDIT] 更改订单
export const editOrderAPI = (id, data) => axios.patch(`GoodsOrder/${id}`, data);

// 商品出货
export const shipGoodsAPI = data => axios.post('GoodsOrderDetail/Ship', data);
