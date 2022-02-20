import { ApiResponse } from '@/api/basic-model';

/**
 * 等級物件
 */
export interface LevelItem {
  /**
   * VIP等級
   */
  level?: number;

  /**
   * 晉級需要注額
   */
  upgradeBetAmount?: number;

  /**
   * 保級維持注額
   */
  keepBetAmount?: number;

  /**
   * 晋级礼金
   */
  upgradeGift?: number;

  /**
   * 周年礼金
   */
  anniversaryGift?: number;

  /**
   * 月度礼金
   */
  monthlyGift?: number;

  /**
   * 真人返水比例
   */
  personRefund?: number;

  /**
   * 彩票返水比例
   */
  lotteryRefund?: number;

  /**
   * 体育返水比例
   */
  sportRefund?: number;

  /**
   * 电竞返水比例
   */
  esportRefund?: number;

  /**
   * 电子返水比例
   */
  electronicRefund?: number;

  /**
   * 单日提款额度上限
   */
  withdrawAmountLimit?: number;

  /**
   * 单日提款次数上限
   */
  withdrawTimesLimit?: number;
}

/**
 * 取得VIP資訊返回資訊
 */
export interface GetVipInfoResponseData {
  /**
   * 現在VIP等級
   */
  level?: number;

  /**
   * 累積VIP有效流水
   */
  totalBetAmount?: number;

  /**
   * 是否達到保級
   */
  isKeep?: boolean;

  /**
   * 當前等級資訊
   */
  current?: LevelItem;

  /**
   * 下一等級資訊
   */
  next?: LevelItem;
}

/**
 * 取得VIP資訊API返回資訊
 */
export type GetVipInfoResponse = ApiResponse<GetVipInfoResponseData>;

/**
 * 取得VIP設定返回資訊
 */
export interface GetVipSettingResponseData {
  /**
   * VIP資訊
   */
  list?: LevelItem[];
}

/**
 * 取得VIP設定API返回資訊
 */
export type GetVipSettingResponse = ApiResponse<GetVipSettingResponseData>;

/**
 * 可領取的資訊
 */
export interface GiftItem {
  /**
   * id
   */
  id?: number;

  /**
   * VIP等級
   */
  vipLevel?: number;

  /**
   * 領取狀態 1:已領取 2:未領取
   */
  status?: number;

  /**
   * 禮金
   */
  gift?: string;

  /**
   * 發放時間
   */
  createdAt?: string;

  /**
   * 領取時間
   */
   takenAt?: string;

  /**
   * 禮金類型 1:月礼金,2:晉級,3:週年,4:返水,5:生日礼
   */
  type?: number;

  /**
   * 返水遊戲類型 1:體育 2:真人 3:彩票 4:電競 5:電子
   */
  gameType?: number;

  /**
   * 禮金
   */
  money?: number;

  /**
   * 週期
   */
  peroid?: string;

  /**
   * 讀取狀態 1:已讀 2:未讀
   */
  read?: number;
}

/**
 * 返水統計資訊
 */
export interface SummaryItem {
  /**
   * 返水遊戲類型 1:體育 2:真人 3:彩票 4:電競 5:電子
   */
  gameType?: number;

  /**
   * 最高返水比例
   */
  percent?: number;

  /**
   * 發放總金額
   */
  money?: number;
}

/**
 * 取得VIP可領取資訊
 */
export interface GetVipGiftResponseData {
  /**
   * 可領取的資訊
   */
  list?: GiftItem[];

  /**
   * 返水統計資訊
   */
  summery?: SummaryItem[];
}

/**
 * 取得VIP可領取API返回資訊
 */
export type GetVipGiftResponse = ApiResponse<GetVipGiftResponseData>;

/**
 * 領取VIP禮金
 */
export interface PostVipGiftRequestData {
  /**
   * id
   */
  id?: number;
}

/**
 * 領取VIP禮金(依照類型)
 */
export interface PostVipGiftTypeRequestData {
  /**
   * 返水遊戲類型 1:體育 2:真人 3:彩票 4:電競 5:電子
   */
  type?: number;
}

/**
 * 已讀VIP禮金請求參數
 */
export interface PostVipGiftReadRequestData {
  /**
   * ids
   */
  ids?: number[];
}
