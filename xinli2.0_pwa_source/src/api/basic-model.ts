/**
 * Api response interface
 */
export interface ApiResponse<T> {
  data?: T;
  datetime?: string;
  msgCode?: number;
  status?: string;
  statusCode?: number;
  traceid?: string;
}

/**
 * Error handler
 */
export type ErrorHandler = (code: number, msg: string) => boolean;
