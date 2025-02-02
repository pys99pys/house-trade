import classNames from "classnames";
import { FC } from "react";

import { calculateAreaSize, calculateFlatSize, calculateTradeAmountFormat } from "@/entities/trade";
import { Box, IconBox, TextButton } from "@/shared/ui";
import Pagination from "@/shared/ui/pagination/Pagination";

import { PER_PAGE, TABLE_HEADERS } from "../consts/table";
import { OrderType, TradeItem } from "../models/types";
import { calculateApartInfo } from "../services/calculators";
import css from "./ListTable.module.css";

interface ListTableProps {
  isLoading: boolean;
  totalCount: number;
  tradeItems: TradeItem[];
  page: number;
  order: OrderType;
  onChangePage: (page: number) => void;
  onChangeOrder: (orderColumn: OrderType[0]) => void;
  onSelectApart: (item: TradeItem) => void;
  onSaveApart: (item: TradeItem) => void;
  onRemoveApart: (item: TradeItem) => void;
}

const PER_BLOCK = 10;

const ListTable: FC<ListTableProps> = ({
  isLoading,
  totalCount,
  tradeItems,
  page,
  order,
  onChangePage,
  onChangeOrder,
  onSelectApart,
  onSaveApart,
  onRemoveApart,
}) => {
  const isEmpty = !isLoading && totalCount === 0;
  const isShowPagination = totalCount > PER_BLOCK;

  return (
    <div className={css.listTable}>
      <div className={css.header}>
        {TABLE_HEADERS.map((item) => (
          <div key={item.key} className={css.cell}>
            <button className={css.button} onClick={() => onChangeOrder(item.key)}>
              {item.label}
              {order[0] === item.key && <span className={css[order[1]]}>▾</span>}
            </button>
          </div>
        ))}
      </div>

      {isLoading && <IconBox type="loading" />}

      {isEmpty && <IconBox type="empty" />}

      {totalCount > 0 && (
        <div className={css.body}>
          {tradeItems.map((item, i) => {
            const apartInfo = calculateApartInfo(item);

            return (
              <Box key={i} hoverable className={css.row} active={item.isSaved} onClick={() => onSelectApart(item)}>
                <div className={css.cell}>{item.tradeDate}</div>
                <div className={css.cell}>{item.address}</div>
                <div className={css.cell}>
                  {item.apartName}
                  {apartInfo && <small>{apartInfo}</small>}
                </div>
                <div className={css.cell}>
                  {calculateFlatSize(item.size)}평{item.size && <small>({calculateAreaSize(item.size)}㎡)</small>}
                </div>
                <div className={css.cell}>
                  <span className={classNames({ [css.highlight]: item.isNewRecord && item.maxTradeAmount > 0 })}>
                    {calculateTradeAmountFormat(item.tradeAmount)}
                    {item.isNewRecord && item.maxTradeAmount > 0 && "(신)"}
                  </span>
                </div>
                <div className={css.cell}>
                  {item.maxTradeAmount > 0 && <>{calculateTradeAmountFormat(item.maxTradeAmount)}</>}
                </div>
                <div className={css.cell}>
                  {item.isSaved && (
                    <TextButton
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSaveApart(item);
                      }}
                    >
                      삭제
                    </TextButton>
                  )}
                  {!item.isSaved && (
                    <TextButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveApart(item);
                      }}
                    >
                      저장
                    </TextButton>
                  )}
                </div>
              </Box>
            );
          })}
        </div>
      )}

      {isShowPagination && (
        <div className={css.pagination}>
          <Pagination
            perPage={PER_PAGE}
            perBlock={PER_BLOCK}
            totalCount={totalCount}
            currentPage={page}
            onChange={onChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default ListTable;
