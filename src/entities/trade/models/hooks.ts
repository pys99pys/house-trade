import axios from "axios";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { GetTradesRequest, GetTradesResponse, TradeQueryRequest, TradeQueryResponse } from "./types";

export const useGetTradesQuery = (params: GetTradesRequest): UseQueryResult<GetTradesResponse, unknown> => {
  return useQuery({
    queryKey: ["getTrades", params],
    staleTime: 86_400,
    gcTime: 86_400,
    enabled: !!params.regionCode && !!params.yearMonth,
    queryFn: () => axios.get(`/api/trades?regionCode=${params.regionCode}&yearMonth=${params.yearMonth}`),
    select: (res) => res.data,
  });
};

export const useTradeQuery = (params: TradeQueryRequest): UseQueryResult<TradeQueryResponse, unknown> => {
  return useQuery({
    queryKey: ["trade", params],
    staleTime: 86_400,
    gcTime: 86_400,
    queryFn: () => axios.get(`/api/apart?regionCode=${params.regionCode}&apartName=${params.apartName}`),
    select: (res) => res.data,
  });
};
