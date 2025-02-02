import { FC } from "react";

import { GetTradesRequest } from "@/entities/trade";

import { useFilter } from "../hooks/useFilter";
import { useTradeItemsWithFilter } from "../hooks/useTradeItemsWithFilter";
import FilterForm from "./FilterForm";
import List from "./List";
import css from "./TradeList.module.css";

interface TradeListProps {
  queryKey: GetTradesRequest;
}

const TradeList: FC<TradeListProps> = ({ queryKey }) => {
  const { filter, onChangeFilter } = useFilter();
  const { tradeItems } = useTradeItemsWithFilter({ queryKey, filter });

  return (
    <div className={css.tradeList}>
      <div>
        <FilterForm tradeItems={tradeItems} filter={filter} onChangeFilter={onChangeFilter} />
      </div>
      <div>
        <List tradeItems={tradeItems} queryKey={queryKey} filter={filter} />
      </div>
    </div>
  );
};

export default TradeList;
