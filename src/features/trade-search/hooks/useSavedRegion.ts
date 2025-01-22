import { useMemo } from "react";

import { getCityNameFromRegionCode, getRegionNameFromRegionCode } from "@/entities/region";
import { useSetTradesQueryKey } from "@/entities/trade";
import { STORAGE_KEY } from "@/shared/consts";
import { setValue } from "@/shared/lib";

import { calculateYearMonth } from "../lib/calculators";
import { useSavedRegionState, useSearchFormState, useSetSavedRegion, useSetSearchForm } from "../models/hooks";

interface Return {
  isRegistered: boolean;
  savedRegionCodes: string[];
  onRegist: (regionCode: string) => void;
  onRemove: (regionCode: string) => void;
  onSelect: (regionCode: string) => void;
}

const distinctRegionCodes = (regionCodes: string[]): string[] => {
  return [...new Set(regionCodes)];
};

const sortRegionCodes = (regionCodes: string[]): string[] => {
  return regionCodes.sort((prev, next) => {
    const prevLabel = getCityNameFromRegionCode(prev) + getRegionNameFromRegionCode(prev);
    const nextLabel = getCityNameFromRegionCode(next) + getRegionNameFromRegionCode(next);

    return prevLabel > nextLabel ? 1 : -1;
  });
};

export const useSavedRegion = (): Return => {
  const searchForm = useSearchFormState();
  const savedRegionCodes = useSavedRegionState();
  const setSearchForm = useSetSearchForm();
  const setTradesQueryKey = useSetTradesQueryKey();

  const setSavedRegion = useSetSavedRegion();

  const isRegistered = useMemo(
    () => savedRegionCodes.includes(searchForm.regionCode),
    [savedRegionCodes, searchForm.regionCode]
  );

  const onRegist = (regionCode: string) => {
    setSavedRegion((prev) => {
      const nextSavedRegionCodes = sortRegionCodes(distinctRegionCodes([...prev, regionCode]));
      setValue(STORAGE_KEY.SAVED_REGIONS, nextSavedRegionCodes);

      return nextSavedRegionCodes;
    });
  };

  const onRemove = (regionCode: string) => {
    setSavedRegion((prev) => {
      const nextSavedRegionCodes = prev.filter((code) => code !== regionCode);
      setValue(STORAGE_KEY.SAVED_REGIONS, nextSavedRegionCodes);

      return nextSavedRegionCodes;
    });
  };

  const onSelect = (regionCode: string) => {
    setSearchForm((prev) => ({
      ...prev,
      cityName: getCityNameFromRegionCode(regionCode),
      regionCode: regionCode,
    }));

    setTradesQueryKey({
      cityCode: regionCode,
      yearMonth: calculateYearMonth(searchForm.year, searchForm.month),
    });
  };

  return { isRegistered, savedRegionCodes, onRegist, onRemove, onSelect };
};
