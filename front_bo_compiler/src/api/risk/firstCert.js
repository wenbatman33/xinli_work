// [GET] 初審模塊
export const getFirstCert = params => axios.get('/RiskManager/FirstCert', { params });

// [GET] 此id審核通過
export const certThis = id => axios.get(`/RiskManager/CertThis/${id}`);

// [EDIT] 新增玩家備註
export const addCertNote = data => axios.post('/MemberNote', data);

// [POST] 會員異常檢測
export const filterSelection = params => axios.post('/RiskManager/Selection', params );
