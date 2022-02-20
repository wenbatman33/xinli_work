import { defHttp } from '/@/utils/http/axios';
import { MemberResultModel, memberSearch, memberStatus, memberDetail, memberUpdate, MemberTagResultModel, walletDetail, DepositDetailModel, PromotionResultModel, CommentResultModel, LoginLogResultModel, DetailLogResultModel, WalletLogResultModel, BankcardResultModel, WithdrawDetailModel, BetResultModel, USDTResultModel} from './model/memberModal';


enum Api {
  GetMembers = '/backend/member/search',
  SetStatus = '/backend/member/status',
  SetDepositStatus = '/backend/member/deposit',
  SetWithdrawStatus = '/backend/member/withdraw',
  SetTagBatch = '/backend/member/tags',
  MemberDetail = '/backend/member/detail',
  ResetPassword = '/backend/member/password',
  MemberTag = '/backend/member/tag',
  WalletDetail = '/backend/member/detail/money',
  DepositDetail = '/backend/pay/deposit',
  WithdrawDetail = '/backend/withdrawal',
  PromotionDetail = '/backend/promotion/member/list',
  BetDetail = '/backend/bettinglog/search/summery',
  GetComments = '/backend/member/comments',
  SetComment = '/backend/member/comment',
  setPayGroup = '/backend/pay_group/member',
  AddBatchComment = '/backend/member/comments',
  LoginLog = '/backend/member/login/log/search',
  DetailLog = '/backend/memberdetaillogs/logs',
  WalletLog = '/backend/member/walletlogs/withdrawallist',
  GetBankcard = '/backend/member/bankcards',
  SetBankcard = '/backend/member/bankcard',
  defaultBankcard = '/backend/member/bankcard/default',
  GetUSDT = '/backend/member/usdts',
  SetUSDT = '/backend/member/usdt',
  defaultUSDT = '/backend/member/usdt/default',
  OtherCard = '/backend/member/bankcard/other',
}

export function GetMembers(params: memberSearch) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<MemberResultModel>({ url: `${Api.GetMembers}?${queryString}` });
}

export function SetStatus(params: memberStatus) {
  return defHttp.put({ url: Api.SetStatus, params });
}

export function SetDepositStatus(params: memberStatus) {
  return defHttp.put({ url: Api.SetDepositStatus, params });
}

export function SetWithdrawStatus(params: memberStatus) {
  return defHttp.put({ url: Api.SetWithdrawStatus, params });
}

export function SetTagBatch(params: { memberIDs: number[]; tagIDs: number[] }) {
  return defHttp.post({ url: Api.SetTagBatch, params });
}

export function GetMemberDetail(userID: number) {
  return defHttp.get<memberDetail>({ url: `${Api.MemberDetail}?id=${userID}` });
}

export function UpdateMemberDetail(params: memberUpdate) {
  return defHttp.put({ url: Api.MemberDetail, params });
}

export function ResetPassword(params: {id: number; password: string;}) {
  return defHttp.put({ url: Api.ResetPassword, params });
}

export function GetMemberTag(userID: number) {
  return defHttp.get<MemberTagResultModel>({ url: `${Api.MemberTag}?id=${userID}` });
}

export function SetMemberTag(params: {memberID: number; tagIDs: number[];}) {
  return defHttp.put({ url: Api.MemberTag, params });
}

export function WalletDetail(userID: number) {
  return defHttp.get<walletDetail>({ url: `${Api.WalletDetail}?id=${userID}` });
}

export function DepositDetail(memberID: number, start:string, end:string) {
  let between = '';
  if (start){
    between += `&createdAtStart=${start}`;
  }
  if (end){
    between += `&createdAtEnd=${end}`;
  }
  return defHttp.get<DepositDetailModel>({ url: `${Api.DepositDetail}?memberID=${memberID}${between}&status=3` });
}

export function WithdrawDetail(userID: number, start:string, end:string) {
  let between = '';
  if (start){
    between += `&start=${start}`;
  }
  if (end){
    between += `&end=${end}`;
  }
  return defHttp.get<WithdrawDetailModel>({ url: `${Api.WithdrawDetail}?id=${userID}${between}` });
}

export function PromotionDetail(memberID: number, start: string, end: string) {
  let between = '';
  if (start){
    between += `&createdAtStart=${start}`;
  }
  if (end){
    between += `&createdAtEnd=${end}`;
  }
  return defHttp.get<PromotionResultModel>({ url: `${Api.PromotionDetail}?memberID=${memberID}${between}` });
}

export function BetDetail(memberID: number, start: string, end: string) {
  let between = '';
  if (start){
    between += `&settlementTimeStart=${start}`;
  }
  if (end){
    between += `&settlementTimeEnd=${end}`;
  }
  return defHttp.get<BetResultModel>({ url: `${Api.BetDetail}?memberID=${memberID}${between}` });
}

export function GetComments(userID: number) {
  return defHttp.get<CommentResultModel>({ url: `${Api.GetComments}?id=${userID}` });
}

export function AddComment(params: {memberID: number; title: string; content: string;}) {
  return defHttp.post({ url: Api.SetComment, params });
}

export function AddBatchComment(params: {memberIDs: number[]; title: string; content: string;}) {
  return defHttp.post({ url: Api.AddBatchComment, params });
}

export function UpdateComment(params: {id: number; title: string; content: string;}) {
  return defHttp.put({ url: Api.SetComment, params });
}

export function setPayGroup(params: {payGroupID: number; memberAccounts: string;}) {
  return defHttp.post({ url: Api.setPayGroup, params });
}

export function GetLoginLog(params) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<LoginLogResultModel>({ url: `${Api.LoginLog}?${queryString}` });
}

export function DetailLog(params) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<DetailLogResultModel>({ url: `${Api.DetailLog}?${queryString}` });
}

export function WalletLog(params) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return defHttp.get<WalletLogResultModel>({ url: `${Api.WalletLog}?${queryString}` });
}

//銀行卡列表
export function GetBankcard(params: {userID: number;}) {
  return defHttp.get<BankcardResultModel>({ url: `${Api.GetBankcard}?id=${params.userID}` });
}
export function AddBankcard(params: {memberID: number; bankNo: string;}) {
  return defHttp.post({ url: Api.SetBankcard, params });
}
export function DeleteBankcard(id: number) {
  return defHttp.delete({ url: `${Api.SetBankcard}?id=${id}` });
}
export function SetDefaultBankcard(params: {memberID: number; bankCardID: string;}) {
  return defHttp.put({ url: Api.defaultBankcard, params });
}

//USDT列表
export function GetUSDT(params: {userID: number;}) {
  return defHttp.get<USDTResultModel>({ url: `${Api.GetUSDT}?id=${params.userID}` });
}
export function AddUSDT(params: {memberID: number; address: string;}) {
  return defHttp.post({ url: Api.SetUSDT, params });
}
export function DeleteUSDT(id: number) {
  return defHttp.delete({ url: `${Api.SetUSDT}?id=${id}` });
}
export function SetDefaultUSDT(params: {memberID: number; usdtID: string;}) {
  return defHttp.put({ url: Api.defaultUSDT, params });
}

//新增他人银行卡
export function SetOtherCard(params: {memberID: number; name: string;}) {
  return defHttp.put({ url: Api.OtherCard, params });
}