import classNames from "classnames";
import { FC, useState } from "react";

import { TradesQueryRequest } from "@/entities/trade";
import { TradeList } from "@/features/trade-list";
import { TradeListSearch } from "@/features/trade-list-search";

import css from "./TradesPage.module.css";

interface TradesPageProps {}

const TradesPage: FC<TradesPageProps> = () => {
  const [queryKey, setQueryKey] = useState<TradesQueryRequest>({ cityCode: "", yearMonth: "" });

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
