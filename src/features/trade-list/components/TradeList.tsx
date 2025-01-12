import { FC, Fragment } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";

import { getIsMobile } from "@/shared/lib";
import Pagination from "@/shared/ui/pagination/Pagination";

import { PER_PAGE, TABLE_HEADERS } from "../consts/table";
import { useTradeList } from "../hooks/useTradeList";
import BoxLayout from "../ui/BoxLayout";
import HeaderCell from "../ui/HeaderCell";
import ListRow from "../ui/ListRow";
import TableRow from "../ui/TableRow";
import css from "./TradeList.module.css";

interface TradeListProps {}

const TradeList: FC<TradeListProps> = () => {
  const { isLoading, total, page, order, items, onChangePage, onChangeOrder, onSaveApart, onRemoveApart } =
    useTradeList();

  const isMobile = getIsMobile();
  const perBlock = isMobile ? 5 : 10;
  const isEmpty = !isLoading && items.length === 0;
  const isShowPagination = total > perBlock;

  return (
    <div className={css.tradeList}>
      {!isMobile && (
        <div className={css.header}>
          {TABLE_HEADERS.map((item) => (
            <HeaderCell
              key={item.key}
              order={order[0] === item.key ? order[1] : null}
              onClick={() => onChangeOrder(item.key)}
            >
              {item.label}
            </HeaderCell>
          ))}
        </div>
      )}
      <div className={css.body}>
        {isLoading && (
          <BoxLayout animationType="rotate" icon={<VscLoading />}>
            조회중
          </BoxLayout>
        )}
        {isEmpty && <BoxLayout icon={<RiErrorWarningLine />}>데이터 없음</BoxLayout>}
        {items.map((item) => (
          <Fragment key={JSON.stringify(item)}>
            {isMobile ? (
              <ListRow item={item} onSave={() => onSaveApart(item)} onRemove={() => onRemoveApart(item)} />
            ) : (
              <TableRow item={item} onSave={() => onSaveApart(item)} onRemove={() => onRemoveApart(item)} />
            )}
          </Fragment>
        ))}
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
