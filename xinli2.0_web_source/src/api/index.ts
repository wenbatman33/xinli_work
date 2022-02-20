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
	// EVENTAJAX
	EVENTAJAX_CommonSuccessResponse,
	EVENTAJAX_GetBannerRequest,
	EVENTAJAX_GetBannerResponse,
	EVENTAJAX_GetAnnouncementResponse,
	EVENTAJAX_GetLetterRequest,
	EVENTAJAX_GetLetterResponse,
	EVENTAJAX_ReadLetterRequest,
	EVENTAJAX_GetLetterResponseData,
	// 	GAMEAJAX
	GAMEAJAX_EmptyResponse,
	GAMEAJAX_GetBalanceResponse,
	GAMEAJAX_MemberMoneyResponse,
	GAMEAJAX_GameGroupLobbyResponse,
	GAMEAJAX_GetFavoriteGameByMemberIDRequest,
	GAMEAJAX_GetMemberFavoriteGameListResponse,
	GAMEAJAX_GetGameListByGroupIDRequest,
	GAMEAJAX_GetGameListByGroupIDResponse,
	GAMEAJAX_LikeGameRequest,
	GAMEAJAX_GetHotGameRequest,
	GAMEAJAX_GetHotGameResponse,
	GAMEAJAX_GetGameLogListRequest,
	GAMEAJAX_GetGameLogResponse,
	GAMEAJAX_BaseLoginGameRequest,
	GAMEAJAX_BaseLoginGameResponse,
	GAMEAJAX_GetWalletTypeResponse,
	GAMEAJAX_GetSingleBalanceRequest,
	GAMEAJAX_GetBalanceResponseData,
	// MEMBERAJAX
	MEMBERAJAX_EmptyResponse,
	MEMBERAJAX_GetLoginConfigResponse,
	MEMBERAJAX_GetRegisterConfigRequest,
	MEMBERAJAX_RegisterRequest,
	MEMBERAJAX_SsoRegisterRequest,
	MEMBERAJAX_LoginRequest,
	MEMBERAJAX_SsoLoginRequest,
	MEMBERAJAX_LoginResponse,
	MEMBERAJAX_CaptchaResponse,
	MEMBERAJAX_SMSRequest,
	MEMBERAJAX_SMSResponse,
	MEMBERAJAX_GetMemberResponse,
	MEMBERAJAX_GetVipInfoResponse,
	MEMBERAJAX_GetVipSettingResponse,
	MEMBERAJAX_GetVipGiftRequest,
	MEMBERAJAX_GetVipGiftResponse,
	MEMBERAJAX_TakeVIPGiftRequest,
	MEMBERAJAX_TakeVIPGiftsRequest,
	MEMBERAJAX_TakeVIPGiftByTypeRequest,
	MEMBERAJAX_UpdateMemberNameRequest,
	MEMBERAJAX_MemberAuthPhoneRequest,
	MEMBERAJAX_MemberAuthPhoneResponse,
	MEMBERAJAX_UpdateMemberPhoneRequest,
	MEMBERAJAX_UpdateMemberEmailRequest,
	MEMBERAJAX_MemberAuthPasswordRequest,
	MEMBERAJAX_MemberAuthPasswordResponse,
	MEMBERAJAX_UpdateMemberPasswordRequest,
	MEMBERAJAX_UpdateMemberRequest,
	MEMBERAJAX_RegionResponse,
	MEMBERAJAX_RegionalInformationRequest,
	MEMBERAJAX_AuthPhoneRequest,
	MEMBERAJAX_AuthPhoneResponse,
	MEMBERAJAX_GetMemberBankCardResponse,
	MEMBERAJAX_GetMemberUSDTResponse,
	MEMBERAJAX_CreateMemberBankCardRequest,
	MEMBERAJAX_MemberVerifySmsRequest,
	MEMBERAJAX_MemberVerifySmsResponse,
	MEMBERAJAX_CreateMemberUSDTRequest,
	// MONEYAJAX
	MONEYAJAX_MemberMoneyResponse,
	// PAYMENTAJAX
	PAYMENTAJAX_PromotionListRequest,
	PAYMENTAJAX_PromotionListResponse,
	PAYMENTAJAX_PromotionReadRequest,
	PAYMENTAJAX_PromotionListResponseData,
	PAYMENTAJAX_PromotionDropdownResponse,
	PAYMENTAJAX_PromotionApplyRequest,
	PAYMENTAJAX_CommonSuccessResponse,
	PAYMENTAJAX_BonusListRequest,
	PAYMENTAJAX_BonusListResponse,
	PAYMENTAJAX_DepositListRequest,
	PAYMENTAJAX_DepositListResponse,
	PAYMENTAJAX_WithdrawalListRequest,
	PAYMENTAJAX_WithdrawalListResponse,
	PAYMENTAJAX_GetDepositResponse,
	PAYMENTAJAX_CreateDepositRequest,
	PAYMENTAJAX_CreateDepositResponse,
	PAYMENTAJAX_CancelDepositRequest,
	PAYMENTAJAX_GetDepositDetailRequest,
	PAYMENTAJAX_GetDepositDetailResponse,
	PAYMENTAJAX_EmptyResponse,
	PAYMENTAJAX_CreateWithdrawalRequest,
	PAYMENTAJAX_WithdrawalIndexResponse,
	PAYMENTAJAX_IDResponse,
} from './model';

