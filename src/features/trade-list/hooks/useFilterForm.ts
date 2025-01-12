import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { getLocationState, hasLocationState } from "@/entities/location";
import { useTradesQueryKey } from "@/entities/trade";
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
  const location = useLocation();
  const locationState = getLocationState(location.state);
  const { cityCode } = useTradesQueryKey();
  const setFilter = useSetFilter();

  const prevCityCode = useRef(cityCode);

  useStateEffect(() => {
    const hasApartNameState = hasLocationState(locationState, "apartName");

    if (!hasApartNameState && prevCityCode.current !== cityCode) {
      setFilter((prev) => ({ ...prev, apartName: "" }));
    }

    prevCityCode.current = cityCode;
  }, [cityCode]);

  useStateEffect(() => {
    if (locationState?.apartName) {
      setFilter((prev) => ({ ...prev, apartName: locationState.apartName }));
    }
  }, [locationState]);

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
