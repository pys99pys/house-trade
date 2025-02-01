import { useState } from "react";

import { FilterType, OnChangeFilterHandler } from "../models/types";

interface Return {
  filter: FilterType;
  onChangeFilter: OnChangeFilterHandler;
}

export const useFilter = (): Return => {
  const [filter, setFilter] = useState<FilterType>({ apartName: "", onlySavedApart: false, onlyBaseSize: false });

  const onChangeFilter: OnChangeFilterHandler = (nextFilter) => {
    setFilter((prev) => ({ ...prev, ...nextFilter }));
  };

  return { filter, onChangeFilter };
};
