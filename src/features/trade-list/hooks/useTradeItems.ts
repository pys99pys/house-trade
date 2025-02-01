import { useMemo, useState } from "react";

import { useSavedAparts } from "@/entities/apart";
import { TradeItem, TradesQueryRequest } from "@/entities/trade";

import { PER_PAGE } from "../consts/table";
import { OrderType, TradeItemType } from "../models/types";
import { compareSavedApart, sliceItems, sortItems } from "../services/filters";

interface Params {
  queryKey: TradesQueryRequest;
  tradeItems: TradeItem[];
}

interface Return {
  tradeItems: TradeItemType[];
  page: number;
  order: OrderType;
  onChangePage: (nextPage: number) => void;
  onChangeOrder: (column: OrderType[0], direction?: OrderType[1]) => void;
}

export const useTradeItems = ({ queryKey, tradeItems: originTradeItems }: Params): Return => {
  const savedAparts = useSavedAparts();

  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<OrderType>(["tradeDate", "desc"]);

  const onChangePage = (nextPage: number) => {
    setPage(nextPage);
  };

  const onChangeOrder = (column: OrderType[0], direction?: OrderType[1]) => {
    if (direction) {
      setOrder([column, direction]);
    } else {
      setOrder([column, column === order[0] ? (order[1] === "asc" ? "desc" : "asc") : "asc"]);
    }
  };

  const savedApartsInRegion = useMemo(
    () => savedAparts.filter((item) => item.regionCode === queryKey.cityCode),
    [queryKey.cityCode, savedAparts]
  );

  const tradeItems = useMemo(() => {
    const sortedItems = sortItems(originTradeItems, order);
    const slicedItems = sliceItems(sortedItems, { page, perPage: PER_PAGE });

    return slicedItems.map((item) => ({ ...item, isSaved: compareSavedApart(savedApartsInRegion, item) }));
  }, [page, order, originTradeItems, savedApartsInRegion]);

  return { tradeItems, page, order, onChangePage, onChangeOrder };
};
