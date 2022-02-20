// [GET] 取得玩家報表
export const getMemberReportAPI = params => axios.get('/Reports/MemberReport', { params });

// [GET] 取得玩家報表總計
export const getMemberReportTotalAPI = params => axios.get('/Reports/MemberReport/GetTotal', { params });

// [GET] 取得玩家報表 - 註冊會員列表
export const getMemberReportSignUpMemberAPI = params => axios.get('/Reports/MemberReport/GetSignUpMember', { params });

// [GET] 取得玩家報表 - 註冊會員且首存列表
export const getMemberReportSignUpDepositMemberAPI = params => axios.get('/Reports/MemberReport/GetSignUpDepositMember', { params });

// [GET] 取得玩家報表 - 非註冊會員且首存列表
export const getMemberReportNotSignUpDepositMemberAPI = params => axios.get('/Reports/MemberReport/GetDepositNotSignUpMember', { params });

// [GET] 取得玩家報表 - 活躍會員列表
export const getMemberReportActiveMember = params => axios.get('/Reports/MemberReport/GetActiveMember', { params });