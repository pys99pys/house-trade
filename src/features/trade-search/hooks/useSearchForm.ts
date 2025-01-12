import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getLocationState } from "@/entities/location";
import { Region, getCityNameFromRegionCode, getRegionsFromCityName } from "@/entities/region";
import { useSetTradesQueryKey } from "@/entities/trade";
import { ROUTE } from "@/shared/consts";
import { useStateEffect } from "@/shared/hooks";

import { calculateYearMonth } from "../lib/calculators";
import { useSearchFormState, useSetSearchForm } from "../models/hooks";
import { SearchForm } from "../models/types";

interface Return {
  form: SearchForm;
  regions: Region[];
  onChangeCityName: (cityName: string) => void;
  onChangeRegionCode: (regionCode: string) => void;
  onChangeYearMonth: (year: number, month: number) => void;
  onSubmit: () => void;
}

export const useSearchForm = (): Return => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = getLocationState(location.state);
  const form = useSearchFormState();
  const setSearchForm = useSetSearchForm();
  const setTradesQueryKey = useSetTradesQueryKey();

  const regions = useMemo(() => getRegionsFromCityName(form.cityName), [form.cityName]);

  const onChangeCityName = (cityName: string) => {
    const regionCode = getRegionsFromCityName(cityName)[0].code;

    setSearchForm((prev) => ({ ...prev, cityName, regionCode }));
  };

  const onChangeRegionCode = (regionCode: string) => {
    setSearchForm((prev) => ({ ...prev, regionCode }));
  };

  const onChangeYearMonth = (year: number, month: number) => {
    setSearchForm((prev) => ({ ...prev, year, month }));
  };

  const onSubmit = () => {
    setTradesQueryKey({
      cityCode: form.regionCode,
      yearMonth: calculateYearMonth(form.year, form.month),
    });

    navigate(ROUTE.TRADES, { replace: true });
  };

  useStateEffect(() => {
    if (locationState?.regionCode) {
      setSearchForm((prev) => ({
        ...prev,
        cityName: getCityNameFromRegionCode(locationState.regionCode),
        regionCode: locationState.regionCode,
      }));

      setTradesQueryKey({
        cityCode: locationState.regionCode,
        yearMonth: calculateYearMonth(form.year, form.month),
      });
    }
  }, [locationState]);

  return { form, regions, onChangeCityName, onChangeRegionCode, onChangeYearMonth, onSubmit };
};
