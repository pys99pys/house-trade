import { useState } from "react";

import { STORAGE_KEY } from "@/shared/consts";
import { getValue, setValue } from "@/shared/lib";

import { FilterType, OnChangeFilterHandler } from "../models/types";

interface Return {
  filter: FilterType;
  onChangeFilter: OnChangeFilterHandler;
}

export const useFilter = (): Return => {
  const [filter, setFilter] = useState<FilterType>(
    getValue(STORAGE_KEY.LAST_TRADE_FILTER) ?? { apartName: "", onlySavedApart: false, onlyBaseSize: false }
  );

  const onChangeFilter: OnChangeFilterHandler = (nextFilter) => {
    const mergedFilter = { ...filter, ...nextFilter };

    setFilter(mergedFilter);
    setValue(STORAGE_KEY.LAST_TRADE_FILTER, mergedFilter);
  };

  return { filter, onChangeFilter };
};
