import { ApiResponse } from '@/api/basic-model';

/**
 * 會員詳細資料
 */
export interface MeData {
  /**
   * 帳號
   */
  account?: string;

  /**
   * ID
   */
  id?: number;

  /**
   * 姓名
   */
  name?: string;

  /**
   * 電話
   */
  phone?: string;

  /**
   * 手機是否驗證, 2未驗證, 1已驗證, 其他再定
   */
  phoneCert?: string;

  /**
   * email
   */
  email?: string;

  /**
   * email是否驗證, 2未驗證, 1已驗證, 其他再定
   */
  emailCert?: string;

  /**
   * 地址
   */
  address?: string;

  /**
   * 街道ID
   */
  streetID?: number;

  /**
   * 區域ID
   */
  stateID?: number;

  /**
   * 城市ID
   */
  cityID?: number;

  /**
   * 省份ID
   */
  provinceID?: number;

  /**
   * 存款狀態
   */
  depositLimit?: number;

  /**
   * 提款狀態
   */
  withdrawLimit?: number;

  /**
   * QQ號
   */
  qqID?: string;

  /**
   * 微信號
   */
  wechatID?: string;

  /**
   * 生日
   */
  birthday?: string;

  /**
   * 性別 1:男 2:女
   */
  gender?: number;

  /**
   * 允許新增他人銀行卡
   */
  allowOtherBankCard?: boolean;

  /**
   * 他人銀行卡的實名
   */
  otherBankCardName?: string;
}

/**
 * 取得會員詳細資料 API 返回
 */
export type GetMeResponse = ApiResponse<MeData>;

/**
 * 修改會員實名請求資訊
 */
export interface PutNameRequestData {
  /**
   * 姓名
   */
  name?: string;
}

/**
 * 發送手機驗證碼請求資訊
 */
export interface PostPhoneRequestData {
  /**
   * 手機號
   */
  phone?: string;
}

/**
 * 發送手機驗證碼返回資訊
 */
export interface PostPhoneResponseData {
  /**
   * 驗證用secret
   */
  secret?: string;
}

/**
 * 發送手機驗證碼 API 返回資訊
 */
export type PostPhoneResponse = ApiResponse<PostPhoneResponseData>;

/**
 * 修改會員手機請求資訊
 */
export interface PutPhoneRequestData {
  /**
   * 驗證用secret
   */
  secret?: string;

  /**
   * 驗證碼
   */
  code?: string;
}

/**
 * 修改會員信箱請求資訊
 */
export interface PutEmailRequestData {
  /**
   * email
   */
  email?: string;
}

/**
 * 驗證舊密碼請求資訊
 */
export interface PostPasswordRequestData {
  /**
   * 密碼
   */
  password?: string;
}

/**
 * 驗證舊密碼返回資訊
 */
export interface PostPasswordResponseData {
  /**
   * 驗證用secret
   */
  secret?: string;
}

/**
 * 驗證舊密碼 API 返回資訊
 */
export type PostPasswordResponse = ApiResponse<PostPasswordResponseData>;

/**
 * 修改會員密碼請求資訊
 */
export interface PutPasswordRequestData {
  /**
   * 密碼
   */
  password?: string;

  /**
   * 驗證用secret
   */
  secret?: string;
}

/**
 * 修改會員資料請求資訊
 */
export interface PutDetailRequestData {
  /**
   * 地址
   */
  address?: string;

  /**
   * 街道ID
   */
  streetID?: number;

  /**
   * 區域ID
   */
  stateID?: number;

  /**
   * 城市ID
   */
  cityID?: number;

  /**
   * 省份ID
   */
  provinceID?: number;

  /**
   * QQ號
   */
  qqID?: string;

  /**
   * 微信號
   */
  wechatID?: string;

  /**
   * 性別 1:男 2:女
   */
  gender?: number;

  /**
   * 生日
   */
  birthday?: string;
}

/**
 * 銀行卡物件
 */
export interface BankcardItem {
  /**
   * ID
   */
  id?: number;

  /**
   * 會員ID
   */
  memberID?: number;

  /**
   * 戶名
   */
  bankAccount?: string;

  /**
   * 開戶行
   */
  bankCode?: string;

  /**
   * 帳號
   */
  bankNo?: string;

  /**
   * 區域
   */
  area?: string;

  /**
   * 分行
   */
  branch?: string;

  /**
   * 預設卡
   */
  isDefault?: boolean;

  /**
   * 狀態
   */
  status?: number;

  /**
   * 建立時間
   */
  createdAt?: string;

  /**
   * 更新時間
   */
  updatedAt?: string;
}

/**
 * 取得會員銀行卡返回資訊
 */
export interface GetBankcardsResponseData {
  /**
   * 會員銀行卡
   */
  list?: BankcardItem[];
}

/**
 * 取得會員銀行卡 API 返回資訊
 */
export type GetBankcardsResponse = ApiResponse<GetBankcardsResponseData>;

/**
 * 新增會員銀行卡請求資訊
 */
export interface PostBankcardRequestData {
  /**
   * 銀行卡號(全數字，18-22碼)
   */
  bankNo?: string;

  /**
   * 實名
   */
  name?: string;
}

/**
 * 刪除會員銀行卡請求資訊
 */
export interface DeleteBankcardParams {
  /**
   * 銀行卡id
   */
  id?: string;
}

/**
 * 新增他人銀行卡請求資訊
 */
export interface PostBankcardOtherRequestData {
  /**
   * 銀行卡號(全數字，18-22碼)
   */
  bankNo?: string;

  /**
   * 實名
   */
  name?: string;
}

/**
 * USDT物件
 */
export interface USDTItem {
  /**
   * ID
   */
  id?: number;

  /**
   * 會員ID
   */
  memberID?: number;

  /**
   * 暱稱
   */
  name?: string;

  /**
   * 地址
   */
  address?: string;

  /**
   * 預設卡
   */
  isDefault?: true;

  /**
   * 狀態
   */
  status?: number;

  /**
   * 類型 1: ERC 2: TRC
   */
  type?: number;

  /**
   * 建立時間
   */
  createdAt?: string;

  /**
   * 更新時間
   */
  updatedAt?: string;
}

/**
 * 取得會員USDT返回資訊
 */
export interface GetUSDTSResponseData {
  /**
   * 會員USDT
   */
  list?: USDTItem[];
}

/**
 * 取得會員USDT API 返回資訊
 */
export type GetUSDTSResponse = ApiResponse<GetUSDTSResponseData>;

/**
 * 驗證驗證碼請求資訊
 */
export interface PostSmsRequestData {
  /**
   * 驗證碼
   */
  code?: string;

  /**
   * 驗證用secret
   */
  secret?: string;
}

/**
 * 新增會員USDT請求資訊
 */
export interface PostUSDTRequestData {
  /**
   * 地址
   */
  address?: string;

  /**
   * 暱稱
   */
  name?: string;

  /**
   * 類型 1: ERC 2: TRC
   */
  type?: number;

  /**
   * 驗證用secret
   */
  secret?: string;
}

/**
 * 刪除會員USDT請求資訊
 */
export interface DeleteUSDTParams {
  /**
   * id
   */
  id?: number;
}
