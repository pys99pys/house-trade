import { getCityNameFromRegionCode, getRegionNameFromRegionCode } from "@/entities/region";

import { parseSavedApartItem } from "./calculators";

export const distinctSavedApartItem = (savedAparts: string[]): string[] => {
  return [...new Set(savedAparts)];
};

export const sortSavedAparts = (savedAparts: string[]): string[] => {
  return savedAparts.sort((prev, next) => {
    const { regionCode: prevRegionCode } = parseSavedApartItem(prev);
    const { regionCode: nextRegionCode } = parseSavedApartItem(next);

    const prevLabel = getCityNameFromRegionCode(prevRegionCode) + getRegionNameFromRegionCode(prevRegionCode);
    const nextLabel = getCityNameFromRegionCode(nextRegionCode) + getRegionNameFromRegionCode(nextRegionCode);

    return prevLabel > nextLabel ? 1 : -1;
  });
};
