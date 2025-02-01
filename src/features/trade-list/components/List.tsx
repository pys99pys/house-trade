import { FC, useEffect } from "react";

import { GetTradesListItem, GetTradesRequest, useGetTradesQuery } from "@/entities/trade";
import { useIsMobile } from "@/shared/models";

import { useApartItem } from "../hooks/useApartItem";
import { useTradeItems } from "../hooks/useTradeItems";
import { FilterType } from "../models/types";
import ListItems from "../ui/ListItems";
import ListTable from "../ui/ListTable";

interface ListProps {
  tradeItems: GetTradesListItem[];
  queryKey: GetTradesRequest;
  filter: FilterType;
}

const List: FC<ListProps> = ({ tradeItems: originTradeItems, queryKey, filter }) => {
  const { isLoading } = useGetTradesQuery(queryKey);

  const { tradeItems, page, order, onChangePage, onChangeOrder } = useTradeItems({
    queryKey,
    tradeItems: originTradeItems,
  });

  const { onSelectApart, onSaveApart, onRemoveApart } = useApartItem({ queryKey });

  const isMobile = useIsMobile();
  const totalCount = originTradeItems.length;

  useEffect(() => {
    onChangePage(1);
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
      onSelectApart={onSelectApart}
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
      onSelectApart={onSelectApart}
      onSaveApart={onSaveApart}
      onRemoveApart={onRemoveApart}
    />
  );
};

export default List;
