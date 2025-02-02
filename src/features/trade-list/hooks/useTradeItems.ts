import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { useSavedAparts } from "@/entities/apart";
import { GetTradesListItem, GetTradesRequest } from "@/entities/trade";

import { PER_PAGE } from "../consts/table";
import { OrderType, TradeItem } from "../models/types";
import { compareSavedApart, sliceItems, sortItems } from "../services/filters";

interface Params {
  queryKey: GetTradesRequest;
  originTradeItems: GetTradesListItem[];
}

interface Return {
  tradeItems: TradeItem[];
  page: number;
  order: OrderType;
  onChangePage: (nextPage: number) => void;
  onChangeOrder: (column: OrderType[0], direction?: OrderType[1]) => void;
}

export const useTradeItems = ({ queryKey, originTradeItems }: Params): Return => {
  const location = useLocation();
  const savedAparts = useSavedAparts();

  const [page, setPage] = useState<number>(location.state?.page ?? 1);
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
