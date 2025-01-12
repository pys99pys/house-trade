import { FC } from "react";

import SavedRegion from "./SavedRegion";
import SearchForm from "./SearchForm";

const TradeSearch: FC = () => {
  return (
    <div>
      <SearchForm />
      <SavedRegion />
    </div>
  );
};

export default TradeSearch;
