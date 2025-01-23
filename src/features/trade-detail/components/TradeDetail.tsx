import classNames from "classnames";
import { FC } from "react";

import Loading from "@/shared/ui/loading/Loading";

import { useTradeDetail } from "../hooks/useTradeDetail";
import TradeChart from "./TradeChart";
import css from "./TradeDetail.module.css";
import TradeHistory from "./TradeHistory";
import TradeInfo from "./TradeInfo";

interface TradeDetailProps {}

const TradeDetail: FC<TradeDetailProps> = () => {
  const { data } = useTradeDetail();

  return (
    <div className={css.tradeDetail}>
      {data && (
        <div className={classNames(css.content, "flex direction-column")}>
          <TradeInfo />
          <TradeChart />
          <TradeHistory />
        </div>
      )}

      {!data && (
        <div className={classNames(css.loading, "flex justify-content-center align-items-center")}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default TradeDetail;
