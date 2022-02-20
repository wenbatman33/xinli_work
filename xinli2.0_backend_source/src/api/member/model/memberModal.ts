import { ListFetchResult } from '/@/api/model/baseModel';

export interface member {
  id?: number;
  account: string;
  name: string;
  money: number;
  current_status: boolean;
  status: number;
  created_at: string;
  last_login_at: string;
  register_ip: string;
  last_login_ip: string;
  agency: string;
  payment_groups: string[];
  bankcard_groups: string[];
}

export interface memberSearch {
  page?: number;
  pageSize?: number;
  id?: number;
  account?: string;
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  payment_group?: number;
  bankcard_group?: number;
  last_login_at?: string;
  created_at_start?: string;
  created_at_end?: string;
  status?: number;
  deposit_limit?: boolean;
  withdraw_limit?: boolean;
  agency?: string;
  tag?: string;
  email_cert?: boolean;
  name_cert?: boolean;
  today_deposit?: number;
}
export interface memberStatus {
  memberIDs: number[];
  status: number;
  comment: string;
}

export interface paymentGroups {
  ID: number;
  type: number;
  name: string;
  nameEn: string;
  depositLower: number;
  depositUpper: number;
  remark: string;
  editFlag: number;
  payChannelServiceName: string;
  payChannelServiceCnt: number;
  memberCnt: number;
  updatedUser: number;
  updatedUserName: string;
  updatedAt: string;
}

export interface bankcardGroups {
  ID: number;
  type: number;
  name: string;
  nameEn: string;
  depositLower: number;
  depositUpper: number;
  remark: string;
  editFlag: number;
  payChannelServiceName: string;
  payChannelServiceCnt: number;
  memberCnt: number;
  updatedUser: number;
  updatedUserName: string;
  updatedAt: string;
}
export interface memberDetail {
  account: string;
  id: number;
  name: string;
  phone: string;
  phoneArea: string;
  email: string;
  address: string;
  ip: string;
  ipArea: string;
  status: number;
  depositLimit: number;
  withdrawLimit: number;
  bankcardArea: string;
  currentStatus: boolean;
  agency: string;
  paymentGroups: paymentGroups;
  bankcardGroups: bankcardGroups;
}

export interface memberUpdate {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: number;
  depositLimit: number;
  withdrawLimit: number;
}

export interface memberTag {
  id: number;
  name: string;
  tagGroupID: number;
  updatedAt: string;
  createdAt: string;
}

export interface walletDetail{
  totalMoney: number;
  totalLock: number;
  totalDeposit: number;
  totalWithdraw: number;
  totalWin: number;
  totalBonus: number;
  totalRate: number;
  totalRefound: number
}

export interface DepositDetailModel {
  count: number;
  amount: number;
  fee: number;
  avg: number;
  max: number;
  list: [
    {
      id: string;
      type: number;
      memberName: string;
      memberAccount: string;
      memberID: number;
      payChannelServiceID: number;
      amount: number;
      fee: number;
      status: number;
      payGroupId: number;
      bankcardGroupId: number;
      depositName: string;
      gatway: string;
      payment: string;
      thirdID: string;
      bankcard: string;
      currency: number;
      exchangeRate: number;
      device: number;
      balanceDate: string;
      editorName: string;
      createdAt: string;
      action: string;
      note: string;
      updatedAt: string;
    }
  ]
}

export interface promotionDetail {
  ID: number;
  memberAccount: string;
  bonus: number;
  status: number;
  sendAt: string;
  promotionName: string;
  promotionID: number;
  promotionCondTypes: number[];
  batchID: number;
  batchCycle: string;
  updatedAt: string;
  updatedUser: string;
  statusAction: string[];
}

export interface betDetail {
  gameType: string;
  gameAgency: string;
  limitAmount: number;
  betAmount: number;
  winAmount: number;
}

export interface WithdrawDetailModel {
  list: [
    {
      transactionID: string;
      transactionTime: string;
      amount: number;
      status: [
        {
          key: string;
          value: string
        }
      ];
      bankGroup: [
        {
          key: string;
          value: string
        }
      ];
      thirdGroup: [
        {
          key: string;
          value: string
        }
      ];
      member: [
        {
          key: string;
          value: string
        }
      ];
      bankAccount: string;
      bankCode: string;
      memberBankNo: string;
      financialCheck: [
        {
          key: string;
          value: string
        }
      ];
      riskCheck: [
        {
          key: string;
          value: string
        }
      ];
      checkNote: [
        string
      ];
      lastUpdate: string;
      updatedBy: string;
      creditDate: string
    }
  ];
  count: number;
  max: number;
  avg: number;
  total: number;
  fee: number
}

export interface comment {
  id: number;
  category: string;
  title: string;
  content: string;
  creator: string;
  creatorID: number;
  updator: string;
  updatorID: number;
  createdAt: string;
  updatedAt: string;
}

export interface loginLog {
  id: number;
  memberID: number;
  account: string;
  name: string;
  registeredAt: string;
  registerDevice: string;
  registerIP: string;
  loginDeviceType: number;
  loginDeviceID: string;
  loginArea: string;
  loginIP: string;
  failReason: number;
  createdAt: string;
  success: number;
}

export interface detailLog{
  logID: string;
  account: string;
  action: number;
  target: number;
  subData: [
    {
      column: number;
      oldValue: number;
      newValue: number;
    }
  ];
  time: number;
}

export interface walletLog{
  id: number;
  date: string;
  inOut: number;
  type: number;
  before: number;
  amount: number;
  after: number;
  turnoverMultiple: string;
  turnoverLimit: number;
  note: string;
  refID: string;
}

export interface bankcard{
  memberID: number;
  bankAccount: string;
  bankCode: string;
  bankNo: string;
  area: string;
  branch: string;
  isDefault: boolean;
  status: number;
  createdAt: string;
  updatedAt: string
}

export interface USDT{
  id: number;
  memberID: number;
  address: string;
  isDefault: boolean;
  status: number;
  type: number;
  createdAt: string;
  updatedAt: string
}


export type MemberResultModel = ListFetchResult<member>;
export type MemberTagResultModel = ListFetchResult<memberTag>;
export type PromotionResultModel = ListFetchResult<promotionDetail>;
export type BetResultModel = ListFetchResult<betDetail>;
export type CommentResultModel = ListFetchResult<comment>;
export type LoginLogResultModel = ListFetchResult<loginLog>;
export type DetailLogResultModel = ListFetchResult<detailLog>;
export type WalletLogResultModel = ListFetchResult<walletLog>;
export type BankcardResultModel = ListFetchResult<bankcard>;
export type USDTResultModel = ListFetchResult<USDT>;