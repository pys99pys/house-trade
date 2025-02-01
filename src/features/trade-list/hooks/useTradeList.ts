import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegistSavedApart, useSavedAparts } from "@/entities/apart";
import { useRemoveSavedApart } from "@/entities/apart/models/hooks";
import { TradeItem, useTradesQuery, useTradesQueryKey } from "@/entities/trade";
import { ROUTE } from "@/shared/consts";
import { notification } from "@/shared/lib";

import { PER_PAGE } from "../consts/table";
import { useFilterState } from "../models/hooks";
import { OrderType } from "../models/types";
import { compareSavedApart, sliceItems, sortItems } from "../services/filters";
import { useFilteredList } from "./useFilteredList";

interface Return {
  isLoading: boolean;
  total: number;
  page: number;
  order: OrderType;
  items: TradeItem[];
  onChangePage: (page: number) => void;
  onChangeOrder: (key: OrderType) => void;
  onClickRow: (tradeItem: TradeItem) => void;
  onSaveApart: (tradeItem: TradeItem) => void;
  onRemoveApart: (tradeItem: TradeItem) => void;
}

export const useTradeList = (): Return => {
  const navigate = useNavigate();

  const { isLoading } = useTradesQuery({ cityCode: "", yearMonth: "" });
  const filteredList = useFilteredList({ queryKey: { cityCode: "", yearMonth: "" } });
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

  const onChangePage = (nextPage: number) => {
    setPage(nextPage);
  };

  const onChangeOrder = (nextOrder: OrderType) => {
    setOrder(nextOrder);
  };

  const onClickRow = (tradeItem: TradeItem) => {
    navigate(`${ROUTE.APART}/${tradesQueryKey.cityCode}/${tradeItem.apartName}`);
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

  return { isLoading, total, page, order, items, onChangePage, onChangeOrder, onClickRow, onSaveApart, onRemoveApart };
};