// event
enum url {
	// event
	eventBanner = '/event/banner',
	eventAnnouncement = '/event/announcement',
	eventLetterList = '/event/letter/list',
	eventLetter = '/event/letter',
	// event

	// game
	gameBalanceCurrent = '/game/game/balance/current',
	gameRecycle = '/game/game/recycle',
	gamegroupLobby = '/game/gamegroup/lobby',
	gameGetFavoriteGame = '/game/gamelist/getFavoriteGame',
	gameGetByGroupid = '/game/gamelist/getbygroupid',
	gameRecommendedgame = '/game/gamelist/recommendedgame',
	gameLike = '/game/gamelist/like',
	gameUnlike = '/game/gamelist/unlike',
	gamHotgamePc = '/game/gamelist/hotgame/pc',
	gamHotgameH5 = '/game/gamelist/hotgame/h5',
	gamePlayedGame = '/game/gamelist/playedgame',
	gameLogList = '/game/log/list',
	gameAGLogin = '/game/ag/login',
	gameGamegroupWallettype = '/game/gamegroup/wallettype',
	gameGameBalanceSingle = '/game/game/balance/single',
	gameLoin = '/game/game/login',

	// game
	// member
	memberLoginConfig = '/member/authorize/login/config',
	memberRegisterConfig = '/member/authorize/register/config',
	memberMe = '/member/member/me',
	memberRegister = '/member/authorize/register',
	memberSSORegister = '/member/authorize/sso_register',
	memberLogin = '/member/authorize/login',
	memberSSOLogin = '/member/authorize/sso_login',

	memberAuthorizePhone = '/member/authorize/phone',
	memberAuthorizeSendSms = '/member/authorize/send_sms',
	memberAuthorizeSecond = '/member/authorize/second',

