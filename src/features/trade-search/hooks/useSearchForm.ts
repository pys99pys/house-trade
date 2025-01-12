import { useMemo } from "react";

import { useLocationStateChangeEffect } from "@/entities/location";
import { Region, getRegionsFromCityName } from "@/entities/region";
import { useSetTradesQueryKey } from "@/entities/trade";

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
  const form = useSearchFormState();
  const setSearchForm = useSetSearchForm();
  const setTradesQueryKey = useSetTradesQueryKey();

  const regions = useMemo(() => getRegionsFromCityName(form.cityName), [form.cityName]);

  useLocationStateChangeEffect((state) => {
    if (state.regionCode) {
      setSearchForm((prev) => ({ ...prev, regionCode: state.regionCode ?? "" }));
      setTradesQueryKey({
        yearMonth: calculateYearMonth(form.year, form.month),
        cityCode: state.regionCode,
      });
    }
  });

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
  };

  return { form, regions, onChangeCityName, onChangeRegionCode, onChangeYearMonth, onSubmit };
};
