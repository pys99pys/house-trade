export interface GetTradesListItem {
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
  list: GetTradesListItem[];
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
