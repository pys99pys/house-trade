import { FC, useState } from "react";
import { useLocation } from "react-router-dom";

import { GetTradesRequest } from "@/entities/trade";
import { TradeList } from "@/features/trade-list";
import { TradeListSearch } from "@/features/trade-list-search";

import css from "./TradesPage.module.css";

interface TradesPageProps {}

const TradesPage: FC<TradesPageProps> = () => {
  const location = useLocation();
  const [queryKey, setQueryKey] = useState<GetTradesRequest>(
    location.state?.queryKey ?? { regionCode: "", yearMonth: "" }
  );

  return (
    <div className={css.tradesPage}>
      <div>
        <TradeListSearch setQueryKey={setQueryKey} />
      </div>
      <div>
        <TradeList queryKey={queryKey} />
      </div>
    </div>
  );
};

export default TradesPage;
