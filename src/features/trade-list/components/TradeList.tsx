import { FC } from "react";

import { TradesQueryRequest } from "@/entities/trade";

import { useFilteredList } from "../hooks/useFilteredList";
import FilterForm from "./FilterForm";
import List from "./List";

interface TradeListProps {
  queryKey: TradesQueryRequest;
}

const TradeList: FC<TradeListProps> = ({ queryKey }) => {
  const items = useFilteredList({ queryKey });

  return (
    <>
      <div>
        <FilterForm items={items} />
      </div>
      <div className="default-mt">
        <List items={items} />
      </div>
    </>
  );
};

export default TradeList;
