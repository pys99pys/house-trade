import { useState } from "react";

import { FilterType } from "../models/types";

export const useListFilter = () => {
  const [filter, setFilter] = useState<FilterType>({
    apartName: "",
    onlySavedApart: false,
    onlyBaseSize: false,
  });
};
