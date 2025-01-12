export interface TradeItem {
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

export interface TradesQueryRequest {
  cityCode: string;
  yearMonth: string;
}

export interface TradesQueryResponse {
  count: number;
  list: TradeItem[];
}
