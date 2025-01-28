import classNames from "classnames";
import { FC } from "react";

import { FilterForm, TradeList } from "@/features/trade-list";
import { TradeSearch } from "@/features/trade-list-search";

import css from "./TradesPage.module.css";

interface TradesPageProps {}

const TradesPage: FC<TradesPageProps> = () => {
  return (
    <div className={css.tradesPage}>
      <TradeSearch />
      <div className={css.filterFormWrap}>
        <FilterForm />
      </div>
      <div className={css.tradeListWrap}>
        <TradeList />
      </div>
    </div>
  );
};

export default TradesPage;