	memberCaptcha = '/member/authorize/captcha',
	memberSms = '/member/authorize/sms',
	memberName = '/member/member/name',
	memberPhone = '/member/member/phone',
	memberEamil = '/member/member/email',
	memberPssword = '/member/member/password',
	memberDetail = '/member/member/detail',
	memberSmsSend = '/member/sms/send',
	memberSmsVerify = '/member/sms/verify',
	memberVipInfo = '/member/vip/info',
	memberVipSetting = '/member/vip/setting',
	memberVipGift = '/member/vip/gift',
	memberVipGiftType = '/member/vip/gift/type',
	memberVipGiftAll = '/member/vip/gift/all',
	memberVipGiftRead = '/member/vip/gift/read',
	memberRegionProvinces = '/member/region/provinces',
	memberRegionCities = '/member/region/cities',
	memberRegionState = '/member/region/state',
	memberRegionStreet = '/member/region/street',
	memberBankcards = '/member/member/bankcards',
	memberUSDTs = '/member/member/usdts',
	memberBankcard = '/member/member/bankcard',
	memberBankcardOther = '/member/member/bankcard/other',
	memberMemberSms = '/member/member/sms',
	memberUSDT = '/member/member/usdt',

	// member
	// money
	moneyMemberMoney = '/money/wallet/member/money',
	// money
	// payment
	paymentPromotion = '/payment/promotion',
	paymentPromotionOne = '/payment/promotion/one',
	paymentPromotionDropdown = '/payment/promotion/dropdown',
	paymentPromotionApply = '/payment/promotion/apply',
	paymentRecordBonus = '/payment/record/bonus',
	paymentRecordDeposit = '/payment/record/deposit',
	paymentRecordWithdrawal = '/payment/record/withdrawal',
	paymentDeposit = '/payment/deposit',
	paymentDepositCancel = '/payment/deposit/cancel',
	paymentDepositDetail = '/payment/deposit/detail',
	paymentWithdrawal = '/payment/withdrawal',
	// payment
}

export const getEventBanner = (params: EVENTAJAX_GetBannerRequest) =>
	Axios.get<ApiResponse<EVENTAJAX_GetBannerResponse>>(url.eventBanner, {
		params,
	});

export const getEventAnnouncement = () => Axios.get<ApiResponse<EVENTAJAX_GetAnnouncementResponse>>(url.eventAnnouncement);

export const getEventLetterList = (params: EVENTAJAX_GetLetterRequest) =>
	Axios.get<ApiResponse<EVENTAJAX_GetLetterResponse>>(url.eventLetterList, {
		params,
	});

export const getEventLetter = (params: EVENTAJAX_ReadLetterRequest) =>
	Axios.get<ApiResponse<EVENTAJAX_GetLetterResponseData>>(url.eventLetter, {
		params,
	});

export const putEventLetter = (params: EVENTAJAX_ReadLetterRequest) => Axios.put<EVENTAJAX_CommonSuccessResponse>(url.eventLetter, params);

export const deleteEventLetter = (id: number) => Axios.delete<EVENTAJAX_CommonSuccessResponse>(`${url.eventLetter}?ID=${id}`);

// event

// game
export const getBalanceCurrent = () => Axios.get<ApiResponse<GAMEAJAX_GetBalanceResponse>>(url.gameBalanceCurrent);

export const postGameRecycle = () => Axios.post<ApiResponse<GAMEAJAX_MemberMoneyResponse>>(url.gameRecycle);

export const getGameGroupLobby = () => Axios.get<ApiResponse<GAMEAJAX_GameGroupLobbyResponse>>(url.gamegroupLobby);

export const getFavoriteGame = (params: GAMEAJAX_GetFavoriteGameByMemberIDRequest) => Axios.get<ApiResponse<GAMEAJAX_GetMemberFavoriteGameListResponse>>(url.gameGetFavoriteGame, { params });

export const getGameByGroupid = (params: GAMEAJAX_GetGameListByGroupIDRequest) => Axios.get<ApiResponse<GAMEAJAX_GetGameListByGroupIDResponse>>(url.gameGetByGroupid, { params });

export const getGameRecommendedgame = () => Axios.get<ApiResponse<GAMEAJAX_GetHotGameResponse>>(url.gameRecommendedgame);

export const postGameLike = (data: GAMEAJAX_LikeGameRequest) => Axios.post<ApiResponse<GAMEAJAX_EmptyResponse>>(url.gameLike, data);

