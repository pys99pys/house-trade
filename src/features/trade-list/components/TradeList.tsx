import { FC } from "react";

import { useFilteredList } from "../hooks/useFilteredList";
import FilterForm from "./FilterForm";
import List from "./List";

interface TradeListProps {}

const TradeList: FC<TradeListProps> = () => {
  const items = useFilteredList();

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
