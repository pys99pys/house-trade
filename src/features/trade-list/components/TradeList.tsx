import { FC, Fragment } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";

import { useIsMobile } from "@/shared/models";
import Pagination from "@/shared/ui/pagination/Pagination";

import { PER_PAGE } from "../consts/table";
import { useTradeList } from "../hooks/useTradeList";
import BoxLayout from "../ui/BoxLayout";
import ListHeader from "../ui/ListHeader";
import ListRow from "../ui/ListRow";
import TableHeader from "../ui/TableHeader";
import TableRow from "../ui/TableRow";
import css from "./TradeList.module.css";

interface TradeListProps {}

const TradeList: FC<TradeListProps> = () => {
  const { isLoading, total, page, order, items, onChangePage, onChangeOrder, onClickRow, onSaveApart, onRemoveApart } =
    useTradeList();

  const isMobile = useIsMobile();
  const perBlock = isMobile ? 5 : 10;
  const isEmpty = !isLoading && items.length === 0;
  const isShowPagination = total > perBlock;

  return (
    <div className={css.tradeList}>
      {isMobile ? (
        <ListHeader order={order} onChangeOrder={onChangeOrder} />
      ) : (
        <TableHeader
          order={order}
          onChangeOrder={(column) =>
            onChangeOrder([column, column === order[0] ? (order[1] === "asc" ? "desc" : "asc") : "asc"])
          }
        />
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
            onClick: () => onClickRow(item),
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
            totalCount={total}
            currentPage={page}
            onChange={onChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default TradeList;