export const deleteGameUnlike = (id: number) => Axios.delete<ApiResponse<GAMEAJAX_EmptyResponse>>(`${url.gameUnlike}?gameListID=${id}`);

export const getHotgame = (params?: GAMEAJAX_GetHotGameRequest) => Axios.get<ApiResponse<GAMEAJAX_GetHotGameResponse>>(url.gamHotgamePc, { params });

export const getHotgameh5 = (params?: GAMEAJAX_GetHotGameRequest) =>
	Axios.get<ApiResponse<GAMEAJAX_GetHotGameResponse>>(url.gamHotgameH5, {
		params,
	});

export const getPlayedGame = (params?: GAMEAJAX_GetHotGameRequest) =>
	Axios.get<ApiResponse<GAMEAJAX_GetHotGameResponse>>(url.gamePlayedGame, {
		params,
	});

export const getGameLogList = (params: GAMEAJAX_GetGameLogListRequest) => Axios.get<ApiResponse<GAMEAJAX_GetGameLogResponse>>(url.gameLogList, { params });

export const gameAgLogin = (params: GAMEAJAX_BaseLoginGameRequest) => Axios.get<ApiResponse<GAMEAJAX_BaseLoginGameResponse>>(url.gameAGLogin, { params });

export const gameGamegroupWallettype = () => Axios.get<ApiResponse<GAMEAJAX_GetWalletTypeResponse>>(url.gameGamegroupWallettype);

export const gameGameBalanceSingle = (params: GAMEAJAX_GetSingleBalanceRequest) => Axios.get<ApiResponse<GAMEAJAX_GetBalanceResponseData>>(url.gameGameBalanceSingle, { params });

export const gameLoing = (params: GAMEAJAX_BaseLoginGameRequest) => Axios.get<ApiResponse<GAMEAJAX_BaseLoginGameResponse>>(url.gameLoin, { params });

// game

// member
export const getLoginConfig = () => Axios.get<ApiResponse<MEMBERAJAX_GetLoginConfigResponse>>(url.memberLoginConfig);

export const getRegisterConfig = () => Axios.get<ApiResponse<MEMBERAJAX_GetRegisterConfigRequest>>(url.memberRegisterConfig);

export const register = (data: MEMBERAJAX_RegisterRequest) => Axios.post<ApiResponse<MEMBERAJAX_LoginResponse>>(url.memberRegister, data);

export const ssoRegister = (data: MEMBERAJAX_SsoRegisterRequest) => Axios.post<ApiResponse<MEMBERAJAX_LoginResponse>>(url.memberSSORegister, data);

export const login = (data: MEMBERAJAX_LoginRequest) => Axios.post<ApiResponse<MEMBERAJAX_LoginResponse>>(url.memberLogin, data);

export const ssoLogin = (data: MEMBERAJAX_SsoLoginRequest) => Axios.post<ApiResponse<MEMBERAJAX_LoginResponse>>(url.memberSSOLogin, data);

export const authorizePhone = (data: MEMBERAJAX_AuthPhoneRequest) => Axios.post<ApiResponse<MEMBERAJAX_AuthPhoneResponse>>(url.memberAuthorizePhone, data);

export const authorizeSendSms = (data: MEMBERAJAX_AuthPhoneRequest) => Axios.post<ApiResponse<MEMBERAJAX_AuthPhoneResponse>>(url.memberAuthorizeSendSms, data);

export const authorizeSecond = (data: MEMBERAJAX_AuthPhoneRequest) => Axios.post<ApiResponse<MEMBERAJAX_LoginResponse>>(url.memberAuthorizeSecond, data);

export const captcha = () => Axios.get<ApiResponse<MEMBERAJAX_CaptchaResponse>>(url.memberCaptcha);

export const sms = (data: MEMBERAJAX_SMSRequest) => Axios.post<ApiResponse<MEMBERAJAX_SMSResponse>>(url.memberSms, data);

