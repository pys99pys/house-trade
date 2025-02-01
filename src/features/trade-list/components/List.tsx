import { FC, Fragment, useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";

import { TradeItem, TradesQueryRequest, useTradesQuery } from "@/entities/trade";
import { useIsMobile } from "@/shared/models";
import Pagination from "@/shared/ui/pagination/Pagination";

import { PER_PAGE } from "../consts/table";
import { useApartItem } from "../hooks/useApartItem";
import { useTradeItems } from "../hooks/useTradeItems";
import { FilterType } from "../models/types";
import BoxLayout from "../ui/BoxLayout";
import ListHeader from "../ui/ListHeader";
import ListRow from "../ui/ListRow";
import TableHeader from "../ui/TableHeader";
import TableRow from "../ui/TableRow";
import css from "./List.module.css";

interface ListProps {
  tradeItems: TradeItem[];
  queryKey: TradesQueryRequest;
  filter: FilterType;
}

const List: FC<ListProps> = ({ tradeItems: originTradeItems, queryKey, filter }) => {
  const { isLoading } = useTradesQuery(queryKey);

  const { tradeItems, page, order, onChangePage, onChangeOrder } = useTradeItems({
    queryKey,
    tradeItems: originTradeItems,
  });

  const { onSelectApart, onSaveApart, onRemoveApart } = useApartItem({ queryKey });

  const totalCount = tradeItems.length;
  const isMobile = useIsMobile();
  const perBlock = isMobile ? 5 : 10;
  const isEmpty = !isLoading && tradeItems.length === 0;
  const isShowPagination = totalCount > perBlock;

  useEffect(() => {
    onChangePage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey, filter]);

  return (
    <div className={css.list}>
      {isMobile ? (
        <ListHeader order={order} onChangeOrder={onChangeOrder} />
      ) : (
        <TableHeader order={order} onChangeOrder={onChangeOrder} />
      )}
      <div className={css.body}>
        {isLoading && (
          <BoxLayout animationType="rotate" icon={<VscLoading />}>
            조회중
          </BoxLayout>
        )}
        {isEmpty && <BoxLayout icon={<RiErrorWarningLine />}>데이터 없음</BoxLayout>}
        {tradeItems.map((item, i) => {
          const params = {
            item,
            onClick: () => onSelectApart(item),
            onSave: () => onSaveApart(item),
            onRemove: () => onRemoveApart(item),
          };

          return <Fragment key={i}>{isMobile ? <ListRow {...params} /> : <TableRow {...params} />}</Fragment>;
        })}
      </div>
      {isShowPagination && (
        <div className={css.pagination}>
          <Pagination
            perPage={PER_PAGE}
            perBlock={perBlock}
            totalCount={totalCount}
            currentPage={page}
            onChange={onChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default List;
