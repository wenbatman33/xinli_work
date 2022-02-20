import { ApiResponse } from '@/api/basic-model';

/**
 * 注單列表查詢參數
 */
export interface GetGameLogListParams {
  /**
   * 第幾頁
   */
  page?: number;

  /**
   * 每頁筆數
   */
  pageSize?: number;

  /**
   * 會員id
   */
  memberID?: number;

  /**
   * 會員帳號
   */
  memberAccount?: string;

  /**
   * 開始時間
   */
  startTime?: string;

  /**
   * 結束時間
   */
  endTime?: string;
}

/**
 * 遊戲注單物件
 */
export interface GameLogListItem {
  /**
   * 產品
   */
  gameGroup?: string;

  /**
   * 筆數
   */
  count?: number;

  /**
   * 投注流水
   */
  stake?: number;

  /**
   * 輸贏
   */
  winAmount?: number;
}

/**
 * 注單列表返回資訊
 */
export interface GetGameLogListResponseData {
  /**
   * 遊戲列表
   */
  list?: GameLogListItem[];

  /**
   * 總筆數
   */
  count?: number;

  /**
   * 總流水
   */
  totalWinAmount?: number;

  /**
   * 總輸贏
   */
  totalBetAmount?: number;
}

/**
 * 注單列表 API 返回資訊
 */
export type GetGameLogListResponse = ApiResponse<GetGameLogListResponseData>;

/**
 * 老虎機注單物件
 */
export interface SlotLogListItem {
  /**
   * 產品
   */
  listName?: string;

  /**
   * 投注時間
   */
  betTime?: string;

  /**
   * 投注金額
   */
  betAmount?: number;

  /**
   * 輸贏
   */
  winAmount?: number;
}

/**
 * 老虎機注單返回資訊
 */
export interface GetSlotLogListResponseData {
  /**
   * 遊戲列表
   */
  list?: SlotLogListItem[];

  /**
   * 總筆數
   */
  count?: number;
}

/**
 * 老虎機注單 API 返回資訊
 */
export type GetSlotLogListResponse = ApiResponse<GetSlotLogListResponseData>;

/**
 * 電競體育類注單物件
 */
export interface EsportLogListItem {
  /**
   * 項目類型
   */
  listName?: string;

  /**
   * 投注類型
   */
  betType?: string;

  /**
   * 投注時間
   */
  betTime?: string;

  /**
   * 投注金額
   */
  betAmount?: number;

  /**
   * 賠率
   */
  odds?: number;

  /**
   * 輸贏
   */
  winAmount?: number;

  /**
   * 已結算
   */
  isSettle?: number;
}

/**
 * 電競體育類注單詳情返回資訊
 */
export interface GetEsportLogListResponseData {
  /**
   * 遊戲列表
   */
  list?: EsportLogListItem[];

  /**
   * 總筆數
   */
  count?: number;
}

/**
 * 電競體育類注單詳情 API 返回資訊
 */
export type GetEsportLogListResponse = ApiResponse<GetEsportLogListResponseData>;

/**
 * 彩票類注單物件
 */
export interface LotteryLogListItem {
  /**
   * 項目類型
   */
  listName?: string;

  /**
   * 投注類型
   */
  betType?: string;

  /**
   * 投注時間
   */
  betTime?: string;

  /**
   * 投注金額
   */
  betAmount?: number;

  /**
   * 賠率
   */
  odds?: number;

  /**
   * 輸贏
   */
  winAmount?: number;

  /**
   * 已結算
   */
  isSettle?: number;
}

/**
 * 彩票類注單詳情返回資訊
 */
export interface GetLotteryLogListResponseData {
  /**
   * 遊戲列表
   */
  list?: LotteryLogListItem[];

  /**
   * 總筆數
   */
  count?: number;
}

/**
 * 彩票類注單詳情 API 返回資訊
 */
export type GetLotteryLogListResponse = ApiResponse<GetLotteryLogListResponseData>;

/**
 * 補魚類注單物件
 */
export interface FishLogListItem {
  /**
   * 產品
   */
  listName?: string;

  /**
   * 投注時間
   */
  betTime?: string;

  /**
   * 投注金額
   */
  betAmount?: number;

  /**
   * 輸贏
   */
  winAmount?: number;
}

/**
 * 補魚類注單詳情返回資訊
 */
export interface GetFishLogListResponseData {
  /**
   * 遊戲列表
   */
  list?: FishLogListItem[];

  /**
   * 總筆數
   */
  count?: number;
}

/**
 * 補魚類注單詳情 API 返回資訊
 */
export type GetFishLogListResponse = ApiResponse<GetFishLogListResponseData>;

/**
 * 體育類注單物件
 */
export interface SportBetListItem {
  /**
   * 主隊
   */
  aTeam?: string;

  /**
   * 客隊
   */
  bTeam?: string;

  /**
   * 聯賽名稱
   */
  league?: string;

  /**
   * 賠率
   */
  odds?: number;

  /**
   * 玩法
   */
  betType?: string;

  /**
   * 投注內容
   */
  betContent?: string;
}

/**
 * 體育類注單物件
 */
export interface SportLogListItem {
  /**
   * 產品
   */
  listName?: string;

  /**
   * 注單號碼
   */
  betID?: string;

  /**
   * 串關
   */
  betSingleCombo?: number;

  /**
   * 盤口
   */
  oddsType?: number;

  /**
   * 投注時間
   */
  betTime?: string;

  /**
   * 投注金額
   */
  betAmount?: number;

  /**
   * 輸贏
   */
  winAmount?: number;

  /**
   * 已結算
   */
  isSettle?: number;

  /**
   * 提前結算
   */
  preSettle?: number;

  /**
   * 提前結算金額
   */
  preSettleAmount?: number;

  /**
   * 提前結算投注額
   */
  preSettleBetAmount?: number;

  /**
   * 提前結算輸贏
   */
  preSettleWinAmount?: number;

  /**
   * 提前結算派發金額
   */
  preSettlementAmount?: number;

  /**
   * 提前結算剩餘投注額
   */
  preSettleBalance?: number;
}

/**
 * 體育類注單詳情返回資訊
 */
export interface GetSportLogListResponseData {
  /**
   * 遊戲列表
   */
  list?: SportLogListItem[];

  /**
   * 總筆數
   */
  count?: number;
}
/**
 * 體育類注單詳情 API 返回資訊
 */
export type GetSportLogListResponse = ApiResponse<GetSportLogListResponseData>;

/**
 * 所有注單詳情資料結構
 */
export type CombinedLogItem = SlotLogListItem | EsportLogListItem | LotteryLogListItem | FishLogListItem | SportLogListItem