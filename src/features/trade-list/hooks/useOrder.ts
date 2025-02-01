import { useState } from "react";

import { OrderType } from "../models/types";

interface Return {
  order: OrderType;
  onChangeOrder: (column: OrderType[0], direction?: OrderType[1]) => void;
}

export const useOrder = (): Return => {
  const [order, setOrder] = useState<OrderType>(["tradeDate", "desc"]);

  const onChangeOrder = (column: OrderType[0], direction?: OrderType[1]) => {
    if (direction) {
      setOrder([column, direction]);
    } else {
      setOrder([column, column === order[0] ? (order[1] === "asc" ? "desc" : "asc") : "asc"]);
    }
  };

  return { order, onChangeOrder };
};
