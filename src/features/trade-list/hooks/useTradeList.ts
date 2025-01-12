import { useEffect, useMemo, useState } from "react";

import { useRegistSavedApart, useSavedAparts } from "@/entities/apart";
import { useRemoveSavedApart } from "@/entities/apart/models/hooks";
import { TradeItem, useTradesQuery, useTradesQueryKey } from "@/entities/trade";
import { notification } from "@/shared/lib";

import { PER_PAGE } from "../consts/table";
import { Item, OrderType } from "../models/types";
import { compareSavedApart, sliceItems, sortItems } from "../services/filters";
import { useFilterState } from "./useFilterForm";
import { useFilteredList } from "./useFilteredList";

interface Return {
  isLoading: boolean;
  total: number;
  page: number;
  order: OrderType;
  items: Item[];
  onChangePage: (page: number) => void;
  onChangeOrder: (key: OrderType[0]) => void;
  onSaveApart: (tradeItem: TradeItem) => void;
  onRemoveApart: (tradeItem: TradeItem) => void;
}

export const useTradeList = (): Return => {
  const { isLoading } = useTradesQuery();
  const { filteredList } = useFilteredList();
  const filter = useFilterState();
  const tradesQueryKey = useTradesQueryKey();
  const savedAparts = useSavedAparts();

  const registSavedApart = useRegistSavedApart();
  const removeSavedApart = useRemoveSavedApart();

  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<OrderType>(["tradeDate", "desc"]);

  const total = filteredList.length ?? 0;

  const savedApartsInRegion = useMemo(() => {
    return savedAparts.filter((item) => item.regionCode === tradesQueryKey.cityCode);
  }, [tradesQueryKey.cityCode, savedAparts]);

  const items = useMemo(() => {
    const sortedItems = sortItems(filteredList, order);
    const slicedItems = sliceItems(sortedItems, { page, perPage: PER_PAGE });
    const mappedItems = slicedItems.map((item) => ({ ...item, isSaved: compareSavedApart(savedApartsInRegion, item) }));

    return mappedItems;
  }, [page, order, filteredList, savedApartsInRegion]);

  useEffect(() => setPage(1), [filter]);

  const onChangePage = (nextPage: number) => {
    setPage(nextPage);
  };

  const onChangeOrder = (key: OrderType[0]) => {
    setOrder((prev) => [key, key === prev[0] ? (prev[1] === "asc" ? "desc" : "asc") : "asc"]);
  };

  const onSaveApart = (tradeItem: TradeItem) => {
    registSavedApart({
      regionCode: tradesQueryKey.cityCode,
      address: tradeItem.address,
      apartName: tradeItem.apartName,
    });

    notification("저장 완료", `[${tradeItem.apartName}] 저장 목록에 추가되었습니다.`);
  };

  const onRemoveApart = (tradeItem: TradeItem) => {
    removeSavedApart({
      regionCode: tradesQueryKey.cityCode,
      address: tradeItem.address,
      apartName: tradeItem.apartName,
    });

    notification("삭제 완료", `[${tradeItem.apartName}] 저장 목록에서 삭제되었습니다.`);
  };

  return { isLoading, total, page, order, items, onChangePage, onChangeOrder, onSaveApart, onRemoveApart };
};
