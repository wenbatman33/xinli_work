// [GET] 取得竟猜列表
export const getBetListAPI = params => axios.get('Task/Game', { params });

// [GET] 取得賽事類型
export const getTypesAPI = () => axios.get('Task/Game/Type');

// [GET] 取得竞猜類型
export const getBetTypesAPI = () => axios.get('Task/Game/BetType');

// [ADD] 新增竞猜
export const addBetAPI = data => axios.post('Task/Game', data);

// [EDIT] 修改竟猜
export const editBetAPI = (id, data) => axios.patch(`Task/Game/${id}`, data);

// [EDIT] 修改竟猜结果
export const editBetWinAPI = (id, data) => axios.patch(`Task/Game/Win/${id}`, data)

// 取消竟猜
export const cancelBetAPI = (id, data) => axios.patch(`TaskGame/Cancel/${id}`, data);

// 派发梦基金
export const givePointAPI = id => axios.patch(`TaskGame/Give/${id}`);

// 竟猜排行
export const getRankAPI = params => axios.get('Reports/Game/Task/BetRank', { params });

// 竟猜排行会员投注资料
export const getRankDetailAPI = params => axios.get('Reports/Game/Task/BetRankData', { params });
