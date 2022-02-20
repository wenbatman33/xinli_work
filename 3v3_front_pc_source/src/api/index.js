import qs from 'qs';

import axios from '@/plugins/axios';

export const memberLoginAPI = (data) => axios.post('/member/login', data);

export const memberRegisterAPI = (data) => axios.post('/member/reg', qs.stringify(data));

export const memberVerificationAPI = (data) => axios.post('/member/verification', data);

export const memberInfoAPI = () => axios.post('/member/info');

export const memberFindpwdAPI = (data) => axios.post('/member/findpwd', data);

export const randomUsernameAPI = () => axios.get('/member/getRandomUsername');

export const checkCodeAPI = (data) => axios.get('/member/checkCode', { params: data });

// 是否存在該賽事
export const gameIsOrderAPI = (data) => axios.get('/game/isorder', { params: data });

// 公告
export const getNoticesAPI = () => axios.get('/game/notice');
// 站內信
export const getMemberInboxAPI = () => axios.get('/member/inbox');

export const putMemberInboxAPI = (data) => axios.put('/member/inbox', data);

// 修改個人資料
export const memberToolsAPI = () => axios.get('/member/tools');

export const publicUploadAPI = (data) => axios.post('/public/upload', data);

export const memberChangetelAPI = (data) => axios.post('/member/changetel', qs.stringify(data));

export const memberResetpwdAPI = (data) => axios.post('/member/resetpwd', data);

export const memberEditAPI = (data) => axios.post('/member/edit', qs.stringify(data));

export const memberGetCardsAPI = () => axios.get('/member/getCards');

export const memberGetCardinfoAPI = (data) => axios.get('/member/getCardinfo', { params: data });

export const memberBindcardAPI = (data) => axios.post('/member/bindcard', data);

export const memberUnbindcardAPI = (data) => axios.post('/member/unbindcard', qs.stringify(data));

// 存提款
export const publicPayAPI = () => axios.get('/public/pay');

export const memberRechargeAPI = (data) => axios.post('/member/recharge', data);

export const memberWalletAPI = (data) => axios.post('/member/wallet', qs.stringify(data));

// 市场列表
export const gameListAPI = (data) => axios.post('/game/list', data);

export const gameWaveAPI = (data) => axios.post('/game/wave', data);

export const gameWaveAllAPI = (data) => axios.post('/game/waveAll', data);

export const gameCateAPI = () => axios.get('/game/cate');

export const orderCreateAPI = (data) => axios.post('/order/create', data);

export const gameIndexAPI = (data) => axios.get('/game/index', { params: data });

export const orderAmountAPI = (data) => axios.post('/order/amount', data);

export const realTimeOddAPI = (data) => axios.get('/game/realtimeOdd', { params: data });

export const memberUpdateAPI = (data) => axios.post('/admin/member/update', data);

// 推广
export const memberPromotionLinkAPI = () => axios.get('/member/promotionLink');

export const memberPerformanceAPI = (data) => axios.get('/member/performance', { params: data });

export const memberSubPerformanceAPI = () => axios.get('/member/subPerformance');

// 優惠
export const getGamePromotionAPI = (data) => axios.get('/game/promotion', { params: data });

export const getGmaePromotionDetailAPI = (data, id) => axios.get(`/game/promotion/${id}`, { params: data });

// 聯繫plk
export const memberSetContactAPI = (data) => axios.post('/member/setContact', data);
