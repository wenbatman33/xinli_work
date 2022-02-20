export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T extends any> {
  items: T[];
  total: number;
}

export interface ListFetchResult<T extends any> {
  list: T[];
  count: number;
}