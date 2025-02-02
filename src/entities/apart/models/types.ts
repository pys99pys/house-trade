export interface GetApartResponseTradeItem {
  tradeDate: string;
  size: number;
  floor: number;
  tradeAmount: number;
}

export interface GetApartRequest {
  regionCode: string;
  apartName: string;
}

export interface GetApartResponse {
  address: string;
  housholdsCount: string;
  parking: string;
  floorAreaRatio: number;
  buildingCoverageRatio: number;
  tradeItems: GetApartResponseTradeItem[];
}

export interface SavedApartItem {
  regionCode: string;
  address: string;
  apartName: string;
}
