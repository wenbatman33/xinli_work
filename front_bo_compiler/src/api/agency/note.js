// [GET] 根据代理id取得代理备注
export const getAgencyNoteAPI = id => axios.get(`Agency/MemberNote/GetByMember/${id}`);

// [ADD] 新增代理备注
export const addAgencyNoteAPI = data => axios.post('/Agency/MemberNote', data);
