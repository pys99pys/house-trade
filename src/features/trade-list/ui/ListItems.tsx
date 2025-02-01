import classNames from "classnames";
import { FC } from "react";

import { calculateFlatSize, calculateTradeAmountFormat } from "@/entities/trade";
import { IconBox, Select, TextButton } from "@/shared/ui";
import Pagination from "@/shared/ui/pagination/Pagination";

import { PER_PAGE, TABLE_HEADERS } from "../consts/table";
import { OrderType, TradeItem } from "../models/types";
import { calculateApartInfo } from "../services/calculators";
import css from "./ListItems.module.css";

interface ListItemsProps {
  isLoading: boolean;
  totalCount: number;
  tradeItems: TradeItem[];
  page: number;
  order: OrderType;
  onChangePage: (page: number) => void;
  onChangeOrder: (orderColumn: OrderType[0], orderDirection: OrderType[1]) => void;
  onSelectApart: (item: TradeItem) => void;
  onSaveApart: (item: TradeItem) => void;
  onRemoveApart: (item: TradeItem) => void;
}

const PER_BLOCK = 5;

const ListItems: FC<ListItemsProps> = ({
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
    <div className={css.listItems}>
      <div className={css.header}>
        <Select size="small" value={order[0]} onChange={(value) => onChangeOrder(value as OrderType[0], order[1])}>
          {TABLE_HEADERS.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </Select>
        <Select size="small" value={order[1]} onChange={(value) => onChangeOrder(order[0], value as OrderType[1])}>
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </Select>
      </div>
      <div className={css.body}>
        {isLoading && <IconBox type="loading" />}
        {isEmpty && <IconBox type="empty" />}
        {tradeItems.length > 0 &&
          tradeItems.map((item, i) => {
            const apartInfo = calculateApartInfo(item);

            return (
              <div
                key={i}
                className={classNames(css.row, "box activable flex justify-content-between", {
                  active: item.isSaved,
                })}
                onClick={() => onSelectApart(item)}
              >
                <div className={classNames(css.apartInfoWrap, "flex direction-column")}>
                  <span className="font-bold">
                    {item.apartName}({calculateFlatSize(item.size)}평)
                  </span>
                  <span>{item.address}</span>
                  {apartInfo && <small className="font-small">{apartInfo}</small>}
                </div>
                <div className="flex direction-column justify-content-between">
                  <div className={classNames(css.priceInfoWrap, "flex direction-column align-items-end")}>
                    <span className="font-bold text-primary">
                      {calculateTradeAmountFormat(item.tradeAmount)}
                      {item.isNewRecord && item.maxTradeAmount > 0 && "(신)"}
                    </span>
                    <span className="font-small">{item.tradeDate}</span>
                  </div>
                  <div className="flex justify-content-end">
                    {item.isSaved && (
                      <TextButton
                        color="red"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveApart(item);
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
                          onSaveApart(item);
                        }}
                      >
                        저장
                      </TextButton>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
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

export default ListItems;
