import { FC } from "react";

import { GetTradesRequest } from "@/entities/trade";

import { useFilter } from "../hooks/useFilter";
import { useTradeItemsWithFilter } from "../hooks/useTradeItemsWithFilter";
import FilterForm from "./FilterForm";
import List from "./List";

interface TradeListProps {
  queryKey: GetTradesRequest;
}

const TradeList: FC<TradeListProps> = ({ queryKey }) => {
  const { filter, onChangeFilter } = useFilter();
  const { tradeItems } = useTradeItemsWithFilter({ queryKey, filter });

  return (
    <>
      <div>
        <FilterForm tradeItems={tradeItems} filter={filter} onChangeFilter={onChangeFilter} />
      </div>
      <div className="default-mt">
        <List tradeItems={tradeItems} queryKey={queryKey} filter={filter} />
      </div>
    </>
  );
};

export default TradeList;
