/**
 * Default language code
 */
export const DEFAULT_LNAG = 'cn';

/**
 * SMS verify retry seconds
 */
export const SMS_RETRY_SECONDS = 90;

/**
 * Email verify retry seconds
 */
export const EMAIL_RETRY_SECONDS = 90;

/**
 * Deposit available minutes
 */
export const DEPOSIT_AVAILABLE_MINUTES = 30;

/**
 * Add altcoin timeout seconds
 */
export const ADD_ALTCOIN_TIMEOUT_SECONDS = 300;

/**
 * Local storage keys
 */
export enum LocalStorageKeys {
  /**
   * Language code
   */
  LANG = 'LANG',

  /**
   * Authorization token
   */
  TOKEN = 'TOKEN',

  /**
   * Member id
   */
  MEMBER_ID = 'MEMBER_ID',

  /**
   * Member account
   */
  MEMBER_ACCOUNT = 'MEMBER_ACCOUNT',

  /**
   * Force two phase
   */
  FORCE_TWO_PHASE = 'FORCE_TWO_PHASE',

  /**
   * Force change password
   */
  FORCE_CHANGE_PASSWORD = 'FORCE_CHANGE_PASSWORD',

  /**
   * SMS timeout
   */
  SMS_TIMEOUT = 'SMS_TIMEOUT',

  /**
   * Email timeout
   */
  EMAIL_TIMEOUT = 'EMAIL_TIMEOUT',

  /**
   * Skip deposit browser block hint
   */
  SKIP_DEPOSIT_BLOCK_HINT = 'SKIP_DEPOSIT_BLOCK_HINT',
}
