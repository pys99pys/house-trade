import { FC, PropsWithChildren } from "react";

import { TradeItem } from "@/entities/trade";

import { TABLE_HEADERS } from "../consts/table";
import { OrderType } from "../models/types";
import css from "./TableHeader.module.css";

interface TableHeaderProps {
  order: OrderType;
  onChangeOrder: (column: keyof TradeItem) => void;
}

const TableHeader: FC<PropsWithChildren<TableHeaderProps>> = ({ order, onChangeOrder }) => {
  const [orderColumn, orderDirection] = order;

  return (
    <div className={css.tableHeader}>
      {TABLE_HEADERS.map((item) => (
        <div key={item.key} className={css.cell}>
          <button onClick={() => onChangeOrder(item.key)}>
            {item.label}
            {orderColumn === item.key && <span className={css[orderDirection]}>▾</span>}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TableHeader;
