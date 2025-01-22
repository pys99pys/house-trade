import { useRecoilValue } from "recoil";

import { useTradesQuery } from "@/entities/trade";
import { useStateEffect } from "@/shared/hooks";

import { filterAtom } from "../models/stores";
import { useSetFilter } from "./useFilterAtom";

interface Return {
  onChangeApartName: (apartName: string) => void;
  onClickSavedApart: () => void;
  onClickBaseSize: () => void;
}

export const useFilterState = () => useRecoilValue(filterAtom);

export const useFilterForm = (): Return => {
  const { dataUpdatedAt } = useTradesQuery();
  const setFilter = useSetFilter();

  useStateEffect(() => {
    setFilter((prev) => ({ ...prev, apartName: "" }));
  }, [dataUpdatedAt]);

  const onChangeApartName = (apartName: string) => {
    setFilter((prev) => ({ ...prev, apartName }));
  };

  const onClickSavedApart = () => {
    setFilter((prev) => ({ ...prev, onlySavedApart: !prev.onlySavedApart }));
  };

  const onClickBaseSize = () => {
    setFilter((prev) => ({ ...prev, onlyBaseSize: !prev.onlyBaseSize }));
  };

  return { onChangeApartName, onClickSavedApart, onClickBaseSize };
};
