import classNames from "classnames";
import { FC } from "react";

import { GetApartResponseTradeItem } from "@/entities/apart";
import { calculateAreaSize, calculateFlatSize, calculateTradeAmountFormat } from "@/entities/trade";
import { Box as BaseBox } from "@/shared/ui";

import { useTradeHistory } from "../hooks/useTradeHistory";
import Box from "../ui/Box";
import css from "./TradeHistory.module.css";

interface TradeHistoryProps {
  tradeItems: GetApartResponseTradeItem[];
}

const TradeHistory: FC<TradeHistoryProps> = ({ tradeItems: originTradeItems }) => {
  const { tradeItems } = useTradeHistory({ originTradeItems });

  return (
    <Box title="전체 거래 목록">
      <div className={css.tradeHistory}>
        <div className={classNames(css.header, css.row, "box")}>
          <span className={css.cell}>
            <strong>거래일</strong>
          </span>
          <span className={css.cell}>
            <strong>평수</strong>
          </span>
          <span className={css.cell}>
            <strong>층</strong>
          </span>
          <span className={css.cell}>
            <strong>거래금액</strong>
          </span>
        </div>
        <div className={css.body}>
          {tradeItems.map((item) => (
            <div key={item.year} className={css.wrap}>
              <h2 className={css.year}>
                {item.year}년({item.items.length})
              </h2>
              {item.items.map((_item, i) => (
                <BaseBox key={i} className={css.row}>
                  <span className={css.cell}>{_item.tradeDate}</span>
                  <span className={css.cell}>
                    {calculateFlatSize(_item.size)}평<small>({calculateAreaSize(_item.size)}㎡)</small>
                  </span>
                  <span className={css.cell}>{_item.floor}층</span>
                  <span className={css.cell}>
                    <strong>{calculateTradeAmountFormat(_item.tradeAmount)}</strong>
                  </span>
                </BaseBox>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default TradeHistory;
