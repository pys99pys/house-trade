import axios from "axios";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { PATH } from "../consts/path";
import { GetTradesRequest, GetTradesResponse, TradeQueryRequest, TradeQueryResponse } from "./types";

export const useGetTradesQuery = (params: GetTradesRequest): UseQueryResult<GetTradesResponse, unknown> => {
  return useQuery({
    queryKey: [PATH.TRADES_API, params],
    staleTime: 86_400,
    gcTime: 86_400,
    enabled: !!params.regionCode && !!params.yearMonth,
    queryFn: () => axios.get(`${PATH.TRADES_API}?regionCode=${params.regionCode}&yearMonth=${params.yearMonth}`),
    select: (res) => res.data,
  });
};

export const useTradeQuery = (params: TradeQueryRequest): UseQueryResult<TradeQueryResponse, unknown> => {
  return useQuery({
    queryKey: [PATH.TRADE_API, params],
    staleTime: 86_400,
    gcTime: 86_400,
    queryFn: () => axios.get(`${PATH.TRADE_API}?regionCode=${params.cityCode}&apartName=${params.apartName}`),
    select: (res) => res.data,
  });
};
