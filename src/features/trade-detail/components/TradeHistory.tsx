import classNames from "classnames";
import { FC } from "react";

import { calculateAreaSize, calculateFlatSize, calculateTradeAmountFormat } from "@/entities/trade";

import { useTradeHistory } from "../hooks/useTradeHistory";
import Box from "../ui/Box";
import css from "./TradeHistory.module.css";

interface TradeHistoryProps {}

const TradeHistory: FC<TradeHistoryProps> = () => {
  const { items } = useTradeHistory();

  return (
    <Box>
      <Box.Title>실거래가</Box.Title>
      <Box.Content>
        <div className={css.tradeHistory}>
          <div className={classNames(css.header, css.row, "box")}>
            <span className="font-bold">거래일</span>
            <span className="font-bold">평수</span>
            <span className="font-bold">층</span>
            <span className="font-bold">거래금액</span>
          </div>
          <div className={classNames(css.body, "flex direction-column")}>
            {items.map((item) => (
              <div key={item.year} className="flex direction-column">
                <h2 className="box font-bold">
                  {item.year}년({item.items.length})
                </h2>
                {item.items.map((_item, i) => (
                  <div key={i} className={classNames(css.row, "box")}>
                    <span>{_item.tradeDate}</span>
                    <span>
                      {calculateFlatSize(_item.size)}평<small>({calculateAreaSize(_item.size)}㎡)</small>
                    </span>
                    <span>{_item.floor}층</span>
                    <span className="font-bold">{calculateTradeAmountFormat(_item.tradeAmount)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Box.Content>
    </Box>
  );
};

export default TradeHistory;
