export interface UcardParams {
  name: string;
  type: number;
  useType: number;
  address: string;
  originalAmount?: number;
}

export interface UcardMoneyInOut {
  id: number;
  targetID: number;
  amount: number;
  exchangeRate: number;
  exchangeAmount: number;
  fee: number;
}