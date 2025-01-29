import classNames from "classnames";
import { FC } from "react";

import { Select } from "@/shared/ui";

import { TABLE_HEADERS } from "../consts/table";
import { OrderType } from "../models/types";
import css from "./ListHeader.module.css";

interface ListHeaderProps {
  order: OrderType;
  onChangeOrder: (column: OrderType[0], direction: OrderType[1]) => void;
}

const ListHeader: FC<ListHeaderProps> = ({ order, onChangeOrder }) => {
  const [orderColumn, orderDirection] = order;

  return (
    <div className={classNames(css.listHeader, "flex")}>
      <Select value={orderColumn} onChange={(value) => onChangeOrder(value as OrderType[0], orderDirection)}>
        {TABLE_HEADERS.map((item) => (
          <option key={item.key} value={item.key}>
            {item.label}
          </option>
        ))}
      </Select>
      <Select value={orderDirection} onChange={(value) => onChangeOrder(orderColumn, value as OrderType[1])}>
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
      </Select>
    </div>
  );
};

export default ListHeader;
