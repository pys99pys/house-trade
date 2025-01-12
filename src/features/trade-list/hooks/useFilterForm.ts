import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { useLocationStateChangeEffect } from "@/entities/location";
import { useTradesQuery } from "@/entities/trade";

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

  const apartNameLocationStateRef = useRef("");

  useEffect(() => {
    if (apartNameLocationStateRef.current) {
      setFilter((prev) => ({ ...prev, apartName: apartNameLocationStateRef.current }));
      apartNameLocationStateRef.current = "";

      return;
    }

    setFilter((prev) => ({ ...prev, apartName: "" }));
  }, [dataUpdatedAt, setFilter]);

  useLocationStateChangeEffect((state) => {
    apartNameLocationStateRef.current = state.apartName ?? "";
  });

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
