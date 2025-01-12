import { FC } from "react";

import { FilterForm, TradeList } from "@/features/trade-list";
import { SavedRegion, SearchForm } from "@/features/trade-search";

import css from "./TradesPage.module.css";

interface TradesPageProps {}

const TradesPage: FC<TradesPageProps> = () => {
  return (
    <div className={css.tradesPage}>
      <div className={css.searchFormWrap}>
        <SearchForm />
      </div>
      <div className={css.savedRegionWrap}>
        <SavedRegion />
      </div>
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
