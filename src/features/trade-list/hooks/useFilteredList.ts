import { useMemo } from "react";

import { useSavedAparts } from "@/entities/apart";
import { TradeItem, TradesQueryRequest, useTradesQuery, useTradesQueryKey } from "@/entities/trade";

import { useFilterState } from "../models/hooks";
import { filterApartName, filterBaseSize, filterSavedApart } from "../services/filters";

interface Params {
  queryKey: TradesQueryRequest;
}

export const useFilteredList = ({ queryKey }: Params): TradeItem[] => {
  const { data } = useTradesQuery(queryKey);
  const tradesQueryKey = useTradesQueryKey();
  const filter = useFilterState();
  const savedAparts = useSavedAparts();

  const savedApartsInRegion = useMemo(() => {
    return savedAparts.filter((item) => item.regionCode === tradesQueryKey.cityCode);
  }, [tradesQueryKey.cityCode, savedAparts]);

  const filteredList = useMemo(() => {
    const list = data?.list ?? [];

    return list.filter(
      (item) =>
        filterApartName(item, filter) &&
        filterBaseSize(item, filter) &&
        filterSavedApart(item, filter, savedApartsInRegion)
    );
  }, [filter, savedApartsInRegion, data]);

  return filteredList;
};
