import { FC } from "react";

import { TradesQueryRequest } from "@/entities/trade";

import { useFilter } from "../hooks/useFilter";
import { useTradeItems } from "../hooks/useTradeItems";
import FilterForm from "./FilterForm";
import List from "./List";

interface TradeListProps {
  queryKey: TradesQueryRequest;
}

const TradeList: FC<TradeListProps> = ({ queryKey }) => {
  const { filter, onChangeFilter } = useFilter();
  const { tradeItems } = useTradeItems({ queryKey, filter });

  return (
    <>
      <div>
        <FilterForm tradeItems={tradeItems} filter={filter} onChangeFilter={onChangeFilter} />
      </div>
      <div className="default-mt">
        <List tradeItems={tradeItems} queryKey={queryKey} />
      </div>
    </>
  );
};

export default TradeList;
