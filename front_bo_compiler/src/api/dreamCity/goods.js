// [GET] 取得商品列表
export const getGoodsListAPI = params => axios.get('/Goods', { params });

// [ADD] 新增商品
export const addGoodsAPI = data => axios.post('/Goods', data);

// [EDIT] 更新商品
export const editGoodsAPI = (id, data) => axios.patch(`/Goods/${id}`, data);

// [GET] 查看商品更換清單
export const getGoodsBuyersAPI = params => axios.get('/GoodsOrderDetail', { params });
