import Axios from '@/api/Axios';

export interface ApiResponse<T> {
	data?: T;
	datetime?: string;
	msgCode?: number;
	msg?: string;
	status?: string;
	statusCode?: number;
	traceid?: string;
}

import {
	// AGENCYAJAX
	AGENCYAJAX_AgencyFrontPageResponse,
	AGENCYAJAX_EmptyResponse,
	// 會員
	AGENCYAJAX_CheckPasswordRequest,
	AGENCYAJAX_ResetPasswordRequest,
	AGENCYAJAX_AgencyLoginRequest,
	AGENCYAJAX_AgencyLoginResponse,
	AGENCYAJAX_GetMemberByAgencyIDRequest,
	AGENCYAJAX_GetMembersResponse,
	AGENCYAJAX_GetMemberFinanceRequest,
	AGENCYAJAX_GetMemberFinanceResponse,
	AGENCYAJAX_GetMemberProductFinanceRequest,
	AGENCYAJAX_GetMemberProductFinanceResponse,
	// 優惠
	AGENCYAJAX_PromotionLaunchedListResponse,
	// 財務報表
	AGENCYAJAX_AgencyFinanceIndexRequest,
	AGENCYAJAX_AgencyFinanceIndexResponse,
	AGENCYAJAX_AgencyFinanceProductsRequest,
	AGENCYAJAX_AgencyFinanceProductsResponse,
	AGENCYAJAX_AgencyFinanceProductResponse,
	AGENCYAJAX_AgencyFinanceGetPlatformRequest,
	AGENCYAJAX_AgencyFinanceGetPlatformResponse,
	AGENCYAJAX_AgencyFinanceGetBonusRequest,
	AGENCYAJAX_AgencyFinanceGetBonusResponse,
	AGENCYAJAX_AgencyFinanceProductRequest,
	AGENCYAJAX_AgencyFinanceGetActivememberResponse,
	AGENCYAJAX_AgencyFinanceGetActivememberRequest,
	// 二級代理
	AGENCYAJAX_CommissionReportResponseData,
	AGENCYAJAX_ChildAgencyCommissionReportSum,
	AGENCYAJAX_ChildAgencyCommissionList,
	AGENCYAJAX_ChildAgencyBonusList,
	// 公告
	AGENCYAJAX_AnnouncementListResponse,
	//代理公告
	AGENCYAJAX_AgencyAnnouncementListResponse,
	AGENCYAJAX_AgencyActivitysListResponse,
	// 存款
	AGENCYAJAX_GetDepositResponse,
	AGENCYAJAX_CreateDepositResponse,
	AGENCYAJAX_CreateDepositRequest,
} from './model';

enum Urls {
	// 會員
	LOGIN = '/agency/agency/login',
	USER = '/agency/agency',
	CHECK_PASSWORD = '/agency/agency/check_password',
	RESET_PASSWORD = '/agency/agency/reset_password',
	MemberList = '/agency/agency/members',
	MemberProduct = '/agency/agency/member/product',
	Member = '/agency/agency/member',
	// 優惠
	PromotionList = '/agency/agency/promotion',
	// 財務報表
	MonthFinance = '/agency/agency/finance',
	ProductsFinance = '/agency/agency/finance/products',
	ProductFinance = '/agency/agency/finance/product',
	FinanceBonus = '/agency/agency/finance/bonus',
	FinancePlatform = '/agency/agency/finance/platform',
	FinanceActivemember = '/agency/agency/finance/activemember',
	// 二級代理
	commissionreport = '/agency/agency/commissionreport',
	childCommissionreport = '/agency/agency/childagencycommissionreport',
	childagencybonuslist = '/agency/agency/childagencybonuslist',
	childagencycommissionlist = '/agency/agency/childagencycommissionlist',
	// 公告
	Announcement = '/agency/agency/announcement',
	// 公告
	AgencyAnnouncement = '/agency/agency/agencyannouncement',
	// 代理活動
	Activitys = '/agency/agency/activitys',
	// 存款
	Deposit = '/agency/deposit',
}

export const postLogin = (params: AGENCYAJAX_AgencyLoginRequest) => Axios.post<ApiResponse<AGENCYAJAX_AgencyLoginResponse>>(Urls.LOGIN, params);

export const AgencyInfo = () => Axios.get<ApiResponse<AGENCYAJAX_AgencyFrontPageResponse>>(Urls.USER);

// 後端少給Schema
export const checkPassword = (params: AGENCYAJAX_CheckPasswordRequest) => Axios.post<ApiResponse<{}>>(Urls.CHECK_PASSWORD, params);

