import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { PATH } from "../consts/path";
import { tradesQueryKeyAtom } from "./stores";
import { TradesQueryResponse } from "./types";

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
