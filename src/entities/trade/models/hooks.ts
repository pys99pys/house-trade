import axios from "axios";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { PATH } from "../consts/path";
import { TradeQueryRequest, TradeQueryResponse, TradesQueryRequest, TradesQueryResponse } from "./types";

export const useTradesQuery = (queryKey: TradesQueryRequest): UseQueryResult<TradesQueryResponse, unknown> => {
  return useQuery({
    queryKey: [PATH.TRADES_API, queryKey],
    staleTime: 86_400,
    gcTime: 86_400,
    enabled: !!queryKey.cityCode && !!queryKey.yearMonth,
    queryFn: () => axios.get(`${PATH.TRADES_API}?cityCode=${queryKey.cityCode}&yearMonth=${queryKey.yearMonth}`),
    select: (res) => res.data,
  });
};

export const useTradeQuery = (params: TradeQueryRequest): UseQueryResult<TradeQueryResponse, unknown> => {
  return useQuery({
    queryKey: [PATH.TRADE_API, params],
    staleTime: 86_400,
    gcTime: 86_400,
    queryFn: () => axios.get(`${PATH.TRADE_API}?cityCode=${params.cityCode}&apartName=${params.apartName}`),
    select: (res) => res.data,
  });
};