export const resetPassword = (params: AGENCYAJAX_ResetPasswordRequest) => Axios.put<ApiResponse<AGENCYAJAX_EmptyResponse>>(Urls.RESET_PASSWORD, params);

// 代理會員列表  後端給的 api格式怪怪的
export const getMemberList = (params: AGENCYAJAX_GetMemberByAgencyIDRequest) => Axios.get<ApiResponse<AGENCYAJAX_GetMembersResponse>>(Urls.MemberList, { params });

// 會員流水與存款記錄
export const getMember = (params: AGENCYAJAX_GetMemberFinanceRequest) => Axios.get<ApiResponse<AGENCYAJAX_GetMemberFinanceResponse>>(Urls.Member, { params });

// 代理會員單一廠商流水與輸贏;
export const getMemberProduct = (params: AGENCYAJAX_GetMemberProductFinanceRequest) => Axios.get<ApiResponse<AGENCYAJAX_GetMemberProductFinanceResponse>>(Urls.MemberProduct, { params });

// 官網優惠活動
export const getPromotionList = () => Axios.get<ApiResponse<AGENCYAJAX_PromotionLaunchedListResponse>>(Urls.PromotionList);

// 代理財物報表 params type 找不到
// 目前只看到這參數 month: number
export const getMonthFinance = (params: AGENCYAJAX_AgencyFinanceIndexRequest) => Axios.get<ApiResponse<AGENCYAJAX_AgencyFinanceIndexResponse>>(Urls.MonthFinance, { params });

// 代理產品分項報表
export const getProductsFinance = (params: AGENCYAJAX_AgencyFinanceProductsRequest) => Axios.get<ApiResponse<AGENCYAJAX_AgencyFinanceProductsResponse>>(Urls.ProductsFinance, { params });

//單一產品分項報表
export const getProductFinance = (params: AGENCYAJAX_AgencyFinanceProductRequest) => Axios.get<ApiResponse<AGENCYAJAX_AgencyFinanceProductResponse>>(Urls.ProductFinance, { params });

// 財務報表平台費
export const getFinancePlatform = (params:AGENCYAJAX_AgencyFinanceGetPlatformRequest) => Axios.get<ApiResponse<AGENCYAJAX_AgencyFinanceGetPlatformResponse>>(Urls.FinancePlatform, { params });

//財務報表紅利
export const getFinanceBonus = (params: AGENCYAJAX_AgencyFinanceGetBonusRequest) => Axios.get<ApiResponse<AGENCYAJAX_AgencyFinanceGetBonusResponse>>(Urls.FinanceBonus, { params });

//財務報表活躍用戶
export const getFinanceActivemember = (params: AGENCYAJAX_AgencyFinanceGetActivememberRequest) => Axios.get<ApiResponse<AGENCYAJAX_AgencyFinanceGetActivememberResponse>>(Urls.FinanceActivemember, { params });

// 佣金報表
export const getCommissionreport = () => Axios.get<ApiResponse<AGENCYAJAX_CommissionReportResponseData>>(Urls.commissionreport);

//二級代理福利總計
export const getChildCommissionreport = () => Axios.get<ApiResponse<AGENCYAJAX_ChildAgencyCommissionReportSum>>(Urls.childCommissionreport);

// 二級代理佣金列表
export const getChildagencycommissionlist = () => Axios.get<ApiResponse<AGENCYAJAX_ChildAgencyCommissionList>>(Urls.childagencycommissionlist);

//二級代理尊享福利列表
export const getChildAgencyBonusList = () => Axios.get<ApiResponse<AGENCYAJAX_ChildAgencyBonusList>>(Urls.childagencybonuslist);

//公告
export const getAnnouncementList = () => Axios.get<ApiResponse<AGENCYAJAX_AnnouncementListResponse>>(Urls.Announcement);

//代理公告
export const getAgencyAnnouncementList = () => Axios.get<ApiResponse<AGENCYAJAX_AgencyAnnouncementListResponse>>(Urls.AgencyAnnouncement);

// 代理活動
export const getAgencyActivitysList = () => Axios.get<ApiResponse<AGENCYAJAX_AgencyActivitysListResponse>>(Urls.Activitys);

// 存款
export const getAgencyDeposit = () => Axios.get<ApiResponse<AGENCYAJAX_GetDepositResponse>>(Urls.Deposit);
export const creatAgencyDeposit = (params: AGENCYAJAX_CreateDepositRequest) => Axios.post<ApiResponse<AGENCYAJAX_CreateDepositResponse>>(Urls.Deposit, params);
