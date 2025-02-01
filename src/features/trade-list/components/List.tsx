import { FC, Fragment, useMemo } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";

import { useSavedAparts } from "@/entities/apart";
import { TradeItem, TradesQueryRequest, useTradesQuery, useTradesQueryKey } from "@/entities/trade";
import { useIsMobile } from "@/shared/models";
import Pagination from "@/shared/ui/pagination/Pagination";

import { PER_PAGE } from "../consts/table";
import { useApartItem } from "../hooks/useApartItem";
import { useOrder } from "../hooks/useOrder";
import { usePageState, useSetPageState } from "../models/hooks";
import { compareSavedApart, sliceItems, sortItems } from "../services/filters";
import BoxLayout from "../ui/BoxLayout";
import ListHeader from "../ui/ListHeader";
import ListRow from "../ui/ListRow";
import TableHeader from "../ui/TableHeader";
import TableRow from "../ui/TableRow";
import css from "./List.module.css";

interface ListProps {
  tradeItems: TradeItem[];
  queryKey: TradesQueryRequest;
}

const List: FC<ListProps> = ({ tradeItems, queryKey }) => {
  const { isLoading } = useTradesQuery(queryKey);
  const { order, onChangeOrder } = useOrder();
  const { onSelectApart, onSaveApart, onRemoveApart } = useApartItem();

  const tradesQueryKey = useTradesQueryKey();
  const savedAparts = useSavedAparts();
  const page = usePageState();
  const setPage = useSetPageState();

  const savedApartsInRegion = useMemo(() => {
    return savedAparts.filter((item) => item.regionCode === tradesQueryKey.cityCode);
  }, [tradesQueryKey.cityCode, savedAparts]);

  const items = useMemo(() => {
    const sortedItems = sortItems(tradeItems, order);
    const slicedItems = sliceItems(sortedItems, { page, perPage: PER_PAGE });
    const mappedItems = slicedItems.map((item) => ({ ...item, isSaved: compareSavedApart(savedApartsInRegion, item) }));

    return mappedItems;
  }, [page, order, tradeItems, savedApartsInRegion]);

  const totalCount = tradeItems.length;
  const isMobile = useIsMobile();
  const perBlock = isMobile ? 5 : 10;
  const isEmpty = !isLoading && tradeItems.length === 0;
  const isShowPagination = totalCount > perBlock;

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
        {items.map((item, i) => {
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
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default List;
