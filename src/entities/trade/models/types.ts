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

export interface TradeQueryRequest {
  cityCode: string;
  apartName: string;
}

export interface TradeQueryResponse {
  address: string;
  housholdsCount: string;
  parking: string;
  floorAreaRatio: number;
  buildingCoverageRatio: number;
  tradeItems: {
    tradeDate: string;
    size: number;
    floor: number;
    tradeAmount: number;
  }[];
}
