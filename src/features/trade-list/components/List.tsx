import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { GetTradesRequest, GetTradesResponseListItem, useGetTradesQuery } from "@/entities/trade";
import { useIsMobile } from "@/shared/models";

import { useTradeItem } from "../hooks/useTradeItem";
import { useTradeItems } from "../hooks/useTradeItems";
import { FilterType } from "../models/types";
import ListItems from "../ui/ListItems";
import ListTable from "../ui/ListTable";

interface ListProps {
  tradeItems: GetTradesResponseListItem[];
  queryKey: GetTradesRequest;
  filter: FilterType;
}

const List: FC<ListProps> = ({ tradeItems: originTradeItems, queryKey, filter }) => {
  const { isLoading } = useGetTradesQuery(queryKey);

  const { tradeItems, page, order, onChangePage, onChangeOrder } = useTradeItems({
    queryKey,
    originTradeItems,
  });

  const { onSelectItem, onSaveApart, onRemoveApart } = useTradeItem({ queryKey, page });

  const location = useLocation();
  const isMobile = useIsMobile();
  const totalCount = originTradeItems.length;

  useEffect(() => {
    if (!location.state?.page) {
      onChangePage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey, filter]);

  return isMobile ? (
    <ListItems
      isLoading={isLoading}
      totalCount={totalCount}
      tradeItems={tradeItems}
      page={page}
      order={order}
      onChangePage={onChangePage}
      onChangeOrder={onChangeOrder}
      onSelectApart={onSelectItem}
      onSaveApart={onSaveApart}
      onRemoveApart={onRemoveApart}
    />
  ) : (
    <ListTable
      isLoading={isLoading}
      totalCount={totalCount}
      tradeItems={tradeItems}
      page={page}
      order={order}
      onChangePage={onChangePage}
      onChangeOrder={onChangeOrder}
      onSelectApart={onSelectItem}
      onSaveApart={onSaveApart}
      onRemoveApart={onRemoveApart}
    />
  );
};

export default List;