export const me = () => Axios.get<ApiResponse<MEMBERAJAX_GetMemberResponse>>(url.memberMe);
// --------------------------------------------------------------------------
export const putMemberName = (params: MEMBERAJAX_UpdateMemberNameRequest) => Axios.put<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberName, params);

export const postMemberPhone = (params: MEMBERAJAX_MemberAuthPhoneRequest) => Axios.post<ApiResponse<MEMBERAJAX_MemberAuthPhoneResponse>>(url.memberPhone, params);

export const putMemberPhone = (params: MEMBERAJAX_UpdateMemberPhoneRequest) => Axios.put<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberPhone, params);

export const putMemberEmail = (params: MEMBERAJAX_UpdateMemberEmailRequest) => Axios.put<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberEamil, params);

export const postMemberPssword = (params: MEMBERAJAX_MemberAuthPasswordRequest) => Axios.post<ApiResponse<MEMBERAJAX_MemberAuthPasswordResponse>>(url.memberPssword, params);

export const putMemberPssword = (params: MEMBERAJAX_UpdateMemberPasswordRequest) => Axios.put<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberPssword, params);

export const putMemberDetail = (params: MEMBERAJAX_UpdateMemberRequest) => Axios.put<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberDetail, params);

export const getMemberSmsSend = (params: MEMBERAJAX_SMSRequest) => Axios.get<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberSmsSend, { params });

export const postMemberSmsVerify = (data: MEMBERAJAX_MemberVerifySmsRequest) => Axios.post<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberSmsVerify, data);

export const getMemberVipInfo = () => Axios.get<ApiResponse<MEMBERAJAX_GetVipInfoResponse>>(url.memberVipInfo);

export const getMemberVipSetting = () => Axios.get<ApiResponse<MEMBERAJAX_GetVipSettingResponse>>(url.memberVipSetting);

export const getMemberVipGift = (params?: MEMBERAJAX_GetVipGiftRequest) => Axios.get<ApiResponse<MEMBERAJAX_GetVipGiftResponse>>(url.memberVipGift, { params });

export const postMemberVipGift = (data: MEMBERAJAX_TakeVIPGiftRequest) => Axios.post<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberVipGift, data);

export const postMemberVipGiftType = (data: MEMBERAJAX_TakeVIPGiftByTypeRequest) => Axios.post<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberVipGiftType, data);

export const postMemberVipGiftAll = () => Axios.post<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberVipGiftAll);

export const postMemberVipGiftRead = (data: MEMBERAJAX_TakeVIPGiftsRequest) => Axios.post<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberVipGiftRead, data);

export const getMemberRegionProvinces = () => Axios.get<ApiResponse<MEMBERAJAX_RegionResponse>>(url.memberRegionProvinces);

export const getMemberRegionCities = (params: MEMBERAJAX_RegionalInformationRequest) => Axios.get<ApiResponse<MEMBERAJAX_RegionResponse>>(url.memberRegionCities, { params });

export const getMemberRegionState = (params: MEMBERAJAX_RegionalInformationRequest) => Axios.get<ApiResponse<MEMBERAJAX_RegionResponse>>(url.memberRegionState, { params });

export const getMemberRegionStreet = (params: MEMBERAJAX_RegionalInformationRequest) => Axios.get<ApiResponse<MEMBERAJAX_RegionResponse>>(url.memberRegionStreet, { params });

export const getMemberBankcards = () => Axios.get<ApiResponse<MEMBERAJAX_GetMemberBankCardResponse>>(url.memberBankcards);

export const getMemberUSDTs = () => Axios.get<ApiResponse<MEMBERAJAX_GetMemberUSDTResponse>>(url.memberUSDTs);

export const postMemberBankcard = (data: MEMBERAJAX_CreateMemberBankCardRequest) => Axios.post<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberBankcard, data);

