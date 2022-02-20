//---------
//  關係圖
//---------
//  Item (後端預設建立)
//    ↓
//  Type
//    ↓
//  Group
//    ↓
//  List (Member)

// [GET] 取得所有類型
export const getMemberGroupTypesAPI = params => axios.get('/MemberGroup/Type', { params });

// [ADD] 新增類型
export const addMemberGroupTypeAPI = data => axios.post('/MemberGroup/Type', data);

// [GET] 取得單一類型
export const getMemberGroupTypeAPI = id => axios.get(`/MemberGroup/Type/${id}`);

// [EDIT] 修改類型
export const editMemberGroupTypeAPI = (id, data) => axios.patch(`/MemberGroup/Type/${id}`, data);

// [GET] 取得 item
export const getMemberGroupItemAPI = () => axios.get('/MemberGroup/Type/GetItemList');

// [GET] 取得 Type 下所有 Member
export const getMemberGroupTypeMemberAPI = id => axios.get(`/MemberGroup/Type/GetMemberList/${id}`);

// [GET] 取得 Group 下所有 Member
export const getMemberGroupGroupMemberAPI = id => axios.get(`/MemberGroup/Group/GetMemberList/${id}`);

// [DELETE] 移除 Group 下的 member
export const deleteMemberGroupMemberAPI = id => axios.delete(`/MemberGroup/List/${id}`);

// [GET] 根據 type 取得 Group
export const getMemberGroupGroupByTypeAPI = (typeId, params) => axios.get(`/MemberGroup/Group/GetByType/${typeId}`, { params });

// [ADD] 新增群組
export const addMemberGroupGroupAPI = data => axios.post('/MemberGroup/Group', data);

// [EDIT] 修改群組
export const editMemberGroupGroupAPI = (id, data) => axios.patch(`/MemberGroup/Group/${id}`, data);

// [GET] 取得所有 Type 與 Group 列表
export const getMemeberGroupFullListAPI = (member_id, params) => axios.get(`MemberGroup/Type/GetFullList${member_id ? '/' + member_id : ''}`, { params });

export const addMemberGroupToMemberAPI = data => axios.post('/MemberGroup/List', data);

// 批次增加玩家群組
export const batchAddMemberGroupAPI = data => axios.post('MemberGroup/List/AddBatch', data);

// 批次移除玩家群組
export const batchRemoveMemberGroupAPI = data => axios.post('MemberGroup/List/DeleteBatch', data);
