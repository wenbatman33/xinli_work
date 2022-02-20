// Generate by swagger2ts
/* default type by generation start */
interface MapAny {
	[key: string]: any;
}
interface MapString {
	[key: string]: string | undefined;
}

type IDefaultOptions = Omit<RequestInit, 'body' | 'method'> & { timeout?: number };
/* default type by generation end */

// 公告
export interface AGENCYAJAX_AnnouncementListResponseData {
	id?: number /* 流水號 */;
	title?: string /* 標題 */;
	context?: string /* 內容 */;
	sort?: number /* 排序 */;
	top?: number /* 置頂 */;
	startTime?: string /* 上架時間 */;
}

export interface AGENCYAJAX_AnnouncementListResponse {
	list?: Array<AGENCYAJAX_AnnouncementListResponseData> /* 官網公告列表 */;
}

export interface AGENCYAJAX_PromotionLaunchedListResponse {
	list?: Array<AGENCYAJAX_PromotionLaunchedListResponseData> /* 優惠上架列表 */;
}

export interface AGENCYAJAX_PromotionLaunchedListResponseData {
	id?: number /* 流水號 */;
	name?: string /* 名稱 */;
	type?: string /* 類型 */;
	content?: string /* 內容 */;
	orderNo?: number /* 排序 */;
	top?: number /* 置頂 */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	imageWeb?: string /* 圖片WEB */;
	imageH5?: string /* 圖片WEB */;
}

export interface AGENCYAJAX_CancelDepositRequest {
	id?: string /* id */;
}


export interface AGENCYAJAX_CreateDepositResponseData {
	pay_url: String;
}


export interface AGENCYAJAX_CreateDepositResponse {
	data: AGENCYAJAX_CreateDepositResponseData;
	id: String;
	type: number;
}
export interface AGENCYAJAX_CreateDepositRequest {
	id: number /* 線路 id */;
	amount: number /* 存款金額 */;
	realName?: string /* 真實姓名 */;
}

export interface AGENCYAJAX_GetDepositResponse {
	exchangeRateERC: number;
	exchangeRateTRC: number;
	list?: Array<AGENCYAJAX_GetDepositResponseList> /* 列表 */;
}

export interface AGENCYAJAX_GetDepositResponseList {
	id?: number /* 線路 ID */;
	name?: string /* 線路名稱 */;
	note?: string /* 說明 */;
	icon?: string /* Icon */;
	tooltip?: string /* 推廣文字 */;
	lower?: number /* 充值下限 */;
	upper?: number /* 充值上限 */;
	maintain?: number /* 維護狀態 1:維護中 2:正常 */;
	isRecommend?: boolean /* 是否推薦 */;
	needRealName?: boolean /* 是否需要真實姓名 */;
	hasDoc?: boolean /* 是否有教學 */;
	docTitle?: string /* 教學文字 */;
	docURL?: string /* 教學位置 */;
}

export interface AGENCYAJAX_WithdrawalIndexResponse {
	exchangeRate?: number /* 參考匯率 */;
}

export interface AGENCYAJAX_AgencyFinanceGetBonusResponseList {
	bonus: number;
	memberName?: string;
}
export interface AGENCYAJAX_AgencyFinanceGetBonusResponse {
	totalBonus?: number;
	list?: Array<AGENCYAJAX_AgencyFinanceGetBonusResponseList>;
}
export interface AGENCYAJAX_AgencyFinanceGetBonusRequest {
	periodStart?: string /* 開始週期 */;
	periodEnd?: string /* 結束週期 */;
}

export interface AGENCYAJAX_AgencyLoginRequest {
	account?: string /* 代理帳號 */;
	password?: string /* 代理密碼 */;
}

export interface AGENCYAJAX_AgencyLoginResponse {
	id?: number /* 代理ID */;
	account?: string /* 代理帳號 */;
	name?: string /* 代理名字 */;
	token?: string /* Bearer token */;
}

export interface AGENCYAJAX_CheckPasswordRequest {
	password?: string /* 代理密碼 */;
}

export interface AGENCYAJAX_GetAgencyActivityResponse {}

export interface AGENCYAJAX_GetMembersResponseList {
	deposit?: number;
	id?: number;
	income?: number;
	name?: string;
	withdrawal?: number;
}
export interface AGENCYAJAX_GetMembersResponse {
	counts?: number;
	list?: Array<AGENCYAJAX_GetMembersResponseList>;
}

export interface AGENCYAJAX_GetNewMemberCountsResponse {
	newMemberCounts?: number;
}

export interface AGENCYAJAX_GetMemberFinanceResponseList {
	id?: number ;
	name?: string;
	volume?: number /* 流水 */;
	income?: number /* 輸贏 */;
}
export interface AGENCYAJAX_GetMemberFinanceResponse {
	memberAccount?: string;
	createdAt?: string;
	deposit?: number /* 存款 */;
	volume?: number /* 流水 */;
	income?: number /* 輸贏 */;
	bonus?: number /* 紅利 */;
	productList?: Array<AGENCYAJAX_GetMemberFinanceResponseList>
}

export interface AGENCYAJAX_GetMemberProductFinanceResponse {
	volume?: number /* 流水 */;
	income?: number /* 輸贏 */;
}

export interface AGENCYAJAX_AgencyFinanceGetPlatformRequest {
	periodStart?: string /* 開始週期 */;
	periodEnd?: string /* 結束週期 */;
}

export interface AGENCYAJAX_AgencyFinanceGetPlatformResponseList {
	name?: string;
	income?: number;
	platformFee?: number;
}
export interface AGENCYAJAX_AgencyFinanceGetPlatformResponse {
	gameGroupList?:Array<AGENCYAJAX_AgencyFinanceGetPlatformResponseList>
}

export interface AGENCYAJAX_AgencyAnnouncementListResponseData {
	id?: number /* 流水號 */;
	title?: string /* 名稱 */;
	content?: string /* 內容 */;
	sort?: number /* 排序 */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	imageWeb?: string /* 圖片PC */;
	imageH5?: string /* 圖片H5 */;
}

export interface AGENCYAJAX_AgencyAnnouncementListResponse {
	list?: Array<AGENCYAJAX_AgencyAnnouncementListResponseData> /* 代理公告列表 */;
}

export interface AGENCYAJAX_AgencyActivitysListResponseData {
	id?: number /* 流水號 */;
	title?: string /* 名稱 */;
	content?: string /* 內容 */;
	sort?: number /* 排序 */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	imagePc?: string /* 圖片PC */;
	imageH5?: string /* 圖片H5 */;
	status?: number;
}
export interface AGENCYAJAX_AgencyActivitysListResponse {
	list?: Array<AGENCYAJAX_AgencyActivitysListResponseData> /* 代理公告列表 */;
}

export interface AGENCYAJAX_ChildAgencyCommissionListData {
	account?: string /* 二級代理帳號 */;
	condition?: number;
	date?: extraBonus;
	extraBonus?: number;
}

export interface AGENCYAJAX_ChildAgencyBonusList {
	list?: Array<AGENCYAJAX_ChildAgencyCommissionListData>;
}

export interface AGENCYAJAX_ChildAgencyCommissionListData {
	account?: string /* 二級代理帳號 */;
	agencyLevel?: number;
	commission?: number;
}

export interface AGENCYAJAX_ChildAgencyCommissionList {
	list?: Array<AGENCYAJAX_ChildAgencyCommissionListData> /* 二級代理佣金列表 */;
}

export interface AGENCYAJAX_ResetPasswordRequest {
	newPassword?: string /* 新密碼 */;
	confirmNewPassword?: string /* 新密碼確認 */;
}

export interface AGENCYAJAX_AgencyFinanceProductData {
	name?: string;
	lastMonthIncome?: number;
	thisMonthIncome?: number;
}

export interface AGENCYAJAX_AgencyFinanceProductsRequest {}

export interface AGENCYAJAX_AgencyFinanceProductsResponseList {
	id?: number;
	lastMonthIncome?: number;
	name?: number;
	thisMonthIncome?: number;
}
export interface AGENCYAJAX_AgencyFinanceProductsResponse {
	list?: Array<AGENCYAJAX_AgencyFinanceProductsResponseList>;
}

export interface AGENCYAJAX_AgencyFinanceGetActivememberResponseList {}

export interface AGENCYAJAX_AgencyFinanceGetActivememberResponse {
	list?: Array<AGENCYAJAX_AgencyFinanceGetActivememberResponseList>;
}
export interface AGENCYAJAX_AgencyFinanceGetActivememberRequest {
	periodOption?: number /*日期區間選擇 1:本日 2:本月*/;
}

export interface AGENCYAJAX_AgencyFinanceActivemembertResponse {}

export interface AGENCYAJAX_AgencyFinanceProductResponseList {
	account?: string;
	volume?: number;
  income?: number;
}
export interface AGENCYAJAX_AgencyFinanceProductResponse {
	id?: number;
	name?: string;
	volume?: number;
	income?: number;
	memberList?: Array<AGENCYAJAX_AgencyFinanceProductResponseList>
}

export interface AGENCYAJAX_AgencyFinanceProductRequest {
	id?: number /* 廠商id */;
	periodOption?: number /* 日期區間選擇 1:本月 2:昨日 3:本日 */;
}

export interface AGENCYAJAX_AgencyFrontPageResponse {
	newMemberCounts?: number;
	agencyName?: string;
	netIncome?: number;
	commissionRatio?: number;
	todayBetting?: number;
	walletBalance?: number;
}

export interface AGENCYAJAX_AgencyFinanceIndexRequest {
	periodOption?: number;
}
export interface AGENCYAJAX_AgencyFinanceIndexResponse {
	netIncome?: number;
	deposit?: number;
	withdrawal?: number;
	bonus?: number;
	platformFee?: number;
	handlingFee?: number;
	totalIncome?: number;
	activeMemberCounts?: number;
}

export interface AGENCYAJAX_GetMemberByAgencyIDRequest {
	memberName?: string /* 會員名稱 */;
	periodStart?: string /* 開始週期 */;
	periodEnd?: string /* 結束週期 */;
}

export interface AGENCYAJAX_GetMemberFinanceRequest {
	id?: number /* 會員id */;
	periodStart?: string /* 開始週期 */;
	periodEnd?: string /* 結束週期 */;
}

export interface AGENCYAJAX_GetMemberProductFinanceRequest {
	memberID?: number /* 會員ID */;
	gameGroupID?: number /* 廠商ID */;
	periodStart?: string /* 開始週期 */;
	periodEnd?: string /* 結束週期 */;
}

export interface AGENCYAJAX_GetAgencyBankCardKVResponse {
	list?: Array<AGENCYAJAX_KeyValue> /* 下拉選單用的代理銀行卡列表 */;
}

export interface AGENCYAJAX_GetAgencyUsdtAddressKVResponse {
	list?: Array<AGENCYAJAX_KeyValue> /* 下拉選單用的代理USDT列表 */;
}

export interface AGENCYAJAX_ChildAgencyCommissionReportSum {
	date?: string /* 日期 */;
	childAgencyCount?: number /* 二級代理數 */;
	activeChildAgencyCount?: number /* 二級代理活躍數 */;
	childCommissionAmount?: number /* 二級代理佣金 */;
	childBonusAmount?: number /* 二級代理尊享福利 */;
	totalChildCommission?: number /* 小計 二級代理佣金+二級代理尊享福利 */;
}

export interface AGENCYAJAX_CommissionReportResponseData {
	date?: string /* 日期 */;
	activeMemberCount?: number /* 活躍數 */;
	totalWinAmount?: number /* 平台輸贏/總輸贏 */;
	platformCharge?: number /* 平台費 */;
	depositWithdrawFee?: number /* 存提手續費 */;
	totalBonus?: number /* 紅利總計 */;
	netProfit?: number /* 淨輸贏/淨營利 */;
	rankName?: string /* 佣金等級名稱 */;
	commissionPercent?: number /* 佣金分成 */;
	totalCommission?: number /* 佣金結餘 */;
	commission?: number /* 佣金 */;
	totalChildCommission?: number /* 二級代理福利 */;
}

export interface AGENCYAJAX_DepositAmountSummaryResponse {
	list?: Array<AGENCYAJAX_DepositAmountSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface AGENCYAJAX_DepositAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface AGENCYAJAX_DepositPeopleSummaryResponse {
	list?: Array<AGENCYAJAX_DepositPeopleSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實收金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface AGENCYAJAX_DepositPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	uniquePeople?: number /* 唯一存款人數 */;
	firstPeople?: number /* 首存人數 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	avgAmount?: number /* 人均存款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實收金額 */;
	activePeople?: number /* 活躍人數 */;
	depositRate?: number /* 存款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface AGENCYAJAX_WithdrawAmountSummaryResponse {
	list?: Array<AGENCYAJAX_WithdrawAmountSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface AGENCYAJAX_WithdrawAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface AGENCYAJAX_WithdrawPeopleSummaryResponse {
	list?: Array<AGENCYAJAX_WithdrawPeopleSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalWithdrawNum?: number /* 合計提款次數 */;
	totalAmount?: number /* 合計提款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實出金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface AGENCYAJAX_WithdrawPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	uniquePeople?: number /* 唯一提款人數 */;
	firstPeople?: number /* 首提人數 */;
	withdrawNum?: number /* 提款次數 */;
	amount?: number /* 提款金額 */;
	avgAmount?: number /* 人均提款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實出金額 */;
	activePeople?: number /* 活躍人數 */;
	withdrawRate?: number /* 提款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface AGENCYAJAX_ChannelDepositSummaryResponse {
	list?: Array<AGENCYAJAX_ChannelDepositSummaryResponseData> /* 線路進款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface AGENCYAJAX_ChannelDepositSummaryMapResponse {
	channels?: Array<string | undefined> /* 線路進款統計列表 */;
	list?: Array<AGENCYAJAX_KeyValue> /* 線路陣列列表清單 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface AGENCYAJAX_ChannelDepositSummaryResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	serviceCode?: string /* 支付方式 */;
	payChannelServiceID?: number /* 線路ID */;
	payChannelServiceName?: string /* 線路名稱 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	note?: string /* 備註 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface AGENCYAJAX_MemberDepositSummaryResponse {
	list?: Array<AGENCYAJAX_MemberDepositSummaryResponseData> /* 會員存款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface AGENCYAJAX_MemberDepositSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	memberID?: number /* 會員ID */;
	memberName?: string /* 會員名稱 */;
	currency?: number /* 幣別 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	bankGroupID?: number /* 銀行卡金流組別 */;
	bankGroupName?: string /* 銀行卡金流組別 */;
	payGroupID?: number /* 三方金流組別 */;
	payGroupName?: string /* 三方金流組別 */;
	registedDate?: string /* 註冊日期 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface AGENCYAJAX_ChannelReconciliationReportMapResponse {
	list?: Array<AGENCYAJAX_ChannelReconciliationReportResponse> /* 三方對帳表列表，KEY 是時間區段字串，例如08:00-10:00 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface AGENCYAJAX_ChannelReconciliationReportResponse {
	list?: Array<AGENCYAJAX_ChannelReconciliationReportResponseData> /* 三方對帳表列表 */;
	count?: number /* 總數 */;
	totalDepositAmount?: number /* 存款金額小計 */;
	totalDepositFee?: number /* 存款手續費小計 */;
	totalPayoutAmount?: number /* 代付金額小計 */;
	totalPayoutFee?: number /* 代付手續費小計 */;
	totalPayoutNum?: number /* 代付次數小計 */;
	totalSettlementNum?: number /* 結算次數小計 */;
	totalSettlementAmount?: number /* 結算金額小計 */;
	totalSettlementFee?: number /* 結算手續費小計 */;
	totalSettlementUAmount?: number /* 下發轉U金額小計 */;
	totalSettlementUFee?: number /* 下發轉U手續費小計 */;
	totalFrozenAmount?: number /* 凍結金額小計 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface AGENCYAJAX_ChannelReconciliationReportResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	payChannelSn?: string /* 商戶號 */;
	serviceCode?: string /* 支付方式 */;
	serviceName?: string /* 支付方式名稱 */;
	payChannelID?: number /* 三方商戶ID */;
	payChannelName?: string /* 三方商戶名稱 */;
	useType?: number /* 報表類型: 1: 每日對帳表, 2: 整點對帳表 */;
	payoutNum?: number /* 代付次數 */;
	payoutAmount?: number /* 代付金額 */;
	payoutFee?: number /* 代付手續費 */;
	depositNum?: number /* 存款次數 */;
	depositAmount?: number /* 存款金額 */;
	depositFee?: number /* 存款手續費 */;
	settlementNum?: number /* 結算次數 */;
	settlementAmount?: number /* 結算金額 */;
	settlementFee?: number /* 結算手續費 */;
	settlementUNum?: number /* 下發轉U次數 */;
	settlementUAmount?: number /* 下發轉U金額 */;
	settlementUFee?: number /* 下發轉U手續費 */;
	frozenAmount?: number /* 凍結金額 */;
	frozenNum?: number /* 凍結次數 */;
	startingSystemBalance?: number /* 系統餘額(開始時間餘額) */;
	endingSystemBalance?: number /* 系統餘額(結束時間餘額) */;
	endingChannelBalance?: number /* 三方餘額(結束時間餘額) */;
	note?: string /* 備註 */;
	endingBalanceDiff?: number /* 差額 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface AGENCYAJAX_ArrayResponse {
	list?: Array<AGENCYAJAX_KeyValue> /* 通用型陣列列表清單 */;
}

export interface AGENCYAJAX_PromotionApplyRequest {
	promotionID?: number /* 優惠ID(不是上架優惠的ID，是關聯優惠) */;
}

export interface AGENCYAJAX_DurationAndIDRequest {
	id?: number /* id */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface AGENCYAJAX_CommonSuccessResponse {
	success?: boolean /* 請求是不是成功 */;
}

export interface AGENCYAJAX_PhoneNumberAttribution {
	status?: boolean /* 請求狀態: true 代表完成，false 代表失敗 */;
	resultCode?: number /* 返回码 */;
	reason?: string /* 返回说明 */;
	province?: string /* 省份 */;
	city?: string /* 城市，(北京、上海、重庆、天津直辖市可能为空) */;
	areaCode?: string /* 区号，(部分记录可能为空) */;
	zip?: string /* 邮编，(部分记录可能为空) */;
	company?: string /* 运营商 */;
}

export interface AGENCYAJAX_MemberLoginInfo {
	memberID?: number /* 會員ID */;
	effectiveTime?: number /* 最近連線時間 */;
}

export interface AGENCYAJAX_WebSocketFdInfo {
	status?: boolean /* 驗證狀態: true 代表完成驗證，false 代表尚未通過驗證 */;
	fd?: number /* WebSocket 客户端连接的标识符，在Server实例中是唯一的，在多个进程内不会重复 */;
	token?: AGENCYAJAX_Token;
}

export interface AGENCYAJAX_PaginationRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface AGENCYAJAX_EmptyResponse {}

export interface AGENCYAJAX_KeyValue {
	key?: string /* 傳到後端的值 */;
	value?: string /* 前台要顯示的值 */;
}

export interface BACKENDAJAX_AdminDeptsResponse {
	list?: Array<BACKENDAJAX_AdminDeptsResponseData> /* 後台管理者部門列表 */;
	count?: number /* 總數 */;
}

export interface BACKENDAJAX_AdminDeptsResponseData {
	deptID?: number /* 部門 ID */;
	deptName?: string /* 部門名稱 */;
}

export interface BACKENDAJAX_AdminFunctionResponseData {
	fnID?: number /* 所屬功能 ID */;
	fnName?: string /* 所屬功能名稱 */;
	fnKey?: string /* 功能關鍵 key */;
}

export interface BACKENDAJAX_DeleteAdjustmentRequest {
	id?: number /* 要被刪除的 adjustmentID */;
}

export interface BACKENDAJAX_SearchMemberAdjustmentResponse {
	list?: Array<BACKENDAJAX_SearchMemberAdjustmentData> /* 手動上下分申請清單 */;
}

export interface BACKENDAJAX_BackendLoginRequest {
	account?: string /* 後台登入帳號 */;
	password?: string /* 後台登入密碼 */;
	loginCode?: string /* 後台登入谷哥验证码 */;
}

export interface BACKENDAJAX_GetBettingLogDetailData {
	gameType?: string /* 遊戲類型 */;
	gameAgency?: string /* 遊戲代理商 */;
	limitAmount?: number /* 限制流水 */;
	betAmount?: number /* 有效流水 */;
	winAmount?: number /* 輸贏(公司) */;
}

export interface BACKENDAJAX_CreateAdminFunctionInfoRequest {
	fnName?: string /* 功能名稱 */;
	fnKey?: string /* 功能關鍵 Key */;
	status?: number /* 狀態 [1:正常,2:關閉] */;
	parentID?: number /* 父階層ID */;
}

export interface BACKENDAJAX_CreateAdminRoleInfoRequest {
	roleName?: string /* 群組名稱 */;
	note?: string /* 備註 */;
	status?: number /* 啟用狀態[1:啟用,2:停用] */;
}

export interface BACKENDAJAX_GetStakeDetailRequest {
	memberID?: number /* 會員ID */;
	settlementTimeStart?: string;
	settlementTimeEnd?: string;
}

export interface BACKENDAJAX_DeleteAdminFunctionInfoRequest {
	fnID?: number /* 功能 ID */;
}

export interface BACKENDAJAX_DeleteAdminRoleUsersRequest {
	adminID?: number /* 要被刪除的 adminID */;
	roleID?: number /* role ID */;
}

export interface BACKENDAJAX_GetStakeDetailResponse {
	list?: Array<BACKENDAJAX_GetBettingLogDetailData> /* 流水詳情 */;
}

export interface BACKENDAJAX_GetAdminFunctionsByAdminIDRequest {
	adminID?: number /* AdminID */;
}

export interface BACKENDAJAX_GetAdminFunctionsResponseData {
	list?: Array<BACKENDAJAX_AdminFunctionResponseData> /* 所屬功能列表 */;
}

export interface BACKENDAJAX_GetAdminRolesByAdminIDRequest {
	adminID?: number /* AdminID */;
}

export interface BACKENDAJAX_GetAdminRolesResponse {
	list?: Array<BACKENDAJAX_AdminRoleInfoResponseData> /* 後台管理者成員列表 */;
	count?: number /* 總數 */;
}

export interface BACKENDAJAX_GetAdminUserByAdminIDRequest {
	adminID?: number /* AdminID */;
}

export interface BACKENDAJAX_GetAdminUsersByRoleIDRequest {
	roleID?: number /* 群組的 ID */;
}

export interface BACKENDAJAX_GetAdminUsersByRoleIDResponse {
	list?: Array<BACKENDAJAX_AdminUserResponseData> /* 在查詢群組內的管理員列表 */;
	count?: number /* 總數 */;
}

export interface BACKENDAJAX_GetAdminUsersByRoleIDResponseData {
	roleID?: number /* 群組ID */;
	roleName?: string /* 群組名稱 */;
	adminID?: number /* adminID */;
	account?: string /* 管理員 account */;
	name?: string /* 管理員 name */;
	email?: string /* 管理員 email */;
	status?: string /* 管理員狀態 已轉成中文 [1:啟用,2:停用,3:待審核,4:審核退回] */;
	note?: string /* 管理員額外記事 */;
}

export interface BACKENDAJAX_GetAdminUsersResponse {
	list?: Array<BACKENDAJAX_AdminUserResponseData> /* 後台管理者成員列表 */;
	count?: number /* 總數 */;
}

export interface BACKENDAJAX_GetFunctionsResponse {
	list?: Array<BACKENDAJAX_FunctionResponseData> /* 所屬功能列表 */;
	count?: number /* 總數 */;
}

export interface BACKENDAJAX_GetRoleFnsResponse {
	list?: Array<BACKENDAJAX_GetRoleFnsResponseData> /* 在群組內的成員功能列表 */;
}

export interface BACKENDAJAX_GetRoleFnsResponseData {
	roleID?: number /* 群組ID */;
	roleName?: string /* 群組名稱 */;
	fnID?: number /* 功能 ID */;
	fnName?: string /* 功能名稱 */;
	fnKey?: string /* 功能關鍵 key */;
	active?: boolean /* 狀態 [0:關閉,1:正常] */;
	updatedAt?: string /* 功能最後更新日期 */;
	createdAt?: string /* 功能最後建立日期 */;
}

export interface BACKENDAJAX_GetRoleResponse {
	list?: Array<BACKENDAJAX_RoleResponseData> /* 所屬群組資料列表 */;
}

export interface BACKENDAJAX_GetRolesRequest {
	roleID?: number /* 查詢的 roleID */;
}

export interface BACKENDAJAX_SetAdminFunctionInfoRequest {
	fnID?: number /* 功能 ID */;
	fnName?: string /* 功能名稱 */;
	fnKey?: string /* 功能關鍵 Key */;
	parentID?: number /* 父階層ID */;
}

export interface BACKENDAJAX_SetAdminRoleInfoRequest {
	roleID?: number /* 被修改的群組ID */;
	roleName?: string /* 群組名稱 */;
	note?: string /* 備註 */;
	status?: number /* 啟用狀態[1:啟用,2:停用] */;
}

export interface BACKENDAJAX_SetAdminRoleUsersRequest {
	adminIDs?: Array<number | undefined> /* adminIDs 陣列 */;
	roleID?: number /* role ID */;
}

export interface BACKENDAJAX_SetAdminRoleUsersRequestData {
	adminID?: Array<number | undefined> /* adminIDs 陣列 */;
}

export interface BACKENDAJAX_CreateDomainGroupRequest {
	name?: string /* 名稱 */;
	setName?: string /* 顯示名稱 */;
	sort?: number /* sort */;
}

export interface BACKENDAJAX_SetAdminUserNoteRequest {
	adminID?: number /* AdminID */;
	note?: string /* 後台登入者備註 */;
}

export interface BACKENDAJAX_SetAdminUserPasswordRequest {
	adminID?: number /* AdminID */;
	password?: string /* 後台登入密碼 */;
}

export interface BACKENDAJAX_SetAdminUserStatusRequest {
	adminID?: number /* AdminID */;
	status?: number /* 後台登入者狀態 [1:啟用,2:停用,3:待審核,4:審核退回] */;
}

export interface BACKENDAJAX_SetRoleFnsRequest {
	roleID?: number /* 修改的群組ID */;
	fnIDs?: Array<number | undefined> /* 修改的功能IDs */;
}

export interface BACKENDAJAX_CreateDomainRequest {
	groupID?: number /* groupID */;
	name?: string /* 名稱 */;
	displayName?: string /* 顯示名稱 */;
	domain?: string /* domain */;
	note?: string /* note */;
}

export interface BACKENDAJAX_AdminRoleInfoResponseData {
	roleID?: number /* 群組 ID */;
	roleName?: string /* 群組名稱 */;
	editorAdminAccount?: string /* 最後修改管理者帳號 */;
	editorAdminID?: number /* 最後修改管理者 ID */;
	status?: number /* 啟用狀態 */;
	note?: string /* 備註 */;
	updatedAt?: string /* 功能最後更新日期 */;
	createdAt?: string /* 功能最後建立日期 */;
	activeUsers?: number /* 啟用人數 */;
	totalUsers?: number /* 總人數 */;
}

export interface BACKENDAJAX_GetAdminFunctionsRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	fnID?: number /* 權限ID */;
	fnName?: string /* 權限名稱 */;
	fnKey?: string /* 權限Key */;
}

export interface BACKENDAJAX_GetAuthLogsResponse {
	list?: Array<BACKENDAJAX_AuthLogsResponseData> /* 操作紀錄列表 */;
	count?: number /* 總數 */;
}

export interface BACKENDAJAX_GetDomainData {
	id?: number /* ID */;
	groupID?: number /* groupID */;
	name?: string /* 名稱 */;
	displayName?: string /* 顯示名稱 */;
	domain?: string /* domain */;
	note?: string /* note */;
}

export interface BACKENDAJAX_AdminUserResponseData {
	adminID?: number /* adminID */;
	account?: string /* account */;
	name?: string /* name */;
	email?: string /* email */;
	roles?: Array<BACKENDAJAX_RoleResponseData> /* 權限資料 */;
	status?: number /* 狀態 [1:啟用,2:停用,3:待審核,4:審核退回] */;
	deptID?: number /* 部門 ID */;
	title?: string /* 部門 職稱 */;
	commentCategory?: string /* 後台登入者綁定詞 */;
	vpnIP?: string /* VPN IP (IP 符合方能登入) */;
	note?: string /* 額外記事 */;
	lastLoginAt?: string /* 上次登入時間 */;
	createdAt?: string /* 帳號建立日期 */;
	updatedAt?: string /* 帳號更新日期 */;
}

export interface BACKENDAJAX_BackendLoginResponse {
	adminID?: number /* adminID */;
	account?: string /* account */;
	name?: string /* name */;
	email?: string /* email */;
	roles?: Array<BACKENDAJAX_RoleResponseData> /* 權限資料 */;
	status?: number /* 狀態 [1:啟用,2:停用,3:待審核,4:審核退回,9:待綁定谷哥驗證碼] */;
	note?: string /* 額外記事 */;
	commentCategory?: string /* 備註綁定詞 */;
	adminEffectiveTime?: number /* 本次登入有效期限 */;
	bearerToken?: string /* 本次登入有用的 tokne */;
	passwordUpdatedAt?: number /* 最後修改密碼時間 */;
	secretQRCode?: string /* Google Auth OTP 密鑰二維碼字串 */;
}

export interface BACKENDAJAX_ResetAdminUserPasswordRequest {
	oldPassword?: string /* 原後台登入密碼 */;
	password?: string /* 新後台登入密碼 */;
}

export interface BACKENDAJAX_RoleResponseData {
	roleID?: number /* 所屬群組 ID */;
	roleName?: string /* 所屬群組名稱 */;
	createdAt?: string /* 群組建立日期 */;
	updatedAt?: string /* 群組最後更新日期 */;
}

export interface BACKENDAJAX_GetAdminRolesRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	roleName?: string /* 群組名稱 */;
	note?: string /* 備註 */;
	status?: number /* 啟用狀態[1:啟用,2:停用] */;
}

export interface BACKENDAJAX_GetAdminUsersRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	adminID?: number /* 使用者ID */;
	account?: string /* 使用者帳號 */;
	deptID?: number /* 部門ID */;
	title?: string /* 職稱 */;
	roleID?: number /* 所屬群組 ID */;
	status?: number /* 狀態[1:啟用,2:停用,3:待審核,4:審核退回] */;
}

export interface BACKENDAJAX_GetSmsSendLogData {
	id?: number /* ID */;
	vendor?: string /* 線路 */;
	mobile?: string /* 號碼 */;
	created_date?: string /* 發送時間 */;
	message?: string /* 內容 */;
}

export interface BACKENDAJAX_SetAdminRoleUserRequest {
	adminID?: number /* admin ID */;
	roleID?: number /* role ID */;
}

export interface BACKENDAJAX_GetMemberDetailLogsRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	memberAccount?: string /* 用戶帳號 */;
	startDate?: string /* 開始日期 */;
	endDate?: string /* 結束日期 */;
}

export interface BACKENDAJAX_CreateAdminUserRequest {
	account?: string /* 後台登入帳號 */;
	name?: string /* 後台登入者名稱 */;
	password?: string /* 後台登入密碼 */;
	email?: string /* 後台登入者電子信箱 */;
	status?: number /* 後台登入者狀態 [1:啟用,2:停用,3:待審核,4:審核退回] */;
	deptID?: number /* 部門 ID */;
	title?: string /* 部門 職稱 */;
	vpnIP?: string /* VPN IP (IP 符合方能登入) */;
	commentCategory?: string /* 後台登入者綁定詞 */;
	note?: string /* 後台登入者備註 */;
	roleID?: number /* role ID，前端預設會傳入0，對應行為是讓此使用者沒有綁定群組。 */;
}

export interface BACKENDAJAX_SetAdminUserInfoRequest {
	adminID?: number /* 被修改的 adminID  */;
	name?: string /* 後台登入者名稱 */;
	oldPassword?: string /* 原後台登入密碼 */;
	newPassword?: string /* 新後台登入密碼 */;
	status?: number /* 後台登入者狀態 [1:啟用,2:停用,3:待審核,4:審核退回] */;
	deptID?: number /* 部門 ID */;
	title?: string /* 部門 職稱 */;
	vpnIP?: string /* VPN IP (IP 符合方能登入) */;
	commentCategory?: string /* 後台登入者綁定詞 */;
	note?: string /* 後台登入者備註 */;
	roleID?: number /* role ID，前端預設會傳入0，對應行為是讓此使用者沒有綁定群組。 */;
}

export interface BACKENDAJAX_GetRiskDeviceRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	device?: string /* 裝置ID */;
}

export interface BACKENDAJAX_GetRiskDeviceResponse {
	list?: Array<BACKENDAJAX_GetRiskDeviceResponseData> /* riskDevice */;
}

export interface BACKENDAJAX_GetRiskDeviceResponseData {
	memberID?: number /* ID */;
	account?: string /* 會員帳號 */;
	agent?: string /* 代理來源 */;
	registerDate?: string /* 註冊時間 */;
	registerDevice?: string /* 註冊裝置 */;
	registerIp?: string /* 註冊IP */;
	loginDate?: string /* 登入時間 */;
	loginDevice?: string /* 登入裝置 */;
	loginIp?: string /* 登入IP */;
}

export interface BACKENDAJAX_GetRiskIpRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	ip?: string /* IP */;
}

export interface BACKENDAJAX_GetRiskIpResponse {
	list?: Array<BACKENDAJAX_GetRiskIpResponseData> /* riskIP */;
}

export interface BACKENDAJAX_GetRiskIpResponseData {
	memberID?: number /* ID */;
	account?: string /* 會員帳號 */;
	agent?: string /* 代理來源 */;
	registerDate?: string /* 註冊時間 */;
	registerDevice?: string /* 註冊裝置 */;
	registerIp?: string /* 註冊IP */;
	loginDate?: string /* 登入時間 */;
	loginDevice?: string /* 登入裝置 */;
	loginIp?: string /* 登入IP */;
}

export interface BACKENDAJAX_GetRiskMemberRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_VerifyAdjustmentRequest {
	list?: Array<BACKENDAJAX_VerifyAdjustmentData> /* 手動上下分審核會員列表 */;
	adjustmentID?: number /* 手動調整單號 */;
}

export interface BACKENDAJAX_SearchMemberAdjustmentData {
	id?: number /* ID */;
	transactionID?: string /* 交易ID */;
	memberName?: string /* 會員名稱 */;
	adjustmentType?: number /* 上分/下分 */;
	subject?: string /* 名稱 */;
	reason?: number /* 調整原因 */;
	finalAmount?: number /* 流水總額 */;
	verifyAt?: string /* 申請日期 */;
	updatedAt?: string /* 最後更新日期 */;
	status?: number /* 會員審核狀態 [1通過/ 2不通過] */;
	updateUser?: string /* 更新者 */;
}

export interface BACKENDAJAX_SearchMemberDeviceGhostResponseData {
	memberID?: number /* ID */;
	account?: string /* 會員帳號 */;
	realName?: string /* 實名 */;
	agent?: string /* 代理 */;
	registerDate?: string /* 註冊時間 */;
	registerIp?: string /* 註冊IP */;
	loginDate?: string /* 最後登入時間 */;
	loginDevice?: string /* 登入裝置 */;
	loginIp?: string /* 最後登入IP */;
	tags?: Array<BACKENDAJAX_MemberTagResponseData> /* 標籤 */;
	depositLimit?: number /* 存款限制 */;
	withdrawLimit?: number /* 提款限制 */;
	status?: number /* 登入狀態限制 */;
	gameLogin?: number /* 登入遊戲限制 */;
}

export interface BACKENDAJAX_SearchMemberDeviceGhostRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	memberName?: string /* 會員名稱 */;
	deviceID?: string /* 裝置ID */;
}

export interface BACKENDAJAX_SearchMemberDeviceGhostResponse {
	list?: Array<BACKENDAJAX_SearchMemberDeviceGhostResponseData> /* riskDevice */;
	deviceID?: string /* 裝置ID */;
}

export interface BACKENDAJAX_FunctionResponseData {
	all?: Array<BACKENDAJAX_FunctionResponseDetailData> /* 查詢的所屬功能列表 */;
	parent?: Array<BACKENDAJAX_FunctionResponseDetailData> /* parent 所屬功能列表 */;
}

export interface BACKENDAJAX_GetAdminUsersOperateLogsRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	account?: string /* 使用者帳號 */;
	startDate?: string /* 開始日期 */;
	endDate?: string /* 結束日期 */;
}

export interface BACKENDAJAX_GetAdminUsersOperateLogsResponse {
	list?: Array<BACKENDAJAX_MemberWalletLogsForWithdrawalResponseData> /* 後台管理者成員列表 */;
	count?: number /* 總數 */;
}

export interface BACKENDAJAX_GetDomainListResponse {
	list?: Array<BACKENDAJAX_GetDomainGroupData> /* domainGroup */;
}

export interface BACKENDAJAX_AuthLogsSubData {
	column?: number /* 異動欄位名稱代碼 */;
	oldValue?: number /* 變動前資料 */;
	newValue?: number /* 變動後資料 */;
}

export interface BACKENDAJAX_GetAdminUserAuthLogsRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	account?: string /* 使用者帳號 */;
	startDate?: string /* 開始日期 */;
	endDate?: string /* 結束日期 */;
}

export interface BACKENDAJAX_VerifyAdjustmentData {
	memberAccount?: string /* 會員帳號 */;
	memberID?: number /* 會員ID */;
	reason?: string /* 審核原因 */;
	status?: string /* 審核狀態 [1:通過,2:拒絕] */;
	lockID?: number /* 錢包鎖定ID */;
	transactionID?: string /* transactionID */;
}

export interface BACKENDAJAX_GetAdjustmentListData {
	adjustmentID?: number /* ID */;
	subject?: string /* 名稱 */;
	reason?: number /* 調整原因 */;
	description?: string /* 說明 */;
	adjustmentType?: string /* 上/下分 */;
	amount?: number /* 金額 */;
	amountTimes?: number /* 流水倍數 */;
	finalAmount?: number /* 流水總額 */;
	currency?: string /* 幣別 */;
	createdAt?: string /* 申請日期 */;
	updatedAt?: string /* 最後更新日期 */;
	isSpread?: string /* 是否計算存提差 */;
	applyCount?: string /* 申請總人數 */;
	passCount?: string /* 核可人數 */;
	status?: string /* 手動調整單狀態 [1通過/ 2部份通過/ 3未審核/ 4不通過] */;
	memberList?: Array<BACKENDAJAX_VerifyAdjustmentData> /* 手動上下分審核會員列表 */;
	createUser?: string /* 建立者 */;
	verifyUser?: string /* 審核者 */;
}

export interface BACKENDAJAX_UpdateDomainGroupRequest {
	id?: number /* id */;
	name?: string /* 名稱 */;
	setName?: string /* 顯示名稱 */;
	sort?: number /* sort */;
	status?: number /* 狀態 [1:啟用,2:停用] */;
}

export interface BACKENDAJAX_GetAdjustmentListRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetAdjustmentListResponse {
	list?: Array<BACKENDAJAX_GetAdjustmentListData> /* 手動上下分申請單列表 */;
}

export interface BACKENDAJAX_GetBettingLogData {
	id?: number /* ID */;
	memberID?: string /* 會員ID */;
	gameListID?: string /* 遊戲代碼 */;
	betID?: string /* 遊戲原廠投注ID */;
	totalBetAmount?: number /* 投注流水 */;
	betAmount?: number /* 有效流水 */;
	winAmount?: number /* 輸贏金額 */;
	settlementAmount?: number /* 結算金額 */;
	betTime?: string /* 投注時間 */;
	betTimeLocal?: string /* 本地投注時間 */;
	settlementTime?: string /* 結算時間 */;
	settlementTimeLocal?: string /* 本地結算時間 */;
	betLogStatus?: number /* 投注紀錄狀態 */;
	balance?: number /* 餘額 */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 更新時間 */;
	betType?: number /* 投注類型 */;
	odds?: number /* 賠率 */;
	oddsStyle?: string /* 盤口 */;
	response?: string /* json_encode過的原始數據 */;
	betLogType?: number /* 投注紀錄類型 */;
	betItem?: string /* 投注項目 */;
}

export interface BACKENDAJAX_UpdateDomainRequest {
	id?: number /* id */;
	groupID?: number /* groupID */;
	name?: string /* 名稱 */;
	displayName?: string /* 顯示名稱 */;
	domain?: string /* domain */;
	note?: string /* note */;
	status?: number /* 狀態 [1:啟用,2:停用] */;
}

export interface BACKENDAJAX_GetMemberDetailLogsResponse {
	list?: Array<BACKENDAJAX_MemberDetailLogsResponseData> /* 操作紀錄列表 */;
	count?: number /* 總數 */;
}

export interface BACKENDAJAX_SearchMemberAdjustmentRequest {
	memberName?: string /* 會員名稱 */;
	reason?: number /* 調整原因 */;
	status?: number /* 交易狀態 */;
	transactionID?: string /* 交易ID */;
	updateUser?: string /* 更新者 */;
	verifyDateStart?: string /* 交易日期(開始) */;
	verifyDateEnd?: string /* 交易日期(結束) */;
}

export interface BACKENDAJAX_GetMemberWalletLogsForWithdrawalResponse {
	list?: Array<BACKENDAJAX_MemberWalletLogsForWithdrawalResponseData> /* 取得存款列表中需要的 錢包列表 */;
	count?: number /* 總數 */;
}

export interface BACKENDAJAX_GetBettingLogResponse {
	list?: Array<BACKENDAJAX_GetBettingLogData> /* 流水總覽 */;
	count?: number /* 總數量 */;
}

export interface BACKENDAJAX_GetMemberWalletLogsForWithdrawalRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	memberID?: number /* 會員ID */;
	inOut?: number /* 收支 in/out */;
	type?: number /* 項目 type */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
	orderBy?: string /* 排序欄位: 預設 id 倒序, 可填 id ,date, turnoverMultiple */;
	sortBy?: number /* 1:正序, 2:倒序 */;
}

export interface BACKENDAJAX_MemberWalletLogsForWithdrawalResponseData {
	id?: number /* logsID */;
	date?: string /* 時間 */;
	inOut?: number /* 收支 */;
	type?: number /* 項目 */;
	before?: number /* 交易前 */;
	amount?: number /* 交易金額 */;
	after?: number /* 交易後 */;
	turnoverMultiple?: string /* 流水倍數 */;
	turnoverLimit?: number /* 所需流水 */;
	note?: string /* 詳細內容 */;
	refID?: string /* refID */;
}

export interface BACKENDAJAX_AuthLogsResponseData {
	logID?: string /* logID */;
	account?: string /* 操作者帳號 */;
	action?: number /* 操作行為代碼 */;
	target?: number /* 操作對象 */;
	subData?: Array<BACKENDAJAX_AuthLogsSubData> /* 更動資料 */;
}

export interface BACKENDAJAX_MemberDetailLogsResponseData {
	logID?: string /* logID */;
	account?: string /* 操作者帳號 */;
	action?: number /* 操作行為代碼 */;
	target?: number /* 操作對象 */;
	subData?: Array<BACKENDAJAX_AuthLogsSubData> /* 更動資料 */;
	time?: number /* 紀錄時間 */;
}

export interface BACKENDAJAX_CreateAdjustmentRequest {
	subject?: string /* 名稱 */;
	reason?: string /* 調整原因 */;
	description?: string /* 調整說明 */;
	adjustmentType?: number /* 上分/下分 [1:上分,2:下分] */;
	amount?: number /* 調整金額 */;
	amountTimes?: number /* 流水倍數 */;
	finalAmount?: number /* 流水總額 */;
	currency?: string /* 幣別 */;
	memberList?: Array<string | undefined> /* 會員帳號s 陣列 */;
}

export interface BACKENDAJAX_GetDomainGroupData {
	id?: string /* id */;
	name?: string /* 名稱 */;
	sort?: number /* sort */;
	displayName?: string /* setName */;
	children?: Array<BACKENDAJAX_GetDomainData> /* domains */;
}

export interface BACKENDAJAX_UpdateAdjustmentRequest {
	id?: number /* ID */;
	subject?: string /* 名稱 */;
	reason?: number /* 調整原因 */;
	description?: string /* 調整說明 */;
	adjustmentType?: number /* 上分/下分 [1:上分,2:下分] */;
	amount?: number /* 調整金額 */;
	amountTimes?: number /* 流水倍數 */;
	finalAmount?: number /* 流水總額 */;
	currency?: string /* 幣別 */;
	isSpread?: number /* 是否計算存提差 [1:是,2:否] */;
	memberList?: Array<string | undefined> /* 會員帳號s 陣列 */;
}

export interface BACKENDAJAX_GetBettingLogRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	memberAccount?: string /* 會員ID */;
	gameListID?: number;
	gameTypeID?: number;
	betTimeStart?: string;
	betTimeEnd?: string;
	settlementTimeStart?: string;
	settlementTimeEnd?: string;
	betLogStatus?: number;
}

export interface BACKENDAJAX_FunctionResponseDetailData {
	fnID?: number /* 所屬功能 ID */;
	fnName?: string /* 所屬功能名稱 */;
	fnKey?: string /* 功能關鍵 key */;
	parentID?: number /* 父階層 ID */;
	updatedAt?: string /* 功能最後更新日期 */;
	createdAt?: string /* 功能最後建立日期 */;
}

export interface BACKENDAJAX_GetAgencyWalletLogsForWithdrawalResponse {
	list?: Array<BACKENDAJAX_MemberWalletLogsForWithdrawalResponseData> /* 取得存款列表中需要的 錢包列表 */;
	count?: number /* 總數 */;
}

export interface BACKENDAJAX_AgencyWalletLogsForWithdrawalResponseData {
	id?: number /* logID */;
	date?: string /* 時間 */;
	inOut?: number /* 收支 */;
	type?: number /* 項目 */;
	before?: number /* 交易前 */;
	amount?: number /* 交易金額 */;
	after?: number /* 交易後 */;
	turnoverMultiple?: string /* 流水倍數 */;
	turnoverLimit?: number /* 所需流水 */;
	turnoverSum?: number /* 流水限制小計 */;
	note?: string /* 詳細內容 */;
	refID?: string /* refID */;
}

export interface BACKENDAJAX_GetBettingLogTestIIRequest {
	memberID?: number /* 會員ID */;
	gameListID?: number /* gameListID */;
	betAmount?: number /* betAmount */;
	settlementTime?: string /* settlementTime */;
}

export interface BACKENDAJAX_GetBettingLogTestIRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	memberID?: number /* 會員ID */;
	gameListID?: number /* gameListID */;
	betTimeStart?: string /* betTimeStart */;
	betTimeEnd?: string /* betTimeEnd */;
	settlementTimeStart?: string /* settlementTimeStart */;
	settlementTimeEnd?: string /* settlementTimeEnd */;
}

export interface BACKENDAJAX_GetBettingLogTestIResponse {
	list?: Array<BACKENDAJAX_GetBettingLogData> /* 流水總覽 */;
	count?: number /* 總數量 */;
}

export interface BACKENDAJAX_GetAgencyWalletLogsForWithdrawalRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	agencyID?: number /* 代理ID */;
	inOut?: number /* 收支 in/out */;
	type?: number /* 項目 type */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
	orderBy?: string /* 排序欄位: 預設 id 倒序, 可填 id ,date, turnoverMultiple */;
	sortBy?: number /* 1:正序, 2:倒序 */;
}

export interface BACKENDAJAX_GetSmsSendLogResponse {
	list?: Array<BACKENDAJAX_GetSmsSendLogData> /* 短信發送記錄 */;
}

export interface BACKENDAJAX_GetSmsVendorListResponse {
	list?: Array<BACKENDAJAX_GetSmsVendorListData> /* 短信商管理 */;
}

export interface BACKENDAJAX_UpdateSmsVendorRequest {
	id?: number /* ID */;
}

export interface BACKENDAJAX_GetSmsVendorListData {
	id?: number /* ID */;
	displayName?: string /* 廠商名稱 */;
	successRate?: number /* 發送成功率 */;
	quota?: number /* 剩餘額度 */;
	backendUrl?: string /* 後台網址 */;
	status?: number /* 狀態 */;
}

export interface BACKENDAJAX_GetDomainJsonData {
	name?: string /* 名稱 */;
	url?: string /* url */;
}

export interface BACKENDAJAX_GetDomainJsonGroupData {
	name?: string /* 名稱 */;
	children?: Array<BACKENDAJAX_KeyValue> /* URL */;
}

export interface BACKENDAJAX_GetDomainJsonResponse {
	list?: Array<BACKENDAJAX_GetDomainJsonGroupData> /* domainGroup */;
}

export interface BACKENDAJAX_IDRequest {
	id?: number /* id */;
}

export interface BACKENDAJAX_StringIDRequest {
	id?: string /* id */;
}

export interface BACKENDAJAX_CreateGameGroupResponse {
	id?: number /* 流水號 */;
}

export interface BACKENDAJAX_CreateGameListResponse {
	id?: number /* 流水號 */;
}

export interface BACKENDAJAX_GameTypeListResponse {
	list?: Array<BACKENDAJAX_KeyValue> /* 遊戲類型列表 */;
}

export interface BACKENDAJAX_GetGameGroupRequest {
	id?: number /* 流水號 */;
}

export interface BACKENDAJAX_GetGameListRequest {
	id?: number /* 流水號 */;
}

export interface BACKENDAJAX_GetGameListResponse {
	list?: Array<BACKENDAJAX_GameListDataResponse> /* 遊戲列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_GameGroupListResponse {
	list?: Array<BACKENDAJAX_GameGroupSelectArr> /* 遊戲類型列表 */;
}

export interface BACKENDAJAX_GetGameAgencyListResponse {
	list?: Array<BACKENDAJAX_GetGameAgencyResponse> /* 代理商列表 */;
}

export interface BACKENDAJAX_GetGameAgencyResponse {
	id?: number /* 代理商ID */;
	name?: string /* 代理商名稱 */;
	imagePc?: string /* 代理商圖片PC */;
	imageH5?: string /* 代理商圖片H5 */;
	status?: number /* 代理商狀態 */;
}

export interface BACKENDAJAX_UpdateGameAgencyRequest {
	id?: number /* 代理商狀態 */;
	status?: number /* 代理商狀態 */;
	imagePc?: string /* 代理商圖片(PC) */;
	imageH5?: string /* 代理商圖片(H5) */;
}

export interface BACKENDAJAX_GetGameAgencyListRequest {
	name?: string /* 廠商名稱 */;
	gameTypeID?: number /* 遊戲種類ID 0為全部 */;
	status?: number /* 狀態 0為全部 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetGameAgencyRequest {
	id?: number /* 代理商ID */;
}

export interface BACKENDAJAX_GetGameGroupListResponse {
	list?: Array<BACKENDAJAX_GameGroupDataResponse> /* 遊戲廠商列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_GetAgencyOptionsResponse {}

export interface BACKENDAJAX_GetGameDetailByGameAgencyNameRequest {
	gameAgnecyName?: string /* 代理商名稱 */;
}

export interface BACKENDAJAX_GetGameGroupListRequest {
	name?: string /* 廠商名稱 */;
	displayName?: string /* 顯示名稱 */;
	gameAgencyID?: number /* 所屬代理商ID */;
	walletType?: number /* 遊戲錢包類型 0:全部, 1:單一, 2:轉帳 */;
	gameTypeID?: number /* 遊戲種類ID 0為全部 */;
	currencyType?: string /* 遊戲支援幣種 0:全部, USDT:USDT, CNY:CNY */;
	status?: number /* 狀態 0:全部, 1:開啟, 2:關閉, 3:維護中 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetGameGroupCategorizedByGameTypeResponse {
	list?: Array<BACKENDAJAX_CategorizedByGameTypeDTO> /* 遊戲類型列表 */;
}

export interface BACKENDAJAX_CategorizedByGameTypeDTO {
	id?: number /* 遊戲類型id */;
	name?: string /* 遊戲類型名稱 */;
}

export interface BACKENDAJAX_GameGroupListDTO {
	id?: number /* 遊戲廠商id */;
	displayName?: string /* 遊戲廠商顯示名稱 */;
}

export interface BACKENDAJAX_GetGameListListRequest {
	gameGroupID?: number /* 廠商ID 0為全部 */;
	gameTypeID?: number /* 遊戲種類ID 0為全部 */;
	name?: string /* 遊戲名稱 */;
	displayName?: string /* 顯示名稱 */;
	status?: number /* 狀態 0為全部 */;
	trialPlay?: number /* 提供試玩 [0:全部, 1:無, 2:有] */;
	isSpecial?: number /* 是否為特殊遊戲 0:全部 1:是 2:否 */;
	isSlot?: number /* 是否為老虎機遊戲 0:全部 1:是 2:否 */;
	order?: string /* 排序 遞增ascend 遞減descend */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_UpdateGameGroupRequest {
	id?: number /* 流水號 */;
	name?: string /* 廠商名稱 */;
	displayName?: string /* 顯示名稱 */;
	maintainTime?: string /* 維修時間 */;
	gameTypeID?: number /* 遊戲類型ID 1:體育, 2:真人, 3:彩票, 4:電競, 5:棋牌, 6:捕魚, 7:老虎機 */;
	sort?: number /* 廠商顯示順序 */;
	status?: number /* 廠商狀態 [1:開啟,2:關閉,3:維護中] */;
	imageH5?: string /* 廠商圖檔H5 URL */;
	imagePc?: string /* 廠商圖檔PC URL */;
}

export interface BACKENDAJAX_CreateGameGroupRequest {
	name?: string /* 廠商名稱 */;
	displayName?: string /* 顯示名稱 */;
	status?: number /* 廠商狀態 [1:關閉,2:正常] */;
	imageH5File?: File | Blob /* 廠商圖片(H5) */;
	imagePcFile?: File | Blob /* 廠商圖片(PC) */;
}

export interface BACKENDAJAX_GameGroupDataResponse {
	id?: number /* 流水號 */;
	name?: string /* 廠商名稱 */;
	displayName?: string /* 顯示名稱 */;
	walletType?: number /* 錢包類別 */;
	openWay?: number /* 廠商開啟方式 */;
	status?: number /* 廠商狀態 [1:關閉,2:正常] */;
	sort?: number /* 順序 */;
	gameAgencyName?: string /* 所屬代理商 */;
	platformFeeRatio?: number /* 平台費用比例 */;
	maintainTime?: string /* 維護時間 */;
	imageH5?: string /* 廠商圖片(H5) */;
	imagePc?: string /* 廠商圖片(PC) */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 更新時間 */;
}

export interface BACKENDAJAX_CreateGameListRequest {
	gameGroupID?: number /* 廠商ID */;
	gameTypeID?: number /* 類型ID */;
	name?: string /* 遊戲名稱 */;
	displayName?: string /* 顯示名稱 */;
	sort?: number /* 排序 */;
	recommendedSort?: number /* 推薦排序 0為不推薦 接下來有小至大排列 */;
	bettingCode?: string /* 用來對應原廠投注紀錄的代碼 */;
	status?: number /* 遊戲狀態 [1:關閉,2:正常] */;
	isSpecial?: number /* 特殊遊戲 [1:是,2:否] */;
	isSlot?: number /* 老虎機遊戲 [1:是,2:否] */;
	isHotGame?: number /* 是否為熱門遊戲 */;
	trialPlay?: number /* 提供試玩 [1:無,2:有] */;
	imageH5?: string /* 遊戲圖片(H5) */;
	imagePc?: string /* 遊戲圖片(PC) */;
	screenShotH5?: string /* 遊戲截圖(H5) */;
	screenShotPc?: string /* 遊戲截圖(PC) */;
	recommendedImageH5?: string /* 遊戲推薦圖(H5) */;
	recommendedImagePc?: string /* 遊戲推薦圖(PC) */;
}

export interface BACKENDAJAX_GameListDataResponse {
	id?: number /* 流水號 */;
	gameGroupID?: number /* 廠商ID */;
	gameGroupName?: string /* 廠商名稱 */;
	gameGroupDisplayName?: string /* 廠商顯示名稱 */;
	gameTypeID?: number /* 類型ID */;
	gameTypeName?: string /* 類型名稱 */;
	name?: string /* 遊戲名稱 */;
	displayName?: string /* 顯示名稱 */;
	sort?: number /* 排序 */;
	isHotGame?: number /* 是否為熱門遊戲 */;
	isSpecial?: number /* 是否為特殊遊戲 */;
	isSlot?: number /* 是否為老虎機遊戲 */;
	recommendedSort?: number /* 首頁推薦排序 */;
	bettingCode?: string /* 用來對應原廠投注紀錄代碼 */;
	trialPlay?: number /* 提供試玩 [1:無,2:有] */;
	status?: number /* 遊戲狀態 [1:關閉,2:正常] */;
	imageH5?: string /* 遊戲圖片(H5) */;
	imagePc?: string /* 遊戲圖片(PC) */;
	screenShotH5?: string /* 遊戲截圖(H5) */;
	screenShotPc?: string /* 遊戲截圖(PC) */;
	recommendedImageH5?: string /* 遊戲推薦圖(H5) */;
	recommendedImagePc?: string /* 遊戲推薦圖(PC) */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 更新時間 */;
}

export interface BACKENDAJAX_UpdateGameListRequest {
	id?: number /* 流水號 */;
	gameGroupID?: number /* 廠商ID */;
	gameTypeID?: number /* 類型ID */;
	name?: string /* 遊戲名稱 */;
	displayName?: string /* 顯示名稱 */;
	bettingCode?: string /* 用來對應原廠投注紀錄代碼 */;
	trialPlay?: number /* 提供試玩 [1:無,2:有] */;
	status?: number /* 遊戲狀態 [1:關閉,2:正常] */;
	isSpecial?: number /* 特殊遊戲 [1:是,2:否] */;
	isSlot?: number /* 老虎機遊戲 [1:是,2:否] */;
	isHotGame?: number /* 特殊遊戲 [1:是,2:否] */;
	sort?: number /* 排序 */;
	recommendedSort?: number /* 推薦排序 0為不推薦 接下來有小至大排列 */;
	imageH5?: string /* 遊戲圖片(H5) */;
	imagePc?: string /* 遊戲圖片(PC) */;
	screenShotH5?: string /* 遊戲截圖(H5) */;
	screenShotPc?: string /* 遊戲截圖(PC) */;
	recommendedImageH5?: string /* 遊戲推薦圖(H5) */;
	recommendedImagePc?: string /* 遊戲推薦圖(PC) */;
}

export interface BACKENDAJAX_BatchAttachMemberTagsRequest {
	memberIDs?: Array<number | undefined> /* 會員ID */;
	tagIDs?: Array<number | undefined> /* 標籤ID */;
}

export interface BACKENDAJAX_UpdateConfigSettingRequest {
	login?: {};
	register?: {};
}

export interface BACKENDAJAX_SearchVipGiftResponseData {
	id?: number /* id */;
	account?: string /* 帳號 */;
	vipLevel?: number /* VIP等級 */;
	vipStatus?: number /* VIP狀態 */;
	status?: number /* 領取狀態 */;
	gift?: string /* 禮金 */;
	createdAt?: string /* 發放時間 */;
	type?: number /* 禮金類型 */;
}

export interface BACKENDAJAX_GetMemberDetailResponse {
	account?: string /* 帳號 */;
	id?: number /* ID */;
	name?: string /* 姓名 */;
	phone?: string /* 電話 */;
	phoneArea?: string /* 電話所在區域 */;
	email?: string /* email */;
	address?: string /* 地址 */;
	ip?: string /* ip */;
	ipArea?: string /* ip所在地區 */;
	status?: number /* 狀態 */;
	depositLimit?: number /* 存款狀態 */;
	withdrawLimit?: number /* 提款狀態 */;
	bankcardArea?: string /* 銀行卡歸屬地 */;
	currentStatus?: boolean /* 線上狀態 */;
	agency?: string /* 代理ID */;
	paymentGroups?: BACKENDAJAX_PayGroupListResponseData;
	bankcardGroups?: BACKENDAJAX_PayGroupListResponseData;
	usdts?: Array<BACKENDAJAX_GetMemberUSDTResponseData> /* usdt */;
	qqID?: string /* QQ號 */;
	wechatID?: string /* 微信號 */;
	birthday?: string /* 生日 */;
	gender?: number /* 性別 1:男 2:女 */;
}

export interface BACKENDAJAX_CreateMemberTagGroupRequest {
	name?: string /* 標籤群組名稱 */;
	color?: string /* 標籤群組顏色 */;
}

export interface BACKENDAJAX_CreateMemberTagRequest {
	name?: string /* 標籤名稱 */;
	tagGroupID?: number /* 標籤群組ID */;
}

export interface BACKENDAJAX_GetByMemberIDRequest {
	id?: number /* 會員id */;
}

export interface BACKENDAJAX_GetMemberCommentResponse {
	list?: Array<BACKENDAJAX_MemberCommentResponseData> /* 標籤 */;
}

export interface BACKENDAJAX_SearchVIPGiftResponse {
	list?: Array<BACKENDAJAX_SearchVipGiftResponseData> /* 本頁清單 */;
	count?: number /* 查詢總數量 */;
}

export interface BACKENDAJAX_DeleteMemberUSDTRequest {
	id?: number /* id */;
}

export interface BACKENDAJAX_AllowOtherBankcardRequest {
	memberID?: number /* 會員ID */;
	name?: string /* 他人實名 */;
}

export interface BACKENDAJAX_GetMemberRequest {
	id?: number /* 會員id */;
}

export interface BACKENDAJAX_GetMemberTagGroupResponse {
	list?: Array<BACKENDAJAX_MemberTagGroupResponseData> /* 標籤 */;
}

export interface BACKENDAJAX_GetMemberTagResponse {
	list?: Array<BACKENDAJAX_MemberTagResponseData> /* 標籤群組 */;
}

export interface BACKENDAJAX_MemberCommentBriefResponseData {
	category?: string /* 分類 */;
	title?: string /* 簡述 */;
	creator?: string /* 建立者 */;
}

export interface BACKENDAJAX_SearchVipGiftRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	id?: number /* ID */;
	account?: string /* 帳號 */;
	vipLevel?: number /* VIP等級 */;
	status?: number /* 領取狀態,1:已領取  2:未領取 */;
	vipStatus?: number /* vip狀態,1:晋级 2:保级 3:降级 4:维持 */;
	type?: number /* 禮金類型,1:月礼金,2:晉級,3:週年,4:返水,5:生日礼 */;
	startTime?: string /* 發放時間(起始) */;
	endTime?: string /* 發放時間(結束) */;
}

export interface BACKENDAJAX_UpdateDefaultMemberUSDTRequest {
	memberID?: number /* 會員ID */;
	usdtID?: number /* ID */;
}

export interface BACKENDAJAX_MemberTagGroupResponseData {
	id?: number /* ID */;
	name?: string /* 名稱 */;
	color?: string /* 顏色 */;
	updatedAt?: string /* 最後更新日期 */;
	createdAt?: string /* 最後建立日期 */;
}

export interface BACKENDAJAX_MemberTagResponseData {
	id?: number /* ID */;
	name?: string /* 名稱 */;
	tagGroupID?: number /* 標籤群組ID */;
	updatedAt?: string /* 最後更新日期 */;
	createdAt?: string /* 最後建立日期 */;
}

export interface BACKENDAJAX_ResetMemberPasswordRequest {
	id?: number /* ID */;
	password?: string /* 密碼 */;
	otp?: string /* otp */;
}

export interface BACKENDAJAX_SearchMemberResponse {
	list?: Array<BACKENDAJAX_SearchMemberResponseData> /* 本頁會員清單 */;
	count?: number /* 查詢總數量 */;
}

export interface BACKENDAJAX_SearchMemberResponseData {
	id?: number /* id */;
	account?: string /* 帳號 */;
	name?: string /* 玩家姓名 */;
	money?: number /* 帳戶餘額 */;
	current_status?: boolean /* 目前登入狀態 */;
	status?: number /* 登入限制狀態 */;
	created_at?: string /* 註冊時間 */;
	last_login_at?: string /* 最後訪問時間 */;
	register_ip?: string /* 註冊IP */;
	last_login_ip?: string /* 最後登入IP */;
	agency?: string /* 代理ID */;
	payment_groups?: Array<string | undefined> /* 三方金流群群組 */;
	bankcard_groups?: Array<string | undefined> /* 銀行卡群組 */;
}

export interface BACKENDAJAX_UpdateMemberLoginConfigRequest {
	verify?: boolean /* 登入是否啟用行為驗證 */;
	smsVerify?: boolean /* 二階段驗證是否啟用簡訊驗證 */;
	verifyLine?: number /* 登入行為驗證線路 */;
	smsLine?: number /* 登入簡訊驗證線路 */;
	errorLimit?: number /* 登入錯誤次數限制 */;
	lockTime?: number /* 鎖定時間(s) */;
	lockLimit?: number /* 鎖死次數 */;
	smsInterval?: number /* 簡訊發送間隔 */;
	smsLimit?: number /* 簡訊次數上限 */;
	smsGapTime?: number /* 簡訊錯誤次數達發送次數上限時，需隔此時間才能再發 */;
}

export interface BACKENDAJAX_RiskMemberResponse {
	memberID?: number /* ID */;
	account?: string /* 會員帳號 */;
	phone?: string /* 手機號 */;
	registerIp?: string /* 註冊IP */;
	registerDevice?: string /* 註冊裝置 */;
	registerDate?: string /* 註冊時間 */;
	ipLocation?: string /* IP地區 */;
	phoneLocation?: string /* 手機地區 */;
	bankCardLocation?: string /* 銀行卡地區 */;
	agent?: string /* 代理 */;
}

export interface BACKENDAJAX_GetMemberUSDTResponse {
	list?: Array<BACKENDAJAX_GetMemberUSDTResponseData> /* 會員USDT */;
}

export interface BACKENDAJAX_LineResponse {
	list?: Array<BACKENDAJAX_KeyValue> /* 行為驗證線路: 顯示名稱為 label、內容值為 value */;
}

export interface BACKENDAJAX_UpdateMemberTagGroupRequest {
	id?: number /* 標籤群組id */;
	name?: string /* 標籤群組名稱 */;
	color?: string /* 標籤群組顏色 */;
}

export interface BACKENDAJAX_UpdateMemberTagRequest {
	id?: number /* 標籤群id */;
	name?: string /* 標籤名稱 */;
	tagGroupID?: number /* 標籤群組ID */;
}

export interface BACKENDAJAX_GetMemberBankCardResponseData {
	id?: number /* ID */;
	memberID?: number /* 會員ID */;
	bankAccount?: string /* 戶名 */;
	bankCode?: string /* 開戶行 */;
	bankNo?: string /* 帳號 */;
	area?: string /* 區域 */;
	branch?: string /* 分行 */;
	isDefault?: boolean /* 預設卡 */;
	status?: number /* 狀態 */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 更新時間 */;
}

export interface BACKENDAJAX_GetMemberUSDTResponseData {
	id?: number /* ID */;
	memberID?: number /* 會員ID */;
	address?: string /* 地址 */;
	isDefault?: boolean /* 預設卡 */;
	status?: number /* 狀態 */;
	type?: number /* 類型 1: ERC 2: TRC */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 更新時間 */;
}

export interface BACKENDAJAX_GetMemberSystemConfigResponse {
	register?: boolean /* 控制全站是否開放註冊 */;
	login?: boolean /* 控制全站是否開放會員登入 */;
	loginGame?: boolean /* 控制全站是否開放會員進入遊戲 */;
	deposit?: boolean /* 存款 */;
	depositNeedMobileVerify?: boolean /* 存款需完成手機驗證 */;
	withdrawal?: boolean /* 提款 */;
	pcMaintain?: boolean /* WebPC維護 */;
	h5Maintain?: boolean /* H5&PWA維護 */;
	pcMaintainMessage?: string /* WebPC維護訊息 */;
	h5MaintainMessage?: string /* H5&PWA維護訊息 */;
	withdrawalRiskVerify?: boolean /* 提款需經過風控審核開關 */;
}

export interface BACKENDAJAX_UpdateMemberRequest {
	id?: number /* ID */;
	name?: string /* 姓名 */;
	phone?: string /* 電話 */;
	email?: string /* email */;
	address?: string /* 地址 */;
	status?: number /* 狀態 */;
	depositLimit?: number /* 存款狀態 */;
	withdrawLimit?: number /* 提款狀態 */;
}

export interface BACKENDAJAX_BatchUpdateMemberDepositWithdrawStatusRequest {
	memberIDs?: Array<number | undefined> /* 會員ID */;
	status?: number /* 狀態 */;
	comment?: string /* 備註 */;
}

export interface BACKENDAJAX_BatchUpdateMemberStatusRequest {
	memberIDs?: Array<number | undefined> /* 會員ID */;
	status?: number /* 狀態 1:啟用 2:鎖定 3:停用 */;
	comment?: string /* 備註 */;
}

export interface BACKENDAJAX_CreateMemberCommentRequest {
	memberID?: number /* 會員ID */;
	title?: string /* 簡述 */;
	content?: string /* 內文 */;
}

export interface BACKENDAJAX_GetMemberTimeRangeRequest {
	id?: number /* 會員id */;
	start?: string /* 起始時間 */;
	end?: string /* 結束時間 */;
}

export interface BACKENDAJAX_MemberCommentResponseData {
	id?: number /* ID */;
	category?: string /* 分類 */;
	title?: string /* 簡述 */;
	content?: string /* 全文 */;
	creator?: string /* 建立者 */;
	creatorID?: number /* 建立者ID */;
	updator?: string /* 修改者 */;
	updatorID?: number /* 修改者ID */;
	createdAt?: string /* 最後建立日期 */;
	updatedAt?: string /* 最後更新日期 */;
}

export interface BACKENDAJAX_MemberDepositWithdrawResponse {
	total?: number /* 總額 */;
	count?: number /* 筆數 */;
	max?: number /* 最大 */;
	avg?: number /* 平均 */;
}

export interface BACKENDAJAX_MemberMoneySummeryResponse {
	totalMoney?: number /* 錢包總額 */;
	totalLock?: number /* 錢包鎖定 */;
	totalDeposit?: number /* 總存款 */;
	totalWithdraw?: number /* 總提款 */;
	totalWin?: number /* 總輸贏 */;
	totalBonus?: number /* 總紅利 */;
	totalRate?: number /* 總流水 */;
	totalRefound?: number /* 總返水 */;
}

export interface BACKENDAJAX_UpdateMemberCommentRequest {
	id?: number /* 會員備註ID */;
	title?: string /* 簡述 */;
	content?: string /* 內文 */;
}

export interface BACKENDAJAX_UpdateMemberOwnTagRequest {
	memberID?: number /* 會員id */;
	tagIDs?: Array<number | undefined> /* 標籤id */;
}

export interface BACKENDAJAX_BatchCreateMemberCommentRequest {
	memberIDs?: Array<number | undefined> /* 會員ID */;
	title?: string /* 簡述 */;
	content?: string /* 內文 */;
}

export interface BACKENDAJAX_GetRiskMemberResponse {
	list?: Array<BACKENDAJAX_RiskMemberResponse> /* riskMember */;
}

export interface BACKENDAJAX_SearchLoginLogRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	account?: string /* 帳號 */;
	loginIP?: string /* 登入IP */;
	loginDeviceID?: string /* 登入裝置ID */;
	loginStartTime?: string /* 登入時間(起始) */;
	loginEndTime?: string /* 登入時間(結束) */;
	registerStartTime?: string /* 註冊時間(起始) */;
	registerEndTime?: string /* 註冊時間(結束) */;
}

export interface BACKENDAJAX_SearchLoginLogResponse {
	list?: Array<BACKENDAJAX_SearchLoginLogResponseData> /* 本頁資料 */;
	count?: number /* 查詢總數量 */;
}

export interface BACKENDAJAX_GetRepeatDeviceReponse {
	list?: Array<BACKENDAJAX_RepeatDeviceReponse> /* repeatDevice */;
	count?: number /* 查詢總數量 */;
}

export interface BACKENDAJAX_RepeatDeviceReponse {
	deviceID?: string /* 裝置ID */;
	totalMemberCount?: number /* 總人數 */;
	lockMemberCount?: number /* 鎖帳號人數 */;
	multiAccountTag?: number /* 多帳號TAG數 */;
	relateAgent?: string /* 關聯代理帳號 */;
}

export interface BACKENDAJAX_UpdateRiskMemberRequest {
	memberIDs?: Array<number | undefined> /* 會員ID */;
}

export interface BACKENDAJAX_SetMultiAccountRequest {
	memberIDs?: Array<number | undefined> /* 會員id */;
}

export interface BACKENDAJAX_SearchLoginLogResponseData {
	id?: number /* id */;
	memberID?: number /* 會員ID */;
	account?: string /* 帳號 */;
	name?: string /* 真實姓名 */;
	registeredAt?: string /* 註冊時間 */;
	registerDevice?: string /* 註冊裝置 */;
	registerIP?: string /* 註冊IP */;
	loginDeviceType?: number /* 登入裝置類型 */;
	loginDeviceID?: string /* 登入設備 */;
	loginArea?: string /* 登入地點 */;
	loginIP?: string /* 註冊IP */;
	failReason?: number /* 失敗原因 1:成功時顯示,2:密碼錯誤,3:帳號不存在,4:圖形驗證碼錯誤,5:行為驗證錯誤,6:簡訊驗證碼錯誤,7:其他 */;
	createdAt?: string /* 登入時間 */;
	success?: number /* 登入結果 */;
}

export interface BACKENDAJAX_SearchMemberRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	id?: number /* ID */;
	account?: string /* 帳號 */;
	name?: string /* 玩家姓名 */;
	phone?: string /* 電話號碼 */;
	address?: string /* 玩家地址 */;
	email?: string /* 玩家Email */;
	payment_group?: string /* 三方金流群組 */;
	bankcard_group?: string /* 銀行卡群組 */;
	last_login_at?: string /* 最後訪問時間 */;
	created_at_start?: string /* 註冊時間(起始) */;
	created_at_end?: string /* 註冊時間(結束) */;
	status?: number /* 狀態 */;
	deposit_limit?: number /* 存款狀態 */;
	withdraw_limit?: number /* 提款狀態 */;
	agency?: string /* 代理ID */;
	tag?: string /* 標籤ID(逗號分隔) */;
	email_cert?: number /* Email綁定 */;
	name_cert?: number /* 實名綁定 */;
	today_deposit?: number /* 今日存款 */;
}

export interface BACKENDAJAX_CreateMemberBankCardRequest {
	memberID?: number /* 會員ID */;
	bankNo?: string /* 銀行卡號(全數字，18-22碼) */;
}

export interface BACKENDAJAX_DeleteMemberBankCardRequest {
	id?: number /* 銀行卡id */;
}

export interface BACKENDAJAX_GetMemberBankCardResponse {
	list?: Array<BACKENDAJAX_GetMemberBankCardResponseData> /* 會員銀行卡 */;
}

export interface BACKENDAJAX_UpdateDefaultMemberBankCardRequest {
	memberID?: number /* 會員ID */;
	bankCardID?: number /* 銀行卡ID */;
}

export interface BACKENDAJAX_UpdateMemberRegisterConfigRequest {
	verifyLine?: number /* 註冊行為驗證線路 */;
	verify?: boolean /* 註冊是否啟用行為驗證 */;
}

export interface BACKENDAJAX_CreateVipGiftRequest {
	account?: string /* 帳號 */;
	time?: string /* 發放日期 */;
	gift?: string /* 生日禮內容 */;
}

export interface BACKENDAJAX_CreateMemberUSDTRequest {
	memberID?: number /* 會員ID */;
	address?: string /* 地址 */;
}

export interface BACKENDAJAX_GetMemberLoginConfigResponse {
	verify?: boolean /* 登入是否啟用行為驗證 */;
	smsVerify?: boolean /* 二階段驗證是否啟用簡訊驗證 */;
	verifyLine?: number /* 登入行為驗證線路 */;
	smsLine?: number /* 登入簡訊驗證線路 */;
	errorLimit?: number /* 登入錯誤次數限制 */;
	lockTime?: number /* 鎖定時間(s) */;
	lockLimit?: number /* 鎖死次數 */;
	smsInterval?: number /* 簡訊發送間隔 */;
	smsLimit?: number /* 簡訊次數上限 */;
	smsGapTime?: number /* 簡訊錯誤次數達發送次數上限時，需隔此時間才能再發 */;
}

export interface BACKENDAJAX_UpdateMemberSystemConfigRequest {
	register?: boolean /* 控制全站是否開放註冊 */;
	login?: boolean /* 控制全站是否開放會員登入 */;
	loginGame?: boolean /* 控制全站是否開放會員進入遊戲 */;
	deposit?: boolean /* 存款 */;
	depositNeedMobileVerify?: boolean /* 存款需完成手機驗證 */;
	withdrawal?: boolean /* 提款 */;
	pcMaintain?: boolean /* WebPC維護 */;
	h5Maintain?: boolean /* H5&PWA維護 */;
	pcMaintainMessage?: string /* WebPC維護訊息 */;
	h5MaintainMessage?: string /* H5&PWA維護訊息 */;
	withdrawalRiskVerify?: boolean /* 提款需經過風控審核開關 */;
}

export interface BACKENDAJAX_GetConfigSettingResponse {
	login?: {};
	register?: {};
}

export interface BACKENDAJAX_GetMemberRegisterConfigResponse {
	verifyLine?: number /* 註冊行為驗證線路 */;
	verify?: boolean /* 註冊是否啟用行為驗證 */;
}

export interface BACKENDAJAX_GetWithdrawalPayoutData {
	id?: number /* 流水號 */;
	amount?: number /* 提款金額 */;
	payType?: Array<BACKENDAJAX_KeyValue> /* 出款方式 */;
	payID?: Array<BACKENDAJAX_KeyValue> /* 商戶號或卡號 */;
	fee?: number /* 出款手續費 */;
	thirdSn?: string /* 三方單號 */;
	editorName?: string /* 執行人 */;
	updatedAt?: string /* 更新時間 */;
}

export interface BACKENDAJAX_HEBRequest {
	id?: string /* 會飽測試回調的訂單號 */;
}

export interface BACKENDAJAX_PromotionCondListResponse {
	list?: Array<BACKENDAJAX_PromotionCondListResponseData> /* 優惠模板列表清單 */;
}

export interface BACKENDAJAX_BankcardListResponse {
	list?: Array<BACKENDAJAX_BankcardListResponseData> /* 金流銀行卡列表清單 */;
}

export interface BACKENDAJAX_PromotionListRequest {
	ID?: number /* ID */;
	name?: string /* 名稱 */;
	startTime?: string /* 活動時間開始 */;
	endTime?: string /* 活動時間結束 */;
	promotionCondType?: number /* 優惠模板類型 */;
	status?: number /* 狀態 */;
	orderBy?: number /* 排序條件 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_BankcardReadRequest {
	ID?: number /* ID */;
}

export interface BACKENDAJAX_GetWithdrawalRiskCheckRequest {
	orderSn?: string /* 訂單號碼 */;
	note?: string /* 備註 */;
	status?: number /* 2:退回  3:通過 */;
}

export interface BACKENDAJAX_PromotionMemberRequest {
	ID?: number /* 申請清單ID */;
	promotionID?: number /* 優惠ID */;
	memberID?: number /* 會員ID */;
}

export interface BACKENDAJAX_CreateDepositRequest {
	source?: number /* 1會員存款 2代理存款 (預設會員存款) */;
	otp?: string /* opt (暫填1234) */;
	memberAccount?: string /* 會員帳號 or 代理帳號 */;
	balanceDate?: string /* 入帳時間 */;
	amount?: number /* 存款金額 */;
	payChannelServiceID?: string /* 線路id */;
	fee?: number /* 交易手續費 */;
	thirdID?: string /* 三方單號 */;
	note?: string /* 備註說明 */;
}

export interface BACKENDAJAX_CreateNoteRequest {
	id?: string /* id */;
	note?: string /* note */;
}

export interface BACKENDAJAX_CreatePayChannelNameRequest {
	name?: string /* 商戶名稱名稱 */;
}

export interface BACKENDAJAX_PromotionListResponse {
	list?: Array<BACKENDAJAX_PromotionListResponseData> /* 優惠列表清單 */;
}

export interface BACKENDAJAX_DepositResponseData {
	id?: string /* id */;
	type?: number /* 到帳方式 1:系統 2:手動 4:代理 */;
	memberName?: string /* 會員姓名 or 代理姓名 */;
	memberAccount?: string /* 會員帳號 or 代理帳號 */;
	memberID?: number /* 會員ID or 代理ID */;
	payChannelServiceID?: number /* 線路ID */;
	amount?: number /* 存單金額 */;
	fee?: number /* 手續費 */;
	status?: number /* 狀態 1:處理中 2:失敗 3:完成 4:逾時 */;
	payGroupId?: number /* 三方金流組別id 代理為0 */;
	bankcardGroupId?: number /* 銀行卡金流組別id 代理為0 */;
	depositName?: string /* 存款人姓名 */;
	gatway?: string /* 存款線路 */;
	payment?: string /* 存款方式 */;
	thirdID?: string /* 三方單號 */;
	bankcard?: string /* 存款銀行卡 */;
	currency?: number /* 幣別 */;
	exchangeRate?: number /* 匯率 */;
	device?: number /* 裝置 1:WebPC 2:MobileWeb 3:AndroidPWA 4:iOSPWA */;
	balanceDate?: string /* 入帳日期 */;
	editorName?: string /* 執行人 */;
	createdAt?: string /* 存款時間 */;
	action?: string /* 備註行為 */;
	note?: string /* 備註 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_PromotionReadRequest {
	ID?: number /* ID */;
}

export interface BACKENDAJAX_EditBalanceDateRequest {
	id?: string /* id */;
	balanceDate?: string /* balanceDate */;
	note?: string /* note */;
}

export interface BACKENDAJAX_FakeCreateDepositRequest {
	memberAccount?: string /* 會員帳號 */;
	amount?: number /* 存款金額 */;
	payChannelServiceID?: string /* 線路id */;
	note?: string /* 備註說明 */;
}

export interface BACKENDAJAX_FakeCreateDepositResponse {
	id?: string /* 存款單id */;
}

export interface BACKENDAJAX_FakePaymentCallbackRequest {
	id?: string /* 存款單 or 出款單 id (存款單為 MDXXXX, 出款單 為流水號) */;
	status?: number /* 回調狀態 2:失敗 3:成功 */;
	fee?: number /* 交易手續費 */;
}

export interface BACKENDAJAX_FinanceListResponse {
	list?: Array<BACKENDAJAX_FinanceListResponseData> /* 前台顯示列表清單 */;
}

export interface BACKENDAJAX_PromotionSaveRequest {
	ID?: number /* ID */;
	name?: string /* 名稱 */;
	startTime?: string /* 活動時間 */;
	endTime?: string /* 活動時間 */;
	cycleType?: number /* 週期類型[1無限制2天3週4月] */;
	cycleTime?: string /* 週期時間 */;
	applyTimes?: number /* 可參加次數 */;
	withdrawTimes?: number /* 提領流水倍數 */;
	maxBonus?: number /* 單次回饋上限 */;
	cycleMaxBonus?: number /* 週期回饋上限 */;
	applyWay?: number /* 參加方式[1自動2自助] */;
	approveWay?: number /* 審核方式[1自動2自助] */;
	approveCycle?: number /* 審核週期[1當期2前期] */;
	receiveWay?: number /* 領取方式[1自動2自助] */;
	receiveTime?: string /* 領取時限 */;
	depositServiceCode?: Array<string | undefined> /* 存款支付方式(pay_channel_service/dropdown:serviceCode) */;
	platformRegister?: Array<number | undefined> /* 註冊允許平台[1:WebPC,2:MobileWeb,3:AndroidPWA,4:iOSPWA] */;
	platformLogin?: Array<number | undefined> /* 登入允許平台[1:WebPC,2:MobileWeb,3:AndroidPWA,4:iOSPWA] */;
	excludePromotion?: Array<number | undefined> /* 排除優惠 */;
	excludeMemberTag?: Array<number | undefined> /* 排除會員標籤 */;
	allowMemberTag?: Array<number | undefined> /* 允許會員標籤 */;
	allowMemberID?: Array<number | undefined> /* 允許會員ID */;
	allowVip?: Array<number | undefined> /* 允許的VIP */;
	allowAgencyMember?: Array<number | undefined> /* 允許的代理下線會員(輸入代理) */;
	description?: string /* 說明 */;
	otp?: string /* OTP驗證 */;
	status?: number /* 狀態[1開2關] */;
}

export interface BACKENDAJAX_GetChannelServiceToFinanceRequest {
	financeID?: number /* 前台顯示線路 id */;
	payChannelServiceID?: number /* 線路 id */;
}

export interface BACKENDAJAX_PayNoteResponseData {
	id?: number /* 紀錄ID (流水號) */;
	action?: string /* 行為 */;
	note?: string /* 紀錄 */;
	author?: string /* 編輯者 */;
	createdAt?: string /* 操作時間 */;
}

export interface BACKENDAJAX_GetFinanceUpdateInfoRequest {
	id?: string /* 指定的前台顯示線路ID */;
	name?: string /* 前台名稱 */;
	note?: string /* 說明 */;
	currency?: number /* 幣別: [1:人民幣 2:USDT-ERC 3:USDT-TRC] */;
	nums?: number /* 同時啟用最大線路數量 */;
	status?: number /* 啟用狀態 1: 啟用中, 2: 關閉不顯示 */;
	maintain?: number /* 維護狀態 1: 顯示維護中，用戶不能點擊，2: 正常使用中，用戶可以點擊 */;
	icon?: string /* icon位置 */;
	isRecommend?: boolean /* 是否推薦 true 推薦 false不推薦 */;
	needRealName?: boolean /* 是否需要真實姓名 true需要 false不需要 */;
	tooltip?: string /* 推廣文字 */;
	hasDoc?: boolean /* 是否有教學 true有 false沒有 */;
	docTitle?: string /* 教學文字 */;
	docURL?: string /* 教學位置 */;
}

export interface BACKENDAJAX_AuditResponse {
	ok?: boolean /* 是否取得審核頭香 true: 成功, false: 有其他人正在審核 */;
	acc?: string /* 假如 ok = false, $acc 為正在審核人帳號 */;
}

export interface BACKENDAJAX_GetFinanceEditInfoRequest {
	id?: string /* 指定的前台顯示線路ID */;
}

export interface BACKENDAJAX_GetFinanceInfoRequest {
	name?: string /* 前台名稱 */;
	note?: string /* 說明 */;
	currency?: number /* 幣別: [1:人民幣 2:USDT-ERC 3:USDT-TRC] */;
	nums?: number /* 同時啟用最大線路數量 */;
	status?: number /* 啟用狀態 1: 啟用中, 2: 關閉不顯示 */;
	maintain?: number /* 維護狀態 1: 顯示維護中，用戶不能點擊，2: 正常使用中，用戶可以點擊 */;
	icon?: string /* icon位置 */;
	isRecommend?: boolean /* 是否推薦 true 推薦 false不推薦 */;
	needRealName?: boolean /* 是否需要真實姓名 true需要 false不需要 */;
	tooltip?: string /* 推廣文字 */;
	hasDoc?: boolean /* 是否有教學 true有 false沒有 */;
	docTitle?: string /* 教學文字 */;
	docURL?: string /* 教學位置 */;
}

export interface BACKENDAJAX_GetFinanceListRequest {
	status?: number /* 0: 全部，啟用狀態 1: 啟用，2: 關閉 */;
	maintain?: number /* 0: 全部，維護狀態 1: 維護中，2: 正常 */;
}

export interface BACKENDAJAX_GetFinanceRemoveRequest {
	financeID?: number /* 前台顯示線路 id */;
}

export interface BACKENDAJAX_BankcardLogListRequest {
	logTimeStart?: string /* 交易時間開始 */;
	logTimeEnd?: string /* 交易時間結束 */;
	cardNo?: number /* 銀行卡號 */;
	orderBy?: number /* 排序[1倒序2正序] */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetPayChannelGroupIDsRequest {
	id?: number /* 當前線路的id */;
	ids?: Array<number | undefined> /* 金流群組ids */;
}

export interface BACKENDAJAX_GetPayChannelNameResponse {
	list?: Array<BACKENDAJAX_PayChannelNameData> /* 商戶資料 */;
}

export interface BACKENDAJAX_GetPayChannelRequest {
	sn?: string /* 商戶號 */;
	status?: number /* 商戶號狀態 */;
	name?: string /* 商戶名稱 */;
	supplyAp?: boolean /* 是否支援代付 */;
	sort?: string /* 排序欄位 */;
	dir?: string /* 排序方向 [desc | asc] */;
}

export interface BACKENDAJAX_GetPayChannelResponse {
	list?: Array<BACKENDAJAX_PayChannelResponseData> /* 資料列表 */;
}

export interface BACKENDAJAX_GetPayChannelSearchDropdownResponse {
	status?: Array<BACKENDAJAX_KeyValue> /* 狀態下拉清單 */;
	serviceCode?: Array<BACKENDAJAX_KeyValue> /* 支付方式下拉清單 */;
	method?: Array<BACKENDAJAX_KeyValue> /* 結算方式下拉清單 */;
	groups?: Array<BACKENDAJAX_KeyValue> /* 群組下拉清單 */;
}

export interface BACKENDAJAX_GetPayChannelServiceEditRequest {
	id?: string /* 線路ID */;
	name?: string /* 線路名稱 */;
	payChannelID?: number /* 商戶id */;
	device?: number /* 支援裝置 */;
	serviceCode?: string /* 支付方式 */;
	note?: string /* 備註 */;
	upperLimit?: number /* 單筆上限 */;
	lowerLimit?: number /* 單筆下限 */;
	dayLimit?: number /* 每日限額 */;
	fee?: number /* 每千手續費 */;
	perFee?: number /* 每筆手續費 */;
	status?: string /* 狀態 1:啟用 2:關閉 */;
}

export interface BACKENDAJAX_GetSearchPayChannelServiceRequest {
	financeID?: number /* 當前的前台顯示的線路ＩＤ */;
	name?: string /* 線路名稱 */;
	status?: number /* 狀態 */;
	serviceCode?: string /* 支付方式 */;
	method?: number /* 結帳方式 */;
	bankGroupID?: number /* 銀行卡金流組別 */;
	payGroupID?: number /* 三方金流組別 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetDepositResponse {
	count?: number /* 資料筆數 */;
	amount?: number /* 訂單總金額 */;
	fee?: number /* 訂單總手續費 */;
	avg?: number /* 訂單平均金額 */;
	max?: number /* 訂單最大金額 */;
	list?: Array<BACKENDAJAX_DepositResponseData> /* 資料列表 */;
}

export interface BACKENDAJAX_BankcardLogListResponse {
	list?: Array<BACKENDAJAX_BankcardLogListResponseData> /* 列表 */;
	count?: number /* 總筆數 */;
	countIn?: number /* 收入筆數 */;
	countOut?: number /* 支出筆數 */;
}

export interface BACKENDAJAX_PayChannelResponseData {
	id?: number /* id */;
	name?: string /* 商戶名稱 */;
	sn?: string /* 商戶號 */;
	status?: number /* 商戶號狀態 */;
	method?: number /* 結算方式，T0:1 T1:2 D0:3 D1:4 */;
	payChannelServiceCount?: number /* 線路數量 */;
	settle?: string /* 日切時間 */;
	remainAmount?: number /* 商戶餘額 */;
	frozenAmount?: number /* 凍結金額 */;
	todayDepositTotal?: number /* 今日累計收款 */;
	todayWithdrawalTotal?: number /* 今日累計出款 */;
	apUpperLimit?: number /* 代付每筆上限 */;
	apLowerLimit?: number /* 代付每筆下限 */;
	apDayLimit?: number /* 代付每日上限 */;
	apFee?: number /* 代付手續費，每千 */;
	apPerFee?: number /* 代付手續費，每筆 */;
	eighteenApUpperLimit?: number /* 18代付每筆上限 */;
	eighteenApLowerLimit?: number /* 18代付每筆下限 */;
	apAmount?: number /* 代付可用餘額 */;
	supplyAp?: boolean /* 是否有提供代付 */;
	apStatus?: number /* 代付狀態 */;
	spUpperLimit?: number /* 結算每筆上限 */;
	spLowerLimit?: number /* 結算每筆下限 */;
	spFee?: number /* 結算手續費，每千 */;
	spPerFee?: number /* 結算手續費，每筆 */;
	depositRatio?: number /* 可存放餘額百分比 ex: 0.73 = 73% */;
	depositLimit?: number /* 商戶號充值上限 */;
	depositUpperLimit?: number /* 充值每筆上限 */;
	depositLowerLimit?: number /* 充值每筆下限 */;
	depositFee?: number /* 充值手續費，每千 */;
	depositPerFee?: number /* 充值手續費，每筆 */;
	balanceUrl?: string /* 餘額查詢url */;
	orderQueryUrl?: string /* 訂單查詢url */;
	requestUrl?: string /* 三方代收的網址 */;
	notifyUrl?: string /* 三方回調網址 */;
	settleStime?: string /* 日切開始時間 */;
	settleEtime?: string /* 日切結束時間 */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_PayChannelServiceCreateRequest {
	name?: string /* 線路名稱 */;
	payChannelID?: number /* 商戶id */;
	serviceCode?: string /* 支付方式 */;
	note?: string /* 備註 */;
	upperLimit?: number /* 單筆上限 */;
	lowerLimit?: number /* 單筆下限 */;
	dayLimit?: number /* 每日限額 */;
	fee?: number /* 每千手續費 */;
	perFee?: number /* 每筆手續費 */;
	status?: number /* 狀態 1:啟用 2:關閉 */;
}

export interface BACKENDAJAX_PayChannelServiceCreateResponse {
	id?: number;
}

export interface BACKENDAJAX_PayChannelServiceGroupsResponse {
	groups?: Array<BACKENDAJAX_KeyValue> /* 不包含在線路的群組列表 */;
}

export interface BACKENDAJAX_BankcardLogListResponseData {
	ID?: number /* ID */;
	logTime?: string /* 交易時間 */;
	bankcardID?: number /* 銀行卡ID */;
	subjectID?: number /* 科目ID */;
	type?: number /* 收支類型[1收2支] */;
	amount?: number /* 金額 */;
	fee?: number /* 手續費 */;
	balance?: number /* 結餘 */;
	tradeID?: string /* 相關單號 */;
	thirdParty?: string /* 三方單號 */;
	tradeObjectType?: number /* 交易對象類型 */;
	tradeObject?: string /* 交易對象 */;
	note?: string /* 備註 */;
	updatedUser?: string /* 執行人 */;
	updatedAt?: string /* 更新時間 */;
}

export interface BACKENDAJAX_PayChannelServiceListResponse {
	list?: Array<BACKENDAJAX_PayChannelServiceListResponseData> /* 商戶列表清單 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_BankcardCreateRequest {
	cardNo?: number /* 銀行卡號 */;
	payBankID?: number /* 銀行ID */;
	accountName?: string /* 戶名 */;
	type?: number /* 用途[1出款2結算3中轉4倉庫] */;
	dayUpper?: number /* 每日上限 */;
	limitLower?: number /* 單筆下限 */;
	limitUpper?: number /* 單筆上限 */;
	originalAmount?: number /* 初始金額 */;
	broker?: string /* 卡商 */;
	province?: string /* 開戶省(中文) */;
	city?: string /* 開戶城市(中文) */;
	branch?: string /* 開戶分行 */;
	status?: number /* 狀態[1啟用2停用] */;
	note?: string /* 備註 */;
	bankAccount?: string /* 網銀帳號 */;
	oriLoginPw?: string /* 原始登入密碼 */;
	oriUPw?: string /* 原始U盾密碼 */;
	oriWithdrawalPw?: string /* 原始取款密碼 */;
	loginPw?: string /* 網銀登入密碼 */;
	uPw?: string /* 網銀U盾密碼 */;
	withdrawalPw?: string /* 網銀取款密碼 */;
	identity?: string /* 開戶人身份證件號 */;
	gender?: number /* 性別[1女2男] */;
	verifyDate?: string /* 驗卡日期 */;
	phone?: number /* 對應手機號 */;
}

export interface BACKENDAJAX_PayGroupCreateRequest {
	type?: number /* 群組類型 */;
	name?: string /* 群組中文名稱 */;
	nameEn?: string /* 群組英文名稱 */;
	depositLower?: number /* 單筆下限 */;
	depositUpper?: number /* 單筆上限 */;
	remark?: string /* 備註 */;
}

export interface BACKENDAJAX_PayGroupListRequest {
	type?: number /* 類型[1三方2銀行卡] */;
	name?: string /* 名稱 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_PayGroupListResponse {
	list?: Array<BACKENDAJAX_PayGroupListResponseData> /* 金流群組列表清單 */;
}

export interface BACKENDAJAX_PayRequest {
	orderSN?: string /* 提款單序號 */;
	type?: number /* 出款類型 1:銀行卡 2:商戶號 */;
	id?: number /* 出款類型 ID */;
	amount?: number /* 出款金額 */;
	fee?: number /* 手續費 (銀行卡自填 三方等回調) */;
}

export interface BACKENDAJAX_PayGroupMemberCreateRequest {
	payGroupID?: number /* 群組ID */;
	memberAccounts?: string /* 玩家帳號 */;
}

export interface BACKENDAJAX_PayGroupReadRequest {
	ID?: number /* ID */;
}

export interface BACKENDAJAX_PayGroupSaveRequest {
	ID?: number /* ID */;
	name?: string /* 群組中文名稱 */;
	nameEn?: string /* 群組英文名稱 */;
	depositLower?: number /* 單筆下限 */;
	depositUpper?: number /* 單筆上限 */;
	remark?: string /* 備註 */;
}

export interface BACKENDAJAX_PayGroupSaveResponse {
	ID?: number;
}

export interface BACKENDAJAX_SuccessResponse {
	success?: boolean /* 請求是不是成功 */;
}

export interface BACKENDAJAX_UpdatePayChannelRequest {
	id?: number /* 商戶號id */;
	payChannelNameID?: number /* 商戶id */;
	sn?: string /* 商戶號 */;
	method?: number /* 結算方式，T0:0 T1:1 D0:2 D1:3 */;
	supplyAp?: boolean /* 是否支援代付 */;
	apUpperLimit?: number /* 代付每筆上限 */;
	apLowerLimit?: number /* 代付每筆下限 */;
	apDayLimit?: number /* 代付每日上限 */;
	apFee?: number /* 代付手續費，每千 */;
	apPerFee?: number /* 代付手續費，每筆 */;
	apStatus?: number /* 代付狀態[1:啟用,2:停用] */;
	eighteenApUpperLimit?: number /* 18代付每筆上限 */;
	eighteenApLowerLimit?: number /* 18代付每筆下限 */;
	spUpperLimit?: number /* 結算每筆上限 */;
	spLowerLimit?: number /* 結算每筆下限 */;
	spFee?: number /* 結算手續費，每千 */;
	spPerFee?: number /* 結算手續費，每筆 */;
	depositLimit?: number /* 商戶號充值上限 */;
	depositUpperLimit?: number /* 充值每筆上限 */;
	depositLowerLimit?: number /* 充值每筆下限 */;
	depositFee?: number /* 充值手續費，每千 */;
	depositPerFee?: number /* 充值手續費，每筆 */;
	balanceUrl?: string /* 餘額查詢url */;
	orderQueryUrl?: string /* 訂單查詢url */;
	requestUrl?: string /* 三方代收的網址 */;
	notifyUrl?: string /* 三方回調網址 */;
	settleStime?: string /* 日切開始時間 */;
	settleEtime?: string /* 日切結束時間 */;
	note?: string /* 備註 */;
	status?: number /* 啟用狀態[1:啟用,2:停用] */;
}

export interface BACKENDAJAX_FinanceListResponseData {
	id?: number /* ID */;
	name?: string /* 名稱 */;
	note?: string /* 說明 */;
	currency?: number /* 幣別: [1:人民幣 2:USDT-ERC 3:USDT-TRC] */;
	nums?: number /* 同時啟用線路 */;
	icon?: string /* icon位置 */;
	isRecommend?: boolean /* 是否推薦 */;
	needRealName?: boolean /* 是否需要真實姓名 */;
	tooltip?: string /* 推廣文字 */;
	hasDoc?: boolean /* 是否有教學 */;
	docTitle?: string /* 教學文字 */;
	docURL?: string /* 教學位置 */;
	services?: Array<BACKENDAJAX_PayChannelServiceListResponseData> /* 已經在顯示線路的商戶線路 */;
	status?: number /* 顯示狀態 */;
	maintain?: number /* 維護狀態 */;
	updatedAt?: string /* 最後更新時間 */;
	updatedUser?: string /* 執行人 */;
}

export interface BACKENDAJAX_PayChannelServiceListResponseData {
	id?: number /* 線路ＩＤ */;
	name?: string /* 商戶名稱 */;
	rate?: number /* 線路成功率 */;
	groups?: Array<BACKENDAJAX_KeyValue> /* 金流群組 */;
	amount?: number /* 今日收款總額 */;
	remain?: number /* 剩餘可使用額度 */;
	settle?: string /* 商戶日切時間 */;
	upperLimit?: number /* 單筆上限 */;
	lowerLimit?: number /* 單筆下限 */;
	dayLimit?: number /* 每日限額 */;
	perFee?: number /* 每千元手續費 */;
	fee?: number /* 單筆手續費 */;
	status?: number /* 狀態 1:啟用 2:關閉 */;
	note?: string /* 備註 */;
	serviceCode?: string /* 支付方式 */;
	method?: number /* 結帳方式 */;
	payChannelID?: number /* 商戶ＩＤ */;
}

export interface BACKENDAJAX_PayGroupListResponseData {
	ID?: number /* 群組ID */;
	type?: number /* 群組類型[1三方2銀行卡] */;
	name?: string /* 中文名稱 */;
	nameEn?: string /* 英文名稱 */;
	depositLower?: number /* 單筆下限 */;
	depositUpper?: number /* 單筆上限 */;
	remark?: string /* 備註 */;
	editFlag?: number /* 編輯權限 */;
	payChannelServiceName?: string /* 當前線路 */;
	payChannelServiceCnt?: number /* 代收線路數 */;
	memberCnt?: number /* 會員人數 */;
	updatedUser?: number /* 更新者ID */;
	updatedUserName?: string /* 更新者帳號 */;
	updatedAt?: string /* 更新時間 */;
}

export interface BACKENDAJAX_TradePayChannelRequest {
	id?: number /* id */;
	tradeObject?: string /* 商戶號 */;
	amount?: number /* 異動金額 */;
	fee?: number /* 手續費 */;
	thirdParty?: string /* 三方單號 */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_PromotionCondListResponseData {
	ID?: number /* ID */;
	promotionID?: number /* 優惠ID */;
	type?: number /* 優惠模板[1存款,2投注,3流水] */;
	gameTypeID?: number /* 允許的遊戲類型 */;
	gameListID?: number /* 允許的遊戲ID */;
	rangeMin?: string /* 區間 */;
	rangeMax?: string /* 區間 */;
	bonusType?: number /* 回饋類型[1比例2區間隨機] */;
	bonus?: Array<number | undefined> /* 回饋 */;
	orderNo?: number /* 回饋排序 */;
}

export interface BACKENDAJAX_CalcFeeRequest {
	amount?: number /* 存款金額 */;
	payChannelServiceID?: string /* 線路id */;
}

export interface BACKENDAJAX_FeeResponse {
	fee?: number /* 參考手續費 */;
}

export interface BACKENDAJAX_BankcardDropdownResponse {
	status?: Array<BACKENDAJAX_KeyValue> /* 狀態下拉清單 */;
	type?: Array<BACKENDAJAX_KeyValue> /* 卡片用途下拉清單 */;
	gender?: Array<BACKENDAJAX_KeyValue> /* 性別下拉清單 */;
	banks?: Array<BACKENDAJAX_KeyValue> /* 銀行下拉清單 */;
	bankcardLogType?: Array<BACKENDAJAX_KeyValue> /* 明細類型下拉清單 */;
	bankcardLogTradeType?: Array<BACKENDAJAX_KeyValue> /* 明細交易對象類型下拉清單 */;
	subjects?: Array<BACKENDAJAX_KeyValue> /* 科目下拉清單 */;
	city?: Array<BACKENDAJAX_KeyValue> /* 開戶省市下拉清單 */;
}

export interface BACKENDAJAX_GetPayNoteResponse {
	list?: Array<BACKENDAJAX_PayNoteResponseData> /* 操作紀錄 */;
}

export interface BACKENDAJAX_CreatePayChannelRequest {
	payChannelNameID?: number /* 商戶id */;
	sn?: string /* 商戶號 */;
	method?: number /* 結算方式，T0:0 T1:1 D0:2 D1:3 */;
	supplyAp?: boolean /* 是否支援代付 */;
	apUpperLimit?: number /* 代付每筆上限 */;
	apLowerLimit?: number /* 代付每筆下限 */;
	apDayLimit?: number /* 代付每日上限 */;
	apFee?: number /* 代付手續費，每千 */;
	apPerFee?: number /* 代付手續費，每筆 */;
	apStatus?: number /* 代付狀態[1:啟用,2:停用] */;
	eighteenApUpperLimit?: number /* 18代付每筆上限 */;
	eighteenApLowerLimit?: number /* 18代付每筆下限 */;
	spUpperLimit?: number /* 結算每筆上限 */;
	spLowerLimit?: number /* 結算每筆下限 */;
	spFee?: number /* 結算手續費，每千 */;
	spPerFee?: number /* 結算手續費，每筆 */;
	depositLimit?: number /* 商戶號充值上限 */;
	depositUpperLimit?: number /* 充值每筆上限 */;
	depositLowerLimit?: number /* 充值每筆下限 */;
	depositFee?: number /* 充值手續費，每千 */;
	depositPerFee?: number /* 充值手續費，每筆 */;
	balanceUrl?: string /* 餘額查詢url */;
	orderQueryUrl?: string /* 訂單查詢url */;
	requestUrl?: string /* 三方代收的網址 */;
	notifyUrl?: string /* 三方回調網址 */;
	settleStime?: string /* 日切開始時間 */;
	settleEtime?: string /* 日切結束時間 */;
	note?: string /* 備註 */;
	status?: number /* 啟用狀態[1:啟用,2:停用] */;
}

export interface BACKENDAJAX_PayoutMethodResponseData {
	id?: number /* id */;
	name?: string /* 名稱 or 卡號 */;
	limitUpper?: number /* 每筆上限 */;
	limitLower?: number /* 每筆下限 */;
	dayUpper?: number /* 每日上限 */;
	balance?: number /* 目前餘額 */;
}

export interface BACKENDAJAX_PayChannelServiceListRequest {
	name?: string /* 線路名稱 */;
	status?: number /* 狀態 */;
	serviceCode?: string /* 支付方式 */;
	bankGroupID?: number /* 銀行卡金流組別 */;
	thirdGroupID?: number /* 三方金流組別 */;
	payChannelID?: number /* 商戶號 */;
	payChannelNameID?: number /* 商戶 */;
	method?: number /* 結算方式 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetDepositRequest {
	source?: number /* 1會員存款 2代理存款 (預設會員存款) */;
	createdAtStart?: string /* 存款時間 start */;
	createdAtEnd?: string /* 存款時間 end */;
	updateAtStart?: string /* 最後更新時間 start */;
	updateAtEnd?: string /* 最後更新時間 end */;
	status?: number /* 狀態： 0:全部 1:處理中 2:失敗 3:完成 4:逾時 */;
	id?: string /* 單號：模糊搜尋，可同時搜尋我方存款單號與三方單號 */;
	method?: string /* 存款方式：全部、支付寶、微信等支付方式，下拉式選擇 */;
	memberName?: string /* 會員帳號 or 代理帳號：模糊搜尋 */;
	memberID?: number /* 會員 ID or 代理 ID */;
	payGroupID?: number /* 三方金流群組id */;
	bankcardGroupID?: number /* 存款卡金流群組id */;
	balanceDate?: string /* 入帳日期 */;
	serviceName?: string /* 線路：模糊搜尋 */;
	bankcard?: string /* 網關銀行卡號：模糊搜尋 */;
	device?: number /* 裝置 1:WebPC 2:MobileWeb 4:AndroidPWA 8:iOSPWA */;
	type?: string /* 到帳方式 0:全部 1:系統 2:手動 4:代理 , 逗號分開 預設 1,2 */;
	payChannelNameID?: number /* 商戶ID */;
	payChannelID?: number /* 商戶號ID */;
	sort?: string /* 排序欄位 */;
	dir?: string /* 排序方向 [desc | asc] */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetPayoutMethodResponse {
	bankcardList?: Array<BACKENDAJAX_PayoutMethodResponseData> /* 銀行卡列表 */;
	payChannelList?: Array<BACKENDAJAX_PayoutMethodResponseData> /* 三方商戶號列表 */;
}

export interface BACKENDAJAX_PayChannelSearchResponse {
	type?: number /* 類型 1:銀行卡 2:商戶號 */;
	id?: number /* 銀行卡 或 商戶號 id */;
	name?: string /* 戶名 or 商戶名 */;
	bankName?: string /* 銀行名稱 (銀行卡才有) */;
	bankcardType?: string /* 銀行卡用途[1出款2結算3中轉4倉庫] */;
}

export interface BACKENDAJAX_BankcardListRequest {
	cardNo?: number /* 銀行卡號 */;
	status?: number /* 狀態[1啟用2停用] */;
	type?: number /* 用途[1出款2結算3中轉4倉庫] */;
	accountName?: string /* 戶名 */;
	payBankID?: number /* 銀行ID */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_BankcardListResponseData {
	ID?: number /* ID */;
	cardNo?: number /* 卡號 */;
	payBankID?: number /* 銀行ID */;
	bankName?: string /* 銀行名稱 */;
	bankCode?: string /* 銀行代號 */;
	accountName?: string /* 戶名 */;
	type?: number /* 用途 */;
	dayIn?: number /* 今日進 */;
	dayOut?: number /* 今日出 */;
	balance?: number /* 帳戶餘額 */;
	limitLower?: number /* 單筆下限 */;
	limitUpper?: number /* 單筆上限 */;
	originalAmount?: number /* 初始金額 */;
	broker?: string /* 卡商 */;
	province?: string /* 開戶省 */;
	city?: string /* 開戶城市 */;
	branch?: string /* 開戶分行 */;
	status?: number /* 狀態 */;
	note?: string /* 備註 */;
	bankAccount?: string /* 網銀帳號 */;
	oriLoginPw?: string /* 原始登入密碼 */;
	oriUPw?: string /* 原始U盾密碼 */;
	oriWithdrawalPw?: string /* 原始取款密碼 */;
	loginPw?: string /* 網銀登入密碼 */;
	uPw?: string /* 網銀U盾密碼 */;
	withdrawalPw?: string /* 網銀取款密碼 */;
	identity?: string /* 開戶人身分證號 */;
	gender?: number /* 性別 */;
	verifyDate?: string /* 驗卡日期 */;
	phone?: number /* 對應手機號 */;
	updatedAt?: string /* 更新時間 */;
}

export interface BACKENDAJAX_BankcardLockRequest {
	bankcardID?: number /* 銀行卡ID */;
	amount?: number /* 金額 */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_BankcardTransferRequest {
	bankcardID?: number /* 銀行卡ID */;
	cardNo?: number /* 目標銀行卡號 */;
	amount?: number /* 金額 */;
	fee?: number /* 手續費 */;
	logTime?: string /* 入帳時間 */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_GetRearrangementRequest {
	id?: number /* 線路ＩＤ */;
	sort?: number /* 重新排序後的位置，由 1 開始計算，例如：重新排序後的位置是第三，則帶 3 */;
}

export interface BACKENDAJAX_GetWithdrawalPayoutResponse {
	orderSn?: string /* 提款單號 */;
	account?: string /* 會員帳號 */;
	amount?: number /* 出款總金額 */;
	fee?: number /* 出款總金額 */;
	payAmount?: number /* 出款總金額 */;
	totalAmount?: number /* 已出款金額，包含已出款，出款中的金額，不包含失敗金額 */;
	bankcard?: string /* 銀行卡號 */;
	bankName?: string /* 銀行名 */;
	withdrawalName?: string /* 戶名 */;
	payouts?: Array<BACKENDAJAX_GetWithdrawalPayoutData> /* 出款單列表 */;
}

export interface BACKENDAJAX_PromotionCondSaveRequest {
	ID?: number /* ID */;
	promotionID?: number /* 優惠ID */;
	type?: number /* 優惠模板[1存款,2投注,3流水,4返水,5盈利] */;
	gameTypeID?: number /* 允許的遊戲類型 */;
	gameListID?: number /* 允許的遊戲ID */;
	rangeMin?: string /* 區間 */;
	rangeMax?: string /* 區間 */;
	bonusType?: number /* 回饋類型[1比例2區間隨機] */;
	bonus?: Array<number | undefined> /* 回饋(區間隨機) */;
	orderNo?: number /* 回饋排序 */;
	otp?: string /* OTP驗證 */;
}

export interface BACKENDAJAX_GetWithdrawalResponseData {
	transactionID?: string /* 提款單號 */;
	transactionTime?: string /* 提款時間 */;
	amount?: number /* 提款金額 */;
	status?: Array<BACKENDAJAX_KeyValue> /* 狀態 */;
	bankGroup?: Array<BACKENDAJAX_KeyValue> /* 銀行卡群組 */;
	thirdGroup?: Array<BACKENDAJAX_KeyValue> /* 三方群組 */;
	member?: Array<BACKENDAJAX_KeyValue> /* 會員帳號 or 代理帳號 */;
	bankAccount?: string /* 戶名 */;
	bankCode?: string /* 銀行 */;
	memberBankNo?: string /* 會員銀行卡號 */;
	financialCheck?: Array<BACKENDAJAX_KeyValue> /* 財務查核 */;
	riskCheck?: Array<BACKENDAJAX_KeyValue> /* 風控查核 */;
	checkNote?: Array<string | undefined> /* 審核資訊 */;
	lastUpdate?: string /* 最後更新時間 */;
	updatedBy?: string /* 執行人 */;
	creditDate?: string /* 出帳日期 */;
}

export interface BACKENDAJAX_GetPayChannelServiceRequest {
	id?: number /* 線路ＩＤ */;
	type?: number /* 類型[1三方2銀行卡] */;
}

export interface BACKENDAJAX_USDTData {
	id?: number /* ID */;
	name?: string /* 帳戶名稱 */;
	address?: string /* 錢包位置 */;
	useType?: number /* 用途 [0無1出款2結算3中轉4倉庫] */;
	type?: number /* 錢包類型 [2ERC 3TRC] */;
	todayIn?: number /* 今日進款 */;
	todayOut?: number /* 今日出款 */;
	balance?: number /* 帳戶餘額 */;
	originalAmount?: number /* 初始金額 */;
	status?: number /* 狀態[1啟用2停用] */;
}

export interface BACKENDAJAX_BankcardLogNoteCreateRequest {
	bankcardLogID?: number /* 銀行卡明細ID */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_BankcardSaveRequest {
	ID?: number /* ID */;
	cardNo?: number /* 銀行卡號 */;
	payBankID?: number /* 銀行ID */;
	accountName?: string /* 戶名 */;
	type?: number /* 用途[1出款2結算3中轉4倉庫] */;
	dayUpper?: number /* 每日上限 */;
	limitLower?: number /* 單筆下限 */;
	limitUpper?: number /* 單筆上限 */;
	broker?: string /* 卡商 */;
	province?: string /* 開戶省(中文) */;
	city?: string /* 開戶城市(中文) */;
	branch?: string /* 開戶分行 */;
	status?: number /* 狀態[1啟用2停用] */;
	note?: string /* 備註 */;
	bankAccount?: string /* 網銀帳號 */;
	oriLoginPw?: string /* 原始登入密碼 */;
	oriUPw?: string /* 原始U盾密碼 */;
	oriWithdrawalPw?: string /* 原始取款密碼 */;
	loginPw?: string /* 網銀登入密碼 */;
	uPw?: string /* 網銀U盾密碼 */;
	withdrawalPw?: string /* 網銀取款密碼 */;
	identity?: string /* 開戶人身份證件號 */;
	gender?: number /* 性別[1女2男] */;
	verifyDate?: string /* 驗卡日期 */;
	phone?: number /* 對應手機號 */;
}

export interface BACKENDAJAX_ChangePayChannelAmountRequest {
	id?: number /* 異動商戶號id */;
	targetType?: number /* 類型 1:銀行卡 2:商戶號 */;
	targetID?: number /* 銀行卡 或 商戶號 id */;
	amount?: number /* 異動金額 */;
	fee?: number /* 手續費 */;
	thirdID?: string /* 三方單號 */;
	note?: string /* 異動備註 */;
}

export interface BACKENDAJAX_PromotionCreateRequest {
	name?: string /* 名稱 */;
	startTime?: string /* 活動時間 */;
	endTime?: string /* 活動時間 */;
	cycleType?: number /* 週期類型[1無限制2天3週4月] */;
	cycleTime?: string /* 週期時間 */;
	applyTimes?: number /* 可參加次數 */;
	withdrawTimes?: number /* 提領流水倍數 */;
	maxBonus?: number /* 單次回饋上限 */;
	cycleMaxBonus?: number /* 週期回饋上限 */;
	applyWay?: number /* 參加方式[1自動2自助] */;
	approveWay?: number /* 審核方式[1自動2自助] */;
	approveCycle?: number /* 審核週期[1當期2前期] */;
	receiveWay?: number /* 領取方式[1自動2自助] */;
	receiveTime?: string /* 領取時限 */;
	depositServiceCode?: Array<string | undefined> /* 存款支付方式(pay_channel_service/dropdown:serviceCode) */;
	platformRegister?: Array<number | undefined> /* 註冊允許平台[1:WebPC,2:MobileWeb,3:AndroidPWA,4:iOSPWA] */;
	platformLogin?: Array<number | undefined> /* 登入允許平台[1:WebPC,2:MobileWeb,3:AndroidPWA,4:iOSPWA] */;
	excludePromotion?: Array<number | undefined> /* 排除優惠 */;
	excludeMemberTag?: Array<number | undefined> /* 排除會員標籤 */;
	allowMemberTag?: Array<number | undefined> /* 允許會員標籤 */;
	allowMemberID?: Array<number | undefined> /* 允許會員ID */;
	allowVip?: Array<number | undefined> /* 允許的VIP */;
	allowAgencyMember?: Array<number | undefined> /* 允許的代理下線會員(輸入代理) */;
	description?: string /* 說明 */;
}

export interface BACKENDAJAX_GetPayChannelAmountLogData {
	id?: number /* id */;
	createdAt?: string /* 交易時間 */;
	subjectID?: number /* 科目ID */;
	in?: number /* 收 */;
	out?: number /* 支 */;
	fee?: number /* 手續費 */;
	remainBalance?: number /* 結餘 */;
	frozenBalance?: number /* 凍結結餘 */;
	relationID?: string /* 相關單號 */;
	thirdID?: string /* 三方單號 */;
	targetType?: number /* 交易對象類型 0無對象 1銀行卡 2商戶號 3會員 4代理 5USDT */;
	targetID?: number /* 交易對象ID */;
	targetName?: string /* 交易對象 (會員帳號 商戶號 卡號) */;
	editorName?: string /* 執行人 */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_GetPayChannelAmountLogRequest {
	createdAtStart?: string /* 交易時間開始 */;
	createdAtEnd?: string /* 交易時間結束 */;
	payChannelID?: number /* 商戶號 ID */;
	payChannelServiceID?: number /* 線路 ID */;
	payChannel?: string /* 商戶號 */;
	payChannelService?: string /* 線路名稱 */;
	dir?: string /* 排序方向 [desc | asc] */;
}

export interface BACKENDAJAX_GetPayChannelAmountLogResponse {
	list?: Array<BACKENDAJAX_GetPayChannelAmountLogData> /* 帳務明細列表 */;
	fee?: number /* 手續費 */;
	in?: number /* 收 */;
	out?: number /* 支 */;
}

export interface BACKENDAJAX_GetPaymentAllDropDownResponse {
	payChannelName?: Array<BACKENDAJAX_KeyValue> /* 商戶 */;
	payChannel?: Array<BACKENDAJAX_KeyValue> /* 商戶號 */;
	payChannelService?: Array<BACKENDAJAX_KeyValue> /* 線路	 */;
	bankGroups?: Array<BACKENDAJAX_KeyValue> /* 銀行卡金流組別 */;
	thirdGroups?: Array<BACKENDAJAX_KeyValue> /* 三方金流組別 */;
	subjects?: Array<BACKENDAJAX_KeyValue> /* 科目 type[1收2支] */;
	status?: Array<BACKENDAJAX_KeyValue> /* 状态下拉清单 */;
	serviceCode?: Array<BACKENDAJAX_KeyValue> /* 支付方式下拉清单 */;
	method?: Array<BACKENDAJAX_KeyValue> /* 结算方式下拉清单 */;
	groups?: Array<BACKENDAJAX_KeyValue> /* 群组下拉清单 */;
	type?: Array<BACKENDAJAX_KeyValue> /* 卡片用途下拉清单 */;
	gender?: Array<BACKENDAJAX_KeyValue> /* 性别下拉清单 */;
	banks?: Array<BACKENDAJAX_KeyValue> /* 银行下拉清单 */;
	city?: Array<BACKENDAJAX_KeyValue> /* 开户省市下拉清单 */;
}

export interface BACKENDAJAX_GetWithdrawalIndexRequest {
	source?: number /* 1會員提款 2代理提款 (預設會員提款) */;
	withdrawalStart?: string /* 提款時間:開始 */;
	withdrawalEnd?: string /* 提款時間:結束 */;
	memberAccount?: string /* 會員帳號 or 代理帳號 */;
	memberID?: number /* 會員 ID or 代理 ID */;
	orderSn?: string /* 提款單號 */;
	status?: number /* 狀態，全部（預設）、待審核、待出款、退回、出款中、成功、失敗 */;
	withdrawalName?: string /* 戶名 模糊搜尋 */;
	bankName?: string /* 提款銀行 */;
	bankcardNo?: number /* 銀行卡號 */;
	updatedStart?: string /* 最後更新時間:開始 */;
	updatedEnd?: string /* 最後更新時間：結束 */;
	riskCheck?: string /* 風控查核 */;
	financialCheck?: string /* 財務查核 */;
	bankcardGroupID?: number /* 銀行卡組別 */;
	thirdGroupID?: number /* 三方金流組別 */;
	creditDate?: string /* 出帳日期 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetWithdrawalIndexResponse {
	list?: Array<BACKENDAJAX_GetWithdrawalResponseData> /* 提款列表清單 */;
	count?: number /* 總筆數 */;
	max?: number /* 最大提款金額 */;
	avg?: number /* 平均提款金額 */;
	total?: number /* 提款金額總和 */;
	fee?: number /* 提款手續費總和 */;
}

export interface BACKENDAJAX_GetWithdrawalPayoutRequest {
	orderSn?: string /* 提款單號 */;
}

export interface BACKENDAJAX_PromotionCondCreateRequest {
	promotionID?: number /* 優惠ID */;
	type?: number /* 優惠模板[1存款,2投注,3流水,4返水,5盈利] */;
	gameTypeID?: number /* 允許的遊戲類型 */;
	gameListID?: number /* 允許的遊戲ID */;
	rangeMin?: string /* 區間 */;
	rangeMax?: string /* 區間 */;
	bonusType?: number /* 回饋類型[1比例2區間隨機] */;
	bonus?: Array<number | undefined> /* 回饋(區間隨機) */;
	orderNo?: number /* 回饋排序 */;
	otp?: string /* OTP驗證 */;
}

export interface BACKENDAJAX_PromotionLaunchedListResponse {
	list?: Array<BACKENDAJAX_PromotionLaunchedListResponseData> /* 優惠上架列表 */;
}

export interface BACKENDAJAX_PromotionMemberSaveRequest {
	ID?: number /* ID */;
	status?: number /* 狀態 */;
	promotionCondIDs?: string /* 優惠條件IDs */;
	amount?: number /* 達標金額 */;
	bonus?: number /* 回饋 */;
	withdrawLimit?: number /* 提款流水限額 */;
}

export interface BACKENDAJAX_PromotionLaunchedListRequest {
	name?: string /* 名稱 */;
	type?: number /* 類型 */;
	display?: number /* 顯示 */;
	device?: number /* 裝置 */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	orderBy?: number /* 排序條件 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_FakeCreateWithdrawalRequest {
	memberAccount?: string /* 會員帳號 */;
	amount?: number /* 存款金額 */;
}

export interface BACKENDAJAX_GetPayingNaviResponse {
	list?: Array<BACKENDAJAX_PayingNaviResponseData> /* 資料列表 */;
	count?: number /* 資料筆數 */;
}

export interface BACKENDAJAX_PayingNaviResponseData {
	id?: number /* id */;
	sort?: number /* 排序 */;
	name?: string /* 商戶名稱 */;
	balance?: number /* 目前可代付餘額 */;
	paying?: boolean /* 是否為出款中 true:出款中 false:空閒 */;
	status?: number /* 是否啟用快速出款 1:啟用 2:停用 */;
}

export interface BACKENDAJAX_PromotionSelfRequest {
	ID?: number /* ID */;
}

export interface BACKENDAJAX_PromotionCondListRequest {
	promotionID?: number /* 優惠ID */;
}

export interface BACKENDAJAX_PromotionListResponseData {
	ID?: number /* ID */;
	name?: string /* 名稱 */;
	startTime?: string /* 活動時間開始 */;
	endTime?: string /* 活動時間結束 */;
	cycleType?: number /* 週期類型[1無限制2天3週4月] */;
	cycleTime?: string /* 週期時間 */;
	applyTimes?: number /* 可參加次數 */;
	withdrawTimes?: number /* 提領流水倍數 */;
	maxBonus?: number /* 單次回饋上限 */;
	cycleMaxBonus?: number /* 週期回饋上限 */;
	status?: number /* 狀態[1開2關] */;
	applyWay?: number /* 參加方式[1自動2自助] */;
	approveWay?: number /* 審核方式[1自動2自助] */;
	approveCycle?: number /* 審核週期[1當期2前期] */;
	receiveWay?: number /* 領取方式[1自動2自助] */;
	receiveTime?: string /* 領取時限 */;
	depositServiceCode?: Array<string | undefined> /* 存款支付方式 */;
	platformRegister?: Array<number | undefined> /* 註冊允許平台 */;
	platformLogin?: Array<number | undefined> /* 登入允許平台 */;
	excludePromotion?: Array<number | undefined> /* 排除優惠 */;
	excludeMemberTag?: Array<number | undefined> /* 排除會員標籤 */;
	allowMemberTag?: Array<number | undefined> /* 允許會員標籤 */;
	allowMemberID?: Array<number | undefined> /* 允許會員ID */;
	allowVip?: Array<number | undefined> /* 允許的VIP */;
	allowAgencyMember?: Array<number | undefined> /* 允許的代理下線會員 */;
	description?: string /* 說明 */;
	updatedUser?: string /* 執行人 */;
	updatedAt?: string /* 更新時間 */;
}

export interface BACKENDAJAX_PromotionMemberBatchListResponse {
	list?: Array<BACKENDAJAX_PromotionMemberBatchListResponseData> /* 優惠批次派發列表 */;
}

export interface BACKENDAJAX_PromotionMemberBatchListResponseData {
	ID?: number /* ID */;
	batchID?: number /* 批次流水號 */;
	promotionID?: number /* 優惠流水號 */;
	promotionName?: string /* 優惠名稱 */;
	batchCycle?: string /* 派發週期 */;
	approveWay?: number /* 審核方式 */;
	totalAmount?: number /* 總金額 */;
	memberNumber?: number /* 總數量 */;
	memberFailNumber?: number /* 失敗數量 */;
	sendAt?: string /* 派發時間 */;
	updatedUser?: string /* 執行人 */;
}

export interface BACKENDAJAX_PromotionMemberListRequest {
	promotionID?: number /* 優惠流水號 */;
	promotionName?: string /* 優惠名稱 */;
	batchID?: number /* 批次流水號 */;
	memberID?: number /* 會員ID */;
	memberAccount?: string /* 會員帳號 */;
	status?: number /* 狀態 */;
	sendAtStart?: string /* 派發時間開始 */;
	sendAtEnd?: string /* 派發時間結束 */;
	approveWay?: number /* 審核方式 */;
	receiveWay?: number /* 領取方式 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_PromotionMemberListResponse {
	list?: Array<BACKENDAJAX_PromotionMemberListResponseData> /* 優惠申請清單 */;
}

export interface BACKENDAJAX_PromotionMemberAndCondRequest {
	memberID?: number /* 會員ID */;
	receiveAtStart?: string /* 領取時間開始 */;
	receiveAtEnd?: string /* 領取時間結束 */;
}

export interface BACKENDAJAX_PromotionCondDelRequest {
	promotionID?: number /* 優惠ID */;
	type?: number /* 模板類型 */;
	otp?: string /* OTP驗證 */;
}

export interface BACKENDAJAX_CreateWithdrawalRequest {
	source?: number /* 1會員提款 2代理提款 (預設代理提款) */;
	memberID?: string /* 會員id or 代理id */;
	amount?: number /* 提款金額 */;
	type?: number /* 1:銀行卡 2:USDT_ERC 3:USDT_TRC */;
	useDefault?: boolean /* 使用既有提款資訊 (true: 使用, false: 自行填入) */;
	payBankID?: number /* 銀行id */;
	withdrawalName?: string /* 戶名 */;
	bankcard?: string /* 銀行卡號 or 綁定定址 */;
}

export interface BACKENDAJAX_GetAgencyWithdrawalInfoResponse {
	id?: string /* 單號 */;
	createdAt?: string /* 申請時間 */;
	status?: number /* 狀態 1.待審核 2.待出款 3.退回 4.出款中 5. 完成 6.失敗 */;
	amount?: number /* 金額 */;
	money?: number /* 目前錢包 */;
	moneyStatus?: boolean /* 目前錢包是否建議通過 (true綠勾勾) */;
	lockMoney?: number /* 凍結金額 */;
	agencyAccount?: string /* 代理帳號 */;
	agencyID?: number /* 代理 ID */;
	agencyWithdrawStatus?: boolean /* 代理提款狀態 (true綠勾勾) */;
	withdrawDayLimit?: number /* 單日提款上限 */;
	withdrawDaySum?: number /* 本日累計提款 */;
	withdrawalName?: string /* 戶名 */;
	bankName?: string /* 銀行 */;
	bankcard?: string /* 銀行帳戶 */;
	turnoverStatus?: boolean /* 目前存款流水限制是否建議通過 (true綠勾勾) */;
	turnover?: number /* 目前存款流水限制 */;
}

export interface BACKENDAJAX_PromotionMemberAndCondResponseData {
	gameTypeID?: number /* 遊戲類型 */;
	gameListID?: number /* 遊戲廠商 */;
	withdrawLimit?: number /* 限制流水 */;
}

export interface BACKENDAJAX_GetWithdrawalBettingLogResponse {
	list?: Array<BACKENDAJAX_KeyValue> /* 流水列表 */;
}

export interface BACKENDAJAX_GetUSDTListRequest {
	name?: string /* 帳戶名稱 */;
	useType?: number /* 用途[-1全部 0無 1出款 2結算 3中轉 4倉庫] */;
	type?: number /* 錢包類型 [0全部 2ERC 3TRC] */;
	status?: number /* 狀態 [0全部 1啟用 2停用] */;
}

export interface BACKENDAJAX_GetUSDTListResponse {
	list?: Array<BACKENDAJAX_USDTData> /* 列表 */;
}

export interface BACKENDAJAX_GetUSDTLogRequest {
	createdAtStart?: string /* 交易時間開始 */;
	createdAtEnd?: string /* 交易時間結束 */;
	usdtID?: number /* usdt 帳戶 ID */;
	dir?: string /* 排序方向 [desc | asc] */;
}

export interface BACKENDAJAX_GetUSDTLogResponse {
	list?: Array<BACKENDAJAX_USDTLogData> /* 帳務明細列表 */;
	fee?: number /* 手續費 */;
	in?: number /* 收 */;
	out?: number /* 支 */;
	count?: number /* 總筆數 */;
	inCount?: number /* 收入筆數 */;
	outCount?: number /* 支出筆數 */;
}

export interface BACKENDAJAX_USDTMoneyChangeRequest {
	id?: number /* id */;
	targetID?: number /* 商戶號 id */;
	amount?: number /* 使用 U 幣 */;
	exchangeRate?: number /* 匯率 */;
	exchangeAmount?: number /* 實際 CNY 金額 */;
	fee?: number /* 手續費 */;
	thirdID?: string /* 三方單號 */;
	note?: string /* 異動備註 */;
}

export interface BACKENDAJAX_PromotionMemberApproveRequest {
	ID?: number /* 申請清單ID */;
	note?: string /* 原因說明 */;
}

export interface BACKENDAJAX_PromotionMemberAndCondResponse {
	list?: Array<BACKENDAJAX_PromotionMemberAndCondResponseData> /* 優惠流水限制列表 */;
}

export interface BACKENDAJAX_GetMemberWithdrawalInfoResponse {
	bankcardGroup?: Array<BACKENDAJAX_KeyValue> /* 銀行卡金流組別 */;
	payGroup?: Array<BACKENDAJAX_KeyValue> /* 三方金流組別 */;
	vip?: number /* VIP 等級 */;
	withdrawalStatus?: boolean /* 提款狀態 (true 綠勾勾) */;
	money?: number /* 目前錢包 */;
	lockMoney?: number /* 凍結金額 */;
	dayUpper?: number /* 每日上限 */;
	dayUpperStatus?: boolean /* 每日上限狀態 (true 綠勾勾) */;
	limitLower?: number /* 單筆下限 */;
	limitUpper?: number /* 單筆上限 */;
	limitStatus?: boolean /* 單筆上下限狀態 (true 綠勾勾) */;
	todayDepositAmount?: number /* 今日存款金額 */;
	todayWithdrawalAmount?: number /* 今日提款金額 */;
	spread?: number /* 今日存提差 */;
	turnoverDurationStart?: string /* 流水區間開始時間 */;
	turnoverDurationEnd?: string /* 流水區間結束時間 */;
	needTurnover?: number /* 所需流水 */;
}

export interface BACKENDAJAX_PromotionForWithdrawResponse {
	list?: Array<BACKENDAJAX_PromotionForWithdrawResponseData> /* 提供會員在指定時間內領取的優惠資訊 */;
}

export interface BACKENDAJAX_PromotionForWithdrawResponseData {
	promotionID?: number /* 優惠ID */;
	promotionName?: string /* 優惠名稱 */;
}

export interface BACKENDAJAX_PromotionWithdrawRequest {
	memberID?: number /* 會員ID */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
	promotionCondType?: number /* 模板類型 */;
	status?: number /* 狀態 */;
}

export interface BACKENDAJAX_PromotionLaunchedCreateRequest {
	name?: string /* 名稱 */;
	type?: Array<number | undefined> /* 類型 */;
	content?: string /* 內容 */;
	device?: Array<number | undefined> /* 裝置 */;
	orderNo?: number /* 排序 */;
	top?: number /* 置頂 */;
	display?: number /* 顯示 */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	imageWeb?: string /* 圖片WEB */;
	imageH5?: string /* 圖片WEB */;
	openWay?: number /* 開啟方式 */;
	openLink?: string /* 網址 */;
	promotions?: Array<number | undefined> /* 關聯優惠 */;
	promotionStartTime?: string /* 活動開始時間 */;
	promotionEndTime?: string /* 活動結束時間 */;
}

export interface BACKENDAJAX_PromotionLaunchedListResponseData {
	ID?: number /* ID */;
	name?: string /* 名稱 */;
	type?: string /* 類型 */;
	content?: string /* 內容 */;
	device?: string /* 裝置 */;
	orderNo?: number /* 排序 */;
	top?: number /* 置頂 */;
	display?: number /* 顯示 */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	imageWeb?: string /* 圖片WEB */;
	imageH5?: string /* 圖片WEB */;
	openWay?: number /* 開啟方式 */;
	openLink?: string /* 網址 */;
	updatedUser?: string /* 執行人 */;
	updatedAt?: string /* 最後更新時間 */;
	promotions?: Array<BACKENDAJAX_Promotion> /* 關聯優惠 */;
	promotionStartTime?: string /* 活動開始時間 */;
	promotionEndTime?: string /* 活動結束時間 */;
}

export interface BACKENDAJAX_PromotionLaunchedSaveRequest {
	ID?: number /* ID */;
	name?: string /* 名稱 */;
	type?: Array<number | undefined> /* 類型 */;
	content?: string /* 內容 */;
	device?: Array<number | undefined> /* 裝置 */;
	orderNo?: number /* 排序 */;
	top?: number /* 置頂 */;
	display?: number /* 顯示 */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	imageWeb?: string /* 圖片WEB */;
	imageH5?: string /* 圖片WEB */;
	openWay?: number /* 開啟方式 */;
	openLink?: string /* 網址 */;
	promotions?: Array<number | undefined> /* 關聯優惠 */;
	promotionStartTime?: string /* 活動開始時間 */;
	promotionEndTime?: string /* 活動結束時間 */;
}

export interface BACKENDAJAX_PromotionMemberListResponseData {
	ID?: number /* ID */;
	memberAccount?: string /* 會員帳號 */;
	memberID?: string /* 會員ID */;
	bonus?: number /* 金額 */;
	status?: number /* 狀態 */;
	sendAt?: string /* 派發時間 */;
	promotionName?: string /* 優惠名稱 */;
	promotionID?: number /* 優惠流水號 */;
	promotionCondTypes?: Array<number | undefined> /* 模板 */;
	batchID?: number /* 批次流水號 */;
	batchCycle?: string /* 派發週期 */;
	updatedAt?: string /* 最後更新時間 */;
	updatedUser?: string /* 執行人 */;
	statusAction?: Array<string | undefined> /* 狀態對應的操作 */;
	promotionCondRange?: Array<string | undefined> /* 審核內容-活動規定 */;
	amount?: number /* 審核內容-實際產生 */;
}

export interface BACKENDAJAX_PromotionDelRequest {
	ID?: number /* ID */;
	otp?: string /* OTP驗證 */;
}

export interface BACKENDAJAX_PromotionSaveStatusRequest {
	ID?: number /* ID */;
	status?: number /* 狀態[1啟用2停用] */;
	otp?: string /* OTP驗證 */;
}

export interface BACKENDAJAX_PromotionDropdownResponse {
	cycleType?: Array<BACKENDAJAX_KeyValue> /* 週期類型下拉清單 */;
	way?: Array<BACKENDAJAX_KeyValue> /* 參加/審核/領取方式下拉清單 */;
	approveCycle?: Array<BACKENDAJAX_KeyValue> /* 審核週期下拉清單 */;
	orderBy?: Array<BACKENDAJAX_KeyValue> /* 排序條件下拉清單 */;
	top?: Array<BACKENDAJAX_KeyValue> /* 置頂下拉清單 */;
	display?: Array<BACKENDAJAX_KeyValue> /* 是否顯示下拉清單 */;
	status?: Array<BACKENDAJAX_KeyValue> /* 狀態下拉清單 */;
	device?: Array<BACKENDAJAX_KeyValue> /* 裝置下拉清單 */;
	openWay?: Array<BACKENDAJAX_KeyValue> /* 開啟方式下拉清單 */;
	promotionCondType?: Array<BACKENDAJAX_KeyValue> /* 優惠模板類型下拉清單 */;
	promotionStatus?: Array<BACKENDAJAX_KeyValue> /* 優惠狀態下拉清單 */;
}

export interface BACKENDAJAX_PromotionLogsRequest {
	ID?: number /* 優惠ID */;
}

export interface BACKENDAJAX_PromotionLogsResponse {
	name?: string /* 優惠名稱 */;
	list?: Array<BACKENDAJAX_PromotionLogsResponseData> /* 優惠列表操作記錄 */;
}

export interface BACKENDAJAX_PromotionLogsResponseData {
	updatedAt?: string /* 更新時間 */;
	updatedUser?: string /* 操作人 */;
	action?: string /* 操作 */;
	content?: string /* 說明與備註 */;
}

export interface BACKENDAJAX_CreateUSDTRequest {
	name?: string /* 帳戶名稱 */;
	type?: number /* 錢包類型 [2ERC 3TRC] */;
	useType?: number /* 用途[0無1出款2結算3中轉4倉庫] */;
	address?: string /* 錢包位置 */;
	originalAmount?: number /* 初始金額 */;
	status?: number /* 狀態 */;
}

export interface BACKENDAJAX_UpdateUSDTRequest {
	id?: number /* id */;
	name?: string /* 帳戶名稱 */;
	type?: number /* 錢包類型 [2ERC 3TRC] */;
	useType?: number /* 用途[0無1出款2結算3中轉4倉庫] */;
	address?: string /* 錢包位置 */;
	status?: number /* 狀態 */;
}

export interface BACKENDAJAX_USDTLogData {
	id?: number /* id */;
	createdAt?: string /* 交易時間 */;
	subjectID?: number /* 科目ID */;
	in?: number /* 收 */;
	out?: number /* 支 */;
	fee?: number /* 手續費 */;
	balance?: number /* 結餘 */;
	relationID?: string /* 相關單號 */;
	thirdID?: string /* 三方單號 */;
	targetType?: number /* 交易對象類型 0無對象 1銀行卡 2商戶號 3會員 4代理 5USDT */;
	targetID?: number /* 交易對象ID */;
	targetName?: string /* 交易對象 (會員帳號 商戶號 卡號) */;
	editorName?: string /* 執行人 */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_SearchRequest {
	keyword?: string /* 關鍵字 */;
}

export interface BACKENDAJAX_GetWithdrawalFinanceCheckRequest {
	orderSn?: string /* 訂單號碼 */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_AgencyUsdtListResponse {
	list?: Array<BACKENDAJAX_AgencyUsdtData> /* usdt列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_AgencyApplyPermitResponse {
	agencyID?: number /* 代理ID */;
}

export interface BACKENDAJAX_AgencyRankSettingDataResponse {
	id?: number /* 流水號 */;
	groupID?: number /* 群組編號 */;
	groupName?: string /* 群組名稱 */;
	type?: number /* 分成類型 [1:一般,2:固定分成] */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 更新時間 */;
}

export interface BACKENDAJAX_AgencyRankSettingKvResponse {
	list?: Array<BACKENDAJAX_KeyValue> /* 遊戲類型列表 */;
}

export interface BACKENDAJAX_CreateAgencyNodeRequest {
	agencyID?: number /* 代理ID */;
	parentAgencyID?: number /* 上層代理ID，0或null為無上層代理 */;
}

export interface BACKENDAJAX_CreateAgencyRankGroupRequest {
	agencyID?: number /* 代理ID */;
	giveOffer?: number /* 是否分配佣金 */;
	rankGroupID?: number /* 佣金群組編號 */;
}

export interface BACKENDAJAX_CreateAgencyRankGroupResponse {
	agencyID?: number /* 代理ID */;
}

export interface BACKENDAJAX_CreateAgencyRankSettingRequest {
	groupName?: string /* 群組名稱 */;
	type?: number /* 佣金分配類型[1:一般2:固定分成 若type=2 可以只送rank1相關參數] */;
	rank1MinProfit?: number /* S淨營利最小值 */;
	rank1ActiveMemberCount?: number /* S活躍會員最小值 */;
	rank1CommissionPercent?: number /* S佣金比例百分比（到小數點二位） */;
	rank2MinProfit?: number /* A淨營利最小值 */;
	rank2ActiveMemberCount?: number /* A活躍會員最小值 */;
	rank2CommissionPercent?: number /* A佣金比例百分比（到小數點二位） */;
	rank3MinProfit?: number /* B淨營利最小值 */;
	rank3ActiveMemberCount?: number /* B活躍會員最小值 */;
	rank3CommissionPercent?: number /* B佣金比例百分比（到小數點二位） */;
	rank4MinProfit?: number /* C淨營利最小值 */;
	rank4ActiveMemberCount?: number /* C活躍會員最小值 */;
	rank4CommissionPercent?: number /* C佣金比例百分比（到小數點二位） */;
	rank5MinProfit?: number /* D淨營利最小值 */;
	rank5ActiveMemberCount?: number /* D活躍會員最小值 */;
	rank5CommissionPercent?: number /* D佣金比例百分比（到小數點二位） */;
	rank6MinProfit?: number /* E淨營利最小值 */;
	rank6ActiveMemberCount?: number /* E活躍會員最小值 */;
	rank6CommissionPercent?: number /* E佣金比例百分比（到小數點二位） */;
	rank7MinProfit?: number /* F淨營利最小值 */;
	rank7ActiveMemberCount?: number /* F活躍會員最小值 */;
	rank7CommissionPercent?: number /* F佣金比例百分比（到小數點二位） */;
}

export interface BACKENDAJAX_CreateAgencyRankSettingResponse {
	groupID?: number /* 群組編號 */;
}

export interface BACKENDAJAX_GetAgencyWalletManualOperationDetailRequest {
	id?: number /* 申請單id */;
}

export interface BACKENDAJAX_UpdateAgencyBankCardRequest {
	id?: number /* 銀行卡流水號 */;
}

export interface BACKENDAJAX_CheckAgencyByAccountRequest {
	account?: string /* 帳號 */;
}

export interface BACKENDAJAX_AgencyUsdtRequest {
	agencyID?: number /* 代理ID */;
}

export interface BACKENDAJAX_GetAgencyRankSettingListRequest {
	groupName?: string /* 群組名稱 */;
	groupID?: number /* 群組id */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetAgencyRankSettingListResponse {
	list?: Array<BACKENDAJAX_AgencyRankSettingDataResponse> /* 代理等級群組列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_GetAgencyRankSettingRequest {
	groupID?: number /* 群組ID */;
}

export interface BACKENDAJAX_MemberNodeAgencyDetailResponse {
	id?: number /* 代理ID */;
	account?: string /* 代理帳號 */;
	name?: string /* 代理名字 */;
}

export interface BACKENDAJAX_UpdateAgencyRankSettingRequest {
	groupID?: number /* 群組編號 */;
	groupName?: string /* 群組名稱 */;
	type?: number /* 佣金分配類型[1:一般2:固定分成 若type=2 可以只送 rank1(S級)相關參數] */;
	rank1MinProfit?: number /* S淨營利最小值 */;
	rank1ActiveMemberCount?: number /* S活躍會員最小值 */;
	rank1CommissionPercent?: number /* S佣金比例百分比（到小數點二位） */;
	rank2MinProfit?: number /* A淨營利最小值 */;
	rank2ActiveMemberCount?: number /* A活躍會員最小值 */;
	rank2CommissionPercent?: number /* A佣金比例百分比（到小數點二位） */;
	rank3MinProfit?: number /* B淨營利最小值 */;
	rank3ActiveMemberCount?: number /* B活躍會員最小值 */;
	rank3CommissionPercent?: number /* B佣金比例百分比（到小數點二位） */;
	rank4MinProfit?: number /* C淨營利最小值 */;
	rank4ActiveMemberCount?: number /* C活躍會員最小值 */;
	rank4CommissionPercent?: number /* C佣金比例百分比（到小數點二位） */;
	rank5MinProfit?: number /* D淨營利最小值 */;
	rank5ActiveMemberCount?: number /* D活躍會員最小值 */;
	rank5CommissionPercent?: number /* D佣金比例百分比（到小數點二位） */;
	rank6MinProfit?: number /* E淨營利最小值 */;
	rank6ActiveMemberCount?: number /* E活躍會員最小值 */;
	rank6CommissionPercent?: number /* E佣金比例百分比（到小數點二位） */;
	rank7MinProfit?: number /* F淨營利最小值 */;
	rank7ActiveMemberCount?: number /* F活躍會員最小值 */;
	rank7CommissionPercent?: number /* F佣金比例百分比（到小數點二位） */;
}

export interface BACKENDAJAX_SetAgencyApplicationAuditStatusRequest {
	id?: number /* 申請表ID */;
	auditStatus?: number /* 審核狀態[2.成功 3.拒絕] */;
	remark?: string /* 備註 */;
	calculative?: boolean /* 是否計算佣金[TRUE是 FALSE否] */;
	rankGroupID?: number /* 佣金群組 */;
}

export interface BACKENDAJAX_GetAgencyApplicationRequest {
	id?: number /* 代理申請ID */;
}

export interface BACKENDAJAX_GetAgencyApplicationsByAdditionRequest {
	isFuzzy?: boolean /* 是否模糊搜尋 */;
	auditStatus?: number /* 代理申請審核狀態 0全部1.待審核 2.成功 3.拒絕 */;
	id?: string /* 代理申請ID */;
	agencyAccount?: string /* 代理申請審核人帳號 */;
	memberAccount?: string /* 代理申請審核人會員帳號 */;
	applicationStartTime?: string /* 代理申請時間開始 */;
	applicationEndTime?: string /* 代理申請時間結束 */;
	reviewStartTime?: string /* 代理申請審核時間開始 */;
	reviewEndTime?: string /* 代理申請審核時間結束 */;
	pageSize?: number /* 單頁數量 */;
	page?: number /* 單頁數量 */;
}

export interface BACKENDAJAX_CreateAgencyActivityRequest {
	title?: string /* 標題 */;
	contents?: string /* 內容 */;
	status?: number /* 狀態 1. 顯示 2. 隱藏 */;
	sort?: number /* 順序 數字越小越前面，最小為0 */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	imagePc?: string /* PC圖片 */;
	imageH5?: string /* H5圖片 */;
	lastEditor?: string /* 最後編輯者 */;
}

export interface BACKENDAJAX_GetAgencyActivityResponse {
	list?: Array<BACKENDAJAX_AgencyAnnouncementDTO> /* 代理公告列表 */;
}

export interface BACKENDAJAX_UpdateAgencyActivityRequest {
	id?: number /* 代理公告id */;
	title?: string /* 標題 */;
	contents?: string /* 內容 */;
	status?: number /* 狀態 1. 顯示 2. 隱藏 */;
	sort?: number /* 順序 數字越小越前面，最小為0 */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	imagePc?: string /* PC圖片 */;
	imageH5?: string /* H5圖片 */;
	lastEditor?: string /* 最後編輯者 */;
}

export interface BACKENDAJAX_AgencyActivityDTO {
	id?: number /* 代理公告id */;
	title?: string /* 代理公告標題 */;
	contents?: string /* 代理公告內容 */;
	status?: number /* 代理公告狀態 */;
	sort?: number /* 代理公告順序 */;
	startTime?: string /* 代理公告上架時間 */;
	endTime?: string /* 代理公告下架時間 */;
	imagePc?: string /* 代理公告PC圖片 */;
	imageH5?: string /* 代理公告H5圖片 */;
	updatedAt?: string /* 代理公告最後更新時間 */;
	lastEditor?: string /* 代理公告id */;
}

export interface BACKENDAJAX_GetAgencyActivityRequest {
	id?: number /* 活動id */;
}

export interface BACKENDAJAX_GetAgencyActivitysRequest {
	periodBeginning?: string /* 時間起點 */;
	periodEnd?: string /* 時間終點 */;
}

export interface BACKENDAJAX_CreateMemberNodeLogRequest {
	memberID?: number /* 會員ID */;
	toParentAgencyID?: number /* 新的上線代理ID */;
	remark?: string /* 備註 */;
}

export interface BACKENDAJAX_UpdateAgencyUsdtRequest {
	id?: number /* USDT流水號 */;
}

export interface BACKENDAJAX_GetAgencyApplicationsByAdditionResponse {
	list?: Array<BACKENDAJAX_GetAgencyApplicationsByAdditionDataResponse> /* 代理申請列表 */;
	count?: number /* 資料筆數 */;
}

export interface BACKENDAJAX_AgencyApplyPermitRequest {
	applicationID?: number /* 申請表ID */;
	giveOffer?: number /* 發放佣金 */;
	rankGroupID?: number /* 佣金群組 */;
}

export interface BACKENDAJAX_UpdateAgencyBankCardResponse {
	id?: number /* 銀行卡流水號 */;
}

export interface BACKENDAJAX_ChildAgencyApplicationReviewRequest {
	id?: number /* 申請表ID */;
	remark?: string /* 備註 */;
}

export interface BACKENDAJAX_ChildAgencyApplicationReviewResponse {
	id?: number /* 申請單ID */;
}

export interface BACKENDAJAX_CreateChildAgencyApplicationRequest {
	agencyID?: number /* 代理ID */;
	childAgencyID?: number /* 二級代理ID */;
}

export interface BACKENDAJAX_CreateChildAgencyApplicationResponse {
	id?: number /* 申請單ID */;
}

export interface BACKENDAJAX_GetChildAgencyApplicationListRequest {
	agencyID?: number /* 代理ID */;
	childAgencyID?: number /* 二級代理ID */;
	agencyAccount?: string /* 代理帳號 */;
	childAgencyAccount?: string /* 二級代理帳號 */;
	exactlyMatching?: number /* 是否精確搜尋[1:否2:是] */;
	auditStatus?: number /* 審核狀態[0:全部1:待審核2:成功3:拒絕] */;
	applyStartTime?: string /* 申請日期區間-開始 */;
	applyEndTime?: string /* 申請日期區間-結束 */;
	reviewStartTime?: string /* 審核日期區間-開始 */;
	reviewEndTime?: string /* 審核日期區間-結束 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetChildAgencyApplicationListResponse {
	list?: Array<BACKENDAJAX_ChildAgencyApplicationDataResponse> /* 二級代理申請列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_GetChildAgencyApplicationRequest {
	id?: number /* 流水號 */;
}

export interface BACKENDAJAX_UpdateAgencyUsdtResponse {
	id?: number /* USDT流水號 */;
}

export interface BACKENDAJAX_GetAgencyRequest {
	id?: number /* 代理ID */;
}

export interface BACKENDAJAX_AgencyUsdtData {
	id?: number /* 流水號 */;
	type?: number /* 類型[1TRC 2ERC] */;
	address?: string /* USDT位址 */;
	isDefault?: number /* 是否預設[1是2否] */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 變更時間 */;
}

export interface BACKENDAJAX_AgencyLoginRequest {
	account?: string /* 代理帳號 */;
	password?: string /* password */;
}

export interface BACKENDAJAX_AgencyCommissionData {
	id?: number /* 流水號 */;
	date?: string /* 佣金月份 */;
	deliveredAt?: string /* 發放日期 */;
	agencyID?: number /* 代理ID */;
	agencyAccount?: string /* 代理帳號 */;
	wallet?: number /* 錢包餘額 */;
	commissionPercent?: number /* 佣金分成 */;
	totalWinAmount?: number /* 直屬會員輸贏 */;
	totalCommission?: number /* 本月佣金餘額 */;
	lastTotalCommission?: number /* 上月佣金餘額 */;
	childCommissionAmount?: number /* 二代佣金 */;
	childBonusAmount?: number /* 尊享福利 */;
	status?: number /* 發放結果[1待審核2同意3拒絕4統計中5已過期] */;
}

export interface BACKENDAJAX_AgencyPromotionLinkData {
	id?: number /* 流水號id */;
	agencyID?: number /* 代理id */;
	type?: number /* 網址類型[1:一般 2.VIP] */;
	promotionLink?: string /* 網址 */;
}

export interface BACKENDAJAX_ChangePasswordRequest {
	id?: number /* 代理id */;
	password?: string /* 密碼 */;
}

export interface BACKENDAJAX_CreateAgencyPromotionLinkRequest {
	agencyID?: number /* 代理ID */;
	type?: number /* 網址類型[1:一般 2.VIP] */;
	promotionLink?: string /* 網址 */;
}

export interface BACKENDAJAX_GetAgencyRankGroupResponse {
	giveOffer?: number /* 是否分配佣金[1:發放,2:不放] */;
	groupID?: number /* 群組編號 */;
	groupName?: string /* 群組名稱 */;
	type?: number /* 分成類型 [1:一般,2:固定分成] */;
}

export interface BACKENDAJAX_RemoveAgencyPromotionLinkRequest {
	id?: number /* 流水號id */;
}

export interface BACKENDAJAX_UpdateAgencyPromotionLinkRequest {
	id?: number /* 流水號id */;
	type?: number /* 網址類型[1:一般 2.VIP] */;
	promotionLink?: string /* 網址 */;
}

export interface BACKENDAJAX_UpdateAgencyRequest {
	id?: number /* 代理id */;
	name?: string /* 代理姓名 */;
	phone?: string /* 手機號 */;
	email?: string /* 郵箱 */;
	wechat?: string /* 微信號 */;
	qq?: string /* QQ號 */;
}

export interface BACKENDAJAX_UpdateAgencyResponse {
	id?: number /* 代理ID */;
}

export interface BACKENDAJAX_AgencyListData {
	id?: number /* 代理ID */;
	account?: string /* 代理帳號 */;
	parentAgencyID?: number /* 上層代理ID */;
	parentAgencyAccount?: string /* 上層代理帳號 */;
	childAgencyCount?: number /* 二級代理數量 */;
	memberCount?: number /* 直屬會員數量 */;
	giveOffer?: number /* 是否計算佣金[1是2否] */;
	rankGroupID?: number /* 佣金群組ID */;
	rankGroupName?: string /* 佣金群組名稱 */;
	agencyWallet?: number /* 代理錢包餘額 */;
	lastLoginTime?: string /* 最後登入時間 */;
	activeStatus?: number /* 活躍狀態[1活躍2不活躍] */;
}

export interface BACKENDAJAX_CheckMemberByAccountRequest {
	account?: string /* 帳號 */;
}

export interface BACKENDAJAX_CheckMemberByAccountResponse {
	memberID?: string /* 會員ID */;
	account?: string /* 會員帳號 */;
	name?: string /* 會員姓名 */;
}

export interface BACKENDAJAX_CreateAgencyRequest {
	account?: string /* 帳號 */;
	password?: string /* 密碼 */;
	passwordRepeat?: string /* 再次輸入密碼 */;
	memberID?: number /* 會員ID */;
	name?: string /* 姓名 */;
	phone?: string /* 手機號 */;
	email?: string /* email */;
	wechat?: string /* 微信號 */;
	qq?: string /* QQ號 */;
	giveOffer?: number /* 發放佣金[1發放 2不發] */;
	rankGroupID?: number /* 佣金群組 */;
}

export interface BACKENDAJAX_GetAgencyListRequest {
	agencyID?: number /* 代理ID */;
	agencyAccount?: string /* 代理帳號 */;
	exactlyMatching?: number /* 帳號是否精確搜尋[1:模糊搜尋2:精確搜尋] */;
	reviewStartTime?: string /* 審核日期區間-開始 */;
	reviewEndTime?: string /* 審核日期區間-結束 */;
	giveOffer?: number /* 是否計算佣金[0全部1是2否] */;
	rankGroupID?: number /* 佣金群組ID */;
	activeStatus?: number /* 活躍狀態[0全部1活躍2不活躍] */;
	status?: number /* 帳號狀態[0全部1正常2鎖定提款3黑名單] */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetAgencyListResponse {
	list?: Array<BACKENDAJAX_AgencyListData> /* 代理列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_GetAgencyNodeRequest {
	agencyAccount?: string /* 代理帳號 */;
}

export interface BACKENDAJAX_GetAgencyNodeResponse {
	id?: number /* 代理ID */;
	account?: string /* 代理帳號 */;
	name?: string /* 代理名字 */;
	phone?: string /* 代理電話 */;
	email?: string /* 代理郵箱 */;
	reivewAgencyTime?: string /* 成為代理時間 */;
	parentAgencyID?: number /* 上層代理ID */;
	parentAgencyAccount?: string /* 上層代理帳號 */;
	parentAgencyName?: string /* 上層代理姓名 */;
}

export interface BACKENDAJAX_AgencyUsdtListRequest {
	agencyID?: number /* 代理ID */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetAgencyAnnouncementRequest {
	periodBeginning?: string /* 時間起點 */;
	periodEnd?: string /* 時間終點 */;
}

export interface BACKENDAJAX_GetAgencyAnnouncementResponse {
	list?: Array<BACKENDAJAX_AgencyAnnouncementDTO> /* 代理公告列表 */;
}

export interface BACKENDAJAX_AgencyAnnouncementDTO {
	id?: number /* 代理公告id */;
	title?: string /* 代理公告標題 */;
	contents?: string /* 代理公告內容 */;
	status?: number /* 代理公告狀態 */;
	sort?: number /* 代理公告順序 */;
	startTime?: string /* 代理公告上架時間 */;
	endTime?: string /* 代理公告下架時間 */;
	imagePc?: string /* 代理公告PC圖片 */;
	imageH5?: string /* 代理公告H5圖片 */;
	updatedAt?: string /* 代理公告最後更新時間 */;
	lastEditor?: string /* 代理公告id */;
}

export interface BACKENDAJAX_CreateAgencyAnnouncementRequest {
	title?: string /* 標題 */;
	contents?: string /* 內容 */;
	status?: number /* 狀態 1. 顯示 2. 隱藏 */;
	sort?: number /* 順序 數字越小越前面，最小為0 */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	imagePc?: string /* PC圖片 */;
	imageH5?: string /* H5圖片 */;
	lastEditor?: string /* 最後編輯者 */;
}

export interface BACKENDAJAX_UpdateAgencyAnnouncementRequest {
	id?: number /* 代理公告id */;
	title?: string /* 標題 */;
	contents?: string /* 內容 */;
	status?: number /* 狀態 1. 顯示 2. 隱藏 */;
	sort?: number /* 順序 數字越小越前面，最小為0 */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	imagePc?: string /* PC圖片 */;
	imageH5?: string /* H5圖片 */;
	lastEditor?: string /* 最後編輯者 */;
}

export interface BACKENDAJAX_AgencyDataResponse {
	id?: number /* 代理ID */;
	account?: string /* 代理帳號 */;
	name?: string /* 代理名字 */;
	phone?: string /* 代理電話 */;
	email?: string /* 代理郵箱 */;
	wechat?: string /* 代理微信號 */;
	qq?: string /* 代理QQ號 */;
	lastLoginTime?: string /* 最後登入時間 */;
	lastLoginIp?: string /* 最後登入IP */;
	reivewAgencyTime?: string /* 成為代理時間 */;
	applyAgencyIp?: string /* 申請代理IP */;
	memberAccount?: string /* 會員帳號 */;
	parentAgencyID?: number /* 上層代理ID */;
	parentAgencyAccount?: string /* 上層代理帳號 */;
	childAgencyCount?: number /* 二級代理數量 */;
	memberCount?: number /* 直屬會員數量 */;
	status?: number /* 狀態[1正常 2鎖定提款 3黑名單] */;
	depositLimit?: number /* 存款限制1允許，2禁止 */;
	withdrawLimit?: number /* 提款限制1允許，2禁止 */;
}

export interface BACKENDAJAX_AgencyWalletManualOperationListData {
	id?: number /* 申請單流水號 */;
	date?: string /* 申請日期 */;
	agencyID?: number /* 代理ID */;
	agencyAccount?: string /* 代理ID */;
	type?: number /* 類型[1特殊上分(上分)2傭金派發(上分)3會員上分(下分)4特殊扣款(下分)] */;
	amount?: number /* 異動金額 */;
	balanceBefore?: number /* 異動前餘額 */;
	balanceAfter?: number /* 異動後餘額 */;
	turnoverLimit?: number /* 流水限額 */;
	status?: number /* 狀態[1成功2拒絕3待審核] */;
	applyAdminAccount?: string /* 申請者帳號 */;
	reviewAdminAccount?: string /* 審核者帳號 */;
	reviewDate?: string /* 審核日期 */;
	remark?: string /* 備註 */;
	refMemberAccount?: string /* [會員上分]分派的目標會員帳號 */;
}

export interface BACKENDAJAX_AgencyWalletManualOperationListDetailData {
	id?: number /* 申請單流水號 */;
	agencyID?: number /* 代理ID */;
	agencyAccount?: string /* 代理ID */;
	agencyName?: string /* 代理姓名 */;
	type?: number /* 類型[1特殊上分(上分)2傭金派發(上分)3會員上分(下分)4特殊扣款(下分)] */;
	amount?: number /* 異動金額 */;
	turnoverLimit?: number /* 流水限額 */;
	withdrawLimit?: number /* 目前流水限額 */;
	date?: string /* 申請日期 */;
	status?: number /* 狀態[1成功2拒絕3待審核] */;
	applyAdminAccount?: string /* 申請者帳號 */;
	remark?: string /* 備註 */;
	refMemberAccount?: string /* [會員上分]分派的目標會員帳號 */;
}

export interface BACKENDAJAX_AgencyWalletManualOperationListRequest {
	agencyID?: number /* 代理ID */;
	agencyAccount?: string /* 代理帳號 */;
	exactlyMatching?: number /* 帳號是否精確搜尋[1:模糊搜尋2:精確搜尋] */;
	type?: number /* 類型[0全部1特殊上分(上分)2傭金派發(上分)3會員上分(下分)4特殊扣款(下分)] */;
	status?: number /* 狀態[0全部1成功2拒絕3待審核] */;
	applyStartTime?: string /* 申請日期區間-開始 */;
	applyEndTime?: string /* 申請日期區間-結束 */;
	reviewStartTime?: string /* 審核日期區間-開始 */;
	reviewEndTime?: string /* 審核日期區間-結束 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_AgencyWalletManualOperationListResponse {
	list?: Array<BACKENDAJAX_AgencyWalletManualOperationListData> /* 手動上下分列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_AgencyWalletManualOperationPermitRequest {
	id?: number /* 申請單ID */;
}

export interface BACKENDAJAX_AgencyWalletManualOperationResponse {
	id?: number /* 申請單id */;
}

export interface BACKENDAJAX_ChangeStatusRequest {
	id?: number /* 代理id */;
	status?: number /* 狀態[1:正常 (登入、上分轉入 皆正常) 3:黑名單 (登入、上分轉入 皆停用，設定立即生效，並將其強制登出)] */;
	depositLimit?: number /* 存款限制1允許，2禁止 */;
	withdrawLimit?: number /* 提款限制1允許，2禁止 */;
}

export interface BACKENDAJAX_CheckAgencyWalletRequest {
	agencyID?: number /* 代理ID */;
	agencyAccount?: string /* 代理帳號 */;
}

export interface BACKENDAJAX_CheckAgencyWalletResponse {
	agencyID?: number /* 代理ID */;
	agencyAccount?: string /* 代理帳號 */;
	agencyWallet?: number /* 代理錢包餘額 */;
	reivewAgencyTime?: string /* 成為代理時間 */;
}

export interface BACKENDAJAX_ChildAgencyApplicationDataResponse {
	id?: number /* 流水號 */;
	agencyID?: number /* 代理ID */;
	agencyAccount?: string /* 代理帳號 */;
	agencyName?: string /* 代理姓名 */;
	agencyRemark?: string /* 代理備註 */;
	childAgencyID?: number /* 二級代理ID */;
	childAgencyAccount?: string /* 二級代理帳號 */;
	childAgencyName?: string /* 二級代理姓名 */;
	childAgencyApplyTime?: string /* 二級代理申請代理時間 */;
	childAgencyReviewTime?: string /* 二級代理成為代理時間 */;
	applyTime?: string /* 申請時間 */;
	reviewTime?: string /* 審核時間 */;
	adminAccount?: string /* 審核者 */;
	remark?: string /* 審核備註 */;
	auditStatus?: number /* 審核狀態[1:待審核2:同意3:拒絕] */;
}

export interface BACKENDAJAX_CreateAgencyWalletManualOperationRequest {
	agencyID?: number /* 代理ID */;
	type?: number /* 類型[1特殊上分(上分)2傭金派發(上分)3會員上分(下分)4特殊扣款(下分)] */;
	amount?: number /* 異動金額 */;
	turnoverLimit?: number /* 流水限額 */;
	remark?: string /* 備註 */;
	refMemberID?: number /* [會員上分]分派的目標會員ID */;
}

export interface BACKENDAJAX_GetAgencyApplicationResponse {
	id?: number /* 代理申請ID */;
	memberID?: number /* 代理申請者會員ID */;
	agencyAccount?: string /* 代理申者請帳號 */;
	name?: string /* 代理申請者名字 */;
	phone?: string /* 代理申請者電話 */;
	qqAccount?: string /* 代理申請者QQ號 */;
	wechatAccount?: string /* 代理申請者微信號 */;
	createdAt?: string /* 代理申請時間 */;
	reivewTime?: string /* 代理申請審核時間 */;
	adminUserID?: number /* 代理申請審核人ID */;
	remark?: string /* 代理申請審核備著 */;
	auditStatus?: number /* 代理申請審核狀態 1.待審核 2.成功 3.拒絕 */;
}

export interface BACKENDAJAX_GetAgencyApplicationsByAdditionDataResponse {
	id?: number /* 代理申請ID */;
	memberID?: number /* 代理申請者會員ID */;
	agencyAccount?: string /* 代理申請者帳號 */;
	name?: string /* 代理申請者名字 */;
	phone?: string /* 代理申請者電話 */;
	qqAccount?: string /* 代理申請者QQ號 */;
	wechatAccount?: string /* 代理申請者微信號 */;
	createdAt?: string /* 代理申請時間 */;
	reivewTime?: string /* 代理申請審核時間 */;
	adminUserID?: string /* 代理申請審核人ID */;
	remark?: string /* 代理申請審核備註 */;
	auditStatus?: number /* 審核狀態 1.待審核 2.成功 3.拒絕 */;
}

export interface BACKENDAJAX_CreateMemberNodeLogResponse {
	id?: number /* 換線記錄流水號 */;
}

export interface BACKENDAJAX_MemberNodeLogListData {
	id?: number /* 換線流水號 */;
	memberID?: number /* 會員ID */;
	memberAccount?: string /* 會員帳號 */;
	memberName?: string /* 會員姓名 */;
	orgAgencyID?: number /* 原始代理ID */;
	orgAgencyAccount?: string /* 原始代理帳號 */;
	orgAgencyName?: string /* 原始代理名字 */;
	newAgencyID?: number /* 轉線後代理ID */;
	newAgencyAccount?: string /* 轉線後代理帳號 */;
	newAgencyName?: string /* 轉線後代理名字 */;
	date?: string /* 轉線時間 */;
	remark?: string /* 備註 */;
}

export interface BACKENDAJAX_MemberNodeLogListRequest {
	memberID?: number /* 會員ID */;
	agencyID?: number /* 代理ID */;
	agencyAccount?: string /* 代理帳號 */;
	exactlyMatching?: number /* 是否精確搜尋[1:否2:是] */;
	startTime?: string /* 日期區間-開始 */;
	endTime?: string /* 日期區間-結束 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_MemberNodeLogListResponse {
	list?: Array<BACKENDAJAX_MemberNodeLogListData> /* 代理申請列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_MemberNodeMemberDetailResponse {
	id?: number /* 會員ID */;
	account?: string /* 會員帳號 */;
	name?: string /* 會員名字 */;
	phone?: string /* 會員電話 */;
	betAmount?: number /* 本月流水 */;
	totalAmount?: number /* 本月輸贏 */;
	depositAmount?: number /* 本月存款 */;
	memberTags?: Array<BACKENDAJAX_MemberTagResponseData> /* 會員標籤 */;
	parentAgencyID?: number /* 上層代理ID */;
	parentAgencyAccount?: string /* 上層代理帳號 */;
	parentAgencyName?: string /* 上層代理姓名 */;
}

export interface BACKENDAJAX_CheckAgencyResponse {
	id?: number /* 代理ID */;
	account?: string /* 代理帳號 */;
	name?: string /* 代理名字 */;
	phone?: string /* 手機 */;
	email?: string /* 郵箱 */;
	reviewDate?: string /* 成為代理日期 */;
	parentAgencyID?: number /* 總代ID */;
	parentAgencyAccount?: string /* 總代帳號 */;
	parentAgencyName?: string /* 總代名字 */;
}

export interface BACKENDAJAX_SetAgencyApplicationAuditStatusResponse {
	id?: number /* 申請單ID */;
}

export interface BACKENDAJAX_AgencyBankCardData {
	id?: number /* 流水號 */;
	cardNo?: string /* 銀行卡卡號 */;
	bankAccount?: string /* 銀行帳戶名 */;
	bankName?: string /* 銀行名 */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 變更時間 */;
	isDefault?: number /* 是否預設[1是2否] */;
	status?: number /* 狀態[1啟用2停用] */;
}

export interface BACKENDAJAX_AgencyBankCardListRequest {
	agencyID?: number /* 代理ID */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_AgencyBankCardListResponse {
	list?: Array<BACKENDAJAX_AgencyBankCardData> /* 銀行卡列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_CreateAgencyBankCardRequest {
	agencyID?: number /* 代理id */;
	cardNo?: string /* 銀行卡號 */;
	bankAccount?: string /* 帳戶姓名 */;
}

export interface BACKENDAJAX_CreateAgencyBankCardResponse {
	id?: number /* 銀行卡流水號 */;
}

export interface BACKENDAJAX_CreateAgencyUsdtAddressRequest {
	agencyID?: number /* 代理id */;
	address?: string /* 錢包位址 */;
}

export interface BACKENDAJAX_CreateAgencyUsdtAddressResponse {
	id?: number /* id */;
}

export interface BACKENDAJAX_AgencyCommissionChildData {
	id?: number /* 流水號 */;
	date?: string /* 佣金月份 */;
	childDeliveredAt?: string /* 發放日期 */;
	agencyID?: number /* 代理ID */;
	agencyAccount?: string /* 代理帳號 */;
	wallet?: number /* 錢包餘額 */;
	totalCommission?: number /* 本月佣金餘額 */;
	lastTotalCommission?: number /* 上月佣金餘額 */;
	childTotalWinAmount?: number /* 二代會員輸贏 */;
	childCommissionAmount?: number /* 二代佣金 */;
	childBonusAmount?: number /* 尊享福利 */;
	childStatus?: number /* 發放結果[1待審核2同意3拒絕4統計中5已過期] */;
}

export interface BACKENDAJAX_GetAgencyCommissionChildResponse {
	list?: Array<BACKENDAJAX_AgencyCommissionChildData> /* 二代佣金列表 */;
	childReviewAdminAccount?: string /* 審核者帳號 */;
}

export interface BACKENDAJAX_GetAgencyCommissionRequest {
	date?: string /* 佣金月份，輸入每個月的1日，格式 "2022-01-01 00:00:00" */;
}

export interface BACKENDAJAX_GetAgencyCommissionResponse {
	list?: Array<BACKENDAJAX_AgencyCommissionData> /* 代理佣金列表 */;
	reviewAdminAccount?: string /* 審核者帳號 */;
}

export interface BACKENDAJAX_ReviewAgencyCommissionRequest {
	date?: string /* 審核的佣金月份，格式"2022-01-01 00:00:00" */;
	agreeIDs?: string /* 同意的資料流水號id，以逗號分隔，若無資料請送空字串"" */;
	denyIDs?: string /* 拒絕的資料流水號id，以逗號分隔，若無資料請送空字串"" */;
}

export interface BACKENDAJAX_CreateBannerCategoryRequest {
	name?: string /* 分類名稱 */;
	description?: string /* 說明 */;
	hidden?: boolean /* 是否隱藏 */;
}

export interface BACKENDAJAX_GetBannerCategoryRequest {
	sort?: string /* 排序欄位 [id | createdAt | updatedAt] */;
	dir?: string /* 排序方向 [desc | asc] */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_UpdateBannerCategoryRequest {
	id?: number /* id */;
	name?: string /* 分類名稱 */;
	description?: string /* 說明 */;
	hidden?: boolean /* 是否隱藏 */;
}

export interface BACKENDAJAX_BannerCategoryResponseData {
	id?: number /* id */;
	name?: string /* 分類名稱 */;
	description?: string /* 說明 */;
	hidden?: boolean /* 是否隱藏 */;
	editor?: number /* 最後執行人ID */;
	editorName?: string /* 執行人名稱 */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_GetBannerCategoryResponse {
	list?: Array<BACKENDAJAX_BannerCategoryResponseData> /* Banner 分類列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_GetBannerResponse {
	list?: Array<BACKENDAJAX_BannerResponseData> /* Banner 列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_BannerDropdownData {
	bannerCategoryID?: number /* 廣告分類 ID */;
	name?: string /* 廣告分類名稱 */;
}

export interface BACKENDAJAX_GetBannerDropdownResponse {
	list?: Array<BACKENDAJAX_BannerDropdownData> /* list */;
}

export interface BACKENDAJAX_GetAnnouncementRequest {
	title?: string /* 標題: 模糊搜尋 */;
	hidden?: boolean /* 是否隱藏 (隱藏: true 顯示: false) */;
	sort?: string /* 排序欄位 [id | sort | start | updatedAt] */;
	dir?: string /* 排序方向 [desc | asc] */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetAnnouncementResponse {
	list?: Array<BACKENDAJAX_AnnouncementResponseData> /* 公告列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_SortRequest {
	id?: number /* id */;
	sort?: number /* 排序 */;
}

export interface BACKENDAJAX_GetBannerRequest {
	title?: string /* 標題: 模糊搜尋 */;
	bannerCategoryID?: number /* 廣告分類 ID [預設:0 全部] */;
	device?: number /* 上架平台 0:全部 1:WebPC 2:MobileWeb 3:AndroidPWA 4:iOSPWA */;
	hidden?: boolean /* 隱藏 */;
	statusSearch?: number /* 狀態 0:全部 1: 停用 2: 上架中 3: 下架中 */;
	start?: string /* 上架時間 */;
	sort?: string /* 排序欄位 [id | start | end | updatedAt] */;
	dir?: string /* 排序方向 [desc | asc] */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_CreateNotificationRequest {
	eventType?: number /* 事件類型ID */;
	type?: number /* 通知類型 1: RC 2:TG */;
	target?: string /* 通知的對象 */;
	targetName?: string /* 群組名稱 */;
}

export interface BACKENDAJAX_GetNotificationEventTypeResponse {
	list?: Array<BACKENDAJAX_GetNotificationEventTypeResponseData> /* 事件類型 */;
}

export interface BACKENDAJAX_GetNotificationEventTypeResponseData {
	id?: number /* ID */;
	name?: string /* 事件名稱 */;
}

export interface BACKENDAJAX_GetNotificationResponse {
	list?: Array<BACKENDAJAX_GetNotificationResponseData> /* 通知 */;
}

export interface BACKENDAJAX_GetNotificationResponseData {
	id?: number /* ID */;
	eventType?: number /* 事件類型ID */;
	eventTypeName?: string /* 事件名稱 */;
	type?: number /* 通知類型 1: RC 2:TG */;
	target?: string /* 通知的對象 */;
	targetName?: string /* 群組名稱 */;
	createdAt?: string /* 建立時間 */;
}

export interface BACKENDAJAX_BannerResponseData {
	id?: number /* id */;
	bannerCategoryID?: number /* 分類 ID */;
	sort?: number /* 前台排序 */;
	title?: string /* 標題 */;
	imageWeb?: string /* web 圖 */;
	imageH5?: string /* h5 圖 */;
	hidden?: boolean /* 是否隱藏 */;
	statusStr?: string /* 狀態字串 */;
	description?: string /* 說明 */;
	start?: string /* 上架時間 */;
	end?: string /* 下架時間 */;
	deeplinkType?: number /* 開啟方式 0無 1產品內 2產品內網頁 3另開視窗 */;
	deeplinkPage?: string /* 開啟頁面 */;
	deeplinkID?: string /* id or 鏈結 */;
	context?: string /* 內容 */;
	note?: string /* 備註 */;
	editor?: number /* 最後執行人ID */;
	editorName?: string /* 執行人名稱 */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_CreateBannerRequest {
	bannerCategoryID?: number /* 分類 ID */;
	sort?: number /* 前台排序 */;
	title?: string /* 標題 */;
	imageWeb?: string /* web 圖 */;
	imageH5?: string /* h5 圖 */;
	hidden?: boolean /* 是否隱藏 */;
	description?: string /* 說明 */;
	device?: Array<number | undefined> /* 上架平台 1:WebPC 2:MobileWeb 3:AndroidPWA 4:iOSPWA */;
	start?: string /* 上架時間 */;
	end?: string /* 下架時間 */;
	deeplinkType?: number /* 開啟方式 0無 1產品內 2產品內網頁 3另開視窗 */;
	deeplinkPage?: string /* 開啟頁面 */;
	deeplinkID?: string /* id or 鏈結 */;
	context?: string /* 內容 */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_UpdateBannerRequest {
	id?: number /* id */;
	bannerCategoryID?: number /* 分類 ID */;
	sort?: number /* 前台排序 */;
	title?: string /* 標題 */;
	imageWeb?: string /* web 圖 */;
	imageH5?: string /* h5 圖 */;
	hidden?: boolean /* 是否隱藏 */;
	description?: string /* 說明 */;
	device?: Array<number | undefined> /* 上架平台 1:WebPC 2:MobileWeb 3:AndroidPWA 4:iOSPWA */;
	start?: string /* 上架時間 */;
	end?: string /* 下架時間 */;
	deeplinkType?: number /* 開啟方式 0無 1產品內 2產品內網頁 3另開視窗 */;
	deeplinkPage?: string /* 開啟頁面 */;
	deeplinkID?: string /* id or 鏈結 */;
	context?: string /* 內容 */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_GetLetterListRequest {
	memberAccount?: string /* 會員帳號 */;
	status?: number /* 狀態[1:待發送] */;
	type?: number /* 類型 */;
	title?: string /* 標題 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetLetterListResponse {
	list?: Array<BACKENDAJAX_LetterListResponseData> /* 站內信申請清單列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_GetLetterMemberRequest {
	letterSettingId?: number /* ID */;
	memberAccount?: string /* 會員帳號 */;
}

export interface BACKENDAJAX_GetLetterMemberResponse {
	list?: Array<BACKENDAJAX_GetLetterMemberResponseData> /* 站內信申請清單列表-發送名單 */;
}

export interface BACKENDAJAX_GetLetterMemberResponseData {
	id?: number /* id */;
	memberAccount?: string /* 會員帳號 */;
	status?: string /* 狀態 */;
}

export interface BACKENDAJAX_GetLetterSettingOneRequest {
	id?: number /* ID */;
}

export interface BACKENDAJAX_GetLetterSettingRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_GetLetterSettingResponse {
	list?: Array<BACKENDAJAX_LetterSettingResponseData> /* 站內信列表 */;
	count?: number /* 總筆數 */;
}

export interface BACKENDAJAX_LetterListResponseData {
	letterSettingId?: number /* id */;
	type?: number /* 類型 */;
	title?: string /* 標題 */;
	content?: string /* 內容 */;
	memberCount?: number /* 對象 */;
	status?: string /* 狀態 */;
	sendAt?: string /* 預計發送時間 */;
	updatedUser?: string /* 最後執行人 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_LetterSettingResponseData {
	id?: number /* id */;
	title?: string /* 標題 */;
	content?: string /* 內容 */;
	updatedUser?: string /* 最後執行人 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_UpdateLetterMemberRequest {
	letterSettingId?: number /* ID */;
}

export interface BACKENDAJAX_UpdateLetterSettingRequest {
	id?: number /* ID */;
	title?: string /* 標題 */;
	content?: string /* 內容 */;
}

export interface BACKENDAJAX_CreateLetterSettingRequest {
	title?: string /* 標題 */;
	content?: string /* 內容 */;
}

export interface BACKENDAJAX_AnnouncementResponseData {
	id?: number /* id */;
	sort?: number /* 前台排序 */;
	title?: string /* 標題 */;
	top?: boolean /* 是否置頂 */;
	hidden?: boolean /* 是否隱藏 (ture: 隱藏 false: 顯示) */;
	start?: string /* 上架時間 */;
	context?: string /* 內容 */;
	image?: string /* 圖片位置 */;
	editor?: number /* 最後執行人ID */;
	editorName?: string /* 執行人名稱 */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_CreateAnnouncementRequest {
	sort?: number /* 前台排序 */;
	title?: string /* 標題 */;
	hidden?: boolean /* 是否隱藏 or 顯示 (true: 隱藏, false: 顯示) */;
	top?: boolean /* 是否置頂 */;
	start?: string /* 上架時間 */;
	context?: string /* 內容 */;
	image?: string /* 圖片位置 */;
}

export interface BACKENDAJAX_UpdateAnnouncementRequest {
	id?: number /* id */;
	sort?: number /* 前台排序 */;
	title?: string /* 標題 */;
	hidden?: boolean /* 是否隱藏 or 顯示 (true: 隱藏, false: 顯示) */;
	top?: boolean /* 是否置頂 */;
	start?: string /* 上架時間 */;
	context?: string /* 內容 */;
	image?: string /* 圖片位置 */;
}

export interface BACKENDAJAX_CreateLetterMemberRequest {
	memberAccounts?: Array<string | undefined> /* 會員帳號 */;
	sendAt?: string /* 發送時間 */;
	title?: string /* 標題 */;
	content?: string /* 內容 */;
}

export interface BACKENDAJAX_GetLetterMemberOneRequest {
	letterSettingId?: number /* letterSettingID */;
}

export interface BACKENDAJAX_LetterMemberListResponseData {
	letterSettingId?: number /* ID */;
	type?: number /* 類型 */;
	title?: string /* 標題 */;
	content?: string /* 內容 */;
	memberCount?: number /* 對象 */;
	status?: string /* 狀態 */;
	sendAt?: string /* 預計發送時間 */;
	updatedUser?: string /* 最後執行人 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_UpdateLetterMemberOneRequest {
	id?: number /* letterSettingID */;
	memberAccounts?: Array<string | undefined> /* 會員帳號 */;
	sendAt?: string /* 發送時間 */;
	title?: string /* 標題 */;
	content?: string /* 內容 */;
}

export interface BACKENDAJAX_StringIDResponse {
	id?: string /* id */;
}

export interface BACKENDAJAX_CreateDepositAmountReportRequest {
	reportDate?: string /* 報表日期：週報必須是週一日期；月報必須是1號日期 */;
}

export interface BACKENDAJAX_CreateDepositPeopleReportRequest {
	reportDate?: string /* 報表日期：週報必須是週一日期；月報必須是1號日期 */;
}

export interface BACKENDAJAX_GetDepositAmountMonthReportRequest {
	reportDateStart?: string /* 報表日期：開始，只需填入年月，例如: 2021/8 */;
	reportDateEnd?: string /* 報表日期：結束，只需填入年月，例如: 2021/9 */;
	serviceCode?: string /* 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关] */;
}

export interface BACKENDAJAX_GetDepositAmountReportRequest {
	reportDateStart?: string /* 報表日期：開始 */;
	reportDateEnd?: string /* 報表日期：結束 */;
	serviceCode?: string /* 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关] */;
}

export interface BACKENDAJAX_GetDepositAmountWeekReportRequest {
	reportDateStart?: string /* 報表日期：開始，必須是週一日期 */;
	reportDateEnd?: string /* 報表日期：結束，必須是週日日期 */;
	serviceCode?: string /* 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关] */;
}

export interface BACKENDAJAX_GetDepositPeopleMonthReportRequest {
	reportDateStart?: string /* 報表日期：開始，只需填入年月，例如: 2021/8 */;
	reportDateEnd?: string /* 報表日期：結束，只需填入年月，例如: 2021/9 */;
	serviceCode?: string /* 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关] */;
}

export interface BACKENDAJAX_GetDepositPeopleReportRequest {
	reportDateStart?: string /* 報表日期:開始 */;
	reportDateEnd?: string /* 報表日期：結束 */;
	serviceCode?: string /* 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关] */;
}

export interface BACKENDAJAX_GetDepositPeopleWeekReportRequest {
	reportDateStart?: string /* 報表日期：開始，必須是週一日期 */;
	reportDateEnd?: string /* 報表日期：結束，必須是週日日期 */;
	serviceCode?: string /* 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关] */;
}

export interface BACKENDAJAX_CreateWithdrawAmountReportRequest {
	reportDate?: string /* 報表日期：週報必須是週一日期；月報必須是1號日期 */;
}

export interface BACKENDAJAX_CreateWithdrawPeopleReportRequest {
	reportDate?: string /* 報表日期：週報必須是週一日期；月報必須是1號日期 */;
}

export interface BACKENDAJAX_GetWithdrawAmountMonthReportRequest {
	reportDateStart?: string /* 報表日期：開始，只需填入年月，例如: 2021/8 */;
	reportDateEnd?: string /* 報表日期：結束，只需填入年月，例如: 2021/9 */;
}

export interface BACKENDAJAX_GetWithdrawAmountReportRequest {
	reportDateStart?: string /* 報表日期：開始 */;
	reportDateEnd?: string /* 報表日期：結束 */;
}

export interface BACKENDAJAX_GetWithdrawAmountWeekReportRequest {
	reportDateStart?: string /* 報表日期：開始，必須是週一日期 */;
	reportDateEnd?: string /* 報表日期：結束，必須是週日日期 */;
}

export interface BACKENDAJAX_GetWithdrawPeopleMonthReportRequest {
	reportDateStart?: string /* 報表日期：開始，只需填入年月，例如: 2021/8 */;
	reportDateEnd?: string /* 報表日期：結束，只需填入年月，例如: 2021/9 */;
}

export interface BACKENDAJAX_GetWithdrawPeopleReportRequest {
	reportDateStart?: string /* 報表日期:開始 */;
	reportDateEnd?: string /* 報表日期：結束 */;
}

export interface BACKENDAJAX_GetWithdrawPeopleWeekReportRequest {
	reportDateStart?: string /* 報表日期：開始，必須是週一日期 */;
	reportDateEnd?: string /* 報表日期：結束，必須是週日日期 */;
}

export interface BACKENDAJAX_CreateChannelDepositReportRequest {
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表時段 */;
}

export interface BACKENDAJAX_GetChannelDepositReportRequest {
	reportDateStart?: string /* 報表日期:開始 */;
	reportDateEnd?: string /* 報表日期：結束 */;
	reportHourStart?: number /* 報表時段:開始 */;
	reportHourEnd?: number /* 報表時段：結束 */;
	serviceCode?: string /* 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关] */;
	payChannelServiceID?: number /* 線路id */;
}

export interface BACKENDAJAX_GetSingleChannelDepositReportRequest {
	reportDateStart?: string /* 報表日期:開始 */;
	reportDateEnd?: string /* 報表日期：結束 */;
	reportHourStart?: number /* 報表時段:開始 */;
	reportHourEnd?: number /* 報表時段：結束 */;
	serviceCode?: string /* 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关] */;
	payChannelServiceID?: number /* 線路id */;
}

export interface BACKENDAJAX_UpdateSingleChannelDepositReportNoteRequest {
	id?: number /* 報表ID */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_CreateDateReportRequest {
	reportDate?: string /* 報表日期 */;
}

export interface BACKENDAJAX_GetMemberDepositReportRequest {
	reportDateStart?: string /* 報表日期：開始 */;
	reportDateEnd?: string /* 報表日期：結束 */;
	currency?: number /* 幣別: [1:人民幣 2:USDT-ERC 3:USDT-TRC] */;
	paymentGroup?: string /* 三方金流群組名稱 */;
	bankcardGroup?: string /* 銀行卡群組名稱 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_CreateDateHourReportRequest {
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表時段 */;
}

export interface BACKENDAJAX_UpdateReportNoteRequest {
	id?: number /* 報表ID */;
	note?: string /* 備註 */;
}

export interface BACKENDAJAX_GetChannelDayReconciliationRequest {
	reportDateStart?: string /* 報表日期:開始 */;
	reportDateEnd?: string /* 報表日期：結束 */;
	reportHourStart?: number /* 報表時段:開始 */;
	reportHourEnd?: number /* 報表時段：結束 */;
	serviceCode?: string /* 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关] */;
	payChannelNameID?: number /* 商戶id */;
	payChannelName?: string /* 商戶：可模糊搜尋 */;
	payChannelID?: number /* 商戶號id */;
	payChannelSn?: string /* 商戶號：可模糊搜尋 */;
	balanceDiff?: number /* 是否有差額 1:全部（預設）, 2:有差額, 3: 無差額 */;
	balanceChange?: number /* 是否有異動 1:全部（預設）, 2:有異動, 3: 無異動 */;
}

export interface BACKENDAJAX_GetChannelHourReconciliationRequest {
	reportDateStart?: string /* 報表日期:開始 */;
	reportDateEnd?: string /* 報表日期：結束 */;
	reportHourStart?: number /* 報表時段:開始 */;
	reportHourEnd?: number /* 報表時段：結束 */;
	serviceCode?: string /* 支付方式: [ali:支付宝,wx:微信,usdt:USDT,union:银联,sp:快捷,gw:网关] */;
	payChannelNameID?: number /* 商戶id */;
	payChannelName?: string /* 商戶：可模糊搜尋 */;
	payChannelID?: number /* 商戶號id */;
	payChannelSn?: string /* 商戶號：可模糊搜尋 */;
	balanceDiff?: number /* 是否有差額 1:全部（預設）, 2:有差額, 3: 無差額 */;
	balanceChange?: number /* 是否有異動 1:全部（預設）, 2:有異動, 3: 無異動 */;
}

export interface BACKENDAJAX_setStatusRequest {
	id?: number /* id */;
	status?: number /* 狀態 [1:啟用, 2:停用] */;
}

export interface BACKENDAJAX_DepositAmountSummaryResponse {
	list?: Array<BACKENDAJAX_DepositAmountSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_DepositAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface BACKENDAJAX_DepositPeopleSummaryResponse {
	list?: Array<BACKENDAJAX_DepositPeopleSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實收金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_DepositPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	uniquePeople?: number /* 唯一存款人數 */;
	firstPeople?: number /* 首存人數 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	avgAmount?: number /* 人均存款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實收金額 */;
	activePeople?: number /* 活躍人數 */;
	depositRate?: number /* 存款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface BACKENDAJAX_WithdrawAmountSummaryResponse {
	list?: Array<BACKENDAJAX_WithdrawAmountSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_WithdrawAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface BACKENDAJAX_WithdrawPeopleSummaryResponse {
	list?: Array<BACKENDAJAX_WithdrawPeopleSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalWithdrawNum?: number /* 合計提款次數 */;
	totalAmount?: number /* 合計提款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實出金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_WithdrawPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	uniquePeople?: number /* 唯一提款人數 */;
	firstPeople?: number /* 首提人數 */;
	withdrawNum?: number /* 提款次數 */;
	amount?: number /* 提款金額 */;
	avgAmount?: number /* 人均提款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實出金額 */;
	activePeople?: number /* 活躍人數 */;
	withdrawRate?: number /* 提款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface BACKENDAJAX_ChannelDepositSummaryResponse {
	list?: Array<BACKENDAJAX_ChannelDepositSummaryResponseData> /* 線路進款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_ChannelDepositSummaryMapResponse {
	channels?: Array<string | undefined> /* 線路進款統計列表 */;
	list?: Array<BACKENDAJAX_KeyValue> /* 線路陣列列表清單 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_ChannelDepositSummaryResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	serviceCode?: string /* 支付方式 */;
	payChannelServiceID?: number /* 線路ID */;
	payChannelServiceName?: string /* 線路名稱 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	note?: string /* 備註 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface BACKENDAJAX_MemberDepositSummaryResponse {
	list?: Array<BACKENDAJAX_MemberDepositSummaryResponseData> /* 會員存款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_MemberDepositSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	memberID?: number /* 會員ID */;
	memberName?: string /* 會員名稱 */;
	currency?: number /* 幣別 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	bankGroupID?: number /* 銀行卡金流組別 */;
	bankGroupName?: string /* 銀行卡金流組別 */;
	payGroupID?: number /* 三方金流組別 */;
	payGroupName?: string /* 三方金流組別 */;
	registedDate?: string /* 註冊日期 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface BACKENDAJAX_ChannelReconciliationReportMapResponse {
	list?: Array<BACKENDAJAX_ChannelReconciliationReportResponse> /* 三方對帳表列表，KEY 是時間區段字串，例如08:00-10:00 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_ChannelReconciliationReportResponse {
	list?: Array<BACKENDAJAX_ChannelReconciliationReportResponseData> /* 三方對帳表列表 */;
	count?: number /* 總數 */;
	totalDepositAmount?: number /* 存款金額小計 */;
	totalDepositFee?: number /* 存款手續費小計 */;
	totalPayoutAmount?: number /* 代付金額小計 */;
	totalPayoutFee?: number /* 代付手續費小計 */;
	totalPayoutNum?: number /* 代付次數小計 */;
	totalSettlementNum?: number /* 結算次數小計 */;
	totalSettlementAmount?: number /* 結算金額小計 */;
	totalSettlementFee?: number /* 結算手續費小計 */;
	totalSettlementUAmount?: number /* 下發轉U金額小計 */;
	totalSettlementUFee?: number /* 下發轉U手續費小計 */;
	totalFrozenAmount?: number /* 凍結金額小計 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface BACKENDAJAX_ChannelReconciliationReportResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	payChannelSn?: string /* 商戶號 */;
	serviceCode?: string /* 支付方式 */;
	serviceName?: string /* 支付方式名稱 */;
	payChannelID?: number /* 三方商戶ID */;
	payChannelName?: string /* 三方商戶名稱 */;
	useType?: number /* 報表類型: 1: 每日對帳表, 2: 整點對帳表 */;
	payoutNum?: number /* 代付次數 */;
	payoutAmount?: number /* 代付金額 */;
	payoutFee?: number /* 代付手續費 */;
	depositNum?: number /* 存款次數 */;
	depositAmount?: number /* 存款金額 */;
	depositFee?: number /* 存款手續費 */;
	settlementNum?: number /* 結算次數 */;
	settlementAmount?: number /* 結算金額 */;
	settlementFee?: number /* 結算手續費 */;
	settlementUNum?: number /* 下發轉U次數 */;
	settlementUAmount?: number /* 下發轉U金額 */;
	settlementUFee?: number /* 下發轉U手續費 */;
	frozenAmount?: number /* 凍結金額 */;
	frozenNum?: number /* 凍結次數 */;
	startingSystemBalance?: number /* 系統餘額(開始時間餘額) */;
	endingSystemBalance?: number /* 系統餘額(結束時間餘額) */;
	endingChannelBalance?: number /* 三方餘額(結束時間餘額) */;
	note?: string /* 備註 */;
	endingBalanceDiff?: number /* 差額 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface BACKENDAJAX_ArrayResponse {
	list?: Array<BACKENDAJAX_KeyValue> /* 通用型陣列列表清單 */;
}

export interface BACKENDAJAX_PromotionApplyRequest {
	promotionID?: number /* 優惠ID(不是上架優惠的ID，是關聯優惠) */;
}

export interface BACKENDAJAX_DurationAndIDRequest {
	id?: number /* id */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface BACKENDAJAX_CommonSuccessResponse {
	success?: boolean /* 請求是不是成功 */;
}

export interface BACKENDAJAX_PhoneNumberAttribution {
	status?: boolean /* 請求狀態: true 代表完成，false 代表失敗 */;
	resultCode?: number /* 返回码 */;
	reason?: string /* 返回说明 */;
	province?: string /* 省份 */;
	city?: string /* 城市，(北京、上海、重庆、天津直辖市可能为空) */;
	areaCode?: string /* 区号，(部分记录可能为空) */;
	zip?: string /* 邮编，(部分记录可能为空) */;
	company?: string /* 运营商 */;
}

export interface BACKENDAJAX_MemberLoginInfo {
	memberID?: number /* 會員ID */;
	effectiveTime?: number /* 最近連線時間 */;
}

export interface BACKENDAJAX_WebSocketFdInfo {
	status?: boolean /* 驗證狀態: true 代表完成驗證，false 代表尚未通過驗證 */;
	fd?: number /* WebSocket 客户端连接的标识符，在Server实例中是唯一的，在多个进程内不会重复 */;
	token?: BACKENDAJAX_Token;
}

export interface BACKENDAJAX_PaginationRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface BACKENDAJAX_EmptyResponse {}

export interface BACKENDAJAX_KeyValue {
	key?: string /* 傳到後端的值 */;
	value?: string /* 前台要顯示的值 */;
}

export interface EVENTAJAX_GetAnnouncementResponse {
	list?: Array<EVENTAJAX_GetAnnouncementResponseData> /* 列表 */;
}

export interface EVENTAJAX_GetAnnouncementResponseData {
	id?: number /* id */;
	title?: string /* 標題 */;
	context?: string /* 內容 */;
	image?: string /* 圖片位置 */;
	top?: boolean /* 是否置頂 */;
	start?: string /* 上架時間 */;
}

export interface EVENTAJAX_GetBannerRequest {
	categortyID?: number /* 分類ID */;
}

export interface EVENTAJAX_GetBannerResponse {
	list?: Array<EVENTAJAX_GetBannerResponseData> /* 列表 */;
}

export interface EVENTAJAX_GetBannerResponseData {
	id?: number /* id */;
	sort?: number /* 排序 */;
	title?: string /* 標題 */;
	context?: string /* 內容 */;
	imageH5?: string /* h5 圖片位置 */;
	imageWeb?: string /* web 圖片位置 */;
	description?: string /* 說明 */;
	start?: string /* 開始時間 */;
	end?: string /* 結束時間 */;
	note?: string /* 備註 */;
	targetURL?: string /* depplink URL */;
	deeplinkType?: number /* 開啟方式 0無 1產品內 2產品內網頁 3另開視窗 */;
}

export interface EVENTAJAX_GetLetterRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface EVENTAJAX_GetLetterResponse {
	list?: Array<EVENTAJAX_GetLetterResponseData> /* 列表 */;
}

export interface EVENTAJAX_GetLetterResponseData {
	id?: number /* id */;
	type?: number /* 類型[1系統2手動] */;
	letterSettingId?: number /* 站內信編號 */;
	title?: string /* 標題 */;
	content?: string /* 內容 */;
	status?: number /* 狀態[1待發送2已發送3已讀取4失敗5回收] */;
	sendAt?: string /* 發送時間 */;
}

export interface EVENTAJAX_ReadLetterRequest {
	ID?: number /* 站內信ID */;
}

export interface EVENTAJAX_DepositAmountSummaryResponse {
	list?: Array<EVENTAJAX_DepositAmountSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface EVENTAJAX_DepositAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface EVENTAJAX_DepositPeopleSummaryResponse {
	list?: Array<EVENTAJAX_DepositPeopleSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實收金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface EVENTAJAX_DepositPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	uniquePeople?: number /* 唯一存款人數 */;
	firstPeople?: number /* 首存人數 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	avgAmount?: number /* 人均存款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實收金額 */;
	activePeople?: number /* 活躍人數 */;
	depositRate?: number /* 存款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface EVENTAJAX_WithdrawAmountSummaryResponse {
	list?: Array<EVENTAJAX_WithdrawAmountSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface EVENTAJAX_WithdrawAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface EVENTAJAX_WithdrawPeopleSummaryResponse {
	list?: Array<EVENTAJAX_WithdrawPeopleSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalWithdrawNum?: number /* 合計提款次數 */;
	totalAmount?: number /* 合計提款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實出金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface EVENTAJAX_WithdrawPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	uniquePeople?: number /* 唯一提款人數 */;
	firstPeople?: number /* 首提人數 */;
	withdrawNum?: number /* 提款次數 */;
	amount?: number /* 提款金額 */;
	avgAmount?: number /* 人均提款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實出金額 */;
	activePeople?: number /* 活躍人數 */;
	withdrawRate?: number /* 提款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface EVENTAJAX_ChannelDepositSummaryResponse {
	list?: Array<EVENTAJAX_ChannelDepositSummaryResponseData> /* 線路進款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface EVENTAJAX_ChannelDepositSummaryMapResponse {
	channels?: Array<string | undefined> /* 線路進款統計列表 */;
	list?: Array<EVENTAJAX_KeyValue> /* 線路陣列列表清單 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface EVENTAJAX_ChannelDepositSummaryResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	serviceCode?: string /* 支付方式 */;
	payChannelServiceID?: number /* 線路ID */;
	payChannelServiceName?: string /* 線路名稱 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	note?: string /* 備註 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface EVENTAJAX_MemberDepositSummaryResponse {
	list?: Array<EVENTAJAX_MemberDepositSummaryResponseData> /* 會員存款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface EVENTAJAX_MemberDepositSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	memberID?: number /* 會員ID */;
	memberName?: string /* 會員名稱 */;
	currency?: number /* 幣別 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	bankGroupID?: number /* 銀行卡金流組別 */;
	bankGroupName?: string /* 銀行卡金流組別 */;
	payGroupID?: number /* 三方金流組別 */;
	payGroupName?: string /* 三方金流組別 */;
	registedDate?: string /* 註冊日期 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface EVENTAJAX_ChannelReconciliationReportMapResponse {
	list?: Array<EVENTAJAX_ChannelReconciliationReportResponse> /* 三方對帳表列表，KEY 是時間區段字串，例如08:00-10:00 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface EVENTAJAX_ChannelReconciliationReportResponse {
	list?: Array<EVENTAJAX_ChannelReconciliationReportResponseData> /* 三方對帳表列表 */;
	count?: number /* 總數 */;
	totalDepositAmount?: number /* 存款金額小計 */;
	totalDepositFee?: number /* 存款手續費小計 */;
	totalPayoutAmount?: number /* 代付金額小計 */;
	totalPayoutFee?: number /* 代付手續費小計 */;
	totalPayoutNum?: number /* 代付次數小計 */;
	totalSettlementNum?: number /* 結算次數小計 */;
	totalSettlementAmount?: number /* 結算金額小計 */;
	totalSettlementFee?: number /* 結算手續費小計 */;
	totalSettlementUAmount?: number /* 下發轉U金額小計 */;
	totalSettlementUFee?: number /* 下發轉U手續費小計 */;
	totalFrozenAmount?: number /* 凍結金額小計 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface EVENTAJAX_ChannelReconciliationReportResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	payChannelSn?: string /* 商戶號 */;
	serviceCode?: string /* 支付方式 */;
	serviceName?: string /* 支付方式名稱 */;
	payChannelID?: number /* 三方商戶ID */;
	payChannelName?: string /* 三方商戶名稱 */;
	useType?: number /* 報表類型: 1: 每日對帳表, 2: 整點對帳表 */;
	payoutNum?: number /* 代付次數 */;
	payoutAmount?: number /* 代付金額 */;
	payoutFee?: number /* 代付手續費 */;
	depositNum?: number /* 存款次數 */;
	depositAmount?: number /* 存款金額 */;
	depositFee?: number /* 存款手續費 */;
	settlementNum?: number /* 結算次數 */;
	settlementAmount?: number /* 結算金額 */;
	settlementFee?: number /* 結算手續費 */;
	settlementUNum?: number /* 下發轉U次數 */;
	settlementUAmount?: number /* 下發轉U金額 */;
	settlementUFee?: number /* 下發轉U手續費 */;
	frozenAmount?: number /* 凍結金額 */;
	frozenNum?: number /* 凍結次數 */;
	startingSystemBalance?: number /* 系統餘額(開始時間餘額) */;
	endingSystemBalance?: number /* 系統餘額(結束時間餘額) */;
	endingChannelBalance?: number /* 三方餘額(結束時間餘額) */;
	note?: string /* 備註 */;
	endingBalanceDiff?: number /* 差額 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface EVENTAJAX_ArrayResponse {
	list?: Array<EVENTAJAX_KeyValue> /* 通用型陣列列表清單 */;
}

export interface EVENTAJAX_PromotionApplyRequest {
	promotionID?: number /* 優惠ID(不是上架優惠的ID，是關聯優惠) */;
}

export interface EVENTAJAX_DurationAndIDRequest {
	id?: number /* id */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface EVENTAJAX_CommonSuccessResponse {
	success?: boolean /* 請求是不是成功 */;
}

export interface EVENTAJAX_PhoneNumberAttribution {
	status?: boolean /* 請求狀態: true 代表完成，false 代表失敗 */;
	resultCode?: number /* 返回码 */;
	reason?: string /* 返回说明 */;
	province?: string /* 省份 */;
	city?: string /* 城市，(北京、上海、重庆、天津直辖市可能为空) */;
	areaCode?: string /* 区号，(部分记录可能为空) */;
	zip?: string /* 邮编，(部分记录可能为空) */;
	company?: string /* 运营商 */;
}

export interface EVENTAJAX_MemberLoginInfo {
	memberID?: number /* 會員ID */;
	effectiveTime?: number /* 最近連線時間 */;
}

export interface EVENTAJAX_WebSocketFdInfo {
	status?: boolean /* 驗證狀態: true 代表完成驗證，false 代表尚未通過驗證 */;
	fd?: number /* WebSocket 客户端连接的标识符，在Server实例中是唯一的，在多个进程内不会重复 */;
	token?: EVENTAJAX_Token;
}

export interface EVENTAJAX_PaginationRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface EVENTAJAX_EmptyResponse {}

export interface EVENTAJAX_KeyValue {
	key?: string /* 傳到後端的值 */;
	value?: string /* 前台要顯示的值 */;
}

export interface FILEAJAX_UploadFileRequest {
	type?: string /* 檔案類型 */;
	file?: File | Blob /* 上傳檔案 */;
}

export interface FILEAJAX_UploadFileResponse {
	url?: string /* 相對網址，需組合CDN，本機可用 http://127.0.0.1:20100/file/ 串接取得檔案 */;
}

export interface FILEAJAX_DepositAmountSummaryResponse {
	list?: Array<FILEAJAX_DepositAmountSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface FILEAJAX_DepositAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface FILEAJAX_DepositPeopleSummaryResponse {
	list?: Array<FILEAJAX_DepositPeopleSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實收金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface FILEAJAX_DepositPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	uniquePeople?: number /* 唯一存款人數 */;
	firstPeople?: number /* 首存人數 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	avgAmount?: number /* 人均存款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實收金額 */;
	activePeople?: number /* 活躍人數 */;
	depositRate?: number /* 存款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface FILEAJAX_WithdrawAmountSummaryResponse {
	list?: Array<FILEAJAX_WithdrawAmountSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface FILEAJAX_WithdrawAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface FILEAJAX_WithdrawPeopleSummaryResponse {
	list?: Array<FILEAJAX_WithdrawPeopleSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalWithdrawNum?: number /* 合計提款次數 */;
	totalAmount?: number /* 合計提款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實出金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface FILEAJAX_WithdrawPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	uniquePeople?: number /* 唯一提款人數 */;
	firstPeople?: number /* 首提人數 */;
	withdrawNum?: number /* 提款次數 */;
	amount?: number /* 提款金額 */;
	avgAmount?: number /* 人均提款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實出金額 */;
	activePeople?: number /* 活躍人數 */;
	withdrawRate?: number /* 提款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface FILEAJAX_ChannelDepositSummaryResponse {
	list?: Array<FILEAJAX_ChannelDepositSummaryResponseData> /* 線路進款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface FILEAJAX_ChannelDepositSummaryMapResponse {
	channels?: Array<string | undefined> /* 線路進款統計列表 */;
	list?: Array<FILEAJAX_KeyValue> /* 線路陣列列表清單 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface FILEAJAX_ChannelDepositSummaryResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	serviceCode?: string /* 支付方式 */;
	payChannelServiceID?: number /* 線路ID */;
	payChannelServiceName?: string /* 線路名稱 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	note?: string /* 備註 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface FILEAJAX_MemberDepositSummaryResponse {
	list?: Array<FILEAJAX_MemberDepositSummaryResponseData> /* 會員存款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface FILEAJAX_MemberDepositSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	memberID?: number /* 會員ID */;
	memberName?: string /* 會員名稱 */;
	currency?: number /* 幣別 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	bankGroupID?: number /* 銀行卡金流組別 */;
	bankGroupName?: string /* 銀行卡金流組別 */;
	payGroupID?: number /* 三方金流組別 */;
	payGroupName?: string /* 三方金流組別 */;
	registedDate?: string /* 註冊日期 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface FILEAJAX_ChannelReconciliationReportMapResponse {
	list?: Array<FILEAJAX_ChannelReconciliationReportResponse> /* 三方對帳表列表，KEY 是時間區段字串，例如08:00-10:00 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface FILEAJAX_ChannelReconciliationReportResponse {
	list?: Array<FILEAJAX_ChannelReconciliationReportResponseData> /* 三方對帳表列表 */;
	count?: number /* 總數 */;
	totalDepositAmount?: number /* 存款金額小計 */;
	totalDepositFee?: number /* 存款手續費小計 */;
	totalPayoutAmount?: number /* 代付金額小計 */;
	totalPayoutFee?: number /* 代付手續費小計 */;
	totalPayoutNum?: number /* 代付次數小計 */;
	totalSettlementNum?: number /* 結算次數小計 */;
	totalSettlementAmount?: number /* 結算金額小計 */;
	totalSettlementFee?: number /* 結算手續費小計 */;
	totalSettlementUAmount?: number /* 下發轉U金額小計 */;
	totalSettlementUFee?: number /* 下發轉U手續費小計 */;
	totalFrozenAmount?: number /* 凍結金額小計 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface FILEAJAX_ChannelReconciliationReportResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	payChannelSn?: string /* 商戶號 */;
	serviceCode?: string /* 支付方式 */;
	serviceName?: string /* 支付方式名稱 */;
	payChannelID?: number /* 三方商戶ID */;
	payChannelName?: string /* 三方商戶名稱 */;
	useType?: number /* 報表類型: 1: 每日對帳表, 2: 整點對帳表 */;
	payoutNum?: number /* 代付次數 */;
	payoutAmount?: number /* 代付金額 */;
	payoutFee?: number /* 代付手續費 */;
	depositNum?: number /* 存款次數 */;
	depositAmount?: number /* 存款金額 */;
	depositFee?: number /* 存款手續費 */;
	settlementNum?: number /* 結算次數 */;
	settlementAmount?: number /* 結算金額 */;
	settlementFee?: number /* 結算手續費 */;
	settlementUNum?: number /* 下發轉U次數 */;
	settlementUAmount?: number /* 下發轉U金額 */;
	settlementUFee?: number /* 下發轉U手續費 */;
	frozenAmount?: number /* 凍結金額 */;
	frozenNum?: number /* 凍結次數 */;
	startingSystemBalance?: number /* 系統餘額(開始時間餘額) */;
	endingSystemBalance?: number /* 系統餘額(結束時間餘額) */;
	endingChannelBalance?: number /* 三方餘額(結束時間餘額) */;
	note?: string /* 備註 */;
	endingBalanceDiff?: number /* 差額 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface FILEAJAX_ArrayResponse {
	list?: Array<FILEAJAX_KeyValue> /* 通用型陣列列表清單 */;
}

export interface FILEAJAX_PromotionApplyRequest {
	promotionID?: number /* 優惠ID(不是上架優惠的ID，是關聯優惠) */;
}

export interface FILEAJAX_DurationAndIDRequest {
	id?: number /* id */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface FILEAJAX_CommonSuccessResponse {
	success?: boolean /* 請求是不是成功 */;
}

export interface FILEAJAX_PhoneNumberAttribution {
	status?: boolean /* 請求狀態: true 代表完成，false 代表失敗 */;
	resultCode?: number /* 返回码 */;
	reason?: string /* 返回说明 */;
	province?: string /* 省份 */;
	city?: string /* 城市，(北京、上海、重庆、天津直辖市可能为空) */;
	areaCode?: string /* 区号，(部分记录可能为空) */;
	zip?: string /* 邮编，(部分记录可能为空) */;
	company?: string /* 运营商 */;
}

export interface FILEAJAX_MemberLoginInfo {
	memberID?: number /* 會員ID */;
	effectiveTime?: number /* 最近連線時間 */;
}

export interface FILEAJAX_WebSocketFdInfo {
	status?: boolean /* 驗證狀態: true 代表完成驗證，false 代表尚未通過驗證 */;
	fd?: number /* WebSocket 客户端连接的标识符，在Server实例中是唯一的，在多个进程内不会重复 */;
	token?: FILEAJAX_Token;
}

export interface FILEAJAX_PaginationRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface FILEAJAX_EmptyResponse {}

export interface FILEAJAX_KeyValue {
	key?: string /* 傳到後端的值 */;
	value?: string /* 前台要顯示的值 */;
}

export interface GAMEAJAX_CreateGameGroupResponse {
	id?: number /* 流水號 */;
}

export interface GAMEAJAX_CreateGameListRequest {
	gameGroupID?: number /* 廠商ID */;
	gameTypeID?: number /* 類型ID */;
	name?: string /* 遊戲名稱 */;
	displayName?: string /* 顯示名稱 */;
	sort?: number /* 排序 */;
	bettingCode?: string /* 用來對應原廠投注紀錄的代碼 */;
	status?: number /* 遊戲狀態 [1:關閉,2:正常] */;
	trialPlay?: number /* 提供試玩 [1:無,2:有] */;
	imageH5File?: File | Blob /* 廠商圖片(H5) */;
	imagePcFile?: File | Blob /* 廠商圖片(PC) */;
}

export interface GAMEAJAX_CreateGameListResponse {
	id?: number /* 流水號 */;
}

export interface GAMEAJAX_GameTypeListResponse {
	list?: Array<GAMEAJAX_KeyValue> /* 遊戲類型列表 */;
}

export interface GAMEAJAX_GetGameGroupListRequest {
	name?: string /* 廠商名稱 */;
	displayName?: string /* 顯示名稱 */;
	gameTypeID?: number /* 遊戲種類ID 0為全部 */;
	status?: number /* 狀態 0為全部 */;
	page?: number /* 頁號 */;
	pageSize?: number /* 每頁容量 */;
}

export interface GAMEAJAX_GetGameGroupRequest {
	id?: number /* 流水號 */;
}

export interface GAMEAJAX_GetGameGroupResponse {
	list?: Array<GAMEAJAX_GameGroupDataResponse> /* 遊戲廠商列表 */;
	count?: number /* 總筆數 */;
}

export interface GAMEAJAX_GetGameListListRequest {
	gameGroupID?: number /* 廠商ID 0為全部 */;
	gameTypeID?: number /* 遊戲種類ID 0為全部 */;
	name?: string /* 遊戲名稱 */;
	displayName?: string /* 顯示名稱 */;
	status?: number /* 狀態 0為全部 */;
	trialPlay?: number /* 提供試玩 [1:無,2:有] */;
	page?: number /* 頁號 */;
	pageSize?: number /* 每頁容量 */;
}

export interface GAMEAJAX_GetGameListRequest {
	id?: number /* 流水號 */;
}

export interface GAMEAJAX_GetGameListResponse {
	list?: Array<GAMEAJAX_GameListDataResponse> /* 遊戲列表 */;
	count?: number /* 總筆數 */;
}

export interface GAMEAJAX_PGResponse {}

export interface GAMEAJAX_XGMemberBalanceRequest {
	user?: string /* 玩家帐号 */;
	requestId?: string /* 請求ID */;
}

export interface GAMEAJAX_XGMemberSettleRequest {
	requestId?: string /* 請求ID */;
	settleItems?: Array<GAMEAJAX_XGMemberSettleRequestData> /* settleItems */;
}

export interface GAMEAJAX_BaseLoginGameResponse {
	url?: string /* 遊戲網址 */;
}

export interface GAMEAJAX_BaseLoginGameRequest {
	gameListID?: string /* 遊戲ID */;
}

export interface GAMEAJAX_MemberMoneyResponse {
	money?: number /* Money */;
}

export interface GAMEAJAX_XGMemberRollbackResponse {
	requestId?: string /* 請求id */;
	status?: string /* 該次請求處理結果，正常則返回ok */;
	user?: string /* 玩家帳號 */;
	currency?: string /* 該玩家幣別 */;
	balance?: number /* 使用者下注後餘額 decimal(20, 4) */;
	transactionId?: string /* 交易編號，同一筆交易交易編號都是固定值。 */;
}

export interface GAMEAJAX_IMFailedResponse {
	Code?: number /* Code */;
	Message?: string /* Code */;
}

export interface GAMEAJAX_IMGetBalanceRequest {
	ProductWallet?: string /* ProductWallet */;
	PlayerId?: string /* PlayerId */;
	Currency?: string /* Currency */;
}

export interface GAMEAJAX_IMGetBalanceResponse {
	Code?: number /* Code */;
	Message?: string /* Message */;
	PlayerId?: string /* PlayerId */;
	Currency?: string /* Currency */;
	Balance?: number /* Balance */;
}

export interface GAMEAJAX_IMPlaceBetRequest {
	ProductWallet?: string /* ProductWallet */;
	SessionToken?: string /* SessionToken */;
	Transactions?: Array<GAMEAJAX_IMPlaceBetTransactionsData> /* Transactions */;
}

export interface GAMEAJAX_IMPlaceBetResponse {
	Results?: Array<GAMEAJAX_IMPlaceBetResponseData> /* 返回IM 投注的 Results */;
}

export interface GAMEAJAX_IMPlaceBetResponseData {
	Code?: number /* Code */;
	Message?: string /* Message */;
	OperatorTransactionId?: string /* OperatorTransactionId */;
	TransactionId?: string /* TransactionId */;
	Balance?: number /* Balance */;
}

export interface GAMEAJAX_IMPlaceBetTransactionsData {
	PlayerId?: string /* PlayerId */;
	ProviderPlayerId?: string /* ProviderPlayerId */;
	Provider?: string /* Provider */;
	GameId?: string /* GameId */;
	GameName?: string /* GameName */;
	BetId?: string /* BetId */;
	TransactionId?: string /* Provider */;
	ActionId?: string /* ActionId */;
	Type?: string /* Type */;
	Currency?: string /* Currency */;
	Amount?: number /* Amount */;
	TimeStamp?: string /* TimeStamp */;
}

export interface GAMEAJAX_IMSettleBetRequest {
	ProductWallet?: string /* ProductWallet */;
	Transactions?: Array<GAMEAJAX_IMSettleBetTransactionsData> /* Transactions */;
}

export interface GAMEAJAX_IMSettleBetResponse {
	Results?: Array<GAMEAJAX_IMSettleBetResponseData> /* 返回 IM 結算的 Results */;
}

export interface GAMEAJAX_IMSettleBetResponseData {
	Code?: number /* Code */;
	Message?: string /* Message */;
	OperatorTransactionId?: string /* OperatorTransactionId */;
	TransactionId?: string /* TransactionId */;
	Balance?: number /* Balance */;
}

export interface GAMEAJAX_IMSettleBetTransactionsData {
	PlayerId?: string /* PlayerId */;
	Provider?: string /* Provider */;
	GameId?: string /* GameId */;
	GameName?: string /* GameName */;
	BetId?: string /* BetId */;
	TransactionId?: string /* TransactionId */;
	ActionId?: number /* ActionId */;
	Type?: string /* Type */;
	Currency?: string /* Currency */;
	Amount?: number /* Amount */;
	TimeStamp?: string /* TimeStamp */;
}

export interface GAMEAJAX_GameGroupLobbyGameGroupListDTO {
	id?: number /* 遊戲廠商id */;
	displayName?: string /* 遊戲廠商顯示名稱 */;
	status?: number /* 遊戲廠商狀態 */;
	maintainTime?: string /* 遊戲廠商顯示名稱 */;
	imageH5?: string /* 遊戲廠商圖片H5 */;
	imagePc?: string /* 遊戲廠商圖片PC */;
	openWay?: number /* 遊戲廠商開啟方式 1:遊戲大廳 2:遊戲列表 3:進入遊戲 */;
	gameUrl?: string /* 遊戲廠商URL */;
}

export interface GAMEAJAX_GameGroupLobbyGameTypeListDTO {
	id?: number /* 遊戲類型id */;
	name?: string /* 遊戲類型名稱 */;
	gameGroupList?: Array<GAMEAJAX_GameGroupLobbyGameGroupListDTO> /* 遊戲廠商 */;
}

export interface GAMEAJAX_GameGroupLobbyResponse {
	list?: Array<GAMEAJAX_GameGroupLobbyGameTypeListDTO> /* 遊戲類型id */;
}

export interface GAMEAJAX_TestRequest {}

export interface GAMEAJAX_GetWalletTypeGGroupDTO {
	id?: number;
	displayName?: string;
	walletType?: number;
}

export interface GAMEAJAX_GetWalletTypeResponse {
	list?: Array<GAMEAJAX_GetWalletTypeGGroupDTO>;
}

export interface GAMEAJAX_GameListTestRequest {
	gameGroupID?: number;
}

export interface GAMEAJAX_GetGameListByGroupIDResponse {
	list?: Array<GAMEAJAX_GameListDTO> /* 遊戲列表 */;
}

export interface GAMEAJAX_GetFavoriteGameByMemberIDRequest {
	gameTypeID?: number /* 遊戲類型ID */;
}

export interface GAMEAJAX_GetGameListByGroupIDRequest {
	gameGroupID?: number /* 遊戲廠商ID */;
}

export interface GAMEAJAX_GetMemberFavoriteGameListResponse {}

export interface GAMEAJAX_GetHotGameResponse {
	list?: Array<GAMEAJAX_HotGameData>;
}

export interface GAMEAJAX_LikeGameRequest {
	gameListID?: number /* 遊戲ID */;
}

export interface GAMEAJAX_HotGameData {
	gameGroupID?: number /* 遊戲廠商id */;
	gameTypeID?: number /* 遊戲類型id */;
	gameGroupDisplayName?: string /* 遊戲廠商顯示名稱 */;
	gameList?: GAMEAJAX_GameListDTO;
}

export interface GAMEAJAX_GetHotGameRequest {
	gameTypeID?: number /* 遊戲類型ID (PC用) */;
	gameGroupID?: number /* 遊戲廠商ID (H5用) */;
}

export interface GAMEAJAX_GameListDTO {
	id?: number /* 遊戲id */;
	displayName?: string /* 遊戲顯示名稱 */;
	sort?: number /* 順序 */;
	status?: number /* 遊戲狀態 */;
	trialPlay?: number /* 遊戲試玩 */;
	imagePc?: string /* 遊戲圖片pc */;
	imageH5?: string /* 遊戲圖片h5 */;
	roomUrl?: string /* 遊戲入口連結 */;
	gameUrl?: string /* 遊戲入口連結 */;
	isFavorite?: boolean /* 遊戲是否收藏 */;
}

export interface GAMEAJAX_GetBalanceResponse {
	list?: Array<GAMEAJAX_GetBalanceResponseData> /* 錢包紀錄 */;
}

export interface GAMEAJAX_GetBalanceResponseData {
	walletID?: string /* 錢包ID */;
	name?: string /* 錢包名稱 */;
	moeny?: number /* 金額 */;
	status?: number /* 狀態, 1:成功取得 2:取得失敗 */;
	updatedAt?: string /* 最後更新日期 */;
}

export interface GAMEAJAX_GameListDataResponse {
	id?: number /* 流水號 */;
	gameGroupID?: number /* 廠商ID */;
	gameGroupName?: string /* 廠商名稱 */;
	gameTypeID?: number /* 類型ID */;
	gameTypeName?: string /* 類型名稱 */;
	name?: string /* 遊戲名稱 */;
	displayName?: string /* 顯示名稱 */;
	sort?: number /* 排序 */;
	bettingCode?: string /* 用來對應原廠投注紀錄代碼 */;
	trialPlay?: number /* 提供試玩 [1:無,2:有] */;
	isSpecial?: number /* 是否為特殊遊戲 [1:是, 2:否] */;
	isSlot?: number /* 是否為老虎機遊戲 [1:是, 2:否] */;
	status?: number /* 遊戲狀態 [1:關閉,2:正常] */;
	imageH5?: string /* 遊戲圖片(H5) */;
	imagePc?: string /* 遊戲圖片(PC) */;
	screenShotH5?: string /* 遊戲截圖(H5) */;
	screenShotPc?: string /* 遊戲截圖(PC) */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 更新時間 */;
}

export interface GAMEAJAX_CreateGameGroupRequest {
	name?: string /* 廠商名稱 */;
	displayName?: string /* 顯示名稱 */;
	status?: number /* 廠商狀態 [1:關閉,2:正常] */;
	imageH5File?: File | Blob /* 廠商圖片(H5) */;
	imagePcFile?: File | Blob /* 廠商圖片(PC) */;
}

export interface GAMEAJAX_GameGroupDataResponse {
	id?: number /* 流水號 */;
	name?: string /* 廠商名稱 */;
	displayName?: string /* 顯示名稱 */;
	status?: number /* 廠商狀態 [1:關閉,2:正常] */;
	imageH5?: string /* 廠商圖片(H5) */;
	imagePc?: string /* 廠商圖片(PC) */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 更新時間 */;
}

export interface GAMEAJAX_UpdateGameGroupRequest {
	id?: number /* 流水號 */;
	name?: string /* 廠商名稱 */;
	displayName?: string /* 顯示名稱 */;
	status?: number /* 廠商狀態 [1:關閉,2:正常] */;
	imageH5File?: File | Blob /* 廠商圖片(H5) */;
	imagePcFile?: File | Blob /* 廠商圖片(PC) */;
}

export interface GAMEAJAX_GetESportLogListRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	memberID?: number /* 會員id */;
	memberAccount?: string /* 會員帳號 */;
	gameGroupID?: number /* 遊戲商ID */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface GAMEAJAX_GetESportLogListResponse {
	list?: Array<GAMEAJAX_GetESportLogListResponseData> /* 遊戲列表 */;
	count?: number /* 總筆數 */;
}

export interface GAMEAJAX_GetESportLogListResponseData {
	listName?: string /* 項目類型 */;
	betType?: string /* 投注類型 */;
	betTime?: string /* 投注時間 */;
	betAmount?: number /* 投注金額 */;
	odds?: number /* 賠率 */;
	winAmount?: number /* 輸贏 */;
	isSettle?: number /* 已結算 */;
}

export interface GAMEAJAX_GetFishLogListRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	memberID?: number /* 會員id */;
	memberAccount?: string /* 會員帳號 */;
	gameGroupID?: number /* 遊戲商ID */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface GAMEAJAX_GetFishLogListResponse {
	list?: Array<GAMEAJAX_GetFishLogListResponseData> /* 遊戲列表 */;
	count?: number /* 總筆數 */;
}

export interface GAMEAJAX_GetFishLogListResponseData {
	listName?: string /* 產品 */;
	betTime?: string /* 投注時間 */;
	betAmount?: number /* 投注金額 */;
	winAmount?: number /* 輸贏 */;
}

export interface GAMEAJAX_PGVerifySessionRequest {
	operator_token?: string /* operator_token */;
	secret_key?: string /* secret_key */;
	operator_player_session?: string /* operator_player_session */;
	ip?: string /* ip */;
	custom_parameter?: string /* custom_parameter */;
	game_id?: number /* game_id */;
}

export interface GAMEAJAX_XGMemberBetResponse {
	requestId?: string /* 請求id */;
	status?: string /* 該次請求處理結果，正常則返回ok */;
	user?: string /* 玩家帳號 */;
	currency?: string /* 該玩家幣別 */;
	balance?: number /* 使用者下注後餘額 decimal(20, 4) */;
	transactionId?: string /* 交易編號，同一筆交易交易編號都是固定值。 */;
}

export interface GAMEAJAX_GetLotteryLogListRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	memberID?: number /* 會員id */;
	memberAccount?: string /* 會員帳號 */;
	gameGroupID?: number /* 遊戲商ID */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface GAMEAJAX_GetLotteryLogListResponse {
	list?: Array<GAMEAJAX_GetLotteryLogListResponseData> /* 遊戲列表 */;
	count?: number /* 總筆數 */;
}

export interface GAMEAJAX_GetLotteryLogListResponseData {
	listName?: string /* 項目類型 */;
	betItem?: string /* 玩法 */;
	betTime?: string /* 投注時間 */;
	betAmount?: number /* 投注金額 */;
	odds?: number /* 賠率 */;
	winAmount?: number /* 輸贏 */;
	isSettle?: number /* 已結算 */;
}

export interface GAMEAJAX_GetSlotLogListRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	memberID?: number /* 會員id */;
	memberAccount?: string /* 會員帳號 */;
	gameGroupID?: number /* 遊戲商ID */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface GAMEAJAX_GetSlotLogListResponse {
	list?: Array<GAMEAJAX_GetSlotLogListResponseData> /* 遊戲列表 */;
	count?: number /* 總筆數 */;
}

export interface GAMEAJAX_GetSlotLogListResponseData {
	listName?: string /* 產品 */;
	betTime?: string /* 投注時間 */;
	betAmount?: number /* 投注金額 */;
	winAmount?: number /* 輸贏 */;
}

export interface GAMEAJAX_GetSportLogListRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	memberID?: number /* 會員id */;
	memberAccount?: string /* 會員帳號 */;
	gameGroupID?: number /* 遊戲商ID */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface GAMEAJAX_GetSportLogListResponse {
	list?: Array<GAMEAJAX_GetSportLogListResponseData> /* 遊戲列表 */;
	count?: number /* 總筆數 */;
}

export interface GAMEAJAX_XGMemberSettleRequestData {
	user?: string /* 玩家帳號 */;
	currency?: string /* 幣別 */;
	amount?: number /* 下注金額 */;
	wagerId?: number /* 呼叫 GetGameDetailUrl Api 取得Detail時使用的參數 */;
	transactionId?: string /* 交易編號，同一筆交易交易編號都是固定值。 */;
}

export interface GAMEAJAX_GetGameLogListRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
	memberID?: number /* 會員id */;
	memberAccount?: string /* 會員帳號 */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface GAMEAJAX_GetGameLogResponse {
	list?: Array<GAMEAJAX_GetGameLogResponseData> /* 遊戲列表 */;
	count?: number /* 總筆數 */;
	totalWinAmount?: number /* 總流水 */;
	totalBetAmount?: number /* 總輸贏 */;
}

export interface GAMEAJAX_GetGameLogResponseData {
	gameGroup?: string /* 產品 */;
	count?: number /* 筆數 */;
	stake?: number /* 投注流水 */;
	winAmount?: number /* 輸贏 */;
}

export interface GAMEAJAX_GetSingleBalanceRequest {
	id?: number /* GameGroupID */;
}

export interface GAMEAJAX_XGMemberRollbackRequest {
	user?: string /* 玩家帳號 */;
	requestId?: string /* 請求ID */;
	transactionId?: string /* 交易編號，同一筆交易交易編號都是固定值。 */;
}

export interface GAMEAJAX_BLMemberCostResponse {}

export interface GAMEAJAX_BLMemberBalanceResponse {}

export interface GAMEAJAX_BLMemberBalanceRequest {
	player_account?: string /* 玩家帐号 */;
	operator_id?: string /* 代理ID */;
	operator_sub_id?: string /* 子代ID */;
	app_id?: string /* 授权ID */;
	sha1?: string /* sha1加密校验 */;
}

export interface GAMEAJAX_BLMemberCostRequest {
	player_account?: string /* 玩家帐号 */;
	operator_id?: string /* 代理ID */;
	operator_sub_id?: string /* 子代ID */;
	game_code?: string /* 游戏代码 */;
	report_id?: string /* 游戏牌局编码 */;
	amount?: string /* 余额 */;
	type?: number /* 消耗类型；10：上分，11：上分失败回滚，20：下分 */;
	time?: string /* 消耗时间戳 */;
	app_id?: string /* 授权ID */;
	cost_info?: {};
	sha1?: string /* sha1加密校验 */;
}

export interface GAMEAJAX_PGAdjustmentRequest {
	operator_token?: string /* 运营商独有的身份识别 */;
	secret_key?: string /* PGSoft 与运营商之间共享密码 */;
	player_name?: string /* 玩家账号 */;
	currency_code?: string /* 玩家选择的币种 */;
	transfer_amount?: number /* 金额调整 负数：扣除余额 正数：增加余额 */;
	adjustment_id?: string /* 调整的参考 ID */;
	adjustment_transaction_id?: string /* 交易的唯一标识符 注：• 运营商应使用此参数来检查请求是否重复并实现幂等操作 */;
	adjustment_time?: string /* 调整时间 (Unix 时间戳，以毫秒为单位) */;
	transaction_type?: string /* 调整来源：900: 外部调整 901: 锦标赛调整 */;
	bet_type?: number /* 游戏启动模式 */;
}

export interface GAMEAJAX_PGGetBalanceRequest {
	operator_token?: string /* operator_token */;
	secret_key?: string /* secret_key */;
	player_name?: string /* player_name */;
	operator_player_session?: string /* operator_player_session 游戏启动时运营商系统生成的玩家令牌 (URL Scheme) */;
	game_id?: number /* game_id */;
}

export interface GAMEAJAX_XGMemberBalanceResponse {
	requestId?: string /* requestId */;
	status?: string /* status */;
	user?: string /* user */;
	currency?: string /* currency */;
	balance?: number /* balance */;
}

export interface GAMEAJAX_XGMemberSettleResponse {
	requestId?: string /* 請求id */;
	status?: string /* 該次請求處理結果，正常則返回ok */;
	user?: string /* 玩家帳號 */;
	settleUserBalanceList?: Array<GAMEAJAX_XGMemberSettleResponseData> /* settleItems */;
}

export interface GAMEAJAX_UpdateGameListRequest {
	id?: number /* 流水號 */;
	gameGroupID?: number /* 廠商ID */;
	gameTypeID?: number /* 類型ID */;
	name?: string /* 遊戲名稱 */;
	displayName?: string /* 顯示名稱 */;
	bettingCode?: string /* 用來對應原廠投注紀錄代碼 */;
	trialPlay?: number /* 提供試玩 [1:無,2:有] */;
	status?: number /* 遊戲狀態 [1:關閉,2:正常] */;
	isSpecial?: number /* 特殊遊戲 [1:是,2:否] */;
	isSlot?: number /* 老虎機遊戲 [1:是,2:否] */;
	sort?: number /* 排序 */;
	recommendedSort?: number /* 推薦排序 0為不推薦 接下來有小至大排列 */;
	imageH5?: string /* 遊戲圖片(H5) */;
	imagePc?: string /* 遊戲圖片(PC) */;
	screenShotH5?: string /* 遊戲截圖(H5) */;
	screenShotPc?: string /* 遊戲截圖(PC) */;
}

export interface GAMEAJAX_CQ9BetRequest {
	account?: string;
	eventTime?: string;
	gamehall?: string;
	gamecode?: string;
	roundid?: string;
	amount?: number;
	mtcode?: string;
	session?: string;
	platform?: string;
}

export interface GAMEAJAX_CQ9CreditRequest {
	account?: string;
	eventTime?: string;
	gamehall?: string;
	gamecode?: string;
	roundid?: string;
	amount?: number;
	mtcode?: string;
}

export interface GAMEAJAX_CQ9EndRoundRequest {
	account?: string;
	createTime?: string;
	gamehall?: string;
	gamecode?: string;
	roundid?: string;
	data?: string;
	amount?: number;
}

export interface GAMEAJAX_CQ9PayoffRequest {
	account?: string;
	eventTime?: string;
	roundid?: string;
	amount?: number;
	mtcode?: string;
}

export interface GAMEAJAX_CQ9RefundRequest {
	mtcode?: string;
}

export interface GAMEAJAX_CQ9RollInRequest {
	account?: string;
	eventTime?: string;
	gamehall?: string;
	gamecode?: string;
	roundid?: string;
	amount?: number;
	mtcode?: string;
	createTime?: string;
	bet?: number;
	win?: number;
	gametype?: string;
	rake?: number;
}

export interface GAMEAJAX_GetSportLogListResponseData {
	listName?: string /* 產品 */;
	betID?: string /* 注單號碼 */;
	betSingleCombo?: number /* 串關 */;
	item?: Array<GAMEAJAX_SportLogData> /* 投注內容 */;
	oddsType?: number /* 盤口 */;
	betTime?: string /* 投注時間 */;
	betAmount?: number /* 投注金額 */;
	winAmount?: number /* 輸贏 */;
	isSettle?: boolean /* 已結算 */;
	preSettle?: boolean /* 提前結算 */;
	preSettleAmount?: number /* 提前結算金額 */;
	preSettleBetAmount?: number /* 提前結算投注額 */;
	preSettleWinAmount?: number /* 提前結算輸贏 */;
	preSettlementAmount?: number /* 提前結算派發金額 */;
	preSettleBalance?: number /* 提前結算剩餘投注額 */;
}

export interface GAMEAJAX_SportLogData {
	aTeam?: string /* 主隊 */;
	bTeam?: string /* 客隊 */;
	league?: string /* 聯賽名稱 */;
	odds?: number /* 賠率 */;
	betType?: string /* 玩法 */;
	betContent?: string /* 投注內容 */;
}

export interface GAMEAJAX_PGBetAndSettleRequest {
	operator_token?: string /* 运营商独有的身份识别 */;
	secret_key?: string /* PGSoft 与运营商之间共享密码 */;
	operator_player_session?: string /* 游戏启动时运营商系统生成的玩家令牌 (URL Scheme) */;
	player_name?: string /* 玩家账号 */;
	game_id?: number /* 游戏的独有代码 */;
	parent_bet_id?: string /* 母注单的唯一标识符 */;
	bet_id?: string /* 子投注的唯一标识符 注： 投注的唯一键 */;
	currency_code?: string /* 玩家选择的币种 */;
	bet_amount?: number /* 投注金额 注：PG 将为免费旋转发送转账金额为零的投注请求 */;
	win_amount?: number /* 赢得金额 注：对于以下情况，PG 将会发送转账金额为零的派彩请求：● 卡牌游戏里玩家进行的每次操作(例子： 分牌)● 一些老虎机游戏里的特色玩法 */;
	transfer_amount?: number /* 玩家的输赢金额 注：该金额可以是正数或负数 负数：扣除余额 正数：增加余额 */;
	transaction_id?: string /* 交易的唯一标识符 格式：{BetId}-{ParentBetId}-{transactionType}-{balanceId} 交易类型：106：投付 400：红利转现金 403：免费游戏转现金 */;
	wallet_type?: string /* 表示该交易中使用的钱包类型 C：现金 B：红利 G：免费游戏 */;
	bet_type?: number /* 投注记录的投注类型：1：真实游戏 */;
	updated_time?: string /* 投注的最近更新时间（时间戳，毫秒）注：updated_time 不等于投注的结束时间 */;
	is_validate_bet?: string /* 表示该请求是否是为进行验证而重新发送的交易 True: 重新发送的交易 False: 正常交易 */;
	is_adjustment?: string /* 表示该请求是否是待处理投注的调整或正常交易 True: 调整 False: 正常交易 */;
	is_parent_zero_stake?: string /* 表示该请求在第一轮投注中的投注金额是否为 0 True: 在第一轮投注中的投注金额为 0 （针对至尊百家乐的飞牌操作）False: 在第一轮投注中的投注金额大于 0 */;
	is_feature?: string /* 表示旋转类型 True: 特色旋转 False: 普通旋转 */;
	is_feature_buy?: string /* 表示购买奖金游戏 注：● 仅适用于具有购买奖金游戏功能的游戏 */;
	is_wager?: string /* 表示该交易是否为投注 True: bet_amount > 0 False: bet_amount = 0 */;
	is_end_round?: string /* 表示当前游戏投注是否已结束 */;
	free_game_transaction_id?: string /* 免费游戏的唯一标识符只有在免费游戏分配给玩家时才会出现。 注：● 仅适用于以外部应用编程接口 API 创建的免费游戏 */;
	free_game_name?: string /* 免费游戏名称只有在免费游戏分配给玩家时才会出现。 */;
	free_game_id?: number /* 免费游戏的唯一标识符 只有在免费游戏分配给玩家时才会出现。 */;
	is_minus_count?: string /* 表示免费游戏中的旋转类型 True：普通旋转（扣除免费游戏次数）False：免费旋转 */;
	bonus_transaction_id?: string /* 红利游戏的唯一标识符 只有在红利分配给玩家时才会出现。注：● 仅适用于以外部应用编程接口 API 创建的红利游戏 */;
	bonus_name?: string /* 红利游戏名称 只有在红利分配给玩家时才会出现。 */;
	bonus_id?: number /* 红利游戏的唯一标识符 只有在红利分配给玩家时才会出现。 */;
	bonus_balance_amount?: number /* 红利钱包的红利总金额 只有在玩家选择用现金完成红利时才会出现 */;
	bonus_ratio_amount?: number /* 红利游戏中玩家需要达到的流水金额 只有在玩家选择用现金完成红利时才会出现。 */;
	jackpot_rtp_contribution_amount?: number /* 玩家的累积奖池贡献金额 注：● 仅适用于累积奖池游戏 */;
}

export interface GAMEAJAX_XGMemberSettleResponseData {
	user?: string /* 玩家帳號 */;
	currency?: string /* 幣別 */;
	balance?: number /* 下注金額 */;
}

export interface GAMEAJAX_XGMemberBetRequest {
	user?: string /* 玩家帳號 */;
	requestId?: string /* 請求ID */;
	currency?: string /* 幣別 */;
	amount?: number /* 下注金額 */;
	gameType?: string /* 遊戲類型 */;
	table?: string /* 桌號 */;
	round?: number /* 輪號 */;
	run?: number /* 局號 */;
	bet?: string /* 下注注區 */;
	betTime?: string /* 下注時間 (yyyy/MM/dd HH:mm:ss) */;
	transactionId?: string /* 交易編號，同一筆交易交易編號都是固定值。 */;
}

export interface GAMEAJAX_EBETGetBalanceRequest {
	channelId?: number;
	username?: string;
	tableType?: number;
	currency?: string;
	event?: string;
	timestamp?: number;
	sessionToken?: string;
	seqNo?: string;
}

export interface GAMEAJAX_EBETLoginRequest {
	username?: string;
	password?: string;
	channelId?: number;
	currency?: string;
	ip?: string;
	eventType?: number;
	accessToken?: string;
	platform?: number;
	event?: string;
	timestamp?: number;
	sessionToken?: string;
	seqNo?: string;
	signature?: string;
}

export interface GAMEAJAX_SABAConfirmAndCancelBetResponse {
	status?: string /* 状态代码 */;
	balance?: string /* 若状态为成功，则回传余额以供更新小数点后两位数 */;
	msg?: string /* 若状态为失败，则回传失败描述 */;
}

export interface GAMEAJAX_SABAGetBalanceResponse {
	status?: string /* 状态代码 */;
	userId?: string /* 用户 id */;
	balance?: number /* 若状态为成功，则回传余额以供更新 */;
	balanceTs?: string /* 若状态为成功，则回 balanceTs 以供更新余额 (ISO8601 format) GMT-4 YYYY-MM-DDThh:mm:ss.sss 请确保不论在何时余额皆为最新状态 */;
	msg?: string /* 若状态为失败，则回传失败描述 */;
}

export interface GAMEAJAX_SABAPlaceBet3rdResponse {
	status?: string /* 状态代码 */;
	balance?: number /* 若状态为成功，则回传余额以供更新小数点后两位数 */;
	msg?: string /* 若状态为失败，则回传失败描述 */;
}

export interface GAMEAJAX_SABAPlaceBetParlayResponse {
	status?: string /* 状态代码 */;
	msg?: string /* 若状态为失败，则回传失败描述 */;
}

export interface GAMEAJAX_SABAPlaceBetResponse {
	status?: string /* 状态代码 */;
	refId?: string /* 从传入参数取得 */;
	licenseeTxId?: number /* 厂商系统交易 id */;
	msg?: string /* 若状态为失败，则回传失败描述 */;
}

export interface GAMEAJAX_SABARequest {
	key?: string /* 凭证文件中之密钥值 */;
	message?: {};
}

export interface GAMEAJAX_SABASettleCashOutUpdateBetResponse {
	status?: string /* 状态代码 */;
	msg?: string /* 若状态为失败，则回传失败描述 */;
}

export interface GAMEAJAX_SABATicketInfoMapping {
	refId?: string /* 从传入参数取得 */;
	licenseeTxId?: string /* 厂商系统交易 id */;
}

export interface GAMEAJAX_EBETQueryRecordRequest {
	channelId?: number;
	username?: string;
	querySeqNo?: string;
	roundCode?: string;
	event?: string;
	timestamp?: number;
	sessionToken?: string;
	seqNo?: string;
	signature?: string;
}

export interface GAMEAJAX_DepositAmountSummaryResponse {
	list?: Array<GAMEAJAX_DepositAmountSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface GAMEAJAX_DepositAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface GAMEAJAX_DepositPeopleSummaryResponse {
	list?: Array<GAMEAJAX_DepositPeopleSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實收金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface GAMEAJAX_DepositPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	uniquePeople?: number /* 唯一存款人數 */;
	firstPeople?: number /* 首存人數 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	avgAmount?: number /* 人均存款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實收金額 */;
	activePeople?: number /* 活躍人數 */;
	depositRate?: number /* 存款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface GAMEAJAX_WithdrawAmountSummaryResponse {
	list?: Array<GAMEAJAX_WithdrawAmountSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface GAMEAJAX_WithdrawAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface GAMEAJAX_WithdrawPeopleSummaryResponse {
	list?: Array<GAMEAJAX_WithdrawPeopleSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalWithdrawNum?: number /* 合計提款次數 */;
	totalAmount?: number /* 合計提款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實出金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface GAMEAJAX_WithdrawPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	uniquePeople?: number /* 唯一提款人數 */;
	firstPeople?: number /* 首提人數 */;
	withdrawNum?: number /* 提款次數 */;
	amount?: number /* 提款金額 */;
	avgAmount?: number /* 人均提款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實出金額 */;
	activePeople?: number /* 活躍人數 */;
	withdrawRate?: number /* 提款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface GAMEAJAX_ChannelDepositSummaryResponse {
	list?: Array<GAMEAJAX_ChannelDepositSummaryResponseData> /* 線路進款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface GAMEAJAX_ChannelDepositSummaryMapResponse {
	channels?: Array<string | undefined> /* 線路進款統計列表 */;
	list?: Array<GAMEAJAX_KeyValue> /* 線路陣列列表清單 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface GAMEAJAX_ChannelDepositSummaryResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	serviceCode?: string /* 支付方式 */;
	payChannelServiceID?: number /* 線路ID */;
	payChannelServiceName?: string /* 線路名稱 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	note?: string /* 備註 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface GAMEAJAX_MemberDepositSummaryResponse {
	list?: Array<GAMEAJAX_MemberDepositSummaryResponseData> /* 會員存款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface GAMEAJAX_MemberDepositSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	memberID?: number /* 會員ID */;
	memberName?: string /* 會員名稱 */;
	currency?: number /* 幣別 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	bankGroupID?: number /* 銀行卡金流組別 */;
	bankGroupName?: string /* 銀行卡金流組別 */;
	payGroupID?: number /* 三方金流組別 */;
	payGroupName?: string /* 三方金流組別 */;
	registedDate?: string /* 註冊日期 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface GAMEAJAX_ChannelReconciliationReportMapResponse {
	list?: Array<GAMEAJAX_ChannelReconciliationReportResponse> /* 三方對帳表列表，KEY 是時間區段字串，例如08:00-10:00 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface GAMEAJAX_ChannelReconciliationReportResponse {
	list?: Array<GAMEAJAX_ChannelReconciliationReportResponseData> /* 三方對帳表列表 */;
	count?: number /* 總數 */;
	totalDepositAmount?: number /* 存款金額小計 */;
	totalDepositFee?: number /* 存款手續費小計 */;
	totalPayoutAmount?: number /* 代付金額小計 */;
	totalPayoutFee?: number /* 代付手續費小計 */;
	totalPayoutNum?: number /* 代付次數小計 */;
	totalSettlementNum?: number /* 結算次數小計 */;
	totalSettlementAmount?: number /* 結算金額小計 */;
	totalSettlementFee?: number /* 結算手續費小計 */;
	totalSettlementUAmount?: number /* 下發轉U金額小計 */;
	totalSettlementUFee?: number /* 下發轉U手續費小計 */;
	totalFrozenAmount?: number /* 凍結金額小計 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface GAMEAJAX_ChannelReconciliationReportResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	payChannelSn?: string /* 商戶號 */;
	serviceCode?: string /* 支付方式 */;
	serviceName?: string /* 支付方式名稱 */;
	payChannelID?: number /* 三方商戶ID */;
	payChannelName?: string /* 三方商戶名稱 */;
	useType?: number /* 報表類型: 1: 每日對帳表, 2: 整點對帳表 */;
	payoutNum?: number /* 代付次數 */;
	payoutAmount?: number /* 代付金額 */;
	payoutFee?: number /* 代付手續費 */;
	depositNum?: number /* 存款次數 */;
	depositAmount?: number /* 存款金額 */;
	depositFee?: number /* 存款手續費 */;
	settlementNum?: number /* 結算次數 */;
	settlementAmount?: number /* 結算金額 */;
	settlementFee?: number /* 結算手續費 */;
	settlementUNum?: number /* 下發轉U次數 */;
	settlementUAmount?: number /* 下發轉U金額 */;
	settlementUFee?: number /* 下發轉U手續費 */;
	frozenAmount?: number /* 凍結金額 */;
	frozenNum?: number /* 凍結次數 */;
	startingSystemBalance?: number /* 系統餘額(開始時間餘額) */;
	endingSystemBalance?: number /* 系統餘額(結束時間餘額) */;
	endingChannelBalance?: number /* 三方餘額(結束時間餘額) */;
	note?: string /* 備註 */;
	endingBalanceDiff?: number /* 差額 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface GAMEAJAX_ArrayResponse {
	list?: Array<GAMEAJAX_KeyValue> /* 通用型陣列列表清單 */;
}

export interface GAMEAJAX_PromotionApplyRequest {
	promotionID?: number /* 優惠ID(不是上架優惠的ID，是關聯優惠) */;
}

export interface GAMEAJAX_DurationAndIDRequest {
	id?: number /* id */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface GAMEAJAX_CommonSuccessResponse {
	success?: boolean /* 請求是不是成功 */;
}

export interface GAMEAJAX_PhoneNumberAttribution {
	status?: boolean /* 請求狀態: true 代表完成，false 代表失敗 */;
	resultCode?: number /* 返回码 */;
	reason?: string /* 返回说明 */;
	province?: string /* 省份 */;
	city?: string /* 城市，(北京、上海、重庆、天津直辖市可能为空) */;
	areaCode?: string /* 区号，(部分记录可能为空) */;
	zip?: string /* 邮编，(部分记录可能为空) */;
	company?: string /* 运营商 */;
}

export interface GAMEAJAX_MemberLoginInfo {
	memberID?: number /* 會員ID */;
	effectiveTime?: number /* 最近連線時間 */;
}

export interface GAMEAJAX_WebSocketFdInfo {
	status?: boolean /* 驗證狀態: true 代表完成驗證，false 代表尚未通過驗證 */;
	fd?: number /* WebSocket 客户端连接的标识符，在Server实例中是唯一的，在多个进程内不会重复 */;
	token?: GAMEAJAX_Token;
}

export interface GAMEAJAX_PaginationRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface GAMEAJAX_EmptyResponse {}

export interface GAMEAJAX_KeyValue {
	key?: string /* 傳到後端的值 */;
	value?: string /* 前台要顯示的值 */;
}

export interface MEMBERAJAX_CaptchaResponse {
	image?: string /* Base64的image */;
	secret?: string /* 驗證用secret */;
}

export interface MEMBERAJAX_SMSRequest {
	phone?: string /* 手機號碼 */;
}

export interface MEMBERAJAX_SMSResponse {
	code_for_debug?: string /* 暫時直接把驗證碼輸出(debug) */;
	secret?: string /* 驗證用的secret */;
}

export interface MEMBERAJAX_GetRegisterConfigRequest {
	registerVerify?: boolean /* 註冊是否需要行為驗證(關閉即為圖形驗證) true:需要 false:不需要 */;
}

export interface MEMBERAJAX_AuthPhoneResponse {
	status?: number /* 驗證狀態 1: 驗證成功, 2: 需驗證簡訊 */;
	result?: MEMBERAJAX_LoginResponse;
}

export interface MEMBERAJAX_GetLoginConfigResponse {
	verify?: boolean /* 登入是否需要行為驗證(關閉即為圖形驗證) true:需要 false:不需要 */;
}

export interface MEMBERAJAX_LoginRequest {
	account?: string /* 帳號 */;
	password?: string /* 密碼 */;
	deviceID?: string /* 裝置ID */;
	platform?: number /* 產品平台 */;
	captcha?: string /* 驗證碼 */;
	secret?: string /* 驗證用的Secret */;
	token?: string /* 行為驗證用的token */;
}

export interface MEMBERAJAX_RegisterRequest {
	account?: string /* 帳號 */;
	password?: string /* 密碼 */;
	phone?: string /* 手機號 */;
	captcha?: string /* 驗證碼 */;
	secret?: string /* 驗證用的Secret */;
	email?: string /* Email */;
	deviceID?: string /* 裝置ID */;
	platform?: number /* 產品平台 */;
	promotionLink?: string /* 代理連結 */;
	token?: string /* 行為驗證用的token */;
}

export interface MEMBERAJAX_AuthPhoneRequest {
	phone?: string /* 手機號 */;
	deviceID?: string /* 裝置ID */;
	platform?: number /* 產品平台 */;
}

export interface MEMBERAJAX_SecondPhaseRequest {
	phone?: string /* 手機號 */;
	deviceID?: string /* 裝置ID */;
	platform?: number /* 產品平台 */;
	code?: string /* 驗證碼 */;
}

export interface MEMBERAJAX_SsoLoginRequest {
	data?: string /* RSA加密後的資料(username,password,exp) */;
	deviceID?: string /* 裝置ID */;
	platform?: number /* 產品平台 */;
	captcha?: string /* 驗證碼 */;
	secret?: string /* 驗證用的Secret */;
	token?: string /* 行為驗證用的token */;
}

export interface MEMBERAJAX_SsoRegisterRequest {
	data?: string /* RSA加密後的資料(username,password,phone,exp) */;
	captcha?: string /* 驗證碼 */;
	secret?: string /* 驗證用的Secret */;
	email?: string /* Email */;
	deviceID?: string /* 裝置ID */;
	platform?: number /* 產品平台 */;
	promotionLink?: string /* 代理連結 */;
	token?: string /* 行為驗證用的token */;
}

export interface MEMBERAJAX_LoginResponse {
	token?: string /* Token */;
	memberID?: number /* 會員ID */;
	account?: string /* 帳號 */;
	status?: number /* 狀態：1: 啟用 2: 停用 3: 鎖定 */;
	forceChangePassword?: number /* 強制更換密碼 1:強制更換  2:不用更換 */;
	forceTwoPhase?: number /* 進入二階段認證 1:進入  2:不用  3:進入，而且需要簡訊驗證 */;
}

export interface MEMBERAJAX_GetVipGiftResponse {
	list?: Array<MEMBERAJAX_GetVipGiftResponseData> /* 可領取的資訊 */;
}

export interface MEMBERAJAX_TakeVIPGiftRequest {
	id?: number /* id */;
}

export interface MEMBERAJAX_GetVipInfoResponse {
	level?: number /* 現在VIP等級 */;
	totalBetAmount?: number /* 累積VIP有效流水 */;
	isKeep?: boolean /* 是否達到保級 */;
	current?: MEMBERAJAX_VIPLevelInfoResponseData;
	next?: MEMBERAJAX_VIPLevelInfoResponseData;
}

export interface MEMBERAJAX_VIPLevelInfoResponseData {
	level?: number /* VIP等級 */;
	upgradeBetAmount?: number /* 晉級需要注額 */;
	keepBetAmount?: number /* 保級維持注額 */;
	upgradeGift?: number /* 晋级礼金 */;
	anniversaryGift?: number /* 周年礼金 */;
	monthlyGift?: number /* 月度礼金 */;
	personRefund?: number /* 真人返水比例 */;
	lotteryRefund?: number /* 彩票返水比例 */;
	sportRefund?: number /* 体育返水比例 */;
	esportRefund?: number /* 电竞返水比例 */;
	electronicRefund?: number /* 电子返水比例 */;
	withdrawAmountLimit?: number /* 单日提款额度上限 */;
	withdrawTimesLimit?: number /* 单日提款次数上限 */;
}

export interface MEMBERAJAX_GetVipGiftResponseData {
	id?: number /* id */;
	vipLevel?: number /* VIP等級 */;
	status?: number /* 領取狀態 1:已領取  2:未領取 */;
	gift?: string /* 禮金 */;
	createdAt?: string /* 發放時間 */;
	type?: number /* 禮金類型  1:月礼金,2:晉級,3:週年,4:返水,5:生日礼 */;
	money?: number /* 禮金 */;
	peroid?: string /* 週期 */;
	read?: number /* 讀取狀態  1:已讀  2:未讀 */;
}

export interface MEMBERAJAX_TakeVIPGiftsRequest {
	ids?: Array<number | undefined> /* id */;
}

export interface MEMBERAJAX_CreateMemberUSDTRequest {
	address?: string /* 地址 */;
	name?: string /* 暱稱 */;
	type?: number /* 類型 1: ERC 2: TRC */;
	secret?: string /* 驗證用secret */;
}

export interface MEMBERAJAX_DeleteMemberBankCardRequest {
	id?: number /* 銀行卡id */;
}

export interface MEMBERAJAX_DeleteMemberUSDTRequest {
	id?: number /* id */;
}

export interface MEMBERAJAX_GetMemberBankCardResponse {
	list?: Array<MEMBERAJAX_GetMemberBankCardResponseData> /* 會員銀行卡 */;
}

export interface MEMBERAJAX_GetMemberBankCardResponseData {
	id?: number /* ID */;
	memberID?: number /* 會員ID */;
	bankAccount?: string /* 戶名 */;
	bankCode?: string /* 開戶行 */;
	bankNo?: string /* 帳號 */;
	area?: string /* 區域 */;
	branch?: string /* 分行 */;
	isDefault?: boolean /* 預設卡 */;
	status?: number /* 狀態 */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 更新時間 */;
}

export interface MEMBERAJAX_GetMemberUSDTResponse {
	list?: Array<MEMBERAJAX_GetMemberUSDTResponseData> /* 會員USDT */;
}

export interface MEMBERAJAX_GetMemberUSDTResponseData {
	id?: number /* ID */;
	memberID?: number /* 會員ID */;
	name?: string /* 暱稱 */;
	address?: string /* 地址 */;
	isDefault?: boolean /* 預設卡 */;
	status?: number /* 狀態 */;
	type?: number /* 類型 1: ERC 2: TRC */;
	createdAt?: string /* 建立時間 */;
	updatedAt?: string /* 更新時間 */;
}

export interface MEMBERAJAX_MemberAuthPasswordRequest {
	password?: string /* 密碼 */;
}

export interface MEMBERAJAX_MemberAuthPasswordResponse {
	secret?: string /* 驗證用secret */;
}

export interface MEMBERAJAX_MemberAuthPhoneRequest {
	phone?: string /* 手機號 */;
}

export interface MEMBERAJAX_MemberAuthPhoneResponse {
	secret?: string /* 驗證用secret */;
}

export interface MEMBERAJAX_MemberVerifySmsRequest {
	code?: string /* 驗證碼 */;
	secret?: string /* 驗證用secret */;
}

export interface MEMBERAJAX_MemberVerifySmsResponse {
	secret?: string /* 驗證用secret */;
}

export interface MEMBERAJAX_UpdateMemberEmailRequest {
	email?: string /* email */;
}

export interface MEMBERAJAX_UpdateMemberNameRequest {
	name?: string /* 姓名 */;
}

export interface MEMBERAJAX_UpdateMemberPasswordRequest {
	password?: string /* 密碼 */;
	secret?: string /* 驗證用secret */;
}

export interface MEMBERAJAX_UpdateMemberPhoneRequest {
	secret?: string /* 驗證用secret */;
	code?: string /* 驗證碼 */;
}

export interface MEMBERAJAX_UpdateMemberRequest {
	address?: string /* 地址 */;
	qqID?: string /* QQ號 */;
	wechatID?: string /* 微信號 */;
	gender?: number /* 性別 1:男 2:女 */;
	birthday?: string /* 生日 */;
}

export interface MEMBERAJAX_CreateMemberBankCardRequest {
	bankNo?: string /* 銀行卡號(全數字，18-22碼) */;
	name?: string /* 實名 */;
}

export interface MEMBERAJAX_MemberLoginSession {
	memberID?: number /* 會員ID */;
	platform?: number /* 產品平台 */;
	config?: MEMBERAJAX_stdClass;
}

export interface MEMBERAJAX_GetMemberResponse {
	account?: string /* 帳號 */;
	id?: number /* ID */;
	name?: string /* 姓名 */;
	phone?: string /* 電話 */;
	phoneCert?: string /* 手機是否驗證, 2未驗證, 1已驗證, 其他再定 */;
	email?: string /* email */;
	emailCert?: string /* email是否驗證, 2未驗證, 1已驗證, 其他再定 */;
	address?: string /* 地址 */;
	depositLimit?: number /* 存款狀態 */;
	withdrawLimit?: number /* 提款狀態 */;
	qqID?: string /* QQ號 */;
	wechatID?: string /* 微信號 */;
	birthday?: string /* 生日 */;
	gender?: number /* 性別 1:男 2:女 */;
	allowOtherBankCard?: boolean /* 允許新增他人銀行卡 */;
}

export interface MEMBERAJAX_RegionalInformationRequest {
	upid?: number /* 上層id */;
}

export interface MEMBERAJAX_RegionInfoDTO {
	id?: number;
	name?: string;
	level?: number;
	usetype?: number;
	displayOrder?: number;
}

export interface MEMBERAJAX_RegionResponse {
	list?: Array<MEMBERAJAX_RegionInfoDTO> /* 中國行政區 */;
}

export interface MEMBERAJAX_DepositAmountSummaryResponse {
	list?: Array<MEMBERAJAX_DepositAmountSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MEMBERAJAX_DepositAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MEMBERAJAX_DepositPeopleSummaryResponse {
	list?: Array<MEMBERAJAX_DepositPeopleSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實收金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MEMBERAJAX_DepositPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	uniquePeople?: number /* 唯一存款人數 */;
	firstPeople?: number /* 首存人數 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	avgAmount?: number /* 人均存款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實收金額 */;
	activePeople?: number /* 活躍人數 */;
	depositRate?: number /* 存款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MEMBERAJAX_WithdrawAmountSummaryResponse {
	list?: Array<MEMBERAJAX_WithdrawAmountSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MEMBERAJAX_WithdrawAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MEMBERAJAX_WithdrawPeopleSummaryResponse {
	list?: Array<MEMBERAJAX_WithdrawPeopleSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalWithdrawNum?: number /* 合計提款次數 */;
	totalAmount?: number /* 合計提款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實出金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MEMBERAJAX_WithdrawPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	uniquePeople?: number /* 唯一提款人數 */;
	firstPeople?: number /* 首提人數 */;
	withdrawNum?: number /* 提款次數 */;
	amount?: number /* 提款金額 */;
	avgAmount?: number /* 人均提款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實出金額 */;
	activePeople?: number /* 活躍人數 */;
	withdrawRate?: number /* 提款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MEMBERAJAX_ChannelDepositSummaryResponse {
	list?: Array<MEMBERAJAX_ChannelDepositSummaryResponseData> /* 線路進款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MEMBERAJAX_ChannelDepositSummaryMapResponse {
	channels?: Array<string | undefined> /* 線路進款統計列表 */;
	list?: Array<MEMBERAJAX_KeyValue> /* 線路陣列列表清單 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MEMBERAJAX_ChannelDepositSummaryResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	serviceCode?: string /* 支付方式 */;
	payChannelServiceID?: number /* 線路ID */;
	payChannelServiceName?: string /* 線路名稱 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	note?: string /* 備註 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MEMBERAJAX_MemberDepositSummaryResponse {
	list?: Array<MEMBERAJAX_MemberDepositSummaryResponseData> /* 會員存款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MEMBERAJAX_MemberDepositSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	memberID?: number /* 會員ID */;
	memberName?: string /* 會員名稱 */;
	currency?: number /* 幣別 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	bankGroupID?: number /* 銀行卡金流組別 */;
	bankGroupName?: string /* 銀行卡金流組別 */;
	payGroupID?: number /* 三方金流組別 */;
	payGroupName?: string /* 三方金流組別 */;
	registedDate?: string /* 註冊日期 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MEMBERAJAX_ChannelReconciliationReportMapResponse {
	list?: Array<MEMBERAJAX_ChannelReconciliationReportResponse> /* 三方對帳表列表，KEY 是時間區段字串，例如08:00-10:00 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MEMBERAJAX_ChannelReconciliationReportResponse {
	list?: Array<MEMBERAJAX_ChannelReconciliationReportResponseData> /* 三方對帳表列表 */;
	count?: number /* 總數 */;
	totalDepositAmount?: number /* 存款金額小計 */;
	totalDepositFee?: number /* 存款手續費小計 */;
	totalPayoutAmount?: number /* 代付金額小計 */;
	totalPayoutFee?: number /* 代付手續費小計 */;
	totalPayoutNum?: number /* 代付次數小計 */;
	totalSettlementNum?: number /* 結算次數小計 */;
	totalSettlementAmount?: number /* 結算金額小計 */;
	totalSettlementFee?: number /* 結算手續費小計 */;
	totalSettlementUAmount?: number /* 下發轉U金額小計 */;
	totalSettlementUFee?: number /* 下發轉U手續費小計 */;
	totalFrozenAmount?: number /* 凍結金額小計 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MEMBERAJAX_ChannelReconciliationReportResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	payChannelSn?: string /* 商戶號 */;
	serviceCode?: string /* 支付方式 */;
	serviceName?: string /* 支付方式名稱 */;
	payChannelID?: number /* 三方商戶ID */;
	payChannelName?: string /* 三方商戶名稱 */;
	useType?: number /* 報表類型: 1: 每日對帳表, 2: 整點對帳表 */;
	payoutNum?: number /* 代付次數 */;
	payoutAmount?: number /* 代付金額 */;
	payoutFee?: number /* 代付手續費 */;
	depositNum?: number /* 存款次數 */;
	depositAmount?: number /* 存款金額 */;
	depositFee?: number /* 存款手續費 */;
	settlementNum?: number /* 結算次數 */;
	settlementAmount?: number /* 結算金額 */;
	settlementFee?: number /* 結算手續費 */;
	settlementUNum?: number /* 下發轉U次數 */;
	settlementUAmount?: number /* 下發轉U金額 */;
	settlementUFee?: number /* 下發轉U手續費 */;
	frozenAmount?: number /* 凍結金額 */;
	frozenNum?: number /* 凍結次數 */;
	startingSystemBalance?: number /* 系統餘額(開始時間餘額) */;
	endingSystemBalance?: number /* 系統餘額(結束時間餘額) */;
	endingChannelBalance?: number /* 三方餘額(結束時間餘額) */;
	note?: string /* 備註 */;
	endingBalanceDiff?: number /* 差額 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MEMBERAJAX_ArrayResponse {
	list?: Array<MEMBERAJAX_KeyValue> /* 通用型陣列列表清單 */;
}

export interface MEMBERAJAX_PromotionApplyRequest {
	promotionID?: number /* 優惠ID(不是上架優惠的ID，是關聯優惠) */;
}

export interface MEMBERAJAX_DurationAndIDRequest {
	id?: number /* id */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface MEMBERAJAX_CommonSuccessResponse {
	success?: boolean /* 請求是不是成功 */;
}

export interface MEMBERAJAX_PhoneNumberAttribution {
	status?: boolean /* 請求狀態: true 代表完成，false 代表失敗 */;
	resultCode?: number /* 返回码 */;
	reason?: string /* 返回说明 */;
	province?: string /* 省份 */;
	city?: string /* 城市，(北京、上海、重庆、天津直辖市可能为空) */;
	areaCode?: string /* 区号，(部分记录可能为空) */;
	zip?: string /* 邮编，(部分记录可能为空) */;
	company?: string /* 运营商 */;
}

export interface MEMBERAJAX_MemberLoginInfo {
	memberID?: number /* 會員ID */;
	effectiveTime?: number /* 最近連線時間 */;
}

export interface MEMBERAJAX_WebSocketFdInfo {
	status?: boolean /* 驗證狀態: true 代表完成驗證，false 代表尚未通過驗證 */;
	fd?: number /* WebSocket 客户端连接的标识符，在Server实例中是唯一的，在多个进程内不会重复 */;
	token?: MEMBERAJAX_Token;
}

export interface MEMBERAJAX_PaginationRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface MEMBERAJAX_EmptyResponse {}

export interface MEMBERAJAX_KeyValue {
	key?: string /* 傳到後端的值 */;
	value?: string /* 前台要顯示的值 */;
}

export interface MONEYAJAX_GetMoneyInOutTypeResponse {
	list?: Array<MONEYAJAX_MoneyInOutTypeResponseData> /* MoneyInOutTypeList */;
	count?: number /* 總數 */;
}

export interface MONEYAJAX_GetMoneyUseTypeResponse {
	list?: Array<MONEYAJAX_MoneyUseTypeResponseData> /* MoneyUseTypeList */;
	count?: number /* 總數 */;
}

export interface MONEYAJAX_MoneyInOutTypeResponseData {
	inOutTypeID?: number /* inOutTypeID */;
	inOutTypeName?: string /* type 名稱 */;
}

export interface MONEYAJAX_MoneyUseTypeResponseData {
	useTypeID?: number /* useTypeID */;
	useTypeName?: string /* type 名稱 */;
}

export interface MONEYAJAX_MemberMoneyResponse {
	money?: number /* Money */;
	lockMoney?: number /* LockMoney */;
}

export interface MONEYAJAX_DepositAmountSummaryResponse {
	list?: Array<MONEYAJAX_DepositAmountSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MONEYAJAX_DepositAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MONEYAJAX_DepositPeopleSummaryResponse {
	list?: Array<MONEYAJAX_DepositPeopleSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實收金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MONEYAJAX_DepositPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	uniquePeople?: number /* 唯一存款人數 */;
	firstPeople?: number /* 首存人數 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	avgAmount?: number /* 人均存款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實收金額 */;
	activePeople?: number /* 活躍人數 */;
	depositRate?: number /* 存款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MONEYAJAX_WithdrawAmountSummaryResponse {
	list?: Array<MONEYAJAX_WithdrawAmountSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MONEYAJAX_WithdrawAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MONEYAJAX_WithdrawPeopleSummaryResponse {
	list?: Array<MONEYAJAX_WithdrawPeopleSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalWithdrawNum?: number /* 合計提款次數 */;
	totalAmount?: number /* 合計提款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實出金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MONEYAJAX_WithdrawPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	uniquePeople?: number /* 唯一提款人數 */;
	firstPeople?: number /* 首提人數 */;
	withdrawNum?: number /* 提款次數 */;
	amount?: number /* 提款金額 */;
	avgAmount?: number /* 人均提款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實出金額 */;
	activePeople?: number /* 活躍人數 */;
	withdrawRate?: number /* 提款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MONEYAJAX_ChannelDepositSummaryResponse {
	list?: Array<MONEYAJAX_ChannelDepositSummaryResponseData> /* 線路進款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MONEYAJAX_ChannelDepositSummaryMapResponse {
	channels?: Array<string | undefined> /* 線路進款統計列表 */;
	list?: Array<MONEYAJAX_KeyValue> /* 線路陣列列表清單 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MONEYAJAX_ChannelDepositSummaryResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	serviceCode?: string /* 支付方式 */;
	payChannelServiceID?: number /* 線路ID */;
	payChannelServiceName?: string /* 線路名稱 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	note?: string /* 備註 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MONEYAJAX_MemberDepositSummaryResponse {
	list?: Array<MONEYAJAX_MemberDepositSummaryResponseData> /* 會員存款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MONEYAJAX_MemberDepositSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	memberID?: number /* 會員ID */;
	memberName?: string /* 會員名稱 */;
	currency?: number /* 幣別 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	bankGroupID?: number /* 銀行卡金流組別 */;
	bankGroupName?: string /* 銀行卡金流組別 */;
	payGroupID?: number /* 三方金流組別 */;
	payGroupName?: string /* 三方金流組別 */;
	registedDate?: string /* 註冊日期 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MONEYAJAX_ChannelReconciliationReportMapResponse {
	list?: Array<MONEYAJAX_ChannelReconciliationReportResponse> /* 三方對帳表列表，KEY 是時間區段字串，例如08:00-10:00 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MONEYAJAX_ChannelReconciliationReportResponse {
	list?: Array<MONEYAJAX_ChannelReconciliationReportResponseData> /* 三方對帳表列表 */;
	count?: number /* 總數 */;
	totalDepositAmount?: number /* 存款金額小計 */;
	totalDepositFee?: number /* 存款手續費小計 */;
	totalPayoutAmount?: number /* 代付金額小計 */;
	totalPayoutFee?: number /* 代付手續費小計 */;
	totalPayoutNum?: number /* 代付次數小計 */;
	totalSettlementNum?: number /* 結算次數小計 */;
	totalSettlementAmount?: number /* 結算金額小計 */;
	totalSettlementFee?: number /* 結算手續費小計 */;
	totalSettlementUAmount?: number /* 下發轉U金額小計 */;
	totalSettlementUFee?: number /* 下發轉U手續費小計 */;
	totalFrozenAmount?: number /* 凍結金額小計 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface MONEYAJAX_ChannelReconciliationReportResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	payChannelSn?: string /* 商戶號 */;
	serviceCode?: string /* 支付方式 */;
	serviceName?: string /* 支付方式名稱 */;
	payChannelID?: number /* 三方商戶ID */;
	payChannelName?: string /* 三方商戶名稱 */;
	useType?: number /* 報表類型: 1: 每日對帳表, 2: 整點對帳表 */;
	payoutNum?: number /* 代付次數 */;
	payoutAmount?: number /* 代付金額 */;
	payoutFee?: number /* 代付手續費 */;
	depositNum?: number /* 存款次數 */;
	depositAmount?: number /* 存款金額 */;
	depositFee?: number /* 存款手續費 */;
	settlementNum?: number /* 結算次數 */;
	settlementAmount?: number /* 結算金額 */;
	settlementFee?: number /* 結算手續費 */;
	settlementUNum?: number /* 下發轉U次數 */;
	settlementUAmount?: number /* 下發轉U金額 */;
	settlementUFee?: number /* 下發轉U手續費 */;
	frozenAmount?: number /* 凍結金額 */;
	frozenNum?: number /* 凍結次數 */;
	startingSystemBalance?: number /* 系統餘額(開始時間餘額) */;
	endingSystemBalance?: number /* 系統餘額(結束時間餘額) */;
	endingChannelBalance?: number /* 三方餘額(結束時間餘額) */;
	note?: string /* 備註 */;
	endingBalanceDiff?: number /* 差額 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface MONEYAJAX_ArrayResponse {
	list?: Array<MONEYAJAX_KeyValue> /* 通用型陣列列表清單 */;
}

export interface MONEYAJAX_PromotionApplyRequest {
	promotionID?: number /* 優惠ID(不是上架優惠的ID，是關聯優惠) */;
}

export interface MONEYAJAX_DurationAndIDRequest {
	id?: number /* id */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface MONEYAJAX_CommonSuccessResponse {
	success?: boolean /* 請求是不是成功 */;
}

export interface MONEYAJAX_PhoneNumberAttribution {
	status?: boolean /* 請求狀態: true 代表完成，false 代表失敗 */;
	resultCode?: number /* 返回码 */;
	reason?: string /* 返回说明 */;
	province?: string /* 省份 */;
	city?: string /* 城市，(北京、上海、重庆、天津直辖市可能为空) */;
	areaCode?: string /* 区号，(部分记录可能为空) */;
	zip?: string /* 邮编，(部分记录可能为空) */;
	company?: string /* 运营商 */;
}

export interface MONEYAJAX_MemberLoginInfo {
	memberID?: number /* 會員ID */;
	effectiveTime?: number /* 最近連線時間 */;
}

export interface MONEYAJAX_WebSocketFdInfo {
	status?: boolean /* 驗證狀態: true 代表完成驗證，false 代表尚未通過驗證 */;
	fd?: number /* WebSocket 客户端连接的标识符，在Server实例中是唯一的，在多个进程内不会重复 */;
	token?: MONEYAJAX_Token;
}

export interface MONEYAJAX_PaginationRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface MONEYAJAX_EmptyResponse {}

export interface MONEYAJAX_KeyValue {
	key?: string /* 傳到後端的值 */;
	value?: string /* 前台要顯示的值 */;
}

export interface PAYMENTAJAX_RegisterRequest {
	memberID?: number /* 會員ID */;
}

export interface PAYMENTAJAX_ChangePayChannelAmountRequest {
	id?: number /* 異動商戶號id */;
	targetType?: number /* 類型 1:銀行卡 2:商戶號 */;
	targetID?: number /* 銀行卡 或 商戶號 id */;
	amount?: number /* 異動金額 */;
	fee?: number /* 手續費 */;
	thirdID?: string /* 三方單號 */;
	note?: string /* 異動備註 */;
}

export interface PAYMENTAJAX_HbPaymentCallbackRequest {
	out_trade_no?: string /* 原始商户订单 */;
	request_time?: string /* request_time */;
	create_time?: string /* 订单建立时间 */;
	input_charset?: string /* input_charset */;
	sign?: string /* 签名字符串 */;
	remark?: string /* 备注 */;
	sign_type?: string /* 签名方式 */;
	order_sn?: string /* 订单号 */;
	pay_time?: string /* 订单支付时间 */;
	status?: number /* 订单状态 */;
	amount?: number /* 金额 */;
	poundage?: number /* 手续费 */;
}

export interface PAYMENTAJAX_PromotionListResponse {
	list?: Array<PAYMENTAJAX_PromotionListResponseData> /* 列表 */;
}

export interface PAYMENTAJAX_PromotionDropdownResponse {
	promotionLaunchedType?: Array<PAYMENTAJAX_KeyValue> /* 優惠類型下拉清單 */;
}

export interface PAYMENTAJAX_PromotionListRequest {
	type?: number /* 優惠分類(API:payment/promotion/dropdown->promotionLaunchedType) */;
}

export interface PAYMENTAJAX_PromotionApplyResponseData {
	id?: number /* 優惠ID */;
	name?: string /* 優惠名稱 */;
	applyStatus?: number /* 參加狀態[1申請參加,2已申請參加] */;
}

export interface PAYMENTAJAX_PromotionListResponseData {
	id?: number /* 上架id */;
	name?: string /* 優惠名稱 */;
	type?: string /* 上架分類 */;
	top?: number /* 置頂 */;
	orderNo?: number /* 排序 */;
	content?: string /* 優惠內容 */;
	device?: string /* 裝置[1:WebPC,2:MobileWeb,3:AndroidPWA,4:iOSPWA] */;
	status?: number /* 狀態[1即將開始2進行中3已結束] */;
	imageWeb?: string /* 圖片WEB */;
	imageH5?: string /* 圖片WEB */;
	startTime?: string /* 上架時間 */;
	endTime?: string /* 下架時間 */;
	openWay?: number /* 開啟方式[1優惠卡片2內部網頁3外部連結] */;
	openLink?: string /* 若為內部網頁或外部連結，則需會有網址 */;
	promotion?: Array<PAYMENTAJAX_PromotionApplyResponseData> /* 關聯優惠 */;
}

export interface PAYMENTAJAX_PromotionReadRequest {
	ID?: number /* 優惠ID */;
}

export interface PAYMENTAJAX_BonusListResponse {
	list?: Array<PAYMENTAJAX_BonusListResponseData> /* 列表 */;
}

export interface PAYMENTAJAX_BonusListRequest {
	startTime?: string /* 時間區間開始 */;
	endTime?: string /* 時間區間結束 */;
}

export interface PAYMENTAJAX_CancelDepositRequest {
	id?: string /* id */;
}

export interface PAYMENTAJAX_GetDepositResponse {
	list?: Array<PAYMENTAJAX_GetDepositResponseData> /* 列表 */;
}

export interface PAYMENTAJAX_GetDepositResponseData {
	id?: number /* 線路 ID */;
	name?: string /* 線路名稱 */;
	note?: string /* 說明 */;
	icon?: string /* Icon */;
	tooltip?: string /* 推廣文字 */;
	lower?: number /* 充值下限 */;
	upper?: number /* 充值上限 */;
	maintain?: number /* 維護狀態 1:維護中 2:正常 */;
	isRecommend?: boolean /* 是否推薦 */;
	needRealName?: boolean /* 是否需要真實姓名 */;
	hasDoc?: boolean /* 是否有教學 */;
	docTitle?: string /* 教學文字 */;
	docURL?: string /* 教學位置 */;
}

export interface PAYMENTAJAX_WithdrawalIndexResponse {
	exchangeRate?: number /* 參考匯率 */;
}

export interface PAYMENTAJAX_CreateWithdrawalRequest {
	currency?: number /* 1:銀行卡 2:USDT_ERC 3:USDT_TRC */;
}

export interface PAYMENTAJAX_BonusListResponseData {
	bonusIn?: string /* 存入 */;
	typeName?: string /* 類型[優惠、VIP禮金、反水、其他] */;
	bonus?: number /* 金額 */;
	status?: number /* 狀態[1處理中2成功3失敗] */;
	orderNo?: string /* 單號 */;
	updatedAt?: string /* 時間 */;
	description?: string /* 說明 */;
}

export interface PAYMENTAJAX_DepositListRequest {
	startTime?: string /* 時間區間開始 */;
	endTime?: string /* 時間區間結束 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface PAYMENTAJAX_WithdrawalListRequest {
	startTime?: string /* 時間區間開始 */;
	endTime?: string /* 時間區間結束 */;
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface PAYMENTAJAX_DepositListResponseData {
	payment?: string /* 付費方式(充值渠道名稱 or 代理帳號) */;
	amount?: number /* 充值金額 */;
	status?: number /* 狀態[1:處理中 2:失敗 3:完成 4:逾時] */;
	statusStr?: string /* 狀態[成功,失败,等待中] */;
	id?: string /* 訂單號 */;
	createdAt?: string /* 存單建立時間 */;
	exchangeRate?: number /* 匯率 */;
}

export interface PAYMENTAJAX_WithdrawalListResponseData {
	payment?: string /* 提款方式（銀行卡orUSDT） */;
	amount?: number /* 提款金額 */;
	status?: number /* 狀態[1.待審核 2.待出款 3.退回 4.出款中 5. 完成 6.失敗] */;
	statusStr?: string /* 狀態[審核中,失敗,等待中,成功] */;
	to?: string /* 存入位置：提款標的銀行與末4碼卡號 or （ERC20/TRC20）虛擬提領地址 */;
	id?: string /* 訂單號 */;
	createdAt?: string /* 提單建立時間 */;
	exchangeRate?: number /* 匯率（若使用USDT 才會有） */;
}

export interface PAYMENTAJAX_CreateDepositRequest {
	id?: number /* 線路 id */;
	amount?: number /* 存款金額 */;
	realName?: string /* 真實姓名 */;
}

export interface PAYMENTAJAX_CreateDepositResponse {
	type?: number /* 開啟方式 1:收銀台 */;
	url?: string /* 開啟網址 */;
}

export interface PAYMENTAJAX_DepositListResponse {
	list?: Array<PAYMENTAJAX_DepositListResponseData> /* 列表 */;
	count?: number /* 總數 */;
}

export interface PAYMENTAJAX_WithdrawalListResponse {
	list?: Array<PAYMENTAJAX_WithdrawalListResponseData> /* 列表 */;
	count?: number /* 總數 */;
}

export interface PAYMENTAJAX_DepositAmountSummaryResponse {
	list?: Array<PAYMENTAJAX_DepositAmountSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface PAYMENTAJAX_DepositAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface PAYMENTAJAX_DepositPeopleSummaryResponse {
	list?: Array<PAYMENTAJAX_DepositPeopleSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實收金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface PAYMENTAJAX_DepositPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	uniquePeople?: number /* 唯一存款人數 */;
	firstPeople?: number /* 首存人數 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	avgAmount?: number /* 人均存款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實收金額 */;
	activePeople?: number /* 活躍人數 */;
	depositRate?: number /* 存款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface PAYMENTAJAX_WithdrawAmountSummaryResponse {
	list?: Array<PAYMENTAJAX_WithdrawAmountSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface PAYMENTAJAX_WithdrawAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface PAYMENTAJAX_WithdrawPeopleSummaryResponse {
	list?: Array<PAYMENTAJAX_WithdrawPeopleSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalWithdrawNum?: number /* 合計提款次數 */;
	totalAmount?: number /* 合計提款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實出金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface PAYMENTAJAX_WithdrawPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	uniquePeople?: number /* 唯一提款人數 */;
	firstPeople?: number /* 首提人數 */;
	withdrawNum?: number /* 提款次數 */;
	amount?: number /* 提款金額 */;
	avgAmount?: number /* 人均提款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實出金額 */;
	activePeople?: number /* 活躍人數 */;
	withdrawRate?: number /* 提款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface PAYMENTAJAX_ChannelDepositSummaryResponse {
	list?: Array<PAYMENTAJAX_ChannelDepositSummaryResponseData> /* 線路進款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface PAYMENTAJAX_ChannelDepositSummaryMapResponse {
	channels?: Array<string | undefined> /* 線路進款統計列表 */;
	list?: Array<PAYMENTAJAX_KeyValue> /* 線路陣列列表清單 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface PAYMENTAJAX_ChannelDepositSummaryResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	serviceCode?: string /* 支付方式 */;
	payChannelServiceID?: number /* 線路ID */;
	payChannelServiceName?: string /* 線路名稱 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	note?: string /* 備註 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface PAYMENTAJAX_MemberDepositSummaryResponse {
	list?: Array<PAYMENTAJAX_MemberDepositSummaryResponseData> /* 會員存款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface PAYMENTAJAX_MemberDepositSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	memberID?: number /* 會員ID */;
	memberName?: string /* 會員名稱 */;
	currency?: number /* 幣別 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	bankGroupID?: number /* 銀行卡金流組別 */;
	bankGroupName?: string /* 銀行卡金流組別 */;
	payGroupID?: number /* 三方金流組別 */;
	payGroupName?: string /* 三方金流組別 */;
	registedDate?: string /* 註冊日期 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface PAYMENTAJAX_ChannelReconciliationReportMapResponse {
	list?: Array<PAYMENTAJAX_ChannelReconciliationReportResponse> /* 三方對帳表列表，KEY 是時間區段字串，例如08:00-10:00 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface PAYMENTAJAX_ChannelReconciliationReportResponse {
	list?: Array<PAYMENTAJAX_ChannelReconciliationReportResponseData> /* 三方對帳表列表 */;
	count?: number /* 總數 */;
	totalDepositAmount?: number /* 存款金額小計 */;
	totalDepositFee?: number /* 存款手續費小計 */;
	totalPayoutAmount?: number /* 代付金額小計 */;
	totalPayoutFee?: number /* 代付手續費小計 */;
	totalPayoutNum?: number /* 代付次數小計 */;
	totalSettlementNum?: number /* 結算次數小計 */;
	totalSettlementAmount?: number /* 結算金額小計 */;
	totalSettlementFee?: number /* 結算手續費小計 */;
	totalSettlementUAmount?: number /* 下發轉U金額小計 */;
	totalSettlementUFee?: number /* 下發轉U手續費小計 */;
	totalFrozenAmount?: number /* 凍結金額小計 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface PAYMENTAJAX_ChannelReconciliationReportResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	payChannelSn?: string /* 商戶號 */;
	serviceCode?: string /* 支付方式 */;
	serviceName?: string /* 支付方式名稱 */;
	payChannelID?: number /* 三方商戶ID */;
	payChannelName?: string /* 三方商戶名稱 */;
	useType?: number /* 報表類型: 1: 每日對帳表, 2: 整點對帳表 */;
	payoutNum?: number /* 代付次數 */;
	payoutAmount?: number /* 代付金額 */;
	payoutFee?: number /* 代付手續費 */;
	depositNum?: number /* 存款次數 */;
	depositAmount?: number /* 存款金額 */;
	depositFee?: number /* 存款手續費 */;
	settlementNum?: number /* 結算次數 */;
	settlementAmount?: number /* 結算金額 */;
	settlementFee?: number /* 結算手續費 */;
	settlementUNum?: number /* 下發轉U次數 */;
	settlementUAmount?: number /* 下發轉U金額 */;
	settlementUFee?: number /* 下發轉U手續費 */;
	frozenAmount?: number /* 凍結金額 */;
	frozenNum?: number /* 凍結次數 */;
	startingSystemBalance?: number /* 系統餘額(開始時間餘額) */;
	endingSystemBalance?: number /* 系統餘額(結束時間餘額) */;
	endingChannelBalance?: number /* 三方餘額(結束時間餘額) */;
	note?: string /* 備註 */;
	endingBalanceDiff?: number /* 差額 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface PAYMENTAJAX_ArrayResponse {
	list?: Array<PAYMENTAJAX_KeyValue> /* 通用型陣列列表清單 */;
}

export interface PAYMENTAJAX_PromotionApplyRequest {
	promotionID?: number /* 優惠ID(不是上架優惠的ID，是關聯優惠) */;
}

export interface PAYMENTAJAX_DurationAndIDRequest {
	id?: number /* id */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface PAYMENTAJAX_CommonSuccessResponse {
	success?: boolean /* 請求是不是成功 */;
}

export interface PAYMENTAJAX_PhoneNumberAttribution {
	status?: boolean /* 請求狀態: true 代表完成，false 代表失敗 */;
	resultCode?: number /* 返回码 */;
	reason?: string /* 返回说明 */;
	province?: string /* 省份 */;
	city?: string /* 城市，(北京、上海、重庆、天津直辖市可能为空) */;
	areaCode?: string /* 区号，(部分记录可能为空) */;
	zip?: string /* 邮编，(部分记录可能为空) */;
	company?: string /* 运营商 */;
}

export interface PAYMENTAJAX_MemberLoginInfo {
	memberID?: number /* 會員ID */;
	effectiveTime?: number /* 最近連線時間 */;
}

export interface PAYMENTAJAX_WebSocketFdInfo {
	status?: boolean /* 驗證狀態: true 代表完成驗證，false 代表尚未通過驗證 */;
	fd?: number /* WebSocket 客户端连接的标识符，在Server实例中是唯一的，在多个进程内不会重复 */;
	token?: PAYMENTAJAX_Token;
}

export interface PAYMENTAJAX_PaginationRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface PAYMENTAJAX_EmptyResponse {}

export interface PAYMENTAJAX_KeyValue {
	key?: string /* 傳到後端的值 */;
	value?: string /* 前台要顯示的值 */;
}

export interface REPORTAJAX_LockTestRequest {
	customerID?: number /* 測試用客戶編號，預設 1 */;
	sleep?: number /* 測試暫停時間，預設10秒，最小1秒，最大30秒 */;
}

export interface REPORTAJAX_BatchGenAgencyMemberRequest {
	childAgencyCount?: number /* 要產生多少個下層代理 */;
	memberCount?: number /* 每個代理要產生多少個會員 */;
	parentAgencyAccount?: string /* 在指定總代帳號下產生下層代理，如果沒有的話會產生一個總代，及總代的直屬會員。 */;
	accountPrefix?: string /* 帳號開頭 */;
}

export interface REPORTAJAX_CreateAgencyNodeRequest {
	agencyID?: number /* 代理ID */;
	parentAgencyID?: number /* 上層代理ID，0或null為無上層代理 */;
}

export interface REPORTAJAX_CreateAgencyRankGroupRequest {
	agencyID?: number /* 代理ID */;
	giveOffer?: number /* 是否分配佣金 */;
	rankGroupID?: number /* 佣金群組編號 */;
}

export interface REPORTAJAX_GenAgencyRequest {
	accountPrefix?: string /* 帳號開頭 */;
	parentAgencyID?: number /* 上層代理ID */;
}

export interface REPORTAJAX_GenAgencyResponse {
	agencyID?: number /* 代理ID */;
}

export interface REPORTAJAX_GenFakeMemberReportRequest {
	date?: string /* 假資料月分，至少必須是上個月，因為排程關係會洗掉本月的資料 */;
	parentAgencyAccount?: string /* 總代帳號 */;
	rechargeAmount?: number /* 單一會員總存款 */;
	withdrawAmount?: number /* 單一會員總提款 */;
	bonusAmount?: number /* 單一會員優惠紅利 */;
	vipGiftAmount?: number /* 單一會員VIP禮金 */;
	returnAmount?: number /* 單一會員VIP返水 */;
	betAmountTop?: number /* 單一會員每一廠商投注上限 */;
	betAmountBottom?: number /* 單一會員每一廠商投注下限 */;
	winRate?: number /* 會員勝率 */;
	payRateTop?: number /* 會員報酬率上限 */;
	payRateBottom?: number /* 會員報酬率下限 */;
}

export interface REPORTAJAX_GenMemberRequest {
	accountPrefix?: string /* 帳號開頭 */;
	promotionLink?: string /* 推廣連結 */;
}

export interface REPORTAJAX_GenMemberResponse {
	memberID?: number /* 會員ID */;
}

export interface REPORTAJAX_TestAdjustRelationRequest {
	parentAgencyAccount?: string /* 總代帳號 */;
	date?: string /* 設定月份（月初） */;
}

export interface REPORTAJAX_TestAgentCommissionMonthlyRequest {
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
	isFinal?: boolean /* 是否為最後結算 */;
}

export interface REPORTAJAX_DepositAmountSummaryResponse {
	list?: Array<REPORTAJAX_DepositAmountSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface REPORTAJAX_DepositAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface REPORTAJAX_DepositPeopleSummaryResponse {
	list?: Array<REPORTAJAX_DepositPeopleSummaryResponseData> /* Deposit Summary Report列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實收金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface REPORTAJAX_DepositPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	serviceCode?: string /* 支付方式 */;
	uniquePeople?: number /* 唯一存款人數 */;
	firstPeople?: number /* 首存人數 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	avgAmount?: number /* 人均存款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實收金額 */;
	activePeople?: number /* 活躍人數 */;
	depositRate?: number /* 存款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface REPORTAJAX_WithdrawAmountSummaryResponse {
	list?: Array<REPORTAJAX_WithdrawAmountSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalAmount100?: number /* 金額0~100合計次數 */;
	totalAmount500?: number /* 金額101~500合計次數 */;
	totalAmount1000?: number /* 金額501~1,000合計次數 */;
	totalAmount2000?: number /* 金額1,001~2,000合計次數 */;
	totalAmount6000?: number /* 金額2,001~6,000合計次數 */;
	totalAmount10000?: number /* 金額6,001~10,000合計次數 */;
	totalAmount20000?: number /* 金額10,001~20,000合計次數 */;
	totalAmountMore20000?: number /* 金額兩萬以上合計次數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface REPORTAJAX_WithdrawAmountSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	amount100?: number /* 金額0~100 */;
	amount500?: number /* 金額101~500 */;
	amount1000?: number /* 金額501~1,000 */;
	amount2000?: number /* 金額1,001~2,000 */;
	amount6000?: number /* 金額2,001~6,000 */;
	amount10000?: number /* 金額6,001~10,000 */;
	amount20000?: number /* 金額10,001~20,000 */;
	amountMore20000?: number /* 金額兩萬以上 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface REPORTAJAX_WithdrawPeopleSummaryResponse {
	list?: Array<REPORTAJAX_WithdrawPeopleSummaryResponseData> /* Withdraw Summary Report列表 */;
	count?: number /* 總數 */;
	totalWithdrawNum?: number /* 合計提款次數 */;
	totalAmount?: number /* 合計提款金額 */;
	totalFee?: number /* 合計手續費 */;
	totalActualAmount?: number /* 合計實出金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface REPORTAJAX_WithdrawPeopleSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	uniquePeople?: number /* 唯一提款人數 */;
	firstPeople?: number /* 首提人數 */;
	withdrawNum?: number /* 提款次數 */;
	amount?: number /* 提款金額 */;
	avgAmount?: number /* 人均提款金額 */;
	fee?: number /* 手續費 */;
	actualAmount?: number /* 實出金額 */;
	activePeople?: number /* 活躍人數 */;
	withdrawRate?: number /* 提款比 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface REPORTAJAX_ChannelDepositSummaryResponse {
	list?: Array<REPORTAJAX_ChannelDepositSummaryResponseData> /* 線路進款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface REPORTAJAX_ChannelDepositSummaryMapResponse {
	channels?: Array<string | undefined> /* 線路進款統計列表 */;
	list?: Array<REPORTAJAX_KeyValue> /* 線路陣列列表清單 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface REPORTAJAX_ChannelDepositSummaryResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	serviceCode?: string /* 支付方式 */;
	payChannelServiceID?: number /* 線路ID */;
	payChannelServiceName?: string /* 線路名稱 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	note?: string /* 備註 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface REPORTAJAX_MemberDepositSummaryResponse {
	list?: Array<REPORTAJAX_MemberDepositSummaryResponseData> /* 會員存款統計列表 */;
	count?: number /* 總數 */;
	totalDepositNum?: number /* 合計存款次數 */;
	totalAmount?: number /* 合計存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface REPORTAJAX_MemberDepositSummaryResponseData {
	reportDate?: string /* 報表日期 */;
	memberID?: number /* 會員ID */;
	memberName?: string /* 會員名稱 */;
	currency?: number /* 幣別 */;
	depositNum?: number /* 存款次數 */;
	amount?: number /* 存款金額 */;
	maxAmount?: number /* 最高存款金額 */;
	minAmount?: number /* 最小存款金額 */;
	avgAmount?: number /* 平均每次存款金額 */;
	dayAvgAmount?: number /* 平均每日存款金額 */;
	bankGroupID?: number /* 銀行卡金流組別 */;
	bankGroupName?: string /* 銀行卡金流組別 */;
	payGroupID?: number /* 三方金流組別 */;
	payGroupName?: string /* 三方金流組別 */;
	registedDate?: string /* 註冊日期 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface REPORTAJAX_ChannelReconciliationReportMapResponse {
	list?: Array<REPORTAJAX_ChannelReconciliationReportResponse> /* 三方對帳表列表，KEY 是時間區段字串，例如08:00-10:00 */;
	count?: number /* 總數 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface REPORTAJAX_ChannelReconciliationReportResponse {
	list?: Array<REPORTAJAX_ChannelReconciliationReportResponseData> /* 三方對帳表列表 */;
	count?: number /* 總數 */;
	totalDepositAmount?: number /* 存款金額小計 */;
	totalDepositFee?: number /* 存款手續費小計 */;
	totalPayoutAmount?: number /* 代付金額小計 */;
	totalPayoutFee?: number /* 代付手續費小計 */;
	totalPayoutNum?: number /* 代付次數小計 */;
	totalSettlementNum?: number /* 結算次數小計 */;
	totalSettlementAmount?: number /* 結算金額小計 */;
	totalSettlementFee?: number /* 結算手續費小計 */;
	totalSettlementUAmount?: number /* 下發轉U金額小計 */;
	totalSettlementUFee?: number /* 下發轉U手續費小計 */;
	totalFrozenAmount?: number /* 凍結金額小計 */;
	updatedAt?: string /* 最後更新時間 */;
}

export interface REPORTAJAX_ChannelReconciliationReportResponseData {
	id?: number /* id */;
	reportDate?: string /* 報表日期 */;
	reportHour?: number /* 報表小時 */;
	payChannelSn?: string /* 商戶號 */;
	serviceCode?: string /* 支付方式 */;
	serviceName?: string /* 支付方式名稱 */;
	payChannelID?: number /* 三方商戶ID */;
	payChannelName?: string /* 三方商戶名稱 */;
	useType?: number /* 報表類型: 1: 每日對帳表, 2: 整點對帳表 */;
	payoutNum?: number /* 代付次數 */;
	payoutAmount?: number /* 代付金額 */;
	payoutFee?: number /* 代付手續費 */;
	depositNum?: number /* 存款次數 */;
	depositAmount?: number /* 存款金額 */;
	depositFee?: number /* 存款手續費 */;
	settlementNum?: number /* 結算次數 */;
	settlementAmount?: number /* 結算金額 */;
	settlementFee?: number /* 結算手續費 */;
	settlementUNum?: number /* 下發轉U次數 */;
	settlementUAmount?: number /* 下發轉U金額 */;
	settlementUFee?: number /* 下發轉U手續費 */;
	frozenAmount?: number /* 凍結金額 */;
	frozenNum?: number /* 凍結次數 */;
	startingSystemBalance?: number /* 系統餘額(開始時間餘額) */;
	endingSystemBalance?: number /* 系統餘額(結束時間餘額) */;
	endingChannelBalance?: number /* 三方餘額(結束時間餘額) */;
	note?: string /* 備註 */;
	endingBalanceDiff?: number /* 差額 */;
	updatedAt?: string /* 報表最後更新日期 */;
	createdAt?: string /* 報表最後建立日期 */;
}

export interface REPORTAJAX_ArrayResponse {
	list?: Array<REPORTAJAX_KeyValue> /* 通用型陣列列表清單 */;
}

export interface REPORTAJAX_PromotionApplyRequest {
	promotionID?: number /* 優惠ID(不是上架優惠的ID，是關聯優惠) */;
}

export interface REPORTAJAX_DurationAndIDRequest {
	id?: number /* id */;
	startTime?: string /* 開始時間 */;
	endTime?: string /* 結束時間 */;
}

export interface REPORTAJAX_CommonSuccessResponse {
	success?: boolean /* 請求是不是成功 */;
}

export interface REPORTAJAX_PhoneNumberAttribution {
	status?: boolean /* 請求狀態: true 代表完成，false 代表失敗 */;
	resultCode?: number /* 返回码 */;
	reason?: string /* 返回说明 */;
	province?: string /* 省份 */;
	city?: string /* 城市，(北京、上海、重庆、天津直辖市可能为空) */;
	areaCode?: string /* 区号，(部分记录可能为空) */;
	zip?: string /* 邮编，(部分记录可能为空) */;
	company?: string /* 运营商 */;
}

export interface REPORTAJAX_MemberLoginInfo {
	memberID?: number /* 會員ID */;
	effectiveTime?: number /* 最近連線時間 */;
}

export interface REPORTAJAX_WebSocketFdInfo {
	status?: boolean /* 驗證狀態: true 代表完成驗證，false 代表尚未通過驗證 */;
	fd?: number /* WebSocket 客户端连接的标识符，在Server实例中是唯一的，在多个进程内不会重复 */;
	token?: REPORTAJAX_Token;
}

export interface REPORTAJAX_PaginationRequest {
	page?: number /* 第幾頁 */;
	pageSize?: number /* 每頁筆數 */;
}

export interface REPORTAJAX_EmptyResponse {}

export interface REPORTAJAX_KeyValue {
	key?: string /* 傳到後端的值 */;
	value?: string /* 前台要顯示的值 */;
}

export interface SwaggerApi {
	/**
	 * @tag AGENCYAJAX.deposit
	 * @summary 存款： 取得線路
	 */
	get(url: '/agency/deposit', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_GetDepositResponse>;

	/**
	 * @tag AGENCYAJAX.deposit
	 * @summary 存款： 建立存款單
	 */
	post(url: '/agency/deposit', options: { body: AGENCYAJAX_CreateDepositRequest } & IDefaultOptions): Promise<AGENCYAJAX_EmptyResponse>;

	/**
	 * @tag AGENCYAJAX.deposit
	 * @summary 存款： 取消充值
	 */
	post(url: '/agency/deposit/cancel', options: { body: AGENCYAJAX_CancelDepositRequest } & IDefaultOptions): Promise<AGENCYAJAX_EmptyResponse>;

	/**
	 * @tag AGENCYAJAX.withdrawal
	 * @summary 提款: 提款首頁
	 */
	get(url: '/agency/withdrawal', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_WithdrawalIndexResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 代理登入
	 */
	post(url: '/agency/agency/login', options: { body: AGENCYAJAX_AgencyLoginRequest } & IDefaultOptions): Promise<AGENCYAJAX_AgencyLoginResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 代理首頁
	 */
	get(url: '/agency/agency', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_AgencyFrontPageResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 代理財物報表
	 */
	get(
		url: '/agency/agency/finance',
		options: {
			query: {
				month: number;
			};
		} & IDefaultOptions
	): Promise<AGENCYAJAX_AgencyFinanceIndexResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 代理產品分項報表
	 */
	get(url: '/agency/agency/finance/products', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_AgencyFinanceProductsResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 單一產品分項報表
	 */
	get(
		url: '/agency/agency/finance/product',
		options: {
			query: {
				id: number;
				periodOption: number;
			};
		} & IDefaultOptions
	): Promise<AGENCYAJAX_AgencyFinanceProductResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 財務報表活躍用戶
	 */
	get(
		url: '/agency/agency/finance/activemember',
		options: {
			query: {
				id: number;
				periodOption: number;
			};
		} & IDefaultOptions
	): Promise<AGENCYAJAX_AgencyFinanceGetActivememberResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 財務報表紅利
	 */
	get(url: '/agency/agency/finance/bonus', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_AgencyFinanceGetBonusResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 財務報表平台費
	 */
	get(url: '/agency/agency/finance/platform', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_AgencyFinanceGetPlatformResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 代理活動
	 */
	get(url: '/agency/agency/activitys', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_GetAgencyActivityResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 會員流水與存款記錄
	 */
	get(
		url: '/agency/agency/member',
		options: {
			query: {
				id: number;
				periodStart?: string;
				periodEnd?: string;
			};
		} & IDefaultOptions
	): Promise<AGENCYAJAX_GetMemberFinanceResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 代理會員單一廠商流水與輸贏(尚未有資料)
	 */
	get(
		url: '/agency/agency/member/product',
		options: {
			query: {
				memberID: number;
				gameGroupID: number;
				periodStart?: string;
				periodEnd?: string;
			};
		} & IDefaultOptions
	): Promise<AGENCYAJAX_GetMemberProductFinanceResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 代理會員列表
	 */
	get(
		url: '/agency/agency/members',
		options: {
			query: {
				memberName?: string;
				periodStart?: string;
				periodEnd?: string;
			};
		} & IDefaultOptions
	): Promise<AGENCYAJAX_GetMembersResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 代理確認密碼
	 */
	post(url: '/agency/agency/check_password', options: { body: AGENCYAJAX_CheckPasswordRequest } & IDefaultOptions): Promise<AGENCYAJAX_string>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 代理修改密碼
	 */
	put(url: '/agency/agency/reset_password', options: { body: AGENCYAJAX_ResetPasswordRequest } & IDefaultOptions): Promise<AGENCYAJAX_EmptyResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 官網優惠活動
	 */
	get(url: '/agency/agency/promotion', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_PromotionLaunchedListResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 官網公告
	 */
	get(url: '/agency/agency/announcement', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_AnnouncementListResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 代理公告
	 */
	get(url: '/agency/agency/agencyannouncement', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_AgencyAnnouncementListResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 佣金報表
	 */
	get(url: '/agency/agency/commissionreport', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_CommissionReportResponseData>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 二級代理福利總計
	 */
	get(url: '/agency/agency/childagencycommissionreport', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_ChildAgencyCommissionReportSum>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 二級代理佣金列表
	 */
	get(url: '/agency/agency/childagencycommissionlist', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_ChildAgencyCommissionList>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 二級代理尊享福利列表
	 */
	get(url: '/agency/agency/childagencybonuslist', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_ChildAgencyBonusList>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 取得代理銀行卡列表下拉選單
	 */
	get(url: '/agency/agency/getbankcardlist', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_GetAgencyBankCardKVResponse>;

	/**
	 * @tag AGENCYAJAX.agency
	 * @summary 取得代理USDT列表下拉選單
	 */
	get(url: '/agency/agency/getusdtaddresslist', options?: {} & IDefaultOptions): Promise<AGENCYAJAX_GetAgencyUsdtAddressKVResponse>;

	/**
	 * @tag BACKENDAJAX.MemberDetailLogs
	 * @summary 用戶列表操作紀錄
	 */
	get(
		url: '/backend/memberdetaillogs/logs',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				memberAccount?: string;
				startDate?: string;
				endDate?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetMemberDetailLogsResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 商戶號列表
	 */
	get(
		url: '/backend/pay/pay_channel',
		options: {
			query: {
				sn?: string;
				status?: number;
				name?: string;
				supplyAp?: boolean;
				sort?: string;
				dir?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetPayChannelResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 新增商戶號
	 */
	post(url: '/backend/pay/pay_channel', options: { body: BACKENDAJAX_CreatePayChannelRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 編輯商戶號
	 */
	put(url: '/backend/pay/pay_channel', options: { body: BACKENDAJAX_UpdatePayChannelRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 查看特定商戶號
	 */
	get(
		url: '/backend/pay/pay_channel/show',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PayChannelResponseData>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 取得銀行卡號 / 商戶號資訊
	 */
	get(
		url: '/backend/pay/pay_channel/search',
		options: {
			query: {
				keyword: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PayChannelSearchResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 充值
	 */
	post(url: '/backend/pay/pay_channel/remain/add', options: { body: BACKENDAJAX_ChangePayChannelAmountRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 結算
	 */
	post(url: '/backend/pay/pay_channel/remain/sub', options: { body: BACKENDAJAX_ChangePayChannelAmountRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 凍結
	 */
	post(url: '/backend/pay/pay_channel/frozen/add', options: { body: BACKENDAJAX_ChangePayChannelAmountRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 解除凍結
	 */
	post(url: '/backend/pay/pay_channel/frozen/sub', options: { body: BACKENDAJAX_ChangePayChannelAmountRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 04.5搜尋共用 清單API
	 */
	get(url: '/backend/pay/pay_channel/dropdown', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetPaymentAllDropDownResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 代付狀態邊更
	 */
	post(url: '/backend/pay/pay_channel/ap', options: { body: BACKENDAJAX_IDRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 帳務明細
	 */
	get(
		url: '/backend/pay/pay_channel/log',
		options: {
			query: {
				createdAtStart: string;
				createdAtEnd: string;
				payChannelID?: number;
				payChannelServiceID?: number;
				payChannel?: string;
				payChannelService?: string;
				dir?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetPayChannelAmountLogResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel
	 * @summary 商戶號管理: 修改帳務明細備註
	 */
	put(url: '/backend/pay/pay_channel/log/note', options: { body: BACKENDAJAX_CreateNoteRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay_bankcard
	 * @summary 銀行卡明細：帳務明細
	 */
	get(
		url: '/backend/pay_bankcard/log',
		options: {
			query: {
				logTimeStart?: string;
				logTimeEnd?: string;
				cardNo?: number;
				orderBy?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_BankcardLogListResponse>;

	/**
	 * @tag BACKENDAJAX.pay_bankcard
	 * @summary 銀行卡明細：增加備註
	 */
	post(url: '/backend/pay_bankcard/note', options: { body: BACKENDAJAX_BankcardLogNoteCreateRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 取得日存款報表，以人數統計
	 */
	get(
		url: '/backend/report/deposit/people_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
				serviceCode?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_DepositPeopleSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 重算日存款報表，以人數統計
	 */
	post(url: '/backend/report/deposit/people_report', options: { body: BACKENDAJAX_CreateDepositPeopleReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 取得週存款報表，以人數統計
	 */
	get(
		url: '/backend/report/deposit/people_week_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
				serviceCode?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_DepositPeopleSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 重算週存款報表，以人數統計。reportDate 必須是週一日期
	 */
	post(url: '/backend/report/deposit/people_week_report', options: { body: BACKENDAJAX_CreateDepositPeopleReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 取得月存款報表，以人數統計
	 */
	get(
		url: '/backend/report/deposit/people_month_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
				serviceCode?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_DepositPeopleSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 重算月存款報表，以人數統計。reportDate 必須是1號日期
	 */
	post(url: '/backend/report/deposit/people_month_report', options: { body: BACKENDAJAX_CreateDepositPeopleReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 取得會員存款報表
	 */
	get(
		url: '/backend/report/deposit/member_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
				currency?: number;
				paymentGroup?: string;
				bankcardGroup?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_MemberDepositSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 重算會員存款報表
	 */
	post(url: '/backend/report/deposit/member_report', options: { body: BACKENDAJAX_CreateDateReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 系統站內信：列表
	 */
	get(
		url: '/backend/site/letter/setting/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetLetterSettingResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 站內信發送清單：列表
	 */
	get(
		url: '/backend/site/letter/list',
		options: {
			query: {
				memberAccount?: string;
				status?: number;
				type?: number;
				title?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetLetterListResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 站內信發送清單：發送名單
	 */
	get(
		url: '/backend/site/letter/member',
		options: {
			query: {
				letterSettingId: number;
				memberAccount?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetLetterMemberResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 站內信發送清單：新增
	 */
	post(url: '/backend/site/letter/member', options: { body: BACKENDAJAX_CreateLetterMemberRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 站內信發送清單：編輯
	 */
	put(url: '/backend/site/letter/member', options: { body: BACKENDAJAX_UpdateLetterMemberOneRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 系統站內信：編輯
	 */
	get(
		url: '/backend/site/letter/setting',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_LetterSettingResponseData>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 系統站內信：編輯
	 */
	put(url: '/backend/site/letter/setting', options: { body: BACKENDAJAX_UpdateLetterSettingRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 站內信發送清單：回收
	 */
	put(url: '/backend/site/letter/member/cancel', options: { body: BACKENDAJAX_UpdateLetterMemberRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 站內信發送清單：編輯
	 */
	get(
		url: '/backend/site/letter/member/one',
		options: {
			query: {
				letterSettingId: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_LetterListResponseData>;

	/**
	 * @tag BACKENDAJAX.pay.fake
	 * @summary 測試用-提款管理: 新增提款單
	 */
	post(url: '/backend/pay/fake/withdrawal', options: { body: BACKENDAJAX_FakeCreateWithdrawalRequest } & IDefaultOptions): Promise<BACKENDAJAX_StringIDResponse>;

	/**
	 * @tag BACKENDAJAX.pay.fake
	 * @summary 測試用-提款管理: 出款單回調
	 */
	post(url: '/backend/pay/fake/payout/callback', options: { body: BACKENDAJAX_FakePaymentCallbackRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 取得日提款報表，以人數統計
	 */
	get(
		url: '/backend/report/withdraw/people_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_WithdrawPeopleSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 重算日提款報表，以人數統計
	 */
	post(url: '/backend/report/withdraw/people_report', options: { body: BACKENDAJAX_CreateWithdrawPeopleReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 取得週提款報表，以人數統計
	 */
	get(
		url: '/backend/report/withdraw/people_week_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_WithdrawPeopleSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 重算週提款報表，以人數統計。reportDate 必須是週一日期
	 */
	post(url: '/backend/report/withdraw/people_week_report', options: { body: BACKENDAJAX_CreateWithdrawPeopleReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 取得月提款報表，以人數統計
	 */
	get(
		url: '/backend/report/withdraw/people_month_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_WithdrawPeopleSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 重算月提款報表，以人數統計。reportDate 必須是1號日期
	 */
	post(url: '/backend/report/withdraw/people_month_report', options: { body: BACKENDAJAX_CreateWithdrawPeopleReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.pay.fake
	 * @summary 測試用-存款管理: 新增存款單
	 */
	post(url: '/backend/pay/fake/deposit', options: { body: BACKENDAJAX_FakeCreateDepositRequest } & IDefaultOptions): Promise<BACKENDAJAX_FakeCreateDepositResponse>;

	/**
	 * @tag BACKENDAJAX.pay.fake
	 * @summary 測試用-存款管理:存款單回調
	 */
	post(url: '/backend/pay/fake/deposit/callback', options: { body: BACKENDAJAX_FakePaymentCallbackRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.fake
	 * @summary 測試用-存款管理:存款單回調
	 */
	post(url: '/backend/pay/fake/deposit_txn/callback', options: { body: BACKENDAJAX_FakePaymentCallbackRequest } & IDefaultOptions): Promise<BACKENDAJAX_ArrayResponse>;

	/**
	 * @tag BACKENDAJAX.pay.fake
	 * @summary 測試收集DC的APM數據
	 */
	post(url: '/backend/pay/fake/apm_sample', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_PayGroupListResponse>;

	/**
	 * @tag BACKENDAJAX.pay.fake
	 * @summary 取得Message項目的陣列列表
	 */
	post(url: '/backend/pay/fake/get_message_code_list', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_ArrayResponse>;

	/**
	 * @tag BACKENDAJAX.Agency.WalletLogs
	 * @summary 代理取得存款列表中需要的 錢包列表
	 */
	get(
		url: '/backend/agency/walletlogs/withdrawallist',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				agencyID: number;
				inOut?: number;
				type?: number;
				startTime?: string;
				endTime?: string;
				orderBy?: string;
				sortBy?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyWalletLogsForWithdrawalResponse>;

	/**
	 * @tag BACKENDAJAX.agency.activity
	 * @summary 代理公告列表
	 */
	get(
		url: '/backend/agency/activity/list',
		options: {
			query: {
				periodBeginning: string;
				periodEnd: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyActivityResponse>;

	/**
	 * @tag BACKENDAJAX.agency.activity
	 * @summary 代理公告
	 */
	get(
		url: '/backend/agency/activity',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyActivityDTO>;

	/**
	 * @tag BACKENDAJAX.agency.activity
	 * @summary 新增代理公告
	 */
	post(url: '/backend/agency/activity/new', options: { body: BACKENDAJAX_CreateAgencyActivityRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.agency.activity
	 * @summary 修改代理公告
	 */
	put(url: '/backend/agency/activity/edit', options: { body: BACKENDAJAX_UpdateAgencyAnnouncementRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.launched
	 * @summary 優惠：取得單一上架優惠
	 */
	get(
		url: '/backend/promotion/launched',
		options: {
			query: {
				ID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PromotionLaunchedListResponseData>;

	/**
	 * @tag BACKENDAJAX.promotion.launched
	 * @summary 優惠：新增優惠上架API
	 */
	post(url: '/backend/promotion/launched', options: { body: BACKENDAJAX_PromotionLaunchedCreateRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.launched
	 * @summary 優惠：修改優惠上架API
	 */
	put(url: '/backend/promotion/launched', options: { body: BACKENDAJAX_PromotionLaunchedSaveRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.launched
	 * @summary 優惠:優惠上架列表API
	 */
	get(
		url: '/backend/promotion/launched/list',
		options: {
			query: {
				name?: string;
				type?: number;
				display?: number;
				device?: number;
				startTime?: string;
				endTime?: string;
				orderBy?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PromotionLaunchedListResponse>;

	/**
	 * @tag BACKENDAJAX.pay_bankcard
	 * @summary 銀行卡管理：查看銀行卡資料API
	 */
	get(
		url: '/backend/pay_bankcard',
		options: {
			query: {
				ID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_BankcardListResponseData>;

	/**
	 * @tag BACKENDAJAX.pay_bankcard
	 * @summary 銀行卡管理：新增銀行卡API
	 */
	post(url: '/backend/pay_bankcard', options: { body: BACKENDAJAX_BankcardCreateRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay_bankcard
	 * @summary 銀行卡管理：修改銀行卡API
	 */
	put(url: '/backend/pay_bankcard', options: { body: BACKENDAJAX_BankcardSaveRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay_bankcard
	 * @summary 銀行卡管理：下拉選單
	 */
	get(url: '/backend/pay_bankcard/dropdown', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_BankcardDropdownResponse>;

	/**
	 * @tag BACKENDAJAX.pay_bankcard
	 * @summary 銀行卡管理：列表與搜尋篩選API
	 */
	get(
		url: '/backend/pay_bankcard/bankcards',
		options: {
			query: {
				cardNo?: number;
				status?: number;
				type?: number;
				accountName?: string;
				payBankID?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_BankcardListResponse>;

	/**
	 * @tag BACKENDAJAX.pay_bankcard
	 * @summary 銀行卡管理：轉帳
	 */
	post(url: '/backend/pay_bankcard/transfer', options: { body: BACKENDAJAX_BankcardTransferRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay_bankcard
	 * @summary 銀行卡管理：凍結
	 */
	post(url: '/backend/pay_bankcard/lock', options: { body: BACKENDAJAX_BankcardLockRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay_bankcard
	 * @summary 銀行卡管理：解除凍結
	 */
	post(url: '/backend/pay_bankcard/unlock', options: { body: BACKENDAJAX_BankcardLockRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.agency.bankCard
	 * @summary 新增銀行卡
	 */
	post(url: '/backend/agency/bankcard', options: { body: BACKENDAJAX_CreateAgencyBankCardRequest } & IDefaultOptions): Promise<BACKENDAJAX_CreateAgencyBankCardResponse>;

	/**
	 * @tag BACKENDAJAX.agency.bankCard
	 * @summary 取得預設銀行卡
	 */
	get(
		url: '/backend/agency/bankcard/getdefault',
		options: {
			query: {
				agencyID: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyBankCardData>;

	/**
	 * @tag BACKENDAJAX.agency.bankCard
	 * @summary 取得代理銀行卡列表
	 */
	get(
		url: '/backend/agency/bankcard/list',
		options: {
			query: {
				agencyID: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyBankCardListResponse>;

	/**
	 * @tag BACKENDAJAX.agency.bankCard
	 * @summary 停用銀行卡
	 */
	put(url: '/backend/agency/bankcard/disable', options: { body: BACKENDAJAX_UpdateAgencyBankCardRequest } & IDefaultOptions): Promise<BACKENDAJAX_UpdateAgencyBankCardResponse>;

	/**
	 * @tag BACKENDAJAX.agency.bankCard
	 * @summary 啟用銀行卡
	 */
	put(url: '/backend/agency/bankcard/enable', options: { body: BACKENDAJAX_UpdateAgencyBankCardRequest } & IDefaultOptions): Promise<BACKENDAJAX_UpdateAgencyBankCardResponse>;

	/**
	 * @tag BACKENDAJAX.agency.bankCard
	 * @summary 設定預設銀行卡
	 */
	put(url: '/backend/agency/bankcard/setdefault', options: { body: BACKENDAJAX_UpdateAgencyBankCardRequest } & IDefaultOptions): Promise<BACKENDAJAX_UpdateAgencyBankCardResponse>;

	/**
	 * @tag BACKENDAJAX.pay.deposit
	 * @summary 存款管理: 存款單列表
	 */
	get(
		url: '/backend/pay/deposit',
		options: {
			query: {
				source?: number;
				createdAtStart?: string;
				createdAtEnd?: string;
				updateAtStart?: string;
				updateAtEnd?: string;
				status?: number;
				id?: string;
				method?: string;
				memberName?: string;
				memberID?: number;
				payGroupID?: number;
				bankcardGroupID?: number;
				balanceDate?: string;
				serviceName?: string;
				bankcard?: string;
				device?: number;
				type?: string;
				payChannelNameID?: number;
				payChannelID?: number;
				sort?: string;
				dir?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetDepositResponse>;

	/**
	 * @tag BACKENDAJAX.pay.deposit
	 * @summary 存款管理: 新增存款單
	 */
	post(url: '/backend/pay/deposit', options: { body: BACKENDAJAX_CreateDepositRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.deposit
	 * @summary 存款管理: 查看訂單紀錄
	 */
	get(
		url: '/backend/pay/deposit/note',
		options: {
			query: {
				id: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetPayNoteResponse>;

	/**
	 * @tag BACKENDAJAX.pay.deposit
	 * @summary 存款管理: 新增存款單備註
	 */
	post(url: '/backend/pay/deposit/note', options: { body: BACKENDAJAX_CreateNoteRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.deposit
	 * @summary 存款管理: 修改存款單入帳日
	 */
	put(url: '/backend/pay/deposit/balancedate', options: { body: BACKENDAJAX_EditBalanceDateRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.deposit
	 * @summary 存款管理: 查詢三方回調狀態
	 */
	post(url: '/backend/pay/deposit/callback', options: { body: BACKENDAJAX_StringIDRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.deposit
	 * @summary 存款管理: 計算手續費(參考用)
	 */
	post(url: '/backend/pay/deposit/fee', options: { body: BACKENDAJAX_CalcFeeRequest } & IDefaultOptions): Promise<BACKENDAJAX_FeeResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得會員USDT
	 */
	get(
		url: '/backend/member/usdts',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetMemberUSDTResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 新增會員USDT
	 */
	post(url: '/backend/member/usdt', options: { body: BACKENDAJAX_CreateMemberUSDTRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 刪除會員USDT
	 */
	delete(
		url: '/backend/member/usdt',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 修改會員預設USDT
	 */
	put(url: '/backend/member/usdt/default', options: { body: BACKENDAJAX_UpdateDefaultMemberUSDTRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.Member.WalletLogs
	 * @summary 會員取得存款列表中需要的 錢包列表
	 */
	get(
		url: '/backend/member/walletlogs/withdrawallist',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				memberID: number;
				inOut?: number;
				type?: number;
				startTime?: string;
				endTime?: string;
				orderBy?: string;
				sortBy?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetMemberWalletLogsForWithdrawalResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得會員銀行卡
	 */
	get(
		url: '/backend/member/bankcards',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetMemberBankCardResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 新增會員銀行卡
	 */
	post(url: '/backend/member/bankcard', options: { body: BACKENDAJAX_CreateMemberBankCardRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 刪除會員銀行卡
	 */
	delete(
		url: '/backend/member/bankcard',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 修改會員預設銀行卡
	 */
	put(url: '/backend/member/bankcard/default', options: { body: BACKENDAJAX_UpdateDefaultMemberBankCardRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 修改會員預設銀行卡
	 */
	put(url: '/backend/member/bankcard/other', options: { body: BACKENDAJAX_AllowOtherBankcardRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 取得代理列表
	 */
	get(
		url: '/backend/agency/list',
		options: {
			query: {
				agencyID?: number;
				agencyAccount?: string;
				exactlyMatching?: number;
				reviewStartTime?: string;
				reviewEndTime?: string;
				giveOffer?: number;
				rankGroupID?: number;
				activeStatus?: number;
				status?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyListResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 取得代理詳細
	 */
	get(
		url: '/backend/agency',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyDataResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 建立代理
	 */
	post(url: '/backend/agency', options: { body: BACKENDAJAX_CreateAgencyRequest } & IDefaultOptions): Promise<BACKENDAJAX_UpdateAgencyResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 修改代理詳細（姓名 手機 email QQ 微信），除了代理id必填之外，可以一次只帶一個參數
	 */
	put(url: '/backend/agency', options: { body: BACKENDAJAX_UpdateAgencyRequest } & IDefaultOptions): Promise<BACKENDAJAX_UpdateAgencyResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 確認會員是否存在，以及會員狀態是否正常
	 */
	get(
		url: '/backend/agency/checkmember',
		options: {
			query: {
				account: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_CheckMemberByAccountResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 修改密碼
	 */
	put(url: '/backend/agency/changepassword', options: { body: BACKENDAJAX_ChangePasswordRequest } & IDefaultOptions): Promise<BACKENDAJAX_UpdateAgencyResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 修改狀態，除了id之外的三個參數可以單獨使用
	 */
	put(url: '/backend/agency/changestatus', options: { body: BACKENDAJAX_ChangeStatusRequest } & IDefaultOptions): Promise<BACKENDAJAX_UpdateAgencyResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 取得代理佣金群組
	 */
	get(
		url: '/backend/agency/rankgroup',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyRankGroupResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 設定代理佣金群組
	 */
	put(url: '/backend/agency/rankgroup', options: { body: BACKENDAJAX_CreateAgencyRankGroupRequest } & IDefaultOptions): Promise<BACKENDAJAX_CreateAgencyRankGroupResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 新增推廣網址
	 */
	post(url: '/backend/agency/promotionlink', options: { body: BACKENDAJAX_CreateAgencyPromotionLinkRequest } & IDefaultOptions): Promise<BACKENDAJAX_UpdateAgencyResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 刪除推廣網址
	 */
	delete(
		url: '/backend/agency/promotionlink',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_UpdateAgencyResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 修改推廣網址
	 */
	put(url: '/backend/agency/promotionlink', options: { body: BACKENDAJAX_UpdateAgencyPromotionLinkRequest } & IDefaultOptions): Promise<BACKENDAJAX_UpdateAgencyResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 查詢代理的上層代理資訊
	 */
	get(
		url: '/backend/agency/node',
		options: {
			query: {
				agencyAccount: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyNodeResponse>;

	/**
	 * @tag BACKENDAJAX.agency
	 * @summary 二級代理換線
	 */
	put(url: '/backend/agency/node', options: { body: BACKENDAJAX_CreateAgencyNodeRequest } & IDefaultOptions): Promise<BACKENDAJAX_UpdateAgencyResponse>;

	/**
	 * @tag BACKENDAJAX.vip
	 * @summary 查詢VIP禮品紀錄
	 */
	get(
		url: '/backend/vip/gift/search',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				id?: number;
				account?: string;
				vipLevel?: number;
				status?: number;
				vipStatus?: number;
				type?: number;
				startTime?: string;
				endTime?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SearchVIPGiftResponse>;

	/**
	 * @tag BACKENDAJAX.vip
	 * @summary 新增會員生日禮
	 */
	post(url: '/backend/vip/gift/birthday', options: { body: BACKENDAJAX_CreateVipGiftRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.agency.usdt
	 * @summary 新增代理USDT
	 */
	post(url: '/backend/agency/usdt', options: { body: BACKENDAJAX_CreateAgencyUsdtAddressRequest } & IDefaultOptions): Promise<BACKENDAJAX_CreateAgencyUsdtAddressResponse>;

	/**
	 * @tag BACKENDAJAX.agency.usdt
	 * @summary 刪除USDT位址
	 */
	delete(
		url: '/backend/agency/usdt',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_UpdateAgencyUsdtResponse>;

	/**
	 * @tag BACKENDAJAX.agency.usdt
	 * @summary 取得預設USDT
	 */
	get(
		url: '/backend/agency/usdt/getdefault',
		options: {
			query: {
				agencyID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyUsdtData>;

	/**
	 * @tag BACKENDAJAX.agency.usdt
	 * @summary 取得代理USDT列表
	 */
	get(
		url: '/backend/agency/usdt/list',
		options: {
			query: {
				agencyID: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyUsdtListResponse>;

	/**
	 * @tag BACKENDAJAX.agency.usdt
	 * @summary 設定預設USDT位址
	 */
	put(url: '/backend/agency/usdt/setdefault', options: { body: BACKENDAJAX_UpdateAgencyBankCardRequest } & IDefaultOptions): Promise<BACKENDAJAX_UpdateAgencyBankCardResponse>;

	/**
	 * @tag BACKENDAJAX.agency.ranksetting
	 * @summary 取得代理等級群組
	 */
	get(
		url: '/backend/agency/ranksetting',
		options: {
			query: {
				groupID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyRankSettingDataResponse>;

	/**
	 * @tag BACKENDAJAX.agency.ranksetting
	 * @summary 建立代理等級
	 */
	post(url: '/backend/agency/ranksetting', options: { body: BACKENDAJAX_CreateAgencyRankSettingRequest } & IDefaultOptions): Promise<BACKENDAJAX_CreateAgencyRankSettingResponse>;

	/**
	 * @tag BACKENDAJAX.agency.ranksetting
	 * @summary 修改代理等級
	 */
	put(url: '/backend/agency/ranksetting', options: { body: BACKENDAJAX_UpdateAgencyRankSettingRequest } & IDefaultOptions): Promise<BACKENDAJAX_CreateAgencyRankSettingResponse>;

	/**
	 * @tag BACKENDAJAX.agency.ranksetting
	 * @summary 取得代理等級群組
	 */
	get(
		url: '/backend/agency/ranksetting/list',
		options: {
			query: {
				groupName?: string;
				groupID?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyRankSettingListResponse>;

	/**
	 * @tag BACKENDAJAX.agency.ranksetting
	 * @summary 取得代理等級KV，給下拉選單用
	 */
	get(url: '/backend/agency/ranksetting/all', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_AgencyRankSettingKvResponse>;

	/**
	 * @tag BACKENDAJAX.agency.childapplication
	 * @summary 申請單詳細
	 */
	get(
		url: '/backend/agency/childapplication',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_ChildAgencyApplicationDataResponse>;

	/**
	 * @tag BACKENDAJAX.agency.childapplication
	 * @summary 申請二級代理
	 */
	post(url: '/backend/agency/childapplication', options: { body: BACKENDAJAX_CreateChildAgencyApplicationRequest } & IDefaultOptions): Promise<BACKENDAJAX_CreateChildAgencyApplicationResponse>;

	/**
	 * @tag BACKENDAJAX.agency.childapplication
	 * @summary 申請單列表
	 */
	get(
		url: '/backend/agency/childapplication/list',
		options: {
			query: {
				agencyID?: number;
				childAgencyID?: number;
				agencyAccount?: string;
				childAgencyAccount?: string;
				exactlyMatching?: number;
				auditStatus?: number;
				applyStartTime?: string;
				applyEndTime?: string;
				reviewStartTime?: string;
				reviewEndTime?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetChildAgencyApplicationListResponse>;

	/**
	 * @tag BACKENDAJAX.agency.childapplication
	 * @summary 核准
	 */
	put(url: '/backend/agency/childapplication/permit', options: { body: BACKENDAJAX_ChildAgencyApplicationReviewRequest } & IDefaultOptions): Promise<BACKENDAJAX_ChildAgencyApplicationReviewResponse>;

	/**
	 * @tag BACKENDAJAX.agency.childapplication
	 * @summary 拒絕
	 */
	put(url: '/backend/agency/childapplication/deny', options: { body: BACKENDAJAX_ChildAgencyApplicationReviewRequest } & IDefaultOptions): Promise<BACKENDAJAX_ChildAgencyApplicationReviewResponse>;

	/**
	 * @tag BACKENDAJAX.agency.childapplication
	 * @summary 確認代理資料
	 */
	get(
		url: '/backend/agency/childapplication/checkagency',
		options: {
			query: {
				account: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_CheckAgencyResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 公告: 列表
	 */
	get(
		url: '/backend/site/announcement',
		options: {
			query: {
				title?: string;
				hidden?: boolean;
				sort?: string;
				dir?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAnnouncementResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 公告: 新增
	 */
	post(url: '/backend/site/announcement', options: { body: BACKENDAJAX_CreateAnnouncementRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 公告: 刪除
	 */
	delete(
		url: '/backend/site/announcement',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 公告: 修改
	 */
	put(url: '/backend/site/announcement', options: { body: BACKENDAJAX_UpdateAnnouncementRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 公告: 排序
	 */
	post(url: '/backend/site/announcement/sort', options: { body: BACKENDAJAX_SortRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.finance
	 * @summary 04.1前台顯示線路：列表API與篩選
	 */
	get(
		url: '/backend/finance',
		options: {
			query: {
				status?: number;
				maintain?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_FinanceListResponse>;

	/**
	 * @tag BACKENDAJAX.finance
	 * @summary 04.1 前台顯示線路：新增顯示項目API
	 */
	post(url: '/backend/finance/create', options: { body: BACKENDAJAX_GetFinanceInfoRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.finance
	 * @summary 04.1前台顯示線路：加入線路API / 搜尋
	 */
	get(
		url: '/backend/finance/search/channel',
		options: {
			query: {
				financeID: number;
				name?: string;
				status?: number;
				serviceCode?: string;
				method?: number;
				bankGroupID?: number;
				payGroupID?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PayChannelServiceListResponse>;

	/**
	 * @tag BACKENDAJAX.finance
	 * @summary 04.1前台顯示線路：加入線路API / 加入
	 */
	post(url: '/backend/finance/add', options: { body: BACKENDAJAX_GetChannelServiceToFinanceRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.finance
	 * @summary 04.1前台顯示線路：編輯顯示項目API / 取得單一線路資料
	 */
	get(
		url: '/backend/finance/edit',
		options: {
			query: {
				id: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_FinanceListResponseData>;

	/**
	 * @tag BACKENDAJAX.finance
	 * @summary 04.1前台顯示線路：編輯顯示項目API / 儲存單一線路資料
	 */
	put(url: '/backend/finance/edit', options: { body: BACKENDAJAX_GetFinanceUpdateInfoRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.finance
	 * @summary 04.1前台顯示線路：移除線路API
	 */
	delete(
		url: '/backend/finance/delete',
		options: {
			query: {
				financeID: number;
				payChannelServiceID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.finance
	 * @summary 04.1前台顯示線路：刪除前台顯示項目 API
	 */
	delete(
		url: '/backend/finance/finance_delete',
		options: {
			query: {
				financeID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.finance
	 * @summary 將線路重新排序
	 */
	put(url: '/backend/finance/sort', options: { body: BACKENDAJAX_GetRearrangementRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.agency.announcement
	 * @summary 代理公告列表
	 */
	get(
		url: '/backend/agency/announcement/list',
		options: {
			query: {
				periodBeginning: string;
				periodEnd: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyAnnouncementResponse>;

	/**
	 * @tag BACKENDAJAX.agency.announcement
	 * @summary 新增代理公告
	 */
	post(url: '/backend/agency/announcement/new', options: { body: BACKENDAJAX_CreateAgencyAnnouncementRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.agency.announcement
	 * @summary 修改代理公告
	 */
	put(url: '/backend/agency/announcement/edit', options: { body: BACKENDAJAX_UpdateAgencyAnnouncementRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.agency.application
	 * @summary 取得代理申請列表
	 */
	get(
		url: '/backend/agency/application/list',
		options: {
			query: {
				isFuzzy?: boolean;
				auditStatus?: number;
				id?: string;
				agencyAccount?: string;
				memberAccount?: string;
				applicationStartTime?: string;
				applicationEndTime?: string;
				reviewStartTime?: string;
				reviewEndTime?: string;
				pageSize?: number;
				page?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyApplicationsByAdditionResponse>;

	/**
	 * @tag BACKENDAJAX.agency.application
	 * @summary 取得代理申請詳細
	 */
	get(
		url: '/backend/agency/application',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyApplicationResponse>;

	/**
	 * @tag BACKENDAJAX.agency.application
	 * @summary 修改申請內容
	 */
	put(url: '/backend/agency/application', options: { body: BACKENDAJAX_SetAgencyApplicationAuditStatusRequest } & IDefaultOptions): Promise<BACKENDAJAX_SetAgencyApplicationAuditStatusResponse>;

	/**
	 * @tag BACKENDAJAX.sms
	 * @summary 發送記錄
	 */
	get(url: '/backend/sms/log', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetSmsSendLogResponse>;

	/**
	 * @tag BACKENDAJAX.sms
	 * @summary 短信商管理
	 */
	get(url: '/backend/sms/vendor', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetSmsVendorListResponse>;

	/**
	 * @tag BACKENDAJAX.sms
	 * @summary 短信商啟用
	 */
	put(url: '/backend/sms/vendor', options: { body: BACKENDAJAX_UpdateSmsVendorRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.sms
	 * @summary 發送訊息
	 */
	get(url: '/backend/sms/send', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.game.gamegroup
	 * @summary 取得遊戲廠商與遊戲類型
	 */
	get(url: '/backend/game/gamegroup/getgamegroupcategorizedbygametype', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetGameGroupCategorizedByGameTypeResponse>;

	/**
	 * @tag BACKENDAJAX.game.gamegroup
	 * @summary 取得遊戲廠商
	 */
	get(
		url: '/backend/game/gamegroup',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GameGroupDataResponse>;

	/**
	 * @tag BACKENDAJAX.game.gamegroup
	 * @summary 修改遊戲廠商
	 */
	put(url: '/backend/game/gamegroup', options: { body: BACKENDAJAX_UpdateGameGroupRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.game.gamegroup
	 * @summary 取得遊戲廠商list
	 */
	get(
		url: '/backend/game/gamegroup/list',
		options: {
			query: {
				name?: string;
				displayName?: string;
				gameAgencyID?: number;
				walletType?: number;
				gameTypeID?: number;
				currencyType?: string;
				status?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetGameGroupListResponse>;

	/**
	 * @tag BACKENDAJAX.game.gamegroup
	 * @summary 修改遊戲廠商狀態
	 */
	put(url: '/backend/game/gamegroup/updatestatus', options: { body: BACKENDAJAX_UpdateGameGroupRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.game.gamegroup
	 * @summary 取得廠商KV，給下拉選單用
	 */
	get(url: '/backend/game/gamegroup/all', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GameGroupListResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel_name
	 * @summary 商戶管理: 商戶列表
	 */
	get(url: '/backend/pay/pay_channel_name', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetPayChannelNameResponse>;

	/**
	 * @tag BACKENDAJAX.pay.pay_channel_name
	 * @summary 商戶管理: 新增商戶
	 */
	post(url: '/backend/pay/pay_channel_name', options: { body: BACKENDAJAX_CreatePayChannelNameRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.member.node
	 * @summary 會員換線
	 */
	post(url: '/backend/member/node', options: { body: BACKENDAJAX_CreateMemberNodeLogRequest } & IDefaultOptions): Promise<BACKENDAJAX_CreateMemberNodeLogResponse>;

	/**
	 * @tag BACKENDAJAX.member.node
	 * @summary 確認會員資料
	 */
	get(
		url: '/backend/member/node/checkmember',
		options: {
			query: {
				account: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_MemberNodeMemberDetailResponse>;

	/**
	 * @tag BACKENDAJAX.member.node
	 * @summary 確認代理資料
	 */
	get(
		url: '/backend/member/node/checkagency',
		options: {
			query: {
				account: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_MemberNodeAgencyDetailResponse>;

	/**
	 * @tag BACKENDAJAX.member.node
	 * @summary 取得會員換線列表
	 */
	get(
		url: '/backend/member/node/list',
		options: {
			query: {
				memberID?: number;
				agencyID?: number;
				agencyAccount?: string;
				exactlyMatching?: number;
				startTime?: string;
				endTime?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_MemberNodeLogListResponse>;

	/**
	 * @tag BACKENDAJAX.report.channel
	 * @summary 取得進款統計報表
	 */
	get(
		url: '/backend/report/channel/deposit',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
				reportHourStart?: number;
				reportHourEnd?: number;
				serviceCode?: string;
				payChannelServiceID?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_ChannelDepositSummaryMapResponse>;

	/**
	 * @tag BACKENDAJAX.report.channel
	 * @summary 重算進款統計報表: 若未指定reportHour，會重算一整天的時段
	 */
	post(url: '/backend/report/channel/deposit', options: { body: BACKENDAJAX_CreateChannelDepositReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.channel
	 * @summary 取得單一線路進款表
	 */
	get(
		url: '/backend/report/channel/single_channel_deposit',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
				reportHourStart?: number;
				reportHourEnd?: number;
				serviceCode?: string;
				payChannelServiceID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_ChannelDepositSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.channel
	 * @summary 變更單一線路進款表備註
	 */
	put(url: '/backend/report/channel/single_channel_deposit_note', options: { body: BACKENDAJAX_UpdateSingleChannelDepositReportNoteRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.channel
	 * @summary 取得商戶號每日對帳表
	 */
	get(
		url: '/backend/report/channel/day_reconciliation',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
				reportHourStart?: number;
				reportHourEnd?: number;
				serviceCode?: string;
				payChannelNameID?: number;
				payChannelName?: string;
				payChannelID?: number;
				payChannelSn?: string;
				balanceDiff?: number;
				balanceChange?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_ChannelReconciliationReportResponse>;

	/**
	 * @tag BACKENDAJAX.report.channel
	 * @summary 重算商戶號每日對帳表
	 */
	post(url: '/backend/report/channel/day_reconciliation', options: { body: BACKENDAJAX_CreateDateReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.channel
	 * @summary 變更商戶號每日對帳表備註
	 */
	put(url: '/backend/report/channel/day_reconciliation', options: { body: BACKENDAJAX_UpdateReportNoteRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.channel
	 * @summary 取得三方整點對帳表
	 */
	get(
		url: '/backend/report/channel/hour_reconciliation',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
				reportHourStart: number;
				reportHourEnd: number;
				serviceCode?: string;
				payChannelNameID?: number;
				payChannelName?: string;
				payChannelID?: number;
				payChannelSn?: string;
				balanceDiff?: number;
				balanceChange?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_ChannelReconciliationReportMapResponse>;

	/**
	 * @tag BACKENDAJAX.report.channel
	 * @summary 重算三方整點對帳表: 若未指定reportHour，會重算一整天的時段
	 */
	post(url: '/backend/report/channel/hour_reconciliation', options: { body: BACKENDAJAX_CreateDateHourReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.channel
	 * @summary 變更三方整點對帳表備註
	 */
	put(url: '/backend/report/channel/hour_reconciliation', options: { body: BACKENDAJAX_UpdateReportNoteRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.game.gameagency
	 * @summary 取得遊戲代理商
	 */
	get(
		url: '/backend/game/gameagency',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetGameAgencyResponse>;

	/**
	 * @tag BACKENDAJAX.game.gameagency
	 * @summary 修改代理商
	 */
	put(url: '/backend/game/gameagency', options: { body: BACKENDAJAX_UpdateGameAgencyRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.game.gameagency
	 * @summary 取得遊戲代理商列表
	 */
	get(
		url: '/backend/game/gameagency/list',
		options: {
			query: {
				name?: string;
				gameTypeID?: number;
				status?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetGameAgencyListResponse>;

	/**
	 * @tag BACKENDAJAX.game.gameagency
	 * @summary 取得代理商選單
	 */
	get(url: '/backend/game/gameagency/all', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetAgencyOptionsResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.member
	 * @summary 優惠:批次派發列表
	 */
	get(
		url: '/backend/promotion/member',
		options: {
			query: {
				promotionID?: number;
				promotionName?: string;
				batchID?: number;
				memberID?: number;
				memberAccount?: string;
				status?: number;
				sendAtStart?: string;
				sendAtEnd?: string;
				approveWay?: number;
				receiveWay?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PromotionMemberBatchListResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.member
	 * @summary 優惠:申請清單
	 */
	get(
		url: '/backend/promotion/member/list',
		options: {
			query: {
				promotionID?: number;
				promotionName?: string;
				batchID?: number;
				memberID?: number;
				memberAccount?: string;
				status?: number;
				sendAtStart?: string;
				sendAtEnd?: string;
				approveWay?: number;
				receiveWay?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PromotionMemberListResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.member
	 * @summary 優惠:提供會員在指定時間內領取的優惠資訊
	 */
	get(
		url: '/backend/promotion/member/withdrw',
		options: {
			query: {
				memberID: number;
				startTime: string;
				endTime: string;
				promotionCondType?: number;
				status?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PromotionForWithdrawResponse>;

	/**
	 * @tag BACKENDAJAX.game.gamelist
	 * @summary 取得遊戲
	 */
	get(
		url: '/backend/game/gamelist',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GameListDataResponse>;

	/**
	 * @tag BACKENDAJAX.game.gamelist
	 * @summary 建立遊戲
	 */
	post(url: '/backend/game/gamelist', options: { body: BACKENDAJAX_CreateGameListRequest } & IDefaultOptions): Promise<BACKENDAJAX_CreateGameListResponse>;

	/**
	 * @tag BACKENDAJAX.game.gamelist
	 * @summary 修改遊戲
	 */
	put(url: '/backend/game/gamelist', options: { body: BACKENDAJAX_UpdateGameListRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.game.gamelist
	 * @summary 取得遊戲list
	 */
	get(
		url: '/backend/game/gamelist/list',
		options: {
			query: {
				gameGroupID?: number;
				gameTypeID?: number;
				name?: string;
				displayName?: string;
				status?: number;
				trialPlay?: number;
				isSpecial?: number;
				isSlot?: number;
				order?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetGameListResponse>;

	/**
	 * @tag BACKENDAJAX.game.gamelist
	 * @summary 取得遊戲類型
	 */
	get(url: '/backend/game/gamelist/type', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GameTypeListResponse>;

	/**
	 * @tag BACKENDAJAX.member.tag
	 * @summary 取得會員標籤群組
	 */
	get(url: '/backend/member/tag/groups', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetMemberTagGroupResponse>;

	/**
	 * @tag BACKENDAJAX.member.tag
	 * @summary 新增會員標籤群組
	 */
	post(url: '/backend/member/tag/group', options: { body: BACKENDAJAX_CreateMemberTagGroupRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member.tag
	 * @summary 編輯會員標籤群組
	 */
	put(url: '/backend/member/tag/group', options: { body: BACKENDAJAX_UpdateMemberTagGroupRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member.tag
	 * @summary 取得會員標籤
	 */
	get(url: '/backend/member/tag/tags', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetMemberTagResponse>;

	/**
	 * @tag BACKENDAJAX.member.tag
	 * @summary 新增會員標籤
	 */
	post(url: '/backend/member/tag/tag', options: { body: BACKENDAJAX_CreateMemberTagRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member.tag
	 * @summary 編輯會員標籤
	 */
	put(url: '/backend/member/tag/tag', options: { body: BACKENDAJAX_UpdateMemberTagRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.agencyWallet.manualOperation
	 * @summary 檢查代理錢包資料
	 */
	get(
		url: '/backend/agencywallet/manualoperation/checkagencywallet',
		options: {
			query: {
				agencyID?: number;
				agencyAccount?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_CheckAgencyWalletResponse>;

	/**
	 * @tag BACKENDAJAX.agencyWallet.manualOperation
	 * @summary 取得代理詳細
	 */
	get(
		url: '/backend/agencywallet/manualoperation',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyWalletManualOperationListDetailData>;

	/**
	 * @tag BACKENDAJAX.agencyWallet.manualOperation
	 * @summary 建立代理手動上下分申請單
	 */
	post(
		url: '/backend/agencywallet/manualoperation',
		options: { body: BACKENDAJAX_CreateAgencyWalletManualOperationRequest } & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyWalletManualOperationResponse>;

	/**
	 * @tag BACKENDAJAX.agencyWallet.manualOperation
	 * @summary 核准
	 */
	put(
		url: '/backend/agencywallet/manualoperation/permit',
		options: { body: BACKENDAJAX_AgencyWalletManualOperationPermitRequest } & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyWalletManualOperationResponse>;

	/**
	 * @tag BACKENDAJAX.agencyWallet.manualOperation
	 * @summary 拒絕
	 */
	put(
		url: '/backend/agencywallet/manualoperation/deny',
		options: { body: BACKENDAJAX_AgencyWalletManualOperationPermitRequest } & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyWalletManualOperationResponse>;

	/**
	 * @tag BACKENDAJAX.agencyWallet.manualOperation
	 * @summary 取得代理列表
	 */
	get(
		url: '/backend/agencywallet/manualoperation/list',
		options: {
			query: {
				agencyID?: number;
				agencyAccount?: string;
				exactlyMatching?: number;
				type?: number;
				status?: number;
				applyStartTime?: string;
				applyEndTime?: string;
				reviewStartTime?: string;
				reviewEndTime?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_AgencyWalletManualOperationListResponse>;

	/**
	 * @tag BACKENDAJAX.pay_channel_service
	 * @summary 線路管理（代收）:新增線路API
	 */
	post(url: '/backend/pay_channel_service/create', options: { body: BACKENDAJAX_PayChannelServiceCreateRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay_channel_service
	 * @summary 線路管理（代收）:線路列表API
	 */
	get(
		url: '/backend/pay_channel_service',
		options: {
			query: {
				name?: string;
				status?: number;
				serviceCode?: string;
				bankGroupID?: number;
				thirdGroupID?: number;
				payChannelID?: number;
				payChannelNameID?: number;
				method?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PayChannelServiceListResponse>;

	/**
	 * @tag BACKENDAJAX.pay_channel_service
	 * @summary 線路管理（代收）:查看列表API
	 */
	get(
		url: '/backend/pay_channel_service/edit',
		options: {
			query: {
				id: number;
				type?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PayChannelServiceListResponseData>;

	/**
	 * @tag BACKENDAJAX.pay_channel_service
	 * @summary 線路管理（代收）:編輯列表API
	 */
	put(url: '/backend/pay_channel_service/edit', options: { body: BACKENDAJAX_GetPayChannelServiceEditRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay_channel_service
	 * @summary 取得搜尋下拉清單
	 */
	get(url: '/backend/pay_channel_service/dropdown', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetPayChannelSearchDropdownResponse>;

	/**
	 * @tag BACKENDAJAX.pay_channel_service
	 * @summary 取得不包含指定線路的群組
	 */
	get(
		url: '/backend/pay_channel_service/groups/exclude',
		options: {
			query: {
				id: number;
				type?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PayGroupListResponseData>;

	/**
	 * @tag BACKENDAJAX.pay_channel_service
	 * @summary 將線路儲存到指定的金流群組
	 */
	put(url: '/backend/pay_channel_service/groups', options: { body: BACKENDAJAX_GetPayChannelGroupIDsRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay_channel_service
	 * @summary 將線路重新排序
	 */
	put(url: '/backend/pay_channel_service/sort', options: { body: BACKENDAJAX_GetRearrangementRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 取得日存款報表，以金額區間統計
	 */
	get(
		url: '/backend/report/deposit/amount_range_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
				serviceCode?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_DepositAmountSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 重算日存款報表，以金額區間統計
	 */
	post(url: '/backend/report/deposit/amount_range_report', options: { body: BACKENDAJAX_CreateDepositAmountReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 取得週存款報表，以人數統計
	 */
	get(
		url: '/backend/report/deposit/amount_range_week_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
				serviceCode?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_DepositAmountSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 重算週存款報表，以金額區間統計。reportDate 必須是週一日期
	 */
	post(url: '/backend/report/deposit/amount_range_week_report', options: { body: BACKENDAJAX_CreateDepositAmountReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 取得月存款報表，以人數統計
	 */
	get(
		url: '/backend/report/deposit/amount_range_month_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
				serviceCode?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_DepositAmountSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.deposit
	 * @summary 重算月存款報表，以金額區間統計。reportDate 必須是1號日期
	 */
	post(url: '/backend/report/deposit/amount_range_month_report', options: { body: BACKENDAJAX_CreateDepositAmountReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 取得日提款報表，以金額區間統計
	 */
	get(
		url: '/backend/report/withdraw/amount_range_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_WithdrawAmountSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 重算日提款報表，以金額區間統計
	 */
	post(url: '/backend/report/withdraw/amount_range_report', options: { body: BACKENDAJAX_CreateWithdrawAmountReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 取得週提款報表，以人數統計
	 */
	get(
		url: '/backend/report/withdraw/amount_range_week_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_WithdrawAmountSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 重算週提款報表，以金額區間統計。reportDate 必須是週一日期
	 */
	post(url: '/backend/report/withdraw/amount_range_week_report', options: { body: BACKENDAJAX_CreateWithdrawAmountReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 取得月提款報表，以人數統計
	 */
	get(
		url: '/backend/report/withdraw/amount_range_month_report',
		options: {
			query: {
				reportDateStart: string;
				reportDateEnd: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_WithdrawAmountSummaryResponse>;

	/**
	 * @tag BACKENDAJAX.report.withdraw
	 * @summary 重算月提款報表，以金額區間統計。reportDate 必須是1號日期
	 */
	post(url: '/backend/report/withdraw/amount_range_month_report', options: { body: BACKENDAJAX_CreateWithdrawAmountReportRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.cond
	 * @summary 優惠：取得單一優惠模板
	 */
	get(
		url: '/backend/promotion/cond',
		options: {
			query: {
				ID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PromotionCondListResponseData>;

	/**
	 * @tag BACKENDAJAX.promotion.cond
	 * @summary 優惠：新增優惠模板API
	 */
	post(url: '/backend/promotion/cond', options: { body: BACKENDAJAX_PromotionCondCreateRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.cond
	 * @summary 優惠：刪除優惠單一模板
	 */
	delete(
		url: '/backend/promotion/cond',
		options: {
			query: {
				ID: number;
				otp: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.cond
	 * @summary 優惠：修改優惠模板API
	 */
	put(url: '/backend/promotion/cond', options: { body: BACKENDAJAX_PromotionCondSaveRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.cond
	 * @summary 優惠：優惠模板列表
	 */
	get(
		url: '/backend/promotion/cond/list',
		options: {
			query: {
				promotionID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PromotionCondListResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.cond
	 * @summary 優惠：刪除指定優惠與類型的多個模板
	 */
	delete(
		url: '/backend/promotion/cond/conds',
		options: {
			query: {
				promotionID: number;
				type: number;
				otp?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.adjustment
	 * @summary 手動上下分列表
	 */
	get(
		url: '/backend/adjustment/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAdjustmentListResponse>;

	/**
	 * @tag BACKENDAJAX.adjustment
	 * @summary 建立手動上下分申請單
	 */
	post(url: '/backend/adjustment/create', options: { body: BACKENDAJAX_CreateAdjustmentRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.adjustment
	 * @summary 審核會員
	 */
	put(url: '/backend/adjustment/verify', options: { body: BACKENDAJAX_VerifyAdjustmentRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.adjustment
	 * @summary 修改手動調整單
	 */
	put(url: '/backend/adjustment/update', options: { body: BACKENDAJAX_UpdateAdjustmentRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.adjustment
	 * @summary 刪除手動調整單
	 */
	delete(
		url: '/backend/adjustment/delete',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.adjustment
	 * @summary 手動上下分會員申請清單
	 */
	get(
		url: '/backend/adjustment/search',
		options: {
			query: {
				memberName?: string;
				reason?: number;
				status?: number;
				transactionID?: string;
				updateUser?: string;
				verifyDateStart?: string;
				verifyDateEnd?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SearchMemberAdjustmentResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得會員備註
	 */
	get(
		url: '/backend/member/comments',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetMemberCommentResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 批次新增會員備註
	 */
	post(url: '/backend/member/comments', options: { body: BACKENDAJAX_BatchCreateMemberCommentRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得會員簡易備註
	 */
	get(
		url: '/backend/member/comments/brief',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetMemberCommentResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 新增會員備註
	 */
	post(url: '/backend/member/comment', options: { body: BACKENDAJAX_CreateMemberCommentRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 編輯會員備註
	 */
	put(url: '/backend/member/comment', options: { body: BACKENDAJAX_UpdateMemberCommentRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.function
	 * @summary 新建群組功能
	 */
	post(url: '/backend/admin/function/function', options: { body: BACKENDAJAX_CreateAdminFunctionInfoRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.function
	 * @summary 刪除群組功能內容
	 */
	delete(
		url: '/backend/admin/function/function',
		options: {
			query: {
				fnID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.function
	 * @summary 修改群組功能內容
	 */
	put(url: '/backend/admin/function/function', options: { body: BACKENDAJAX_SetAdminFunctionInfoRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.function
	 * @summary 取得已設定群組功能列表
	 */
	get(
		url: '/backend/admin/function/functions',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				fnID?: number;
				fnName?: string;
				fnKey?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetFunctionsResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理：列表與篩選API
	 */
	get(
		url: '/backend/withdrawal',
		options: {
			query: {
				source?: number;
				withdrawalStart?: string;
				withdrawalEnd?: string;
				memberAccount?: string;
				memberID?: number;
				orderSn?: string;
				status?: number;
				withdrawalName?: string;
				bankName?: string;
				bankcardNo?: number;
				updatedStart?: string;
				updatedEnd?: string;
				riskCheck?: string;
				financialCheck?: string;
				bankcardGroupID?: number;
				thirdGroupID?: number;
				creditDate?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetWithdrawalIndexResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理：手動新增提款單
	 */
	post(url: '/backend/withdrawal', options: { body: BACKENDAJAX_CreateWithdrawalRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理：取得審核詳細資料-會員提款
	 */
	get(
		url: '/backend/withdrawal/member/info',
		options: {
			query: {
				id: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetMemberWithdrawalInfoResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理: 提款審核單流水資料
	 */
	get(
		url: '/backend/withdrawal/betting',
		options: {
			query: {
				id: number;
				startTime: string;
				endTime: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetWithdrawalBettingLogResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理：取得審核詳細資料-代理提款
	 */
	get(
		url: '/backend/withdrawal/agency/info',
		options: {
			query: {
				id: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyWithdrawalInfoResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 05.2提款管理：財務提單審核通過 API
	 */
	put(url: '/backend/withdrawal/finance/pass', options: { body: BACKENDAJAX_GetWithdrawalFinanceCheckRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 05.2提款管理：財務提單審核通過並提交風控 API
	 */
	put(url: '/backend/withdrawal/finance/submitrisk', options: { body: BACKENDAJAX_GetWithdrawalFinanceCheckRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 05.2提款管理：財務退回 API
	 */
	put(url: '/backend/withdrawal/finance/reject', options: { body: BACKENDAJAX_GetWithdrawalFinanceCheckRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 05.2提款管理：風控審核 API
	 */
	put(url: '/backend/withdrawal/risk/check', options: { body: BACKENDAJAX_GetWithdrawalRiskCheckRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 05.2提款管理：手動出款API
	 */
	get(
		url: '/backend/withdrawal/payout/info',
		options: {
			query: {
				orderSn: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetWithdrawalPayoutResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理: 查看訂單紀錄
	 */
	get(
		url: '/backend/withdrawal/note',
		options: {
			query: {
				id: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetPayNoteResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理: 新增訂單備註
	 */
	post(url: '/backend/withdrawal/note', options: { body: BACKENDAJAX_CreateNoteRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理: 查詢三方回調狀態
	 */
	post(url: '/backend/withdrawal/callback', options: { body: BACKENDAJAX_StringIDRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理: 可出款方式列表
	 */
	get(url: '/backend/withdrawal/list', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetPayoutMethodResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理: 手動出款
	 */
	post(url: '/backend/withdrawal/pay', options: { body: BACKENDAJAX_PayRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理: 財務進入審核
	 */
	post(url: '/backend/withdrawal/audit', options: { body: BACKENDAJAX_StringIDRequest } & IDefaultOptions): Promise<BACKENDAJAX_AuditResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理: 取得出款面板
	 */
	get(url: '/backend/withdrawal/payout/navi', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetPayingNaviResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理: 出款面板排序
	 */
	put(url: '/backend/withdrawal/payout/navi/sort', options: { body: BACKENDAJAX_SortRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理: 出款面板狀態開關
	 */
	put(url: '/backend/withdrawal/payout/navi/status', options: { body: BACKENDAJAX_setStatusRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.withdrawal
	 * @summary 提款管理: 快速出款
	 */
	post(url: '/backend/withdrawal/payout/quick', options: { body: BACKENDAJAX_StringIDRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.authLogs
	 * @summary 取得後台權限管理的操作紀錄
	 */
	get(
		url: '/backend/authlogs/logs',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				account?: string;
				startDate?: string;
				endDate?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAuthLogsResponse>;

	/**
	 * @tag BACKENDAJAX.domain
	 * @summary create domain
	 */
	post(url: '/backend/domain/domain', options: { body: BACKENDAJAX_CreateDomainRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.domain
	 * @summary update domain
	 */
	put(url: '/backend/domain/domain', options: { body: BACKENDAJAX_UpdateDomainRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.domain
	 * @summary create domainGroup
	 */
	post(url: '/backend/domain/group', options: { body: BACKENDAJAX_CreateDomainGroupRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.domain
	 * @summary update domain
	 */
	put(url: '/backend/domain/group', options: { body: BACKENDAJAX_UpdateDomainGroupRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.domain
	 * @summary domain list
	 */
	get(url: '/backend/domain/list', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetDomainListResponse>;

	/**
	 * @tag BACKENDAJAX.domain
	 * @summary 產生域名列表json檔案
	 */
	post(url: '/backend/domain/json', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetDomainJsonResponse>;

	/**
	 * @tag BACKENDAJAX.bettinglog
	 * @summary 流水總覽
	 */
	get(
		url: '/backend/bettinglog/search',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				memberAccount?: string;
				gameListID?: number;
				gameTypeID?: number;
				betTimeStart?: string;
				betTimeEnd?: string;
				settlementTimeStart?: string;
				settlementTimeEnd?: string;
				betLogStatus?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetBettingLogResponse>;

	/**
	 * @tag BACKENDAJAX.bettinglog
	 * @summary 流水詳情
	 */
	get(
		url: '/backend/bettinglog/search/summery',
		options: {
			query: {
				memberID: number;
				settlementTimeStart?: string;
				settlementTimeEnd?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetStakeDetailResponse>;

	/**
	 * @tag BACKENDAJAX.bettinglog
	 * @summary zanderTest1取得流水
	 */
	get(
		url: '/backend/bettinglog/test',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				memberID: number;
				gameListID: number;
				betTimeStart?: string;
				betTimeEnd?: string;
				settlementTimeStart?: string;
				settlementTimeEnd?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetBettingLogTestIResponse>;

	/**
	 * @tag BACKENDAJAX.bettinglog
	 * @summary 加入流水zanderTest2
	 */
	post(url: '/backend/bettinglog/test', options: { body: BACKENDAJAX_GetBettingLogTestIIRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.role
	 * @summary 取得群組 id 有哪些對應的功能
	 */
	get(
		url: '/backend/admin/role/roles',
		options: {
			query: {
				roleID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetRoleFnsResponse>;

	/**
	 * @tag BACKENDAJAX.admin.role
	 * @summary 指定群組 id 到對應的功能 id
	 */
	put(url: '/backend/admin/role/fns', options: { body: BACKENDAJAX_SetRoleFnsRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.role
	 * @summary 建立後台群組
	 */
	post(url: '/backend/admin/role/adminrole', options: { body: BACKENDAJAX_CreateAdminRoleInfoRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.role
	 * @summary 取得後台群組列表
	 */
	get(
		url: '/backend/admin/role/adminroles',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				roleName?: string;
				note?: string;
				status?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAdminRolesResponse>;

	/**
	 * @tag BACKENDAJAX.admin.role
	 * @summary 修改群組名稱、啟用狀態、備註
	 */
	put(url: '/backend/admin/role/adminroleinfo', options: { body: BACKENDAJAX_SetAdminRoleInfoRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.role
	 * @summary 取得群組成員列表
	 */
	get(
		url: '/backend/admin/role/adminusers',
		options: {
			query: {
				roleID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAdminUsersByRoleIDResponse>;

	/**
	 * @tag BACKENDAJAX.admin.role
	 * @summary 修改指定登入者的群組列表(綁定使用者到群組 多個使用者對一個群組)
	 */
	put(url: '/backend/admin/role/adminusers', options: { body: BACKENDAJAX_SetAdminRoleUsersRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.role
	 * @summary 刪除指定登入者的群組列表
	 */
	delete(
		url: '/backend/admin/role/adminuser',
		options: {
			query: {
				adminID: number;
				roleID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.role
	 * @summary 修改指定登入者的群組列表(綁定群組與使用者 一對一關係)
	 */
	put(url: '/backend/admin/role/adminuser', options: { body: BACKENDAJAX_SetAdminRoleUserRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.agency.commission
	 * @summary 取得指定月份的一代佣金列表
	 */
	get(
		url: '/backend/agency/commission/list',
		options: {
			query: {
				date: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyCommissionResponse>;

	/**
	 * @tag BACKENDAJAX.agency.commission
	 * @summary 取得指定月份的二代佣金列表
	 */
	get(
		url: '/backend/agency/commission/childlist',
		options: {
			query: {
				date: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAgencyCommissionChildResponse>;

	/**
	 * @tag BACKENDAJAX.agency.commission
	 * @summary 審核佣金
	 */
	put(url: '/backend/agency/commission/review', options: { body: BACKENDAJAX_ReviewAgencyCommissionRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.agency.commission
	 * @summary 審核二代佣金
	 */
	put(url: '/backend/agency/commission/childreview', options: { body: BACKENDAJAX_ReviewAgencyCommissionRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 廣告分類: 列表
	 */
	get(
		url: '/backend/site/banner/category',
		options: {
			query: {
				sort?: string;
				dir?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetBannerCategoryResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 廣告分類: 新增
	 */
	post(url: '/backend/site/banner/category', options: { body: BACKENDAJAX_CreateBannerCategoryRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 廣告分類: 編輯
	 */
	put(url: '/backend/site/banner/category', options: { body: BACKENDAJAX_UpdateBannerCategoryRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 廣告: 列表
	 */
	get(
		url: '/backend/site/banner',
		options: {
			query: {
				title?: string;
				bannerCategoryID?: number;
				device?: number;
				hidden?: boolean;
				statusSearch?: number;
				start?: string;
				sort?: string;
				dir?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetBannerResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 廣告: 新增
	 */
	post(url: '/backend/site/banner', options: { body: BACKENDAJAX_CreateBannerRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 廣告: 刪除
	 */
	delete(
		url: '/backend/site/banner',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 廣告: 修改
	 */
	put(url: '/backend/site/banner', options: { body: BACKENDAJAX_UpdateBannerRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 廣告: 排序
	 */
	post(url: '/backend/site/banner/sort', options: { body: BACKENDAJAX_SortRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.site
	 * @summary 廣告分類: 下拉選單
	 */
	get(url: '/backend/site/banner/dropdown', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetBannerDropdownResponse>;

	/**
	 * @tag BACKENDAJAX.promotion.log
	 * @summary 優惠列表：操作記錄
	 */
	get(
		url: '/backend/promotion/log/list',
		options: {
			query: {
				ID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PromotionLogsResponse>;

	/**
	 * @tag BACKENDAJAX.pay_group
	 * @summary 金流組別（三方）：取得單一組別
	 */
	get(
		url: '/backend/pay_group/group',
		options: {
			query: {
				ID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PayGroupListResponseData>;

	/**
	 * @tag BACKENDAJAX.pay_group
	 * @summary 金流組別（三方）：新增金流組別API
	 */
	post(url: '/backend/pay_group/group', options: { body: BACKENDAJAX_PayGroupCreateRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay_group
	 * @summary 金流組別（三方）：修改金流組別API
	 */
	put(url: '/backend/pay_group/group', options: { body: BACKENDAJAX_PayGroupSaveRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay_group
	 * @summary 金流組別（三方）:金流組別列表API
	 */
	get(
		url: '/backend/pay_group/groups',
		options: {
			query: {
				type: number;
				name?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PayGroupListResponse>;

	/**
	 * @tag BACKENDAJAX.pay_group
	 * @summary 金流組別（三方）：加入玩家
	 */
	post(url: '/backend/pay_group/member', options: { body: BACKENDAJAX_PayGroupMemberCreateRequest } & IDefaultOptions): Promise<BACKENDAJAX_mixed>;

	/**
	 * @tag BACKENDAJAX.notification
	 * @summary 取得通知設定
	 */
	get(url: '/backend/notification', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetNotificationResponse>;

	/**
	 * @tag BACKENDAJAX.notification
	 * @summary 建立通知設定
	 */
	post(url: '/backend/notification', options: { body: BACKENDAJAX_CreateNotificationRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.notification
	 * @summary 刪除通知設定
	 */
	delete(
		url: '/backend/notification',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.notification
	 * @summary 取得事件類型
	 */
	get(url: '/backend/notification/events', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetNotificationEventTypeResponse>;

	/**
	 * @tag BACKENDAJAX.pay.usdt
	 * @summary U帳戶管理: 列表API
	 */
	get(
		url: '/backend/pay/usdt',
		options: {
			query: {
				name?: string;
				useType?: number;
				type?: number;
				status?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetUSDTListResponse>;

	/**
	 * @tag BACKENDAJAX.pay.usdt
	 * @summary U帳戶管理: 新增帳戶 API
	 */
	post(url: '/backend/pay/usdt', options: { body: BACKENDAJAX_CreateUSDTRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.usdt
	 * @summary U帳戶管理: 編輯帳戶 API
	 */
	put(url: '/backend/pay/usdt', options: { body: BACKENDAJAX_UpdateUSDTRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.usdt
	 * @summary U帳戶管理: 帳務明細 API
	 */
	get(
		url: '/backend/pay/usdt/log',
		options: {
			query: {
				createdAtStart: string;
				createdAtEnd: string;
				usdtID?: number;
				dir?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetUSDTLogResponse>;

	/**
	 * @tag BACKENDAJAX.pay.usdt
	 * @summary U帳戶管理: 修改帳務明細備註
	 */
	put(url: '/backend/pay/usdt/log/note', options: { body: BACKENDAJAX_CreateNoteRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.usdt
	 * @summary U帳戶管理: 出帳
	 */
	post(url: '/backend/pay/usdt/money/out', options: { body: BACKENDAJAX_USDTMoneyChangeRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.pay.usdt
	 * @summary U帳戶管理: 入帳
	 */
	post(url: '/backend/pay/usdt/money/in', options: { body: BACKENDAJAX_USDTMoneyChangeRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 後台登入 default login account admin00/1234qwer 有需要的話記得修改哦
	 */
	post(url: '/backend/admin/user/login', options: { body: BACKENDAJAX_BackendLoginRequest } & IDefaultOptions): Promise<BACKENDAJAX_BackendLoginResponse>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 重新取得登入者的群組列表
	 */
	get(
		url: '/backend/admin/user/roles',
		options: {
			query: {
				adminID?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetRoleResponse>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 取得登入者的可用權限功能
	 */
	get(
		url: '/backend/admin/user/fns',
		options: {
			query: {
				adminID?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAdminFunctionsResponseData>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 取得指定後台帳號 adminID 資訊
	 */
	get(
		url: '/backend/admin/user/admin',
		options: {
			query: {
				adminID?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_AdminUserResponseData>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 建立後台帳號
	 */
	post(url: '/backend/admin/user/admin', options: { body: BACKENDAJAX_CreateAdminUserRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 設定後台帳號啟用狀態
	 */
	put(url: '/backend/admin/user/status', options: { body: BACKENDAJAX_SetAdminUserStatusRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 設定後台帳號備註說明
	 */
	put(url: '/backend/admin/user/note', options: { body: BACKENDAJAX_SetAdminUserNoteRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 管理員強制修改後台使用者密碼
	 */
	put(url: '/backend/admin/user/resetpassword', options: { body: BACKENDAJAX_SetAdminUserPasswordRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 修改自己的後台使用者密碼
	 */
	put(url: '/backend/admin/user/updatepassword', options: { body: BACKENDAJAX_ResetAdminUserPasswordRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 修改指定後台帳號 adminID 內容
	 */
	put(url: '/backend/admin/user/info', options: { body: BACKENDAJAX_SetAdminUserInfoRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 取得後台 admin user 列表
	 */
	get(
		url: '/backend/admin/user/admins',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				adminID?: number;
				account?: string;
				deptID?: number;
				title?: string;
				roleID?: number;
				status?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetAdminUsersResponse>;

	/**
	 * @tag BACKENDAJAX.admin.user
	 * @summary 取得已設定的部門列表
	 */
	get(url: '/backend/admin/user/depts', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_AdminDeptsResponse>;

	/**
	 * @tag BACKENDAJAX.promotion
	 * @summary 優惠:下拉選單
	 */
	get(url: '/backend/promotion/dropdown', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_PromotionDropdownResponse>;

	/**
	 * @tag BACKENDAJAX.promotion
	 * @summary 優惠：取得單一優惠
	 */
	get(
		url: '/backend/promotion',
		options: {
			query: {
				ID: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PromotionListResponseData>;

	/**
	 * @tag BACKENDAJAX.promotion
	 * @summary 優惠：新增優惠
	 */
	post(url: '/backend/promotion', options: { body: BACKENDAJAX_PromotionCreateRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.promotion
	 * @summary 優惠：刪除優惠
	 */
	delete(
		url: '/backend/promotion',
		options: {
			query: {
				ID: number;
				otp: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.promotion
	 * @summary 優惠：修改優惠
	 */
	put(url: '/backend/promotion', options: { body: BACKENDAJAX_PromotionSaveRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.promotion
	 * @summary 優惠:優惠列表
	 */
	get(
		url: '/backend/promotion/list',
		options: {
			query: {
				ID?: number;
				name?: string;
				startTime?: string;
				endTime?: string;
				promotionCondType?: number;
				status?: number;
				orderBy?: number;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PromotionListResponse>;

	/**
	 * @tag BACKENDAJAX.promotion
	 * @summary 優惠:排除優惠選單
	 */
	get(
		url: '/backend/promotion/exclude',
		options: {
			query: {
				ID?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_PromotionListResponse>;

	/**
	 * @tag BACKENDAJAX.promotion
	 * @summary 優惠：參加優惠
	 */
	post(url: '/backend/promotion/apply', options: { body: BACKENDAJAX_PromotionMemberRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.promotion
	 * @summary 優惠：審核優惠
	 */
	post(url: '/backend/promotion/approve', options: { body: BACKENDAJAX_PromotionMemberRequest } & IDefaultOptions): Promise<BACKENDAJAX_SuccessResponse>;

	/**
	 * @tag BACKENDAJAX.member.login.log
	 * @summary 搜尋會員
	 */
	get(
		url: '/backend/member/login/log/search',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				account?: string;
				loginIP?: string;
				loginDeviceID?: string;
				loginStartTime?: string;
				loginEndTime?: string;
				registerStartTime?: string;
				registerEndTime?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SearchLoginLogResponse>;

	/**
	 * @tag BACKENDAJAX.risk
	 * @summary 初審模組 - 會員列表
	 */
	get(
		url: '/backend/risk/member/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetRiskMemberResponse>;

	/**
	 * @tag BACKENDAJAX.risk
	 * @summary 初審模組 - 會員初審
	 */
	put(url: '/backend/risk/member/check', options: { body: BACKENDAJAX_UpdateRiskMemberRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.risk
	 * @summary 使用過此IP的會員
	 */
	get(
		url: '/backend/risk/ip/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				ip: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetRiskIpResponse>;

	/**
	 * @tag BACKENDAJAX.risk
	 * @summary 使用過此裝置的會員
	 */
	get(
		url: '/backend/risk/device/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				device: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetRiskDeviceResponse>;

	/**
	 * @tag BACKENDAJAX.risk
	 * @summary 會員同裝置
	 */
	get(
		url: '/backend/risk/search',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				memberName?: string;
				deviceID?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SearchMemberDeviceGhostResponse>;

	/**
	 * @tag BACKENDAJAX.risk
	 * @summary 標記多重帳號
	 */
	put(url: '/backend/risk/multiaccount', options: { body: BACKENDAJAX_SetMultiAccountRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.risk
	 * @summary 近期可疑裝置列表
	 */
	get(url: '/backend/risk/repeat/list', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetRepeatDeviceReponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 後台取得登入設定
	 */
	get(url: '/backend/member/setting/config', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetConfigSettingResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 後台更新登入設定
	 */
	put(url: '/backend/member/setting/config', options: { body: BACKENDAJAX_UpdateConfigSettingRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 後台取得H5登入設定
	 */
	get(url: '/backend/member/setting/h5config', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetConfigSettingResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 後台更新H5登入設定
	 */
	put(url: '/backend/member/setting/h5config', options: { body: BACKENDAJAX_UpdateConfigSettingRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得登入設定
	 */
	get(url: '/backend/member/login/config', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetMemberLoginConfigResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得註冊設定
	 */
	get(url: '/backend/member/register/config', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetMemberRegisterConfigResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得登入設定
	 */
	get(url: '/backend/member/login/h5config', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetMemberLoginConfigResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得註冊設定
	 */
	get(url: '/backend/member/register/h5config', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetMemberRegisterConfigResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得系統設定
	 */
	get(url: '/backend/member/system/config', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_GetMemberSystemConfigResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 更新註冊設定
	 */
	put(url: '/backend/member/system/config', options: { body: BACKENDAJAX_UpdateMemberSystemConfigRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得會員標籤
	 */
	get(
		url: '/backend/member/tag',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetMemberTagResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 更新會員標籤
	 */
	put(url: '/backend/member/tag', options: { body: BACKENDAJAX_UpdateMemberOwnTagRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 搜尋會員
	 */
	get(
		url: '/backend/member/search',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				id?: number;
				account?: string;
				name?: string;
				phone?: string;
				address?: string;
				email?: string;
				payment_group?: string;
				bankcard_group?: string;
				last_login_at?: string;
				created_at_start?: string;
				created_at_end?: string;
				status?: number;
				deposit_limit?: number;
				withdraw_limit?: number;
				agency?: string;
				tag?: string;
				email_cert?: number;
				name_cert?: number;
				today_deposit?: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_SearchMemberResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得會員詳細資料
	 */
	get(
		url: '/backend/member/detail',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_GetMemberDetailResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 修改會員
	 */
	put(url: '/backend/member/detail', options: { body: BACKENDAJAX_UpdateMemberRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得會員錢包統計資料
	 */
	get(
		url: '/backend/member/detail/money',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_MemberMoneySummeryResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得會員提款資料
	 */
	get(
		url: '/backend/member/detail/withdraw',
		options: {
			query: {
				id: number;
				start?: string;
				end?: string;
			};
		} & IDefaultOptions
	): Promise<BACKENDAJAX_MemberDepositWithdrawResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 批次新增會員標籤
	 */
	post(url: '/backend/member/tags', options: { body: BACKENDAJAX_BatchAttachMemberTagsRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 批次修改會員狀態
	 */
	put(url: '/backend/member/status', options: { body: BACKENDAJAX_BatchUpdateMemberStatusRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 批次修改會員存款狀態
	 */
	put(url: '/backend/member/deposit', options: { body: BACKENDAJAX_BatchUpdateMemberDepositWithdrawStatusRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 批次修改會員提款狀態
	 */
	put(url: '/backend/member/withdraw', options: { body: BACKENDAJAX_BatchUpdateMemberDepositWithdrawStatusRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 重設會員密碼
	 */
	put(url: '/backend/member/password', options: { body: BACKENDAJAX_ResetMemberPasswordRequest } & IDefaultOptions): Promise<BACKENDAJAX_EmptyResponse>;

	/**
	 * @tag BACKENDAJAX.member
	 * @summary 取得行為驗證商線路列表
	 */
	get(url: '/backend/member/setting/line/config', options?: {} & IDefaultOptions): Promise<BACKENDAJAX_LineResponse>;

	/**
	 * @tag EVENTAJAX.announcement
	 * @summary 取得公告
	 */
	get(url: '/event/announcement', options?: {} & IDefaultOptions): Promise<EVENTAJAX_GetAnnouncementResponse>;

	/**
	 * @tag EVENTAJAX.banner
	 * @summary 取得廣告
	 */
	get(
		url: '/event/banner',
		options: {
			query: {
				categortyID: number;
			};
		} & IDefaultOptions
	): Promise<EVENTAJAX_GetBannerResponse>;

	/**
	 * @tag EVENTAJAX.letter
	 * @summary 會員站內信
	 */
	get(
		url: '/event/letter/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<EVENTAJAX_GetLetterResponse>;

	/**
	 * @tag EVENTAJAX.letter
	 * @summary 單一站內信
	 */
	get(
		url: '/event/letter',
		options: {
			query: {
				ID: number;
			};
		} & IDefaultOptions
	): Promise<EVENTAJAX_GetLetterResponseData>;

	/**
	 * @tag EVENTAJAX.letter
	 * @summary 刪除站內信
	 */
	delete(
		url: '/event/letter',
		options: {
			query: {
				ID: number;
			};
		} & IDefaultOptions
	): Promise<EVENTAJAX_CommonSuccessResponse>;

	/**
	 * @tag EVENTAJAX.letter
	 * @summary 讀取站內信
	 */
	put(url: '/event/letter', options: { body: EVENTAJAX_ReadLetterRequest } & IDefaultOptions): Promise<EVENTAJAX_CommonSuccessResponse>;

	/**
	 * @tag FILEAJAX.file
	 */
	post(url: '/file/file/upload', options: { body: RuntimeForm<FILEAJAX_UploadFileRequest> } & IDefaultOptions): Promise<FILEAJAX_UploadFileResponse>;

	/**
	 * @tag GAMEAJAX.ag
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/ag/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.ag
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/ag/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.IMTrade
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/imtrade/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.IMTrade
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/imtrade/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.bl
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/bl/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.bl
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/bl/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.gamegroup
	 * @summary 遊戲大廳
	 */
	get(url: '/game/gamegroup/lobby', options?: {} & IDefaultOptions): Promise<GAMEAJAX_GameGroupLobbyResponse>;

	/**
	 * @tag GAMEAJAX.gamegroup
	 * @summary 遊戲錢包類型
	 */
	get(url: '/game/gamegroup/wallettype', options?: {} & IDefaultOptions): Promise<GAMEAJAX_GetWalletTypeResponse>;

	/**
	 * @tag GAMEAJAX.log
	 * @summary 注單列表
	 */
	get(
		url: '/game/log/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				memberID?: number;
				memberAccount?: string;
				startTime?: string;
				endTime?: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetGameLogResponse>;

	/**
	 * @tag GAMEAJAX.log
	 * @summary 老虎機注單詳情
	 */
	get(
		url: '/game/log/slot/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				memberID?: number;
				memberAccount?: string;
				gameGroupID?: number;
				startTime?: string;
				endTime?: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetSlotLogListResponse>;

	/**
	 * @tag GAMEAJAX.log
	 * @summary 電競體育類注單詳情
	 */
	get(
		url: '/game/log/esport/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				memberID?: number;
				memberAccount?: string;
				gameGroupID?: number;
				startTime?: string;
				endTime?: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetESportLogListResponse>;

	/**
	 * @tag GAMEAJAX.log
	 * @summary 彩票類注單詳情
	 */
	get(
		url: '/game/log/lottery/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				memberID?: number;
				memberAccount?: string;
				gameGroupID?: number;
				startTime?: string;
				endTime?: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetLotteryLogListResponse>;

	/**
	 * @tag GAMEAJAX.log
	 * @summary 補魚類注單詳情
	 */
	get(
		url: '/game/log/fish/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				memberID?: number;
				memberAccount?: string;
				gameGroupID?: number;
				startTime?: string;
				endTime?: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetFishLogListResponse>;

	/**
	 * @tag GAMEAJAX.log
	 * @summary 體育類注單詳情
	 */
	get(
		url: '/game/log/sport/list',
		options: {
			query: {
				page?: number;
				pageSize?: number;
				memberID?: number;
				memberAccount?: string;
				gameGroupID?: number;
				startTime?: string;
				endTime?: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetSportLogListResponse>;

	/**
	 * @tag GAMEAJAX.IM
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/im/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.IM
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/im/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.PG
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/pg/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.PG
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/pg/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.game
	 * @summary 一鍵回收
	 */
	post(url: '/game/game/recycle', options?: {} & IDefaultOptions): Promise<GAMEAJAX_MemberMoneyResponse>;

	/**
	 * @tag GAMEAJAX.game
	 * @summary 立即取得所有錢包餘額(立即呼叫三方，慢到炸裂)
	 */
	get(url: '/game/game/balance/current', options?: {} & IDefaultOptions): Promise<GAMEAJAX_GetBalanceResponse>;

	/**
	 * @tag GAMEAJAX.game
	 * @summary 立即取得指定錢包餘額(立即呼叫三方，慢到炸裂)
	 */
	get(
		url: '/game/game/balance/single',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetBalanceResponseData>;

	/**
	 * @tag GAMEAJAX.game
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/game/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.game
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/game/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.gamelist
	 * @summary 從遊戲廠商取得遊戲列表
	 */
	get(
		url: '/game/gamelist/getbygroupid',
		options: {
			query: {
				gameGroupID: number;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetGameListByGroupIDResponse>;

	/**
	 * @tag GAMEAJAX.gamelist
	 * @summary 取得首頁推薦遊戲
	 */
	get(url: '/game/gamelist/recommendedgame', options?: {} & IDefaultOptions): Promise<GAMEAJAX_GetMemberFavoriteGameListResponse>;

	/**
	 * @tag GAMEAJAX.gamelist
	 * @summary 取得使用者收藏遊戲
	 */
	get(
		url: '/game/gamelist/getfavoritegame',
		options: {
			query: {
				gameTypeID: number;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetMemberFavoriteGameListResponse>;

	/**
	 * @tag GAMEAJAX.gamelist
	 * @summary 取得熱門遊戲(pc)
	 */
	get(
		url: '/game/gamelist/hotgame/pc',
		options: {
			query: {
				gameTypeID?: number;
				gameGroupID?: number;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetHotGameResponse>;

	/**
	 * @tag GAMEAJAX.gamelist
	 * @summary 取得熱門遊戲(h5)
	 */
	get(
		url: '/game/gamelist/hotgame/h5',
		options: {
			query: {
				gameTypeID?: number;
				gameGroupID?: number;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetHotGameResponse>;

	/**
	 * @tag GAMEAJAX.gamelist
	 * @summary 收藏此遊戲
	 */
	post(url: '/game/gamelist/like', options: { body: GAMEAJAX_LikeGameRequest } & IDefaultOptions): Promise<GAMEAJAX_EmptyResponse>;

	/**
	 * @tag GAMEAJAX.gamelist
	 * @summary 取消收藏此遊戲
	 */
	delete(
		url: '/game/gamelist/unlike',
		options: {
			query: {
				gameListID: number;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_EmptyResponse>;

	/**
	 * @tag GAMEAJAX.gamelist
	 * @summary 取得最近遊玩遊戲
	 */
	get(
		url: '/game/gamelist/playedgame',
		options: {
			query: {
				gameTypeID?: number;
				gameGroupID?: number;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_GetHotGameResponse>;

	/**
	 * @tag GAMEAJAX.ebet
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/ebet/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.ebet
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/ebet/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.SABA
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/saba/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.SABA
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/saba/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.KG
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/kg/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.KG
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/kg/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.cq9
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/cq9/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.cq9
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/cq9/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.bg
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/bg/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.bg
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/bg/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.xg
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/xg/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.xg
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/xg/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.cr
	 * @summary 登入遊戲取得網址
	 */
	get(
		url: '/game/cr/login',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag GAMEAJAX.cr
	 * @summary 登入遊戲取得網址(舊版)
	 */
	get(
		url: '/game/cr/login/old',
		options: {
			query: {
				gameListID: string;
			};
		} & IDefaultOptions
	): Promise<GAMEAJAX_BaseLoginGameResponse>;

	/**
	 * @tag MEMBERAJAX.region
	 * @summary 取得省份
	 */
	get(url: '/member/region/provinces', options?: {} & IDefaultOptions): Promise<MEMBERAJAX_RegionResponse>;

	/**
	 * @tag MEMBERAJAX.region
	 * @summary 取得城市
	 */
	get(
		url: '/member/region/cities',
		options: {
			query: {
				upid: number;
			};
		} & IDefaultOptions
	): Promise<MEMBERAJAX_RegionResponse>;

	/**
	 * @tag MEMBERAJAX.region
	 * @summary 取得區域
	 */
	get(
		url: '/member/region/state',
		options: {
			query: {
				upid: number;
			};
		} & IDefaultOptions
	): Promise<MEMBERAJAX_RegionResponse>;

	/**
	 * @tag MEMBERAJAX.region
	 * @summary 取得街區
	 */
	get(
		url: '/member/region/street',
		options: {
			query: {
				upid: number;
			};
		} & IDefaultOptions
	): Promise<MEMBERAJAX_RegionResponse>;

	/**
	 * @tag MEMBERAJAX.authorize
	 * @summary 取得登入設定
	 */
	get(url: '/member/authorize/register/config', options?: {} & IDefaultOptions): Promise<MEMBERAJAX_GetRegisterConfigRequest>;

	/**
	 * @tag MEMBERAJAX.authorize
	 * @summary 取得登入設定
	 */
	get(url: '/member/authorize/login/config', options?: {} & IDefaultOptions): Promise<MEMBERAJAX_GetLoginConfigResponse>;

	/**
	 * @tag MEMBERAJAX.authorize
	 * @summary 註冊
	 */
	post(url: '/member/authorize/register', options: { body: MEMBERAJAX_RegisterRequest } & IDefaultOptions): Promise<MEMBERAJAX_LoginResponse>;

	/**
	 * @tag MEMBERAJAX.authorize
	 * @summary SSO註冊
	 */
	post(url: '/member/authorize/sso_register', options: { body: MEMBERAJAX_SsoRegisterRequest } & IDefaultOptions): Promise<MEMBERAJAX_LoginResponse>;

	/**
	 * @tag MEMBERAJAX.authorize
	 * @summary 登入
	 */
	post(url: '/member/authorize/login', options: { body: MEMBERAJAX_LoginRequest } & IDefaultOptions): Promise<MEMBERAJAX_LoginResponse>;

	/**
	 * @tag MEMBERAJAX.authorize
	 * @summary SSO登入
	 */
	post(url: '/member/authorize/sso_login', options: { body: MEMBERAJAX_SsoLoginRequest } & IDefaultOptions): Promise<MEMBERAJAX_LoginResponse>;

	/**
	 * @tag MEMBERAJAX.authorize
	 * @summary 二階段驗證手機
	 */
	post(url: '/member/authorize/phone', options: { body: MEMBERAJAX_AuthPhoneRequest } & IDefaultOptions): Promise<MEMBERAJAX_AuthPhoneResponse>;

	/**
	 * @tag MEMBERAJAX.authorize
	 * @summary 二階段驗證發送簡訊
	 */
	post(url: '/member/authorize/send_sms', options: { body: MEMBERAJAX_AuthPhoneRequest } & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.authorize
	 * @summary 二階段驗證
	 */
	post(url: '/member/authorize/second', options: { body: MEMBERAJAX_SecondPhaseRequest } & IDefaultOptions): Promise<MEMBERAJAX_LoginResponse>;

	/**
	 * @tag MEMBERAJAX.authorize
	 * @summary 取得驗證碼
	 */
	get(url: '/member/authorize/captcha', options?: {} & IDefaultOptions): Promise<MEMBERAJAX_CaptchaResponse>;

	/**
	 * @tag MEMBERAJAX.authorize
	 * @summary 登出
	 */
	post(url: '/member/authorize/logout', options?: {} & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.vip
	 * @summary 取得VIP資訊
	 */
	get(url: '/member/vip/info', options?: {} & IDefaultOptions): Promise<MEMBERAJAX_GetVipInfoResponse>;

	/**
	 * @tag MEMBERAJAX.vip
	 * @summary 取得VIP可領取資訊
	 */
	get(url: '/member/vip/gift', options?: {} & IDefaultOptions): Promise<MEMBERAJAX_GetVipGiftResponse>;

	/**
	 * @tag MEMBERAJAX.vip
	 * @summary 領取VIP禮金
	 */
	post(url: '/member/vip/gift', options: { body: MEMBERAJAX_TakeVIPGiftRequest } & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.vip
	 * @summary 一鍵領取VIP禮金
	 */
	post(url: '/member/vip/gift/all', options?: {} & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.vip
	 * @summary 已讀VIP禮金
	 */
	post(url: '/member/vip/gift/read', options: { body: MEMBERAJAX_TakeVIPGiftsRequest } & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 取得會員詳細資料
	 */
	get(url: '/member/member/me', options?: {} & IDefaultOptions): Promise<MEMBERAJAX_GetMemberResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 修改會員實名
	 */
	put(url: '/member/member/name', options: { body: MEMBERAJAX_UpdateMemberNameRequest } & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 發送手機驗證碼
	 */
	post(url: '/member/member/phone', options: { body: MEMBERAJAX_MemberAuthPhoneRequest } & IDefaultOptions): Promise<MEMBERAJAX_MemberAuthPhoneResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 修改會員手機
	 */
	put(url: '/member/member/phone', options: { body: MEMBERAJAX_UpdateMemberPhoneRequest } & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 修改會員信箱
	 */
	put(url: '/member/member/email', options: { body: MEMBERAJAX_UpdateMemberEmailRequest } & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 驗證舊密碼
	 */
	post(url: '/member/member/password', options: { body: MEMBERAJAX_MemberAuthPasswordRequest } & IDefaultOptions): Promise<MEMBERAJAX_MemberAuthPasswordResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 修改會員密碼
	 */
	put(url: '/member/member/password', options: { body: MEMBERAJAX_UpdateMemberPasswordRequest } & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 修改會員資料
	 */
	put(url: '/member/member/detail', options: { body: MEMBERAJAX_UpdateMemberRequest } & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 取得會員銀行卡
	 */
	get(url: '/member/member/bankcards', options?: {} & IDefaultOptions): Promise<MEMBERAJAX_GetMemberBankCardResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 新增會員銀行卡
	 */
	post(url: '/member/member/bankcard', options: { body: MEMBERAJAX_CreateMemberBankCardRequest } & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 刪除會員銀行卡
	 */
	delete(
		url: '/member/member/bankcard',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 新增他人銀行卡
	 */
	post(url: '/member/member/bankcard/other', options: { body: MEMBERAJAX_CreateMemberBankCardRequest } & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 取得會員USDT
	 */
	get(url: '/member/member/usdts', options?: {} & IDefaultOptions): Promise<MEMBERAJAX_GetMemberUSDTResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 驗證驗證碼
	 */
	post(url: '/member/member/sms', options: { body: MEMBERAJAX_MemberVerifySmsRequest } & IDefaultOptions): Promise<MEMBERAJAX_MemberVerifySmsResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 新增會員USDT
	 */
	post(url: '/member/member/usdt', options: { body: MEMBERAJAX_CreateMemberUSDTRequest } & IDefaultOptions): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MEMBERAJAX.member
	 * @summary 刪除會員USDT
	 */
	delete(
		url: '/member/member/usdt',
		options: {
			query: {
				id: number;
			};
		} & IDefaultOptions
	): Promise<MEMBERAJAX_EmptyResponse>;

	/**
	 * @tag MONEYAJAX.useType
	 * @summary Get UseType
	 */
	get(url: '/money/usetype', options?: {} & IDefaultOptions): Promise<MONEYAJAX_GetMoneyUseTypeResponse>;

	/**
	 * @tag MONEYAJAX.useType
	 * @summary Get inOutType
	 */
	get(url: '/money/usetype/inouttype', options?: {} & IDefaultOptions): Promise<MONEYAJAX_GetMoneyInOutTypeResponse>;

	/**
	 * @tag MONEYAJAX.Wallet.member
	 * @summary 前台登入取得餘額
	 */
	get(url: '/money/wallet/member/money', options?: {} & IDefaultOptions): Promise<MONEYAJAX_MemberMoneyResponse>;

	/**
	 * @tag PAYMENTAJAX.pay_group
	 * @summary 新註冊會員加入金流群組
	 */
	get(
		url: '/payment/pay_group/register',
		options: {
			query: {
				memberID: number;
			};
		} & IDefaultOptions
	): Promise<PAYMENTAJAX_mixed>;

	/**
	 * @tag PAYMENTAJAX.third.fake
	 * @summary 測試用-發送U的存款下單請求到滙寶
	 */
	post(url: '/payment/third/fake/hb_u_deposit', options?: {} & IDefaultOptions): Promise<PAYMENTAJAX_ArrayResponse>;

	/**
	 * @tag PAYMENTAJAX.third.fake
	 * @summary 測試用-發送U的出款下單請求到滙寶
	 */
	post(url: '/payment/third/fake/hb_u_withdraw', options?: {} & IDefaultOptions): Promise<PAYMENTAJAX_ArrayResponse>;

	/**
	 * @tag PAYMENTAJAX.third.fake
	 * @summary 測試用-查詢滙寶U商戶的存提款滙率
	 */
	get(url: '/payment/third/fake/hb_u_rate_query', options?: {} & IDefaultOptions): Promise<PAYMENTAJAX_ArrayResponse>;

	/**
	 * @tag PAYMENTAJAX.third.fake
	 * @summary 測試用-查詢滙寶U商戶的可用余額
	 */
	get(url: '/payment/third/fake/hb_u_account_query', options?: {} & IDefaultOptions): Promise<PAYMENTAJAX_ArrayResponse>;

	/**
	 * @tag PAYMENTAJAX.promotion
	 * @summary 優惠活動：列表
	 */
	get(
		url: '/payment/promotion',
		options: {
			query: {
				type: number;
			};
		} & IDefaultOptions
	): Promise<PAYMENTAJAX_PromotionListResponse>;

	/**
	 * @tag PAYMENTAJAX.promotion
	 * @summary 優惠活動：單則優惠內容
	 */
	get(
		url: '/payment/promotion/one',
		options: {
			query: {
				ID: number;
			};
		} & IDefaultOptions
	): Promise<PAYMENTAJAX_PromotionListResponseData>;

	/**
	 * @tag PAYMENTAJAX.promotion
	 * @summary 優惠：下拉選單
	 */
	get(url: '/payment/promotion/dropdown', options?: {} & IDefaultOptions): Promise<PAYMENTAJAX_PromotionDropdownResponse>;

	/**
	 * @tag PAYMENTAJAX.promotion
	 * @summary 優惠：申請
	 */
	post(url: '/payment/promotion/apply', options: { body: PAYMENTAJAX_PromotionApplyRequest } & IDefaultOptions): Promise<PAYMENTAJAX_CommonSuccessResponse>;

	/**
	 * @tag PAYMENTAJAX.withdrawal
	 * @summary 提款: 提款首頁
	 */
	get(url: '/payment/withdrawal', options?: {} & IDefaultOptions): Promise<PAYMENTAJAX_WithdrawalIndexResponse>;

	/**
	 * @tag PAYMENTAJAX.deposit
	 * @summary 存款： 取得線路
	 */
	get(url: '/payment/deposit', options?: {} & IDefaultOptions): Promise<PAYMENTAJAX_GetDepositResponse>;

	/**
	 * @tag PAYMENTAJAX.deposit
	 * @summary 存款： 建立存款單
	 */
	post(url: '/payment/deposit', options: { body: PAYMENTAJAX_CreateDepositRequest } & IDefaultOptions): Promise<PAYMENTAJAX_CreateDepositResponse>;

	/**
	 * @tag PAYMENTAJAX.deposit
	 * @summary 存款： 取消充值
	 */
	post(url: '/payment/deposit/cancel', options: { body: PAYMENTAJAX_CancelDepositRequest } & IDefaultOptions): Promise<PAYMENTAJAX_EmptyResponse>;

	/**
	 * @tag PAYMENTAJAX.record
	 * @summary 交易紀錄：紅利紀錄
	 */
	get(
		url: '/payment/record/bonus',
		options: {
			query: {
				startTime?: string;
				endTime?: string;
			};
		} & IDefaultOptions
	): Promise<PAYMENTAJAX_BonusListResponse>;

	/**
	 * @tag PAYMENTAJAX.record
	 * @summary 交易紀錄：充值紀錄
	 */
	get(
		url: '/payment/record/deposit',
		options: {
			query: {
				startTime?: string;
				endTime?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<PAYMENTAJAX_DepositListResponse>;

	/**
	 * @tag PAYMENTAJAX.record
	 * @summary 交易紀錄：提款紀錄
	 */
	get(
		url: '/payment/record/withdrawal',
		options: {
			query: {
				startTime?: string;
				endTime?: string;
				page?: number;
				pageSize?: number;
			};
		} & IDefaultOptions
	): Promise<PAYMENTAJAX_WithdrawalListResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試用-驗證排程功能與controller功能是否會衝突
	 */
	get(url: '/report/report/fake', options?: {} & IDefaultOptions): Promise<REPORTAJAX_EmptyResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試用-測試 redis lock 功能
	 */
	get(
		url: '/report/report/lock',
		options: {
			query: {
				customerID?: number;
				sleep?: number;
			};
		} & IDefaultOptions
	): Promise<REPORTAJAX_EmptyResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試用-測試 URI parameter 功能
	 */
	get(
		url: '/report/report/{channelsn}/{ordersn}/{amount}/callback',
		options: {
			query: {
				customerID?: number;
				sleep?: number;
			};
		} & IDefaultOptions
	): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試基本報表game
	 */
	get(url: '/report/report/testreportmemberdailygame', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試基本報表全部
	 */
	get(url: '/report/report/testreportmemberall', options?: {} & IDefaultOptions): Promise<REPORTAJAX_EmptyResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試基本報表
	 */
	get(url: '/report/report/testreportmemberdaily', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試代理佣金報表
	 */
	get(
		url: '/report/report/testagentcommissionmonthly',
		options: {
			query: {
				startTime: string;
				endTime: string;
				isFinal?: boolean;
			};
		} & IDefaultOptions
	): Promise<REPORTAJAX_EmptyResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試產生會員
	 */
	get(
		url: '/report/report/testgenmember',
		options: {
			query: {
				accountPrefix?: string;
				promotionLink?: string;
			};
		} & IDefaultOptions
	): Promise<REPORTAJAX_GenMemberResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試產生代理
	 */
	get(
		url: '/report/report/testgenagency',
		options: {
			query: {
				accountPrefix?: string;
				parentAgencyID?: number;
			};
		} & IDefaultOptions
	): Promise<REPORTAJAX_GenAgencyResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試批次產生總代、下層代理跟所屬會員
	 */
	get(
		url: '/report/report/testbatchgenagencymember',
		options: {
			query: {
				childAgencyCount: number;
				memberCount: number;
				parentAgencyAccount?: string;
				accountPrefix?: string;
			};
		} & IDefaultOptions
	): Promise<REPORTAJAX_EmptyResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試產生基本統計報表假資料
	 */
	get(
		url: '/report/report/testgenfakememberreport',
		options: {
			query: {
				date: string;
				parentAgencyAccount: string;
				rechargeAmount?: number;
				withdrawAmount?: number;
				bonusAmount?: number;
				vipGiftAmount?: number;
				returnAmount?: number;
				betAmountTop?: number;
				betAmountBottom?: number;
				winRate?: number;
				payRateTop?: number;
				payRateBottom?: number;
			};
		} & IDefaultOptions
	): Promise<REPORTAJAX_EmptyResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試調整代理結構、會員結構、佣金設定等的開始日期
	 */
	get(
		url: '/report/report/testadjustrelation',
		options: {
			query: {
				parentAgencyAccount: string;
				date: string;
			};
		} & IDefaultOptions
	): Promise<REPORTAJAX_EmptyResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-代理佣金
	 */
	get(url: '/report/report/testagencycommissiondcgetlist', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-會員基本報表
	 */
	get(url: '/report/report/testreportmemberdailydcgetlist', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-會員基本報表SUM GROUP BY date
	 */
	get(url: '/report/report/testreportmemberdailydcgetsumgroupbydate', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-會員基本報表SUM GROUP BY Member
	 */
	get(url: '/report/report/testreportmemberdailydcgetsumgroupbymember', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-會員GAME基本報表
	 */
	get(url: '/report/report/testreportmemberdailygamedcgetlist', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-會員GAME基本報表Date
	 */
	get(url: '/report/report/testreportmemberdailygamedcgetsumbydate', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-會員GAME基本報表MEMBER
	 */
	get(url: '/report/report/testreportmemberdailygamedcgetsumbymember', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-會員GAME基本報表GameGroup
	 */
	get(url: '/report/report/testreportmemberdailygamedcgetsumbygamegroup', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-會員GAME基本報表DateMember
	 */
	get(url: '/report/report/testreportmemberdailygamedcgetsumbydatemember', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-會員GAME基本報表DateGameGroup
	 */
	get(url: '/report/report/testreportmemberdailygamedcgetsumbydategamegroup', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-會員GAME基本報表MemberGameGroup
	 */
	get(url: '/report/report/testreportmemberdailygamedcgetsumbymembergamegroup', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;

	/**
	 * @tag REPORTAJAX.report
	 * @summary 測試DC-會員投注詳細
	 */
	get(url: '/report/report/testgetbettinglogdetail', options?: {} & IDefaultOptions): Promise<REPORTAJAX_ArrayResponse>;
}

// swagger runtime. generate by swagger2ts
interface IRuntimeHeaderMapString {
	[key: string]: string;
}

interface IRuntimeHeaderConfig {
	common: IRuntimeHeaderMapString;
	[method: string]: IRuntimeHeaderMapString;
}

interface IRuntimeRequestCommonOptions extends Omit<RequestInit, 'body' | 'method'> {
	path?: {
		[key: string]: string;
	};
	query?: {
		[key: string]: string;
	};
	header?: {
		[key: string]: string;
	};
	body?: any;
	timeout?: number;
}

interface IRuntimeRequestOptions extends IRuntimeRequestCommonOptions {
	url: string;
	method: Uppercase<string>;
}

interface IRequestInterceptor {
	use(fn: IRequestInterceptorFn): IInterceptorCancelFn;
}

interface IResponseInterceptor {
	use(success: IResponseInterceptorSuccessFn<any>, error: IResponseInterceptorErrorFn<any>): IInterceptorCancelFn;
}

type IInterceptorCancelFn = () => void;
type IRequestInterceptorFn = (config: IRuntimeRequestOptions) => Promise<IRuntimeRequestOptions>;
type IResponseInterceptorSuccessFn<T> = (config: IRuntimeRequestOptions, response: Response, data: T) => Promise<T>;
type IResponseInterceptorErrorFn<T> = (config: IRuntimeRequestOptions, Error: RuntimeError) => Promise<T>;

interface IRuntimeForm {
	[key: string]: any;
}
class RequestInterceptor implements IRequestInterceptor {
	private _fns: IRequestInterceptorFn[] = [];
	public use(fn: IRequestInterceptorFn) {
		this._fns.push(fn);

		return () => {
			const index = this._fns.findIndex((v) => v === fn);

			if (index > -1) {
				this._fns.splice(index, 1);
			}
		};
	}

	async run(config: IRuntimeRequestOptions): Promise<IRuntimeRequestOptions> {
		for (const fn of this._fns) {
			config = await fn(config);
		}

		return config;
	}
}

class ResponseInterceptor implements IResponseInterceptor {
	private _fnsSuccess: IResponseInterceptorSuccessFn<any>[] = [];
	private _fnsError: IResponseInterceptorErrorFn<any>[] = [];
	public use(successFn: IResponseInterceptorSuccessFn<any>, errorFn: IResponseInterceptorErrorFn<any>) {
		this._fnsSuccess.push(successFn);
		this._fnsError.push(errorFn);

		return () => {
			const successIndex = this._fnsSuccess.findIndex((v) => v === successFn);
			const errorIndex = this._fnsError.findIndex((v) => v === errorFn);

			if (successIndex > -1) {
				this._fnsSuccess.splice(successIndex, 1);
			}

			if (errorIndex > -1) {
				this._fnsError.splice(errorIndex, 1);
			}
		};
	}

	async runSuccess<T>(config: IRuntimeRequestOptions, response: Response, data: T): Promise<T> {
		for (const fn of this._fnsSuccess) {
			data = await fn(config, response, data);
		}

		return data;
	}

	async runError<T>(config: IRuntimeRequestOptions, err: RuntimeError): Promise<T> {
		let res!: T;

		for (const fn of this._fnsError) {
			res = await fn(config, err);
		}

		return res;
	}
}

export class RuntimeForm<T extends IRuntimeForm> {
	constructor(private _form: T) {}
	public formData(): FormData {
		const form = new FormData();

		for (const key in this._form) {
			if (this._form[key] !== undefined) {
				form.append(key, this._form[key]);
			}
		}

		return form;
	}
}

export class RuntimeError extends Error {
	constructor(message: string, private _resp?: Response) {
		super(message);
	}

	public get response(): Response | undefined {
		return this._resp;
	}

	static fromResponse(resp: Response) {
		return new RuntimeError(resp.statusText, resp);
	}

	static fromError(err: Error) {
		return new RuntimeError(err.message || 'unknown error: ' + err);
	}
}

export interface IRuntime {
	readonly interceptors: { readonly request: IRequestInterceptor; readonly response: IResponseInterceptor };
	readonly defaults: { readonly timeout: number; readonly headers: IRuntimeHeaderConfig };
	readonly baseURL: string;
	domain: string;
	prefix: string;
	request<T>(config: IRuntimeRequestOptions): Promise<T>;
}
export class Runtime implements IRuntime {
	constructor(private _domain: string, private _prefix: string) {
		const methods = ['get', 'post', 'delete', 'put', 'head', 'options', 'trace', 'patch'];

		for (const method of methods) {
			// @ts-ignore ignore error
			this[method] = (url: string, config?: IRuntimeRequestCommonOptions = {}) => {
				return this.request({
					method: method.toUpperCase(),
					url,
					...config,
				});
			};
		}
	}

	private _requestInterceptor = new RequestInterceptor();
	private _responseInterceptor = new ResponseInterceptor();

	private _defaults = {
		timeout: 60 * 1000, // 60s,
		headers: {
			common: {
				'Content-Type': 'application/json',
			},
		} as IRuntimeHeaderConfig,
	};

	public get interceptors() {
		const self = this;
		return {
			get request() {
				return self._requestInterceptor as IRequestInterceptor;
			},
			get response() {
				return self._responseInterceptor as IResponseInterceptor;
			},
		};
	}

	public get defaults() {
		return this._defaults;
	}

	private _timeout<T>(ms: number, promise: Promise<T>) {
		return new Promise<T>((resolve, reject) => {
			const timer = setTimeout(() => {
				reject(new RuntimeError(`timeout of ${ms}ms`));
			}, ms);

			promise
				.then((value) => {
					clearTimeout(timer);
					resolve(value);
				})
				.catch((reason) => {
					clearTimeout(timer);
					reject(reason);
				});
		});
	}

	public get baseURL(): string {
		const baseUrl = this._domain.replace(/\/$/, '') + (!/^\//.test(this._prefix) ? '/' : '') + this._prefix;

		return baseUrl.replace(/\/$/, '');
	}

	public set domain(domain: string) {
		this._domain = domain;
	}

	public set prefix(prefix: string) {
		this._prefix = prefix;
	}

	public async request<T>(config: IRuntimeRequestOptions): Promise<T> {
		const url = new URL(this.baseURL + config.url);
		config.header = config.header || {};

		const defaults = this.defaults;

		// set default header
		for (const key in defaults.headers.common) {
			config.header[key] = defaults.headers.common[key];
		}

		// set header for this method
		for (const key in defaults.headers[config.method] || {}) {
			config.header[key] = defaults.headers[config.method][key];
		}

		if (config.query) {
			for (const key in config.query) {
				const value = config.query[key];
				if (value !== undefined) {
					url.searchParams.append(key, value);
				}
			}
		}

		if (config.path) {
			for (const key in config.path) {
				const t1 = encodeURI('{');
				const t2 = encodeURI('}');
				const reg = new RegExp(`${t1}${key}${t2}`, 'g');
				url.pathname = url.pathname.replace(reg, config.path[key]);
			}
		}

		config = await this._requestInterceptor.run(config);

		const headers = new Headers();

		for (const key in config.header) {
			const value = config.header[key];
			if (value !== undefined) {
				headers.set(key, value);
			}
		}

		const timeout = config.timeout || defaults.timeout;

		const body =
			config.body === undefined
				? undefined
				: ['GET', 'HEAD'].indexOf(config.method.toUpperCase()) > -1
				? undefined
				: config.body instanceof RuntimeForm
				? config.body.formData()
				: config.body instanceof Blob
				? config.body
				: typeof config.body === 'object'
				? JSON.stringify(config.body)
				: config.body.toString();

		const exec = () =>
			fetch(url.toString(), {
				method: config.method,
				body: body,
				headers: headers,

				// common options
				cache: config.cache,
				credentials: config.credentials,
				integrity: config.integrity,
				keepalive: config.keepalive,
				mode: config.mode,
				redirect: config.redirect,
				referrer: config.referrer,
				referrerPolicy: config.referrerPolicy,
				signal: config.signal,
				window: config.window,
			});

		return (timeout ? this._timeout(timeout, exec()) : exec())
			.then(async (resp) => {
				if (!resp.ok) return Promise.reject(RuntimeError.fromResponse(resp));
				const contentType = resp.headers.get('content-type');
				switch (contentType) {
					case 'application/json':
						return { data: await resp.json(), resp };
					case 'application/x-www-form-urlencoded':
						return { data: await resp.formData(), resp };
					case 'application/octet-stream':
						return { data: await resp.blob(), resp };
					default:
						return { data: await resp.text(), resp };
				}
			})
			.then(({ data, resp }) => {
				return this._responseInterceptor.runSuccess<T>(config, resp, data);
			})
			.catch((err) => {
				const runtimeErr = err instanceof RuntimeError ? err : err instanceof Error ? RuntimeError.fromError(err) : new RuntimeError(err + '');

				return this._responseInterceptor.runError<T>(config, runtimeErr);
			});
	}
}

export type IClient = SwaggerApi & IRuntime;
export const unknownApi = new Runtime('http://35.220.154.121:20100', '/') as unknown as IClient;
export const unknownApi = new Runtime('http://35.220.154.121:20100', '/') as unknown as IClient;
