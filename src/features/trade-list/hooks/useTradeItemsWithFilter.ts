import { useMemo } from "react";

import { useSavedAparts } from "@/entities/apart";
import { GetTradesListItem, GetTradesRequest, useGetTradesQuery } from "@/entities/trade";

import { FilterType } from "../models/types";
import { filterApartName, filterBaseSize, filterSavedApart } from "../services/filters";

interface Params {
  queryKey: GetTradesRequest;
  filter: FilterType;
}

interface Return {
  tradeItems: GetTradesListItem[];
}

export const useTradeItemsWithFilter = ({ queryKey, filter }: Params): Return => {
  const { data } = useGetTradesQuery(queryKey);
  const savedAparts = useSavedAparts();

  const savedApartsInRegion = useMemo(
    () => savedAparts.filter((item) => item.regionCode === queryKey.regionCode),
    [queryKey.regionCode, savedAparts]
  );

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