export const postMemberBankcardOther = (data: MEMBERAJAX_CreateMemberBankCardRequest) => Axios.post<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberBankcardOther, data);

export const postMemberSms = (data: MEMBERAJAX_MemberVerifySmsRequest) => Axios.post<ApiResponse<MEMBERAJAX_MemberVerifySmsResponse>>(url.memberMemberSms, data);

export const postMemberUSDT = (data: MEMBERAJAX_CreateMemberUSDTRequest) => Axios.post<ApiResponse<MEMBERAJAX_EmptyResponse>>(url.memberUSDT, data);

export const deleteMemberUSDT = (id: number) => Axios.delete<ApiResponse<MEMBERAJAX_EmptyResponse>>(`${url.memberUSDT}?id=${id}`);

// member

// money
export const getMemberMoney = () => Axios.get<ApiResponse<MONEYAJAX_MemberMoneyResponse>>(url.moneyMemberMoney);
// money

// payment
export const getPromotion = (params: PAYMENTAJAX_PromotionListRequest) => Axios.get<ApiResponse<PAYMENTAJAX_PromotionListResponse>>(url.paymentPromotion, { params });

export const getPromotionOne = (params: PAYMENTAJAX_PromotionReadRequest) => Axios.get<ApiResponse<PAYMENTAJAX_PromotionListResponseData>>(url.paymentPromotionOne, { params });

export const getPromotionDropdown = () => Axios.get<ApiResponse<PAYMENTAJAX_PromotionDropdownResponse>>(url.paymentPromotionDropdown);

export const promotionApply = (data: PAYMENTAJAX_PromotionApplyRequest) => Axios.post<ApiResponse<PAYMENTAJAX_CommonSuccessResponse>>(url.paymentPromotionApply, data);

export const paymentRecordBonus = (params?: PAYMENTAJAX_BonusListRequest) => Axios.get<ApiResponse<PAYMENTAJAX_BonusListResponse>>(url.paymentRecordBonus, { params });

export const paymentRecordDeposit = (params?: PAYMENTAJAX_DepositListRequest) => Axios.get<ApiResponse<PAYMENTAJAX_DepositListResponse>>(url.paymentRecordDeposit, { params });

export const paymentRecordWithdrawal = (params?: PAYMENTAJAX_WithdrawalListRequest) => Axios.get<ApiResponse<PAYMENTAJAX_WithdrawalListResponse>>(url.paymentRecordWithdrawal, { params });

// 存款：
// 存款：取得線路
export const getPaymentDeposit = () => Axios.get<ApiResponse<PAYMENTAJAX_GetDepositResponse>>(url.paymentDeposit);
// 存款： 建立存款單
export const postPaymentDeposit = (data?: PAYMENTAJAX_CreateDepositRequest) => Axios.post<ApiResponse<PAYMENTAJAX_CreateDepositResponse>>(url.paymentDeposit, data);
// 存款： 建立存款單
export const postPaymentDepositCancel = (data?: PAYMENTAJAX_CancelDepositRequest) => Axios.post<ApiResponse<PAYMENTAJAX_EmptyResponse>>(url.paymentDepositCancel, data);
// 存款：單筆充值單資訊
export const getPaymentDepositDetail = (params?: PAYMENTAJAX_GetDepositDetailRequest) => Axios.get<ApiResponse<PAYMENTAJAX_GetDepositDetailResponse>>(url.paymentDepositDetail, { params });

// 提款:
// 提款: 提款首頁
export const getPaymentWithdrawal = () => Axios.get<ApiResponse<PAYMENTAJAX_WithdrawalIndexResponse>>(url.paymentWithdrawal);
// 提款: 提款送出
export const postPaymentWithdrawal = (data: PAYMENTAJAX_CreateWithdrawalRequest) => Axios.post<ApiResponse<PAYMENTAJAX_IDResponse>>(url.paymentWithdrawal, data);
// payment
