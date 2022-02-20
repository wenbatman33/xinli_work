/**
 * Use type
 */
export interface UseType {
  /**
   * useTypeID
   */
  useTypeID?: number;

  /**
   * type 名稱
   */
  useTypeName?: string;
}

/**
 * Get use type result model
 */
export interface GetUseTypeResultModel {
  list?: UseType[];
}
/**
 * InOut type
 */
export interface InOutType {
  /**
   * inOutTypeID
   */
  inOutTypeID?: number;

  /**
   * type 名稱
   */
  inOutTypeName?: string;
}

/**
 * Get in-out type result model
 */
export interface GetInOutTypeResultModel {
  list?: InOutType[];
}
