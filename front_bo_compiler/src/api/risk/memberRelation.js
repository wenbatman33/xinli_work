// [GET] 取得玩家关连装置分析
export const getRelationAPI = params => axios.get('BackendMember/MemberLoginLogAnalysis', { params });
