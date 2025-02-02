export interface GetTradesResponseListItem {
  isNewRecord: boolean;
  apartName: string;
  address: string;
  buildedYear: number | null;
  householdsNumber: number | null;
  tradeDate: string;
  size: number | null;
  floor: number | null;
  tradeAmount: number;
  maxTradeAmount: number;
}

export interface GetTradesRequest {
  regionCode: string;
  yearMonth: string;
}

export interface GetTradesResponse {
  count: number;
  list: GetTradesResponseListItem[];
}
