import { useMemo } from "react";

import { useSavedAparts } from "@/entities/apart";
import { TradeItem, TradesQueryRequest, useTradesQuery, useTradesQueryKey } from "@/entities/trade";

import { FilterType } from "../models/types";
import { filterApartName, filterBaseSize, filterSavedApart } from "../services/filters";

interface Params {
  queryKey: TradesQueryRequest;
  filter: FilterType;
}

interface Return {
  tradeItems: TradeItem[];
}

export const useTradeItems = ({ queryKey, filter }: Params): Return => {
  const { data } = useTradesQuery(queryKey);
  const tradesQueryKey = useTradesQueryKey();
  const savedAparts = useSavedAparts();

  const savedApartsInRegion = useMemo(() => {
    return savedAparts.filter((item) => item.regionCode === tradesQueryKey.cityCode);
  }, [tradesQueryKey.cityCode, savedAparts]);

  const tradeItems = useMemo(() => {
    const list = data?.list ?? [];

    return list.filter(
      (item) =>
        filterApartName(item, filter) &&
        filterBaseSize(item, filter) &&
        filterSavedApart(item, filter, savedApartsInRegion)
    );
  }, [filter, savedApartsInRegion, data]);

  return { tradeItems };
};
