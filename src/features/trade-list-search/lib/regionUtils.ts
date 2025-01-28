import { getCityNameFromRegionCode, getRegionNameFromRegionCode } from "@/entities/region";
import { STORAGE_KEY } from "@/shared/consts";
import { setValue } from "@/shared/lib";

export const distinctRegionCodes = (regionCodes: string[]): string[] => {
  return [...new Set(regionCodes)];
};

export const sortRegionCodes = (regionCodes: string[]): string[] => {
  return regionCodes.sort((prev, next) => {
    const prevLabel = getCityNameFromRegionCode(prev) + getRegionNameFromRegionCode(prev);
    const nextLabel = getCityNameFromRegionCode(next) + getRegionNameFromRegionCode(next);

    return prevLabel > nextLabel ? 1 : -1;
  });
};

export const setRegionsToStorage = (regions: string[]): void => {
  setValue(STORAGE_KEY.SAVED_REGIONS, regions);
};
