// [GET] 取得代理申请列表
export const getAgencyApplyListAPI = params => axios.get('Agency/AgencyApply', { params });

// [EDIT] 更新代理申請狀態及備註
export const editAgencyApplyStatusAPI = (id, data) => axios.patch(`Agency/AgencyApply/${id}`, data);
