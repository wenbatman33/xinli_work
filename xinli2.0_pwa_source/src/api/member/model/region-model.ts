import { ApiResponse } from '@/api/basic-model';

/**
 * 區域物件
 */
 export interface RegionItem {
  id?: number;
  name?: string;
  level?: number;
  upid?: number;
  usetype?: number;
  displayOrder?: number;
}

/**
 * 區域查詢參數
 */
export interface GetRegionParams {
  /**
   * 上層id
   */
  upid?: number;
}

/**
 * 區域資料
 */
export interface GetRegionResponseData {
  list?: RegionItem[];
}

/**
 * 區域 API 返回資料
 */
export type GetRegionResponse = ApiResponse<GetRegionResponseData>;
