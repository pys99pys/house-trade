import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { PATH } from "../consts/path";
import { tradesQueryKeyAtom } from "./stores";
import { TradeQueryRequest, TradeQueryResponse, TradesQueryResponse } from "./types";

export const useTradesQueryKey = () => useRecoilValue(tradesQueryKeyAtom);
export const useSetTradesQueryKey = () => useSetRecoilState(tradesQueryKeyAtom);

export const useTradesQuery = (): UseQueryResult<TradesQueryResponse, unknown> => {
  const { cityCode, yearMonth } = useRecoilValue(tradesQueryKeyAtom);

  return useQuery({
    queryKey: [PATH.TRADES_API, cityCode, yearMonth],
    staleTime: 86_400,
    gcTime: 86_400,
    enabled: !!cityCode && !!yearMonth,
    queryFn: () => axios.get(`${PATH.TRADES_API}?cityCode=${cityCode}&yearMonth=${yearMonth}`),
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
