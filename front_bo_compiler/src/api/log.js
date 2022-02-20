// [GET] 取得修改记录
export const getUpdateLogsAPI = params => axios.get('/AdminLog/GetLog', { params });

// [GET] 取得玩家操作记录
export const getMemberUseLogAPI = params => axios.get('/AdminLog/GetMemberLog', { params });

// [GET] 取得後台使用者操作記錄
export const getAdminUserUseLogAPI = params => axios.get('/AdminLog/GetAdminLog', { params });

// ---- logGroupId ----
//
// {
//     "id": 1,
//     "table_name": "Frontend.Banner",
//     "table_description": "營運管理\\Banner管理",
//     "table_primary": ""
// },
// {
//     "id": 2,
//     "table_name": "Frontend.News",
//     "table_description": "營運管理\\公告管理",
//     "table_primary": ""
// },
// {
//     "id": 3,
//     "table_name": "Frontend.GameType",
//     "table_description": "全站營運管理\\遊戲分類管理",
//     "table_primary": ""
// },
// {
//     "id": 4,
//     "table_name": "Frontend.GameGroup",
//     "table_description": "全站營運管理\\廠商管理",
//     "table_primary": ""
// },
// {
//     "id": 5,
//     "table_name": "Backend.Greetings",
//     "table_description": "全站營運管理\\歡迎詞管理",
//     "table_primary": ""
// },
// {
//     "id": 6,
//     "table_name": "Backend.PushMange",
//     "table_description": "營運管理\\推播管理",
//     "table_primary": ""
// },
// {
//     "id": 7,
//     "table_name": "Payment.PayChannelGroup",
//     "table_description": "金流資料管理\\通道管理",
//     "table_primary": ""
// },
// {
//     "id": 8,
//     "table_name": "Payment.AccountTitle",
//     "table_description": "金流資料管理\\科目管理",
//     "table_primary": ""
// },
// {
//     "id": 9,
//     "table_name": "Payment.BankCard",
//     "table_description": "金流資料管理\\銀行卡管理",
//     "table_primary": ""
// },
// {
//     "id": 10,
//     "table_name": "Payment.PayChannel",
//     "table_description": "金流資料管理\\商戶管理",
//     "table_primary": ""
// },
// {
//     "id": 11,
//     "table_name": "Backend.MemberGroupGroup",
//     "table_description": "金流資料管理\\三方金流群組管理和銀行卡金流群組管理",
//     "table_primary": ""
// },
// {
//     "id": 12,
//     "table_name": "Backend.MemberGroupType",
//     "table_description": "玩家管理\\玩家群組管理",
//     "table_primary": ""
// },
// {
//     "id": 13,
//     "table_name": "Frontend.Promotion",
//     "table_description": "優惠管理\\優惠設定與活動管理",
//     "table_primary": ""
// },
// {
//     "id": 14,
//     "table_name": "Frontend.AppVersion",
//     "table_description": "系統管理\\App更新管理",
//     "table_primary": ""
// },
// {
//     "id": 15,
//     "table_name": "Backend.MemberGroupList",
//     "table_description": "玩家管理\\玩家類型與群組管理",
//     "table_primary": "member_id"
// },
// {
//     "id": 16,
//     "table_name": "Backend.MemberNote",
//     "table_description": "玩家管理\\所有玩家\\備註",
//     "table_primary": "member_id"
// },
// {
//     "id": 17,
//     "table_name": "MemberPaySetting",
//     "table_description": "玩家管理\\所有玩家\\玩家資金",
//     "table_primary": "member_id"
// },
// {
//     "id": 18,
//     "table_name": "Frontend.MemberBanKCard",
//     "table_description": "玩家管理\\所有玩家\\銀行卡資訊",
//     "table_primary": "member_id"
// },
// {
//     "id": 19,
//     "table_name": "Frontend.MemberPersonal",
//     "table_description": "玩家管理\\所有玩家\\玩家個人資料",
//     "table_primary": "member_id"
// },
// {
//     "id": 20,
//     "table_name": "Backend.MemberRiskManager",
//     "table_description": "風險管理\\初審模塊",
//     "table_primary": "member_id"
// },
// {
//     "id": 21,
//     "table_name": "Frontend.Member",
//     "table_description": "玩家管理\\所有玩家\\玩家基本資料",
//     "table_primary": "id"
// }
