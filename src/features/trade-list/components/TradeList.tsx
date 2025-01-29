import { FC } from "react";

import FilterForm from "./FilterForm";
import List from "./List";
import css from "./TradeList.module.css";

interface TradeListProps {}

const TradeList: FC<TradeListProps> = () => {
  return (
    <div className={css.tradeList}>
      <div>
        <FilterForm />
      </div>
      <div className="default-mt">
        <List />
      </div>
    </div>
  );
};

export default TradeList;
