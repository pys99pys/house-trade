import classNames from "classnames";
import { useParams } from "next/navigation";
import { FC } from "react";

import { useTradeDetail } from "../hooks/useTradeDetail";
import Box from "../ui/Box";
import css from "./TradeDetail.module.css";
import TradeHistory from "./TradeHistory";
import TradeInfo from "./TradeInfo";

interface TradeDetailProps {}

const TradeDetail: FC<TradeDetailProps> = () => {
  const { apartName, data } = useTradeDetail();

  if (!data) {
    return null;
  }

  return (
    <div className={classNames(css.tradeDetail, "flex direction-column")}>
      <Box title="">
        <h1 className="font-bold">{apartName}</h1>
      </Box>
      <Box title="아파트 정보">
        <TradeInfo />
      </Box>
      <Box title="실거래가">
        <TradeHistory />
      </Box>
    </div>
  );
};

export default TradeDetail;
