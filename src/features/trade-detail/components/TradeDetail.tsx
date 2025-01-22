import classNames from "classnames";
import { FC } from "react";

import { useTradeDetail } from "../hooks/useTradeDetail";
import css from "./TradeDetail.module.css";
import TradeHistory from "./TradeHistory";
import TradeInfo from "./TradeInfo";

interface TradeDetailProps {}

const TradeDetail: FC<TradeDetailProps> = () => {
  const { data } = useTradeDetail();

  if (!data) {
    return null;
  }

  return (
    <div className={classNames(css.tradeDetail, "flex direction-column")}>
      <TradeInfo />
      <TradeHistory />
    </div>
  );
};

export default TradeDetail;
