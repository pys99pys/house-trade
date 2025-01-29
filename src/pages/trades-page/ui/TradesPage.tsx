import classNames from "classnames";
import { FC } from "react";

import { TradeList } from "@/features/trade-list";
import { TradeListSearch } from "@/features/trade-list-search";

import css from "./TradesPage.module.css";

interface TradesPageProps {}

const TradesPage: FC<TradesPageProps> = () => {
  return (
    <div className={css.tradesPage}>
      <div>
        <TradeListSearch />
      </div>
      <div>
        <TradeList />
      </div>
    </div>
  );
};

export default TradesPage;
