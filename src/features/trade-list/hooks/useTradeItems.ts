import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { useSavedAparts } from "@/entities/apart";
import { GetTradesRequest, GetTradesResponseListItem } from "@/entities/trade";
import { STORAGE_KEY } from "@/shared/consts";
import { getValue, setValue } from "@/shared/lib";

import { PER_PAGE } from "../consts/table";
import { OrderType, TradeItem } from "../models/types";
import { compareSavedApart, sliceItems, sortItems } from "../services/filters";

interface Params {
  queryKey: GetTradesRequest;
  originTradeItems: GetTradesResponseListItem[];
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
  const [order, setOrder] = useState<OrderType>(getValue(STORAGE_KEY.LAST_TRADE_LIST_ORDER) ?? ["tradeDate", "desc"]);

  const onChangePage = (nextPage: number) => {
    setPage(nextPage);
  };

  const onChangeOrder = (column: OrderType[0], direction?: OrderType[1]) => {
    let nextOrder: OrderType | null = null;

    if (direction) {
      nextOrder = [column, direction];
    } else {
      nextOrder = [column, column === order[0] ? (order[1] === "asc" ? "desc" : "asc") : "asc"];
    }

    setOrder(nextOrder);
    setValue(STORAGE_KEY.LAST_TRADE_LIST_ORDER, nextOrder);
  };

  const savedApartsInRegion = useMemo(
    () => savedAparts.filter((item) => item.regionCode === queryKey.regionCode),
    [queryKey.regionCode, savedAparts]
  );

  const tradeItems = useMemo(() => {
    const sortedItems = sortItems(originTradeItems, order);
    const slicedItems = sliceItems(sortedItems, { page, perPage: PER_PAGE });

    return slicedItems.map((item) => ({ ...item, isSaved: compareSavedApart(savedApartsInRegion, item) }));
  }, [page, order, originTradeItems, savedApartsInRegion]);

  return { tradeItems, page, order, onChangePage, onChangeOrder };
};
